import mediapipe as mp
import numpy as np
import tensorflow as tf

from pathlib import Path

import cv2
import copy
import itertools
import os
import time


def landmark_list(image, landmarks):
    '''Generates the landmark list'''

    image_width, image_height = image.shape[1], image.shape[0]

    landmark_point = []

    # Keypoint
    for _, landmark in enumerate(landmarks.landmark):
        landmark_x = min(int(landmark.x * image_width), image_width - 1)
        landmark_y = min(int(landmark.y * image_height), image_height - 1)

        landmark_point.append([landmark_x, landmark_y])

    return pre_process_data(landmark_point)


def pre_process_data(landmark_list):
    '''Pre processes the data for the trained model'''

    temp_landmark_list = copy.deepcopy(landmark_list)

    # Convert to relative coordinates
    base_x, base_y = 0, 0
    for index, landmark_point in enumerate(temp_landmark_list):
        if index == 0:
            base_x, base_y = landmark_point[0], landmark_point[1]

        temp_landmark_list[index][0] = temp_landmark_list[index][0] - base_x
        temp_landmark_list[index][1] = temp_landmark_list[index][1] - base_y

    # Convert to a one-dimensional list
    temp_landmark_list = list(itertools.chain.from_iterable(temp_landmark_list))

    # Normalization
    max_value = max(list(map(abs, temp_landmark_list)))

    def normalize_(n):
        return n / max_value

    temp_landmark_list = list(map(normalize_, temp_landmark_list))

    return temp_landmark_list


def detect_hands(frame, hands, model_predict):
    '''Detects the hand and returns the suitable gesture'''

    # Gestures
    # ['Palm', 'OK', 'Peace', 'Other']

    # Converts to RGB
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb)

    # Detection
    hand_landmarks = result.multi_hand_landmarks
    gesture = None

    if hand_landmarks:
        for handLMs in hand_landmarks:
            # Gets the hand and takes the coordinates
            if handLMs:
                # Predicts the hand gesture
                landmark = landmark_list(frame, handLMs)

                result = model_predict.predict(np.array([landmark], dtype=np.float32), verbose=0)
                result_idx = np.argmax(np.squeeze(result))

                if np.squeeze(result)[result_idx] < 0.75: 
                    gesture = 3
                else:
                    gesture = result_idx
    
    if gesture == 3: gesture = None # 'Other' is ignored
    return gesture


def mask(img):
    '''Masks the image'''

    img2gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(img2gray, 1, 255, cv2.THRESH_BINARY)

    return mask


def pre_img(frame, size, img, mask_img, gesture):
    '''Initializes the hand img to the frame'''

    img_section = [-600, -360, -130]
    img_x = img_section[gesture]

    roi = frame[-465: -465+size, img_x: img_x+size]
  
    # Set an index of where the mask is
    roi[np.where(mask_img)] = 0
    roi += img


def get_img(frame):
    '''Gets the images after the gesture'''

    # Creates the boundary
    cv2.rectangle(frame, [130, 170], [510, 450], (0, 0, 0), 2)
    # Borders
    cv2.rectangle(frame, [110, 150], [530, 170], (255, 255, 255), -1) # Top
    cv2.rectangle(frame, [110, 450], [530, 470], (255, 255, 255), -1) # Bottom
    cv2.rectangle(frame, [110, 170], [130, 450], (255, 255, 255), -1) # Left
    cv2.rectangle(frame, [510, 170], [530, 450], (255, 255, 255), -1) # Right
    # External border
    cv2.rectangle(frame, [110, 150], [530, 470], (0, 0, 0), 2)
        
    # Captures the image
    img = frame[149: 472, 109: 532] # Gets the image

    return img


def hold_img_main(frame, img, mask_img):
    '''Holds the img on the screen for a while'''

    roi = frame[149: 472, 109: 532]
    roi[np.where(mask_img)] = 0

    roi += img


def change_img(frame, img, mask_img, gesture: int, img_size: int):
    '''Changes the gesture image'''

    img_section = [-600, -400, -200]
    img_x = img_section[gesture]

    roi = frame[-465: -465+img_size, img_x: img_x+img_size]
    roi[np.where(mask_img)] = 0

    roi += img


