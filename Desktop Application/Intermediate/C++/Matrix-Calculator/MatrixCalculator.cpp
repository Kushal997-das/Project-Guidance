#include "Matrix.h"
#include "MatrixCalculator.h"
#include <iostream>

using namespace std ;

void MatrixCalculator::menu(){
     int ch = -1 ;
     while( true ){
          ch = -1 ;
          while( ch == -1 ){
          cout << "\n Welcome to (Your Name) Matrix Calculator \n " ;
          cout << "1- Perform Matrix Addition \n " ;
          cout << "2- Perform Matrix Subtraction \n " ;
          cout << "3- Perform Matrix Multiplication \n " ;
          cout << "4- Matrix Transpose \n " ;
          cout << "5- Exit \n " ;

          cin >> ch ;

          if( ch > 5 || ch < 1){

               cout << "invalid choice \n" ;
               ch = -1 ;
          }
     }
     if( ch == 1 )add() ;
     else if( ch == 2 )sub() ;
     else if( ch == 3 )multi() ;
     else if( ch == 4 )trans() ;
     else{
          cout << "Thanks for using " ;
          break ;
     }
     }
}


void MatrixCalculator::add(){

     int row , col ;

     cin >> row >> col ;
     Matrix<double> mat1( row , col ) ;
     cin >> mat1 ;

     cin >> row >> col ;
     Matrix<double> mat2( row , col ) ;
     cin >> mat2 ;

     Matrix<double> sumMat ;

     sumMat = mat1 + mat2 ;

     cout << sumMat ;

}


void MatrixCalculator::sub(){

     int row , col ;

     cin >> row >> col ;
     Matrix<double> mat1( row , col ) ;
     cin >> mat1 ;

     cin >> row >> col ;
     Matrix<double> mat2( row , col ) ;
     cin >> mat2 ;

     Matrix<double> subMat ;

     subMat = mat1 - mat2 ;

     cout << subMat ;

}


void MatrixCalculator::multi(){

     int row , col ;

     cin >> row >> col ;
     Matrix<double> mat1( row , col ) ;
     cin >> mat1 ;

     cin >> row >> col ;
     Matrix<double> mat2( row , col ) ;
     cin >> mat2 ;

     if( mat1.getcol() != mat2.getrow() ){

          cout << "Invalid process" << endl ;
          return;
     }

     Matrix<double> multiMat ;
     multiMat = mat1 *mat2 ;

     cout << multiMat ;

}


void MatrixCalculator::trans(){

     int row , col ;

     cin >> row >> col ;
     Matrix<int> mat1( row , col ) ;
     cin >> mat1 ;

     Matrix<int> transMat ;

     transMat = mat1.transpose() ;

     cout << transMat ;


}
