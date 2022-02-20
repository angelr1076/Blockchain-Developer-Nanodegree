// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;
import './Wallet.sol';

contract Fundraiser {
    mapping(address=>uint) balances;

    function withdrawCoins() public {
        // user withdraws amount of coins they distributed
        uint withdrawAmount = balances[msg.sender];
        // set balance to 0
        balances[msg.sender] = 0;
        // reference wallet we're sending ether back to 
        Wallet wallet = Wallet(msg.sender);
        // reference payout total number of tokens 
        wallet.payout.value(withdrawAmount)();
    }

    function getBalance() view returns (uint) {
        return address(this).balance;
    }

    function contribute() payable {
        balances[msg.sender] += msg.value;
    }

    fallback () payable {

    }
}

// contract Fundraiser {
//     mapping(address=>uint) balances;

//     // VULNERABLE
//     function withdrawCoins(){
//         uint withdrawAmount = balances[msg.sender];
//         Wallet wallet = Wallet(msg.sender);
//         wallet.payout.value(withdrawAmount)();

//         // this line is not reached before the next recursion!!
//         balances[msg.sender] = 0;
//     }

//     function getBalance() constant returns (uint) {
//         return address(this).balance;
//     }

//     function contribute() payable {
//         balances[msg.sender] += msg.value;
//     }

//     function() payable {

//     }
// }
