# Hand Gesture
## About
Hand Gesture aims to clone the Tiktok's hand gesture filter which would take images upon detecting certain hand gestures on the screen. 

`HandGesture.py` is the main file to run to start the project.

## Navigation
### Directory Tree
```
Data/
├─ Ok.png
├─ Palm.png
├─ Peace.png
Model/
├─ Dataset/
│  ├─ Training_Data.csv
├─ Model_Data/
│  ├─ Model.keras
├─ Train_Model.py
HandGesture.py
requirements.txt
.gitignore
README.md
```

### Directory Information
#### main
- `HandGesture.py` is the main file to execute to start the program.
- `requirements.txt` contains the libraries and packages for the functioning of the program.
- `.gitignore` can be ignored. It contains the files to be ignored by Github on upload.
- `README.md` is the file you are currently reading.
#### Data
- `Ok.png`, `Palm.png` and `Peace.png` contains the images for the placeholder of actions.
#### Model
- `Train_Model.py` can be used to train the model.
##### Dataset
- `Training_Data.csv` is the dataset for training the model to recognize the hand gestures.
##### Model_Data
- `Model.keras` is the saved model.

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
Pre-trained model from `mediapipe` to detect hand landmarks is used. The custom trained model is for categorizing the detected landmarks with one of the four categories mentioned below.

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

During evaluation, the validation accuracy and loss are `0.9138` (91.38%) and `0.2414` (24.14%) respectively.

### Implementation
The model is integrated in [HandGesture.py](Hand_Gesture/HandGesture.py) for detecting. To prevent lag and perform optimized detection, a debounce of `1.5` seconds has been kept, i.e., the prediction will happen every `1.5` seconds.

If `Other` gesture is detected, then no action will be taken. If the prediction lies in the range from `0` to `2`, then, an image would be taken and will be overlapped by the detected hand gesture.

## Result
The camera resolution is fixed at `640 x 480` pixels, as the dimensions for the frame and the overlay gestures are absolute. Furthermore, the script can be modified to support variable resolution.

<div align="center">
  
| Initial | Final |
| :-: | :-:
| <img src="https://github.com/SAM-DEV007/Project-Guidance/assets/60264918/812d0808-59ac-4ecd-92f9-eacaf47a148b" alt="Initial" height=400 width=400 /> | <img src="https://github.com/SAM-DEV007/Project-Guidance/assets/60264918/366c830d-9994-4614-92b4-3a23cd0d9e11" alt="Final" height=400 width=400 /> |

</div>

- One of the three gestures is detected.
- Upon detection, a smaller frame in the middle of the screen gets captured and is being shown as a larger frame (original size).
- The captured frame is, then, resized to a smaller frame and overlapped to one of the detected gesture.

The below depicts the sample working of the project:
<p align=center>
<img src="https://github.com/SAM-DEV007/Project-Guidance/assets/60264918/d7a44a41-3f13-4b6d-9fc1-1e6c38a05028" alt="Working" height=400 />
</p>
