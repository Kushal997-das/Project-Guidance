import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load the image
img = cv2.imread('C:\\oops\\PyVerse\\Deep_Learning\\Object detection\\OIP.jpg')
img = cv2.resize(img, (720, 640))
frame = img.copy()

# ------------ Model for Age detection --------#
age_weights = "C:\\oops\\PyVerse\\Deep_Learning\\Object detection\\age_net.caffemodel"
age_config = "C:\\oops\\PyVerse\\Deep_Learning\\Object detection\\age_deploy.prototxt"
age_Net = cv2.dnn.readNet(age_config, age_weights)

# List of age ranges corresponding to the model's output
ageList = ['(0-2)', '(4-6)', '(8-12)', '(15-20)',
           '(25-32)', '(38-43)', '(48-53)', '(60-100)']
model_mean = (78.4263377603, 87.7689143744, 114.895847746)

# Store the image dimensions
fH = img.shape[0]
fW = img.shape[1]

# Load the pre-trained Haar Cascade face detector
# Option 1: Using OpenCV default haarcascade
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Convert image to grayscale for face detection
img_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

# Detect faces using Haar Cascade
faces = face_cascade.detectMultiScale(img_gray, scaleFactor=1.1, minNeighbors=5)

# If no faces are detected
if len(faces) == 0:
    mssg = 'No face detected'
    cv2.putText(img, f'{mssg}', (40, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 2, (200), 2)
    cv2.imshow('Output', img)
    cv2.waitKey(0)

else:
    mssg = 'Face Detected'
    # --------- Bounding Face ---------#
    for (x, y, w, h) in faces:
        box = [x, y, x + w, y + h]
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 200, 200), 2)

        face = frame[box[1]:box[3], box[0]:box[2]]

        # ----- Image preprocessing --------#
        blob = cv2.dnn.blobFromImage(
            face, 1.0, (227, 227), model_mean, swapRB=False)

        # -------Age Prediction---------#
        age_Net.setInput(blob)
        age_preds = age_Net.forward()
        age = ageList[age_preds[0].argmax()]

        cv2.putText(frame, f'{mssg}: {age}', (box[0], box[1] - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2, cv2.LINE_AA)

    # Display the output using Matplotlib
    plt.imshow(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    plt.axis('off')
    plt.show()

    # Use OpenCV to display the result
    cv2.imshow('Output', frame)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
