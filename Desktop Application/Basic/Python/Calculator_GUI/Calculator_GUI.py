from tkinter import *

# class Tk:


root = Tk()
root.geometry("744x900")
root.title("Calculator_GUI")

# define all the click function
def click(cal_1):
    global value 
    global str1
    text = cal_1.widget.cget("text")
    print(text)
    if text == "=":
        if str1.get().isdigit():
            value  = int(str1.get())
        else:
            value  = eval(str1.get()) 
        str1.set(value) 
        en.update()   

    elif text == "C":
        str1.set("")
        en.update()  
    else:
        str1.set(str1.get()+text)
        en.update()




     
str1 = StringVar()
str1.set("")
en = Entry(root, textvar = str1 , font = "italic 30 bold")
en.pack(     )


my_frmae = Frame(root ,  bd = 4 , bg = "cyan" )
b = Button(my_frmae, text = "1" ,padx = 28 , pady = 22)
b.pack(padx = 20, pady =20 , side = LEFT)
b.bind("<Button-1>",click)

b = Button(my_frmae, text = "2",   padx = 28 , pady = 22)
b.pack( side = LEFT ,padx = 10, pady = 12  )
b.bind("<Button-1>",click)

b = Button(my_frmae, text = "3" ,padx = 28 , pady = 22)
b.pack( side = LEFT ,padx = 10, pady = 12)
b.bind("<Button-1>",click)
my_frmae.pack()

my_frmae = Frame(root , bd = 4 , bg = "cyan")
b = Button(my_frmae, text = "4"  ,padx = 28 , pady = 22)
b.pack(side = LEFT , padx = 10 , pady = 12)
b.bind("<Button-1>",click)


b = Button(my_frmae, text = "5"   ,padx = 28 , pady = 22)
b.pack( side = LEFT ,padx = 10, pady = 12  )
b.bind("<Button-1>",click)

b = Button(my_frmae, text = "6"   ,padx = 28 , pady = 22)
b.pack( side = LEFT ,padx = 10, pady = 12 )
b.bind("<Button-1>",click)

my_frmae.pack()

my_frmae = Frame(root , bd = 4 , bg = "cyan")
b = Button(my_frmae, text = "7"  ,padx = 28 , pady = 22)
b.pack(side = LEFT , padx = 10 , pady = 12)
b.bind("<Button-1>",click)


b = Button(my_frmae, text = "8"   ,padx = 28 , pady = 22)
b.pack( side = LEFT ,padx = 10, pady = 12  )
b.bind("<Button-1>",click)

b = Button(my_frmae, text = "9"   ,padx = 28 , pady = 22)
b.pack( side = LEFT ,padx = 10, pady = 12 )
b.bind("<Button-1>",click)

my_frmae.pack()

my_frmae = Frame(root , bd = 4 , bg = "cyan")
b = Button(my_frmae, text = "0"  ,padx = 28 , pady = 22)
b.pack(side = LEFT , padx = 10 , pady = 12)
b.bind("<Button-1>",click)


b = Button(my_frmae, text = "C"   ,bd = 5,padx = 28 , pady = 22,bg = "blue")
b.pack( side = LEFT ,padx = 10, pady = 12  )
b.bind("<Button-1>",click)

b = Button(my_frmae, text = "*"   ,padx = 28 ,bd = 5, pady = 22,bg = "yellow")
b.pack( side = LEFT ,padx = 10, pady = 12 )
b.bind("<Button-1>",click)

my_frmae.pack()


my_frmae = Frame(root , bd = 4 , bg = "cyan")
b = Button(my_frmae, text = "/"  ,padx = 28 ,bd = 5, pady = 22,bg = "yellow" )
b.pack(side = LEFT , padx = 10 , pady = 12)
b.bind("<Button-1>",click)


b = Button(my_frmae, text = "+"   ,padx = 28 , pady = 22 ,bd = 5,bg = "yellow")
b.pack( side = LEFT ,padx = 10, pady = 12  )
b.bind("<Button-1>",click)

b = Button(my_frmae, text = "-"   ,padx = 28 , pady = 22 ,bd = 5,bg = "yellow")
b.pack( side = LEFT ,padx = 10, pady = 12 )
b.bind("<Button-1>",click)

my_frmae.pack()

my_frmae = Frame(root , bd = 4 , bg = "cyan")
b = Button(my_frmae, text = "="   ,padx = 28 , pady = 22 ,bd = 5,bg = "yellow")
b.pack( side = LEFT ,padx = 10, pady = 12 )
b.bind("<Button-1>",click)

 
b = Button(my_frmae, text = "%"   ,padx = 28 , pady = 22 ,bd = 5,bg = "yellow")
b.pack( side = LEFT ,padx = 10, pady = 12 )
b.bind("<Button-1>",click)

 
b = Button(my_frmae, text = "//"   ,padx = 28 , pady = 22 ,bd = 5,bg = "yellow")
b.pack( side = LEFT ,padx = 10, pady = 12 )
b.bind("<Button-1>",click)
my_frmae.pack()




root.mainloop()
