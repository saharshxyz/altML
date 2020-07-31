# All paths are relative to train_val.py file
config = {
    'images_path': 'train_val_data/Flicker8k_Dataset/',  # Make sure you put that last slash(/)
    'train_data_path': 'train_val_data/Flickr8k_text/Flickr_8k.trainImages.txt',
    'val_data_path': 'train_val_data/Flickr8k_text/Flickr_8k.devImages.txt',
    'captions_path': 'train_val_data/Flickr8k_text/Flickr8k.token.txt',
    'tokenizer_path': 'model_data/tokenizer.pkl',
    'model_data_path': 'model_data/',  # Make sure you put that last slash(/)
    'model_load_path': 'model_data/model_vgg16_epoch-17_train_loss-2.2955_val_loss-3.1448.hdf5',
    'num_of_epochs': 18,
    'max_length': 40,  # This is set manually after training of model and required for running the model
    'batch_size': 64,
    'beam_search_k': 3,
    'test_data_path': 'test_data/',  # Make sure you put that last slash(/)
    'model_type': 'vgg16',  # inceptionv3 or vgg16
    'random_seed': 1035
}

rnnConfig = {
    'embedding_size': 300,
    'LSTM_units': 256,
    'dense_units': 256,
    'dropout': 0.3
}
