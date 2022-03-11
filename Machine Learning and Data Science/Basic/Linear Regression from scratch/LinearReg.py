
# Machine learning in general is all about prediction. A prediction is nothing but minimizing the error in the model so that it gives accurate predictions.
# Linear regression is a statistical method which is used to predict the value of a dependent variable (y) based on the values of the independent variables (x). 
# It assumes a linear relationship
# Y=wX+b
# Y->dependent variable
# X->independent variable
# w->weight- weight is simply the importance/strength of the independent variable, 
# b->bias- bias is a constant value which is added to the dependent variable to make the model more accurate.
# In this example we will use a simple dataset which contains the years of experience and salary.
# Here, we predict the salary based on the years of experience
#salary is the target variable that should be predicted 

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt


class Linear_Regression():
  # initiating the parameters (learning rate & no. of iterations)
  def __init__(self, learning_rate, no_of_iterations):
    self.learning_rate = learning_rate
    self.no_of_iterations = no_of_iterations

# the learning rate is a tuning parameter in an optimization algorithm 
# that determines the step size at each iteration while moving toward a minimum of a loss function.
  def fit(self, X, Y ):
    # number of training examples -m 
    #number of features -   n
    self.m, self.n = X.shape  # number of rows & columns, 
    #we only have 1 column ie years of experience
    #salary is the target variable that should be predicted
    # initiating the weight and bias 

    self.w = np.zeros(self.n) #array of zeros
    self.b = 0 #bias
    self.X = X #years of experience
    self.Y = Y #salary
    # implementing Gradient Descent
    # Gradient Descent is an optimization algorithm that is used to find the minimum of a function.
    # Why do we need to find the minimum?
    # To find the optimal values of the parameters.
    # Gradient descent measures the slope(change in error by a change in the weight) of the function, ie it takes the derivative 
    # of the loss function
    # Loss function is the error between the predicted value and the actual value. It tells you how close or far your model is from the actual prediction.


    for i in range(self.no_of_iterations):
      self.update_weights()
      #for every iteration the weights are updated to minimize the loss function


  def update_weights(self):
    Y_prediction = self.predict(self.X)
    # calculate gradients
    dw = - (2 * (self.X.T).dot(self.Y - Y_prediction)) / self.m
    db = - 2 * np.sum(self.Y - Y_prediction)/self.m
    # upadating the weights
    self.w = self.w - self.learning_rate*dw
    self.b = self.b - self.learning_rate*db
 

  def predict(self, X):
    return X.dot(self.w) + self.b



# loading the data from csv file to a pandas dataframe
salary_data = pd.read_csv(r'F:\OpenSource\Project-Guidance\Machine Learning and Data Science\Basic\Linear Regression from scratch\salary_Data.csv')

# printing the first 5 columns of the dataframe
print("Head ")
print(salary_data.head())

# last 5 rows of the dataframe
print("Tail")
print(salary_data.tail())

# number of rows & columns in the dataframe
print("Number of rows and columns")
print(salary_data.shape) 
#it has 30 rows(datapoints) and 2 columns(years and salary) 

# checking for missing values
salary_data.isnull().sum()

"""Splitting the feature & target"""

X = salary_data.iloc[:,:-1].values   #    
Y = salary_data.iloc[:,1].values

print(X) #years of experience

print(Y) #salary

"""Splitting the dataset into training & test data"""
#Train- 80% of the data is used for training  , mainly used to fit the model
# Test- the model is tested on the remaining 20% of the data,mainly used to evaluate the fit of the model

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.33, random_state = 2)

"""Training the Linear Regression model"""

model = Linear_Regression(learning_rate = 0.02, no_of_iterations=1000)

model.fit(X_train, Y_train)

# printing the parameter values ( weights & bias)

print('weight = ', model.w[0])
print('bias = ', model.b)



test_data_prediction = model.predict(X_test)





print(test_data_prediction)

"""Visualizing the predicted values & actual Values"""

plt.scatter(X_test, Y_test, color = 'red')
plt.plot(X_test, test_data_prediction, color='blue')
plt.xlabel(' Work Experience')
plt.ylabel('Salary')
plt.title(' Salary vs Experience')
plt.show()