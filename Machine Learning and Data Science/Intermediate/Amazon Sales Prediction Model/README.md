### Project Description: Amazon Order Status Prediction Using Logistic Regression

**Project Title:** Predicting Amazon Order Status with Logistic Regression

**Objective:**
The objective of this project is to build a predictive model that accurately classifies the status of Amazon orders. By leveraging logistic regression and preprocessing techniques, we aim to predict various order statuses, such as "Cancelled," "Shipped," "Pending," and more.

**Dataset:**
We use a dataset containing Amazon order data, which includes various features such as order ID, fulfilment type, sales channel, shipping service level, product details, and more. The target variable is the order status.

**Steps Involved:**

1. **Data Loading:**
   - Load the dataset using pandas.
   - Display the first few rows of the dataset to understand its structure.

2. **Data Preprocessing:**
   - Identify and convert categorical columns to the 'category' type.
   - Handle missing values in categorical and numerical features.
   - One-hot encode categorical features.
   - Standardize numerical features.

3. **Feature Engineering:**
   - Define categorical and numerical features.
   - Split the data into training and testing sets.

4. **Model Building:**
   - Create a pipeline for preprocessing and logistic regression.
   - Train the model using the training data.

5. **Model Evaluation:**
   - Predict the order status for the test data.
   - Evaluate the model using accuracy score and classification report.
   - Display the confusion matrix to analyze misclassifications.

6. **Cross-Validation:**
   - Perform cross-validation to ensure the model's robustness.
   - Calculate and display the mean cross-validation accuracy.

**Results:**
The logistic regression model achieved an accuracy of 97.22% on the test set. The classification report and confusion matrix provided detailed insights into the model's performance across different order statuses.

**Tools and Libraries:**
- Python
- Pandas
- Scikit-learn (for preprocessing, model building, evaluation, and cross-validation)


**Conclusion:**
This project demonstrates a practical application of logistic regression for classifying Amazon order statuses. The approach involves careful data preprocessing, model training, and evaluation to achieve high predictive accuracy.