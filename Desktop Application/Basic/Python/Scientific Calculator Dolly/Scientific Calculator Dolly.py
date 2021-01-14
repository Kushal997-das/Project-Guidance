from tkinter import *
from tkinter import messagebox
import math

class Calculator:
    def __init__(self,window):
        self.window=window
        self.text_value = StringVar()
        self.textoperator = StringVar()
        self.textoperator2 = StringVar()
        self.fact = 1
        self.widget()

    def butn(self):
        self.plus = Button(self.window,text="+",width=3,font=("arial",15,"bold"),fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("+"), relief=RAISED, bd=3)
        self.plus.place(x=535,y=240)

        self.subs = Button(self.window, text="-", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("-"), relief=RAISED, bd=3)
        self.subs.place(x=535, y=300)

        self.mul = Button(self.window, text="X", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("X"), relief=RAISED, bd=3)
        self.mul.place(x=535, y=360)

        self.div = Button(self.window, text="/", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("/"), relief=RAISED, bd=3)
        self.div.place(x=535, y=420)

        self.rad = Button(self.window, text="rad", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("Radian"), relief=RAISED, bd=3)
        self.rad.place(x=440, y=360)

        self.reci = Button(self.window, text="1/x", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("Reciprocal"), relief=RAISED, bd=3)
        self.reci.place(x=440, y=420)


        self.sqr = Button(self.window, text="X^2", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("Square"), relief=RAISED, bd=3)
        self.sqr.place(x=440, y=240)

        self.cube = Button(self.window, text="X^3", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("Cube"), relief=RAISED, bd=3)
        self.cube.place(x=440, y=300)

        self.equal = Button(self.window, text="=", width=11, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                            command=self.evaluation_opr, relief=RAISED, bd=3)
        self.equal.place(x=440, y=490)

        self.clear = Button(self.window, text="Information", width=11, font=("arial", 10, "bold"), activebackground="#262626",
                            fg="red",bg="#262626",command=self.information, relief=RAISED, bd=3)
        self.clear.place(x=480, y=68)

        self.sqrt = Button(self.window, text="Square root", width=11, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("Square root"), relief=RAISED, bd=3)
        self.sqrt.place(x=10, y=240)

        self.cubert = Button(self.window, text="Cube root", width=11, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("Cube root"), relief=RAISED, bd=3)
        self.cubert.place(x=200, y=240)

        self.log2 = Button(self.window, text="log2", width=11, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("log2"), relief=RAISED, bd=3)
        self.log2.place(x=10, y=300)

        self.log10 = Button(self.window, text="log10", width=11, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("log10"), relief=RAISED, bd=3)
        self.log10.place(x=200, y=300)

        self.exponent = Button(self.window, text="e^x", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("Exponent"), relief=RAISED, bd=3)
        self.exponent.place(x=200, y=360)

        self.power = Button(self.window, text="X^Y", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("x^y"), relief=RAISED, bd=3)
        self.power.place(x=295, y=360)

        self.factorial = Button(self.window, text="n!", width=5, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=lambda : self.opr("Factorial"), relief=RAISED, bd=3)
        self.factorial.place(x=10, y=360)

        self.mod = Button(self.window, text="Mod", width=4, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                                command=lambda: self.opr("Modulus"), relief=RAISED, bd=3)
        self.mod.place(x=94, y=360)

        self.reset = Button(self.window, text="Reset", width=5, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                           command=self.reset_now, relief=RAISED, bd=3)
        self.reset.place(x=10, y=420)

        self.reset = Button(self.window, text="Pi", width=4, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                            command=self.pi_val, relief=RAISED, bd=3)
        self.reset.place(x=95 ,y=420)

        self.sin = Button(self.window, text="sin", width=5, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                               command=lambda: self.opr("sin"), relief=RAISED, bd=3)
        self.sin.place(x=10, y=490)

        self.cos = Button(self.window, text="cos", width=4, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                            command=lambda: self.opr("cos"), relief=RAISED, bd=3)
        self.cos.place(x=95, y=490)

        self.tan = Button(self.window, text="tan", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                                command=lambda: self.opr("tan"), relief=RAISED, bd=3)
        self.tan.place(x=200, y=490)
        self.cot = Button(self.window, text="cot", width=3, font=("arial", 15, "bold"), fg="red",bg="#262626", activebackground="#262626",
                                command=lambda: self.opr("cot"), relief=RAISED, bd=3)
        self.cot.place(x=295, y=490)

        self.bye = Button(self.window, text="Exit", width=47, font=("arial", 15, "bold"), bg="#262626", fg="green", activebackground="#262626",
                           command=self.tata, relief=RAISED, bd=3)
        self.bye.place(x=10, y=560)

        self.lcm = Button(self.window, text="LCM", width=3, font=("arial", 15, "bold"), bg="#262626", fg="red", activebackground="#262626",
                           command=lambda : self.opr("lcm"), relief=RAISED, bd=3)
        self.lcm.place(x=200, y=420)

        self.hcf = Button(self.window, text="HCF", width=3, font=("arial", 15, "bold"), bg="#262626", fg="red", activebackground="#262626",
                           command=lambda : self.opr("hcf"), relief=RAISED, bd=3)
        self.hcf.place(x=295, y=420)

    def widget(self):
        Label(self.window,text="Scientific Calculator Dolly",font=("arial",25,"bold","italic"),fg="orange",bg="#141414").place(x=100,y=5)

        self.result_name = Label(self.window, text="Result: ", width=8, font=("arial", 16, "bold", "italic"),
                                  fg="#00FF00",bg="#141414")
        self.result_name.place(x=40, y=65)

        self.result = Entry(self.window,font=("Helvetica",20,"bold","italic"),textvar=self.text_value, bd=5, relief=SUNKEN, disabledbackground="#3d3d3d", disabledforeground="gold", state=DISABLED)
        self.result.place(x=140,y=55)

        self.butn()
        self.take_input()

    def take_input(self):
        Label(self.window, text="Number 1 ",width=8, font=("arial", 15, "bold","italic"),bg="#141414",fg="#00FF00").place(x=20, y=175)

        self.number1 = Entry(self.window,width=8,bg="#3d3d3d",font=("arial",20,"bold","italic"), insertbackground="gold",
                             fg="gold",bd=3,relief=SUNKEN)
        self.number1.place(x=130,y=170)

        self.number1.focus()

        Label(self.window, text="Number 2 ", width=8, font=("arial", 16, "bold", "italic"),
        fg="#00FF00", bg="#141414").place(x=340, y=175)

        self.number2 = Entry(self.window, width=8, bg="#3d3d3d", font=("arial", 20, "bold", "italic"), insertbackground="gold",
                             fg="gold", relief=SUNKEN, bd=4)
        self.number2.place(x=455, y=170)

        self.operator_name = Label(self.window, text="Operation ", width=12, font=("arial", 17, "bold", "italic"), bg="#141414", fg="#d96b6b")
        self.operator_name.place(x=100, y=120)

        self.operator = Entry(self.window, width=12, font=("arial", 20, "bold", "italic"), disabledbackground="#3d3d3d",disabledforeground="gold",
                              state="disable",textvar=self.textoperator,bd=5,relief=SUNKEN)
        self.operator.place(x=250, y=117)


    def pi_val(self):
        messagebox.showinfo("Value of pi","The value of pi is: 3.14159265")
    def reset_now(self):
        self.textoperator.set(" ")
        self.text_value.set(" ")
    def tata(self):
        self.decision = messagebox.askyesno("Conformation","Do you want to exit right now?")
        if self.decision>0:
            window.destroy()
        else:
            pass

    def information(self):
        self.window_information = Toplevel()
        self.window_information.title("Information")
        self.window_information.geometry("500x400")
        self.window_information.iconbitmap("calculator.ico")
        self.window_information.maxsize(500,400)
        self.window_information.minsize(500,400)
        self.window_information.config(bg="#262626")

        Label(self.window_information,fg="#00FF00",font=("arial",11,"bold","italic"),
        text="1.Write number and select operator at first, then click on equal(=) sign.", bg="#262626").place(x=5,y=15)

        Label(self.window_information, fg="#00FF00", font=("arial", 12, "bold", "italic"), bg="#262626",
        text="2.For single digit operation(e.g. rad,exponent,Reciprocal(1/x),").place(x=5, y=50)

        Label(self.window_information, fg="#00FF00", font=("arial", 12, "bold", "italic"), bg="#262626",
        text="square,cube,square root,cube root,log,factorial(n!),exponent etc.)").place(x=5, y=70)

        Label(self.window_information, fg="#00FF00", font=("arial", 12, "bold", "italic"), bg="#262626",
        text="only write number input in the 'Number1' but not write ").place(x=5, y=90)

        Label(self.window_information, fg="#00FF00", font=("arial", 12, "bold", "italic"), bg="#262626",
        text="input in 'Number2' .After that select favourable operator and go.").place(x=5, y=110)

        Label(self.window_information, fg="#00FF00", font=("arial", 15, "bold", "italic"), bg="#262626",
        text="Best of luck!").place(x=180, y=200)

        Label(self.window_information, fg="#00FF00", font=("arial", 12, "bold", "italic"), bg="#262626",
        text="3.For single no. operation,if there is present two no. in 'Number1'").place(x=5, y=140)

        Label(self.window_information, fg="#00FF00", font=("arial", 12, "bold", "italic"), bg="#262626",
         text="and 'Number2', only input number in 'Number1' will taken.").place(x=5, y=160)

        self.window_information.mainloop()

    def opr(self,work):
        self.work = work
        self.textoperator.set(self.work)


    def evaluation_opr(self):
        self.n1 = (self.number1.get())
        self.n2 = (self.number2.get())
        self.work_done = self.textoperator.get()
        if self.work_done=="+":
            try:
                result_take = eval(self.n1)+eval(self.n2)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="-":
            try:
               result_take = eval(self.n1)-eval(self.n2)
               self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="X":
            try:
                result_take = eval(self.n1)*eval(self.n2)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="/":
            try:
                result_take = eval(self.n1)/eval(self.n2)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except ZeroDivisionError:
                self.text_value.set("Can not divide by zero")
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()

        elif self.work_done=="Reciprocal":
            try:
                result_take = round(1.0/eval(self.n1),2)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except ZeroDivisionError:
                self.text_value.set("Can not divide by zero")
            except:
                messagebox.showerror("Input Error","Please write number in the right position.Please read the information carefully")
                self.information()
                self.reset_now()

        elif self.work_done=="Square":
            try:
                result_take = eval(self.n1) ** 2.0
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="Cube":
            try:
               result_take = eval(self.n1) ** 3.0
               self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="Square root":
            try:
                result_take = eval(self.n1)**0.5
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "Cube root":
            try:
                result_take = round(eval(self.n1)**(1/3),2)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()

        elif self.work_done == "Exponent":
            try:
                result_take = math.exp(eval(self.n1))
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="x^y":
            try:
                result_take = eval(self.n1) ** eval(self.n2)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="Factorial":
            try:
                for i in range(1,eval(self.n1)+1):
                    self.fact= self.fact * i
                self.text_value.set(int(self.fact)) if int(self.fact) == self.fact else self.text_value.set(self.fact)

                self.fact=1
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="lcm":
            try:
                if eval(self.n1)>eval(self.n2):
                    result_take = (eval(self.n1)*eval(self.n2))/math.gcd(eval(self.n1),eval(self.n2))
                    self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
                else:
                    result_take = (eval(self.n2)*eval(self.n1))/math.gcd(eval(self.n2),eval(self.n1))
                    self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done=="hcf":
            try:
                if eval(self.n1) > eval(self.n2):
                    result_take = math.gcd(eval(self.n1),eval(self.n2))
                    self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
                else:
                    result_take = math.gcd(eval(self.n2), eval(self.n1))
                    self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "log2":
            try:
                result_take = math.log2(eval(self.n1))
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "log10":
            try:
                result_take = math.log10(eval(self.n1))
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "Modulus":
            try:
                result_take = eval(self.n1)%eval(self.n2)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "Radian":
            try:
                self.text_value.set(round(math.radians(eval(self.n1)),3))
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "sin":
            try:
                result_take = round(math.sin(math.radians(eval(self.n1))),1)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "cos":
            try:
                result_take = round(math.cos(math.radians(eval(self.n1))),1)
                self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "tan":
            try:
                if eval(self.n1) == 90:
                    self.text_value.set("Infinite")
                else:
                    result_take = round(math.tan(math.radians(eval(self.n1))),1)
                    self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        elif self.work_done == "cot":
            try:
                if eval(self.n1) == 0:
                    self.text_value.set("Infinite")
                else:
                    result_take = round(1/(math.tan(math.radians(eval(self.n1)))),1)
                    self.text_value.set(int(result_take)) if int(result_take) == result_take else self.text_value.set(result_take)
            except:
                messagebox.showerror("Error","Something error in input.please check it.")
                self.information()
                self.reset_now()
        else:
            messagebox.showerror("Error","Please read the information carefully at first.")
            self.information()
            self.reset_now()

        self.number1.focus()

if __name__ == '__main__':
    window = Tk()
    window.title("Smart Scientific Calculator")
    window.config(bg='#141414')
    window.iconbitmap("calculator.ico")
    window.geometry("600x620")
    window.maxsize(600,620)
    window.minsize(600,620)
    Calculator(window)
    window.mainloop()
