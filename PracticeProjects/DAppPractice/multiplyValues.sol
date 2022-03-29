// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract storeValues {
  
  uint value;

  // Set value and mult by 5x
  function set(uint x) public {
    value = x * 5;
  }

  // Get value
  function get() public view returns(uint) {
    return value;
  }

}