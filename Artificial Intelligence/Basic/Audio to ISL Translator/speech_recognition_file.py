import speech_recognition as sr


def convert_speech_to_text():
    AUDIO_FILE = "file.wav"
    # Initialize the recognizer
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        # reads the audio file. Here we use record instead of
        # listen
        # r.adjust_for_ambient_noise(source, duration=2)
        audio = r.record(source)
    try:
        print("The audio file contains: " + r.recognize_google(audio, language='en-IN'))
        return r.recognize_google(audio)

    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
        return "Error"
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
        return "Error"
