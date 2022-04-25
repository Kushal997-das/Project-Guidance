import colorama
from colorama import Fore,Back
import mysql.connector as sql
import time
import sys
from os import system
import random
import threading 
import itertools 
'''For Connecting to your DATABASE Change below credentials and run SQL QUERIES which are at end of this code '''
while(1):
    try:
        LH=str(input("Enter the Host Name : "))
        UN=str(input("Enter the User Name : "))
        Pa=str(input("Enter the password  : "))
        port=str(input("Enter port Number(Default-3306) : "))
        con=sql.connect(host=LH,user=UN,password=Pa,port=port)
        C=con.cursor()
        C.execute("show databases")
        A=C.fetchall()
        A=list(A)
        D=0
        for item in A:
            if(item[0]=="apdbms"):
                C.execute("use apdbms")
                print("Database Selected")
                time.sleep(2)
                D=1
                break
        if(D==0):
            print("You dont have the required database in your connection")
            try:
                C.execute("create database apdbms;")
                C.execute("use apdbms")
                C.execute("create table apdbms_Cust(Name varchar(20),ACCOUNT_NO int, PRIMARY KEY(ACCOUNT_NO));")
                C.execute("create table apdbms_Bal(ACCOUNT_NO int , Balance int , foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);")
                C.execute("create table apdbms_Acc(ACCOUNT_NO int ,PIN varchar(10), foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);")
                C.execute("create table apdbms_wid(Date timestamp default current_timestamp ,ACCOUNT_NO int ,Amount int, foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);")
                C.execute("create table apdbms_dep(Date timestamp default current_timestamp ,ACCOUNT_NO int ,Amount int, foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);")
                C.execute("create table apdbms_tra(Date timestamp default current_timestamp ,ACCOUNT_NO int ,To_ACCOUNT int ,Amount int, foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);")
                C.execute("create table apdbms_blo(ACCOUNT_NO int, foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);")
                con.commit()
                print("You are now connected to database ... you can start executing ")
                time.sleep(2)
                break
            except Exception as a:
                print("Some thing went Wrong ")
                print("And the Error is : ",a)
                break
        break
    except Exception as a:
        print("Someting Went again")
        print("And the Error is : ",a)

colorama.init(autoreset=True)
def clear():
    _ = system('cls')
    #For Logo
    print(Fore.GREEN + '''
db   db  .d8b.   .o88b. db   dD d88888b d8888b. Cb .d8888.    .d8b.  d888888b .88b  d88. 
88   88 d8' `8b d8P  Y8 88 ,8P' 88'     88  `8D `D 88'  YP   d8' `8b `~~88~~' 88'YbdP`88 
88ooo88 88ooo88 8P      88,8P   88ooooo 88oobY'  ' `8bo.     88ooo88    88    88  88  88 
88~~~88 88~~~88 8b      88`8b   88~~~~~ 88`8b        `Y8b.   88~~~88    88    88  88  88 
88   88 88   88 Y8b  d8 88 `88. 88.     88 `88.    db   8D   88   88    88    88  88  88 
YP   YP YP   YP  `Y88P' YP   YD Y88888P 88   YD    `8888Y'   YP   YP    YP    YP  YP  YP 
 ''')
    print(Fore.RED + "Only a true hacker can login ... !")
    print(Fore.YELLOW + "Hacker Never Quits...!")
    print(
        Fore.GREEN +
        "<<<<====================================>>>Never Give Up<<<====================================>>>>"
    )
H=0
def animate():
    for c in itertools.cycle(['|', '/', '-', '\\']):
        if H:
            break
        sys.stdout.write('\rH4CK!N9... ' + c)
        sys.stdout.flush()
        time.sleep(0.1)
    sys.stdout.write('\rHere You Go ....!')
