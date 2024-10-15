// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {

// Structure of voter 
struct Voter{
  bool voted;
  uint256 vote;
  bool authorized;
}

// Structure of voter
struct Candidate{
  uint256 id;
  string name;
  uint256 voteCount;
}

address public owner;
string public electionName;

mapping(address => Voter) public voters;
Candidate[] public candidates;
uint256 public totalVotes;

modifier ownerOnly(){
 require(msg.sender == owner, "Caller is not owner");
 _;
}

constructor(string memory _name) {
  owner = msg.sender;
  electionName = _name;
}

// Owner can add candidates
function addCandidate(string memory _name) public ownerOnly{
  candidates.push(Candidate(candidates.length, _name, 0));
}

// Owner authorizes who can vote
function authorize(address _person) public ownerOnly {
    voters[_person].authorized = true;
}

// The authorized users can vote
function vote(uint256 _voteIndex) public {
  require(!voters[msg.sender].voted, "You have already voted");
  require(voters[msg.sender].authorized, "You are not authorized to vote");
  require(_voteIndex<candidates.length, "Incorrect Vote Index");
  voters[msg.sender].vote = _voteIndex;
  voters[msg.sender].voted = true;
  candidates[_voteIndex].voteCount += 1;
  totalVotes +=1;
}

// Function to get candidate list
function getCandidates() public view returns (Candidate[] memory) {
  return candidates;
}

// Function to get candidate by id
function getCandidateById(uint256 _id) public view returns (Candidate memory){
  return candidates[_id];
}

// Function to get total votes
function getTotalVotes() public view returns (uint256) {
  return totalVotes;
}

// Function to get voter details by voter address
function getVoterDetails(address _voter) public view returns (Voter memory){
  return voters[_voter];
}

}
