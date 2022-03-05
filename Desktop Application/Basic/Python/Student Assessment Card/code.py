# change the port everywhere to the port of your MySQL.
# change the password everywhere to your password

import mysql.connector as driver
#connector to link python with MySQL

import sys

# user driven menu to perform multiple tasks as prompted below
def main_menu():
    loop="y"
    while loop=="y":
        print("\n...................USER MENU......................")
        print("1. CREATE DATABASE")
        print("2. SHOW DATABASES")
        print("3. CREATE STUDENT TABLE")
        print("4. CREATE Advanced Programming Table")
        print("5. CREATE DataBase Management System Table")
        print("6. SHOW TABLES")
        print("7. ADD Student's Record")
        print("8. ADD STUDENT'S Advanced Programming Record")
        print("9. ADD STUDENT'S DataBase Management System Record")
        print("10. UPDATE  Advanced Programming Record")
        print("11. UPDATE DataBase Management System Record")
        print("12. DELETE Advanced Programming Record")
        print("13. DELETE DataBase Management System Record")
        print("14. SEARCH Advanced Programming Record")
        print("15. SEARCH DataBase Management System Record")
        print("16. DISPLAY Advanced Programming Record")
        print("17. DISPLAY DataBase Management System Record")
        print("18. DISPLAY Advanced Programming Topper Record")
        print("19. DISPLAY DataBase Management System Topper Record")
        print("20. QUIT")
        print()
        choice=int(input("Enter the choice (1-20) : "))
        if(choice==1):
            create_database()
        elif(choice==2):
            show_databases()
        elif(choice==3):
            create_stud_table()
        elif(choice==4):
           create_ap_table()
        elif(choice==5):
            create_dbms_table()
        elif(choice==6):
             show_tables()
        elif(choice==7):
            insert_stud_record()
        elif(choice==8):
            insert_ap_record()
        elif(choice==9):
            insert_dbms_record()
        elif(choice==10):
            update_ap_record()
        elif(choice==11):
            update_dbms_record()
        elif(choice==12):
            delete_ap_record()
        elif(choice==13):
            delete_dbms_record()
        elif(choice==14):
            search_ap_record()
        elif(choice==15):
            search_dbms_record()
        elif(choice==16):
            display_ap_record()
        elif(choice==17):
            display_dbms_record()
        elif(choice==18):
            display_ap_top_record()
        elif(choice==19):
            display_dbms_top_record()

        elif(choice==20):
            break
        else:
            print("Wrong Choice.")
        loop=input("\nDo you want to continue?(y or n)")
    else:
        sys.exit()

#function to create the database
def create_database():
    con=driver.connect(host="localhost",user="root",passwd="pwd",port="3306",charset='utf8')
    if con.is_connected():
        print("Successfully Connected") 
        #to check if hte connection is successful
        cur=con.cursor()
        cur.execute('create database if not exists test')
        print()
        print("Database Created")
        con.close()
    else:
        print("Connection not established")

#function to print all the databases in your MySQL
def show_databases():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',port="3306")
    if con.is_connected():
        print("Successfully Connected")
    cur=con.cursor()
    cur.execute('show databases')
    for i in cur:
        print(i)
    con.close()

#function to create table named student
#table consists of marks and roll number
def create_stud_table():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
    cur=con.cursor()
    cur.execute('create table if not exists stu(rollno varchar(15) primary key, name varchar(15))')
    print()
    print("Table Created -> stu")
    cur.execute('DESC stu')
    print("+-------------|--------------|-----------+")
    print("+Column Name  |DataType(Size)|NULL       |")
    print("+-------------|--------------|-----------+")

    for i in cur:
        print('|{0:12} | {1:12} | {2:10}|'.format(i[0],i[1].decode('UTF-8'),i[2]))
    print("+-------------|--------------|-----------+")
    con.close()

# function to create a table to enter details of one subject, these parameters can be changed
# the parameters of this function are:
# marks in theory
# marks in viva
# professor who took viva
# and the roll number