while(1):
    clear()
    print(''' 1. LOGIN       2.SIGNUP      3.Exit''')
    fc=int(input("Enter Your Choice :"))
    c=0
    if(fc==1):
        ACC = int(input(Fore.GREEN + "Please Enter secret Account Number :"))       #Taking Account Number from user
        ch="select * from apdbms_Cust where ACCOUNT_NO={}".format(ACC)
        C.execute(ch)
        C.fetchall()
        ans=C.rowcount
        ch2="select * from apdbms_acc where ACCOUNT_NO={}".format(ACC)
        C.execute(ch2)
        C.fetchall()
        ansc=C.rowcount
        ch3="select * from apdbms_Blo where ACCOUNT_NO={}".format(ACC)
        C.execute(ch3)
        C.fetchall()
        ansc2=C.rowcount
        animation = ["[■□□□□□□□□□]","[■■□□□□□□□□]", "[■■■□□□□□□□]", "[■■■■□□□□□□]", "[■■■■■□□□□□]", "[■■■■■■□□□□]", "[■■■■■■■□□□]", "[■■■■■■■■□□]", "[■■■■■■■■■□]", "[■■■■■■■■■■]"]
        for i in range(10):
            time.sleep(0.5)
            sys.stdout.write(Fore.GREEN+"\rLogging in.... " + animation[i % len(animation)])
            sys.stdout.flush()
        if (ans==0):
            print(Back.YELLOW+Fore.RED+"Account Not Exist's.....!")
            Exit="3X7!N9.....!"
            for char in Exit:
                sys.stdout.write(char)
                sys.stdout.flush()
                time.sleep(0.1)
            time.sleep(0.5)
            break
        elif(ans ==1 and ansc== 0):
            print("You Almost Done ,.... Just create a pin below to go ahead")
            pin=str(input("Enter Your New PIN : "))
            C.execute("insert into apdbms_acc values({},'{}');".format(ACC,pin))
            con.commit()
            print("Please deposit some money to your account : ",end=" ")
            ubal=int(input())
            C.execute("insert into apdbms_bal values({},{})".format(ACC,ubal))  #Updating Balance in Database
            con.commit()
            print("Your are done you can login now")
            
        elif(ansc2==1):
            print("Your Account is Temporary Blocked Contact Admin for futhur Queries")
            time.sleep(3)
            clear()
        elif( ans ==1 and ansc==1  and ansc2!= 1):
            print(Back.GREEN+Fore.RED+"H4CK3R5 B4NK W31C0M35 Y0U......!")
            ch2="select PIN from apdbms_acc where ACCOUNT_NO={} ".format(ACC)
            C.execute(ch2)
            ans1=C.fetchone()                            #If Account Number exists we can login....
            for i in range(3):
                if(c==1):
                    break
                print("Please Enter you MASTER P!N :",end=" ")
                pas=str(input(Fore.RED))                   #Taking PIN from USER
                if(pas==ans1[0]):                          #Checking PIN is Correct or Not
                    while(1):
                        print(Fore.LIGHTYELLOW_EX+"U HACKED IT.....!")
                        print(Fore.GREEN+"You successfully logged in .. ! .. Here you go ... : >  ")
                        print(Fore.BLUE+'''1.Depositng money 
2.Withdrawing money
3.Transfering money
4.Checking balance
5.Changing PIN
6.View Statement
7.Log OUt
                ''')
                        print('Enter Your Choice:',end=" ")
                        choice_login=int(input())
                        if(choice_login==1):                                                                   #For Depositing Money
                            dep_money=float(input('Enter the amount u want to deposit:'))                      #Taking deposit Amount
                            C.execute("SELECT Balance from apdbms_bal where ACCOUNT_NO={}".format(ACC))
                            bal=C.fetchone()
                            bal=bal[0]
                            t = threading.Thread(target=animate)
                            t.start()
                            time.sleep(5)
                            H=1
                            time.sleep(1)
                            print("Old Balance : ",bal)
                            ubal=bal+dep_money                                                                  #Updating Balance
                            print("Updated Balance :",ubal)
                            C.execute("UPDATE apdbms_bal set Balance={} where ACCOUNT_NO={}".format(ubal,ACC))  #Updating Balance in Database
                            con.commit()
                            C.execute("insert into apdbms_dep values(current_timestamp,{},{});".format(ACC,dep_money))
                            con.commit()
                            print('Money Deposited Successfully to your Account')
                            time.sleep(3)
                            clear()
                        elif(choice_login==2):                                                                  #For Withdrawing Money
                            print("M0N3Y IS FOR EVERY ONE .. HERE Y0U C4N WITHDRAW YOUR 4M0UNT")
                            print('Enter Amount to Withdraw:',end=" ")                                                  #Taking Amount from user to 
                            amt_withdraw=float(input())
                            print("WE HOPE YOUR PRIVACY .... Please Enter Your PIN AGAIN : " , end=" ")         #Checking Intigrity by taking PIN again
                            pin=str(input())
                            ch3="select PIN from apdbms_acc where ACCOUNT_NO={} ".format(ACC)                       #Checking from Database
                            C.execute(ch3)
                            ans3=C.fetchone()
                            if(pin==ans3[0]):                #Taking deposit Amount
                                C.execute("SELECT Balance from apdbms_bal where ACCOUNT_NO={}".format(ACC))
                                bal=C.fetchone()
                                bal=bal[0]
                                print(bal)
                                if(bal>=amt_withdraw):
                                    ubal=bal-amt_withdraw                                                                  #Updating Balance
                                    print(ubal)
                                    C.execute("UPDATE apdbms_bal set Balance={} where ACCOUNT_NO={}".format(ubal,ACC))  #Updating Balance in Database
                                    con.commit()
                                    C.execute("insert into apdbms_wid values(current_timestamp,{},{});".format(ACC,amt_withdraw))
                                    con.commit()
                                    print('Money Withdrawal Successful')
                                    time.sleep(3)
                                    clear()
                                else:
                                    print("You Dont Have Sufficient Balance to with draw")
                                    clear()
                            else:
                                print("Your are not an 37H!C41 H4CK3R ..")
                                Exit="3X7!N9.....!"
                                for char in Exit:
                                    sys.stdout.write(char)
                                    sys.stdout.flush()
                                    time.sleep(0.1)
                                time.sleep(0.5)
                                clear()
                        elif(choice_login==3):                                      #For Transfering Money
                            print('Enter the Account Number you want to transfer',end=" ")
                            trans_acc=int(input())                                    #Taking Input from USER
                            ch4="select * from apdbms_acc where ACCOUNT_NO={}".format(trans_acc)
                            C.execute(ch4)
                            C.fetchall()
                            ans4=C.rowcount
                            if(ans4==1):              
                                print("Enter the Amount to transfer : ",end=" ")
                                trans_amount=float(input())
                                C.execute("SELECT Balance from apdbms_bal where ACCOUNT_NO={}".format(ACC))           
                                bal=C.fetchone()
                                bal=bal[0]
                                if(bal>=trans_amount):                   #Checking Whether the user has sufficient funds or not 
                                    bal=bal-trans_amount
                                    C.execute("SELECT Balance from apdbms_bal where ACCOUNT_NO={}".format(trans_acc))
                                    bal1=C.fetchone()
                                    bal1=bal1[0]
                                    bal1=bal1+trans_amount
                                    print(bal1)
                                    C.execute("UPDATE apdbms_bal set Balance={} where ACCOUNT_NO={}".format(bal,ACC))
                                    '''Transfering Balance from one account to another account'''
                                    C.execute("UPDATE apdbms_bal set Balance={} where ACCOUNT_NO={}".format(bal1,trans_acc))
                                    con.commit()
                                    C.execute("insert into apdbms_tra values(current_timestamp,{},{},{});".format(ACC,trans_acc,trans_amount))
                                    con.commit()
                                    print('Amount transferred Successfully')
                                    time.sleep(3)
                                    clear()
                                else:
                                    print("S0RRY .,,, Y0U D0N7 H@V3 SUFFICIENT BALANCE ...,, :~(")  #Message showing if user has unsufficient Balance
                                    time.sleep(3)
                                    clear()
                        elif(choice_login==4):                                                      #Checking Balance
                            C.execute("SELECT Balance from apdbms_bal where ACCOUNT_NO={}".format(ACC))
                            bal=C.fetchone()
                            bal=bal[0]
                            print("Your Balance is",bal)                                             #Checking Balance
                            time.sleep(3)
                            clear()
                        elif(choice_login==5):
                            print("WE HOPE YOUR PRIVACY .... Please Enter Your PIN AGAIN : " , end=" ")
                            pin=str(input())
                            ch3="select PIN from apdbms_acc where ACCOUNT_NO='{}' ".format(ACC)             
                            C.execute(ch3)
                            ans3=C.fetchone()
                            if(pin==ans3[0]):
                                print("Enter your new PIN :",end=" ")
                                npin=str(input())                               #Taking New PIN
                                C.execute("update apdbms_acc set PIN='{}' where ACCOUNT_NO={}".format(npin, ACC))
                                con.commit()
                                print("Pin is UPDATED")
                                time.sleep(3)
                                clear()
                            else:
                                print("U R NOT A TRUE H4CK3R .. Never come AGAIN")
                                clear()
                        elif(choice_login==6):
                            clear()
                            C.execute("select Name from apdbms_cust where ACCOUNT_NO={};".format(ACC))
                            NA=C.fetchall()
                            print(Fore.GREEN +"<<<<====================================>>>HBUCD<<<====================================>>>>")
                            print(Back.GREEN+Fore.RED+'''HACKERS BANK USER CONFIDENTIAL DATA ''')
                            print(Fore.RED+"H@CK3R :"+Fore.GREEN +"{}                       ".format(NA[0][0])+Fore.RED+"Account Number :"+Fore.GREEN+"{} ".format(ACC))
                            C.execute("select * from apdbms_wid where ACCOUNT_NO={}".format(ACC))
                            WIT=C.fetchall()
                            print("Withdraw's Table : ")
                            print("+--------------------------------+")
                            if(C.rowcount>=1):
                                print("|    Date and Time    |  Amount  |")
                                print("+--------------------------------+")
                                for rec in WIT:
                                    print("|",rec[0],"|"+" "*(10-len(str(rec[1]))),rec[2],"|")
                            else:
                                print("You dont have any recent withdraws")
                            print("+--------------------------------+")
                            C.execute("select * from apdbms_dep where ACCOUNT_NO={}".format(ACC))
                            WID=C.fetchall()
                            print("Deposits's Table : ")
                            print("+--------------------------------+")
                            if(C.rowcount>=1):
                                print("|    Date and Time    |  Amount  |")
                                print("+--------------------------------+")
                                for rec in WID:
                                    print("|",rec[0],"|"+" "*(10-len(str(rec[1]))),rec[2],"|")
                            else:
                                print("You dont have any recent Deposits")
                            print("+--------------------------------+")
                            C.execute("select * from apdbms_tra where ACCOUNT_NO={}".format(ACC))
                            TID=C.fetchall()
                            print("Transfer's Table : ")
                            print("+------------------------------------------------+")
                            if(C.rowcount>=1):
                                print("|    Date and Time    |  Amount  |  Transfer to  |")
                                print("+------------------------------------------------+")
                                for rec in TID:
                                    print("|",rec[0],"|"+" "*(10-len(str(rec[1]))),rec[3],"|"," "*8,rec[2],"|")
                            else:
                                print("You dont have any recent Transfers")
                            print("+------------------------------------------------+")
                        elif(choice_login==7):
                            print("Thank You Visit Again.......!")
                            c=1
                            break
                        else:
                            print("Please Enter Correct Option....!")
                            time.sleep(2)
                            clear()
                else:
                    if(i<2):
                        print("You Have only {} Chances left ".format(2-i))
                    else:
                        print("Maximum Number of attempts Extended ....")
                        C.execute("insert into apdbms_blo values({})".format(ACC))
                        con.commit()
                        time.sleep(2)
        else:
            print("This Account Does't Exist .. plese check correctly")
    elif(fc==2):
        print("H4CK3R5 B4NK W31C0M35 Y0U .... !")
        print("Please Enter Your Name : ",end=" ")                #Creating New User
        Name=str(input())
        F=1
        while(F):                                                #Creating a random 4 digit Account Number
            ACC=random.randint(1000,9999)
            ch="select * from apdbms_Cust where ACCOUNT_NO={}".format(ACC)
            C.execute(ch)
            C.fetchall()
            ans=C.rowcount
            if( ans !=1 ):
                F=0
        C.execute("insert into apdbms_Cust values('{}',{});".format(Name,ACC))
        con.commit()
        print("Your Account Number is {}".format(ACC))
        print("Thank You For Choosing Our Bank....Login Again to choose the PIN")
        time.sleep(5)
        clear()
    elif(fc==3):
        print("Thank You Visit Again ...!")
        Exit="3X7!N9.....!"
        for char in Exit:
            sys.stdout.write(char)
            sys.stdout.flush()
            time.sleep(0.1)
        time.sleep(0.5)
        clear()
        break
    else:
        print("Please choose correct Option")
        time.sleep(2)
        clear()
