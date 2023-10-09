// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT721 is ERC721, Ownable {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    uint256 public tokenIdCounter;

    function mint(address to) public onlyOwner {
        uint256 tokenId = tokenIdCounter++;
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }
}
