// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Coin {
    address public minter;
    mapping (address => uint) public balances;

    event Sent(address from, address to, uint amount);

    constructor () {
        minter = msg.sender;
    }

    // Make new coins and send to an address
    // Only owner can send these coins
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter, "You are not the owner of this contract.");
        balances[receiver] += amount;
    }

    error insufficientBalance(uint requested, uint available);

    // Send any amount of coins to an existing address
    function send(address receiver, uint amount) public {
        if (amount > balances[msg.sender]) 
        revert insufficientBalance({
            requested: amount,
            available: balances[msg.sender]
        });

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }
}