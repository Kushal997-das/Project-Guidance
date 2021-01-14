import random
#WELCOMEEEEEE SCREEN FUNCTION
def welcome():
    print("<<<<<<<<<<WELCOME TO STORY GENERATOR>>>>>>>>>>>>>")
    print("________DESCRIPTION___________")
    print("IN THIS STORY GENERATOR YOU WILL BE GIVEN OPTION TO CHOOSE THE COMPUTER MADE AUTOMATIC STORY OR STORY OF YOUR CHOICE WHERE WE WILL ASK SPECIFIC QUESTION TO FILL THE PLACE IN THE STORY AND GENERATE ONE")
    print("$-LETS GET STARTED-$")

#CHOICE FUNCTION and calling computer and choice function here
def choices():
    x=int(input("ENTER '1' FOR AUTOMATIC STORY OR ENTER '2' FOR YOUR CHOICE STORY"))
    if x==1:
        computer()
    else:
        choose()

#COMPUTER FUNCTION
def computer():
    when=['A FEW YEARS AGO','YESTERDAY','LAST NIGHT','A LONG TIME AGO']
    who=['A RABBIT','AN ELEPHANT','A LION','A TURTLE']
    name=['SHRUTI','MILIN','SANGEETHA','ADITI','RESHI']
    residence=['INDIA','BARCELONA','GERMANY','ENGLAND']
    went=['CINEMA','UNIVERSITY','SCHOOL','LAUNDRY']
    happened=['MADE A LOT OF FRIENDS','FOUND A SECRET KEY','SOLVED A MYSTERY','WROTE A BOOK']
    print("++++++++++++STORY+++++++++++++")
    print(random.choice(when)+',' + random.choice(who)+ ' THAT LIVED IN ' + random.choice(residence) +", WENT TO THE " + random.choice(went) + ' AND ' + random.choice(happened))
    print("+++++++++++++++++STORY END+++++++++++++++++")

#OUR CHOICE
  #- THRILLER FUNCTION
  # - ACHIVEMENT FUNCTION

def choose():
    c=int(input("ENTER 1. FOR THRILLER MYSTERY STORY AND 2 FOR ACHIEVMENT STORY"))
    if c==1:
        print("THRILLER MYSTERY IT IS!!!!!")
        a=input("ENTER A DATE OR A DAY:")
        b=input("ENTER A PLACE YOU GO WITH FRIENDS")
        c=input("ENTER A FRIEND'S NAME")
        d=input("ENTER EITHER 'A LOT OF PEOPLE' OR ' FEW PEOPLE' :")
        e=input("A SPECIFIC PLACE IN THE PLACE YOU GO WITH FRIENDS")
        print("++++++++++++STORY++++++++++++++")
        print("ON " +a+" I WENT TO " +b+",I WENT WITH " +c+" AND THERE WERE "+d+",I LOST HER I SEARCHED FOR HER FOR A LONG TIME AND FOUND HER SHOE IN "+e+" AND THAT WAS THE LAST TIME I HAVE SEEN HER,TILL NOW ITS STILL A MYSTERY ")
        print("++++++++++++STORY END+++++++++++++++")
    else:
        print("ACHIEVMENT STORY IT IS!!!")
        f=input("ENTER YOUR NAME:")
        g=input("ENTER WHAT YOU WANT TO BECOME:")
        h=input("ENTER A COLLEGE YOU WANT TO GET IN:")
        print("+++++++++++++++++STORY+++++++++")
        print(" hi my name is "+f+",i want to become an "+g+" i worked hard and got place in "+h+ " college after a long time of struggle and hard work,i became a best "+g)
        print("+++++++++++++STROY END+++++++++")

#CALL THE FUNCTION
#welcome and choices so in choice the other fuction will called accordinly
welcome()
choices()


