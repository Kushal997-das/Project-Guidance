// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract Cube {
    uint public number ;
    uint public cube_ ; 
    function getCube( uint _number) public returns( uint ){
        number = _number ;
        cube_ = (number * number * number) ;
        return cube_ ;
    }
}