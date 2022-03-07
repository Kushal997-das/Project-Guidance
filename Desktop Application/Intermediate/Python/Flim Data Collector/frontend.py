from tkinter import *
from tkinter import messagebox
import backend

def get_selected_row(event):
    try:
        global selected_tuple
        index=list1.curselection()[0]
        selected_tuple=list1.get(index)
        e1.delete(0,END)
        e1.insert(END,selected_tuple[1])
        e2.delete(0,END)
        e2.insert(END,selected_tuple[2])
        e3.delete(0,END)
        e3.insert(END,selected_tuple[3])
        e4.delete(0,END)
        e4.insert(END,selected_tuple[4])
        e5.delete(0,END)
        e5.insert(END,selected_tuple[5])
    except IndexError:
        pass
    

def view_command():
    try:
        list1.delete(0,END)
        for row in backend.view():
            list1.insert(END,row)
    except:
        messagebox.showerror("Error", "View Related Error Came")        

def search_command():
    try:
        list1.delete(0,END)
        for row in backend.search(title_text.get(),director_text.get(),year_text.get(),genre_text.get()):
            list1.insert(END,row)
    except:
        messagebox.showerror("Error", "Search Related Error Came")                

def add_command():
    try:
        backend.insert(title_text.get(),year_text.get(),director_text.get(),review_text.get(),genre_text.get())
        list1.delete(0,END)
    except:
        messagebox.showerror("Error", "Insertion Related Error Came")     

def update_command():
    try:
        backend.delete(selected_tuple[0])
        print(selected_tuple[0],selected_tuple[1],selected_tuple[2],selected_tuple[3],selected_tuple[4],selected_tuple[5])
    except:
        messagebox.showerror("Error", "Update Related Error Came")         
def delete_command():
    try:
        backend.delete(selected_tuple[0])
    except:
        messagebox.showerror("Error", "Delete Related Error Came")         
def close_command():
	window.destroy()




window = Tk()
window.wm_title("FilmLog")
window.config(bg="#141414")
window.geometry("654x600")
window.maxsize(654,650)
window.minsize(654,650)

frame = Frame(window)
frame.place(x=0,y=230)

Label(window, text="FilmLog", font=("Arial", 20, "bold", "italic"), bg="#141414", fg="orange").place(x=250, y=7)

l1=Label(window,text="Title", font=("Arial", 12, "bold"), fg="#00FF00", bg="#141414")
l1.place(x=10,y=10+50)

l2=Label(window,text="Year", font=("Arial", 12, "bold"), fg="#00FF00", bg="#141414")
l2.place(x=10,y=60+50)

l3=Label(window,text="Director", font=("Arial", 12, "bold"), fg="#00FF00", bg="#141414")
l3.place(x=320,y=10+50)

l4=Label(window,text="Review", font=("Arial", 12, "bold"), fg="#00FF00", bg="#141414")
l4.place(x=320, y=65+50)

l5=Label(window,text='Genre', font=("Arial", 12, "bold"), fg="#00FF00", bg="#141414")
l5.place(x=160, y=120+50)

title_text= StringVar()
e1=Entry(window,textvariable=title_text, font=("Arial",15,"bold"), relief=SUNKEN, bd=3, bg="#3d3d3d", fg="gold", insertbackground="gold")
e1.place(x=60, y=10+50)

year_text= StringVar()
e2=Entry(window,textvariable=year_text, font=("Arial",15,"bold"), relief=SUNKEN, bd=3, bg="#3d3d3d", fg="gold", insertbackground="gold")
e2.place(x=60,y=60+50)

director_text= StringVar()
e3=Entry(window,textvariable=director_text, font=("Arial",15,"bold"), relief=SUNKEN, bd=3, bg="#3d3d3d", fg="gold", insertbackground="gold")
e3.place(x=320+80,y=10+50)

review_text= StringVar()
e4=Entry(window,textvariable=review_text, font=("Arial",15,"bold"), relief=SUNKEN, bd=3, bg="#3d3d3d", fg="gold", insertbackground="gold")
e4.place(x=320+80, y=60+50)

genre_text= StringVar()
e5=Entry(window,textvariable=genre_text, font=("Arial",15,"bold"), relief=SUNKEN, bd=3, bg="#3d3d3d", fg="gold", insertbackground="gold")
e5.place(x=230, y=120+50)

e1.focus()

list1= Listbox(frame,height=13,width=89, relief=RIDGE, bd=5, bg="#3d3d3d", fg="gold", font=("Arial",10,"bold"))
list1.pack(side=LEFT)

sb1=Scrollbar(frame)
sb1.pack(fill=Y,side=RIGHT)
list1.configure(yscrollcommand=sb1.set)
sb1.configure(command=list1.yview)

list1.bind('<<ListboxSelect>>',get_selected_row)

b1=Button(window,text="View All", font=("Arial", 15, "bold"), width=12,bg='#262626',fg="orange",command=view_command)
b1.place(x=10, y=500)

b2=Button(window,text="Search a Film", font=("Arial", 15, "bold"), width=12,bg='#262626',fg="orange",command=search_command)
b2.place(x=10, y=580)

b3=Button(window,text="Add a Film",font=("Arial", 15, "bold"), width=14, bg='#262626',fg="orange",command=add_command)
b3.place(x=230, y=500)

b4=Button(window,text="Update Selected",font=("Arial", 15, "bold"), bg='#262626',fg="orange",command=update_command)
b4.place(x=233, y=580)

b5=Button(window,text="Delete Selected",font=("Arial", 15, "bold"), bg='#262626',fg="orange",command=delete_command)
b5.place(x=480, y=500)

b6=Button(window,text="Close",font=("Arial", 15, "bold"), width=12, bg='#262626',fg="orange",command=close_command)
b6.place(x=485, y=580)

window.mainloop()
