// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract Avg {
    // Average of three numbers 
    int public avg ; 

    function getAvg( int num1 , int num2, int num3 ) public returns( int ){
        int sum = num1 + num2 + num3 ;
        avg = sum / 3 ;
        return avg ;
    }
}