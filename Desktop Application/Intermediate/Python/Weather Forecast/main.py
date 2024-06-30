import math
from tkinter import *
from geopy.geocoders import *
from tkinter import ttk,messagebox
from timezonefinder import TimezoneFinder
from datetime import *
import requests
import pytz
from PIL import Image,ImageTk

root=Tk()
root.title("Weather App")
root.geometry("890x470+300+200")
root.configure(bg="#57adff")
root.resizable(False,FALSE)


def custom_round(x):
    integer_part = int(x)  # Get the integer part of the number
    decimal_part = x - integer_part  # Get the decimal part

    if decimal_part >= 0.5:
        return integer_part + 1  # Round up if the decimal part is greater than or equal to 0.5
    else:
        return integer_part  # Round down otherwise
def getWeather():
    # Get the city name from the textfield
    city = textfield.get()

    try:
        # Geocode the city to get latitude and longitude
        geolocator = Nominatim(user_agent="your_user_agent_here")
        location = geolocator.geocode(city)

        if location:
            # Find the timezone based on latitude and longitude
            obj = TimezoneFinder()
            result = obj.timezone_at(lng=location.longitude, lat=location.latitude)

            # Update GUI elements
            timezone.config(text=result)
            long_lat.config(text=f"{round(location.latitude, 4)}°N, {round(location.longitude, 4)}°E")

            # Convert and display local time if it's valid
            home = pytz.timezone(result)
            local_time = datetime.now(home)
            if local_time:
                current_time = local_time.strftime("%I:%M %p")
                clock.config(text=current_time)
                # weather
                api = "https://api.openweathermap.org/data/2.8/onecall?lat="+str(location.latitude)+"&lon=" +str(location.longitude)+"&units=metric&exclude=hourly&appid=a1f713032b36ab1f48950fe1fe0cb9df"
                json_data=requests.get(api).json()
                #print(requests.get(api).text)

                #current
                temp=json_data['current']['temp']
                humidity=json_data['current']['humidity']
                pressure=json_data['current']['pressure']
                wind=json_data['current']['wind_speed']
                description=json_data['current']['weather'][0]['description']
                t.config(text=(temp,"°C"))
                h.config(text=(humidity,"%"))
                p.config(text=(pressure,"hPa"))
                w.config(text=((wind,"m/s")))
                d.config(text=(description))

                #first cell
                firstdayimage=json_data["daily"][0]["weather"][0]["icon"]
                photo1=ImageTk.PhotoImage(file=f"resource/{firstdayimage}@2x.png")
                firstimage.config(image=photo1)
                firstimage.image=photo1

                temday1 = custom_round(json_data['daily'][0]['temp']['max'])
                tempnight1 = custom_round(json_data['daily'][0]['temp']['min'])

                day1temp.config(text=f"Day:{temday1}\n Night:{tempnight1}")

                #second cell
                seconddayimage = json_data["daily"][1]["weather"][0]["icon"]

                img=(Image.open(f"resource/{seconddayimage}@2x.png"))
                resized_image=img.resize((50,50))
                photo2 = ImageTk.PhotoImage(resized_image)
                secondimage.config(image=photo2)
                secondimage.image = photo2

                temday2 = custom_round(json_data['daily'][1]['temp']['max'])
                tempnight2 =custom_round(json_data['daily'][1]['temp']['min'])

                day2temp.config(text=f"Day:{temday2}\n Night:{tempnight2}")


                #third cell
                thirddayimage = json_data["daily"][2]["weather"][0]["icon"]

                img = (Image.open(f"resource/{thirddayimage}@2x.png"))
                resized_image = img.resize((50, 50))
                photo3 = ImageTk.PhotoImage(resized_image)
                thirdimage.config(image=photo3)
                thirdimage.image = photo3

                temday3 = custom_round(json_data['daily'][2]['temp']['max'])
                tempnight3 = custom_round(json_data['daily'][2]['temp']['min'])

                day3temp.config(text=f"Day:{temday3}\n Night:{tempnight3}")

                #fourth cell
                fourthdayimage = json_data["daily"][3]["weather"][0]["icon"]

                img = (Image.open(f"resource/{fourthdayimage}@2x.png"))
                resized_image = img.resize((50, 50))
                photo4 = ImageTk.PhotoImage(resized_image)
                fourthimage.config(image=photo4)
                fourthimage.image = photo4

                temday4 = custom_round(json_data['daily'][3]['temp']['max'])
                tempnight4 = custom_round(json_data['daily'][0]['temp']['min'])

                day4temp.config(text=f"Day:{temday4}\n Night:{tempnight4}")

                #fifth cell
                fifthdayimage = json_data["daily"][4]["weather"][0]["icon"]

                img = (Image.open(f"resource/{fifthdayimage}@2x.png"))
                resized_image = img.resize((50, 50))
                photo5 = ImageTk.PhotoImage(resized_image)
                fifthimage.config(image=photo5)
                fifthimage.image = photo5

                temday5 = custom_round(json_data['daily'][4]['temp']['max'])
                tempnight5 = custom_round(json_data['daily'][4]['temp']['min'])

                day5temp.config(text=f"Day:{temday5}\n Night:{tempnight5}")

                #sixth cell
                sixthdayimage = json_data["daily"][5]["weather"][0]["icon"]

                img = (Image.open(f"resource/{sixthdayimage}@2x.png"))
                resized_image = img.resize((50, 50))
                photo6 = ImageTk.PhotoImage(resized_image)
                sixthimage.config(image=photo6)
                sixthimage.image = photo6

                temday6 = custom_round(json_data['daily'][5]['temp']['max'])
                tempnight6 = custom_round(json_data['daily'][5]['temp']['min'])

                day6temp.config(text=f"Day:{temday6}\n Night:{tempnight6}")

                #seventh cell
                seventhdayimage = json_data["daily"][6]["weather"][0]["icon"]

                img = (Image.open(f"resource/{seventhdayimage}@2x.png"))
                resized_image = img.resize((50, 50))
                photo7 = ImageTk.PhotoImage(resized_image)
                seventhimage.config(image=photo7)
                seventhimage.image = photo7

                temday7 = custom_round(json_data['daily'][6]['temp']['max'])
                tempnight7 = custom_round(json_data['daily'][6]['temp']['min'])

                day7temp.config(text=f"Day:{temday7}\n Night:{tempnight7}")

                #days
                first=datetime.now()
                day1.config(text=first.strftime(("%A")))

                second=first+timedelta(days=1)
                day2.config(text=second.strftime("%A"))

                third = first + timedelta(days=2)
                day3.config(text=third.strftime("%A"))

                fourth = first + timedelta(days=3)
                day4.config(text=fourth.strftime("%A"))

                fifth = first + timedelta(days=4)
                day5.config(text=fifth.strftime("%A"))

                sixth = first + timedelta(days=5)
                day6.config(text=sixth.strftime("%A"))

                seventh = first + timedelta(days=6)
                day7.config(text=seventh.strftime("%A"))



            else:
                clock.config(text="Invalid local time")

        else:
            # Handle the case where geocoding fails
            timezone.config(text="City not found")
            long_lat.config(text="")
            clock.config(text="")

    except Exception as e:
        # Handle exceptions, e.g., network errors
        timezone.config(text="Error: " + str(e))
        long_lat.config(text="")
        clock.config(text="")


