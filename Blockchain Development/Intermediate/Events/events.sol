// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedNumber;

    event NumberChanged(uint256 oldNumber, uint256 newNumber);

    function setNumber(uint256 _newNumber) public {
        uint256 oldNumber = storedNumber;
        storedNumber = _newNumber;
        emit NumberChanged(oldNumber, _newNumber);
    }

    function getNumber() public view returns (uint256) {
        return storedNumber;
    }
}
