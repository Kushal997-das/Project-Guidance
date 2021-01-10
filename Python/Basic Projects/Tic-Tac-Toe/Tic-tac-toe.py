from tkinter import *
from tkinter import messagebox

window = Tk()
window.title("Welcome to a Game of TIC-TOC-TOE")
window.config(bg="#141414")
window.geometry("500x500")
window.maxsize(500,500)
window.minsize(500,500)
textin1 = StringVar()
textin2 = StringVar()
textin3 = StringVar()
textin4 = StringVar()
textin5 = StringVar()
textin6 = StringVar()
textin7 = StringVar()
textin8 = StringVar()
textin9 = StringVar()

var = StringVar()
var_var = StringVar()


Label(window,text="TIC-TAC-TOE",bg="#141414", fg="gold",font=("arial",30,"bold","italic")).place(x=120,y=0)
highlight = Label(window,text="Please read the information first to fluently play the game",fg="#00FF00",
                  font=("arial",12,"bold","italic"), bg="#141414")
highlight.place(x=35,y=50)


def reset():

    textin1.set(" ")
    textin2.set(" ")
    textin3.set(" ")
    textin4.set(" ")
    textin5.set(" ")
    textin6.set(" ")
    textin7.set(" ")
    textin8.set(" ")
    textin9.set(" ")

reset()

def evaluate():
    if textin1.get()==textin2.get()==textin3.get()=="X":
        messagebox.showinfo("Result","First player is win")
        reset()
    elif textin4.get()==textin5.get()==textin6.get()=="X":
        messagebox.showinfo("Result", "First player is win")
        reset()
    elif textin7.get()==textin8.get()==textin9.get()=="X":
        messagebox.showinfo("Result", "First player is win")
        reset()
    elif textin1.get()==textin4.get()==textin7.get()=="X":
        messagebox.showinfo("Result", "First player is win")
        reset()
    elif textin2.get() == textin5.get() == textin8.get() == "X":
        messagebox.showinfo("Result", "First player is win")
        reset()
    elif textin3.get()==textin6.get()==textin9.get()=="X":
        messagebox.showinfo("Result", "First player is win")
        reset()
    elif textin1.get()==textin5.get()==textin9.get()=="X":
        messagebox.showinfo("Result", "First player is win")
        reset()
    elif textin3.get()==textin5.get()==textin7.get()=="X":
        messagebox.showinfo("Result", "First player is win")
        reset()

    elif textin1.get() == textin2.get() == textin3.get() == "O":
        messagebox.showinfo("Result", "Second player is win")
        reset()

    elif textin4.get() == textin5.get() == textin6.get() == "O":
        messagebox.showinfo("Result", "Second player is win")
        reset()

    elif textin7.get() == textin8.get() == textin9.get() == "O":
        messagebox.showinfo("Result", "Second player is win")
        reset()

    elif textin1.get() == textin4.get() == textin7.get() == "O":
        messagebox.showinfo("Result", "Second player is win")
        reset()

    elif textin2.get() == textin5.get() == textin8.get() == "O":
        messagebox.showinfo("Result", "Second player is win")
        reset()

    elif textin3.get() == textin6.get() == textin9.get() == "O":
        messagebox.showinfo("Result", "Second player is win")
        reset()

    elif textin1.get() == textin5.get() == textin9.get() == "O":
        messagebox.showinfo("Result", "Second player is win")
        reset()

    elif textin3.get() == textin5.get() == textin7.get() == "O":
        messagebox.showinfo("Result", "Second player is win")
        reset()
    elif textin1.get() !=" " and textin2.get() !=" " and textin3.get() !=" " and textin4.get() !=" " and textin5.get() !=" " and textin6.get() !=" " and textin7.get() !=" " and textin8.get() !=" " and textin9.get() !=" ":
        messagebox.showinfo("Result", "The match is draw")
        reset()
    else:
        pass
    

def take(operator,number):
    if number=="1":
       if textin1.get() == "X" or textin1.get() == "O":
           messagebox.showerror("Overflow", "Value present already")
       else: 
        textin1.set(operator)
        evaluate()
    elif number=="2":
       if textin2.get() == "X" or textin2.get() == "O":
            messagebox.showerror("Overflow", "Value present already")
       else: 
            textin2.set(operator)
            evaluate()
    elif number=="3":
        if textin3.get() == "X" or textin3.get() == "O":
               messagebox.showerror("Overflow", "Value present already")
        else: 
            textin3.set(operator)
            evaluate()
    elif number=="4":
        if textin4.get() == "X" or textin4.get() == "O":
                messagebox.showerror("Overflow", "Value present already")
        else: 
                textin4.set(operator)
                evaluate()
    elif number=="5":
        if textin5.get() == "X" or textin5.get() == "O":
               messagebox.showerror("Overflow", "Value present already")
        else: 
                textin5.set(operator)
                evaluate()
    elif number=="6":
        if textin6.get() == "X" or textin6.get() == "O":
                messagebox.showerror("Overflow", "Value present already")
        else: 
                textin6.set(operator)
                evaluate()
    elif number=="7":
        if textin7.get() == "X" or textin7.get() == "O":
               messagebox.showerror("Overflow", "Value present already")
        else: 
                textin7.set(operator)
                evaluate()
    elif number=="8":
        if textin8.get() == "X" or textin8.get() == "O":
               messagebox.showerror("Overflow", "Value present already")
        else: 
            textin8.set(operator)
            evaluate()
    elif number=="9":
        if textin9.get() == "X" or textin9.get() == "O":
               messagebox.showerror("Overflow", "Value present already")
        else: 
                textin9.set(operator)
                evaluate()

