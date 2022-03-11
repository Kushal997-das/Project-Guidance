#include<stdio.h>
#include<stdlib.h>
//N--->size of 2D matrix N*N
#define N 9

//A utility function to print grid
void print(int arr[N][N]){
	printf("+-----+-----+-----+\n");
	for(int row=0;row<N;row++){
		for(int col=0;col<N;col++)
			printf("|%d",arr[row][col]);
		printf("|\n");
		if((row+1)%3==0)printf("+-----+-----+-----+\n");
	}
}

/*Checks whether it will be legal to assign
num to the given row, column*/
int isSafe(int grid[N][N], int row, int col, int num){
	//Checks whether the same num exists in that row, if exists it return 0
	for(int j=0;j<N;j++){
		if(grid[row][j]==num)
			return 0;
	}
	//Checks whether the same num exists in that col, if exists it return 0
	for(int i=0;i<N;i++){
		if(grid[i][col]==num)
			return 0;
	}
	//Check if we find the same num in the particular
	//3*3 matrix, we return 0
	int startRow=row-row%3,startCol=col-col%3;
	for(int i=0;i<3;i++){
		for(int j=0;j<3;j++){
			if(grid[i+startRow][j+startCol]==num)
				return 0;
		}
	}
	return 1;
}

/* Assigns values to all unassigned locations in such
a way to meet the requirements for Sudoku solution
i.e., non-duplication across rows, columns, and boxes */
int solveSudoku(int grid[N][N],int row,int col){
	//Checks whether we reached the end of the grid(i.e., 8th row and 9th col) or not.
	if(row==N-1 && col==N)
		return 1;
	
	//Checks if we reached end of the col, we move to 
	//next row and column resets to 0
	if(col==N){
		row++;
		col=0;
	}
	
	// Check if the current pos of the grid already contains
	// value>0, we iterate for next column
	if(grid[row][col]>0)
		return solveSudoku(grid,row,col+1);
	for(int num=1;num<=N;num++){
		
		// if it is safe to place the num in the position, assign it and move to next col
		if(isSafe(grid,row,col,num)==1){
			/* assuming our assigned num in the
			position is correct*/
			grid[row][col]=num;
		//moving to next column
		if(solveSudoku(grid,row,col+1)==1)
			return 1;
		}
	//Removing the assigned num, since our assumption is wrong
	// and we go for next assumption with another num value
	grid[row][col]=0;
	}
	return 0;
}

//Driver program
int main(){
	// 0 means unassigned cells
    int grid[N][N] = { { 3, 0, 6, 5, 0, 8, 4, 0, 0 },
                       { 5, 2, 0, 0, 0, 0, 0, 0, 0 },
                       { 0, 8, 7, 0, 0, 0, 0, 3, 1 },
                       { 0, 0, 3, 0, 1, 0, 0, 8, 0 },
                       { 9, 0, 0, 8, 6, 3, 0, 0, 5 },
                       { 0, 5, 0, 0, 9, 0, 6, 0, 0 },
                       { 1, 3, 0, 0, 0, 0, 2, 5, 0 },
                       { 0, 0, 0, 0, 0, 0, 0, 7, 4 },
                       { 0, 0, 5, 2, 0, 6, 3, 0, 0 } };
 
    if (solveSudoku(grid, 0, 0)==1)
        print(grid);
    else
        printf("No solution exists");
 
    return 0;
}
