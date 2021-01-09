                                # Searching Algorithm Visualizer #
from tkinter import *
from tkinter import messagebox
from PIL import Image,ImageTk
import time

class Initialization:
    def __init__(self,root):
        self.window= root
        self.store=[10,20,30,40,50,60,70,80,90,100]

        self.search_position_linear = -1
        self.search_position_binary = -1

        self.start_binary = 0
        self.end_binary = 9

        self.linear_indicator = 0
        self.binary_indicator = 0

        self.search_value_take = None

        self.make_canvas = Canvas(self.window,bg="chocolate",width=900,height=600,relief=RAISED,bd=4)
        self.make_canvas.pack()

        heading = lambda: Label(self.make_canvas,text="Searching Algo Visualizer",bg="chocolate",fg="yellow",font=("Arial",25,"bold","italic")).place(x=250,y=15)
        heading()

class Setup(Initialization):
    def __init__(self, root):
        super(Setup,self).__init__(root)

        self.__search_and_index_label_indicate()
        self.__two_array_maker()
        self.__array_void_containers_and_index_maker()
        self.make_arrow()
        self.__make_correct_wrong()
        self.__steps_label()

    def __search_and_index_label_indicate(self):
        Label(self.make_canvas, text="Linear\nSearch", font=("Arial",30,"bold"), bg="chocolate", fg="gold").place(x=40, y=150 + 50)
        Label(self.make_canvas, text="Binary\nSearch", font=("Arial", 30, "bold"), bg="chocolate", fg="gold").place(x=40, y=150 + 50+250)

        Label(self.make_canvas, text="Index no.", font=("Arial", 13, "bold"), bg="chocolate", fg="brown").place(x=70, y=150 + 10)
        Label(self.make_canvas, text="Index no.", font=("Arial", 13, "bold"), bg="chocolate", fg="brown").place(x=70, y=150 + 10 + 250)

    def __two_array_maker(self):
        self.make_canvas.create_line(200, 150+50, 718+3, 150+50,width=3,fill="blue")
        self.make_canvas.create_line(200, 206+50, 718+3, 206+50, width=3,fill="blue")

        self.make_canvas.create_line(200, 450, 718 + 3, 450, width=3, fill="blue")
        self.make_canvas.create_line(200, 506, 718 + 3, 506, width=3, fill="blue")

    def __array_void_containers_and_index_maker(self):
        start_x=201
        Label(self.make_canvas,text="-1",font=("Arial",20,"bold","italic"),bg="chocolate",fg="blue").place(x=start_x-52,y=203-50)
        Label(self.make_canvas,text="-1",font=("Arial",20,"bold","italic"),bg="chocolate",fg="blue").place(x=start_x-52,y=453-50)
        for i in range(10):
           self.make_canvas.create_rectangle(start_x,203,start_x+50,253,width=3,outline="#00FF00")
           Label(self.make_canvas,text=(i+1)*10,font=("Arial",15,"bold","italic"),bg="chocolate",fg="yellow").place(x=start_x+10,y=203+10)

           # Up array index maker
           Label(self.make_canvas,text=i,font=("Arial",20,"bold","italic"),bg="chocolate",fg="blue").place(x=start_x+15,y=203-50)
           
           self.make_canvas.create_rectangle(start_x,453,start_x+50,503,width=3,outline="#00FF00")
           Label(self.make_canvas,text=(i+1)*10,font=("Arial",15,"bold","italic"),bg="chocolate",fg="yellow").place(x=start_x+10,y=453+10)

           # Down array index maker
           Label(self.make_canvas,text=i,font=("Arial",20,"bold","italic"),bg="chocolate",fg="blue").place(x=start_x+15,y=453-50)

           start_x+=52

    def make_arrow(self):
        points_linear = (170,100+50, 170-20,(100+60)/2+50, 170-10,(100+60)/2+50, 170-10,60+50, 170+10,60+50, 170+10,(100+60)/2+50, 170+20,(100+60)/2+50)
        self.linear_indicator = self.make_canvas.create_polygon(points_linear,width=3,fill="#0FFF0F",outline="black")

        points_binary = (170,100+50+250, 170-20,(100+60)/2+50+250, 170-10,(100+60)/2+50+250, 170-10,60+50+250, 170+10,60+50+250, 170+10,(100+60)/2+50+250, 170+20,(100+60)/2+50+250)
        self.binary_indicator = self.make_canvas.create_polygon(points_binary,width=3,fill="#0FFF0F",outline="black")

    def __make_correct_wrong(self):
        global img_correct, img_wrong
        self.pic_correct_x=155
        self.pic_wrong_x=155

        img_correct = ImageTk.PhotoImage(Image.open("Images/correct.png").resize((30,30),Image.ANTIALIAS))
        self.pic_correct = Label(self.make_canvas,image=img_correct,bg="chocolate")

        img_wrong = ImageTk.PhotoImage(Image.open("Images/wrong.png").resize((30, 30), Image.ANTIALIAS))
        self.pic_wrong = Label(self.make_canvas, image=img_wrong, bg="chocolate")


    def __steps_label(self):
        self.binary_step_counter = 0
        self.linear_step_counter = 0

        self.step_linear = Label(self.make_canvas,text="Steps: "+ str(self.binary_step_counter),font=("Arial",20,"bold"),bg="chocolate",fg="gold")
        self.step_linear.place(x=750,y=210)

        self.step_binary = Label(self.make_canvas, text="Steps: " + str(self.linear_step_counter), font=("Arial", 20, "bold"), bg="chocolate", fg="gold")
        self.step_binary.place(x=750, y=210+250)

    # According to the instruction change arrow position
    def arrow_movement_controller(self,counter,direction,arrow_particular):
        try:
            num = 52 * counter
            while num:
                if direction == 0:
                    if arrow_particular == "linear":
                        self.make_canvas.move(self.linear_indicator, -1, 0)
                    else:
                        self.make_canvas.move(self.binary_indicator, -1, 0)
                    self.pic_wrong_x -= 1
                    self.pic_correct_x -= 1

                else:
                    if arrow_particular == "linear":
                        self.make_canvas.move(self.linear_indicator, 1, 0)
                    else:
                        self.make_canvas.move(self.binary_indicator, 1, 0)
                    self.pic_wrong_x += 1
                    self.pic_correct_x += 1

                self.window.update()
                time.sleep(0.01)
                num -= 1
        except:
            print("Force stop error")

