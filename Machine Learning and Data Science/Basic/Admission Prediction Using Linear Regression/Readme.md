Problem Statement and  Approach-->>
Goal is to predict the chances of admission in University based on parameters like
GRE Score,
TOEFL Score, 
University rating,
SOP,
LOR,
CGPA,
Research

Practice Skills-->>
 Machine learing algorithm like Linear Regression Used

Technique/Algorithms Covered in Python file-->>
Linear Regression- 

It is one of the most fundamental and widely known Machine Learning Algorithms which people start with. Building blocks of a Linear Regression Model are:
-Discreet/continuous independent variables
-A best-fit regression line
-Continuous dependent variable.


Regularization -

When we use regression models to train some data, there is a good chance that the model will overfit the given training data set.  Regularization helps sort this overfitting problem by restricting the degrees of freedom of a given equation i.e. simply reducing the number of degrees of a polynomial function by reducing their corresponding weights.
Different types of Regularization used in our code are:

LASSO REGRESSION(L1)
RIDGE REGRESSION(L2)
ELASTIC NET REGRESSION


Dataset-->>From Kaggle 
https://www.kaggle.com/datasets/mohansacharya/graduate-admissions
Also Updated in folder.


Prerequisites-->>
Python ,Pandas, Statistics, NumPy, Matplotlib ,Machine Learnig Concepts , Visulaization, Scikit-Learn

r2 score is 84.15% and adj r2 is 83.85% for our training.
For all regularization used we got score to be 0.753 so we can say that our OLS model has been well trained over the training data and there is no overfitting.

                                        Thank you for visiting . Keep Learning and Exploring