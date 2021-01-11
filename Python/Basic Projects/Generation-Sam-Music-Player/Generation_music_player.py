                                   # Generation Music Player #       
from tkinter import *
from tkinter import filedialog,messagebox,colorchooser
import time,pygame
from PIL import ImageTk,Image
from mutagen.mp3 import MP3

class MusicPlayer:
    def __init__(self, root, backward_img, play_img, pause_img, stop_image_btn, forward_img):
        self.window = root
        # Some variables initialize with None 
        self.my_list_song = None
        self.mute_scale = None
        self.loop_bar = None
        self.shuffle_bar = None

        # Some integer variable initialization
        self.shuffle_change = IntVar()
        self.repeat_change = IntVar()
        self.mute_change = IntVar()
        self.shuffle_counter = IntVar()
        self.repeat_counter = IntVar()

        # Btn img initialization
        self.forward_btn = forward_img
        self.backward_btn = backward_img
        self.pause_btn = pause_img
        self.play_btn = play_img
        self.stop_btn = stop_image_btn

        # Value initialization
        self.song_duration_bar = 0
        self.song_length = 0
        self.repeat_counter = 1
        self.shuffle_counter = 0
        self.total_song = 0
        self.shuffle_status = 1
        self.repeat_status = 1
        self.mute_status = 1

        # pygame initialization
        pygame.mixer.init()

        # Default function calling
        self.basic_setup()
        self.instructional_btn_setup()
        self.image_button_function_set()
        self.song_duration()
        self.muter()
        self.repeat_controller()
        self.shuffle_controller()
        self.window.bind('<Delete>', self.clear)

    def basic_setup(self):
        # Heading
        Label(self.window,text="Generation Music Player", font=("Arial",20,"bold","italic"),bg="#141414",fg="gold").place(x=240,y=25)

        # Song Collection
        frame = Frame(self.window)
        frame.place(x=25,y=80)

        v_scroll = Scrollbar(frame)
        v_scroll.pack(side=RIGHT, fill=Y)

        self.my_list_song = Listbox(frame, bg="#404040", fg="#ffbf50", width=120, height=10, font=("Arial",8,"bold"), relief=SUNKEN, borderwidth=20, yscrollcommand=v_scroll.set)
        self.my_list_song.pack(side=LEFT, anchor=NW)

        v_scroll.configure(command=self.my_list_song.yview)

    def instructional_btn_setup(self): # Some button initialization
        song_add = Button(self.window,text="Add Song",font=("Helvetica",15,"bold","italic"), bg="#262626",fg="#ff1414", activebackground="#262626", activeforeground="#ff1414", width=12, height=1, relief=RAISED, borderwidth=5, command=self.add_song)
        song_add.place(x=480,y=352)

        delete_song = Button(self.window, text="Delete Selected Song", font=("Helvetica", 14, "bold", "italic"), bg="#262626", fg="#ff1414", activebackground="#262626", activeforeground="#ff1414", width= 27, relief=RAISED, borderwidth=5,command=self.delete_selected_song)
        delete_song.place(x=480, y=437)

        song_counter = Button(self.window, text="Song Counter", width=13,font=("Helvetica", 15, "bold", "italic"), activebackground="#262626", activeforeground="#ff1414", bg="#262626", fg="#ff1414", relief=RAISED, borderwidth=5, command=self.song_counter)
        song_counter.place(x=650, y=352)

    def image_button_function_set(self):# Instructional buttons
        self.play_btn.config(command=lambda: self.play_song('<Return>'))
        self.window.bind('<Return>',self.play_song)
        self.window.bind('<Double-Button-1>', self.play_song)

        self.pause_btn.config(command=lambda: self.pause_song('<space>'))
        self.window.bind('<space>',self.pause_song)

        self.stop_btn.config(command=lambda: self.stop_song('<0>'))
        self.window.bind('<Escape>', self.stop_song)

        self.forward_btn.config(command=lambda: self.next_song('<Right>'))
        self.window.bind('<Right>', self.next_song)

        self.backward_btn.config(command=lambda: self.previous_song('<Left>'))
        self.window.bind('<Left>', self.previous_song)

    def add_song(self):# Adding songs
        add_multiple_song = filedialog.askopenfilenames(title="Select one or multiple song",filetypes=(("MP3 files", "*mp3"), ("WAV files","*.wav")))
        for song in add_multiple_song:
            self.my_list_song.insert(END, song)
            time.sleep(0.5)
            window.update()

    def delete_selected_song(self):# Delete a particular song
        self.stop_song()
        self.my_list_song.delete(ACTIVE)

    def song_counter(self):# Total song present in the list
        messagebox.showinfo("Song Counter", "Total song in the list: " + str(self.my_list_song.size()))

    def song_duration(self):# Make Song_Duration Label
        self.song_duration_bar = Label(self.window, text="Song Duration", font=("Arial",17,"bold"), fg="white", bg="#141414",width=25)
        self.song_duration_bar.place(x=220, y=285)    

    def play_song(self,e=None):# Play a song
        try:
            # Song Load and Play
            take_selected_song = self.my_list_song.get(ACTIVE)
            pygame.mixer.music.load(take_selected_song)
            pygame.mixer.music.play(loops=self.repeat_counter)

            # Song length find
            song_type = MP3(take_selected_song)
            self.song_length = time.strftime("%H:%M:%S", time.gmtime(song_type.info.length))
            
            # Song Duration Label Position Set and Song Duration Function call
            self.song_duration_bar.place(x=210,y=285)
            self.song_duration_time()
        except:
            print("\nError in play song")
            self.next_song()

    def song_duration_time(self):# Song duration time controller
        try:
            raw_time = pygame.mixer.music.get_pos()/1000
            converted_time = time.strftime("%H:%M:%S",time.gmtime(raw_time))
            if self.song_length == converted_time  and self.repeat_counter == 1:
                self.next_song()
            elif self.song_length == converted_time and self.repeat_counter == -1:
                self.play_song()
            else: 
                self.song_duration_bar.config(text="Time is: "+str(converted_time)+" of "+str(self.song_length))
                self.song_duration_bar.after(1000,self.song_duration_time)# Recursive function call after 1 sec = 1000ms
        except:
            print("Error in song duration")        
            self.next_song()

    def pause_song(self,e=None):
        pygame.mixer.music.pause()
        self.pause_btn.config(command=self.play_after_pause)
        self.window.bind('<space>', self.play_after_pause)

    def play_after_pause(self,e=None):# Play the song after pause
        pygame.mixer.music.unpause()
        self.pause_btn.config(command=self.pause_song)
        self.window.bind('<space>', self.pause_song)

    def stop_song(self,e=None):# Stop playing song
        pygame.mixer.music.stop()
        self.song_duration_bar.destroy()
        self.song_duration()

    def next_song(self,e=None):# Next song control
        try:
            current_song = self.my_list_song.curselection()
            self.my_list_song.selection_clear(ACTIVE)
            current_song = current_song[0]+1

            if current_song < self.my_list_song.size():
                self.my_list_song.selection_set(current_song)
                self.my_list_song.activate(current_song)
                self.play_song()

            elif self.shuffle_counter == 0:
                self.stop_song()

            else:
                self.my_list_song.selection_set(0)
                self.my_list_song.activate(0)
                self.play_song()
        except:
            print("Error in next song")
            pass

    def previous_song(self,e=None):# Previous song control
        try:
            song = self.my_list_song.curselection()
            self.my_list_song.selection_clear(ACTIVE)
            song = song[0]-1

            if song>-1:
               self.my_list_song.activate(song)
               self.my_list_song.selection_set(song)
               self.play_song()

            elif self.shuffle_counter ==0:
                   self.stop_song()

            else:
                 self.my_list_song.selection_set(0)
                 self.my_list_song.activate(0)
                 self.play_song()
        except:
            print("\nError in previous song")
            pass

    def muter(self):# Mute set-up
        self.mute_scale = Scale(self.window,from_=1,to=0,orient=HORIZONTAL,bg="#9f9fff",command=self.get_mute, activebackground="red",font=("Arial",15,"bold"),length=47,relief=RIDGE,bd=3)
        self.mute_scale.place(x=25,y=430)

        self.mute_scale.set(self.mute_status)

        mute_indicator = Label(self.window,text="Mute",font=("Arial",10,"bold"),fg="blue",bg="#9f9fff")
        mute_indicator.place(x=35,y=435)

    def get_mute(self,indicator):# Mute functionality
        pygame.mixer.music.set_volume(int(indicator))
        if int(indicator)==1:
            self.mute_change.set(0)
        else:
            self.mute_change.set(1)

    def repeat_controller(self):# Repeat Set-up
        self.loop_bar = Scale(self.window,from_=1,to=0,orient=HORIZONTAL,bg="#9f9fff",command=self.repeat_maintain, activebackground="red",font=("Arial",15,"bold"),length=140,relief=RIDGE,bd=3)
        self.loop_bar.place(x=115,y=430)

        self.loop_bar.set(self.repeat_status)

        loop_bar_indicator = Label(self.window,text="Off    Repeat    On",font=("Arial",10,"bold"),fg="blue",bg="#9f9fff")
        loop_bar_indicator.place(x=130,y=435)

    def repeat_maintain(self, indicator):# Repeat functionality
        if int(indicator) == 1:
            self.repeat_counter = 1
            self.repeat_change.set(0)
        else:
            self.repeat_counter = -1
            self.repeat_change.set(1)

        self.window.update()

    def shuffle_controller(self):# Shuffle set-up
        self.shuffle_bar = Scale(self.window,from_=1,to=0,orient=HORIZONTAL,bg="#9f9fff",command=self.shuffle_maintain, activebackground="red",font=("Arial",15,"bold"),length=140,relief=RIDGE,bd=3)
        self.shuffle_bar.place(x=305,y=430)

        self.shuffle_bar.set(self.shuffle_status)

        shuffle_bar_indicator = Label(self.window,text="  Off    Shuffle    On",font=("Arial",10,"bold"),fg="blue",bg="#9f9fff")
        shuffle_bar_indicator.place(x=310,y=435)

    def shuffle_maintain(self, indicator):# Shuffle functionality
        if int(indicator) ==1:
            self.shuffle_counter = 0
            self.shuffle_change.set(0)
        else:
            self.shuffle_counter = 1
            self.shuffle_change.set(1)    

    def clear(self, e=None):# Clear the song list
        try:
            self.stop_song()
            self.my_list_song.delete(0, END)
        except:
            messagebox.showerror("Nothing Present", "Song list is empty")
            
