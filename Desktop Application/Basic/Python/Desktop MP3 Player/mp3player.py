import mutagen
from mutagen.easyid3 import EasyID3
import pygame
from tkinter.filedialog import *
from tkinter import *

pygame.init()

class FrameApp(Frame):
    def __init__(self,master):
        super(FrameApp, self).__init__(master)

        self.grid()
        self.paused = False
        self.playlist = list()
        self.actual_song = 0

        self.b1 = Button(self, text="Play now", command=self.play_music,bg='Pink', width=40)
        self.b1.grid(row=2, column=0)

        self.b2 = Button(self, text="Go to Previous", command=self.prev_song,bg='Green',
                         width=40)
        self.b2.grid(row=4, column=0)

        self.b3 = Button(self, text="Pause/Unpause", command=self.toggle,bg='White', width=40)
        self.b3.grid(row=3, column=0)

        self.b4 = Button(self, text="Go to Next", command=self.next_song,bg='AntiqueWhite1', width=40)
        self.b4.grid(row=5, column=0)

        self.b5 = Button(self, text="Add to Playlist", command=self.add_to_playlist,bg='Beige',
                         width=40)
        self.b5.grid(row=1, column=0)

        self.label1 = Label(self, fg='Black', font=('Helvetica 12 bold italic',10), bg='ivory2')
        self.label1.grid(row=6, column=0)

        self.output = Text(self, wrap=WORD, width=200)
        self.output.grid(row=15, column=0)

        # set event to not predefined value in pygame
        self.SONG_END = pygame.USEREVENT + 1

        # TODO: Make progressbar, delete songs from playlist, amplify volume

    def add_to_playlist(self):
        
        directory = askopenfilenames()
        # appends song directory on disk to playlist in memory
        for song_dir in directory:
            print(song_dir)
            self.playlist.append(song_dir)
        self.output.delete(0.0, END)

        for key, item in enumerate(self.playlist):
            # appends song to textbox
            song = EasyID3(item)
            song_data = (str(key + 1) + ' : ' + song['title'][0] + ' - '
                         + song['artist'][0])
            self.output.insert(END, song_data + '\n')

    def song_data(self):
        
        song = EasyID3(self.playlist[self.actual_song])
        song_data = "Currently Playing: Nr:" + str(self.actual_song + 1) + " " + \
                    str(song['title']) + " - " + str(song['artist'])
        return song_data

    def play_music(self):
        
        directory = self.playlist[self.actual_song]
        pygame.mixer.music.load(directory)
        pygame.mixer.music.play(1, 0.0)
        pygame.mixer.music.set_endevent(self.SONG_END)
        self.paused = False
        self.label1['text'] = self.song_data()

    def check_music(self):
        
        for event in pygame.event.get():
            if event.type == self.SONG_END:
                self.next_song()

    def toggle(self):
        
        if self.paused:
            pygame.mixer.music.unpause()
            self.paused = False
        elif not self.paused:
            pygame.mixer.music.pause()
            self.paused = True

    def get_next_song(self):
        
        if self.actual_song + 2 <= len(self.playlist):
            return self.actual_song + 1
        else:
            return 0

    def next_song(self):
        
        self.actual_song = self.get_next_song()
        self.play_music()

    def get_previous_song(self):
        
        if self.actual_song - 1 >= 0:
            return self.actual_song - 1
        else:
            return len(self.playlist) - 1

    def prev_song(self):
        
        self.actual_song = self.get_previous_song()
        self.play_music()


window = Tk()
window.geometry("1000x1000")
window.title("mp3 music player")



app = FrameApp(window)
while True:
    # runs mainloop of program
    app.check_music()
    app.update()
