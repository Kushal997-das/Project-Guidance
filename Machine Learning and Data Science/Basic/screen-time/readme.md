# Smartphone App Usage Analysis

This folder contains data(.csv file) and code for analyzing smartphone app usage statistics. The analysis explores various metrics such as usage duration, notifications received, and times opened for different apps.

## Dataset

The dataset (`Screentime-App-Details.csv`) consists of the following columns:

- **Date:** Date of the data entry.
- **Usage:** Duration of app usage in minutes.
- **Notifications:** Number of notifications received from the app.
- **Times Opened:** Count of times the app was opened.
- **App:** Name of the app.

## Analysis

### Data Exploration

The Jupyter Notebook (`screen-time-LR.ipynb`) explores the dataset through descriptive statistics, data visualization, and insights into user behavior. The analysis includes:

- Distribution and trends of app usage over time.
- Relationships between different variables such as usage, notifications, and times opened.
- Correlation analysis to understand the associations between variables.

### Model Building

The notebook also includes machine learning model development for predicting app usage based on features like notifications and times opened. Key steps include:

- Data preprocessing, including handling categorical variables and splitting the dataset into training and testing sets.
- Training a linear regression model and evaluating its performance using Root Mean Squared Error (RMSE).

### Conclusion

The analysis provides insights into smartphone app usage patterns and demonstrates the performance of the predictive model. It discusses the model's strengths and limitations, suggests potential areas for further exploration, and highlights opportunities for improving predictive accuracy.

## Requirements

- Python 3.7 onwards
- Jupyter Notebook
- Libraries: pandas, numpy, matplotlib, seaborn, plotly, scikit-learn

