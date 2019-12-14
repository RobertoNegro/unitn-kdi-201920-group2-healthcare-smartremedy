from sqlalchemy import create_engine
import pandas as pd


prodotti = pd.read_json('prodotti.json', orient='records')['id'].tolist()

engine = create_engine('postgresql://localhost:5432/prova')


labels1 = pd.DataFrame()
labels2 = pd.DataFrame()
for prod in prodotti:
    query = f"SELECT ndc_product_code AS product_code, label_id AS id FROM prd2label WHERE ndc_product_code = '{prod}'"
    labels1 = labels1.append(pd.read_sql_query(query, con=engine))
    query2 = f"SELECT * FROM label WHERE id = '{labels1[labels1.product_code == prod].id[0]}'"
    labels2 = labels2.append(pd.read_sql_query(query2, con=engine))
labels = pd.merge(labels1, labels2, on='id')
labels.rename(columns={'product_code': 'product'}, inplace=True)
labels.category = labels.category.str.lower()
labels.title = labels.title.str.lower()
labels = labels.drop_duplicates(subset='id', keep='first').set_index('id')

labels.reset_index(inplace=True)
labels.to_json('labels.json', orient='records')
