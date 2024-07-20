#step -1 (import libraries)
import numpy as np
import torch
import glob
import cv2

from PIL import Image
import matplotlib.pyplot as plt

#from sklearn.utils import shuffle

#check gpu
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
#load dataset

#Read data
data = sorted(glob.glob('data/h3.6m/Images/S1/*'))
label = sorted(glob.glob('data/h3.6m/labels/S1/*'))
print(len(data))
#convert the data in form of array.

dataset = []
labelset = []
for i in range(len(data)):
    inp = cv2.imread(data[i])
    dataset.append(inp)
    lab = cv2.imread(label[i])
    labelset.append(lab)

print('data converted into array')
print(len(dataset))
print(len(labelset))

train_size = np.floor(len(dataset) * 0.7).astype(int)
val_size = np.floor(len(dataset) * 0.2).astype(int)
test_size = np.floor(len(dataset) * 0.1).astype(int)

#split data into train and test case
# Now distribute the data into train test and validation set as  70% for train, 20% for test, 10% validation

train_data = dataset[:train_size]
val_data = dataset[train_size : train_size+val_size]
test_data = dataset[train_size + val_size : train_size+val_size+test_size]

train_label = labelset[:train_size]
val_label = labelset[train_size : train_size+val_size]
test_label = labelset[train_size + val_size : train_size+val_size+test_size]

#print(len(train_data))
#print(len(val_data))
#print(len(test_data))

#see the shape of the dataset.
img1 = train_data[0]
print(img1.shape) # it (50, 99, 3) it shows fifty pose sequence, each pose contain 99 attributes and three channels

lab1 = train_label[0]
print(lab1.shape)


# step -3 make train loader and test loader 
# build a generator

def generator(input_data, label_data, batch_size=16):
    num_samples = len(input_data)

    while True:

        for offset in range(0, num_samples, batch_size):
            # get the sample you ll use in this batch
            batch_samples = input_data[offset:offset+batch_size]
            label_samples = label_data[offset:offset+batch_size]
            #initialize x_train and y_train arrays for this batch
            X_train = []
            y_train = []

            #for each example
            for batch_sample in batch_samples:
                #load image (x) and label y
                X_train.append(batch_sample)

            for label_sample in label_samples:
                y_train.append(label_sample)

            X_train = np.array(X_train)
            y_train = np.array(y_train)

            yield X_train, y_train

        
train_loader = generator(train_data, train_label, batch_size=8)
val_loader = generator(val_data, val_label, batch_size=8)

x,y = next(train_loader)

print('x shape: ', x.shape)
print('labels shape: ', y.shape)


# plot the dataset
fig = plt.figure(1, figsize=(12, 12))
for i in range(8):
    plt.subplot(4, 4, i+1)
    plt.tight_layout()
    plt.imshow(x[i][:, :, ::-1], interpolation='none')
    plt.xticks([])
    plt.yticks([])
plt.show()


