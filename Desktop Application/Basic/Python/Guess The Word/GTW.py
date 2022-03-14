# guess the word
# welcome function
# game function
# Contributed by Shubham Singh for GSSoC'22
import random    # to randomly pick questions
import time      # to add some delay


def welcome():
    # welcome statement
    print("----------------------------------------------------------------")
    print("------------------WELCOME TO GUESS THE WORD---------------------")
    print("----------------------------------------------------------------")
    time.sleep(2)
    print("----------------------GAME DESCRIPTION--------------------------------")
    print("In this game you will be given a riddle question")
    print("The answer to these questions will be a single word")
    print("Getting the question correct will fetch you one point")
    print("If you get three or more questions wrong, you lose and the game ends")
    print("-----------------------------------------------------------------------")
    time.sleep(4)


# Forms a list of 5 random questions from this list
question_book = {
    "What is full of holes but still holds water...": "sponge",
    "I make two people out of one...": "mirror",
    "The more I take away the more I become...": "hole",
    "I have two hands but I cannot scratch myself...": "clock",
    "What gets wet while drying...": "towel",
    "What goes up but never comes down...": "age",
    "I shave every day, but my beard stays the same. What am I...": "barber",
    "I have branches, but no fruit, trunk or leaves. What am I...": "bank",
    "What can’t talk but will reply when spoken to": "echo",
    "David’s parents have three sons: Snap, Crackle, and what’s the name of the third son": "david",
    "What invention lets you look right through a wall": "window",
    "If you’re running in a race and you pass the person in second place, what place are you in": "second",
    "am tall when I am Young and I am short when I am old": "pencil",

    # add more questions here with the question as the key and the value as the answer
}
tab = (random.sample(question_book.keys(), 5))  # stores the questions


# main game block
def game():
    # score and no of wrong answer counter
    score = 0
    wrong = 0
    for i in range(5):
        print("-" * 20)
        quest = tab[i]
        print(f'Question No.{i + 1} coming up...')
        print(quest)
        ans = input("Enter your guess : ").lower()
        if ans == question_book[quest]:
            print("That's Right! Great job!")
            score = score + 1
        else:
            print("Oops! You got it wrong...")
            print(f'Correct answer was : {question_book[quest]}')
            wrong = wrong + 1
            if wrong >= 3:
                break
        print("-" * 20)

    if wrong >= 3:
        print("Sorry you answered three questions incorrectly")
        print("Game Over!")
        print("----------------------------------------")
        print("Total Correct answers : ", score)
        print("Total Wrong answers : ", wrong)
        print("----------------------------------------")
    else:
        print("Game Completed..")
        print("----------------------------------------")
        print("Total Correct answers : ", score)
        print("Total Wrong answers : ", wrong)
        print("----------------------------------------")


# calling the functions
welcome()
print("")
game()
