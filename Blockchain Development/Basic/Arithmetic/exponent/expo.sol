// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract power{
    uint public X ;
    uint public Y ;
    uint public product = 1 ;
    //function for the input and power calculation 
    function getPower( uint _X, uint _Y ) public returns( uint ){
        X = _X ;
        Y = _Y ;
        for (uint i = 1 ; i <= _Y ; i++ ){
            product = product * X ; 
        }
        return product ;
    }
}