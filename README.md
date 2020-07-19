# altML

**Mission:** A chrome extension that looks at all the images on a webpage. If there is an image that does not have an alt tag, use ml to generate one so that screen-readers can actually recognize it.

Created by [May F.,](https://github.com/maydonut) [James K.](https://github.com/thatrobotdev), and [Jonathan A.](https://github.com/jonny13), during the [CodeLabs Internship 2020](https://labs.codeday.org/). Mentored by [Saharsh Yeruva](https://github.com/saharshy29).

## Image Caption Generator
A neural network to generate captions for an image using CNN and RNN with BEAM Search.
## Table of Contents

1. [Requirements](#1-requirements)
2. [Training parameters and results](#2-training-parameters-and-results)
3. [Generated Captions on Test Images](#3-generated-captions-on-test-images)
4. [Procedure to Train Model](#4-procedure-to-train-model)
5. [Procedure to Test on new images](#5-procedure-to-test-on-new-images)
6. [Configurations (config.py)](#6-configurations-configpy)
7. [Frequently encountered problems](#7-frequently-encountered-problems)
8. [References](#8-references)

## 1. Requirements

Recommended System Requirements to train model.

<ul type="square">
	<li>A good CPU and a GPU with at least 8GB memory</li>
	<li>At least 8GB of RAM</li>
	<li>Active internet connection so that keras can download inceptionv3/vgg16 model weights</li>
</ul>

Required libraries for Python along with their version numbers used while making & testing of this project

<ul type="square">
	<li>Python - 3.6.7</li>
	<li>Numpy - 1.16.4</li>
	<li>Tensorflow - 1.13.1</li>
	<li>Keras - 2.2.4</li>
	<li>nltk - 3.2.5</li>
	<li>PIL - 4.3.0</li>
	<li>Matplotlib - 3.0.3</li>
	<li>tqdm - 4.28.1</li>
</ul>

<strong>Flickr8k Dataset:</strong> <a href="https://forms.illinois.edu/sec/1713398">Dataset Request Form</a>

<strong>UPDATE (April/2019):</strong> The official site seems to have been taken down (although the form still works). Here are some direct download links:

<ul type="square">
	<li><a href="https://github.com/jbrownlee/Datasets/releases/download/Flickr8k/Flickr8k_Dataset.zip">Flickr8k_Dataset</a></li>
	<li><a href="https://github.com/jbrownlee/Datasets/releases/download/Flickr8k/Flickr8k_text.zip">Flickr8k_text</a></li>
	Download Link Credits:<a href="https://machinelearningmastery.com/develop-a-deep-learning-caption-generation-model-in-python/"> Jason Brownlee</a>
</ul>

<strong>Important:</strong> After downloading the dataset, put the required files in train_val_data folder

## 2. Training parameters and results

#### NOTE

- `batch_size=64` took ~14GB GPU memory in case of *InceptionV3 + AlternativeRNN* and *VGG16 + AlternativeRNN*
- `batch_size=64` took ~8GB GPU memory in case of *InceptionV3 + RNN* and *VGG16 + RNN*
- **If you're low on memory**, use google colab or reduce batch size
- In case of BEAM Search, `loss` and `val_loss` are same as in case of argmax since the model is same

| Model & Config | Argmax | BEAM Search |
| :--- | :--- | :--- |
| **InceptionV3 + AlternativeRNN** <ul><li>Epochs = 20</li><li>Batch Size = 64</li><li>Optimizer = Adam</li></ul> |<ul>**Crossentropy loss**<br>*(Lower the better)*<li>loss(train_loss): 2.4050</li><li>val_loss: 3.0527</li>**BLEU Scores on Validation data**<br>*(Higher the better)*<li>BLEU-1: 0.596818</li><li>BLEU-2: 0.356009</li><li>BLEU-3: 0.252489</li><li>BLEU-4: 0.129536</li></ul> |<ul>**k = 3**<br><br>**BLEU Scores on Validation data**<br>*(Higher the better)*<li>BLEU-1: 0.606086</li><li>BLEU-2: 0.359171</li><li>BLEU-3: 0.249124</li><li>BLEU-4: 0.126599</li></ul> |
| **InceptionV3 + RNN** <ul><li>Epochs = 11</li><li>Batch Size = 64</li><li>Optimizer = Adam</li></ul> |<ul>**Crossentropy loss**<br>*(Lower the better)*<li>loss(train_loss): 2.5254</li><li>val_loss: 3.1769</li>**BLEU Scores on Validation data**<br>*(Higher the better)*<li>BLEU-1: 0.601791</li><li>BLEU-2: 0.344289</li><li>BLEU-3: 0.230025</li><li>BLEU-4: 0.108898</li></ul> |<ul>**k = 3**<br><br>**BLEU Scores on Validation data**<br>*(Higher the better)*<li>BLEU-1: 0.605097</li><li>BLEU-2: 0.356094</li><li>BLEU-3: 0.251132</li><li>BLEU-4: 0.129900</li></ul> |
| **VGG16 + AlternativeRNN** <ul><li>Epochs = 18</li><li>Batch Size = 64</li><li>Optimizer = Adam</li></ul> |<ul>**Crossentropy loss**<br>*(Lower the better)*<li>loss(train_loss): 2.2880</li><li>val_loss: 3.1889</li>**BLEU Scores on Validation data**<br>*(Higher the better)*<li>BLEU-1: 0.596655</li><li>BLEU-2: 0.342127</li><li>BLEU-3: 0.229676</li><li>BLEU-4: 0.108707</li></ul> | <ul>**k = 3**<br><br>**BLEU Scores on Validation data**<br>*(Higher the better)*<li>BLEU-1: 0.593876</li><li>BLEU-2: 0.348569</li><li>BLEU-3: 0.242063</li><li>BLEU-4: 0.123221</li></ul> |
| **VGG16 + RNN** <ul><li>Epochs = 7</li><li>Batch Size = 64</li><li>Optimizer = Adam</li></ul> |<ul>**Crossentropy loss**<br>*(Lower the better)*<li>loss(train_loss): 2.6297</li><li>val_loss: 3.3486</li>**BLEU Scores on Validation data**<br>*(Higher the better)*<li>BLEU-1: 0.557626</li><li>BLEU-2: 0.317652</li><li>BLEU-3: 0.216636</li><li>BLEU-4: 0.105288</li></ul> |<ul>**k = 3**<br><br>**BLEU Scores on Validation data**<br>*(Higher the better)*<li>BLEU-1: 0.568993</li><li>BLEU-2: 0.326569</li><li>BLEU-3: 0.226629</li><li>BLEU-4: 0.113102</li></ul> |


## 3. Generated Captions on Test Images

**Model used** - *VGG16 + AlternativeRNN*
,


| Image | Caption |
| :---: | :--- |
| <img width="50%" src="https://images.unsplash.com/photo-1502126324834-38f8e02d7160?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Image 1"> | <ul><li><strong>BEAM Search, k=3:</strong> A man in a red shirt is climbing a rock.</li></ul>|
| <img src="https://images.unsplash.com/photo-1530870110042-98b2cb110834?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Image 2"> | <ul><li><strong>BEAM Search, k=3:</strong> A man in a wetsuit is riding a wave.</li></ul>|

Photo Credits: <a href="https://unsplash.com/@bradbarmore">Brad Bradmore</a> and <a href="https://unsplash.com/@sincerelymedia">Sincerely Media</a> on <a href="https://unsplash.com">Unsplash</a>
## 4. Procedure to Train Model

1. Clone the repository to preserve directory structure.<br>
`git clone https://github.com/saharshy29/altML.git`
2. Put the required dataset files in `train_val_data` folder (files mentioned in readme there).
3. Review `config.py` for paths and other configurations (explained below).
4. Run `train_val.py`.

## 5. Procedure to Test on new images

1. Clone the repository to preserve directory structure.<br>
`git clone https://github.com/saharshy29/altML.git`
2. Train the model to generate required files in `model_data` folder (steps given above) OR use the previously trained model weights for VGG16+AlternativeRNN with a Beam Search, k=3.
3. Put the test images in `test_data` folder.
4. Review `config.py` for paths and other configurations (explained below).
5. Run `test.py`.

## 6. Configurations (config.py)

**config**

1. **`images_path`** :- Folder path containing flickr dataset images
2. `train_data_path` :- .txt file path containing images ids for training
3. `val_data_path` :- .txt file path containing imgage ids for validation
4. `captions_path` :- .txt file path containing captions
5. `tokenizer_path` :- path for saving tokenizer
6. `model_data_path` :- path for saving files related to model
7. **`model_load_path`** :- path for loading trained model
8. **`num_of_epochs`** :- Number of epochs
9. **`max_length`** :- Maximum length of captions. This is set manually after training of model and required for test.py
10. **`batch_size`** :- Batch size for training (larger will consume more GPU & CPU memory)
11. **`beam_search_k`** :- BEAM search parameter which tells the algorithm how many words to consider at a time.
11. `test_data_path` :- Folder path containing images for testing/inference
12. **`model_type`** :- CNN Model type to use -> inceptionv3 or vgg16
13. **`random_seed`** :- Random seed for reproducibility of results

**rnnConfig**

1. **`embedding_size`** :- Embedding size used in Decoder(RNN) Model
2. **`LSTM_units`** :- Number of LSTM units in Decoder(RNN) Model
3. **`dense_units`** :- Number of Dense units in Decoder(RNN) Model
4. **`dropout`** :- Dropout probability used in Dropout layer in Decoder(RNN) Model

## 7. Frequently encountered problems

- **Out of memory issue**:
  - Try reducing `batch_size`
- **Results differ everytime I run script**:
  - Due to stochastic nature of these algoritms, results *may* differ slightly everytime. Even though I did set random seed to make results reproducible, results *may* differ slightly.
- **Results aren't very great using beam search compared to argmax**:
  - Try higher `k` in BEAM search using `beam_search_k` parameter in config. Note that higher `k` will improve results but it'll also increase inference time significantly.
## 8. References

<ul type="square">
	<li><a href="https://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Vinyals_Show_and_Tell_2015_CVPR_paper.pdf">Show and Tell: A Neural Image Caption Generator</a> - Oriol Vinyals, Alexander Toshev, Samy Bengio, Dumitru Erhan</li>
	<li><a href="https://arxiv.org/abs/1703.09137">Where to put the Image in an Image Caption Generator</a> - Marc Tanti, Albert Gatt, Kenneth P. Camilleri</li>
	<li><a href="https://machinelearningmastery.com/develop-a-deep-learning-caption-generation-model-in-python/">How to Develop a Deep Learning Photo Caption Generator from Scratch</a></li>
  <li><a href="https://github.com/dabasajay/Image-Caption-Generator">Image-Caption-Generator</li>
</ul>
