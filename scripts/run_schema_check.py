import json, sys
from jsonschema import Draft7Validator

with open('.github/meta-schema.json','r',encoding='utf-8') as f:
    schema = json.load(f)

with open('meta-data.json','r',encoding='utf-8') as f:
    data = json.load(f)

validator = Draft7Validator(schema)
errors = list(validator.iter_errors(data))
if errors:
    print('meta-data.json failed schema validation:')
    for e in errors:
        path = '.'.join(str(p) for p in e.path) if e.path else '<root>'
        print(f'- {path}: {e.message}')
    sys.exit(1)
print('meta-data.json conforms to schema')
