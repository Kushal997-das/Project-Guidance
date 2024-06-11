import smtplib
from question_model import Question
from data import question_data
from quiz_brain import QuizBrain
from ui import QuizInterfaces
MY_EMAIL =" " #your email here
PASSWORD = " " #your password here
question_bank = []
for question in question_data:
    question_text = question["question"]
    question_answer = question["correct_answer"]
    new_question = Question(question_text, question_answer)
    question_bank.append(new_question)

quiz = QuizBrain(question_bank)
quiz_ui = QuizInterfaces(quiz)

import csv
with open('players.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    field = ["name", "email", "score"]
    writer.writerow(field)
    writer.writerow([quiz_ui.name,quiz_ui.email,quiz.score])

with smtplib.SMTP("smtp.gmail.com",587) as connection:
    connection.starttls()
    connection.login(user=MY_EMAIL,password=PASSWORD)
    connection.sendmail(from_addr=MY_EMAIL,to_addrs=quiz_ui.email,msg=f"Subject: {quiz_ui.name}\n\n Congratulations You scored {quiz.score}/{quiz.question_number} .\n \n Thanks for taking part in the quiz")
    print("Successfully sent the mail")