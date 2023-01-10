// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract ETH_to_SC {
    address payable public receiver = payable(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db);
    //Understand the receive inbuilt function 
    receive() external payable{} 

    function getBalance() public view returns( uint ) {
        return address( this ).balance ; 
    }
}

//this is a code for transacting ETH from an account to Smart Contract 