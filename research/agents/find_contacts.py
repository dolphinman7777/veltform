"""Find decision-makers + work emails for Veldform prospects via treg.

Usage: python3 -I find_contacts.py <domains.csv> <out.csv> <budget_usd>
domains.csv columns: Priority,Name,Domain
Stops before total spend reaches budget. Resumable: skips domains already in out.csv.
"""
import csv, json, os, re, sys, urllib.request, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
TOKEN = open(os.path.join(HERE, ".treg_token")).read().strip()
RAW = os.path.join(HERE, "treg-out")
os.makedirs(RAW, exist_ok=True)

ROLE_SCORES = [
    (r"\b(owner|co-?owner|proprietor|founder|co-?founder)\b", 100),
    (r"\b(ceo|chief executive|managing director|\bmd\b|president|chairman)\b", 95),
    (r"\b(executive chef|chef patron|chef-patron|head chef|culinary director|chef de cuisine)\b", 92),
    (r"\b(general manager|\bgm\b|estate manager|hotel manager|farm manager)\b", 88),
    (r"\b(coo|chief operating|director of operations|operations director|operations manager)\b", 80),
    (r"\b(head gardener|garden manager|horticultur|landscape)\b", 78),
    (r"\b(food (and|&) beverage|f&b)\b", 70),
    (r"\b(director|partner|principal)\b", 65),
    (r"\b(procurement|purchasing|facilities|development manager|project manager)\b", 55),
    (r"\b(marketing|brand) (director|manager|head)\b", 45),
]
PER_COMPANY = 5
FLOOR = 250_000  # stop when live balance <= $0.25
spent = 0  # micro-USD


def call(tool, body, max_cost="0.15"):
    global spent
    req = urllib.request.Request(
        f"https://treg.to/call/{tool}", data=json.dumps(body).encode(), method="POST",
        headers={"X-Treg-Token": TOKEN, "Content-Type": "application/json",
                 "X-Treg-Route-Max-Cost": max_cost})
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            cost = int(r.headers.get("X-Treg-Cost-Micro") or 0)
            data = json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:400]
        try:
            cost = int(json.loads(body).get("charged_micro") or 0)
        except Exception:
            cost = 0
        spent += cost
        return None, cost, f"HTTP {e.code}: {body}"
    except (TimeoutError, OSError) as e:
        return None, 0, f"timeout/network: {e}"
    spent += cost
    return data, cost, None


def live_balance():
    req = urllib.request.Request("https://treg.to/billing", headers={"X-Treg-Token": TOKEN})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())["balance_micro"]


def score(title):
    t = (title or "").lower()
    return max([s for p, s in ROLE_SCORES if re.search(p, t)], default=0)


def main():
    src, out, budget = sys.argv[1], sys.argv[2], float(sys.argv[3])
    cap = int(budget * 1_000_000)
    done = set()
    if os.path.exists(out):
        done = {r["Domain"] for r in csv.DictReader(open(out))}
    new = not os.path.exists(out)
    f = open(out, "a", newline="")
    w = csv.writer(f)
    if new:
        w.writerow(["Priority", "Company", "Domain", "Name", "Role", "Email", "Email status",
                    "Company phone", "LinkedIn", "Source"])
    for row in csv.DictReader(open(src)):
        dom = row["Domain"].strip().lower()
        if not dom or dom in done:
            continue
        if live_balance() <= FLOOR:
            print("Balance floor reached"); break
        data, c, err = call("treg.people.search", {"company_domain": dom, "country": "ZA", "limit": 25})
        people = ((data or {}).get("output") or {}).get("people") or []
        json.dump(data, open(os.path.join(RAW, dom + ".json"), "w"))
        def parse(p):
            cur = p.get("currentExperienceSummary") or {}
            name = (p.get("full_name") or p.get("fullName") or p.get("name")
                    or " ".join(x for x in [p.get("first_name"), p.get("last_name")] if x))
            title = p.get("title") or p.get("job_title") or cur.get("title") or ""
            return name, title

        if not any(score(parse(p)[1]) for p in people):
            for t in ("owner", "director", "chef", "general manager", "manager"):
                d2, _, _ = call("treg.people.search", {"company_domain": dom, "title": t, "limit": 10}, "0.02")
                people += ((d2 or {}).get("output") or {}).get("people") or []
                if any(score(parse(p)[1]) >= 80 for p in people):
                    break
        ranked = []
        seen_names = set()
        for p in people:
            name, title = parse(p)
            if name.lower() in seen_names:
                continue
            seen_names.add(name.lower())
            s = score(title)
            if name and s:
                ranked.append((s, name, title, p))
        ranked.sort(key=lambda x: -x[0])
        if not ranked:
            phone = next((p.get("company_phone") for p in people if p.get("company_phone")), "")
            w.writerow([row["Priority"], row["Name"], dom, "", "no decision-maker found", "", "",
                        phone, "", "treg people.search"])
            f.flush(); print(f"{dom}: none ({len(people)} rows) ${spent/1e6:.4f}"); continue
        for s, name, title, p in ranked[:PER_COMPANY]:
            if spent >= cap:
                break
            li = (p.get("employee_linkedin") or p.get("linkedin_url")
                  or (p.get("URLs") or {}).get("linkedin") or "")
            body = {"full_name": name, "company_domain": dom}
            if li:
                body["linkedin_url"] = li
            ed, c2, err = call("treg.people.email.find", body, "0.05")
            eo = (ed or {}).get("output") or {}
            email = (eo.get("email") or "").strip().lower()
            okdoms = {dom, (p.get("email_domain") or "").lower()}
            if email and email.split("@")[-1] not in okdoms:
                email = ""  # provider matched someone else; discard
                eo = {}
            status = "verified" if eo.get("verified") else ("found – unverified" if email else "not found")
            if email and not eo.get("verified") and spent < cap:
                vd, c3, _ = call("treg.people.email.verify", {"email": email}, "0.01")
                vo = (vd or {}).get("output") or {}
                if vo:
                    status = "valid" if vo.get("valid") else f"check: {vo.get('status')}"
            w.writerow([row["Priority"], row["Name"], dom, name, title, email, status,
                        p.get("company_phone") or "", li,
                        "treg " + ((ed or {}).get("_treg", {}).get("provider") or "")])
            f.flush()
        print(f"{dom}: {len(ranked)} decision-makers, spent ${spent/1e6:.4f}")
    print(f"TOTAL spent ${spent/1e6:.4f}")


if __name__ == "__main__":
    main()
