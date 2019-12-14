import json
import uuid
input_list = {}

with open("alldata.json", "r") as file :
    obj_s = json.load(file)
    k = obj_s["siti"][0]["websiteSellingProducts"]
    for l in k:
        if "farmaco" in l :
            p =  l["farmaco"]["maximumDoseSchedule"]
            l["farmaco"]["maximumDoseScheduleID"] = str(uuid.uuid3(uuid.NAMESPACE_DNS, str(p)))
    k = obj_s["medicine"]
    for l in k :
        if "maximumDoseSchedule" in l :
            l["maximumDoseScheduleID"] = str(uuid.uuid3(uuid.NAMESPACE_DNS, str(l["maximumDoseSchedule"])))
            
            
    with open("alldata.json", "w") as final :
        obj_s = json.dumps(obj_s, indent=4)
        final.write(obj_s)        
