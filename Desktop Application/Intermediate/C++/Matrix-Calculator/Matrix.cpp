/*#include "Matrix.h"
#include <iostream>
#include <cassert>

using namespace std ;

template<typename t>
Matrix<t>::Matrix(int rows , int columes){

     row = rows ;
     col = columes ;
     arr = new t*[rows] ;

     for( int i = 0 ; i < row ; i++)
          arr[i] = new t [col] ;

}


template<typename t>
Matrix<t> Matrix<t>::operator+(Matrix<t> &mat){

     Matrix<t> result( row , col ) ;
     t value ;

     for( int i = 0 ; i < mat.row ; i++){
          for( int j = 0 ; j < mat.col ; j++){

               value = this->getvalue(i,j) + mat.getvalue(i , j) ;
               result.setvalue(i,j,value) ;
          }
     }
     return result ;

}


template<typename t>
Matrix<t> Matrix<t>::operator-( Matrix<t> mat){

     Matrix<t> result( row , col ) ;
     t value ;

     for( int i = 0 ; i < row ; i++){
          for( int j = 0 ; j < col ; j++){

               value = this->getvalue(i,j) - mat.getvalue(i , j) ;
               result.setvalue(i,j,value) ;
          }
     }
     return result ;
}


template<typename t>
Matrix<t> Matrix<t>::transpose(){

     Matrix<t> transMatrix(col , row ) ;
     t value ;

     for( int i = 0 ; i < row ; i++){
          for( int j = 0 ; j < col ; j++){
               value = this->getvalue(i , j ) ;

               transMatrix.setvalue(j , i , value ) ;

          }
     }
     return transMatrix ;
}


template<typename t>
Matrix<t> Matrix<t>::operator*( Matrix<t> mat ){

     Matrix<t> multiMatrix( this->row , mat.getcol()) ;

     for( int i = 0 ; i <this->row ; i++){
          for( int j = 0 ; j < mat.getcol() ; j++){
               t value = 0 ;

               for( int k = 0 ; k < mat.getrow() ; k++){

                    value += *(*(arr+i)+k) * mat.getvalue(k , j) ;
               }
               multiMatrix.setvalue( i , j , value) ;
          }
     }
     return multiMatrix ;

}


template<typename t>
Matrix<t>::~Matrix(){

     for( int i = 0 ; i < row ; i++)
          delete [] arr[i] ;

     delete [] arr ;
}
*/
