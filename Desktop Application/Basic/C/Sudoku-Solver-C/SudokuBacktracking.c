#include<stdio.h>
#include<stdbool.h>
#define N 9

// A utility function to print the grid
void printGrid(int grid[N][N]){
	printf("+-----+-----+-----+\n");
	for(int row=0;row<N;row++){
		for(int col=0;col<N;col++)
			printf("|%d",grid[row][col]);
		printf("|\n");
		if((row+1)%3==0)printf("+-----+-----+-----+\n");
	}
}

//A utility function to check for unassigned place
bool FindUnassignedPlace(int grid[N][N],int *row,int *col){
	for(int i=0;i<N;i++){
		for(int j=0;j<N;j++)
			if(grid[i][j]==0){
				*row=i;
				*col=j;
				return true;
			}
		}
	return false;
}

/*Returns true if the num is used in the row*/
bool UsedInRow(int grid[N][N],int row,int num){
	for(int col=0;col<N;col++){
		if(grid[row][col]==num)
			return true;
	}
	return false;
}

/*Returns true if the num is used in the col*/
bool UsedInCol(int grid[N][N],int col,int num){
	for(int row=0;row<N;row++){
		if(grid[row][col]==num)
			return true;
	}
	return false;
}

/*Returns true if the num is used in the 3*3 grid*/
bool UsedInBox(int grid[N][N],int startRow,int startCol,int num){
	for(int row=0;row<3;row++){
		for(int col=0;col<3;col++){
			if(grid[row+startRow][col+startCol]==num)
				return true;
		}
	}
	return false;
}

bool isSafe(int grid[N][N],int row,int col,int num){
	return (!UsedInRow(grid,row,num) && !UsedInCol(grid,col,num) && !UsedInBox(grid,row-row%3,col-col%3,num) && grid[row][col]==0);
}

bool solveSudoku(int grid[N][N])
{
    int row, col;
 
    // If there is no unassigned location,
    // we are done
    if (!FindUnassignedPlace(grid,&row,&col))
        // success!
        return true;
    // Consider digits 1 to 9
    for (int num = 1; num <= 9; num++)
    {
         
        // Check if looks promising
        if (isSafe(grid, row, col, num))
        {
             
            // Make tentative assignment
            grid[row][col] = num;
 
            // Return, if success
            if (solveSudoku(grid))
                return true;
 
            // Failure, unmake & try again
            grid[row][col] = 0;
        }
    }
    
    // This triggers backtracking
    return false;
}

// Driver program
int main(){
	int grid[N][N]={ { 3, 0, 6, 5, 0, 8, 4, 0, 0 },
                       { 5, 2, 0, 0, 0, 0, 0, 0, 0 },
                       { 0, 8, 7, 0, 0, 0, 0, 3, 1 },
                       { 0, 0, 3, 0, 1, 0, 0, 8, 0 },
                       { 9, 0, 0, 8, 6, 3, 0, 0, 5 },
                       { 0, 5, 0, 0, 9, 0, 6, 0, 0 },
                       { 1, 3, 0, 0, 0, 0, 2, 5, 0 },
                       { 0, 0, 0, 0, 0, 0, 0, 7, 4 },
                       { 0, 0, 5, 2, 0, 6, 3, 0, 0 } };
    if(solveSudoku(grid)==true)
    	printGrid(grid);
    else
    	printf("No solution exits");
    return 0;
}
