# US States Game

This is a simple interactive game that challenges players to name all 50 states of the United States. The game uses the `turtle` graphics module to display the map and the `pandas` library to handle the state data.

## Features

- Displays a map of the United States.
- Allows users to input state names.
- Keeps track of correctly guessed states.
- Exits the game and saves the list of missing states to a CSV file if the user chooses to exit.

## Requirements

- Python 3.x
- `turtle` module
- `pandas` module

## How to Play

1. Run the game.
2. A map of the United States will appear.
3. Enter the names of the states one by one.
4. The game will keep track of the states you have correctly guessed.
5. Type "Exit" to stop the game and save the list of states you missed to `missing_states.csv`.

## Setup

1. Ensure you have Python installed on your machine.
2. Install the required modules if you don't already have them:
   ```bash
   pip install pandas
   ```
3. Download or clone the repository to your local machine.

## Running the Game

1. Ensure you have the necessary files in the same directory:
   - `main.py` (the main game script)
   - `blank_states_img.gif` (the map image file)
   - `50_states.csv` (the CSV file containing state names and coordinates)
   
2. Run the game:
   ```bash
   python main.py
   ```

## CSV File Format

The `50_states.csv` file should have the following columns:
- `state`: The name of the state.
- `x`: The x-coordinate for the state's position on the map.
- `y`: The y-coordinate for the state's position on the map.

Example:
```csv
state,x,y
Alabama,139,-77
Alaska,-203,-226
...
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


