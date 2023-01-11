// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract SumDigit{
    uint public number ;
    uint public sum = 0 ;
    function getSum( uint  _number ) public returns( uint ){
        number = _number ;
        uint digit ;
        while (number > 0 ){
            digit = number % 10 ; 
            sum += digit ;
            number = number / 10 ; 
        }
        return sum ; 
    }
}