#icon
image_icon=PhotoImage(file="resource/Weather App Icon.png")
root.iconphoto(False,image_icon)

Round_box=PhotoImage(file="resource/Rounded Rectangle 1.png")
Label(root,bg="#203243",image=Round_box).place(x=30,y=110)

# labels
label1=Label(root,text="Temperature",font=("Helvetica",11),fg="white",bg="#203243")
label1.place(x=40,y=120)

label2=Label(root,text="Humidity",font=("Helvetica",11),fg="white",bg="#203243")
label2.place(x=40,y=140)

label3=Label(root,text="Pressure",font=("Helvetica",11),fg="white",bg="#203243")
label3.place(x=40,y=160)

label4=Label(root,text="Wind Speed",font=("Helvetica",11),fg="white",bg="#203243")
label4.place(x=40,y=180)

label5=Label(root,text="Description",font=("Helvetica",11),fg="white",bg="#203243")
label5.place(x=40,y=200)

##search box

Search_image=PhotoImage(file="resource/Rounded Rectangle 3.png")
myimage=Label(image=Search_image,bg="#57adff")
myimage.place(x=270,y=120)

waet_image=PhotoImage(file="resource/Layer 7.png")
weatherimage=Label(root,image=waet_image,bg="#203243")
weatherimage.place(x=290,y=127)


textfield=Entry(root,justify="center",width=15,font=("poppins",25,"bold"),bg="#203243",border=0,fg="white")
textfield.place(x=370,y=130)
textfield.focus()


search_icon=PhotoImage(file="resource/Layer 6.png")
myimage_icon=Button(image=search_icon,border=0,cursor="hand2",bg="#203243",command=getWeather)
myimage_icon.place(x=645,y=125)


#Bottom box
frame=Frame(root,width=900,height=180,bg="#212120")
frame.pack(side=BOTTOM)

#bottom boxes
firstbox=PhotoImage(file="resource/Rounded Rectangle 2.png")
secondbox=PhotoImage(file="resource/Rounded Rectangle 2 copy.png")

