// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Swap {
    // Event to log swaps
    event Swapped(uint indexed num1, uint indexed num2);

    // Function for swapping numbers
    function get_Swap(uint _num1, uint _num2) public pure returns (uint, uint) {
        require(_num1 != _num2, "Numbers must be different to swap");
        
        // Swap logic
        return (_num2, _num1); // Directly returning swapped values
    }
}