'''
SQL Queries for Creating Tables and Database .. simply Execute Below Queries in MySQL
create database apdbms;
use apdbms;
create table apdbms_Cust(Name varchar(20),ACCOUNT_NO int, PRIMARY KEY(ACCOUNT_NO));
create table apdbms_Bal(ACCOUNT_NO int , Balance int , foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);
create table apdbms_Acc(ACCOUNT_NO int ,PIN varchar(10), foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);
create table apdbms_wid(Date timestamp default current_timestamp ,ACCOUNT_NO int ,Amount int, foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);
create table apdbms_dep(Date timestamp default current_timestamp ,ACCOUNT_NO int ,Amount int, foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);
create table apdbms_tra(Date timestamp default current_timestamp ,ACCOUNT_NO int ,To_ACCOUNT int ,Amount int, foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);
create table apdbms_blo(ACCOUNT_NO int, foreign key(ACCOUNT_NO) references apdbms_Cust(ACCOUNT_NO) on delete cascade);
'''
'''
d888888b db   db  .d8b.  d8b   db db   dD   db    db  .d88b.  db    db   .d8888. d888888b d8888b. 
`~~88~~' 88   88 d8' `8b 888o  88 88 ,8P'   `8b  d8' .8P  Y8. 88    88   88'  YP   `88'   88  `8D 
   88    88ooo88 88ooo88 88V8o 88 88,8P      `8bd8'  88    88 88    88   `8bo.      88    88oobY' 
   88    88~~~88 88~~~88 88 V8o88 88`8b        88    88    88 88    88     `Y8b.    88    88`8b   
   88    88   88 88   88 88  V888 88 `88.      88    `8b  d8' 88b  d88   db   8D   .88.   88 `88. 
   YP    YP   YP YP   YP VP   V8P YP   YD      YP     `Y88P'  ~Y8888P'   `8888Y' Y888888P 88   YD 
                                                                                                  
'''
