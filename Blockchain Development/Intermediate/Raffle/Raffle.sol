// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Raffle {
    address public owner;
    address[] public participants;
    address public winner;
    uint public ticketPrice;
    bool public isActive;

    event EnterRaffle(address indexed participant);
    event WinnerSelected(address winner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(uint _ticketPrice) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        isActive = true;
        winner = address(0);
    }

    // Function for participants to enter the raffle
    function enterRaffle() public payable {
        require(isActive, "Raffle is not active");
        require(msg.value == ticketPrice, "Incorrect ticket price");
        participants.push(msg.sender);
        emit EnterRaffle(msg.sender);
    }

    function endRaffle() public onlyOwner {
        isActive=false;
    }

    // Function to randomly select a winner (only the owner can call this)
    function selectWinner() public onlyOwner {
        require(participants.length > 0, "No participants in the raffle");
        require(!isActive, "Raffle is active");
        uint randomIndex = random() % participants.length;
        winner = participants[randomIndex];
        emit WinnerSelected(winner);
    }
    // Winner withdraws the prize money
    function getPrizeMoney() public {
        require(msg.sender==winner,"Only winner can call");
        payable(winner).transfer(address(this).balance);
        winner = address(0);
    }

    // Pseudo-random number generator (for demonstration purposes)
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, participants)));
    }

    // Get the total number of participants
    function getParticipantsCount() public view returns (uint) {
        return participants.length;
    }

    function getPrizePool() public view returns(uint){
        return address(this).balance;
    }
}