class Functionality(Setup):
    def __init__(self, root):
        super(Functionality, self).__init__(root)
        self.__introduction_btn()

    def __introduction_btn(self):
        self.search_val_btn = Button(self.window, text="Search a value", font=("Arial", 25, "bold", "italic"), bg="black", fg="green", relief=RAISED, bd=7, command=self.__entry_take_forward)
        self.search_val_btn.place(x=50, y=618)

        self.reset_btn = Button(self.window, text="Reset", font=("Arial", 25, "bold", "italic"), bg="black", fg="green", relief=RAISED, bd=7, command=self.__reset_all, state=DISABLED)
        self.reset_btn.place(x=700, y=618)

    # Take entry from user and forward
    def __entry_take_forward(self):
        self.search_value_take = Entry(self.window, font=("Arial", 25, "bold", "italic"), fg="green", relief=SUNKEN, bd=7, width=5)
        self.search_value_take.place(x=350, y=630)

        self.search_value_take.focus()

        self.search_val_activation = Button(self.window, text="Search Value", font=("Arial", 18, "bold", "italic"), bg="gold", fg="green", relief=RAISED, bd=5, command=self.__give_searching_control)
        self.search_val_activation.place(x=500, y=630)

    # Linear and Binary Search Control give
    def __give_searching_control(self):
        try:
            self.search_val_btn['state'] = DISABLED
            self.search_val_activation['state'] = DISABLED

            # Searching value filtering
            try:
                if int(self.search_value_take.get()):
                    pass
            except:
                messagebox.showerror("Input error","Please give a integer value to input")
                self.search_val_btn['state'] = NORMAL
                return

            self.__linear_search_it()

            # After linear search customization
            if 9>=self.search_position_linear>=0:
                self.pic_correct.place_forget()
                self.linear_conformation = Label(self.make_canvas,text="Found",font=("Arial",20,"bold"),bg="chocolate",fg="brown")
                self.linear_conformation.place(x=self.pic_correct_x-15,y=70)
            else:
                self.make_canvas.move(self.linear_indicator,-(52*2),0)
                self.make_canvas.itemconfig(self.linear_indicator,fill="red")
                self.window.update()
                self.linear_conformation = Label(self.make_canvas, text="Not found searching value in this array", font=("Arial", 20, "bold"), bg="chocolate", fg="brown")
                self.linear_conformation.place(x=self.pic_correct_x - 400, y=70)

            # Default position set
            self.pic_correct_x=155
            self.pic_correct_y = 70+250
            self.pic_wrong_x = 155
            self.pic_wrong_y = 70+250

            self.__binary_search_it()

            # After binary search customization
            if self.start_binary<=self.end_binary:
                self.pic_correct.place_forget()
                self.binary_conformation = Label(self.make_canvas,text="Found",font=("Arial",20,"bold"),bg="chocolate",fg="brown")
                self.binary_conformation.place(x=self.pic_correct_x-15,y=70+250)
            else:
                self.make_canvas.itemconfig(self.binary_indicator,fill="Red")
                self.binary_conformation = Label(self.make_canvas, text="Not found searching value", font=("Arial", 20, "bold"), bg="chocolate", fg="brown")
                self.binary_conformation.place(x=self.pic_correct_x - 200, y=70+250)

            self.reset_btn['state'] = NORMAL

        except:
            print("Force stop error")



    # Linear Search Process Control
    def __linear_search_it(self):
        try:
            if self.search_position_linear>9:
                messagebox.showerror("Not found","Searching value not found")

            # Initial Condition
            elif self.search_position_linear == -1:
                self.arrow_movement_controller(1,1,"linear")
                self.search_position_linear += 1
                self.linear_step_counter += 1
                self.step_linear['text'] = "Steps: "+ str(self.linear_step_counter)
                self.__linear_search_it()

            # Value get condition
            elif self.store[self.search_position_linear] == int(self.search_value_take.get()):
                self.pic_correct.place(x=self.pic_correct_x, y=70)
                self.window.update()
                time.sleep(0.5)

            else:
                # Pic Show and forget
                self.pic_wrong.place(x=self.pic_correct_x, y=70)
                self.window.update()
                time.sleep(0.5)
                self.pic_wrong.place_forget()

                # Arrow Movement Control
                self.search_position_linear+=1
                self.arrow_movement_controller(1,1,"linear")

                # Steps Update
                if self.linear_step_counter<10:
                    self.linear_step_counter += 1
                    self.step_linear['text'] = "Steps: " + str(self.linear_step_counter)

                self.__linear_search_it()
        except:
            print("Force stop error")
    
    def __binary_search_it(self):
        try:
            if self.start_binary<=self.end_binary:
                middle = int((self.start_binary + self.end_binary) / 2)

                if self.search_position_binary == -1:# Initial Condition
                    self.arrow_movement_controller(middle + 1, 1,"binary")
                elif self.search_position_binary < middle:
                    self.arrow_movement_controller(middle - self.search_position_binary, 1,"binary")
                else:
                    self.arrow_movement_controller(self.search_position_binary - middle, 0,"binary")

                self.search_position_binary = middle

                # Steps Update
                self.binary_step_counter += 1
                self.step_binary['text'] = "Steps: " + str(self.binary_step_counter)

                # Value get situation
                if self.store[middle] == int(self.search_value_take.get()):
                    self.pic_correct.place(x=self.pic_correct_x, y=70 + 250)
                    self.window.update()
                else:
                    # Pic Show and forget
                    self.pic_wrong.place(x=self.pic_correct_x, y=70 + 250)
                    self.window.update()
                    time.sleep(0.5)
                    self.pic_wrong.place_forget()

                    # Range Concept
                    if int(self.search_value_take.get()) > self.store[middle]:
                        self.start_binary = middle + 1
                    else:
                        self.end_binary = middle - 1

                    self.__binary_search_it()

            else:
                messagebox.showerror("Not found","Searching value not found")
        except:
            print("Force stop error")

    def __reset_all(self):
        # Button state customization
        self.reset_btn['state'] = DISABLED
        self.search_val_btn['state'] = NORMAL
        self.search_val_activation['state'] = NORMAL

        # Default set
        self.pic_correct_x = self.pic_wrong_x = 155
        self.pic_correct_y = self.pic_wrong_y = 70
        self.make_canvas.delete(self.linear_indicator)
        self.make_canvas.delete(self.binary_indicator)
        self.make_arrow()
        self.linear_conformation.place_forget()
        self.binary_conformation.place_forget()
        self.search_position_linear = -1
        self.search_position_binary = -1
        self.start_binary = 0
        self.end_binary = 9
        self.linear_step_counter = 0
        self.binary_step_counter = 0
        self.step_linear['text'] = "Steps: " + str(self.linear_step_counter)
        self.step_binary['text'] = "Steps: " + str(self.binary_step_counter)


if __name__ == '__main__':
    window = Tk()
    window.geometry("900x700")
    window.maxsize(900,700)
    window.minsize(900,700)
    window.title("Searching Visualizer")
    window.config(bg="orange")
    window.iconbitmap("Images/search_icon.ico")
    Functionality(window)
    window.mainloop()