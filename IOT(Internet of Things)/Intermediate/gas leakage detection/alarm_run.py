#created by Advaita Saha on 5/3/2020 7:49PM IST

import pyfirmata
import time
import tkinter
from tkinter import messagebox

board = pyfirmata.Arduino('/dev/ttyACM0')

it = pyfirmata.util.Iterator(board)
it.start()

root = tkinter.Tk()
root.withdraw()

gas_input = board.get_pin('a:0:i')

while True:
    gas_val = gas_input.read()
    time.sleep(0.2)
    try:
        if gas_val > 0.3:
            board.digital[11].write(1)
            messagebox.showinfo("**WARNING**", "LPG Leakage")
            root.update()
        else:
            continue
    except:
        continue
    board.digital[11].write(0)