def create_ap_table():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
    cur=con.cursor()
    cur.execute('create table if not exists AP(rollno varchar(15) primary key, apth float, apviva float, approf varchar(20))')
    print()
    print("Table Created -> AP")
    cur.execute('DESC AP')
    print("+-------------|--------------|-----------+")
    print("+Column Name  |DataType(Size)|NULL       |")
    print("+-------------|--------------|-----------+")

    for i in cur:
        print('|{0:12} | {1:12} | {2:10}|'.format(i[0],i[1].decode('UTF-8'),i[2]))
    print("+-------------|--------------|-----------+")
    con.close()

# function to create a table to enter details of other subject, these parameters can be changed
# the parameters of this function are:
# marks in theory
# marks in viva
# professor who took viva
# and the roll number
# you can reduce the redundancy by using loop

def create_dbms_table():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
    cur=con.cursor()
    cur.execute('create table if not exists DBMS(rollno varchar(15) primary key, dbmsth float, dbmsviva float, dbmsprof varchar(20))')
    print()
    print("Table Created -> DBMS")
    cur.execute('DESC DBMS')
    print("+-------------|--------------|-----------+")
    print("+Column Name  |DataType(Size)|NULL       |")
    print("+-------------|--------------|-----------+")

    for i in cur:
        print('|{0:12} | {1:12} | {2:10}|'.format(i[0],i[1].decode('UTF-8'),i[2]))
    print("+-------------|--------------|-----------+")
    con.close()

# function to show tables in a database
def show_tables():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
    cur=con.cursor()
    cur.execute('show tables')
    for i in cur:
        print(i)
    con.close()

#function to insert record in the student table created previously.
def insert_stud_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
        cur=con.cursor()
        rollno=(input("ENTER student rollno : "))
        NAME=input("ENTER Name OF student : ")

        query1="INSERT INTO stu(rollno,name) VALUES('{}','{}')".format(rollno,NAME)
        cur.execute(query1)
        con.commit()
        print('Record Inserted')
        con.close()
    else:
        print("Error : Not Connected")

# function to insert record in the one subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def insert_ap_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
        cur=con.cursor()
        rollno=(input("ENTER student rollno : "))
        apth=eval(input("enter marks in theory : "))
        apviva=eval(input("enter viva marks : "))
        approf=input("enter name of the professor who took viva in Advanced Programming : ")

        query1="INSERT INTO AP(rollno,apth,apviva,approf) VALUES('{}',{},{},'{}')".format(rollno,apth,apviva,approf)
        cur.execute(query1)
        con.commit()
        print('Record Inserted')
        con.close()
    else:
        print("Error : Not Connected")

# function to insert record in the other subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def insert_dbms_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
        cur=con.cursor()
        rollno=(input("ENTER student rollno : "))
        dbmsth=eval(input("enter marks in theory : "))
        dbmsviva=eval(input("enter viva marks : "))
        dbmsprof=input("enter name of the professor who took viva in DataBase Management System : ")

        query1="INSERT INTO DBMS(rollno,dbmsth,dbmsviva,dbmsprof) VALUES('{}',{},{},'{}')".format(rollno,dbmsth,dbmsviva,dbmsprof)
        cur.execute(query1)
        con.commit()
        print('Record Inserted')
        con.close()
    else:
        print("Error : Not Connected")


# function to update record in the one subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def update_ap_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    cur=con.cursor()

    rollno=(input("enter Student rollno : "))
    apth=eval(input("enter marks in theory to be updated : "))
    apviva=eval(input("enter viva marks to be updated : "))


    query1="update AP set  apth=%s , apviva=%s where rollno='%s'" %(apth,apviva,rollno)
    cur.execute(query1)
    con.commit()
    print("Record Updated")
    con.close()

# function to update record in the other subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def update_dbms_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    cur=con.cursor()

    rollno=(input("enter Student rollno : "))
    dbmsth=eval(input("enter marks in theory to be updated : "))
    dbmsviva=eval(input("enter viva marks to be updated : "))


    query1="update DBMS set  dbmsth=%s , dbmsviva=%s where rollno='%s'" %(dbmsth,dbmsviva,rollno)
    cur.execute(query1)
    con.commit()
    print("Record Updated")
    con.close()

# function to delete record in the one subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def delete_ap_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    cur=con.cursor()
    d=(input("Enter student rollno for deleting record : "))
    query1="delete from AP  where rollno='%s'" %(d)
    cur.execute(query1)
    con.commit()
    print("Record Deleted")
    con.close()

