# 2-Digit Classification

The objective of the project is to develop a **Convolutional Neural Network (CNN)** model capable of accurately classifying 2-digit numbers extracted from the **MNIST** dataset. Each 2-digit number in the dataset is composed of two digits concatenated horizontally, presenting a challenge for classification algorithms due to increased variability and complexity.

## Dataset Used

The dataset was derived from the test set of the MNIST dataset. For single-digit numbers, the entire test set of the corresponding digit was directly used. However, for double-digit numbers, each image was constructed by combining digits from different MNIST images. For instance, to create images for class 89, the first image from class 8 was paired with the first image from class 9, the second image from class 8 with the second image from class 9, and so forth. This process continued until the minimum available count of images between the two single-digit classes was reached. Suppose, if digit 8 had 1000 images and digit 9 had 970 images, then class 89 would contain only 970 images. By using this technique the dataset had 97224 images from 100 classes (0-99).

## Approach

- Initially, the required libraries and the dataset were loaded.
- Data augmentation and pre-processing of the data was carried out using `ImageDataGenerator` to enhance generalization of model.
- The dataset was split into training and testing sets in 8:2 ratio.
- A CNN model was built for classifying the images. The model had
     
     - convolutional layers with `ReLU` activation function and batch normalization
     - max pooling layers for downsampling, reducing the size of the images
     - dropout layers to reduce overfitting
     - dense layer for final classification
- After training the model for 30 epochs with a batch size of 32, the model acheived a validation accuracy of 99.13%.
- Subsequently, the trainied model was saved as a pickle file.

## User Input

- The user can input the path of the image to be predicted.
- The input image is preprocessed by resizing it to 28x28 pixels and normalizing its pixel values by dividing them by 255.
- The model is then loaded, and predictions are made.


**Note** - Due to large size of dataset, I'm unable to upload the folder. Hence, I'm providing the jupyter notebooks of how the dataset was created.

- [Train_dataset_creation.ipynb](Train_dataset_creation.ipynb) - Dataset used for model training.
- [Test_images.ipynb](Test_images.ipynb) - Collection of images which can be used as user input. These are completely new images which are never seen by the model.