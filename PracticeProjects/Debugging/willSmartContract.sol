// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.7;

contract Will {
	address owner;
	uint fortune;
	bool deceased;

	constructor() payable public {
		owner = msg.sender; 
		fortune = msg.value;
		deceased = false;
	}

  // Modifiers
  // Create modifier so only owner can call contract
  modifier onlyOwner {
    require(msg.sender == owner, "You are not the owner of this will");
    _;
  }

  // Only allocate funds if will owner deceased
  modifier mustBeDeceased {
    require(deceased == true, "You are not the owner of this will");
    _;
  } 
  
  // List of family wallets 
  address payable [] familyWallets;

  // Map through inheritance
  mapping(address => uint) inheritance;

  // Set inheritance for each address
  function setInheritance(address payable wallet, uint amount) public {
    // add wallets to the family wallets
    familyWallets.push(wallet);
    inheritance[wallet] = amount;
  } 

}