// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract Cube {
    uint public number; // Stores the input number, if needed

    // Function to calculate the cube of a number without storing the result on-chain
    function getCube(uint _number) public pure returns (uint) {
        require(_number <= 2**85, "Input is too large and may cause overflow."); // Simple overflow guard

        uint result = _number * _number * _number;
        return result;
    }

    // Function to set a number and get its cube
    function setAndCube(uint _number) public returns (uint) {
        number = _number;
        return getCube(_number);
    }
}
