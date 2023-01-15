// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract reverse{
    uint public number ;
    uint public reversal = 10 ;
    //function for reversing the number ;
    function numRev( uint _number ) public returns( bool ){
        number = _number ;
        uint x = number ;
        uint digit ;
        while ( number > 0 ){
            digit = number % 10 ;
            reversal = (reversal*10) + digit ;
            number = number / 10 ;
        }
        if ( reversal == x ){
            return true ;
        }
        else {
            return false ; 
        }   
    }
}