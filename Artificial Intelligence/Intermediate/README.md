# Hand Gesture

## About
Hand Gesture aims to clone the Tiktok's hand gesture filter which would take images upon detecting certain hand gestures on the screen.

## Requirements
- Python 3.x or greater.
- `pip install -r requirements.txt`

## Libraries
- OpenCV
- Mediapipe
- Tensorflow
- Keras

## Model
### Setup
The [Model](Hand_Gesture/Model) directory contains the trained model in [Model_Data](Hand_Gesture/Model/Model_Data) and the dataset for training is included in 
[Dataset](Hand_Gesture/Model/Dataset) directory. [Train_Model.py](Hand_Gesture/Model/Train_Model.py) contains the code for training the data.

The dataset contains labelled data of categories and the hand landmarks with more than `9000` rows. The categories are in the form of integers from 0 to 3, where
- 0 -> Palm
- 1 -> Ok
- 2 -> Peace
- 3 -> Other

The first column indicates the categories followed by the columns with the hand landmarks. The value `0` in columns, other than the first column, indicates the normalizing factor where the normalized distance is taken from that point with respect to all other points.

> Normalized value = (Point distance - Base value) / Max value

This provides a normalized value between `-1` to `1`.

### Training
A neural network with an `InputLayer` of single dimension of `(42,)` is used. The `OutputLayer` consists of `softmax` activation function which will give
the output in the form of `[w, x, y, z]` which indicates `[0, 1, 2, 3]` labels respectively.

<p align=center><img src="https://github.com/SAM-DEV007/Project-Guidance/assets/60264918/5401bee0-333d-4f27-bc51-9846ad50d037" alt="Model Architecture" height=500 />

`adam` optimizer is used and for loss `sparse_categorical_loss` is used.
The model is trained for `100` epochs. To safeguard it from overfitting, `EarlyStopping` is being used with a larger batch size of `128`.

The model will take time training according to the processor in-use. It should not take a huge amount of time.

### Inference
The trained model is saved as [Model.keras](Hand_Gesture/Model/Model_Data/Model.keras). The below depicts the training results of the model.

<p align=center><img src="https://github.com/SAM-DEV007/Project-Guidance/assets/60264918/f2206faf-9425-4c3a-a3d6-c05c1de16cb3" alt="Training Results" height=500 />

During evaluation, the validation accuracy and loss are `0.9138` and `0.2414` respectively.