# function to delete record in the other subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def delete_dbms_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    cur=con.cursor()
    d=(input("Enter student rollno for deleting record : "))
    query1="delete from DBMS where rollno='%s'" %(d)
    cur.execute(query1)
    con.commit()
    print("Record Deleted")
    con.close()


# function to search record in the one subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def search_ap_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    cur=con.cursor()
    print("enter the choice according to which you have to search in AP record: ")
    print("1. According to roll number")
    print("2. According TO Viva Professor's Name")
    print("3. According to theory marks")
    print("4. According to viva marks")
    print()
    choice=int(input("ENTER THE CHOICE (1-4) : "))
    if choice==1:
          d=(input("Enter student rollno which you want to search : "))
          query1="select * from AP where rollno=%s" %(d)
    elif choice==2:
          name=input("Enter Viva Professor's Name which you want to search : ")
          query1="select * from AP where name='%s'" %(name)
    elif choice==3:
          th_mark=float(input("Enter theory marks which you want to search : "))
          query1="select * from AP where marks=%s" %(th_mark)
    elif choice==4:
          viva_mark=float(input("Enter viva marks which you want to search : "))
          query1="select * from AP where marks=%s" %(viva_mark)
    else:
          print("Wrong Choice")
    cur.execute(query1)
    rec=cur.fetchall()
    count=cur.rowcount
    print("Total no. of records found : ",count)
    for i in rec:
        print(i)
    print("Record Searched")
    con.close()


# function to search record in the other subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def search_dbms_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    cur=con.cursor()
    print("enter the choice according to which you have to search in DBMS record: ")
    print("1. According to roll number")
    print("2. According TO Viva Professor's Name")
    print("3. According to theory marks")
    print("4. According to viva marks")
    print()
    choice=int(input("ENTER THE CHOICE (1-4) : "))
    if choice==1:
          d=(input("Enter student rollno which you want to search : "))
          query1="select * from DBMS where rollno=%s" %(d)
    elif choice==2:
          name=input("Enter Viva Professor's Name which you want to search : ")
          query1="select * from DBMS where name='%s'" %(name)
    elif choice==3:
          th_mark=float(input("Enter theory marks which you want to search : "))
          query1="select * from DBMS where marks=%s" %(th_mark)
    elif choice==4:
          viva_mark=float(input("Enter viva marks which you want to search : "))
          query1="select * from DBMS where marks=%s" %(viva_mark)
    else:
          print("Wrong Choice")
    cur.execute(query1)
    rec=cur.fetchall()
    count=cur.rowcount
    print("Total no. of records found : ",count)
    for i in rec:
        print(i)
    print("Record Searched")
    con.close()


# function to display record in the one subject table created previously.
# run the query based on user input.
def display_ap_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
        cur=con.cursor()
        cur.execute('select * from AP')
        rec=cur.fetchall()
        count=cur.rowcount
        print("Advanced Programming Record is as follows: ")
        print()
        print("+---------------|------------------|----------------|--------------------+")
        print("|  Roll Number  |   Theory Marks   |   Viva Marks   |   Viva Professor   |")
        print("+---------------|------------------|----------------|--------------------+")
        for i in rec:
            print('|{0:^11} | {1:^16} | {2:^15}|{3:^20}|'.format(i[0],i[1],i[2],i[3])) 
        print("+---------------|------------------|----------------|--------------------+")
        print("|                      Total no. of records are : ",count,"                    |")
        print("+------------------------------------------------------------------------+")
        con.close()
    else:
        print("Error : Database Connection is not success")

# function to display the entire record in the other subject table created previously.
# take user inputs to do so.
# run the query based on user input.
def display_dbms_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    if con.is_connected():
        print("Successfully Connected")
        cur=con.cursor()
        cur.execute('select * from DBMS')
        rec=cur.fetchall()
        count=cur.rowcount
        print("DataBase Management System Record Is As Follows: ")
        print()
        print("+--------------|------------------|----------------|--------------------+")
        print("|  Roll Number |   Theory Marks   |   Viva Marks   |   Viva Professor   |")
        print("+--------------|------------------|----------------|--------------------+")
        for i in rec:
            print('|{0:^13} | {1:^16} | {2:^15}|{3:^20}|'.format(i[0],i[1],i[2],i[3])) 
        print("+--------------|------------------|----------------|--------------------+")
        print("|                     Total no. of records are : ",count,"                    |")
        print("+-----------------------------------------------------------------------+")
        con.close()
    else:
        print("Error : Database Connection is not success")


