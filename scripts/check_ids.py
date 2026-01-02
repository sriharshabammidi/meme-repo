import json, re, sys

GUID_RE = re.compile(r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')

with open('meta-data.json','r',encoding='utf-8') as f:
    data = json.load(f)

ids = []
errors = []
for idx, it in enumerate(data):
    if 'Id' not in it:
        errors.append(f'item[{idx}]: missing Id')
        continue
    val = str(it['Id'])
    if not GUID_RE.match(val):
        errors.append(f'item[{idx}]: Id "{val}" does not match GUID pattern')
    ids.append(val)

# uniqueness
dups = set([x for x in ids if ids.count(x) > 1])
if dups:
    errors.append('duplicate Ids found: ' + ', '.join(sorted(dups)))

if errors:
    print('Id checks failed:')
    for e in errors:
        print('- ' + e)
    sys.exit(1)
print('All Ids present, GUID formatted, and unique')
