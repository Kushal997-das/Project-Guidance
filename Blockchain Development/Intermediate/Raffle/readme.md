# Raffle Smart Contract

This is a simple **Raffle** smart contract where participants can join the raffle by paying a specified ticket price, and the contract owner can select a winner at the end of the raffle.

## Features

- **Enter the Raffle**: Participants can enter the raffle by paying the exact ticket price.
- **Select a Winner**: The contract owner can select a random winner from the participants.
- **Prize Money Withdrawal**: The winner can withdraw the prize pool.
- **View Participants Count**: Get the total number of participants.
- **Check Prize Pool**: Get the total amount of Ether collected in the raffle.

## Contract Details

- **Owner**: The person who deploys the contract will be the owner.
- **Ticket Price**: The price to enter the raffle, set at deployment.
- **Participants**: An array storing the addresses of all participants.
- **Winner**: The randomly selected winner of the raffle.

## How to Use

1. **Deploy the Contract**: Deploy the contract with the desired ticket price.
2. **Enter the Raffle**: Participants can enter the raffle by sending Ether equal to the ticket price.
3. **End the Raffle**: The owner can end the raffle to stop more entries.
4. **Select a Winner**: Once the raffle is ended, the owner can select a winner.
5. **Withdraw Prize**: The winner can withdraw the prize pool.