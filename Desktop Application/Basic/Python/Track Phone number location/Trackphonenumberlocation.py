import phonenumbers ,pyttsx3
from phonenumbers import geocoder, carrier
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

def speak(audio):
    engine.say(audio)
    engine.runAndWait()
speak('Please enter the number along with country code' )
x=input("Please enter the number along with country code ")



# Parsing String to Phone number
phoneNumber = phonenumbers.parse(x)

# Getting carrier of a phone number
Carrier = carrier.name_for_number(phoneNumber, 'en')

# Getting region information
Region = geocoder.description_for_number(phoneNumber, 'en')

# Printing the carrier and region of a phone number

print(Carrier)
speak('Your carrier name'+Carrier)
print(Region)
speak(Region+'is your region')
print('Thank You for using location tracker !')
speak('Thank You for using location tracker !')

