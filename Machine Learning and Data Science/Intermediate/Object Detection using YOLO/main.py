import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load YOLO model
# download YOLO models from offical webiste of yolo algorithm

yolo = cv2.dnn.readNet("C:\\Users\\billa\\OneDrive\\Documents\\ABC\\Computer-Vision-Projects\\Object detection\\Dataset\\yolov3.weights", 
                      "C:\\Users\\billa\\OneDrive\\Documents\\ABC\\Computer-Vision-Projects\\Object detection\\Dataset\\yolov3.cfg")

# Load class names
classes = []
with open("C:\\Users\\billa\\OneDrive\\Documents\\ABC\\Computer-Vision-Projects\\Object detection\\Dataset\\coco.names", 'r') as f:
    classes = f.read().splitlines()

# Load image
img = cv2.imread("C:\\Users\\billa\\OneDrive\\Desktop\\Programs\\ML_DL\\gg.png")
if img is None:
    print("Error loading image.")
height, width = img.shape[:2]  # Get image height and width

# Prepare the image for YOLO
blob = cv2.dnn.blobFromImage(img, 1/255, (416, 416), (0, 0, 0), swapRB=True, crop=False)
yolo.setInput(blob)

# Get output layer names and run forward pass
output_layers_names = yolo.getUnconnectedOutLayersNames()
layer_output = yolo.forward(output_layers_names)

# Initialize lists
boxes = []
confidences = []
class_ids = []

for output in layer_output:
    for detection in output:
        scores = detection[5:]
        class_id = np.argmax(scores)
        confidence = scores[class_id]
        if confidence > 0.7: 
            center_x = int(detection[0] * width)
            center_y = int(detection[1] * height)
            w = int(detection[2] * width)
            h = int(detection[3] * height)

            x = int(center_x - w / 2)
            y = int(center_y - h / 2)

            # Append detection information
            boxes.append([x, y, w, h])
            confidences.append(float(confidence))
            class_ids.append(class_id)

# Perform Non-Maximum Suppression
indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

# Font for displaying labels
font = cv2.FONT_HERSHEY_PLAIN
# Random colors for each box
colors = np.random.randint(0, 255, size=(len(boxes), 3), dtype='uint8')

# Check if any boxes are returned
if len(indexes) > 0:
    indexes = indexes.flatten()  # Flatten the list of indexes

    # Draw bounding boxes and labels
    for i in indexes:
        x, y, w, h = boxes[i]
        label = str(classes[class_ids[i]])
        color = [int(c) for c in colors[i]]
        cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
        cv2.putText(img, label, (x, y - 10), font, 2, (255, 255, 255), 2)

# Display the image with matplotlib
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.axis('off')  # Hide axis
plt.show()
