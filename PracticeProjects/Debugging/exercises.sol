// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract simpleStorage {

    uint storeData;

    // Setter
    function set(uint x) public {
        storeData = x;
    }
    
    // Getter
    function get() public view returns (uint) {
        return storeData;
    }
}