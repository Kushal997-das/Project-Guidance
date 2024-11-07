# Health Insurance Charges Prediction

We are analyzing a health insurance dataset using linear regression to predict insurance charges based on several factors like age, sex, BMI, number of children, smoking status, and region.

## Steps

### 1. **Loading and Inspecting Data**
The first step is to load the dataset using `read.csv()` and inspect the first few rows with `head(df)`. This helps in understanding the structure of the dataset and the variables it contains.

### 2. **Identifying Numeric Columns and Plotting**
We use `lapply()` combined with `is.numeric` to identify numeric columns in the dataset. The `plot()` function then generates plots for all numeric columns to visualize the distribution and relationships between these variables.

### 3. **Correlation Matrix**
Next, a correlation matrix is calculated using `cor()` to examine how the numeric variables relate to each other. The output is rounded to two decimal places for better readability.

### 4. **Converting Categorical Variables to Factors**
The variables `smoker`, `sex`, and `region` are categorical, so they are converted into factors using the `as.factor()` function. In R, factors are used to represent categorical data, and this ensures the variables are treated correctly in the regression model.

### 5. **Boxplot Visualizations**
Boxplots are created to visually analyze how different categories (smoker, sex, region) influence the `charges` variable. These plots allow us to compare the distribution of insurance charges between smokers and non-smokers, males and females, and different regions.

### 6. **Building the Linear Regression Model**
A linear regression model is built using the `lm()` function with `charges` as the dependent variable and all other variables as independent predictors. The `summary(model1)` function provides details of the model, such as the coefficients, p-values, and R-squared value, which help us assess the model's performance and the significance of the predictors.

### 7. **Making Predictions for New Data**
To make predictions for new customers, the `sex`, `smoker`, and `region` columns are converted back into factors. A new data frame is created for multiple new customers with relevant features, and `predict()` is used to estimate the insurance charges for these individuals.

### 8. **Displaying Predictions**
The predicted charges for the new customers are printed to the console. These predictions help in estimating how much an individual might pay for health insurance based on their characteristics.

## Key Insights

- **Correlation**: The correlation matrix reveals relationships between variables like age, BMI, and insurance charges, which are essential for predicting charges.
- **Boxplots**: The boxplots indicate that smokers generally incur higher insurance charges than non-smokers, and there are differences in charges across genders and regions.
- **Linear Regression Model**: The linear regression model captures the relationship between various factors and insurance charges. Significant predictors include age, BMI, smoking status, and region.

## Conclusion

This analysis demonstrates how a linear regression model can be used to predict health insurance charges based on demographic and health-related variables. The model highlights key factors influencing charges, such as smoking and BMI, and can be used to predict charges for new customers.

![Screenshot 2024-11-06 at 11 17 32 PM](https://github.com/user-attachments/assets/ddc1ae6b-da07-4184-a56b-3a18f3a0f5d7)

![Screenshot 2024-11-06 at 11 17 48 PM](https://github.com/user-attachments/assets/a839c1db-d8d0-49de-a37c-0b28a97d611d)

![Screenshot 2024-11-06 at 11 18 07 PM](https://github.com/user-attachments/assets/7c4b4cfa-768b-4b62-b0cf-2dab20eb787d)

![Screenshot 2024-11-06 at 11 18 15 PM](https://github.com/user-attachments/assets/ff95ee78-95c8-4e6c-acd1-29199f33c1ec)


## Future Steps

- Explore more advanced machine learning models like decision trees, random forests, or gradient boosting to improve prediction accuracy.
- Experiment with feature engineering techniques such as interaction terms or polynomial features.
- Use regularization techniques like Lasso or Ridge regression to reduce overfitting and improve generalization.

This process provides a solid foundation for predicting insurance charges based on available data, which can be expanded with additional variables or more sophisticated models.

