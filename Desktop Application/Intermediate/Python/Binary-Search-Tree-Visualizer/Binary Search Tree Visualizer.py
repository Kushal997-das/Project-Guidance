                                # BINARY SEARCH TREE VISUALIZER #
from tkinter import *
from tkinter import messagebox
import time
import Circular_queue as CQ # Please give the right path here of Circular_queue.py

# 4 level only allowed for this application
# node[5] similar to node.left and node[6] similar to node.right
# Notation index---> Here I used it...to make the clear sense about the right position of the node
# on the canvas...just like notation index--------------------------------->
# root node = 0, left child of root node = 1, right child of root node = 2 and so on
# level wise increment of notation index from left to right in each level
# In special case of delete a node--->left none right exist will same as delete a node having both child

class BST:
    def __init__(self, root):
        self.window = root
        # Canvas make for node presentation
        self.make_canvas = Canvas(self.window,width=1160,height=520,bg="chocolate",relief=RAISED,bd=8)
        self.make_canvas.place(x=0,y=0)
        # Canvas make for result presentation
        self.result_canvas = Canvas(self.window,width=1340,height=168,bg="#FF8C00",relief=RAISED,bd=4)
        self.result_canvas.place(x=0,y=540)

        #Some variables initialize with None
        self.make_null = None
        self.insert_node = None
        self.take_entry = None
        self.make_node = None
        self.take_input = None
        self.add_btn = None
        self.make_label = None
        self.make_delete = None
        self.pre_order_traversal = None
        self.in_order_traversal = None
        self.post_order_traversal = None
        self.traversing_label = None
        self.level_order_traversal = None
        self.level_order_display = None
        self.status_note = None

        #Some variables initialization
        self.notation_index = 0
        self.vertical_counter = 0
        self.take_arrow = 0
        self.right_activate = 1
        self.left_activate = 0
        self.position_controller = 0
        self.take_index = 0
        self.display_box_counter = -1

        self.label_position_x = 519
        self.label_position_y = 99+50

        self.gap_controller = 100

        #By default some list initialization
        self.node_number_value_store = []
        self.value_show = []
        self.temp_queue = []

        #By default function call to interaction
        self.heading_root_and_null_make()
        self.make_instructional_buttons()
        self.make_container_in_result_canvas()

    def heading_root_and_null_make(self):# By default window presentation
        make_heading = Label(self.make_canvas,text="Binary Search Tree Visualizer",font=("Arial",27,"bold","italic"),fg="yellow",bg="chocolate")
        make_heading.place(x=350,y=10)
        make_root = Label(self.make_canvas,text="Root",font=("Arial",17,"bold"),fg="brown",bg="chocolate")
        make_root.place(x=565,y=10+50)

        root_indicator = (595,80+50, 595 - 15,(80 + 43) / 2+50, 595 - 5,(80 + 43) / 2+50, 595 - 5,43+50, 595 + 5,43+50, 595 + 5,(80 + 43) / 2+50, 595 + 15, (80 + 43) / 2+50)
        self.make_canvas.create_polygon(root_indicator, width=3, fill="yellow", outline="black")

        self.make_null = Label(self.make_canvas,text="NULL",font=("Arial",17,"bold","italic"),fg="#2E37FE",bg="chocolate")
        self.make_null.place(x=565,y=90+50)

    def make_instructional_buttons(self):# For make Instructional buttons
        #Insert button
        self.insert_node = Button(self.window,text="Insert",font=("Arial",20,"bold"),bg="black",fg="#00FF00",relief=RAISED,bd=8,command=lambda: self.take_input_set_up(1),state=NORMAL)
        self.insert_node.place(x=1210,y=10)

        #LabelFrame make for Traversing Buttons
        make_label_frame_for_traversing = LabelFrame(self.window,text="Traversing",width=50,bg="orange",font=("Arial",13,"bold"),fg="green")
        make_label_frame_for_traversing.place(x=1183,y=180)

        self.pre_order_traversal  = Button(make_label_frame_for_traversing,text="Pre-order",font=("Arial",10,"bold"),bg="black",fg="#00FF00",relief=RAISED,bd=8,command=lambda: self.traversing_decision_making(1),state=NORMAL)
        self.pre_order_traversal.pack(padx=10,pady=5)

        self.in_order_traversal = Button(make_label_frame_for_traversing, text="In-order", font=("Arial", 10, "bold"),bg="black", fg="#00FF00", relief=RAISED, bd=8, command=lambda: self.traversing_decision_making(2), state=NORMAL)
        self.in_order_traversal.pack(padx=10, pady=5)

        self.post_order_traversal = Button(make_label_frame_for_traversing, text="Post-order", font=("Arial", 10, "bold"), bg="black", fg="#00FF00", relief=RAISED, bd=8, command=lambda: self.traversing_decision_making(3), state=NORMAL)
        self.post_order_traversal.pack(padx=10, pady=5)

        self.level_order_traversal = Button(make_label_frame_for_traversing, text="Level-order Display", font=("Arial", 10, "bold"), bg="black", fg="#00FF00", relief=RAISED, bd=8, command=lambda: self.traversing_decision_making(4), state=NORMAL)
        self.level_order_traversal.pack(padx=3, pady=5)

        self.level_order_display = Button(make_label_frame_for_traversing, text="Level-order Concept",
                                            font=("Arial", 10, "bold"), bg="black", fg="#00FF00", relief=RAISED, bd=8,
                                            command=self.level_order_concept_by_queue, state=NORMAL)
        self.level_order_display.pack(padx=3, pady=5)
        # Delete Button
        self.make_delete = Button(self.window, text="Delete", font=("Arial", 16, "bold"), bg="black", fg="#00FF00", relief=RAISED, bd=8, command=lambda: self.take_input_set_up(2), state=NORMAL)
        self.make_delete.place(x=1220,y=470)

    def take_input_set_up(self,indicator):# Set up for take input value for node insert and delete
        self.input_btn_deactivation()
        self.take_input = Label(self.window, text="Enter the number to input", fg="blue", bg="orange", font=("Arial", 10, "bold"))
        self.take_input.place(x=1180, y=100)
        self.take_entry = Entry(self.window, fg="blue", bg="white", relief=SUNKEN, bd=6, width=5, font=("Arial", 10, "bold"))
        self.take_entry.place(x=1200, y=130)
        self.take_entry.focus()
        self.add_btn = Button(self.window, text="Add", fg="red", bg="black", relief=RAISED, bd=6, width=5, font=("Arial", 8, "bold"), state=NORMAL)
        self.add_btn.place(x=1280, y=130)

        if indicator == 1:# For insert node
           self.add_btn['text'] = "Add"
           self.window.unbind('<space>')
           self.add_btn['command'] =  lambda: self.filtration_of_input_value(False,indicator)
           self.window.bind('<Return>', lambda e: self.filtration_of_input_value(e,indicator))

        else:# For delete node
           self.take_input['text'] = "Enter the number to delete"
           self.add_btn['text'] = "Delete"
           self.window.unbind('<Return>')
           self.add_btn['command'] = lambda: self.filtration_of_input_value(False,indicator)
           self.window.bind('<space>', lambda e: self.filtration_of_input_value(e, indicator))

    def filtration_of_input_value(self, e, indicator): # Filtration with button deactivation and activation
        self.take_input.place_forget()
        self.take_entry.place_forget()
        self.add_btn.place_forget()
        try:
            if int(self.take_entry.get()):
                    if indicator == 1:
                        if  len(self.node_number_value_store) == 0:
                            self.make_null.place_forget()# For forget the NULL label
                        self.make_default_node_with_set_position()
                    else:
                        if self.node_number_value_store:# Delete available for only non empty Tree
                           self.delete()
                        else:
                           messagebox.showerror("Empty BST", "Nothing to delete is BST")
        except:
            messagebox.showerror("Input Error", "Input value must be integer")

        self.input_btn_activation()

    def make_default_node_with_set_position(self):# For node make and set at right position in canvas
        try:
            self.status_note.config(text="Insertion Process")
            self.status_note.place(x=500, y=130)

            self.make_node = self.make_canvas.create_oval(505, 85+50, 555, 135+50, width=2, fill="green", outline="orange")
            self.make_label= Label(self.window, text=self.take_entry.get(), fg="yellow", bg="green", font=("Arial", 12, "bold"))
            self.make_label.place(x=self.label_position_x, y=self.label_position_y)
            if len(self.node_number_value_store) == 0:
                self.push_first_node()
            else:
                self.notation_index = 0
                self.position_controller = 70+80-5
                self.take_index = 0
                temp_take_val = self.take_entry.get()# Take input value
                self.right_activate = 1
                self.gap_controller = 210 # Gap control in each level
                self.left_activate = 0
                self.vertical_counter=0
                while True:
                    if self.right_activate == 1:# For right side movement permission granted
                        if self.position_controller <0:# In fourth label slight left move of right side node to adjust position
                            self.position_controller = 25
                            self.left_movement_in_level()
                            self.position_controller = -1
                        else:
                            self.right_movement_in_level()
                    else:# For left side movement permission granted
                        self.left_movement_in_level()

                    # Position Found and stop moving
                    if self.position_controller == -1 or self.position_controller == 70+self.gap_controller-5 or self.position_controller == 80+70+80+self.gap_controller-5:
                        break

                    # Compare with a node value and movement direction giving
                    if int(temp_take_val) < int(self.node_number_value_store[self.take_index][2]):
                        self.decision_making_about_left_side_direction()
                    elif int(temp_take_val) > int(self.node_number_value_store[self.take_index][2]):
                        self.decision_making_about_right_side_direction()
                    else:
                        messagebox.showerror("Duplicate Value Error","Duplicate Value by default not allowed in BST")
                        self.vertical_counter = 4
                        break

                    self.vertical_down_movement()# In each level vertically down movement of posuition finding node

                    self.vertical_counter+=1
                    if self.vertical_counter > 3:
                        messagebox.showwarning("Restriction","Sorry,For this application, more than 4 level is not allowed")
                        break
                    elif self.vertical_counter == 3:# For 4th level gap
                        self.gap_controller -= 150
                    else:
                        self.gap_controller -= 85# For other level gap

                    if self.right_activate == 1:# Right direction conform
                        self.right_moving_final_direction_giving()# Final movement in right side to set position
                    elif self.left_activate == 1:# Left direction conform
                        self.left_moving_final_direction_giving()# Final movement in left side to set position

            if self.vertical_counter<=3:# Till the 4th level
                self.make_arrow()# Connecting line between current node and the parent node
            else:
                self.make_canvas.delete(self.make_node)# For 4th level crossing instant warning and deletion
                self.make_label.place_forget()
                self.reset_and_store()
        except:
            print("Some force stop error")

    def make_arrow(self):# Connect current node and parent node connect line
        if self.notation_index == 0:
           self.take_arrow = -1
        else:
           for take in self.node_number_value_store:
               if int((self.notation_index-1)/2) == take[3]:# Parent node notation index take searching in actual list
                     take_current = self.make_canvas.coords(self.make_node)
                     take_parent = self.make_canvas.coords(take[0])
                     if self.right_activate == 1:
                         if  self.vertical_counter == 3:# For 4th level in right direction
                             current_x = (take_current[0] + take_current[2]) / 2 - 2
                             current_y = (take_current[1] + take_current[3]) / 2 - 25
                             parent_x = (take_parent[0] + take_parent[2]) / 2 + 12
                             parent_y = (take_parent[1] + take_parent[3]) / 2 + 24
                             arrow_coord = (current_x,current_y,parent_x,parent_y)
                         else:
                             arrow_coord = self.right_side_arrow_coordinate_maker(take_current,take_parent)
                     else:
                         if self.vertical_counter == 3:# For 4th level in left direction
                             current_x = (take_current[0] + take_current[2]) / 2
                             current_y = (take_current[1] + take_current[3]) / 2 -25
                             parent_x = (take_parent[0] + take_parent[2]) / 2 - 18
                             parent_y = (take_parent[1] + take_parent[3]) / 2 + 19
                             arrow_coord = (current_x, current_y, parent_x, parent_y)
                         else:
                             arrow_coord = self.left_side_arrow_coordinate_maker(take_current,take_parent)
                     self.take_arrow = self.make_canvas.create_line(arrow_coord, width=3, fill="brown")
                     break

        self.store_data()

    def store_data(self):# Store data of all about node in 'self.node_number_value_store'
        node_data = self.store_all_data_about_a_node(self.make_node,  self.make_label, self.take_entry.get(), self.notation_index, self.take_arrow)
        if self.notation_index > 0:
            parent_node_index = int((self.notation_index-1)/2)
            for  temp1 in self.node_number_value_store:
                 if temp1[3] == parent_node_index:
                     if self.notation_index%2 == 0:
                         temp1[6] = node_data# Right side link up
                     else:
                         temp1[5] = node_data# Left side link up

        self.reset_and_store()

    def reset_and_store(self):# Reset and store data by default
        self.label_position_x = 519
        self.label_position_y = 99+50
        print(self.node_number_value_store)

        self.status_note.config(text="Work done")
        self.status_note.place(x=550, y=130)

    def right_side_arrow_coordinate_maker(self, take_current, take_parent):# For right side node
        current_x = (take_current[0] + take_current[2]) / 2 - 18
        current_y = (take_current[1] + take_current[3]) / 2 - 18
        parent_x = (take_parent[0] + take_parent[2]) / 2 + 25
        parent_y = (take_parent[1] + take_parent[3]) / 2
        arrow_coord = (current_x,current_y,parent_x,parent_y)
        return arrow_coord

    def left_side_arrow_coordinate_maker(self, take_current, take_parent):# For left side node
        current_x = (take_current[0] + take_current[2]) / 2 + 18
        current_y = (take_current[1] + take_current[3]) / 2 - 18
        parent_x = (take_parent[0] + take_parent[2]) / 2 - 25
        parent_y = (take_parent[1] + take_parent[3]) / 2
        arrow_coord = (current_x,current_y,parent_x,parent_y)
        return arrow_coord

    def push_first_node(self):# For first node
        x_move_counter = 0
        while x_move_counter < 70 - 5:
            self.make_label.place_forget()
            self.label_position_x += 2
            self.make_label.place(x=self.label_position_x, y=self.label_position_y)
            self.make_canvas.move(self.make_node, 2, 0)
            x_move_counter += 2
            self.window.update()

    def right_movement_in_level(self):# For every level right movement
        try:
            x_move_counter = 0
            while x_move_counter < self.position_controller:
                self.make_label.place_forget()
                self.label_position_x += 2
                self.make_label.place(x=self.label_position_x, y=self.label_position_y)
                self.make_canvas.move(self.make_node, 2, 0)
                x_move_counter += 2
                self.window.update()
        except:
            print("Some force stop error")

    def left_movement_in_level(self):# For every level left movement
        try:
            x_move_counter = 0
            while x_move_counter < self.position_controller:
                self.make_label.place_forget()
                self.label_position_x -= 2
                self.make_label.place(x=self.label_position_x, y=self.label_position_y)
                self.make_canvas.move(self.make_node, -2, 0)
                x_move_counter += 2
                self.window.update()
        except:
            print("Some force stop error")

    def decision_making_about_left_side_direction(self):
        try:
            self.left_activate = 1
            self.right_activate = 0
            make_greater_than_label = Label(self.window, text=">", fg="green", bg="chocolate", font=("Arial", 20, "bold"))
            make_greater_than_label.place(x=self.label_position_x - 40, y=self.label_position_y - 10)
            self.window.update()
            time.sleep(1)
            make_greater_than_label.place_forget()
        except:
            print("Some force stop error")

    def decision_making_about_right_side_direction(self):
        try:
            self.right_activate = 1
            self.left_activate = 0
            make_less_than_label = Label(self.window, text="<", fg="green", bg="chocolate", font=("Arial", 20, "bold"))
            make_less_than_label.place(x=self.label_position_x - 40, y=self.label_position_y - 10)
            self.window.update()
            time.sleep(1)
            make_less_than_label.place_forget()
        except:
            print("Some force stop error")

    def vertical_down_movement(self):
        try:
            y_move_counter = 0
            while y_move_counter < 106:
                self.make_label.place_forget()
                self.label_position_y += 4
                self.make_label.place(x=self.label_position_x, y=self.label_position_y)
                self.make_canvas.move(self.make_node, 0, 4)
                y_move_counter += 4
                time.sleep(0.01)
                self.window.update()
        except:
            print("Some force stop error")

    def right_moving_final_direction_giving(self):# For final right movement to set position
        try:
            for take in self.node_number_value_store:
                if int((self.notation_index + 1) * 2) == int(take[3]):
                    self.take_index = self.node_number_value_store.index(take)
                    self.position_controller = 70 + 80 + self.gap_controller - 5
                    break
            else:
                if self.vertical_counter == 3:
                    self.position_controller = -1
                else:
                    self.position_controller = 70 + self.gap_controller - 5
            self.notation_index = (self.notation_index + 1) * 2
        except:
            print("Some force stop error in final positioning")

    def left_moving_final_direction_giving(self):# For final left movement to set position
        try:
            for take in self.node_number_value_store:
                if int((self.notation_index + 1) * 2) - 1 == int(take[3]):
                    self.take_index = self.node_number_value_store.index(take)
                    self.position_controller = 80 + 70 + self.gap_controller - 5
                    break
            else:
                self.position_controller = 80 + 70 + 80 + self.gap_controller - 5
            self.notation_index = ((self.notation_index + 1) * 2) - 1
        except:
            print("Some force stop error in final positioning")

    def traversing_decision_making(self, instruction):# For all about traversing
        self.input_btn_deactivation()

        if len(self.node_number_value_store) == 0:
            messagebox.showwarning("EMPTY BST", "BST is empty")
        else:
            if self.display_box_counter>-1:# For every box empty to fresh input
                for every_box_index in range(self.display_box_counter+1):
                    self.value_show[every_box_index].config(text=" ")
                self.display_box_counter = -1
            if instruction == 1:
                self.status_note.config(text="Pre-Order Traversing")
                self.status_note.place(x=500, y=130)
                self.traversing_label['text'] = "Pre-Order Traversing Result"
                self.pre_order_traversing(self.node_number_value_store[0])
            elif instruction == 2:
                self.status_note.config(text="In-Order Traversing")
                self.status_note.place(x=500, y=130)
                self.traversing_label['text'] = "In-Order Traversing Result"
                self.in_order_traversing(self.node_number_value_store[0])
            elif instruction == 3:
                self.status_note.config(text="Post-Order Traversing")
                self.status_note.place(x=500, y=130)
                self.traversing_label['text'] = "Post-Order Traversing Result"
                self.post_order_traversing(self.node_number_value_store[0])
            elif instruction == 4:
                self.status_note.config(text="Level-Order Traversing")
                self.status_note.place(x=500, y=130)
                self.traversing_label['text'] = "Level-Order Traversing Result"
                self.level_order_traversing()

        self.input_btn_activation()
        self.status_note.config(text="Work done")
        self.status_note.place(x=550, y=130)

    def pre_order_traversing(self,control_node):
        if control_node is None:
            return
        else:
            self.make_canvas.itemconfig(control_node[0],fill="red",outline="black")
            self.display_box_counter += 1
            self.value_show[self.display_box_counter].config(text=control_node[2])
            control_node[1].config(bg="red",fg="black")
            self.window.update()
            time.sleep(0.8)
            self.window.update()

            self.pre_order_traversing(control_node[5])
            self.pre_order_traversing(control_node[6])

    def in_order_traversing(self,control_node):
        if control_node is None:
            return
        else:
            self.in_order_traversing(control_node[5])

            self.make_canvas.itemconfig(control_node[0], fill="yellow", outline="black")
            self.display_box_counter += 1
            self.value_show[self.display_box_counter].config(text=control_node[2])
            control_node[1].config(bg="yellow", fg="green")
            self.window.update()
            time.sleep(0.8)
            self.window.update()

            self.in_order_traversing(control_node[6])

    def post_order_traversing(self,control_node):
        if control_node is None:
            return
        else:
            self.post_order_traversing(control_node[5])
            self.post_order_traversing(control_node[6])

            self.make_canvas.itemconfig(control_node[0], fill="violet", outline="black")
            self.display_box_counter += 1
            self.value_show[self.display_box_counter].config(text=control_node[2])
            control_node[1].config(bg="violet", fg="blue")
            self.window.update()
            time.sleep(0.8)
            self.window.update()

    def level_order_traversing(self):
        self.temp_queue.append(self.node_number_value_store[0])
        while len(self.temp_queue) > 0:
                take = self.temp_queue.pop(0)
                self.window.update()
                time.sleep(0.8)
                self.make_canvas.itemconfig(take[0], fill="orange", outline="black")
                self.display_box_counter += 1
                self.value_show[self.display_box_counter].config(text=take[2])
                take[1].config(bg="orange", fg="green")
                self.window.update()

                if take[5] is not None:
                    self.temp_queue.append(take[5])

                if take[6] is not None:
                    self.temp_queue.append(take[6])

    def make_container_in_result_canvas(self):# In down canvas
        self.traversing_label = Label(self.result_canvas,bg="#FF8C00",fg="green",text="Traversing Result",font=("Arial",15,"bold","italic"))
        self.traversing_label.place(x=480,y=10)
        distance_maintainer = 8
        for i in range(15):
            self.value_show.append(i)
            self.value_show[i] = Label(self.result_canvas,bg="chocolate",fg="yellow",text=" ",width="4",height="1",font=("Arial",15,"bold","italic"),relief=SUNKEN,bd=5)
            self.value_show[i].place(x= distance_maintainer,y=50)
            distance_maintainer+=91

        make_status = Label(self.result_canvas,bg="#FF8C00",fg="brown",text="Status",font=("Arial",17,"bold","italic"))
        make_status.place(x=580,y=100)

        self.status_note = Label(self.result_canvas,bg="#FF8C00",fg="blue",text="Play With BST",font=("Arial",20,"bold","italic"))
        self.status_note.place(x=530,y=130)

    def level_order_concept_by_queue(self):# With Circular Queue Concept
        try:
            top = Toplevel()
            top.config(bg="orange")
            top.geometry("1080x600")
            top.maxsize(1080, 600)
            top.minsize(1080, 600)
            top.iconbitmap("bst_icon.ico")
            queue_obj = CQ.CircularQueue(top)
            node_data_store_to_access_easily = []
            node_data_store_to_access_easily.append(self.node_number_value_store[0])
            queue_obj.box_insert(self.node_number_value_store[0][2])
            i=-1

            while True:
                if  len(queue_obj.value_store) == 0:
                    queue_obj.status_label['text'] = "All node value printed here and the queue is empty"
                    break
                else:
                    take = node_data_store_to_access_easily.pop(0)
                    top.update()
                    time.sleep(2)

                    if take[5] is not None:
                       queue_obj.status_label['text'] = "The left child of the front pointing node is inserted"
                       node_data_store_to_access_easily.append(take[5])
                       queue_obj.box_insert(take[5][2])
                       top.update()
                       time.sleep(2)
                    if take[6] is not None:
                       queue_obj.status_label['text'] = "The right child of the front pointing node is inserted"
                       node_data_store_to_access_easily.append(take[6])
                       queue_obj.box_insert(take[6][2])
                       top.update()
                       time.sleep(2)

                    queue_obj.status_label['text'] = "Front pointing node value printed here and get deleted from Queue"
                    i += 1
                    queue_obj.value_show[i].config(text=take[2])
                    queue_obj.deletion()
                    top.update()

            top.mainloop()

        except:
            print("Some force stop error")

    def delete(self):# For node deletion
        val = self.take_entry.get()
        p_node = None

        if len(self.node_number_value_store) == 0:
            messagebox.showwarning("Empty BST", "BST is empty..nothing to delete")
        else:
            node = self.node_number_value_store[0]# Consider first node by default to find targeting node
            while True:
                if node is None:
                    messagebox.showwarning("Not found","Sorry,targeting value not found")
                    break
                if int(node[2]) == int(val):# For node found and get out from that loop
                    break
                if int(val)>int(node[2]):# For right side check
                    p_node=node
                    node=node[6]
                else:# For left side check
                    p_node = node
                    node=node[5]

            if node is not None:
                if node[5] is None and node[6] is None:# No child node exist
                    self.no_child_node_exist(node,p_node)

                elif node[5] is None and node[6] is not None:# No left child node but right child node exist
                    self.left_none_right_exist(node)

                elif node[5] is not None and node[6] is None:# No right child node but left child node exist
                    self.right_none_left_exist(node)

                elif node[5] is not None and node[6] is not None:# Both child node exist
                    self.left_none_right_exist(node)

                if len(self.node_number_value_store) == 0:# When all node deleted some initialization
                    self.notation_index = 0
                    self.make_null.place(x=565, y=90 + 50)

        self.input_btn_activation()

    def no_child_node_exist(self,node,p_node):
        if p_node is None:
            pass
        else:
            if p_node[5] is node:
                p_node[5] = None

            else:
                p_node[6] = None

        self.make_canvas.itemconfig(node[0], fill="blue", outline="black")
        node[1].config(bg="blue", fg="red")
        self.status_note.config(text="Blue colored node will deleted")
        self.status_note.place(x=400, y=130)
        self.window.update()
        time.sleep(1)
        self.make_canvas.delete(node[0])
        self.make_canvas.delete(node[4])
        node[1].place_forget()
        self.node_number_value_store.pop(self.node_number_value_store.index(node))
        print(self.node_number_value_store)
        self.status_note.config(text="Work done")
        self.status_note.place(x=550, y=130)

    def left_none_right_exist(self,node):
        p_temp = None
        temp = node[6]
        left_side_existence_checking_of_one_side_down_label_node=0
        while temp[5]:
            left_side_existence_checking_of_one_side_down_label_node=1
            p_temp=temp
            temp=temp[5]

        self.color_indicator_to_delete(node=node,temp=temp)

        if left_side_existence_checking_of_one_side_down_label_node == 1:
            node[2] = temp[2]
            node[1].config(text=temp[2])
            if temp[6]:
                temp[2] = temp[6][2]
                temp[1].config(text=temp[6][2])
                p_temp=temp
                temp=temp[6]
                p_temp[6]=None
            else:
                p_temp[5] = None
        else:
            temp1 = None
            p_temp=node
            while True:
                p_temp[2]=temp[2]
                p_temp[1].config(text=temp[2])
                if  temp[6]:
                    p_temp=temp
                    temp=temp[6]
                    if  temp[5]:
                        temp1 = temp[5]
                        temp[5] = None
                else:
                    break

            p_temp[6] = None

            if temp1:
                take_temp1_val = temp1[2]
                self.make_canvas.delete(temp1[0])
                self.make_canvas.delete(temp1[4])
                temp1[1].place_forget()
                self.node_number_value_store.pop(self.node_number_value_store.index(temp1))

                p_node_coord = self.make_canvas.coords(node[6][0])
                c_right_node_coord = self.make_canvas.coords(node[6][6][0])

                node_coord = self.make_node_to_the_left_manually(p_node_coord, c_right_node_coord)

                make_circle = self.make_canvas.create_oval(node_coord, width=3, fill="green", outline="orange")

                arrow_coord = self.make_left_arrow_for_node_left_manually(node_coord, p_node_coord)

                take_arrow = self.make_canvas.create_line(arrow_coord, width=3, fill="brown")

                label_make = Label(self.window, text=take_temp1_val, fg="yellow", bg="green",
                                   font=("Arial", 12, "bold"))
                label_make.place(x=node_coord[0] + 14, y=node_coord[1] + 14)

                notation_index = ((node[6][3] + 1) * 2) - 1

                temp_take = self.store_all_data_about_a_node(make_circle, label_make, take_temp1_val, notation_index, take_arrow)

                node[6][5] = temp_take

        self.make_canvas.delete(temp[0])
        self.make_canvas.delete(temp[4])
        temp[1].place_forget()
        self.node_number_value_store.pop(self.node_number_value_store.index(temp))

        print(self.node_number_value_store)

    def right_none_left_exist(self, node):
        p_temp = None
        temp = node[5]
        right_side_existence_checking_of_one_side_down_label_node = 0
        while temp[6]:
            right_side_existence_checking_of_one_side_down_label_node = 1
            p_temp = temp
            temp = temp[6]

        self.color_indicator_to_delete(node=node, temp=temp)

        if  right_side_existence_checking_of_one_side_down_label_node == 1:
            node[2] = temp[2]
            node[1].config(text=temp[2])
            if temp[5]:
                temp[2] = temp[5][2]
                temp[1].config(text=temp[5][2])
                p_temp=temp
                temp=temp[5]
                p_temp[5]=None
            else:
                p_temp[6] = None

        else:
            temp1 = None
            p_temp = node
            while True:
                p_temp[2] = temp[2]
                p_temp[1].config(text=temp[2])
                if  temp[5]:
                    p_temp = temp
                    temp = temp[5]
                    if temp[6]:
                        temp1 = temp[6]
                        temp[6] = None
                else:
                    break

            p_temp[5] = None

            if temp1:
                take_temp1_val = temp1[2]
                self.make_canvas.delete(temp1[0])
                self.make_canvas.delete(temp1[4])
                temp1[1].place_forget()
                self.node_number_value_store.pop(self.node_number_value_store.index(temp1))

                p_node_coord = self.make_canvas.coords(node[5][0])
                c_right_node_coord = self.make_canvas.coords(node[5][5][0])

                node_coord = self.make_node_to_the_right_manually(p_node_coord, c_right_node_coord)

                make_circle = self.make_canvas.create_oval(node_coord, width=3, fill="green", outline="orange")

                arrow_coord = self.make_right_arrow_for_node_right_manually(node_coord, p_node_coord)

                take_arrow = self.make_canvas.create_line(arrow_coord, width=3, fill="brown")

                label_make = Label(self.window, text=take_temp1_val, fg="yellow", bg="green", font=("Arial", 12, "bold"))
                label_make.place(x=node_coord[0] + 14, y=node_coord[1] + 14)

                notation_index = ((node[5][3] + 1) * 2)

                temp_take = self.store_all_data_about_a_node(make_circle,label_make,take_temp1_val,notation_index,take_arrow)
                node[5][6]=temp_take

        self.make_canvas.delete(temp[0])
        self.make_canvas.delete(temp[4])
        temp[1].place_forget()
        self.node_number_value_store.pop(self.node_number_value_store.index(temp))

        print(self.node_number_value_store)

    def color_indicator_to_delete(self,node,temp):# Color indicating to deleted and replaced node
        # node-->Targeting node and temp-->Replacing node
        self.make_canvas.itemconfig(temp[0], fill="brown")
        temp[1].config(bg="brown", fg="yellow")
        self.make_canvas.itemconfig(node[0], fill="yellow")
        node[1].config(bg="yellow", fg="green")

        self.status_note.config(text="Yellow colored node will deleted and replaced by brown colored node")
        self.status_note.place(x=250, y=130)
        self.window.update()
        time.sleep(5)

        self.make_canvas.itemconfig(temp[0], fill="green", outline="orange")
        temp[1].config(fg="yellow", bg="green")
        self.make_canvas.itemconfig(node[0], fill="green", outline="orange")
        node[1].config(fg="yellow", bg="green")
        self.status_note.config(text="Work done")
        self.status_note.place(x=550, y=130)

    # Functions are associated with delete node
    def make_node_to_the_left_manually(self, p_node_coord, c_right_node_coord):# Make node to the left at the time of deletion
        make_initial_x = p_node_coord[0] - (c_right_node_coord[0] - p_node_coord[0])
        make_initial_y = c_right_node_coord[1]
        make_final_x = p_node_coord[2] - (c_right_node_coord[2] - p_node_coord[2])
        make_final_y = c_right_node_coord[3]
        node_coord = (make_initial_x, make_initial_y, make_final_x, make_final_y)
        return node_coord

    def make_left_arrow_for_node_left_manually(self, node_coord, p_node_coord):# Make arrow for newly created left node
        current_x = (node_coord[0] + node_coord[2]) / 2 + 18
        current_y = (node_coord[1] + node_coord[3]) / 2 - 18
        parent_x = (p_node_coord[0] + p_node_coord[2]) / 2 - 25
        parent_y = (p_node_coord[1] + p_node_coord[3]) / 2
        arrow_coord = (current_x, current_y, parent_x, parent_y)
        return arrow_coord

    def make_node_to_the_right_manually(self, p_node_coord, c_right_node_coord):# Make node to the right at the time of deletion
        make_initial_x = p_node_coord[0] + (p_node_coord[0] - c_right_node_coord[0])
        make_initial_y = c_right_node_coord[1]
        make_final_x = p_node_coord[2] + (p_node_coord[2] - c_right_node_coord[2])
        make_final_y = c_right_node_coord[3]
        node_coord = (make_initial_x, make_initial_y, make_final_x, make_final_y)
        return node_coord

    def make_right_arrow_for_node_right_manually(self, node_coord, p_node_coord):# Make arrow for newly created right node
        current_x = (node_coord[0] + node_coord[2]) / 2 - 18
        current_y = (node_coord[1] + node_coord[3]) / 2 - 18
        parent_x = (p_node_coord[0] + p_node_coord[2]) / 2 + 25
        parent_y = (p_node_coord[1] + p_node_coord[3]) / 2
        arrow_coord = (current_x, current_y, parent_x, parent_y)
        return arrow_coord

    # For all about data store about a node in a list
    def store_all_data_about_a_node(self,make_circle,label_make,take_temp1_val,notation_index,take_arrow):
        temp_take = []
        temp_take.append(make_circle)
        temp_take.append(label_make)
        temp_take.append(take_temp1_val)
        temp_take.append(notation_index)
        temp_take.append(take_arrow)
        temp_take.append(None)
        temp_take.append(None)
        self.node_number_value_store.append(temp_take)
        return temp_take

    def input_btn_deactivation(self):
        self.insert_node['state'] = DISABLED
        self.pre_order_traversal['state'] = DISABLED
        self.in_order_traversal['state'] = DISABLED
        self.post_order_traversal['state'] = DISABLED
        self.level_order_traversal['state'] = DISABLED
        self.level_order_display['state'] = DISABLED
        self.make_delete['state'] = DISABLED

    def input_btn_activation(self):
        self.insert_node['state'] = NORMAL
        self.pre_order_traversal['state'] = NORMAL
        self.in_order_traversal['state'] = NORMAL
        self.post_order_traversal['state'] = NORMAL
        self.level_order_traversal['state'] = NORMAL
        self.level_order_display['state'] = NORMAL
        self.make_delete['state'] = NORMAL


if __name__ == '__main__':
    window = Tk()
    window.title("Binary Search Tree Visualizer")
    window.geometry("1350x720")
    window.maxsize(1350,720)
    window.minsize(1350,720)
    window.config(bg="orange")
    window.iconbitmap("bst_icon.ico")
    BST(window)
    window.mainloop()
