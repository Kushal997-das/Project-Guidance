                                   # CIRCULAR QUEUE VISUALIZER #
from tkinter import *
from tkinter import messagebox
import time

#Size of the Circular Queue taken as 10
class CircularQueue:
    def __init__(self,root):
        self.window = root
        self.canvas_make = Canvas(self.window,width=1150,height=500,bg="chocolate",relief=RAISED,bd=8)
        self.canvas_make.pack()
        #Initialize somethings that should be NULL by default
        self.rear_indicator = None
        self.front_indicator = None
        self.rear_label = None
        self.front_label = None

        self.make_box = None
        self.take_input = None

        self.make_label = None
        self.status_label = None
        #By default value set
        self.rear_index = -1
        self.front_index = -1
        self.input_label_x = 80
        self.input_label_y = 410
        self.index_marker = 85
        self.start_x = 0
        self.start_y = 0
        self.rear_move = 0
        self.rear_move_indicator = 62
        self.front_move_indicator = 62
        self.rear_label_position_controller = 176
        self.front_label_position_controller = 176
        #By default make list to store box number with label
        self.value_store = []
        self.value_show = []
        #Default function call
        self.set_up()
        self.show_result()

    def set_up(self):#For by default set up in canvas
        #Heading
        make_heading = Label(self.canvas_make,text="Circular Queue Visualizer",bg="chocolate",fg="yellow",font=("Arial",25,"bold","italic"))
        make_heading.place(x=350,y=20)
        #Make Queue Container
        self.canvas_make.create_line(229, 250, 611+254+3, 250,width=3,fill="yellow")
        self.canvas_make.create_line(229, 300, 611+254+3, 300, width=3,fill="yellow")

        take_x = 190
        for i in range(11):
            make_index = Label(self.canvas_make,text=i-1,bg="chocolate",fg="blue",font=("Arial",15,"bold"))
            make_index.place(x=take_x,y=165+50)
            take_x+=63

        # About rear
        points_rear = (205,255+50,205-20,(255+320)/2+50,205-10,(255+320)/2+50,205-10,320+50,205+10,320+50,205+10,(255+320)/2+50,205+20,(255+320)/2+50)
        self.rear_indicator = self.canvas_make.create_polygon(points_rear,width=3,fill="#0FFF0F",outline="black")
        self.rear_label = Label(self.canvas_make,text="rear",fg="brown",bg="chocolate",font=("Arial",20,"bold"))
        self.rear_label.place(x=self.rear_label_position_controller,y=323+50)

        # About front
        points_front = (205,160+50, 205-20,(160+90)/2+50, 205-10,(160+90)/2+50, 205-10,90+50, 205+10,90+50, 205+10,(160+90)/2+50, 205+20,(160+90)/2+50)
        self.front_indicator = self.canvas_make.create_polygon(points_front,width=3,fill="#0FFF0F",outline="black")
        self.front_label = Label(self.canvas_make, text="front", fg="brown", bg="chocolate", font=("Arial", 20, "bold"))
        self.front_label.place(x=self.front_label_position_controller, y=50+50)

        # About index no.
        points_index = (660+20+254,230, (660+580)/2-7+20+254,230-20, (660+580)/2+20+254,230-7, 580+20+254,230-7, 580+20+254,230+7, (660+580)/2+20+254,230+7, (660+580)/2-7+20+254,230+20)
        self.canvas_make.create_polygon(points_index,width=3,fill="red",outline="black")
        index_no = Label(self.canvas_make,text="Index no.",fg="#9B1B30",bg="chocolate",font=("Arial",15,"bold"))
        index_no.place(x=690+254,y=215)

        # Make small room in queue
        self.canvas_make.create_rectangle(230, 253, 290, 297, width=3)
        self.canvas_make.create_rectangle(294, 253, 354, 297, width=3)
        self.canvas_make.create_rectangle(358, 253, 418, 297, width=3)
        self.canvas_make.create_rectangle(422, 253, 482, 297, width=3)
        self.canvas_make.create_rectangle(486, 253, 546, 297, width=3)
        self.canvas_make.create_rectangle(550, 253, 610, 297, width=3)
        self.canvas_make.create_rectangle(614, 253, 674, 297, width=3)
        self.canvas_make.create_rectangle(678, 253, 738, 297, width=3)
        self.canvas_make.create_rectangle(742, 253, 802, 297, width=3)
        self.canvas_make.create_rectangle(806, 253, 866, 297, width=3)
    
    def show_result(self):
        self.status_label = Label(self.window, text="At first, root Node value inserted to the queue", fg="blue", bg="orange",
                                    font=("Arial", 20, "bold"))
        self.status_label.place(x=10, y=530)
        distance_maintainer = 20
        for i in range(15):
            self.value_show.append(i)
            self.value_show[i] = Label(self.canvas_make,bg="green",fg="yellow",text=" ",width="4",height="2",font=("Arial",15,"bold","italic"),relief=SUNKEN,bd=4)
            self.value_show[i].place(x= distance_maintainer,y=430)
            distance_maintainer+=70

    def box_insert(self,value):#Box insert in Queue
        self.make_box = self.canvas_make.create_rectangle(60, 402, 120, 444, width=3, fill="black", outline="blue")
        self.make_label = Label(self.window, text=value, fg="red", bg="black",
                                    font=("Arial", 12, "bold"))
        self.make_label.place(x=self.input_label_x, y=self.input_label_y)

        if self.front_index>0 and self.rear_index==9:
            self.rear_reset()

        else:
            if self.rear_index < 9:
                self.rear_index += 1
            if self.front_index == -1:
                self.front_index = 0
            self.rear_move = 0
            while self.rear_move<self.rear_move_indicator:# Move rear and front arrow with label
                self.rear_label.place_forget()
                self.rear_label_position_controller+=2
                self.rear_label.place(x=self.rear_label_position_controller, y=323 + 50)
                self.canvas_make.move(self.rear_indicator,2,0)
                if self.rear_index == 0:#Only When rear == 0, then if front == -1,front = 0
                   self.front_label.place_forget()
                   self.front_label_position_controller +=2
                   self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
                   self.canvas_make.move(self.front_indicator,2,0)
                self.rear_move+=2
                time.sleep(0.008)
                self.window.update()

        while self.start_y<37:#Block with label vertical movement
            self.make_label.place_forget()
            self.canvas_make.move(self.make_box,0,-4)
            self.start_y+=1
            self.input_label_y-=4
            self.make_label.place(x=self.input_label_x, y=self.input_label_y)
            time.sleep(0.005)
            self.window.update()

        while self.start_x<self.index_marker:#Block with label horizontal movement
            self.make_label.place_forget()
            self.canvas_make.move(self.make_box,2,0)
            self.start_x+=1
            self.input_label_x += 2
            self.make_label.place(x=self.input_label_x, y=self.input_label_y)
            self.window.update()

        self.reset_and_store()

    def rear_reset(self):#When rear is 9 and again input value, rear becomes at 0 index
        rear_move = 312+254
        while rear_move > 0:
            self.rear_label.place_forget()
            self.rear_label_position_controller -= 2
            self.rear_label.place(x=self.rear_label_position_controller, y=323 + 50)
            self.canvas_make.move(self.rear_indicator, -2, 0)
            if self.rear_index == 0:
                self.front_label.place_forget()
                self.front_label_position_controller -= 2
                self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
                self.canvas_make.move(self.front_indicator, -2, 0)
            rear_move -= 2
            time.sleep(0.01)
            self.window.update()
        self.index_marker = 85
        self.rear_index = 0

    def reset_and_store(self):#For reset some variable and store box value with corresponding label
        temp =[]
        temp.append(self.make_box)
        temp.append(self.make_label)
        self.value_store.append(temp)
        self.start_x = 0
        self.start_y = 0
        self.index_marker+=32
        self.input_label_x = 80
        self.input_label_y = 410



    def deletion(self):#For delete a value from the Queue
        if self.front_index == -1 and self.rear_index == -1:
            messagebox.showerror("Underflow","The Queue is empty")
            self.window.destroy()
        else:
            if self.value_store:
                self.canvas_make.delete(self.value_store[0][0])
                self.value_store[0][1].place_forget()
                self.value_store.pop(0)

            if self.rear_index==self.front_index:
                self.default_reset()
            elif self.front_index == 9 and self.rear_index<self.front_index:
                self.take_zero_reset()
            else:
                front_move = 0
                while front_move < self.front_move_indicator:
                    self.front_label.place_forget()
                    self.front_label_position_controller += 2
                    self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
                    self.canvas_make.move(self.front_indicator, 2, 0)
                    front_move += 2
                    time.sleep(0.01)
                    self.window.update()
                if self.front_index < 9:
                    self.front_index += 1

    def default_reset(self):#When rear == front, set both at -1
        while self.rear_label_position_controller != 176:
            self.rear_label.place_forget()
            self.front_label.place_forget()
            self.rear_label_position_controller -= 2
            self.front_label_position_controller -=2
            self.rear_label.place(x=self.rear_label_position_controller, y=323 + 50)
            self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
            self.canvas_make.move(self.rear_indicator, -2, 0)
            self.canvas_make.move(self.front_indicator,-2, 0)
            time.sleep(0.008)
            self.window.update()

        self.front_index = -1
        self.rear_index = -1
        self.index_marker = 85

    def take_zero_reset(self):#When front == 9 , then after deletion set front at 0
        front_move = 312+254
        while front_move > 0:
            self.front_label.place_forget()
            self.front_label_position_controller -= 2
            self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
            self.canvas_make.move(self.front_indicator, -2, 0)
            front_move -= 2
            time.sleep(0.008)
            self.window.update()
        self.front_index = 0
