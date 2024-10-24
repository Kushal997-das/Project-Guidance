// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserBalances {
    mapping(address => uint256) private balances;

    function setBalance(uint256 _amount) public {
        balances[msg.sender] = _amount;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
