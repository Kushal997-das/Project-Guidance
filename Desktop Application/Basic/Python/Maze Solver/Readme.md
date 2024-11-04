# Maze Solver Application
This application provides an interactive way to visualize and solve a maze using a depth-first search (DFS) algorithm. Users can load a maze from a .txt file, solve it, and view the solution and explored states visually.

## Components and Functions
### Load Maze:
- Button: Loads a maze file.
- File Format: The maze must be in a .txt format, using:
  - A for the starting point,
  - B for the goal,
  - '#' for walls,
  - Spaces ( ) for open paths.
- Usage: Click “Load Maze” and select a .txt file with a properly formatted maze.

### Solve Maze:

- Button: Solves the loaded maze using the depth-first search algorithm.
- Algorithm: A StackFrontier implements DFS by exploring paths until the goal (B) is reached, recording explored states and marking the solution path.
- Output: Displays the number of explored states and highlights the solution path on the maze.

## How to Load and Solve a Maze
- Load the Maze: Click “Load Maze” and select a .txt file with the maze layout.
- Solve the Maze: After loading, click “Solve Maze” to visualize the solution.
- View Results: The solution path and explored cells appear in the image, with counts of explored states displayed.

## Example

Input maze.txt in format:
![Screenshot (3094)](https://github.com/user-attachments/assets/23d03ef6-23dc-4fd7-afc1-08173969359c)

Loading image into the interface:
![Screenshot (3097)](https://github.com/user-attachments/assets/49559047-c2bd-452c-95ff-af77cb7ba775)
The file has been loaded and saved in the form of .png file with the name 'temp_maze.png'
