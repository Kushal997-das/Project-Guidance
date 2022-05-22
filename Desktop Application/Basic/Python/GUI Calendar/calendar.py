# import all methods and classes from tkinter module
from tkinter import *
 
# import calendar module
import calendar
 
# function to display the calendar of the selected year
def showCal() :
 
    # creation of a GUI window
    new_gui = Tk()
     
    # setting of the background colour of GUI window
    new_gui.config(background = "white")
 
    # setting the name of tkinter GUI window
    new_gui.title("CALENDAR")
 
    # setting the configuration or dimension of GUI window
    new_gui.geometry("550x600")
 
    # getting the method to return the current text as string
    # converting the fetched year string to integer type
    fetch_year = int(year_field.get())
 
    # get the calendar method of calendar module to returnthe calendar of the given year
    cal_content = calendar.calendar(fetch_year)
 
    # creating a label to display the content of the calendar
    cal_year = Label(new_gui, text = cal_content, font = "Consolas 10 bold")
 
    # grid method is used for placing the widgets at respective positions in a tabulated structure
    cal_year.grid(row = 5, column = 1, padx = 20)
     
    # start the GUI
    new_gui.mainloop()
 
     
# driver code to display the selection window
if __name__ == "__main__" :
 
    # creating a GUI window
    guiwin = Tk()
     
    # setting the background colour of GUI window
    guiwin.config(background = "white")
 
    # setting the name of tkinter GUI window
    guiwin.title("CALENDAR")
 
    # setting the configuration of GUI window
    guiwin.geometry("250x140")
 
    # creating a CALENDAR : label with specified font and size
    cal = Label(guiwin, text = "CALENDAR", bg = "dark gray",
                            font = ("times", 28, 'bold'))
 
    # creating an Enter Year : label
    year = Label(guiwin, text = "Enter Year", bg = "light green")
     
    # creating a text entry box for filling or typing the information. 
    year_field = Entry(guiwin)
 
    # creating a Show Calendar Button and attaching it to showCal function
    Show = Button(guiwin, text = "Show Calendar", fg = "Black",
                              bg = "Red", command = showCal)
 
    # creating an Exit Button and attaching it to exit function
    Exit = Button(guiwin, text = "Exit", fg = "Black", bg = "Red", command = exit)
     
    # grid method is used for placing the widgets at respective positions in tabulated structure.
    cal.grid(row = 1, column = 8)
 
    year.grid(row = 2, column = 1)
 
    year_field.grid(row = 3, column = 1)
 
    Show.grid(row = 4, column = 1)
 
    Exit.grid(row = 6, column = 1)
     
    # start the GUI
    guiwin.mainloop()
