

    



  <h3 align="center"> Guess the Word </h3>

  <p align="center">
 A simple guess the word game made in python 
    <br />
   
  





<details>
  <summary><b>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
   </ul>
    </li>
    <li><a href="#usage">Logic and Usage</a></li>
  
  </ol>
</details>




## About The Project

In this game you will be given a riddle like question. The answer to these questions will be a single word. Getting the question correct will fetch you one point. If you get three or more questions wrong, you lose and the game ends.

<p align="right">(<a href="#top">back to top</a>)</p>


<hr>

### Built With

* [Python](https://www.python.org/)


<p align="right">(<a href="#top">back to top</a>)</p>




## Getting Started



### Prerequisites

There are no prerequisites for running this program.





<p align="right">(<a href="#top">back to top</a>)</p>




## Logic and Usage

The program has a **Question pool**. This is a python dictionary which consists of a question and it's respective solution.
```
question_book  = {

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
```
The program then fetches five questions from this question pool making sure that there are no repetitions.

```
tab  = (random.sample(question_book.keys(), 5)) # stores the questions
```
Then the program enters a loop:
* If the user enters a wrong answer : We increment the value of *wrong* and check if the number of wrong answers are greater than or equal to three. The loops breaks if the user have attempted three questions incorectly.
* If the user answers the question correctly: The programs congratulates the user and moves to the next question.

Finally after playing the game, a scoreboard is shown which shows the number of correct answers and incorrect answers entered by the user.

*Contributed by Shubham Singh for GSSoC'22*











