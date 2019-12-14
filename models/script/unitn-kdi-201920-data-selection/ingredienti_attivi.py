from sqlalchemy import create_engine
import pandas as pd

sintomi = pd.read_json('sintomi.json', orient='records').cured_by.tolist()

engine = create_engine('postgresql://localhost:5432/prova')
res = pd.DataFrame()
for elem in sintomi:
    query = f"SELECT id, active_moiety_name AS name, unit, quantity, ndc_product_code AS product, struct_id AS cures FROM active_ingredient WHERE struct_id = {elem}"
    df = pd.read_sql_query(query, con=engine)
    df.set_index('id', inplace=True)
    df.name = df.name.str.lower()
    if not df.empty:
        if len(df) > 100:
            res = res.append(df.sample(n=100, random_state=1))
        else:
            res = res.append(df)
res = res.reset_index().drop_duplicates(
    subset='id', keep='first').set_index('id')

res.reset_index(inplace=True)
res.to_json('ingredienti_attivi.json', orient='records')
