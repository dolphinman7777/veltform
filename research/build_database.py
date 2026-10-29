"""Build src/data/client-database.json from the research CSVs. Run: python3 -I research/build_database.py"""
import csv, json, os, re, urllib.parse
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "data", "client-database.json")
key = lambda s: re.sub(r"[^a-z0-9]", "", s.lower().split("(")[0])
host = lambda u: urllib.parse.urlparse(u if "//" in u else "//" + u).netloc.lower().removeprefix("www.")

clients = {}
def add(name, **kw):
    k = key(name)
    c = clients.setdefault(k, {"name": name.strip(), "segments": [], "people": []})
    for f, v in kw.items():
        if f == "segment":
            if v and v not in c["segments"]: c["segments"].append(v)
        elif v and not c.get(f): c[f] = v
    return c

for r in csv.DictReader(open(os.path.join(HERE, "cape-town-prospects.csv"))):
    add(r["Name"], segment=r["Segment"], area=r["Area"], drive=r["Drive from CBD"], fit=r["Why they fit Veldform"],
        offer=r["Best-fit offer"], priority=r["Priority"], website=host(r["Website"]) if r["Website"] else "", list="Core")
for r in csv.DictReader(open(os.path.join(HERE, "all-niche-clients.csv"))):
    src = r["Source"] if r["Source"].startswith("http") else ""
    add(r["Name"], segment=r["Segment"], area=r["Area"], source=src, list="Niche")

doms = {}
for f in ["domains.csv", "domains-niche-clean.csv", "domains-niche-2-clean.csv"]:
    p = os.path.join(HERE, "agents", f)
    if os.path.exists(p):
        for r in csv.DictReader(open(p)):
            if r["Domain"]: doms.setdefault(key(r["Name"]), r["Domain"])
for k, d in doms.items():
    if k in clients and not clients[k].get("website"): clients[k]["website"] = d
bydom = {c["website"]: c for c in clients.values() if c.get("website")}

for r in csv.DictReader(open(os.path.join(HERE, "contacts.csv"))):
    c = clients.get(key(r["Company"])) or bydom.get(r["Domain"])
    if not c: continue
    ph = r["Company phone"]
    if ph and ph != "N/A" and not c.get("phone"): c["phone"] = ph
    if r["Name"] and not any(p["name"].lower() == r["Name"].lower() for p in c["people"]):
        c["people"].append({"name": r["Name"].title() if r["Name"].islower() else r["Name"], "role": r["Role"],
                            "email": r["Email"], "emailStatus": r["Email status"] if r["Email"] else "",
                            "linkedin": r["LinkedIn"]})

phones_path = os.path.join(HERE, "agents", "personal-phones.csv")
if os.path.exists(phones_path):
    for r in csv.DictReader(open(phones_path)):
        c = clients.get(key(r["Company"])) or bydom.get(r["Domain"])
        if not c:
            continue
        ph = (r.get("Personal phone") or "").strip()
        if not ph:
            continue
        for p in c["people"]:
            if p["name"].lower() == (r.get("Name") or "").strip().lower():
                p["phone"] = ph
                p["phoneStatus"] = r.get("Phone status") or ""
                break

data = sorted(clients.values(), key=lambda c: ({"A": 0, "B": 1, "C": 2}.get(c.get("priority", ""), 3), -len(c["people"]), c["name"]))
for i, c in enumerate(data): c["id"] = f"c{i:04d}"
json.dump(data, open(OUT, "w"), ensure_ascii=False, separators=(",", ":"))
print(len(data), "clients,", sum(len(c["people"]) for c in data), "people,", sum(1 for c in data if c["people"]), "with people")
