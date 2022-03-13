# importing all the required libraries
import pyfirmata
import time
import tkinter
from tkinter import messagebox

# adding the location of the microcontroller board - Arduino
board = pyfirmata.Arduino('/dev/ttyACM0') 

# the board is initialized, and connection request sent
it = pyfirmata.util.Iterator(board)
it.start()

#the tkinter library is initialized
root = tkinter.Tk()
root.withdraw()

#input pin activated in the in Arduino microcontroller board
gas_input = board.get_pin('a:0:i')

#while loop to constaly check the gas leakage
while True:
    gas_val = gas_input.read()      #read the analog value in the analog input 
    time.sleep(0.2)
    try:
        if gas_val > 0.3:           #checking is the value is higher than normal
            board.digital[11].write(1)
            messagebox.showinfo("**WARNING**", "LPG Leakage") # showing the emergengy system-pop, after the gas leakage is detected
            root.update()
        else:
            continue
    except:
        continue
    board.digital[11].write(0)      #showing an indicator LED in the board signalling the emergency
