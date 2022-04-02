K-Nearest Neighbour is one of the simplest Machine Learning algorithms based on Supervised Learning technique.
K-NN algorithm assumes the similarity between the new case/data and available cases and put the new case into the category that is most similar to the available categories.
K-NN algorithm stores all the available data and classifies a new data point based on the similarity. This means when new data appears then it can be easily classified into a well suite category by using K- NN algorithm.
K-NN algorithm can be used for Regression as well as for Classification but mostly it is used for the Classification problems.
K-NN is a non-parametric algorithm, which means it does not make any assumption on underlying data.
It is also called a lazy learner algorithm because it does not learn from the training set immediately instead it stores the dataset and at the time of classification, it performs an action on the dataset.
KNN algorithm at the training phase just stores the dataset and when it gets new data, then it classifies that data into a category that is much similar to the new data.

K-nearest neighbors (KNN) is a type of supervised learning algorithm used for both regression and classification. KNN tries to predict the correct class for the test data by calculating the distance between the test data and all the training points. Then select the K number of points which is closet to the test data. The KNN algorithm calculates the probability of the test data belonging to the classes of ‘K’ training data and class holds the highest probability will be selected. In the case of regression, the value is the mean of the ‘K’ selected training points.

Why do we need a K-NN Algorithm?
Suppose there are two categories, i.e., Category A and Category B, and we have a new data point x1, so this data point will lie in which of these categories. To solve this type of problem, we need a K-NN algorithm. With the help of K-NN, we can easily identify the category or class of a particular dataset. 

How does K-NN work?
The K-NN working can be explained on the basis of the below algorithm:
Step-1: Select the number K of the neighbors
Step-2: Calculate the Euclidean distance of K number of neighbors
Step-3: Take the K nearest neighbors as per the calculated Euclidean distance.
Step-4: Among these k neighbors, count the number of the data points in each category.
Step-5: Assign the new data points to that category for which the number of the neighbor is maximum.
Step-6: Our model is ready.


Confusion matrix is one such important tool which helps us evaluate our model’s performance. As the name suggests it is a matrix of size n x n .where ’n’ is the number of class labels in our problem.
![image](https://user-images.githubusercontent.com/90904360/160868704-b0bd68c6-1ebb-47fa-933d-9809400bf0a8.png)

In Python’s implementation of confusion matrix, rows show actual values and columns indicate predicted values. Given below is the description of each cell.
TP (True Positives):
Actual positives in the data, which have been correctly predicted as positive by our model. Hence True Positive.
TN (True Negatives):
Actual Negatives in the data, which have been correctly predicted as negative by our model. Hence True negative.
FP (False Positives):
Actual Negatives in data, but our model has predicted them as Positive. Hence False Positive.
FN (False Negatives):
Actual Positives in data, but our model has predicted them as Negative. Hence False Negative.
![image](https://user-images.githubusercontent.com/90904360/159285629-e6f9d0f6-a53b-49dc-8878-0c8dd9c3b06e.png)
