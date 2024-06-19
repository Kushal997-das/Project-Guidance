# Quiz Application

<p align="center"><img src="https://github.com/sahuf2003/QUIZ-GUI-/blob/main/images/quizlol.png" alt="gif" height="300px" width="550px" ok"/><br></p>
<br>



![](https://img.shields.io/badge/Programming_Language-Python-blue.svg)
![](https://img.shields.io/badge/Main_Tool_Used-Tkinter-orange.svg)
![](https://img.shields.io/badge/Support_Tool_Used-smtplib,requests-orange.svg)
![](https://img.shields.io/badge/Python_Version-3.12-blue.svg)
![](https://img.shields.io/badge/Application-Quiz-brown.svg)
![](https://img.shields.io/badge/APi_used-Trivia-red.svg)
![](https://img.shields.io/badge/Status-Complete-green.svg)


---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project_Screenshots](#Project-Screenshots)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributor](#contributor)

## Introduction
Welcome to the Trivia Quiz Application! This project is a fun and interactive quiz application that leverages a trivia API to fetch questions and provides a user-friendly interface using `tkinter`. It also integrates email functionality via `smtplib` to send quiz results. The project is built using Object-Oriented Programming (OOP) principles to ensure modularity and maintainability.

## Features
- Fetch trivia questions from an API.
- Interactive GUI built with `tkinter`.
- Email quiz results using `smtplib`.
- OOP design for better code organization and extensibility.

## Installation
To get a local copy up and running, follow these simple steps:

1. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

## Usage
To start the application, run the following command:
```sh
python main.py
```
A GUI window will open, allowing you to start the quiz, answer questions, and submit your results via email.

## Project Screenshots
<p align="center"><img src="https://github.com/sahuf2003/QUIZ-GUI-/blob/main/images/quiz.png" alt="gif" height="300px" width="550px" ok"/><br></p>

<br>
<p align="center"><img src="https://github.com/sahuf2003/QUIZ-GUI-/blob/main/images/right_and_wrong_answer.png" alt="gif" height="300px" width="550px" ok"/><br></p>


## Project Structure
```
quiz-app/
│
├── images/              # Contains images used in the GUI
│   ├── false.png
│   └── true.png
├── main.py             # Entry point of the application
├── ui.py               # Contains the Tkinter GUI class
├── quiz_brain.py       # Contains logic of quiz
├── question_model.py   # Contains Question class 
├── data.py             # Contains the api request
├── players.csv         # Stores the user data in csv file
│
└── requirements.txt    # List of dependencies
```

## Dependencies
- `tkinter`: For the GUI.
- `smtplib`: For sending emails.
- `requests`: For making API requests.
- Trivia API: Used to fetch trivia questions (e.g., Open Trivia Database).

You can install all dependencies using:
```sh
pip install -r requirements.txt
```

## Contributor

<table>
  <tr>
    <td align="center">
    <a href="https://github.com/sahuf2003" target="_black">
    <img src="https://github.com/sahuf2003.png" width="150px;" alt="Sahuf Shaikh"/>
    <br />
    <sub><b>Sahuf Shaikh</b></sub></a>
    </td>
    
    
  </tr>
 </table>
