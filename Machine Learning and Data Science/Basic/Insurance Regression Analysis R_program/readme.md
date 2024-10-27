# Health Insurance Regression Analysis

This project is a linear regression analysis to predict health insurance charges based on various factors like age, BMI, smoking status, region, and more. The dataset used includes numeric and categorical variables, and the project involves building a model to estimate charges for new customers.

## Project Overview

The objective of this project is to understand the relationships between different factors (such as age, sex, BMI, etc.) and health insurance charges, and to predict future insurance costs using a linear regression model.

### Dataset

The dataset used in this project contains the following columns:

- `age`: Age of the customer.
- `sex`: Gender of the customer (`male` or `female`).
- `bmi`: Body mass index.
- `children`: Number of children/dependents.
- `smoker`: Whether the customer is a smoker (`yes` or `no`).
- `region`: Geographical region of residence (`northeast`, `northwest`, `southeast`, `southwest`).
- `charges`: Health insurance charges (the target variable).

### Key Steps

1. **Data Preprocessing**: 
    - Converted categorical variables (`sex`, `smoker`, and `region`) into factors to handle them properly in the analysis.
    - Visualized data using box plots to understand how variables like `smoker`, `sex`, and `region` affect `charges`.
   
2. **Correlation Analysis**:
    - Computed the correlation matrix for numeric columns to understand relationships between numerical variables.

    ```r
    round(cor(df[,num_cols]), 2)
    ```

3. **Linear Regression Model**:
    - Built a linear regression model using the `lm()` function, with `charges` as the dependent variable and all other columns as independent variables.

    ```r
    model1 = lm(charges ~. , data = df)
    ```

    - Summarized the model to understand the impact of each independent variable.

4. **Prediction**:
    - Created predictions for new customer data, based on age, BMI, smoking status, and other factors.

    ```r
    new_data_multiple <- data.frame(
      age = c(30, 45),
      sex = factor(c("male", "female"), levels = levels(df$sex)),
      bmi = c(22.5, 30.0),
      children = c(0, 2),
      smoker = factor(c("no", "yes"), levels = levels(df$smoker)),
      region = factor(c("southwest", "southeast"), levels = levels(df$region))
    )
    
    predicted_charges_multiple <- predict(model1, newdata = new_data_multiple)
    ```

### Visualizations

- Boxplots were used to visualize the effect of categorical variables (`smoker`, `sex`, `region`) on insurance charges:

    ```r
    boxplot(df$charges ~ smoker, main = 'smoker')
    boxplot(df$charges ~ sex, main = 'sex')
    boxplot(df$charges ~ region, main = 'region')
    ```

### Results

- The linear regression model provides insights into the factors influencing health insurance charges.
- Predictions for multiple customers were generated using the trained model, allowing for practical applications in pricing strategies.

### Running the Project

To run this project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/health-insurance-regression.git
    ```

2. Ensure you have R installed, along with the required libraries (`ggplot2`, etc.).

3. Run the `insurance.R` script to load the data, build the model, and make predictions.

### Conclusion

This project showcases the use of linear regression for predictive modeling in the context of health insurance. By analyzing various factors, we gain insight into what drives insurance costs and can provide predictions for new customers.



