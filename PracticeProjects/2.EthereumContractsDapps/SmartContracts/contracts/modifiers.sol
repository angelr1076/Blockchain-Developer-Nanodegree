// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Modifiers {

    // Initialize a public variable that sets a minimum bidding amount
    uint8 minOffer = 100;

    // Write a modifier that only accepts bids greater than this minimum amount
    modifier minAmount () {
        // require(msg.value > minOffer, "Your offer needs to be higher than " + minOffer);
        if (msg.value >= minOffer) {
            _;
        } else {
            // Otherwise, throw a revert style of exception
            revert("Your offer needs to be higher than 100");
        }
        
    }

    // Write a function "bid" that applies this modifier and only lets bids higher than the min amount, execute the code inside this function
    function bid () payable public minAmount returns (bool) {
        return true;
    }

}