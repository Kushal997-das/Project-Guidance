// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.0;

contract Avg {
    // Average of three numbers with precision handling
    int public avg;

    function getAvg(int num1, int num2, int num3, uint decimals) public returns (int) {
        int sum = num1 + num2 + num3;

        // Calculate average with desired precision
        // Multiply by 10^decimals to get the required precision
        int precisionMultiplier = int(10 ** decimals);
        avg = (sum * precisionMultiplier) / 3;

        return avg;
    }
    
    function getFormattedAvg(uint decimals) public view returns (string memory) {
        // Convert the average to string with the specified number of decimal places
        int integerPart = avg / int(10 ** decimals);
        int fractionalPart = avg % int(10 ** decimals);

        // Format as a string
        return string(abi.encodePacked(
            intToString(integerPart), 
            ".", 
            uintToString(uint(fractionalPart), decimals)
        ));
    }

    // Helper function to convert integer part to string
    function intToString(int _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        bool negative = _i < 0;
        uint i = uint(negative ? -_i : _i);
        uint j = i;
        uint length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length + (negative ? 1 : 0));
        uint k = bstr.length;
        while (i != 0) {
            bstr[--k] = bytes1(uint8(48 + i % 10));
            i /= 10;
        }
        if (negative) {
            bstr[0] = '-';
        }
        return string(bstr);
    }

    // Helper function to convert fractional part to string with fixed decimal places
    function uintToString(uint _i, uint decimals) internal pure returns (string memory) {
        bytes memory bstr = new bytes(decimals);
        for (uint k = decimals; k > 0; k--) {
            bstr[k - 1] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
