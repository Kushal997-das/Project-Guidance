import speech_recognition as sr
import pyttsx3
from PIL import Image
import pywhatkit
import pyjokes
import wikipedia
from geopy.geocoders import Nominatim
from bs4 import BeautifulSoup
import requests


listener = sr.Recognizer()
engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)


def img_requests(txt):
    response=requests.get("https://source.unsplash.com/random{0}".format(txt))
    file=open('container.jpg','wb')
    file.write(response.content)
    img=Image.open(r"container.jpg")
    img.show()
    file.close

def talk(text):
    engine.say(text)
    engine.runAndWait()



hi = 0

if hi == 0:
    talk('hello iam kkavi')
    print('hello iam kavi Voice assistant')
    talk('How are you buddy!!!')
    print('How are you buddy!!!')
    talk('doing good right?????')
    print('doing good right?????')
    talk('think so good')
    print('think so good')
    talk('what can i do for you buddy')
    print('what can i do for you buddy')
else:
    print('listening')


def take_command():
    try:
        with sr.Microphone() as source:
            talk('listening.....')
            voice = listener.listen(source)
            comnd = listener.recognize_google(voice)
            comnd = comnd.lower()
            if 'kavi' in comnd:
                comnd = comnd.replace('kavi', '')
                print(comnd)
    except:
        pass
    return comnd

def run_kavi():
    command = take_command()
    print(command)

    if 'play' in command:
        talk('playing')
        print('playing')
        song = command.replace('play', '')
        talk('playing ' + song)
        pywhatkit.playonyt(song)
    elif 'images' in command:
        talk("""Please provide an option for Image
        # 1, HD Random Picture
        # 2, FHD Random Picture
        # 3, 2K Random Picture
        # 4, 4k Random Picture
        # 5, Picture with User Provided Keywords """)
        ans=take_command()
        print("Provided Input: ",ans)            
        talk("Please wait while we fetch the images from our database.")
        if 'one' in ans or '1' in ans or 'won' in ans:
            img_requests('/1280x720')
        elif 'two' in ans or '2' in ans or 'tu' in ans:            
            img_requests('/1920x1080')
        elif 'three' in ans or '3' in ans or 'tree' in ans or 'free' in ans:
            img_requests('/2048x1080')
        elif 'four' in ans or '4' in ans or 'for' in ans:
            img_requests('/4096x2160')
        elif 'five' in ans or '5' in ans  or 'fibe' in ans:
            talk("speak keywords seperated by commas ")
            st=take_command()
            if 'comma' in st:
                st.replace('comma',',')
            st="?"+st
            img_requests(st)
        else:
            talk("Please provide a valid Input")
    elif 'whatsapp' in command:
        pywhatkit.sendwhatmsg("+91 93611 40968", "hello iam kavi,my boss has told me to text any important info",
                              19, )
        print("Successfully Sent!")
    elif 'who is' in command:
        person = command.replace('who is', '')
        source = wikipedia.summary(person, 20)
        print(source)
        talk(source)
    elif 'search' in command:
        info = command.replace('search', '')
        general = wikipedia.search(info, 20)
        print(general)
        talk(general)
    elif 'history' in command:
        gen = command.replace('history, battle, movie review', '')
        small = wikipedia.summary(gen, 20)
        print(small)
        talk(small)
    elif 'location' in command:
        loc = Nominatim(user_agent="GetLoc")
        getloc = loc.geocode("Coimbatore")
        print(getloc.address)
        talk(getloc)
    elif 'weather' in command:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

        def weather(city):
            city = city.replace(" ", "+")
            res = requests.get(
                f'https://www.google.com/search?q={city}&oq={city}&aqs=chrome.0.35i39l2j0l4j46j69i60.6128j1j7&sourceid=chrome&ie=UTF-8',
                headers=headers)
            print("Searching...\n")
            soup = BeautifulSoup(res.text, 'html.parser')
            location = soup.select('#wob_loc')[0].getText().strip()
            time = soup.select('#wob_dts')[0].getText().strip()
            info = soup.select('#wob_dc')[0].getText().strip()
            weather = soup.select('#wob_tm')[0].getText().strip()
            print(location)
            talk(location)
            print(info)
            talk(info)
            print(time)
            talk(time)
            ab = (weather + "°C")
            talk(ab)
            print(ab)

        city1 = "coimbatore"
        talk(city1)
        city = city1 + " weather"
        weather(city)
        abc = ("Have a Nice Day Buddy")
        talk(abc)

    elif 'movie review' in command:
        movie = command.replace('movie review', '')
        small = wikipedia.summary(movie, 10)
        print(small)
        talk(small)
    elif 'are you single' in command:
        talk('no......um.i am in relationship with wireless devices')
    elif 'do you like me' in command:
        talk('yes boss definitely')
    elif 'what is your name' in command:
        talk('My devloper karunakran has named me kkavi')
    elif 'cringe' in command:
        talk('alright........he/she was funniest personn')
    elif 'joke' in command:
        joke = pyjokes.get_joke()
        print(joke)
        talk(joke)
    elif 'i am tired' in command:
        talk('you should take a break')
    elif 'favorite game' in command:
        talk('my favorite game is chess')
    elif 'can you dance' in command:
        talk('I cant dance as of now, but I can play some dance music')
    elif 'how do i look' in command:
        talk('juding from your voice, amazing')
    elif 'can you cook' in command:
        talk('i can cook you up amazing bedtime stories if you want')
    elif 'who is your friend' in command:
        talk('her name is nilla voice assistant, she was in another repository')
    else:
        talk('cant get it....please say it again')

while True:
    run_kavi()