# function to displat the topper's record in the one subject table created previously.
# take user input on according to which parameter does the user want to get the topper
# the options are prompted in front of the user as listed below
# run the query based on user input.

def display_ap_top_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    cur=con.cursor()
    print("Enter the choice according to which you have to search topper in Advanced Programming: ")

    print("1. According to Viva Professor's Name")
    print("2. According to theory marks")
    print("3. According to viva marks")
    print()
    choice=int(input("ENTER THE CHOICE (1-3) : "))

    if choice==1:
          name=input("Enter Viva Professor's Name whose highest awarded marks you want to search : ")
          query1="select  stu.name, ap.rollno, ap.apviva from AP, stu where stu.rollno = ap.rollno and ap.approf ='%s'" %(name)
    elif choice==2:

          query1="SELECT  stu.name, ap.rollno,ap.apth FROM AP INNER JOIN stu ON stu.rollno=ap.rollno where apth=(select max(apth) from AP)"
    elif choice==3:

          query1="SELECT  stu.name, ap.rollno,ap.apviva FROM AP INNER JOIN stu ON stu.rollno=ap.rollno where apviva=(select max(apviva) from AP) "
    else:
          print("Wrong Choice")
    cur.execute(query1)
    rec=cur.fetchall()
    count=cur.rowcount
    print("Advanced Programming Record Is As Follows: ")
    print()
    print("+----------------|----------------|----------------+")
    print("|      Name      |  Roll Number   |   Max Marks    |")
    print("+----------------|----------------|----------------+")
    for i in rec:
         print('|{0:^15} |{1:^15}  {2:^14} | '.format(i[0],i[1],i[2])) 
    print("+----------------|----------------|----------------+")
    print("|             Total records are : ",count,"              |")
    print("+--------------------------------------------------+")
    con.close()

# function to displat the topper's record in the other subject table created previously.
# take user input on according to which parameter does the user want to get the topper
# the options are prompted in front of the user as listed below
# run the query based on user input.
def display_dbms_top_record():
    con=driver.connect(host='localhost',user='root',passwd='pwd',charset='utf8',database='test',port="3306")
    cur=con.cursor()
    print("Enter the choice according to which you have to search topper in DataBase Management System: ")

    print("1. Rank Card According to Viva Professor's Name")
    print("2. According to theory marks")
    print("3. According to viva marks")
    print()
    choice=int(input("ENTER THE CHOICE (1-3) : "))

    if choice==1:
          name=input("Enter Viva Professor's Name whose highest awarded marks you want to search : ")
          query1="select  stu.name, dbms.rollno, dbms.dbmsviva from dbms, stu where stu.rollno = dbms.rollno and dbms.dbmsprof = '%s'" %(name)
    elif choice==2:

          query1=" SELECT  stu.name, dbms.rollno, dbms.dbmsth FROM dbms INNER JOIN stu ON stu.rollno=dbms.rollno where dbmsth=(select max(dbmsth) from dbms)"
    elif choice==3:

          query1="SELECT  stu.name, dbms.rollno, dbms.dbmsviva FROM dbms INNER JOIN stu ON stu.rollno=dbms.rollno where dbmsviva=(select max(dbmsviva) from dbms)"
    else:
          print("Wrong Choice")
    cur.execute(query1)
    rec=cur.fetchall()
    count=cur.rowcount
    print("DataBase Management System Record Is As Follows: ")
    print()
    print("+----------------|----------------|----------------+")
    print("|  Name          |  Roll Number   |   Max Marks    |")
    print("+----------------|----------------|----------------|")
    for i in rec:
           print('|{0:^15} |{1:^15} | {2:^14} | '.format(i[0],i[1],i[2])) 
    print("+----------------|----------------|----------------+")
    print("|              Total records are : ",count,"             |")
    print("+--------------------------------------------------+")
    con.close()


# main function
if __name__ == "__main__":
    main_menu() 
 