if __name__ == '__main__':
    window = Tk()
    window.title("Generation Music player")
    window.iconbitmap("Pictures/music_icon.ico")
    window.geometry("828x515")
    window.maxsize(830,515)
    window.minsize(830,515)
    window.config(bg="#141414")

    backward_image_take = ImageTk.PhotoImage(Image.open('Pictures/backward.png'))
    backward_btn_img = Button(window, image=backward_image_take, bg="#323232", activebackground="#323232", relief=RAISED, bd=3)
    backward_btn_img.place(x=25,y=350)

    play_image_take = ImageTk.PhotoImage(Image.open('Pictures/play.png').resize((40,40),Image.ANTIALIAS))
    play_btn_img = Button(window,image=play_image_take,bg="#323232", activebackground="#323232", relief=RAISED,bd=3)
    play_btn_img.place(x=115,y=350)

    pause_image_take = ImageTk.PhotoImage(Image.open('Pictures/pause.png'))
    pause_btn_img = Button(window,image=pause_image_take,bg="#323232", activebackground="#323232",relief=RAISED,bd=3)
    pause_btn_img.place(x=210,y=350)

    stop_image_take = ImageTk.PhotoImage(Image.open('Pictures/stop_img_is.png').resize((40,40),Image.ANTIALIAS))
    stop_btn_img = Button(window,image=stop_image_take,bg="#323232", activebackground="#323232", relief=RAISED,bd=3)
    stop_btn_img.place(x=305,y=350)

    forward_image_take = ImageTk.PhotoImage(Image.open('Pictures/forward.png'))
    forward_btn_img = Button(window,image=forward_image_take,bg="#323232", activebackground="#323232", relief=RAISED,bd=3)
    forward_btn_img.place(x=400,y=350)

    MusicPlayer(window,backward_btn_img,play_btn_img,pause_btn_img,stop_btn_img,forward_btn_img)

    window.mainloop()