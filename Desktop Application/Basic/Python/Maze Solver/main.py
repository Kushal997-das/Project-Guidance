import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image, ImageTk

class Node:
    def __init__(self, state, parent, action):
        self.state = state
        self.parent = parent
        self.action = action

class StackFrontier:
    def __init__(self):
        self.frontier = []

    def add(self, node):
        self.frontier.append(node)

    def contains_state(self, state):
        return any(node.state == state for node in self.frontier)

    def empty(self):
        return len(self.frontier) == 0

    def remove(self):
        if self.empty():
            raise Exception("Frontier is empty")
        else:
            node = self.frontier[-1]
            self.frontier = self.frontier[:-1]
            return node

class Maze:
    def __init__(self, filename):
        with open(filename) as f:
            contents = f.read()

        if contents.count("A") != 1:
            raise Exception("Maze must have exactly one starting point.")
        if contents.count("B") != 1:
            raise Exception("Maze must have exactly one finishing point.")

        contents = contents.splitlines()
        self.height = len(contents)
        self.width = max(len(line) for line in contents)

        self.walls = []
        for i in range(self.height):
            row = []
            for j in range(self.width):
                try:
                    if contents[i][j] == "A":
                        self.start = (i, j)
                        row.append(False)
                    elif contents[i][j] == "B":
                        self.goal = (i, j)
                        row.append(False)
                    elif contents[i][j] == " ":
                        row.append(False)
                    else:
                        row.append(True)
                except IndexError:
                    row.append(False)
            self.walls.append(row)

        self.solution = None

    def neighbors(self, state):
        row, col = state
        candidates = [
            ("up", (row - 1, col)),
            ("down", (row + 1, col)),
            ("left", (row, col - 1)),
            ("right", (row, col + 1))
        ]
        result = []
        for action, (r, c) in candidates:
            if 0 <= r < self.height and 0 <= c < self.width and not self.walls[r][c]:
                result.append((action, (r, c)))
        return result

    def solve(self):
        self.num_explored = 0
        start = Node(state=self.start, parent=None, action=None)
        frontier = StackFrontier()
        frontier.add(start)
        self.explored = set()

        while True:
            if frontier.empty():
                raise Exception("No solution")

            node = frontier.remove()
            self.num_explored += 1

            if node.state == self.goal:
                actions = []
                cells = []
                while node.parent is not None:
                    actions.append(node.action)
                    cells.append(node.state)
                    node = node.parent
                actions.reverse()
                cells.reverse()
                self.solution = (actions, cells)
                return

            self.explored.add(node.state)

            for action, state in self.neighbors(node.state):
                if not frontier.contains_state(state) and state not in self.explored:
                    child = Node(state=state, parent=node, action=action)
                    frontier.add(child)

    def output_image(self, filename, show_solution=True, show_explored=False):
        from PIL import Image, ImageDraw
        cell_size = 50
        cell_border = 2

        img = Image.new("RGBA", (self.width * cell_size, self.height * cell_size), "black")
        draw = ImageDraw.Draw(img)
        solution = self.solution[1] if self.solution is not None else None

        for i, row in enumerate(self.walls):
            for j, col in enumerate(row):
                if col:
                    fill = (40, 40, 40)
                elif (i, j) == self.start:
                    fill = (38, 32, 224)
                elif (i, j) == self.goal:
                    fill = (0, 171, 28)
                elif solution is not None and show_solution and (i, j) in solution:
                    fill = (220, 235, 113)
                elif solution is not None and show_explored and (i, j) in self.explored:
                    fill = (212, 97, 85)
                else:
                    fill = (237, 240, 252)

                draw.rectangle(
                    [
                        (j * cell_size + cell_border, i * cell_size + cell_border),
                        ((j + 1) * cell_size - cell_border, (i + 1) * cell_size - cell_border)
                    ],
                    fill=fill
                )

        img.save(filename)

class MazeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Maze Solver")
        self.root.geometry("600x700")
        
        # Frame for buttons
        self.controls_frame = tk.Frame(self.root)
        self.controls_frame.pack(pady=10)

        # Load Maze Button
        self.load_button = tk.Button(self.controls_frame, text="Load Maze", command=self.load_maze, background="white")
        self.load_button.pack(side=tk.LEFT, padx=5)

        # Solve Maze Button
        self.solve_button = tk.Button(self.controls_frame, text="Solve Maze", command=self.solve_maze, background="white")
        self.solve_button.pack(side=tk.LEFT, padx=5)

        # Canvas to display the maze
        self.canvas = tk.Canvas(self.root, width=500, height=500, bg="white")
        self.canvas.pack(pady=20)

        # Label for displaying stats
        self.stats_label = tk.Label(self.root, text="", font=("Arial", 12))
        self.stats_label.pack()

        self.maze = None
        self.image = None
    
    def load_maze(self):
        filename = filedialog.askopenfilename(title="Select Maze File", filetypes=[("Text Files", "*.txt")])
        
        if filename:
            try:
                self.maze = Maze(filename)
                self.display_maze()
            except Exception as e:
                messagebox.showerror("Error", f"Failed to load maze: {str(e)}")
    
    def display_maze(self):
        if self.maze:
            self.maze.output_image("temp_maze.png", show_solution=False)
            self.image = Image.open("temp_maze.png")
            self.image = self.image.resize((500, 500), Image.LANCZOS)
            self.photo = ImageTk.PhotoImage(self.image)
            self.canvas.create_image(0, 0, anchor=tk.NW, image=self.photo)
    
    def solve_maze(self):
        if self.maze:
            try:
                self.maze.solve()
                self.stats_label.config(text=f"States Explored: {self.maze.num_explored} \n Understanding pigmentation:\nBlue: Starting Point\tGreen: Ending Point\nYellow: Solution path of the maze\tRed: Incorrect path traversed by the program\nWhite: All possible path in the maze\tBlack: Walls")
                self.display_solution()
            except Exception as e:
                messagebox.showerror("Error", f"Failed to solve maze: {str(e)}")
        else:
            messagebox.showwarning("Warning", "Please load a maze first.")

    def display_solution(self):
        self.maze.output_image("solved_maze.png", show_solution=True, show_explored=True)
        self.image = Image.open("solved_maze.png")
        self.image = self.image.resize((500, 500), Image.LANCZOS)
        self.photo = ImageTk.PhotoImage(self.image)
        self.canvas.create_image(0, 0, anchor=tk.NW, image=self.photo)

if __name__ == "__main__":
    root = tk.Tk()
    app = MazeApp(root)
    root.mainloop()
