![](https://img.shields.io/badge/Programming_Language-Python-blue.svg)
![](https://img.shields.io/badge/Main_Tool_Used-OpenCV-gold.svg)
![](https://img.shields.io/badge/Supporting_Tools_Used-Pillow,_CustomTkinter-orange.svg)
![](https://img.shields.io/badge/Application-Screen_Recorder-yellow.svg)
![](https://img.shields.io/badge/Minimum_Python_Version-3.7-blue.svg)
![](https://img.shields.io/badge/Status-Complete-darklime.svg)



## Python Screen Recorder with GUI

This project demonstrates how to create a screen recording application using Python. The application features a graphical user interface (GUI) built with `customtkinter`, which allows users to start and stop screen recordings easily. The recorded video is saved in the specified format, making this tool useful for creating tutorials, capturing gameplay, or recording presentations.

### Key Features:
1. **User-Friendly Interface**: The GUI provides an intuitive way for users to input the output file name and specify a custom key to stop the recording.
2. **Real-Time Screen Capture**: Utilizes the `Pillow` library for capturing screen frames and `cv2` (OpenCV) for video encoding.
3. **Threaded Recording**: Implements threading to ensure that the GUI remains responsive while the recording is in progress.
4. **Customizable Settings**: Users can specify the output file name and an optional custom key to stop recording, enhancing usability and flexibility.

### Components:
- **Screen Capture**: Captures the screen content at a specified frame rate.
- **Video Encoding**: Encodes the captured frames into an MP4 video file.
- **GUI**: Built with `customtkinter` for an attractive and responsive user interface.
- **Concurrency**: Ensures smooth operation and responsiveness through threading.

This project is suitable for those looking to enhance their Python skills by working on an intermediate-level project that integrates multiple libraries and concepts.

---

### Example Usage:
1. **Enter File Name**: Specify the output file name in the provided entry box.
   ![image](https://github.com/jindalpriyanshu101/Project-Guidance/assets/52918255/b6da3508-078f-467b-b328-5242be6993a6)

2. **Custom Stop Key**: `Optionally`, enter a custom key to stop the recording (defaults to 'q' if left empty).
   ![image](https://github.com/jindalpriyanshu101/Project-Guidance/assets/52918255/c5888912-77f3-48af-84fe-e9fbfc8adbf6)


4. **Start Recording**: Click the "Start Recording" button to begin capturing the screen.
 ![image](https://github.com/jindalpriyanshu101/Project-Guidance/assets/52918255/45b026b2-d2bb-4870-bd3d-17121980e2cf)


5. **Stop Recording**: Use the specified key or the default 'q' ON the output screen to stop recording `or` click on button provided. The status label will update to indicate the recording has stopped.
  ![image](https://github.com/jindalpriyanshu101/Project-Guidance/assets/52918255/2e28954b-62fd-4dae-8342-2badccd56114)



This project combines practical Python programming with useful real-world application, making it a valuable addition to any developer's portfolio.
