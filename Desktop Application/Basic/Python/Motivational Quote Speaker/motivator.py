from gtts import gTTS
from playsound import playsound
from os import remove
from requests import get


def rand_quotes():
    res = get("https://zenquotes.io/api/random").json()[0]
    return f'{res["q"]} by {res["a"]}'


def day_quotes():
    res = get("https://zenquotes.io/api/today").json()[0]
    return f'{res["q"]} by {res["a"]}'


def say(text):
    gTTS(text=text, lang="en", slow=False).save("temp.mp3")
    playsound("C:\\Users\\DELL\\Documents\\motivator\\temp.mp3")
    remove("C:\\Users\\DELL\\Documents\\motivator\\temp.mp3")


if __name__ == "__main__":
    print("type `help` or `?` to hear motivational quotes")
    while True:
        inp = input("==>")
        if inp == "?" or inp == "help":
            print(
                """ Commands: 
            Random quote (r)
            Quote of the day (t)
            Exit (e)
            """
            )
        if inp == "r":
            say(rand_quotes())
        if inp == "t":
            say(day_quotes())
        if inp == "e":
            print("bye bye :) ")
            break