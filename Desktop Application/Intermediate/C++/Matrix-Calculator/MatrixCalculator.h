#include "Matrix.h"

#ifndef MATRIXCALCULATOR_H
#define MATRIXCALCULATOR_H


class MatrixCalculator
{
private:
     int ch ;
public:
     MatrixCalculator(){ch = 0 ; } ;
     void menu() ;
     void add() ;
     void sub() ;
     void multi() ;
     void trans() ;

};

#endif // MATRIXCALCULATOR_H