def main():
    '''The main function to start the filter'''

    # Default variables
    cam = cv2.VideoCapture(0)
    cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    show_palm = True
    show_ok = True
    show_peace = True

    img_busy = False

    model_db = 0
    gesture = None

    model_predict = tf.keras.models.load_model(str(Path(__file__).resolve().parent / 'Model/Model_Data/Model.keras'))

    mphands = mp.solutions.hands
    hands = mphands.Hands()

    # Image holder
    mask_big_img = None
    big_img = None
    big_img_time = None

    mask_palm_img_holder = None
    mask_ok_img_holder = None
    mask_peace_img_holder = None

    palm_img_holder = None
    ok_img_holder = None
    peace_img_holder = None

    # Temp image holder
    temp_mask_palm_img_holder = None
    temp_mask_ok_img_holder = None
    temp_mask_peace_img_holder = None

    temp_palm_img_holder = None
    temp_ok_img_holder = None
    temp_peace_img_holder = None

    img_size = 150

    # File path
    palm_path = str(Path(__file__).resolve().parent / 'Data/Palm.png')
    ok_path = str(Path(__file__).resolve().parent / 'Data/OK.png')
    peace_path = str(Path(__file__).resolve().parent / 'Data/Peace.png')

    # Images
    size = 100

    palm = cv2.imread(palm_path)
    palm = cv2.resize(palm, (size, size))
    mask_palm = mask(palm)
    
    ok = cv2.imread(ok_path)
    ok = cv2.resize(ok, (size, size))
    mask_ok = mask(ok)

    peace = cv2.imread(peace_path)
    peace = cv2.resize(peace, (size, size))
    mask_peace = mask(peace)

    while True:
        _, frame = cam.read() # Reads the camera
        frame = cv2.flip(frame, 1) # Flips the video

        # Adds the images
        if show_palm: pre_img(frame, size, palm, mask_palm, 0)
        else: change_img(frame, palm_img_holder, mask_palm_img_holder, 0, img_size)
        if show_ok: pre_img(frame, size, ok, mask_ok, 1)
        else: change_img(frame, ok_img_holder, mask_ok_img_holder, 1, img_size)
        if show_peace: pre_img(frame, size, peace, mask_peace, 2)
        else: change_img(frame, peace_img_holder, mask_peace_img_holder, 2, img_size)

        # Displays the big image
        if big_img is not None:
            if (time.time() - big_img_time) > 1.5:
                # Reset
                img_busy = False
                model_db = 0
                big_img_time = None
                big_img = None
                mask_big_img = None
            else:
                hold_img_main(frame, big_img, mask_big_img) # Display the big img
        
        if big_img is None:
            # Updates palm image
            if temp_palm_img_holder is not None:
                # Assign
                palm_img_holder = temp_palm_img_holder
                mask_palm_img_holder = temp_mask_palm_img_holder

                # Reset
                temp_mask_palm_img_holder = None
                temp_palm_img_holder = None
                show_palm = False

            # Updates ok image
            if temp_ok_img_holder is not None:
                # Assign
                ok_img_holder = temp_ok_img_holder
                mask_ok_img_holder = temp_mask_ok_img_holder

                # Reset
                temp_mask_ok_img_holder = None
                temp_ok_img_holder = None
                show_ok = False

            # Updates peace image
            if temp_peace_img_holder is not None:
                # Assign
                peace_img_holder = temp_peace_img_holder
                mask_peace_img_holder = temp_mask_peace_img_holder

                # Reset
                temp_mask_peace_img_holder = None
                temp_peace_img_holder = None
                show_peace = False
        
        # Adds debounce
        if not model_db: model_db = time.time()

        # Detects the hands
        if not img_busy:
            gesture = detect_hands(frame[165: 480, 0: 640], hands, model_predict)

        if gesture is not None and (time.time() - model_db) > 1 and not img_busy:
            # Gestures
            # ['Palm', 'OK', 'Peace']

            img_busy = True # Marks the process busy
            temp_frame = copy.deepcopy(frame) # Copies the frame

            img = get_img(temp_frame) # Gets the image
            img = cv2.detailEnhance(img, sigma_r=0.15, sigma_s=3) # Enchances the image

            # Hold the img on the screen for a while
            m = mask(img)
            hold_img_main(frame, img, m)

            big_img_time = time.time()
            big_img = img
            mask_big_img = m

            # Sets the image on the screen
            img = cv2.resize(img, (img_size, img_size)) # Resize
            if gesture == 0: # Palm
                temp_palm_img_holder = img
                temp_mask_palm_img_holder = mask(img)
            elif gesture == 1: # Ok
                temp_ok_img_holder = img
                temp_mask_ok_img_holder = mask(img)
            elif gesture == 2: # Peace
                temp_peace_img_holder = img
                temp_mask_peace_img_holder = mask(img)
            
            gesture = None # Reset

        cv2.imshow('Cam', frame) # Shows the video

        # Closes the window
        # Q button
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        # Esc button
        if cv2.waitKey(1) == 27:
            break

        # X button on the top of the window
        if cv2.getWindowProperty('Cam', cv2.WND_PROP_VISIBLE) < 1:
            break
    
    cam.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()
