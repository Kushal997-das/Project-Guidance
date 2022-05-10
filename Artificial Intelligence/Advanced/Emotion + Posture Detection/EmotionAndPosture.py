import cv2
import mediapipe as mp
from deepface import DeepFace

# Load the cascade
face_cascade = cv2.CascadeClassifier('/Users/kumarlaxmikant/PycharmProjects/pythonProject/venv/lib/python3.9/site-packages/cv2/data/haarcascade_frontalface_default.xml')

# Intialisation to draw landmarks
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_pose = mp.solutions.pose

# For webcam input:
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    cap = cv2.VideoCapture(0)
if not cap.isOpened():
    raise IOError("Cannot open webcam")

with mp_pose.Pose(min_detection_confidence=0.9, min_tracking_confidence=0.9) as pose:
  while cap.isOpened():
    success, image = cap.read()
    result = DeepFace.analyze(image, actions=['emotion'], enforce_detection=False)
    if not success:
      print("Ignoring empty camera frame.")
      # If loading a video, use 'break' instead of 'continue'.
      continue

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    font = cv2.FONT_HERSHEY_SIMPLEX

    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

        cv2.putText(image,
                    result['dominant_emotion'],
                    (x, y - 1),
                    font, 1,
                    (0, 0, 255),
                    2,
                    cv2.LINE_4)


    # To improve performance, optionally mark the image as not writeable to pass by reference.
    image.flags.writeable = False
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image)

    # Draw the pose annotation on the image.
    image.flags.writeable = True   # Draw pose annotation
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS, landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style())

    cv2.imshow('Original Video', image)

    # Stop if enter key is pressed
    k = cv2.waitKey(30) & 0xff
    if k == 13:
        break

cap.release()
cv2.destroyAllWindows()