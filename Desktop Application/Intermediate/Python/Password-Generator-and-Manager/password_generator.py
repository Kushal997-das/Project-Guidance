# Password Generator
from tkinter import *

import secrets

import pyperclip

from win10toast import ToastNotifier

import mysql.connector

notifier = ToastNotifier()

# DB

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root"
)

dbcursor = mydb.cursor()

# Create a DB if not exists
dbcursor.execute('CREATE DATABASE IF NOT EXISTS password_manager')
# set the database after creation
mydb.database = 'password_manager'
# Create a table if not exists
dbcursor.execute(
    'CREATE TABLE IF NOT EXISTS accounts (email varchar(80), password varchar(80), username varchar(80), url varchar(80) PRIMARY KEY)')

UPPER_CASE_ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

LOWER_CASE_ALPHABETS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

SPECIAL_CHARACTERS = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*',
                      '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', '\\', ':', ';', '<', ',', '>', '.', '?', '/']

NUMERICAL_CHARACTERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

select_uppercase = ''
select_special_char = ''
select_numerical_char = ''

var_uppercase = 0
var_special = 0
var_numerical = 0

resultant_password = ''

your_password = ''

root = ''

email_text = ''
username_text = ''
url_text = ''
password_text = ''

txtEmail = ''
txtPassword = ''
txtUsername = ''
txtURL = ''


