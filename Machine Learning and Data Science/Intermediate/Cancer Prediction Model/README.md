
# Cancer Prediction Model

## Overview

This folder contains a cancer prediction model built using a regularized logistic regression algorithm. The model employs Z-score normalization for data preprocessing and utilizes popular Python libraries such as NumPy, Pandas, and Scikit-learn. The model is deployed as an interactive web application using Streamlit.

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Model Details](#model-details)
- [Deployment](#deployment)

## Usage

To run the model and launch the Streamlit app, execute the following command:

```sh
streamlit run file.py
```

This will start the Streamlit web application in your default web browser.

## Model Details

### Data Preprocessing

- **Normalization**: Z-score normalization is applied to standardize the features before training the model. This ensures that all features have normalized values, which helps in improving the model performance.

### Model

- **Algorithm**: Regularized Logistic Regression
- **Libraries Used**:
  - NumPy
  - Pandas
  - Scikit-learn

### Training

The model is trained on a dataset with features relevant to cancer prediction. Regularization is included to prevent overfitting and to enhance the model's generalization capability.

## Deployment

The model is deployed using Streamlit, which allows users to interact with the model through a web interface. The interface enables easy data input and provides predictions on whether the cancer is likely to be benign or malignant.

