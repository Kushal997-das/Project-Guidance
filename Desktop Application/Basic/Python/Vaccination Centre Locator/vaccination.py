import time
import json
import requests
import geocoder
import re
import uuid
from pytz import timezone
from datetime import datetime

ApiKey = ""

d1 = datetime.now(timezone("Asia/Kolkata")).strftime("%d-%m-%Y")
latitude = ""
longitude = ""
zipcode = ""
latlng = True

print(
    "Search Nearby Vaccination Centre\nNote : To get complete details search using Zipcode only\n"
)
resp1 = input(
    "Press : \n\t<1> To Search Via Zipcode (Recommended)\n\t<2> To Search Using Network Data\n\t<3> To Search Using Location Data\n\t<4> To Search Using IP Address\n>> "
)

if resp1 == "1":
    zipcode = input("Please Enter your Zipcode : ")
    latlng = False

elif resp1 == "2":
    if ApiKey == "":
        print("Please Update Your Google API Key")
        quit()
    else:
        macaddress = ":".join(re.findall("..", "%012x" % uuid.getnode()))
        print("Your Mac Address : " + str(macaddress))
        payload = {
            "macAddress": macaddress,
        }
        responsell = requests.post(
            "https://www.googleapis.com/geolocation/v1/geolocate?key=" + ApiKey,
            json=payload,
        )
        datall = responsell.json()
        latitude = str(datall["location"]["lat"])
        longitude = str(datall["location"]["lng"])

elif resp1 == "3":
    loc = geocoder.ipinfo("me")
    print("Estimated Zipcode : " + str(loc.postal))
    latitude = str(loc.latlng[0])
    longitude = str(loc.latlng[1])

elif resp1 == "4":
    ipaddress = json.loads(requests.get(
        "https://ip.seeip.org/jsonip?").text)["ip"]
    print("Your IP Address : " + str(ipaddress))
    time.sleep(1)
    response = requests.get(
        "https://geolocation-db.com/json/" + str(ipaddress) + "&position=true"
    ).json()
    latitude = str(response["latitude"])
    longitude = str(response["longitude"])

else:
    print("Wrong Input")
    quit()


if latlng == False:
    url = (
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="
        + str(zipcode)
        + "&date="
        + str(d1)
    )
    response = requests.get(url)
    time.sleep(1)
    resp_json = response.json()
    i = 0
    try:
        for session in resp_json["sessions"]:
            i = i + 1
            if i > 10:
                quit()
            else:
                print("\n")
                print("Centre : " + str(session["name"]))
                print("Address : " + str(session["address"]))
                print("Block : " + str(session["block_name"]))
                print("Pincode : " + str(session["pincode"]))
                print("Date : " + str(session["date"]))
                print("From : " + str(session["from"]
                                      ) + "  To: " + str(session["to"]))
                print("Vaccine Name : " + str(session["vaccine"]))
                print(
                    "Fee : "
                    + str(session["fee"])
                    + " ; Minimum Age : "
                    + str(session["min_age_limit"])
                )
                print(
                    "Total Avaibility : "
                    + str(session["available_capacity"])
                    + " ; Dose 1 : "
                    + str(session["available_capacity_dose1"])
                    + " ; Dose 2 : "
                    + str(session["available_capacity_dose2"])
                )
    except:
        if i <= 10:
            print("Invalid Pincode")

else:
    url = (
        "https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat="
        + str(latitude)
        + "&long="
        + str(longitude)
        + "&date="
        + str(d1)
    )
    response = requests.get(url)
    time.sleep(1)
    resp_json = response.json()
    i = 0
    try:
        for center in resp_json["centers"]:
            i = i + 1
            if i > 10:
                quit()
            else:
                print("\n")
                print("Centre : " + str(center["name"]))
                print("Location : " + str(center["location"]))
                print("Block : " + str(center["block_name"]))
                print("Pincode : " + str(center["pincode"]))
    except:
        if i <= 10:
            print("Unable to find any Vaccination Centre")
