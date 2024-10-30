// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleList {
    // Array to store the list of items
    string[] private items;

    // Event to log when an item is added
    event ItemAdded(string item);

    // Event to log when an item is removed
    event ItemRemoved(string item);

    // Function to add an item to the list
    function addItem(string memory item) public {
        items.push(item);
        emit ItemAdded(item);
    }

    // Function to remove an item from the list
    function removeItem(uint256 index) public {
        require(index < items.length, "Index out of bounds");
        string memory itemToRemove = items[index];

        // Shift items to fill the gap
        for (uint256 i = index; i < items.length - 1; i++) {
            items[i] = items[i + 1];
        }
        items.pop(); // Remove the last item

        emit ItemRemoved(itemToRemove);
    }

    // Function to get the total number of items
    function getItemCount() public view returns (uint256) {
        return items.length;
    }

    // Function to retrieve an item by index
    function getItem(uint256 index) public view returns (string memory) {
        require(index < items.length, "Index out of bounds");
        return items[index];
    }

    // Function to retrieve all items
    function getAllItems() public view returns (string[] memory) {
        return items;
    }
}
