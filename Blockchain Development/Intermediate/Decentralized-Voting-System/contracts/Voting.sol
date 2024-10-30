// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string name;   // Name of the proposal
        uint voteCount; // Number of votes for this proposal
    }

    address public owner; // Owner of the contract
    mapping(uint => Proposal) public proposals; // Mapping of proposal ID to Proposal
    mapping(address => bool) public voters; // Mapping to track if an address has voted
    uint public proposalsCount; // Number of proposals

    event ProposalAdded(uint proposalId, string name);
    event Voted(uint proposalId, address voter);

    constructor() {
        owner = msg.sender; // Set the owner of the contract
    }

    // Add a new proposal
    function addProposal(string memory _name) public {
        require(msg.sender == owner, "Only owner can add proposals");
        proposalsCount++;
        proposals[proposalsCount] = Proposal(_name, 0);
        emit ProposalAdded(proposalsCount, _name);
    }

    // Vote for a proposal
    function vote(uint _proposalId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_proposalId > 0 && _proposalId <= proposalsCount, "Invalid proposal ID.");

        voters[msg.sender] = true; // Mark the voter as having voted
        proposals[_proposalId].voteCount++; // Increment the vote count for the proposal
        emit Voted(_proposalId, msg.sender);
    }

    // Get proposal details
    function getProposal(uint _proposalId) public view returns (string memory, uint) {
        require(_proposalId > 0 && _proposalId <= proposalsCount, "Invalid proposal ID.");
        Proposal memory proposal = proposals[_proposalId];
        return (proposal.name, proposal.voteCount);
    }

    // Get the winning proposal
    function getWinningProposal() public view returns (string memory) {
        uint winningVoteCount = 0;
        string memory winningProposalName;

        for (uint i = 1; i <= proposalsCount; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposalName = proposals[i].name;
            }
        }
        return winningProposalName;
    }
}
