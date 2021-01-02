import phonenumbers
from phonenumbers import geocoder, carrier
x=input('enter')
# Parsing String to Phone number
phoneNumber = phonenumbers.parse(x)

# Getting carrier of a phone number
Carrier = carrier.name_for_number(phoneNumber, 'en')

# Getting region information
Region = geocoder.description_for_number(phoneNumber, 'en')

# Printing the carrier and region of a phone number
print(Carrier)
print(Region)
