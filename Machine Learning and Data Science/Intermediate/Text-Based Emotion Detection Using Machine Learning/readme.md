# Text-based Emotion Detection

This project aims to classify the emotions expressed in text data using machine learning techniques. The dataset contains text samples labeled with emotions such as joy, sadness, fear, anger, surprise, neutral, disgust, and shame.

## Dataset Overview

The dataset consists of two main columns:

- **Emotion:** The emotion category associated with each text sample.
- **Text:** The text content expressing various emotions.

Here is a summary of the emotions and their respective counts in the dataset:

- 😄 Joy: 11045
- 😢 Sadness: 6722
- 😨 Fear: 5410
- 😠 Anger: 4297
- 😲 Surprise: 4062
- 😐 Neutral: 2254
- 🤢 Disgust: 856
- 😔 Shame: 146

## Preprocessing

Before training the machine learning model, the text data underwent preprocessing, including:

- Removal of special characters, URLs, emails, and irrelevant symbols.
- Conversion to lowercase.
- Removal of stopwords.
- Lemmatization or stemming to reduce words to their base form.

## Model Training

A logistic regression model was trained using scikit-learn library. The features used for training were derived from the preprocessed text data. The model achieved an accuracy of approximately 62% on the test dataset.

**Note:** Due to convergence issues, it's recommended to increase the number of iterations or consider scaling the data.

## Requirements

Ensure you have the following dependencies installed:

- scikit-learn
- pandas
- numpy

You can install the dependencies using the following command:

```bash
pip install -r requirements.txt
```

## Usage
To use the trained model for emotion detection, follow these steps:

- Install the required dependencies.
- Load the trained model.
- Preprocess the input text data.
- Use the model to predict the emotions associated with the text data.