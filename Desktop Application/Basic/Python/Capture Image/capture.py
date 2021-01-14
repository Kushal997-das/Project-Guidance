import cv2 ,pyttsx3,speech_recognition as sr
from colored import fg, attr
import matplotlib.pyplot as plt
# Color Properties.
reset = attr('reset')
green = fg('green')
red = fg('red')
blue = fg('blue')
yellow = fg('yellow')

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

# Hears to the User.
def command():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print(reset + '\n*\n' + blue + "\n  Listening...\n" + reset)
        speak('Listening')
        r.adjust_for_ambient_noise = 1.50
        r.pause_threshold = 1
        audio = r.listen(source)
    try:
        print(green + "  Recognizing...\n" + reset)
        speak('Recognizing')
        query = r.recognize_google(audio, language='en-us')
    except:
        return "©empty_^_^_queryª"
    return query
def speak(audio):
    engine.say(audio)
    engine.runAndWait()
# Grabs Photo Using Webcam.
def grabPhoto():
    try:
        cap = cv2.VideoCapture(0)
        if cap.isOpened():
            ret, frame = cap.read()
        else:
            ret = False
        img1 = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        speak('Image Captured!')
        print(green + '\n\tDone!' + reset)
        speak('Thank you !')
        plt.imshow(img1)
        plt.title('Image Camera-1')
        plt.xticks([])
        plt.yticks([])
        plt.show()
        cap.release()
    except Exception as e:
        print(red + '\n\tUnable to Grab Image!' + reset)
        speak('Unable to Grab Image!')
print(yellow+'Say "Grab image" or "take photo" in your query' +reset)
speak("say Grab image or take photo  in your query")
if __name__ == "__main__":
        query = command().lower()
        if 'Grab image' in query or 'take photo' in query:
            grabPhoto()
        else:
            speak('Did not get it !')
