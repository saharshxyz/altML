#!/usr/bin/python3.7
print("Content-Type: text/plain")
import time
from pickle import load
from keras.models import load_model
from utils.model import CNNModel, generate_caption_beam_search
from config import config
import os
import urllib.request
import sys
from flask import escape
import requests
import json
from keras.preprocessing.image import load_img, img_to_array


# Extract features from each image in the directory
def extract_features(filename, model, model_type):
    if model_type == 'inceptionv3':
        from keras.applications.inception_v3 import preprocess_input
        target_size = (299, 299)
    elif model_type == 'vgg16':
        from keras.applications.vgg16 import preprocess_input
        target_size = (224, 224)
    # Loading and resizing image
    image = load_img(filename, target_size=target_size)
    # Convert the image pixels to a numpy array
    image = img_to_array(image)
    # Reshape data for the model
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    # Prepare the image for the CNN Model model
    image = preprocess_input(image)
    # Pass image into model to get encoded features
    features = model.predict(image, verbose=0)
    return features


def readJSON():
    try:
        with open('data.json', 'rb') as f:
            return json.load(f)
    except:
        readJSON()

def updateJSON(data):
    try:
        data2 = readJSON()
        for i in range(len(data2['img_list'])):
            inNewJSON = False
            for j in range(len(data['img_list'])):
                if(data2['img_list'][i]['src']==data['img_list'][j]['src']):
                    data2['img_list'][i]['caption']=data['img_list'][j]['caption']
        with open('data.json', 'w') as f:
            json.dump(data, f, indent=4)
    except:
        print("Error in updateJSON")
def run_model():
    """
                *Some simple checking
        """
    assert type(
        config['max_length']) is int, 'Please provide an integer value for `max_length` parameter in config.py file'
    assert type(config[
                    'beam_search_k']) is int, 'Please provide an integer value for `beam_search_k` parameter in config.py file'
    # Load the tokenizer
    tokenizer_path = config['tokenizer_path']
    tokenizer = load(open(tokenizer_path, 'rb'))
    # Max sequence length (from training)
    max_length = config['max_length']
    # Load the model
    caption_model = load_model(config['model_load_path'])
    image_model = CNNModel(config['model_type'])
    while (True):
        data = readJSON()
        while data is None:
            time.sleep(0.25)
            data = readJSON()
        for i in range(len(data['img_list'])):
            if (data['img_list'][i]['caption'] == ''):
                try:
                    imgURL = data['img_list'][i]['src']
                    index = data['current_image_number']
                    image_file = "image" + str(index) + ".jpg"
                    urllib.request.urlretrieve(imgURL, r"" + config[
                        'test_data_path'] + image_file)
                    data['current_image_number']+=1
                    print('Generating caption for {}'.format(image_file))
                    # Encode image using CNN Model
                    image = extract_features(config['test_data_path'] + image_file,
                                             image_model, config['model_type'])
                    # Generate caption using Decoder RNN Model + BEAM search
                    t0 = time.time()
                    generated_caption = generate_caption_beam_search(caption_model, tokenizer,
                                                                     image, max_length, 
                                                                     config['beam_search_k'])
                    print(str(time.time() - t0) + " seconds to generate caption")
                    # Remove startseq and endseq
                    caption = str(generated_caption.split()[1].capitalize())
                    for x in generated_caption.split()[2:len(generated_caption.split()) - 1]:
                        caption = caption + ' ' + x
                    caption += '.'
                    print(caption)
                    data['img_list'][i]['caption']=caption
                    os.remove(r"" + config['test_data_path'] + image_file)
                    updateJSON(data)
                except:
                    data['img_list'][i]['caption']="An error occurred in the server"
                    with open('data.json', 'w') as f:
                        json.dump(data, f, indent=4)
                    print("Error, something went wrong")
run_model()