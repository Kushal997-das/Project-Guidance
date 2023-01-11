// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract Even_Check {
    uint public number ;
    //Function for number input and checking if the number is even or odd
    function Check_Even( uint _number ) public returns( uint ){
        number = _number ; 
        if ( number % 2 == 0 ){
            return 1 ;
        }
        else {
            return 0 ; 
        }
    }
}