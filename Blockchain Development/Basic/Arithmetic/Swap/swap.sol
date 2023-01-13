// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract Swap {
    uint public num1 ;
    uint public num2 ;
    //Function for input of numbers 
    function get_Swap( uint _num1, uint _num2 ) public returns ( uint, uint ){
        num1 = _num1 ;
        num2 = _num2 ;
        uint temp ; 
        temp = num1 ;
        num1 = num2 ;
        num2 = temp ; 
        return ( num1, num2 );
    }
}