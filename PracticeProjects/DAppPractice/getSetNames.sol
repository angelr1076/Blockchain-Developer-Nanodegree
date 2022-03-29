// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract storeNames {

  string names;

  function setName(string x) public {
    names = x;
  } 

  function getName() public view returns (string) {
    return names;
  }
  
}