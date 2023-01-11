// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract Prime_Check {
    uint public number ; 
    bool public isPrime = true ;
    //function for checking the number is prime or not 
    function get_Prime( uint _number ) public returns( uint ){
        number = _number ; 
        for ( uint i =  2; i < number ; i++ ){
            if ( number % i == 0 ){
                isPrime = false ; 
            }
        }
        if ( isPrime == true ){
            return 1 ;
        }
        else {
            return 0 ; 
        }
    }
}