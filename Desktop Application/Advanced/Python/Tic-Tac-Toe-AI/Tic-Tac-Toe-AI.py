                                                #   TIC-TAC-TOE AI  #
from tkinter import *
from tkinter import messagebox
import random

class TIC_TAC_TOE_AI:
    def __init__(self, root):
        # Basic Initialization
        self.window = root
        self.make_canvas = Canvas(self.window, background="#141414", relief=RAISED, bd=3)
        self.make_canvas.pack(fill=BOTH, expand=1)

        self.machine_cover = []
        self.human_cover = []
        self.prob = []
        self.sign_store = {}
        
        self.chance_counter = 0
        self.technique = -1
        
        self.surrounding_store = {1: (2,3,4,7), 2:(1,3), 3:(1,2,6,9), 4:(1,7), 5: (2,4,6,8), 6: (3,9), 7:(1,4,8,9), 8:(7,9), 9:(7,8,6,3)}            

        self.decorating()

    def decorating(self):# Basic Set-up
        Label(self.make_canvas, text="Tic-Tac-Toe AI", bg="#141414", fg="#00FF00", font=("Lato", 25, "bold")).place(x=110, y=10)
        self.btn_1 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(1), state=DISABLED)
        self.btn_1.place(x=20,y=100)
        self.btn_2 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(2), state=DISABLED)
        self.btn_2.place(x=190,y=100)
        self.btn_3 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(3), state=DISABLED)
        self.btn_3.place(x=360,y=100)

        self.btn_4 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(4), state=DISABLED)
        self.btn_4.place(x=20,y=200)
        self.btn_5 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(5), state=DISABLED)
        self.btn_5.place(x=190,y=200)
        self.btn_6 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(6), state=DISABLED)
        self.btn_6.place(x=360,y=200)

        self.btn_7 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(7), state=DISABLED)
        self.btn_7.place(x=20,y=300)
        self.btn_8 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(8), state=DISABLED)
        self.btn_8.place(x=190,y=300)
        self.btn_9 = Button(self.make_canvas, text="", font=("Arial", 15, "bold", "italic"), width=5, bg="#262626", activebackground="#262626", bd=3, command=lambda: self.__human_play(9), state=DISABLED)
        self.btn_9.place(x=360,y=300)

        self.activate_btn = [self.btn_1, self.btn_2, self.btn_3, self.btn_4, self.btn_5, self.btn_6, self.btn_7, self.btn_8, self.btn_9]

        self.machine_first_control = Button(self.make_canvas, text="Machine vs Human", font=("Arial", 15, "bold", "italic"), bg="#262626", activebackground="#262626", fg="#9d9dff", relief=RAISED, bd=3, command=lambda: self.control_give("machine_first"))
        self.machine_first_control.place(x=15, y=380)

        self.human_first_control = Button(self.make_canvas, text="Human vs Machine", font=("Arial", 15, "bold", "italic"), bg="#262626", activebackground="#262626", fg="#9d9dff", relief=RAISED, bd=3, command=self.control_give)
        self.human_first_control.place(x=240, y=380)

        self.reset_btn = Button(self.make_canvas, text="Reset", font=("Arial", 15, "bold", "italic"), bg="#262626", activebackground="#262626", disabledforeground="grey", fg="#9d9dff", relief=RAISED, bd=3, command=self.reset, state=DISABLED)
        self.reset_btn.place(x=190, y=440)

    def reset(self):# Reset the game
        self.machine_cover.clear()
        self.human_cover.clear()
        self.sign_store.clear()
        self.prob.clear()
        self.technique = -1
        self.chance_counter = 0
        for every in self.activate_btn:
            every.config(text="")
        self.machine_first_control['state'] = NORMAL
        self.human_first_control['state'] = NORMAL
        self.reset_btn['state'] = DISABLED
    
    def game_over_management(self):# After game over some works
        for every in self.activate_btn:
            every.config(state=DISABLED)
        self.reset_btn['state'] = NORMAL
    
    def control_give(self, indicator="human_first"):# Control give based on human first or computer first play
        self.machine_first_control.config(state=DISABLED, disabledforeground="grey")
        self.human_first_control.config(state=DISABLED, disabledforeground="grey")
        self.reset_btn.config(state=DISABLED, disabledforeground="grey")
        for every in self.activate_btn:
            every.config(state=NORMAL)
        if indicator == "machine_first":
            self.__machine_play()
        
    def __sign_insert(self, btn_indicator, sign_is="X"):# Button sign Insert
        if sign_is == "X":
            self.activate_btn[btn_indicator - 1].config(text=sign_is, state=DISABLED, disabledforeground="#00FF00")
        else:
            self.activate_btn[btn_indicator - 1].config(text=sign_is, state=DISABLED, disabledforeground="red")
        self.sign_store[btn_indicator] = sign_is
    
    def __machine_play(self):# Machine Control
        self.chance_counter+=1
        # For even in self.chance_counter, human first chance..... for odd, computer first chance
        if self.chance_counter == 1:
            self.__sign_insert(9)
            self.machine_cover.append(9)

        elif self.chance_counter == 2:
            human_last = self.human_cover[len(self.human_cover)-1]
            if human_last != 5:
                self.technique = 1
                self.__sign_insert(5)
                self.machine_cover.append(5)
            else:
                self.technique = 2
                self.__sign_insert(9)
                self.machine_cover.append(9)
                    
        elif self.chance_counter == 3:
            human_input = self.human_cover[len(self.human_cover)-1]
            if human_input%2 == 0:
                self.technique = 1
                self.activate_btn[5 - 1].config(text="X")
                self.sign_store[5] = "X"
                self.prob.append(1)

            elif human_input != 5:
                self.technique = 2
                take_prediction = [7,3]
                try:
                    take_prediction.remove(human_input)
                except:    
                    pass
                take_prediction = random.choice(take_prediction)
                self.__sign_insert(take_prediction)
                self.prob.append(1)
                self.machine_cover.append(take_prediction)
            else:
                self.technique = 3
                self.__sign_insert(1)

        elif self.chance_counter == 4:
            human_first = self.human_cover[0]
            human_last = self.human_cover[1]
            opposite = {1:9, 2:8, 3:7, 4:6, 6:4, 7:3, 8:2, 9:1}

            if self.technique == 1:
                take_surr = list(self.surrounding_store[human_first])
                if human_last in take_surr:
                    take_surr.remove(human_last)
                    diff = human_last - human_first

                    if diff == 6 or diff == -6:
                        if diff == 6:
                            place_it = human_first + 3
                        elif diff == -6:
                            place_it = human_first - 3
                    elif diff == 2 or diff == -2:
                        if diff == 2:
                            place_it = human_first + 1
                        else:
                            place_it = human_first - 1
                    elif diff == 1 or diff == -1:
                        if diff == 1:
                            if human_first-1 == 1 or human_first-1 == 7:
                                place_it = human_first-1
                            else:
                                place_it = human_last+1
                        else:
                            if human_last-1 == 1 or human_last-1 == 7:
                                place_it = human_last-1
                            else:
                                place_it = human_first+1
                    elif diff == 3 or diff == -3:
                        if diff == 3:
                            if human_first-3 == 1 or human_first-3 == 3:
                                place_it = human_first-3
                            else:
                                place_it = human_last+3
                        else:
                            if human_last-3 == 1 or human_last-3 == 3:
                                place_it = human_last-3
                            else:
                                place_it = human_first+3

                    self.__sign_insert(place_it)
                    self.machine_cover.append(place_it)
                    self.prob.append(opposite[place_it])
                    self.surrounding_store[human_first] = tuple(take_surr)
                else:
                    if 2 not in self.sign_store.keys():
                        self.__sign_insert(2)
                        self.machine_cover.append(2)
                        if opposite[2] not in self.sign_store.keys():
                            self.prob.append(opposite[2])
                    else:
                        temp = [4,6,8]
                        take_total = self.human_cover+self.machine_cover
                        for x in take_total:
                            if x in temp:
                                temp.remove(x)
                        take_choice = random.choice(temp)
                        self.__sign_insert(take_choice)
                        self.machine_cover.append(take_choice)
                        self.prob.append(opposite[take_choice])

            elif self.technique == 2:
                human_last = self.human_cover[len(self.human_cover)-1]
                if human_last == 1:
                    take_place = 3
                    self.prob.append(4)
                    self.prob.append(6)
                else:
                    take_place = opposite[human_last]
                    diff = 9 - take_place
                    if diff == 2:
                        self.prob.append(9-1)
                    elif diff == 6:
                        self.prob.append(9-3)
                    elif diff == 3:
                        self.prob.append(9-6)
                    else:
                        self.prob.append(9-2)
                self.__sign_insert(take_place)
                self.machine_cover.append(take_place)

        elif self.chance_counter == 5:
            human_input = self.human_cover[len(self.human_cover)-1]
            if self.technique == 1:
                if self.prob[0] != human_input:
                    self.__sign_insert(self.prob[0])
                    self.machine_line_match()
                else:
                    if self.technique == 1:
                        try:
                            try:
                                if self.sign_store[self.prob[0]+1] == "O":
                                    pass
                            except:
                                if self.sign_store[self.prob[0]+1+6] == "O":        
                                    pass
                            value_take = self.prob[0]+2
                            self.prob.clear()
                            self.prob.append(6)
                            self.prob.append(7)
                        except:
                            value_take = self.prob[0]+6
                            self.prob.clear()
                            self.prob.append(8)
                            self.prob.append(3)
                        
                        self.__sign_insert(value_take)  
                        self.machine_cover.append(value_take)
                
            elif self.technique == 2:
                    if self.machine_cover[0] - self.machine_cover[1] == 6:
                        try:
                            if self.sign_store[self.machine_cover[1]+3] == "O":
                                self.prob.clear()
                                if 7 in self.sign_store.keys():
                                    value_predict = 1
                                    self.prob.append(2)
                                else:
                                    value_predict = 7
                                    self.prob.append(8)    
                                self.prob.append(5)    
                                self.__sign_insert(value_predict)  
                                self.machine_cover.append(value_predict)
                        except:
                            self.__sign_insert(self.machine_cover[1]+3)  
                            self.machine_line_match()
                    else:
                        try:
                            if self.sign_store[self.machine_cover[1]+1] == "O":
                                self.prob.clear()
                                if 3 in self.sign_store.keys():
                                    value_predict = 1
                                    self.prob.append(4) 
                                else:
                                    value_predict = 3
                                    self.prob.append(6) 
                                self.prob.append(5)     
                                self.__sign_insert(value_predict)    
                                self.machine_cover.append(value_predict)
                        except:
                            self.__sign_insert(self.machine_cover[1]+1)  
                            self.machine_cover.append(self.machine_cover[1]+1)
                            self.machine_line_match()
            else:
                if self.prob:
                    self.prob.clear()
                draw_occurance =  {2: 8, 8: 2, 4: 6, 6: 4}
                if human_input in draw_occurance.keys():
                    self.technique = 3.1
                    self.__sign_insert(draw_occurance[human_input])  
                    self.machine_cover.append(draw_occurance[human_input])
                    next_prob = {8: 7, 4: 7, 2: 3, 6: 3}
                    self.prob.append(next_prob[draw_occurance[human_input]])
                else:
                    self.technique = 3.2
                    if human_input == 3:
                        self.__sign_insert(7)  
                        self.machine_cover.append(7)
                        self.prob.append(8)
                        self.prob.append(4)
                    else:
                        self.__sign_insert(3)  
                        self.machine_cover.append(3)
                        self.prob.append(2)
                        self.prob.append(6)
                    
        elif self.chance_counter == 6:
            if self.human_line_match():
                opposite = {1:9, 2:8, 3:7, 4:6, 6:4, 7:3, 8:2, 9:1}
                human_last = self.human_cover[len(self.human_cover)-1]
                if self.technique == 1:
                    if self.prob and human_last != self.prob[0]:
                        self.__sign_insert(self.prob[0])
                        self.machine_cover.append(self.prob[0])
                        self.machine_line_match()
                    
                    elif len(self.prob) == 0:
                        if human_last+3 == 7 or human_last+3 == 9:
                            take_place = human_last+3
                        elif human_last-3 == 1 or human_last-3 == 3:
                            take_place = human_last-3
                        elif human_last-3 == 4 or human_last-3 == 6:
                            take_place = human_last-3
                        elif human_last+3 == 4 or human_last+3 == 6:
                            take_place = human_last+3
                        
                        self.__sign_insert(take_place)
                        self.machine_cover.append(take_place)
                        self.prob.append(opposite[take_place])

                    else:
                        if self.prob:
                            self.prob.clear()
                        if human_last%2 == 0:
                            if human_last == 8:
                                if (human_last+1==3 or human_last+1==9) and human_last + 1 not in self.sign_store.keys():
                                    place_here = human_last + 1
                                elif (human_last-1==1 or human_last-1==7) and human_last - 1 not in self.sign_store.keys(): 
                                    place_here = human_last - 1
                                elif (human_last-3==1 or human_last-3==3) and human_last - 3 not in self.sign_store.keys(): 
                                    place_here = human_last - 3
                                else:
                                    place_here = human_last + 3
                                
                                self.__sign_insert(place_here)
                                self.machine_cover.append(place_here)
                                temp_oppo = {7: 3, 3: 7, 1: 9, 9: 1}
                                self.prob.append(temp_oppo[place_here])

                            else:
                                take_center_surr = list(self.surrounding_store[5])
                                temp_store = self.human_cover+self.machine_cover
                                for element in temp_store:
                                    try:
                                        take_center_surr.remove(element)
                                    except:
                                        pass
                                
                                if take_center_surr:
                                    if (human_last+3==7 or human_last+3==9) or human_last+3 in self.sign_store.keys():
                                        take_place = human_last-3
                                    else:
                                        take_place = random.choice(take_center_surr)
                                        take_center_surr.remove(take_place)
                                    self.__sign_insert(take_place)
                                    self.machine_cover.append(take_place)
                                    self.surrounding_store[5] = tuple(take_center_surr)
                                    self.prob.append(opposite[take_place])
                                else:
                                    for every in opposite.keys():
                                        if every%2 != 0 and opposite[every] not in self.sign_store.keys():
                                            self.__sign_insert(every)
                                            self.machine_cover.append(every)
                                            self.prob.append(opposite[every])
                                            if (every+6 == 7 or every+6 == 9) and (every+6 not in self.sign_store.keys()):
                                                self.prob.append(every+6)
                                            elif (every-6 == 1 or every-6 == 3) and (every-6 not in self.sign_store.keys()):
                                                self.prob.append(every-6)
                                            elif (every-2 == 1 or every-2 == 7) and (every-2 not in self.sign_store.keys()):
                                                self.prob.append(every-2)
                                            else:
                                                self.prob.append(every+2)
                                            break
                        else:
                            take_surr = self.surrounding_store[human_last]
                            for element in take_surr:
                                if element in self.sign_store.keys():
                                    pass
                                else:
                                    self.__sign_insert(element)
                                    self.machine_cover.append(element)
                                    if opposite[element] not in self.sign_store.keys():
                                        self.prob.append(opposite[element])
                                    break
                
                else:
                    if len(self.prob) == 2:
                        if human_last in self.prob:
                            
                            if self.prob[1] != human_last:
                                self.__sign_insert(self.prob[1])
                                self.machine_cover.append(self.prob[1])
                                self.machine_line_match()

                            else:
                                self.__sign_insert(self.prob[0])
                                self.machine_cover.append(self.prob[0])
                                self.prob.clear()
                                self.prob.append(2)
                        else:
                            self.__sign_insert(self.prob[1])
                            self.machine_cover.append(self.prob[1])
                            self.machine_line_match()
                    else:
                        if human_last != self.prob[0]:
                            self.__sign_insert(self.prob[0])
                            self.machine_cover.append(self.prob[0])
                            self.machine_line_match()
                        else:
                            self.__sign_insert(opposite[self.prob[0]])
                            self.machine_cover.append(opposite[self.prob[0]])
        
        elif self.chance_counter == 7:
            human_input = self.human_cover[len(self.human_cover)-1]
            if self.technique == 1:
                if self.prob[0] == human_input:
                    self.__sign_insert(self.prob[1])  
                else:
                    self.__sign_insert(self.prob[0])  
                self.machine_line_match()

            elif self.technique == 2:
                if human_input in self.prob:
                    self.prob.remove(human_input) 
                self.__sign_insert(self.prob[0])  
                self.machine_line_match()
            else:
                if self.technique == 3.2:
                    if human_input in self.prob:
                        self.prob.remove(human_input)
                    self.__sign_insert(self.prob[0])  
                    self.machine_line_match()
                else:
                    if human_input in self.prob:
                        self.prob.clear()
                        machine_next_chance = {7: 3, 3: 7}
                        self.__sign_insert(machine_next_chance[human_input])
                        next_human_prob = {3: (2,6), 7: (4,8)}
                        self.prob.append(next_human_prob[machine_next_chance[human_input]][0])
                        self.prob.append(next_human_prob[machine_next_chance[human_input]][1])
                    else:
                        self.__sign_insert(self.prob[0])
                        self.machine_line_match()

        elif self.chance_counter == 8:
            if self.human_line_match():
                human_last = self.human_cover[len(self.human_cover)-1]
                opposite = {1:9, 2:8, 3:7, 4:6, 6:4, 7:3, 8:2, 9:1}
                
                if self.technique == 1:
                    if self.prob and human_last not in self.prob:
                        if self.prob[0] not in self.sign_store.keys():
                            self.__sign_insert(self.prob[0])
                            self.machine_cover.append(self.prob[0])
                        else:
                            temp=[1,2,3,4,5,6,7,8,9]
                            temp_store = self.machine_cover + self.human_cover
                            for x in temp_store:
                                if x in temp:
                                    temp.remove(x)
                            take_choice = random.choice(temp)
                            self.__sign_insert(take_choice)
                            self.machine_cover.append(take_choice)
                        self.machine_line_match()

                    elif len(self.prob) == 0:
                        self.__sign_insert(human_last+2)
                        self.machine_cover.append(human_last+2)

                    else:
                        if len(self.prob) == 2:
                            if human_last in self.prob:
                                self.prob.remove(human_last)
                            self.__sign_insert(self.prob[0])
                            self.machine_cover.append(self.prob[0])
                            self.machine_line_match()

                        else:
                            take_surr = self.surrounding_store[human_last]
                            for element in take_surr:
                                if element in self.sign_store.keys():
                                    pass
                                else:
                                    self.__sign_insert(element)
                                    self.machine_cover.append(element)
                                    break

                else:
                    if opposite[human_last] not in self.sign_store.keys():
                        self.__sign_insert(opposite[human_last])
                        self.machine_cover.append(opposite[human_last])
                    else:
                        temp_store = [1,2,3,4,5,6,7,8,9]
                        temp_total = self.machine_cover+self.human_cover
                        for element in temp_store:
                            if element in temp_total:
                                temp_store.remove(element)
                        take_choice = random.choice(temp_store)
                        self.__sign_insert(take_choice)
                        self.machine_cover.append(take_choice)
        
        elif self.chance_counter == 9:
            human_input = self.human_cover[len(self.human_cover)-1]
            if self.prob[0] in self.sign_store.keys() and self.prob[1] in self.sign_store.keys():
                self.prob.clear()
                opposite_detection = {2: 8, 8: 2, 6: 4, 4: 6}
                self.__sign_insert(opposite_detection[human_input])
                self.machine_line_match()
            else:
                
                if self.prob[0] in self.sign_store.keys():
                    self.__sign_insert(self.prob[1])
                else:
                    self.__sign_insert(self.prob[0])
                self.machine_line_match()


    def __human_play(self, chance):# Human Control
        self.chance_counter+=1
        self.__sign_insert(chance, "O")
        self.human_cover.append(chance)
        if self.chance_counter == 9:
            self.human_line_match()
        else:    
            self.__machine_play()
    
    def machine_line_match(self):
        found = 0
        if self.activate_btn[1-1]['text'] == self.activate_btn[2-1]['text'] == self.activate_btn[3-1]['text'] == "X":
            found=1
        elif self.activate_btn[4-1]['text'] == self.activate_btn[5-1]['text'] == self.activate_btn[6-1]['text'] == "X":
            found=1
        elif self.activate_btn[7-1]['text'] == self.activate_btn[8-1]['text'] == self.activate_btn[9-1]['text'] == "X":
            found=1
        elif self.activate_btn[1-1]['text'] == self.activate_btn[4-1]['text'] == self.activate_btn[7-1]['text'] == "X":
            found=1
        elif self.activate_btn[2-1]['text'] == self.activate_btn[5-1]['text'] == self.activate_btn[8-1]['text'] == "X":
            found=1
        elif self.activate_btn[3-1]['text'] == self.activate_btn[6-1]['text'] == self.activate_btn[9-1]['text'] == "X":
            found=1
        elif self.activate_btn[1-1]['text'] == self.activate_btn[5-1]['text'] == self.activate_btn[9-1]['text'] == "X":
            found=1
        elif self.activate_btn[3-1]['text'] == self.activate_btn[5-1]['text'] == self.activate_btn[7-1]['text'] == "X":
            found=1
        if found == 1:
            messagebox.showinfo("Game Over", "Computer is winner")
            self.game_over_management()
        elif self.chance_counter == 9:
            messagebox.showinfo("Game Over", "Game draw")
            self.game_over_management()
    
    def human_line_match(self):
        found = 0
        if self.activate_btn[1-1]['text'] == self.activate_btn[2-1]['text'] == self.activate_btn[3-1]['text'] == "O":
            found=1
        elif self.activate_btn[4-1]['text'] == self.activate_btn[5-1]['text'] == self.activate_btn[6-1]['text'] == "O":
            found=1
        elif self.activate_btn[7-1]['text'] == self.activate_btn[8-1]['text'] == self.activate_btn[9-1]['text'] == "O":
            found=1
        elif self.activate_btn[1-1]['text'] == self.activate_btn[4-1]['text'] == self.activate_btn[7-1]['text'] == "O":
            found=1
        elif self.activate_btn[2-1]['text'] == self.activate_btn[5-1]['text'] == self.activate_btn[8-1]['text'] == "O":
            found=1
        elif self.activate_btn[3-1]['text'] == self.activate_btn[6-1]['text'] == self.activate_btn[9-1]['text'] == "O":
            found=1
        elif self.activate_btn[1-1]['text'] == self.activate_btn[5-1]['text'] == self.activate_btn[9-1]['text'] == "O":
            found=1
        elif self.activate_btn[3-1]['text'] == self.activate_btn[5-1]['text'] == self.activate_btn[7-1]['text'] == "O":
            found=1
        if found == 1:
            messagebox.showinfo("Game Over", "You are winner")
            self.game_over_management()
            return 0
        elif self.chance_counter == 9:
            messagebox.showinfo("Game Over", "Game draw")
            self.game_over_management()
            return 0
        else:
            return 1


if __name__ == "__main__":
    window = Tk()
    window.title("AI Tic-Tac-Toe")
    window.config(bg="#141414")
    window.geometry("450x500")
    window.maxsize(450,500)
    window.minsize(450,500)
    TIC_TAC_TOE_AI(window)
    window.mainloop()