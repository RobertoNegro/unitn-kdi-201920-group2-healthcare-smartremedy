import glob
import json
import re
import os
import shutil
from google_images_download import google_images_download

response = google_images_download.googleimagesdownload()

absFilePath = os.path.abspath(__file__)

fileDir = os.path.dirname(os.path.abspath(__file__))

targetDir = fileDir + "\logs" 

lista = []

def get_items(tentativi, s , previous_s):
  os.chdir(targetDir)
  read_files = glob.glob("*.json")
  s = ""
  for f in read_files :
    if (f!= "photosresult.json") and open(f, "r").read(1) :
      with open(f, "r") as forz:
        obj_json = json.load(forz)
        if(len(obj_json)==0):
          tmp = re.sub('\.json$','',f)
          s = s + tmp + ","
        else :
          lista.append(f)
  s = s[:-1]
  if s != previous_s :
    tentativi = 5
    previous_s = s
  else :
    tentativi = tentativi - 1
  check(tentativi, s, previous_s)


def check(tentativi,string_query, previous_query):
  global response
  if (string_query == "" or tentativi == 0):
    return
  else:
    os.chdir(fileDir)
    arguments = {"keywords": string_query, "limit":2, "no_download" : True , "extract_metadata" : True}
    response.download(arguments)
    get_items(tentativi, string_query, previous_query)


def start(input_list):
  s = "";
  for i in range(len(input_list)) :
    s = s + input_list[i] + ","
  s = s[:-1]
  arguments = {"keywords": s, "limit":2, "no_download" : True , "extract_metadata" : True}
  response.download(arguments)

def join_items():
  os.chdir(targetDir)
  with open('photosresult.json', 'w') as f:
    json_object = {"namesItemsPhotos" : input_list}
    json_object["website"] = "google.com/imghp"
    json_object["numberItems"] = len(input_list)
    photos = []
    for j in range(len(lista)):
      cerca = lista[j]
      with open(cerca, 'r') as fi :
        obj = json.load(fi)
        cerca = re.sub('\.json$','',cerca)
        newDict = {"name" : cerca, "id" : global_res[cerca], "numberPhotos" : len(obj), "photos" : obj}
        photos.append(newDict)
    json_object["aggregatePhotos"] = photos
    result_json = json.dumps(json_object, indent=2)
    f.write(result_json)
    
  shutil.move(targetDir+"\photosresult.json" , fileDir+"\photosresult.json")
  os.chdir(fileDir)

def unique_items_on_list():
  global lista
  temp = set(lista)
  lista = list(temp)
  

def remove_logs_folder_and_result_file():
  if os.path.isdir('./logs'):
    shutil.rmtree(targetDir)
  if os.path.exists('photosresult.json'):
    os.remove('photosresult.json')


global_res = {}
input_list = []
with open("prodottiformatted.json", "r") as f:
  res = json.load(f)
  for i in range(len(res)):
    keys = []
    keys.append(res[i]["product"])
    for j in range(len(res)):
      if(res[i]["found_name"] == res[j]["found_name"]) :
        keys.append(res[j]["product"])

    name = res[i]["found_name"]
    name = re.sub(r"[^\w\s]", "", name)
    keys = set(keys)
    keys = list(keys)
    global_res[name] = keys
    print(name)    
    input_list.append(name)
    
print(global_res)
input_set = set(input_list)
input_list = list(input_set)

remove_logs_folder_and_result_file()
start(input_list)
get_items(5, "", "")
unique_items_on_list()
join_items()
print(lista)





