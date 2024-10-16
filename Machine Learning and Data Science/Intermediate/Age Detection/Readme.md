# Age Detection Using OpenCV and Caffe
This project implements an age detection system using OpenCV's DNN module and a pre-trained Caffe model. The system detects faces in an image and predicts the age group of each detected face.

## Table of Contents
**Requirements
Installation
Usage
Project Structure
Models
Results
Troubleshooting**

### Requirements
To run this project, you will need:

Python 3.7+
OpenCV 4.5+
Numpy
Matplotlib
Model Files

The following files are required to run the model:

Pre-trained age detection model (Caffe):
age_deploy.prototxt: Network configuration file.
mobilenet_iter_73000.caffemodel: Pre-trained model weights.
Haar Cascade classifier for face detection:
haarcascade_frontalface_default.xml: OpenCV's Haar Cascade classifier for face detection.
You can download the necessary files from the links provided in the Models section.

### Installation
Clone the repository:

```python

Copy code
git clone https://github.com/your-repo/age-detection-opencv.git
cd age-detection-opencv
```
Install dependencies:

Install the required Python packages using pip:

```python

Copy code
pip install numpy opencv-python matplotlib
```
### Usage
Prepare the image:

Place the image you want to process in the project directory. Ensure that the path in the script points to this image file.

Run the script:

To run the age detection script, use the following command:

```python

Copy code
python age.py
```
The script will detect faces in the image and display the predicted age for each detected face.

Expected Output:

The image will be displayed with bounding boxes around the detected faces.
Predicted age ranges (e.g., (25-32)) will be shown for each detected face.
Project Structure
```python

Copy code
.
├── age.py                            # Main script to run age detection
├── mobilenet_iter_73000.caffemodel    # Pre-trained Caffe model (downloaded)
├── age_deploy.prototxt                # Caffe model configuration file (downloaded)
├── haarcascade_frontalface_default.xml# Haar Cascade face detector
├── OIP.jpg                            # Sample image
└── README.md                          # This file
```
Models
Download the pre-trained models from this dataset mentioned:

Age detection model:

age_deploy.prototxt
mobilenet_iter_73000.caffemodel
Face detection model (Haar Cascade): haarcascade_frontalface_default.xml

### Results
The model will output an image with detected faces and the predicted age range for each face, such as:

Face 1: (25-32)
Face 2: (15-20)
The results are displayed using Matplotlib and OpenCV.

### Troubleshooting
Common Errors
cv2.error: (-215:Assertion failed) when loading Haar Cascade:

Ensure the path to haarcascade_frontalface_default.xml is correct. Update the path in the script if necessary.

Number of input channels should be multiple of 32 error:

This error usually occurs due to a mismatch between the input image and the model’s expected input size. Ensure that the image is properly resized and preprocessed before feeding it to the model.

Use the following blob creation for preprocessing the face image:

```python

Copy code
blob = cv2.dnn.blobFromImage(face, scalefactor=1.0, size=(224, 224), mean=model_mean, swapRB=False, crop=False)

```
No face detected: Ensure the input image is clear and well-lit for better face detection results. Increase the number of neighbors or adjust scaleFactor in detectMultiScale if necessary.
