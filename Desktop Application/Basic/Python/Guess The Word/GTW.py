#guess the word
#welcome function
#game fuction
def welcome():
    # welcome statment
    print("***************WELCOME TO GUESS THE WORD***************")
    print("++++++++++++GAME DESCRIPTION++++++++++++++++++")
    print(" IN THIS GAME YOU WILL BE ASKED QUESTION AND THE ANSWER WILL BE ONE WORD")
    print("AND IF YOU ARE RIGHT YOUR SCORE WILL BE INCREASE AND IF YOU GET 3 WRONG ANSWER GAME WILL GET OVER")
def game():
    #score and no of wrong answer
    score=0
    wrong=0
    ans1=input("QUESTION 1 : I MAKE TWO PEOPLE OUT OF ONE:")
    if ans1=='mirror':
        print("!!!!YOU ARE RIGHT!!!!!")
        score=score+1
    else:
        print(":( YOU ARE WRONG :(")
        wrong=wrong+1
    ans2=input("QUESTION 2 : I AM WHITE WHEN I AM DIRTY AND BLACK WHEN I AM CLEAN:")
    if ans2=='black board':
        print("!!!!!!!!YOU ARE RIGHT!!!!!!!")
        score=score+1
    else:
        print(":( YOU ARE WRONG")
        wrong=wrong+1
    ans3 = input("QUESTION 3 : THE MORE I TAKE AWAY THE MORE I BECOME:")
    if ans3 == 'hole':
        print("!!!!!!!!YOU ARE RIGHT!!!!!!!")
        score = score + 1
    else:
        print(":( YOU ARE WRONG")
        wrong = wrong + 1
    ans4 = input("QUESTION 4 : I HAVE TWO HANDS BUT I CAN NOT SCRATCH MYSELF:")
    if ans4 == 'clock':
        print("!!!!!!!!YOU ARE RIGHT!!!!!!!")
        score = score + 1
    else:
        print(":( YOU ARE WRONG")
        wrong = wrong + 1
    ans5 = input("QUESTION 5 : AM TALL WHEN I AM YOUNG AND I AM SHORT WHEN I AM OLD:")
    if ans5 == 'pencil':
        print("!!!!!!!!YOU ARE RIGHT!!!!!!!")
        score = score + 1
    else:
        print(":( YOU ARE WRONG")
        wrong = wrong + 1
    if wrong>=3:
        print(":( YOU LOOSE")
        print("TOTAL SCORE:",score)
        print("TOTAL NO OF WRONG:",wrong)
    else:
        print("++++++YOU WIN++++++++")
        print("TOTAL NO OF SCORE:",score)
        print("TOTAL NO OF WRONG",wrong)
#calling the fuctions
welcome()
game()
