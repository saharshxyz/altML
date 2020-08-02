#!/usr/bin/python3.7
import sys
import json
import base64
import time
import urllib.parse
print("Content type: text/plain")

def readJSON():
    try:
        with open('data.json', 'rb') as f:
            return json.load(f)
    except:
        return readJSON()


def http_response():
    img_list=[]
    if len(sys.argv)>1:
        img_list = json.loads(base64.b64decode(sys.argv[1]))
        for i in range(len(img_list)):
            img_list[i]=urllib.parse.unquote(img_list[i])
            img_list[i]=urllib.parse.unquote(img_list[i])
    for img in img_list:
        initdata = readJSON()
        initdata['img_list'].append({})
        initdata['img_list'][len(initdata['img_list'])-1]["src"]=img
        initdata['img_list'][len(initdata['img_list'])-1]["caption"] = ""
        with open('data.json', 'w') as f:
            json.dump(initdata, f, indent=4)
    captions_array = []
    for img in img_list:
        t0 = time.time()
        receivedCaption = False
        data = readJSON()
        while not receivedCaption:
            if(time.time()-t0>90):
                captions_array.append("An error occured in the server")
                break
            data = readJSON()
            length = len(data['img_list'])
            for i in range(length):
                tag = data['img_list'][i]
                if tag['src'] == img and not tag['caption'] == '':
                    receivedCaption = True
                    captions_array.append(tag['caption'])
                    data['img_list'].pop(i)
                    with open('data.json', 'w') as f:
                        json.dump(data, f, indent=4)
                    break
                else:
                    pass
    print(captions_array)
http_response()
