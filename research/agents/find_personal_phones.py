"""Find direct / personal mobile numbers for contacts already in contacts.csv.

Usage: python3 -I find_personal_phones.py [budget_usd]
Reads research/contacts.csv, appends to personal-phones.csv (resumable).
"""
import csv
import json
import os
import re
import sys
import urllib.error
import urllib.request
from typing import Optional

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
CONTACTS = os.path.join(ROOT, "contacts.csv")
OUT = os.path.join(HERE, "personal-phones.csv")
RAW = os.path.join(HERE, "treg-phone-out")
TOKEN_PATH = os.path.join(HERE, ".treg_token")

FLOOR = 250_000  # micro-USD — stop when balance <= $0.25
spent = 0


def token():
    t = os.environ.get("TREG_TOKEN", "").strip()
    if t:
        return t
    if os.path.exists(TOKEN_PATH):
        return open(TOKEN_PATH).read().strip()
    sys.exit("Set TREG_TOKEN or create research/agents/.treg_token (one line, your treg.to API key)")


def call(tool, body, max_cost="0.15"):
    global spent
    req = urllib.request.Request(
        f"https://treg.to/call/{tool}",
        data=json.dumps(body).encode(),
        method="POST",
        headers={
            "X-Treg-Token": token(),
            "Content-Type": "application/json",
            "X-Treg-Route-Max-Cost": max_cost,
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            cost = int(r.headers.get("X-Treg-Cost-Micro") or 0)
            data = json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        raw = e.read().decode()[:800]
        try:
            cost = int(json.loads(raw).get("charged_micro") or 0)
        except Exception:
            cost = 0
        spent += cost
        return None, cost, f"HTTP {e.code}: {raw}"
    except (TimeoutError, OSError) as e:
        return None, 0, f"timeout/network: {e}"
    spent += cost
    return data, cost, None


def live_balance():
    req = urllib.request.Request("https://treg.to/billing", headers={"X-Treg-Token": token()})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())["balance_micro"]


def norm_phone(s: str) -> str:
    s = re.sub(r"[^\d+]", "", s.strip())
    if not s:
        return ""
    if s.startswith("00"):
        s = "+" + s[2:]
    if s.startswith("0") and not s.startswith("+"):
        s = "+27" + s[1:]  # ZA local
    return s


def digits(s: str) -> str:
    return re.sub(r"\D", "", s)


def pick_phone(data) -> tuple:
    if not data:
        return "", "error"
    out = data.get("output") or data.get("result") or {}
    if isinstance(out, list) and out:
        out = out[0] if isinstance(out[0], dict) else {"phone": out[0]}
    for key in ("phone", "mobile", "phone_number", "direct_phone", "number", "personal_phone"):
        v = out.get(key)
        if v and str(v).strip() and str(v).upper() != "N/A":
            return norm_phone(str(v)), "found"
    for key in ("phones", "phone_numbers", "numbers"):
        arr = out.get(key) or []
        for item in arr:
            if isinstance(item, dict):
                v = item.get("number") or item.get("phone") or item.get("mobile")
            else:
                v = item
            if v and str(v).strip():
                return norm_phone(str(v)), "found"
    return "", "not found"


def row_key(r: dict) -> str:
    return "|".join(
        [
            (r.get("Domain") or "").strip().lower(),
            (r.get("Name") or "").strip().lower(),
        ]
    )


def lookup_body(row: dict) -> Optional[dict]:
    dom = (row.get("Domain") or "").strip().lower()
    name = (row.get("Name") or "").strip()
    li = (row.get("LinkedIn") or "").strip()
    email = (row.get("Email") or "").strip().lower()
    if li in ("", "N/A"):
        li = ""
    body: dict = {}
    if li:
        body["person_linkedin_url"] = li if li.startswith("http") else f"https://{li}"
        body["linkedin_url"] = body["person_linkedin_url"]
    if email:
        body["email"] = email
    if dom:
        body["company_domain"] = dom
        body["domain"] = dom
    if name:
        body["full_name"] = name
    if not body.get("person_linkedin_url") and not body.get("email") and not (name and dom):
        return None
    return body


def find_phone(row: dict) -> tuple:
    body = lookup_body(row)
    if not body:
        return "", "skipped", "no identifier"
    dom = (row.get("Domain") or "").strip().lower()
    slug = re.sub(r"[^a-z0-9._-]", "_", f"{dom}_{row.get('Name','')}"[:80])
    company_ph = norm_phone((row.get("Company phone") or "").strip())

    data, _, err = call("treg.people.phone.find", body, "0.15")
    if err:
        return "", "error", err
    os.makedirs(RAW, exist_ok=True)
    json.dump(data, open(os.path.join(RAW, slug + ".find.json"), "w"))
    phone, status = pick_phone(data)
    provider = ((data or {}).get("_treg") or {}).get("provider") or "treg.people.phone.find"
    if phone:
        if company_ph and digits(phone) == digits(company_ph):
            status = "found (matches company line)"
        return phone, status, provider

    li = body.get("person_linkedin_url") or body.get("linkedin_url")
    if li:
        for tool, payload in (
            ("enrichlayer.contacts.personal-phone", {"linkedin_url": li}),
        ):
            data2, _, err2 = call(tool, payload, "0.12")
            json.dump(data2 or {"error": err2}, open(os.path.join(RAW, slug + ".personal.json"), "w"))
            if err2:
                continue
            phone2, st2 = pick_phone(data2)
            prov2 = ((data2 or {}).get("_treg") or {}).get("provider") or tool
            if phone2:
                if company_ph and digits(phone2) == digits(company_ph):
                    st2 = "personal (matches company line)"
                return phone2, st2 or "found", prov2
    return "", "not found", provider


def main():
    if not os.environ.get("TREG_TOKEN") and not os.path.exists(TOKEN_PATH):
        sys.exit("Set TREG_TOKEN or create research/agents/.treg_token (one line, your treg.to API key)")
    budget = float(sys.argv[1]) if len(sys.argv) > 1 else None
    bal = live_balance()
    cap = int(budget * 1_000_000) if budget is not None else max(0, bal - FLOOR)
    print(f"Balance ${bal/1e6:.2f}, spend cap ${cap/1e6:.2f}")

    done = set()
    if os.path.exists(OUT):
        done = {row_key(r) for r in csv.DictReader(open(OUT))}

    rows = [
        r
        for r in csv.DictReader(open(CONTACTS))
        if (r.get("Name") or "").strip()
        and (r.get("Name") or "").strip().lower() != "no decision-maker found"
        and row_key(r) not in done
        and lookup_body(r)
    ]
    print(f"{len(rows)} contacts to enrich ({len(done)} already done)")

    new = not os.path.exists(OUT)
    f = open(OUT, "a", newline="")
    w = csv.writer(f)
    if new:
        w.writerow(["Company", "Domain", "Name", "Role", "Personal phone", "Phone status", "Source"])

    for row in rows:
        if spent >= cap:
            print("Budget cap reached")
            break
        if live_balance() <= FLOOR:
            print("Balance floor reached")
            break
        phone, status, source = find_phone(row)
        w.writerow(
            [
                row["Company"],
                row["Domain"],
                row["Name"],
                row.get("Role") or "",
                phone,
                status,
                source,
            ]
        )
        f.flush()
        tag = phone or status
        print(f"{row['Domain']} · {row['Name']}: {tag} (${spent/1e6:.4f})")

    f.close()
    print(f"TOTAL spent ${spent/1e6:.4f}")


if __name__ == "__main__":
    main()
