import json

input_list = {}

with open("farmacie.json","r") as text :
    obj =  json.load(text)
    input_list["farmacie"] = obj
    with open("sito_web_dataset.json", "r") as f:
        obj2 = json.load(f)
        input_list["siti"] = obj2
        with open("drugs_general_dataset.json","r") as drug_finale:
            obj4 = json.load(drug_finale)
            input_list["medicine"] = obj4
            with open("farmacie_selling_drugs.json","r") as selling:
                obj8 = json.load(selling)
                input_list["farmacieselling"] = obj8
                with open("alldata.json","w") as final:
                    final_obj = json.dumps(input_list, indent = 4)
                    final.write(final_obj)
            
            
            
        
                
            
            
                
        
