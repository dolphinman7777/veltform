"""Resolve each niche prospect's official website domain via treg.web.search.

Usage: python3 -I resolve_domains.py <all-niche-clients.csv> <out domains.csv> <exclude domains.csv>
"""
import csv, json, os, sys, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
TOKEN = open(os.path.join(HERE, ".treg_token")).read().strip()
BLOCK = ("wikipedia", "facebook", "instagram", "linkedin", "tripadvisor", "booking.com", "airbnb",
         "google", "youtube", "tiktok", "x.com", "twitter", "pinterest", "yelp", "eatout", "timeout",
         "theculturetrip", "travelstart", "cometocapetown", "foodandhome", "bizcommunity", "iol.co.za",
         "news24", "dailymaverick", "businesstech", "sa-venues", "portfoliocollection", "happycow",
         "lifeisagarden", "pink-book", "bridebook", "mg.co.za", "cylex", "yellowpages", "houzz",
         "sadecor", "capetownmagazine", "capetownetc", "capetown.travel", "estate-living", "bookretreats",
         "safarinow", "lekkeslaap", "expedia", "hotels.com", "agoda", "trip.com", "wine.co.za",
         "winemag", "takealot", "woolworths", "yuppiechef", "gumtree", "crunchbase", "cbinsights",
         "zoominfo", "rocketreach", "apollo.io", "dnb.com", "wanderlog", "theginguild", "untappd",
         "ratebeer", "kayak", "plek.co.za", "places.co.za", "travelground", "wedding", "snupit",
         "zomato", "dineplan", "quicket", "allafrica", "techcentral", "freshplaza", "agrinews",
         "routard", "mrandmrssmith", "i-escape", "thehotelguru", "fin24", "timeslive", "sundaytimes",
         "pressreader", "medium.com", "blogspot", "wordpress.com", "wixsite", "pages.dev", "shopstar")
spent = 0


def search(q):
    global spent
    req = urllib.request.Request(
        "https://treg.to/call/treg.web.search", method="POST",
        data=json.dumps({"q": q, "limit": 5}).encode(),
        headers={"X-Treg-Token": TOKEN, "Content-Type": "application/json",
                 "X-Treg-Route-Max-Cost": "0.01"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            spent += int(r.headers.get("X-Treg-Cost-Micro") or 0)
            d = json.loads(r.read().decode())
    except Exception:
        return []
    o = d.get("output") or {}
    return [x.get("url") or x.get("link") or "" for x in (o.get("results") or o.get("organic") or [])]


STOP = {'the','and','cape','town','farm','estate','house','hotel','lodge','company','south','africa',
        'wine','wines','club','school','village','retreat','brewery','brewing','distillery'}


def name_match(name, host):
    import re
    d = host.split('.')[0].replace('-', '')
    toks = [t for t in re.findall(r'[a-z0-9]+', name.lower().replace("'", '')) if t not in STOP and len(t) >= 4]
    return any(t[:5] in d for t in toks)


def main():
    src, out, excl = sys.argv[1:4]
    skip = {r["Domain"] for r in csv.DictReader(open(excl))}
    done = set()
    if os.path.exists(out):
        done = {r["Name"] for r in csv.DictReader(open(out))}
    new = not os.path.exists(out)
    f = open(out, "a", newline="")
    w = csv.writer(f)
    if new:
        w.writerow(["Priority", "Name", "Domain"])
    seen = set(skip)
    for r in csv.DictReader(open(src)):
        if r["Name"] in done:
            continue
        dom = ""
        for u in search(f'{r["Name"]} {r["Segment"]} Western Cape'):
            h = urllib.parse.urlparse(u).netloc.lower().removeprefix("www.")
            if h and not any(b in h for b in BLOCK) and name_match(r["Name"], h):
                dom = h
                break
        if dom in seen:
            dom = ""  # already covered (core list or duplicate)
        seen.add(dom)
        w.writerow(["N:" + r["Segment"], r["Name"], dom])
        f.flush()
    print(f"resolve spent ${spent/1e6:.4f}")


if __name__ == "__main__":
    main()
