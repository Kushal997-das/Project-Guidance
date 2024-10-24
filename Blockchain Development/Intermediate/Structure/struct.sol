// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRecords {
    struct User {
        string name;
        uint256 age;
    }

    mapping(address => User) private users;

    function setUser(string memory _name, uint256 _age) public {
        users[msg.sender] = User(_name, _age);
    }

    function getUser() public view returns (string memory, uint256) {
        User memory user = users[msg.sender];
        return (user.name, user.age);
    }
}
