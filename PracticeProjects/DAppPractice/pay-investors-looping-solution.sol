pragma solidity >=0.7.0 <0.9.0;

contract AddressWallets {
    uint256 fortune;
    address payable[] investorWallets;
    mapping(address => uint256) investors;

    constructor() payable {
        fortune = msg.value;
    }

    function payInvestors(address payable wallet, uint256 amount) public {
        investorWallets.push(wallet);
        investors[wallet] = amount;
    }

    function payout() private {
        for (uint256 i = 0; i < investorWallets.length; i++) {
            investorWallets[i].transfer(investors[investorWallets[i]]);
        }
    }

    function makePayment() public {
        payout();
    }

    function checkInvestors() public view returns (uint256) {
        return investorWallets.length;
    }
}