def bye():
    decision = messagebox.askyesno("Conformation","Do you want to exit right now?")
    if decision>0:
        window.destroy()
    else:
        pass

def information():
    window2 = Tk()
    window2.title("Information")
    window2.geometry("400x400")
    window2.config(bg="green")
    window2.wm_iconbitmap("Tic-Tac-Toe-Game.ico")
    window2.maxsize(400,400)
    window2.minsize(400,400)
    name = Label(window2, bg="green", text=" 'Cross(X)'----For First Player \n\n\n\n 'Circle(O)' ----For second player\n\n\nPlease click on 'X' or 'O' at first \n\nthen write the input box number",fg="red",
                 font=("arial",15,"bold","italic"))
    name.place(x=30,y=60)
    def tata():
        window2.destroy()
    ok_button = Button(window2, width="5", bg="black", fg="red", font=("arial", 20, "bold"), text="OK", relief=RAISED, bd=8,
                       command=tata)
    ok_button.place(x=150, y=320)


reset_but = Button(window,width="8",text="Reset",font=("arial",15,"bold","italic"), bg="black", fg="red",
                   command=reset, relief=RAISED, bd=8 )
reset_but.place(x=60,y=360)

information_but = Button(window,width="10",text="Information",font=("arial",15,"bold","italic"),
                         bg="black", fg="red", relief=RAISED, bd=8, command=information)
information_but.place(x=300,y=360)

quit_but = Button(window,width="10",text="Exit",font=("arial",15,"bold","italic"),relief=RAISED, bd=5,
                  command=bye, bg="black", fg="red")
quit_but.place(x=170,y=430)


but_name = Label(window,width="3",text="1",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=10,y=80)
but1 = Entry(window,width="3",textvar=textin1,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but1.place(x=10,y=110)

but_name = Label(window,width="3",text="2",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=100,y=80)
but2 = Entry(window,width="3",textvar=textin2,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but2.place(x=100,y=110)

but_name = Label(window,width="3",text="3",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=190,y=80)
but3 = Entry(window,width="3",textvar=textin3,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but3.place(x=190,y=110)

but_name = Label(window,width="3",text="4",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=10,y=170)
but4 = Entry(window,width="3",textvar=textin4,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but4.place(x=10,y=200)

but_name = Label(window,width="3",text="5",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=100,y=170)
but5 = Entry(window,width="3",textvar=textin5,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but5.place(x=100,y=200)

but_name = Label(window,width="3",text="6",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=190,y=170)
but6 = Entry(window,width="3",textvar=textin6,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but6.place(x=190,y=200)

but_name = Label(window,width="3",text="7",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=10,y=260)
but7 = Entry(window,width="3",textvar=textin7,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but7.place(x=10,y=290)

but_name = Label(window,width="3",text="8",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=100,y=260)
but8 = Entry(window,width="3",textvar=textin8,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but8.place(x=100,y=290)

but_name = Label(window,width="3",text="9",fg="red",font=("arial",20,"bold"),bg="#141414")
but_name.place(x=190,y=260)
but9 = Entry(window,width="3",textvar=textin9,fg="green",font=("arial",20,"bold"),state="disable",
             relief=SUNKEN,bd=3)
but9.place(x=190,y=290)

def input_box_number_cross():
    box = Label(window,text="Enter the box no.",font=("arial",13,"bold","italic"),fg="brown",bg="#141414")
    box.place(x=350,y=110)
    but_number = Entry(window, width="3", fg="blue", font=("arial", 20, "bold"), relief=SUNKEN, bd=6)
    but_number.place(x=355,y=140)

    but_number.focus()

    ok_button = Button(window, width="5", bg="green", fg="yellow", font=("arial", 10, "bold"),text="OK",
                       command=lambda :take("X",but_number.get()))
    ok_button.place(x=360,y=200)


def input_box_number_circle():
    box = Label(window, text="Enter the box no.", font=("arial", 13, "bold", "italic"), fg="brown", bg="#141414")
    box.place(x=350, y=230)
    but_number = Entry(window, width="3", fg="blue", font=("arial", 20, "bold"), relief=SUNKEN,
                       bd=6)
    but_number.place(x=355,y=260)

    but_number.focus()

    ok_button = Button(window, width="5", bg="#262626", fg="yellow", font=("arial", 10, "bold"),text="OK",
                           command=lambda :take("O",but_number.get()))
    ok_button.place(x=360,y=320)

but_cross = Button(window,width="3",text="X", bg="black", fg="green",font=("arial",15,"bold"),relief=RAISED,bd=8,  command=input_box_number_cross)
but_cross.place(x=280,y=140)

but_circle = Button(window,width="3",text="O",bg="black",fg="green",font=("arial",15,"bold"),command=input_box_number_circle,relief=RAISED,bd=8)
but_circle.place(x=280,y=260)

window.mainloop()