def mainWindow():
    global select_uppercase, select_special_char, select_numerical_char, var_numerical, var_special, var_uppercase, resultant_password, root
    root = Tk()
    root.config(bg="white")
    root.title("PASSWORD GENERATION AND MANAGEMENT SYSTEM")
    root.geometry("700x450+0+0")
    root.resizable(False, False)
    Tops = Frame(root, width=700, height=50, bd=16, relief="raise")
    Tops.pack(side=TOP)
    mainTitle = Label(Tops, text='Password Generator', borderwidth=1, relief="groove",
                      fg="steel blue", font=('arial', 15, 'bold'), bd=10, anchor='w')
    mainTitle.grid(row=0, column=0)
    LF = Frame(root, width=400, height=450, bd=16, relief="raise")
    LF.pack(side=LEFT)
    RF = Frame(root, width=300, height=450, bd=16, relief="raise")
    RF.pack(side=RIGHT)
    preferences = Label(LF, text='Select your preferences',
                        fg="steel blue", font=('arial', 12, 'bold'))
    preferences.grid(row=0, column=0, padx=10, pady=10)
    var_uppercase = IntVar()
    var_special = IntVar()
    var_numerical = IntVar()
    select_uppercase = Checkbutton(LF, text="Include Uppercase Alphabets", variable=var_uppercase,
                                   onvalue=1, offvalue=0).grid(row=1, column=0, padx=10, pady=10)
    select_special_char = Checkbutton(LF, text="Include Special Characters", variable=var_special,
                                      onvalue=1, offvalue=0).grid(row=2, column=0, padx=10, pady=10)
    select_numerical_char = Checkbutton(LF, text="Include Numerical Characters",
                                        variable=var_numerical, onvalue=1, offvalue=0).grid(row=3, column=0, padx=10, pady=10)
    resultant_password_txt = Label(
        LF, text='Resultant Password:', fg="steel blue", font=('arial', 11, 'bold'))
    resultant_password_txt.grid(row=4, column=0, padx=10, pady=10)
    resultant_password = Label(
        LF, text='gsgdhg2hh3h&@345', fg="steel blue", font=('arial', 11, 'bold'), width=16)
    resultant_password.grid(row=4, column=1, padx=10, pady=10)

    generate_btn = Button(RF, text="GENERATE RANDOM PASSWORD", command=generatePassword,
                          pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    generate_btn.grid(row=0, column=0, padx=5, pady=5)
    copy_btn = Button(RF, text="COPY TO CLIPBOARD", command=lambda: copyToClipboard("Password Generator Notifier", "Password Copied to Clipboard Successfully!",
                                                                                    resultant_password.cget('text')),
                      pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    copy_btn.grid(row=1, column=0, padx=5, pady=5)
    reset_btn = Button(RF, text="RESET", command=resetPreferences, pady=6,
                       bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    reset_btn.grid(row=2, column=0, padx=5, pady=5)
    password_manager = Button(RF, text="PASSWORD MANAGER", command=lambda: passwordManager(root),
                              pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    password_manager.grid(row=3, column=0, padx=5, pady=5)

    root.mainloop()


def generatePassword():
    if var_uppercase.get() == 1 and var_special.get() == 1 and var_numerical.get() == 1:
        resPassword = ''
        while True:
            get_random_lowercase = secrets.choice(LOWER_CASE_ALPHABETS)
            get_random_uppercase = secrets.choice(UPPER_CASE_ALPHABETS)
            get_random_special = secrets.choice(SPECIAL_CHARACTERS)
            get_random_numerical = secrets.choice(NUMERICAL_CHARACTERS)

            resPassword += get_random_lowercase + get_random_uppercase + \
                get_random_special + get_random_numerical
            if len(resPassword) >= 8:
                break
        resultant_password.config(text=resPassword)
    elif var_uppercase.get() == 0 and var_special.get() == 0 and var_numerical.get() == 0:
        weak_password_warning = ToastNotifier()
        weak_password_warning.show_toast("Password Generator Notifier", "Password is Insecure! Generate a stronger one by choose one or more from the checkboxes.",
                                         duration=10, threaded=True, icon_path='password.ico')
    elif var_uppercase.get() == 0 and var_special.get() == 0 and var_numerical.get() == 1:
        resPassword = ''
        while True:
            get_random_lowercase = secrets.choice(LOWER_CASE_ALPHABETS)
            get_random_numerical = secrets.choice(NUMERICAL_CHARACTERS)

            resPassword += get_random_lowercase + get_random_numerical
            if len(resPassword) >= 8:
                break
        resultant_password.config(text=resPassword)
    elif var_uppercase.get() == 0 and var_special.get() == 1 and var_numerical.get() == 0:
        resPassword = ''
        while True:
            get_random_lowercase = secrets.choice(LOWER_CASE_ALPHABETS)
            get_random_special = secrets.choice(SPECIAL_CHARACTERS)

            resPassword += get_random_lowercase + get_random_special
            if len(resPassword) >= 8:
                break
        resultant_password.config(text=resPassword)
    elif var_uppercase.get() == 0 and var_special.get() == 1 and var_numerical.get() == 1:
        resPassword = ''
        while True:
            get_random_lowercase = secrets.choice(LOWER_CASE_ALPHABETS)
            get_random_numerical = secrets.choice(NUMERICAL_CHARACTERS)
            get_random_special = secrets.choice(SPECIAL_CHARACTERS)

            resPassword += get_random_lowercase + get_random_special + get_random_numerical
            if len(resPassword) >= 8:
                break
        resultant_password.config(text=resPassword)
    elif var_uppercase.get() == 1 and var_special.get() == 0 and var_numerical.get() == 0:
        resPassword = ''
        while True:
            get_random_lowercase = secrets.choice(LOWER_CASE_ALPHABETS)
            get_random_uppercase = secrets.choice(UPPER_CASE_ALPHABETS)

            resPassword += get_random_lowercase + get_random_uppercase
            if len(resPassword) >= 8:
                break
        resultant_password.config(text=resPassword)
    elif var_uppercase.get() == 1 and var_special.get() == 0 and var_numerical.get() == 1:
        resPassword = ''
        while True:
            get_random_lowercase = secrets.choice(LOWER_CASE_ALPHABETS)
            get_random_uppercase = secrets.choice(UPPER_CASE_ALPHABETS)
            get_random_numerical = secrets.choice(NUMERICAL_CHARACTERS)

            resPassword += get_random_lowercase + get_random_uppercase + get_random_numerical
            if len(resPassword) >= 8:
                break
        resultant_password.config(text=resPassword)
    elif var_uppercase.get() == 1 and var_special.get() == 1 and var_numerical.get() == 0:
        resPassword = ''
        while True:
            get_random_lowercase = secrets.choice(LOWER_CASE_ALPHABETS)
            get_random_uppercase = secrets.choice(UPPER_CASE_ALPHABETS)
            get_random_special = secrets.choice(SPECIAL_CHARACTERS)

            resPassword += get_random_lowercase + get_random_uppercase + get_random_special
            if len(resPassword) >= 8:
                break
        resultant_password.config(text=resPassword)


def copyToClipboard(title, content, textToCopy):
    textCopiedNotifier = ToastNotifier()
    pyperclip.copy(textToCopy)
    textCopiedNotifier.show_toast(title, content,
                                  duration=10, threaded=True, icon_path='password.ico')


def resetPreferences():
    var_uppercase.set(0)
    var_special.set(0)
    var_numerical.set(0)
    resultant_password.config(text='gsgdhg2hh3h&@345')


def passwordManager(rt):
    global email_text, username_text, url_text, password_text, txtEmail, txtPassword, txtUsername, txtURL
    rt.withdraw()
    pwd_manager = Toplevel(rt)
    pwd_manager.config(bg="white")
    pwd_manager.title("PASSWORD MANAGER")
    pwd_manager.geometry("700x450+0+0")
    pwd_manager.resizable(False, False)
    email_text = StringVar()
    username_text = StringVar()
    url_text = StringVar()
    password_text = StringVar()
    Tops = Frame(pwd_manager, width=700, height=50, bd=16, relief="raise")
    Tops.pack(side=TOP)
    mainTitle = Label(Tops, text='Password Manager', borderwidth=1, relief="groove",
                      fg="steel blue", font=('arial', 15, 'bold'), bd=10, anchor='w')
    mainTitle.grid(row=0, column=0)
    LF = Frame(pwd_manager, width=400, height=450, bd=16, relief="raise")
    LF.pack(side=LEFT)
    RF = Frame(pwd_manager, width=300, height=450, bd=16, relief="raise")
    RF.pack(side=RIGHT)
    details = Label(LF, text='Enter the details',
                    fg="steel blue", font=('arial', 12, 'bold'))
    details.grid(row=0, column=0, padx=10, pady=10)
    email = Label(
        LF, text='Email', fg="steel blue", font=('arial', 11, 'bold'))
    email.grid(row=1, column=0)
    txtEmail = Entry(LF, font=('arial', 11, 'bold'), bd=20, width=26,
                     bg="powder blue", justify='left', textvariable=email_text)
    txtEmail.grid(row=1, column=1)
    password = Label(
        LF, text='Password', fg="steel blue", font=('arial', 11, 'bold'))
    password.grid(row=2, column=0)
    txtPassword = Entry(LF, font=('arial', 11, 'bold'), bd=20, width=26,
                        bg="powder blue", justify='left', textvariable=password_text, show='*')
    txtPassword.grid(row=2, column=1)
    username = Label(
        LF, text='Username', fg="steel blue", font=('arial', 11, 'bold'))
    username.grid(row=3, column=0)
    txtUsername = Entry(LF, font=('arial', 11, 'bold'), bd=20, width=26,
                        bg="powder blue", justify='left', textvariable=username_text)
    txtUsername.grid(row=3, column=1)
    url = Label(
        LF, text='URL / App Name', fg="steel blue", font=('arial', 11, 'bold'))
    url.grid(row=4, column=0)
    txtURL = Entry(LF, font=('arial', 11, 'bold'), bd=20, width=26,
                   bg="powder blue", justify='left', textvariable=url_text)
    txtURL.grid(row=4, column=1)
    save_btn = Button(RF, text="SAVE", command=saveData,
                      pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    save_btn.grid(row=0, column=0, padx=5, pady=5)
    reset_btn = Button(RF, text="RESET", command=resetDataFields,
                       pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    reset_btn.grid(row=1, column=0, padx=5, pady=5)
    get_password = Button(RF, text="GET PASSWORD", command=lambda: getPassword(pwd_manager),
                          pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    get_password.grid(row=2, column=0, padx=5, pady=5)
    show_passwords = Button(RF, text="SHOW ALL PASSWORDS", command=lambda: showAllPasswords(pwd_manager),
                            pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    show_passwords.grid(row=3, column=0, padx=5, pady=5)
    back_btn = Button(RF, text="BACK", command=lambda: reinstate(rt, pwd_manager),
                      pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    back_btn.grid(row=4, column=0, padx=5, pady=5)

    pwd_manager.mainloop()


def saveData():
    # save data to SQL Database
    data_to_insert = 'INSERT INTO accounts (email, password, username, url) VALUES (%s, %s, %s, %s)'
    values = (txtEmail.get(), txtPassword.get(),
              txtUsername.get(), txtURL.get())
    try:
        dbcursor.execute(data_to_insert, values)
        mydb.commit()
        dataInsertedNotifier = ToastNotifier()
        dataInsertedNotifier.show_toast("Password Manager Notifier", "Data Saved Successfully!",
                                        duration=10, threaded=True, icon_path='password.ico')
        resetDataFields()
    except MySQLdb.IntegrityError:
        dataInsertedNotifier = ToastNotifier()
        dataInsertedNotifier.show_toast("Password Manager Notifier", "Data Save was Unsuccessful!",
                                        duration=10, threaded=True, icon_path='password.ico')


def resetDataFields():
    email_text.set("")
    password_text.set("")
    username_text.set("")
    url_text.set("")


def getPassword(rt):
    # retrieve a particular password according to the query
    global email_text, username_text, url_text, password_text, txtEmail, txtPassword, txtUsername, txtURL, your_password
    rt.withdraw()
    retrieve_pwd = Toplevel(rt)
    retrieve_pwd.config(bg="white")
    retrieve_pwd.title("RETRIEVE PASSWORD")
    retrieve_pwd.geometry("750x450+0+0")
    retrieve_pwd.resizable(False, False)
    url_text = StringVar()
    Tops = Frame(retrieve_pwd, width=750, height=50, bd=16, relief="raise")
    Tops.pack(side=TOP)
    mainTitle = Label(Tops, text='Retrieve Password', borderwidth=1, relief="groove",
                      fg="steel blue", font=('arial', 15, 'bold'), bd=10, anchor='w')
    mainTitle.grid(row=0, column=0)
    LF = Frame(retrieve_pwd, width=400, height=450, bd=16, relief="raise")
    LF.pack(side=LEFT)
    RF = Frame(retrieve_pwd, width=350, height=450, bd=16, relief="raise")
    RF.pack(side=RIGHT)
    details = Label(LF, text='Enter the URL / App name',
                    fg="steel blue", font=('arial', 11, 'bold'))
    details.grid(row=0, column=0, padx=5, pady=5)
    url = Label(
        LF, text='URL / App Name', fg="steel blue", font=('arial', 11, 'bold'))
    url.grid(row=1, column=0)
    txtURL = Entry(LF, font=('arial', 11, 'bold'), bd=20, width=26,
                   bg="powder blue", justify='left', textvariable=url_text)
    txtURL.grid(row=1, column=1)
    get_password = Button(RF, text="GET", command=retrievePasswordFromDB,
                          pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    get_password.grid(row=0, column=0, padx=5, pady=5)
    reset_btn = Button(RF, text="RESET", command=resetURLField,
                       pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    reset_btn.grid(row=1, column=0, padx=5, pady=5)
    back_btn = Button(RF, text="BACK", command=lambda: reinstate(rt, retrieve_pwd),
                      pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=26)
    back_btn.grid(row=2, column=0, padx=5, pady=5)
    your_password_txt = Label(
        LF, text='Your Password:', fg="steel blue", font=('arial', 11, 'bold'))
    your_password_txt.grid(row=4, column=0, padx=10, pady=10)
    your_password = Label(
        LF, text='', fg="steel blue", font=('arial', 11, 'bold'), width=16)
    your_password.grid(row=4, column=1, padx=10, pady=10)

    retrieve_pwd.mainloop()


def retrievePasswordFromDB():
    dbcursor.execute(
        'SELECT password FROM accounts WHERE url = %s', (txtURL.get(),))
    result = dbcursor.fetchone()
    if result != None:
        your_password.config(text=result)
        copyToClipboard("Password Manager Notifier",
                        "Password Copied to Clipboard Successfully!", your_password.cget('text'))
    else:
        notifier.show_toast("Password Manager Notifier", "Record Not Found!",
                            duration=10, threaded=True, icon_path='password.ico')


def resetURLField():
    url_text.set("")


def showAllPasswords(rt):
    # retrieve all the passwords stored in DB and display
    rt.withdraw()
    show_pwds = Toplevel(rt)
    show_pwds.config(bg="white")
    show_pwds.title("SHOW ALL PASSWORDS")
    show_pwds.geometry("1000x500+0+0")
    show_pwds.resizable(False, False)
    url_text = StringVar()
    Tops = Frame(show_pwds, width=1000, height=50, bd=16, relief="raise")
    Tops.pack(side=TOP)
    mainTitle = Label(Tops, text='ALL PASSWORDS', borderwidth=1, relief="groove",
                      fg="steel blue", font=('arial', 15, 'bold'), bd=10, anchor='w')
    mainTitle.grid(row=0, column=0)
    CF = Frame(show_pwds, width=1000, height=500, bd=16, relief="raise")
    CF.pack(side=TOP)
    email = Label(CF, text="Email", bg="steel blue",
                  borderwidth=2, relief="raised", width=14)
    email.grid(row=0, column=0, padx=10, pady=10)
    password = Label(CF, text="Password",
                     bg="steel blue", borderwidth=2, relief="raised", width=14)
    password.grid(row=0, column=1, padx=10, pady=10)
    username = Label(CF, text="Username",
                     bg="steel blue", borderwidth=2, relief="raised", width=14)
    username.grid(row=0, column=2, padx=10, pady=10)
    url = Label(CF, text="URL / App name",
                bg="steel blue", borderwidth=2, relief="raised", width=14)
    url.grid(row=0, column=3, padx=10, pady=10)

    all_pwds = retrieveAllPasswords()
    for index, pwd in enumerate(all_pwds):
        Label(CF, text=pwd[0],borderwidth=1, width=24).grid(row=index+1, column=0)
        Label(CF, text=pwd[1],borderwidth=1, width=24).grid(row=index+1, column=1)
        Label(CF, text=pwd[2],borderwidth=1, width=24).grid(row=index+1, column=2)
        Label(CF, text=pwd[3],borderwidth=1, width=24).grid(row=index+1, column=3)
    
    back_btn = Button(CF, text="BACK", command=lambda: reinstate(rt, show_pwds),
                      pady=6, bd=8, fg="steel blue", font=('arial', 10, 'bold'), width=20)
    back_btn.grid(row=2, column=5, padx=10, pady=10)

    show_pwds.mainloop()


def retrieveAllPasswords():
    dbcursor.execute('SELECT * FROM accounts')
    return dbcursor.fetchall()

def reinstate(rt, pwd_manager):
    rt.deiconify()
    pwd_manager.destroy()



if __name__ == "__main__":
    mainWindow()
