from tkinter import *

# Main window initialization

app = Tk()
app.title('Gravity illustrator')
app.geometry('600x450')
app.resizable(False, False)
app.iconbitmap('astronaut.ico')

# Setting a background image

image = PhotoImage(file='bg.png')
bg_label = Label(app, image=image)
bg_label.place(x=0, y=0, relwidth=1, relheight=1)

# Creating Labels which will hold our weight data

mass = 80.0  # Enter your mass in KG
earth_g = 9.8 #m/s^2

label1 = Label(app, text='80'+' KG', bg='black', fg='green', font=('Helvetica', 30, 'bold'))
label2 = Label(app, text='0'+' KG', bg='black', fg='green', font=('Helvetica', 30, 'bold'))
label1.grid(row=0, column=0, pady=20)
label2.grid(row=0, column=1)

# Creating Labels which will hold our objects

image1 = PhotoImage(file='astronaut1.png')
image2 = PhotoImage(file='astronaut2.png')
label3 = Label(app, image=image1, width='202', height='208', borderwidth=0, bg='black')
label4 = Label(app, image=image2, width='185', height='231', borderwidth=0, bg='black')
label3.grid(row=1, column=0, padx=40)
label4.grid(row=1, column=1, padx=90)

# Creating functions to listen for values from slider

def listen1(g):

    weight = int((mass/earth_g) * float(g))
    label1.config(text=str(weight)+' KG')


def listen2(g):

    weight = int((mass/earth_g) * float(g))
    label2.config(text=str(weight)+' KG')


# Creating a slider to change the value of g(acceleration due to gravity)

slider1 = Scale(app, command=listen1, troughcolor='black' , label='value of g: ', fg='green', bg='black', font=('Helvetica', 20, 'bold'), orient='horizontal', from_=0.0, to=26.0, resolution=0.1)  #resolution is the gap between two values
slider2 = Scale(app, command=listen2, troughcolor='black' , label='value of g: ', fg='green', bg='black', font=('Helvetica', 20, 'bold'), orient='horizontal', from_=0.0, to=26.0, resolution=0.1)
slider1.grid(row=2, column=0, pady=20, ipadx=50)
slider2.grid(row=2, column=1, ipadx=50)

slider1.set(9.8)

app.mainloop()
