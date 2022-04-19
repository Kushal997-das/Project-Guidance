#include <iostream>
#include "MatrixCalculator.h"
#include "Matrix.h"

using namespace std;
/*
template<typename t>
istream & operator>>( istream& input , Matrix<t> &mat ){

     t value ;

     for( int i = 0 ; i < mat.getrow() ; i++){
          for( int j = 0 ; j < mat.getcol() ; j++){

               input >> value ;
               mat.setvalue(i,j,value) ;
          }
     }
     return input ;
}

template<typename t>
ostream& operator<<( ostream& output , Matrix<t> &mat ){

     t value ;

     for( int i = 0 ; i < mat.getrow() ; i++){
          for( int j = 0 ; j < mat.getcol() ; j++){
               value = mat.getvalue(i,j) ;
               output << value << " " ;
          }
          cout << endl ;
     }
     return output ;

}
*/




int main()
{
    /*Matrix matrix1(2,2) , matrix2(2,2) ;


    cin >> matrix1 >> matrix2 ;

    Matrix matrixSum ;
    matrixSum = matrix1 + matrix2 ;
    Matrix matrixSub ;
    matrixSub = matrix1 - matrix2 ;

    Matrix matrixTransprose , multimatrix ;
    matrixTransprose = matrix1.transpose() ;

    multimatrix = matrix1 * matrix2 ;

    cout <<"\n The sum of 2 matrices : \n" << matrixSum << "\n" ;
    cout <<"\n The sub of 2 matrices : \n" << matrixSub << "\n" ;
    cout <<"\n The transpose of matrix 1 is : \n" << matrixTransprose << "\n" ;
    cout << "\n The multiplication of matrix 1 and matrix 2 is : \n" << multimatrix ;*/

    MatrixCalculator Mat;
    Mat.menu() ;
}
