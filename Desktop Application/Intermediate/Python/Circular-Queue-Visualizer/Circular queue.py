                                     # Circular Queue Visualizer #
from tkinter import *
from tkinter import messagebox
import time
#Size of the Circular Queue taken as 6
class CircularQueue:
    def __init__(self,root):
        self.window = root
        self.make_canvas = Canvas(self.window,width=800,height=500,bg="chocolate",relief=RAISED,bd=8)
        self.make_canvas.pack()
        #Initialize somethings that should be NULL by default
        self.rear_indicator = None
        self.front_indicator = None
        self.rear_label = None
        self.front_label = None
        self.take_entry = None
        self.make_box = None
        self.take_input = None
        self.add_btn = None
        self.make_label = None
        self.make_insert = None
        self.make_delete = None
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
        self.store_data = []
        #Default function call
        self.set_up()
        self.make_input_btn()

    def set_up(self):#For by default set up in canvas
        #Heading
        make_heading = Label(self.make_canvas,text="Circular Queue Visualizer",bg="chocolate",fg="yellow",font=("Arial",25,"bold","italic"))
        make_heading.place(x=200,y=20)
        #Make Queue Container
        self.make_canvas.create_line(229, 250, 611, 250,width=3,fill="yellow")
        self.make_canvas.create_line(229, 300, 611, 300, width=3,fill="yellow")
         
        take_x = 190
        for i in range(7):
            make_index = Label(self.make_canvas,text=i-1,bg="chocolate",fg="blue",font=("Arial",15,"bold"))
            make_index.place(x=take_x,y=165+50)
            take_x+=63
        # All about rear pointer
        points_rear = (205,255+50,205-20,(255+320)/2+50,205-10,(255+320)/2+50,205-10,320+50,205+10,320+50,205+10,(255+320)/2+50,205+20,(255+320)/2+50)
        self.rear_indicator = self.make_canvas.create_polygon(points_rear,width=3,fill="#0FFF0F",outline="black")
        self.rear_label = Label(self.make_canvas,text="rear",fg="brown",bg="chocolate",font=("Arial",20,"bold"))
        self.rear_label.place(x=self.rear_label_position_controller,y=323+50)
        # All about front pointer
        points_front = (205,160+50, 205-20,(160+90)/2+50, 205-10,(160+90)/2+50, 205-10,90+50, 205+10,90+50, 205+10,(160+90)/2+50, 205+20,(160+90)/2+50)
        self.front_indicator = self.make_canvas.create_polygon(points_front,width=3,fill="#0FFF0F",outline="black")
        self.front_label = Label(self.make_canvas, text="front", fg="brown", bg="chocolate", font=("Arial", 20, "bold"))
        self.front_label.place(x=self.front_label_position_controller, y=50+50)
        # All about index no.
        points_index = (660+20,230, (660+580)/2-7+20,230-20, (660+580)/2+20,230-7, 580+20,230-7, 580+20,230+7, (660+580)/2+20,230+7, (660+580)/2-7+20,230+20)
        self.make_canvas.create_polygon(points_index,width=3,fill="red",outline="black")
        index_no = Label(self.make_canvas,text="Index no.",fg="#9B1B30",bg="chocolate",font=("Arial",15,"bold"))
        index_no.place(x=690,y=215)

        # Make small room in queue
        self.make_canvas.create_rectangle(230, 253, 290, 297, width=3)
        self.make_canvas.create_rectangle(294, 253, 354, 297, width=3)
        self.make_canvas.create_rectangle(358, 253, 418, 297, width=3)
        self.make_canvas.create_rectangle(422, 253, 482, 297, width=3)
        self.make_canvas.create_rectangle(486, 253, 546, 297, width=3)
        self.make_canvas.create_rectangle(550, 253, 610, 297, width=3)

    def make_input_btn(self):#Make Insert and Delete Button
        self.make_insert = Button(self.window,text="Insert",font=("Arial",18,"bold"),fg="red",bg="black",relief=RAISED,bd=8,command=self.store)
        self.make_insert.place(x=30,y=530)

        self.make_delete = Button(self.window,text="Delete",font=("Arial",18,"bold"),fg="red",bg="black",relief=RAISED,bd=8,command=self.deletion)
        self.make_delete.place(x=670,y=530)

    def store(self):#For Insert value in Circular Queue
        if (self.rear_index == 5 and self.front_index == 0) or (self.rear_index+1==self.front_index):
            messagebox.showerror("Overflow","The Queue is full")
        else:
            self.make_insert['state'] = DISABLED
            self.make_delete['state'] = DISABLED
            
            self.take_input = Label(self.window, text="Enter the number to input", fg="blue", bg="orange", font=("Arial", 12, "bold"))
            self.take_input.place(x=300, y=530)
            self.take_entry = Entry(self.window, fg="blue", bg="white",relief=SUNKEN,bd=6,width=5, font=("Arial", 10, "bold"))
            self.take_entry.place(x=320, y=560)
            self.take_entry.focus()
            self.add_btn = Button(self.window,text="Add",fg="red", bg="black",relief=SUNKEN,bd=6,width=5, font=("Arial", 8, "bold"),command=lambda: self.box_insert(False),state=NORMAL)
            self.add_btn.place(x=400, y=560)
            self.window.bind('<Return>',self.box_insert)

    def box_insert(self,e):#Box insert in Queue
        self.take_input.place_forget()
        self.take_entry.place_forget()
        self.add_btn.place_forget()

        self.make_box = self.make_canvas.create_rectangle(60, 402, 120, 444, width=3, fill="black", outline="blue")
        self.make_label = Label(self.window, text=self.take_entry.get(), fg="red", bg="black", font=("Arial", 12, "bold"))
        self.make_label.place(x=self.input_label_x, y=self.input_label_y)

        if self.front_index>0 and self.rear_index==5:
            self.rear_reset()

        else:
            if self.rear_index < 5:
                self.rear_index += 1
            if self.front_index == -1:
                self.front_index = 0
            self.rear_move = 0
            while self.rear_move<self.rear_move_indicator:# Move rear and front arrow with label
                self.rear_label.place_forget()
                self.rear_label_position_controller+=2
                self.rear_label.place(x=self.rear_label_position_controller, y=323 + 50)
                self.make_canvas.move(self.rear_indicator,2,0)
                if self.rear_index == 0:#Only When rear == 0, then if front == -1,front = 0
                   self.front_label.place_forget()
                   self.front_label_position_controller +=2
                   self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
                   self.make_canvas.move(self.front_indicator,2,0)
                self.rear_move+=2
                time.sleep(0.008)
                self.window.update()

        while self.start_y<37:#Block with label vertical movement
            self.make_label.place_forget()
            self.make_canvas.move(self.make_box,0,-4)
            self.start_y+=1
            self.input_label_y-=4
            self.make_label.place(x=self.input_label_x, y=self.input_label_y)
            time.sleep(0.005)
            self.window.update()

        while self.start_x<self.index_marker:#Block with label horizontal movement
            self.make_label.place_forget()
            self.make_canvas.move(self.make_box,2,0)
            self.start_x+=1
            self.input_label_x += 2
            self.make_label.place(x=self.input_label_x, y=self.input_label_y)
            self.window.update()

        self.reset_and_store()

    def rear_reset(self):#When rear is 5 and again input value, rear becomes at 0 index
        rear_move = 312
        while rear_move > 0:
            self.rear_label.place_forget()
            self.rear_label_position_controller -= 2
            self.rear_label.place(x=self.rear_label_position_controller, y=323 + 50)
            self.make_canvas.move(self.rear_indicator, -2, 0)
            if self.rear_index == 0:
                self.front_label.place_forget()
                self.front_label_position_controller -= 2
                self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
                self.make_canvas.move(self.front_indicator, -2, 0)
            rear_move -= 2
            time.sleep(0.01)
            self.window.update()
        self.index_marker = 85
        self.rear_index = 0

    def reset_and_store(self):#For reset some variable and store box value with corresponding label
        temp =[]
        temp.append(self.make_box)
        temp.append(self.make_label)
        self.store_data.append(temp)
        self.start_x = 0
        self.start_y = 0
        self.index_marker+=32
        self.input_label_x = 80
        self.input_label_y = 410
        self.make_insert['state'] = NORMAL
        self.make_delete['state'] = NORMAL

    def deletion(self):#For delete a value from the Queue
        if self.front_index == -1 and self.rear_index == -1:
            messagebox.showerror("Underflow","The Queue is empty")
        else:
            self.make_insert['state'] = DISABLED
            self.make_delete['state'] = DISABLED
            if self.store_data:
                self.make_canvas.delete(self.store_data[0][0])
                self.store_data[0][1].place_forget()
                self.store_data.pop(0)

            if self.rear_index==self.front_index:
                self.default_reset()
            elif self.front_index == 5 and self.rear_index<self.front_index:
                self.take_zero_reset()
            else:
                front_move = 0
                while front_move < self.front_move_indicator:
                    self.front_label.place_forget()
                    self.front_label_position_controller += 2
                    self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
                    self.make_canvas.move(self.front_indicator, 2, 0)
                    front_move += 2
                    time.sleep(0.01)
                    self.window.update()
                if self.front_index < 5:
                    self.front_index += 1
            self.make_insert['state'] = NORMAL
            self.make_delete['state'] = NORMAL

    def default_reset(self):#When rear == front, set both at -1
        while self.rear_label_position_controller != 176:
            self.rear_label.place_forget()
            self.front_label.place_forget()
            self.rear_label_position_controller -= 2
            self.front_label_position_controller -=2
            self.rear_label.place(x=self.rear_label_position_controller, y=323 + 50)
            self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
            self.make_canvas.move(self.rear_indicator, -2, 0)
            self.make_canvas.move(self.front_indicator,-2, 0)
            time.sleep(0.008)
            self.window.update()

        self.front_index = -1
        self.rear_index = -1
        self.index_marker = 85

    def take_zero_reset(self):#When front == 5 , then after deletion set front at 0
        front_move = 312
        while front_move > 0:
            self.front_label.place_forget()
            self.front_label_position_controller -= 2
            self.front_label.place(x=self.front_label_position_controller, y=50 + 50)
            self.make_canvas.move(self.front_indicator, -2, 0)
            front_move -= 2
            time.sleep(0.008)
            self.window.update()
        self.front_index = 0

if __name__ == '__main__':
    window = Tk()
    window.title("Circular Queue Visualizer")
    window.geometry("800x600")
    window.maxsize(800,600)
    window.minsize(800,600)
    window.iconbitmap("circular_queue_icon.ico")
    window.config(bg="orange")
    CircularQueue(window)
    window.mainloop()
