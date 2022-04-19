def is_valid(grid, row, col, num):
    for i in range(9):
        if grid[i][col] == num:
            return False

    for j in range(9):
        if grid[row][j] == num:
            return False

    corner_row = row - row % 3
    corner_col = col - col % 3

    for i in range(3):
        for j in range(3):

            if grid[i + corner_row][j + corner_col] == num:
                return False

    return True


def solve(grid, row, col):
    if col == 9:
        if row == 8:
            return True
        row += 1
        col = 0

    if grid[row][col] > 0:
        return solve(grid, row, col + 1)

    for num in range(1, 10):

        if is_valid(grid, row, col, num):

            grid[row][col] = num

            if solve(grid, row, col + 1):
                return True

        grid[row][col] = 0

    return False


grid = []

for i in range(0, 9):
    grid.append([int(j) for j in input().split()])

if (solve(grid, 0, 0)):

    for i in range(9):
        for j in range(9):
            print(grid[i][j], end=" ")

        print()

else:
    print("No solution")

