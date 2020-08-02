#!/usr/bin/python3.7
import sys
import json
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
    if len(sys.argv)>1:
        img=urllib.parse.unquote(sys.argv[1])
    initdata = readJSON()
    initdata['img_list'].append({})
    initdata['img_list'][len(initdata['img_list'])-1]["src"]=img
    initdata['img_list'][len(initdata['img_list'])-1]["caption"] = ""
    with open('data.json', 'w') as f:
        json.dump(initdata, f, indent=4)
    receivedCaption = False
    t0=time.time()
    while not receivedCaption:
        if(time.time()-t0>90):
            caption = "An error occured in the server"
            break
        data = readJSON()
        length = len(data['img_list'])
        for i in range(length):
            tag = data['img_list'][i]
            if tag['src'] == img and not tag['caption'] == '':
                receivedCaption = True
                caption = (tag['caption'])
                data['img_list'].pop(i)
                with open('data.json', 'w') as f:
                    json.dump(data, f, indent=4)
                break
            else:
                 pass
    print(caption)
http_response()
