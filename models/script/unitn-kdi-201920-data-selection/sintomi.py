from sqlalchemy import create_engine
import pandas as pd

names = [
    'cough',
    'headache',
    'sneezing',
    'conjunctivitis',
    'diarrhoea',
    'rash',
    'back pain',
    'arthritis',
    'asthma',
    'dementia',
    'diabetes mellitus',
    'osteoporosis',
    'parkinson\'s disease'
]

engine = create_engine('postgresql://localhost:5432/prova')
query = "SELECT id, meddra_name AS name, struct_id AS cured_by FROM faers"
df = pd.read_sql_query(query, con=engine)
df.set_index('id', inplace=True)
df.name = df.name.str.lower()

res = pd.DataFrame()
for name in names:
    part = df[df.name == name]
    res = res.append(part.sample(n=4))
res = res.append(df.sample(n=20, random_state=1))
res.reset_index(inplace=True)
res.to_json('sintomi.json', orient='records')
