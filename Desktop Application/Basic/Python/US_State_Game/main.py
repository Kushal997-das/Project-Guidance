import turtle
from turtle import Screen
import pandas


screen = Screen()
image = "blank_states_img.gif"
screen.addshape(image)
turtle.shape(image)


data = pandas.read_csv("50_states.csv")
state_data = data.state.to_list()

guessed_states = []

while len(guessed_states) < 50:
    answer = screen.textinput(title=f"Your score is {len(guessed_states)}/50", prompt="Name another state:").title()

    if answer is None: 
        break

    if answer == 'Exit':
        missing_states = [state for state in state_data if state not in guessed_states]
        new_data = pandas.DataFrame(missing_states)
        new_data.to_csv("missing_states.csv")
        break

    if answer in state_data and answer not in guessed_states:
        guessed_states.append(answer)
        t = turtle.Turtle()
        t.penup()
        t.hideturtle()
        state = data[data.state == answer]
        t.goto(int(state.x.iloc[0]), int(state.y.iloc[0]))  
        t.write(answer)
