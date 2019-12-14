from sqlalchemy import create_engine
import pandas as pd


ingredienti = pd.read_json('ingredienti_attivi.json', orient='records')
ingredienti = ingredienti['product'].drop_duplicates().tolist()

engine = create_engine('postgresql://localhost:5432/prova')


res = pd.DataFrame()
for elem in ingredienti:
    query = f"SELECT ndc_product_code AS id, generic_name AS name, form, route FROM product WHERE ndc_product_code = '{elem}'"
    df = pd.read_sql_query(query, con=engine)
    df.set_index('id', inplace=True)
    df.name = df.name.str.lower()
    res = res.append(df)
res.name = res.name.str.lower()
res = res.reset_index().drop_duplicates(
    subset='id', keep='first')
res = res.drop_duplicates(subset='name', keep='first').set_index('id')

res.reset_index(inplace=True)
res.to_json('prodotti.json', orient='records')


ingredienti = res['id'].tolist()
ing_att = pd.DataFrame()
for ing in ingredienti:
    query = f"SELECT id, active_moiety_name AS name, unit, quantity, ndc_product_code AS product, struct_id AS cures FROM active_ingredient WHERE ndc_product_code = '{ing}'"
    ing_att = ing_att.append(pd.read_sql_query(
        query, con=engine).set_index('id'))
ing_att.name = ing_att.name.str.lower()
ing_att = ing_att.reset_index().drop_duplicates(
    subset='id', keep='first').set_index('id')
ing_att.reset_index(inplace=True)
ing_att.to_json('ingredienti_attivi.json', orient='records')
