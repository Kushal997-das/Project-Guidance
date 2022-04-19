#ifndef MATRIX_H
#define MATRIX_H
#include <iostream>
#include <cassert>

using namespace std ;

template<typename t>

class Matrix
{
private:

     t **arr ;
     int row , col ;

public:

     Matrix(){row = col = 0 , arr = nullptr ;}
     Matrix( int , int ) ;
     void setvalue( int i , int j , t value ){ *(*(arr+i)+j) = value ; }
     t getvalue(int i , int j ){return *(*(arr+i)+j) ; }
     int getrow(){return row ; }
     int getcol(){return col ; }
     template<typename t1 >
     friend istream& operator>>( istream & , Matrix<t1> & ) ;
     template<typename t2 >
     friend ostream& operator<<( ostream &, Matrix<t2> & ) ;
     Matrix operator+( Matrix<t> & ) ;
     Matrix operator-( Matrix<t> &  ) ;
     Matrix transpose() ;
     Matrix operator*( Matrix<t> & ) ;
     ~Matrix() ;
};



template<typename t1>
istream & operator>>( istream& input , Matrix<t1> &mat ){

     t1 value ;

     for( int i = 0 ; i < mat.getrow() ; i++){
          for( int j = 0 ; j < mat.getcol() ; j++){

               input >> value ;
               mat.setvalue(i,j,value) ;
          }
     }
     return input ;
}

template<typename t2>
ostream& operator<<( ostream& output , Matrix<t2> &mat ){

     t2 value ;

     for( int i = 0 ; i < mat.getrow() ; i++){
          for( int j = 0 ; j < mat.getcol() ; j++){
               value = mat.getvalue(i,j) ;
               output << value << " " ;
          }
          cout << endl ;
     }
     return output ;

}

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
Matrix<t> Matrix<t>::operator-( Matrix<t> &mat){

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
Matrix<t> Matrix<t>::operator*( Matrix<t> &mat ){

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


#endif // MATRIX_H