Label(frame,image=firstbox,bg="#212120").place(x=30,y=20)
Label(frame,image=secondbox,bg="#212120").place(x=300,y=30)
Label(frame,image=secondbox,bg="#212120").place(x=400,y=30)
Label(frame,image=secondbox,bg="#212120").place(x=500,y=30)
Label(frame,image=secondbox,bg="#212120").place(x=600,y=30)
Label(frame,image=secondbox,bg="#212120").place(x=700,y=30)
Label(frame,image=secondbox,bg="#212120").place(x=800,y=30)


#clock
clock=Label(root,font=("Helvetica",30,"bold"),fg="white",bg="#57adff")
clock.place(x=30,y=20)


#timezone
timezone=Label(root,font=("Helvetica",20),fg="white",bg="#57adff")
timezone.place(x=700,y=20)

long_lat=Label(root,font=("Helvetica",10),fg="white",bg="#57adff")
long_lat.place(x=700,y=50)

#thpwd
t=Label(root,font=("helvetica",11),fg="white",bg="#203242")
t.place(x=140,y=120)
h=Label(root,font=("helvetica",11),fg="white",bg="#203242")
h.place(x=140,y=140)
p=Label(root,font=("helvetica",11),fg="white",bg="#203242")
p.place(x=140,y=160)
w=Label(root,font=("helvetica",11),fg="white",bg="#203242")
w.place(x=140,y=180)
d=Label(root,font=("helvetica",11),fg="white",bg="#203242")
d.place(x=140,y=200)

#first cell
firstframe=Frame(root,width=230,height=132,bg="#282829")
firstframe.place(x=35,y=315)

day1=Label(firstframe,font=("arial",20),bg="#282829",fg="#fff")
day1.place(x=100,y=5)

firstimage=Label(firstframe,bg="#282829")
firstimage.place(x=1,y=15)

day1temp=Label(firstframe,bg="#282829",fg="#57adff",font=("arial",15,"bold"))
day1temp.place(x=100,y=50)

#second cell
secondframe=Frame(root,width=70,height=115,bg="#282829")
secondframe.place(x=305,y=325)

day2=Label(secondframe,bg="#282829",fg="#fff")
day2.place(x=10,y=5)

secondimage=Label(secondframe,bg="#282829")
secondimage.place(x=7,y=20)

day2temp=Label(secondframe,bg="#282829",fg="#fff")
day2temp.place(x=10,y=70)

#third cell
thirdframe=Frame(root,width=70,height=115,bg="#282829")
thirdframe.place(x=405,y=325)

day3=Label(thirdframe,bg="#282829",fg="#fff")
day3.place(x=5,y=5)

thirdimage=Label(thirdframe,bg="#282829")
thirdimage.place(x=7,y=20)

day3temp=Label(thirdframe,bg="#282829",fg="#fff")
day3temp.place(x=10,y=70)

#fourth cell
fourthframe=Frame(root,width=70,height=115,bg="#282829")
fourthframe.place(x=505,y=325)

day4=Label(fourthframe,bg="#282829",fg="#fff")
day4.place(x=10,y=5)

fourthimage=Label(fourthframe,bg="#282829")
fourthimage.place(x=7,y=20)

day4temp=Label(fourthframe,bg="#282829",fg="#fff")
day4temp.place(x=10,y=70)

#fifth cell
fifthframe=Frame(root,width=70,height=115,bg="#282829")
fifthframe.place(x=605,y=325)

day5=Label(fifthframe,bg="#282829",fg="#fff")
day5.place(x=10,y=5)

fifthimage=Label(fifthframe,bg="#282829")
fifthimage.place(x=7,y=20)

day5temp=Label(fifthframe,bg="#282829",fg="#fff")
day5temp.place(x=10,y=70)

#sixth cell
sixthframe=Frame(root,width=70,height=115,bg="#282829")
sixthframe.place(x=705,y=325)

day6=Label(sixthframe,bg="#282829",fg="#fff")
day6.place(x=10,y=5)

sixthimage=Label(sixthframe,bg="#282829")
sixthimage.place(x=7,y=20)

day6temp=Label(sixthframe,bg="#282829",fg="#fff")
day6temp.place(x=10,y=70)

#seventh cell
seventhframe=Frame(root,width=70,height=115,bg="#282829")
seventhframe.place(x=805,y=325)

day7=Label(seventhframe,bg="#282829",fg="#fff")
day7.place(x=10,y=5)

seventhimage=Label(seventhframe,bg="#282829")
seventhimage.place(x=7,y=20)

day7temp=Label(seventhframe,bg="#282829",fg="#fff")
day7temp.place(x=10,y=70)



root.mainloop()