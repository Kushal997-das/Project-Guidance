from tkinter import *
from quiz_brain import QuizBrain
THEME_COLOR = "#375362"
from tkinter.simpledialog import askstring
from tkinter.messagebox import showinfo
class QuizInterfaces:
    def __init__(self,quiz_brain: QuizBrain):
        self.quiz = quiz_brain
        self.window = Tk()
        self.name = askstring('Name', 'What is your name?')
        self.email = askstring('email', 'Your email')
        showinfo('Hello', f"{format(self.name)}, {format(self.email)}")
        self.window.title("Quizler")
        self.window.config(padx=20,pady=20,bg=THEME_COLOR)
        self.label = Label(text=f"Player Name:{self.name}", bg=THEME_COLOR, foreground="white")
        self.label.grid(row=0, column=0)
        self.label = Label(text=f"Score:{self.quiz.score}",bg=THEME_COLOR,foreground="white")
        self.label.grid(row=0,column=1)

        self.canvas = Canvas(highlightcolor="white",width=300,height=250)
        self.question_text =   self.canvas.create_text(150,120,text="wassup bruh",width=280,font=('Arial',20,'italic'))
        self.canvas.grid(row=1,column=0,columnspan=2,pady=20,padx=20)


        true = PhotoImage(file="images/true.png")
        false= PhotoImage(file="images/false.png")
        self.right = Button(image=true,highlightthickness=0,command=self.true_press)
        self.right.grid(row=2,column=0)
        self.wrong = Button(image=false,highlightthickness=0,command=self.false_press)
        self.wrong.grid(row=2,column=1)
        self.get_next_question()
        self.window.mainloop()

    def get_next_question(self):
        self.canvas.config(bg="white")
        if self.quiz.still_has_questions():
            self.label.config(text=f"Score :{self.quiz.score}")
            q_text = self.quiz.next_question()
            self.canvas.itemconfig(self.question_text,text=q_text)
        else:
            self.canvas.itemconfig(self.question_text,text="You have reached the end")
            self.right.config(state="disabled")
            self.wrong.config(state="disabled")
    def true_press(self):
        self.give_feedback(self.quiz.check_answer("True"))

    def false_press(self):
        self.give_feedback(self.quiz.check_answer("False"))

    def give_feedback(self,is_right):
        if is_right:
            self.canvas.config(bg="green")
        else:
            self.canvas.config(bg="red")
        self.window.after(1000,self.get_next_question)