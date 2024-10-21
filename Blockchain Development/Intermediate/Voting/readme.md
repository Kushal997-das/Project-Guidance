# Voting Smart Contract

This is a **Voting** smart contract where an election owner can add candidates and authorize voters to vote. Voters can then cast their vote, and the total votes are tallied.

## Features

- **Add Candidates**: The owner can add candidates to the election.
- **Authorize Voters**: The owner can authorize addresses to vote.
- **Vote**: Authorized users can vote for their preferred candidate.
- **Get Candidate List**: Anyone can retrieve the list of candidates.
- **Get Total Votes**: View the total number of votes cast in the election.
- **Get Voter Details**: View the details of a voter, including whether they voted and which candidate they voted for.

## Contract Details

- **Owner**: The contract deployer is the owner and can manage candidates and authorize voters.
- **Candidates**: An array of candidates who are competing in the election.
- **Voters**: A mapping of addresses to voter details, tracking whether they are authorized and if they have voted.

## How to Use

1. **Deploy the Contract**: Deploy the contract by providing the election name.
2. **Add Candidates**: The owner can add candidates to the election.
3. **Authorize Voters**: The owner authorizes specific addresses to vote.
4. **Vote**: Authorized users can vote for their chosen candidate.
5. **View Results**: After voting, you can view the total votes and candidate information.
