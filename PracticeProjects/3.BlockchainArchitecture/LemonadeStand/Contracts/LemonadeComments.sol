pragma solidity ^0.4.24;
// Define a Supply Chain Contract "LemonadeStand"
contract LemonadeStand {

  // Variable: 'Owner'
  address owner;
  // Variable: 'skuCount'
  uint skuCount;

  // State: For Sale
  enum State { ForSale, Sold }

  // Struct 'Item' with the following fields: name, sku, price, state, seller, buyer
  struct Item {
    string name;
    uint sku;
    uint price;
    State state;
    address seller;
    address buyer;
  }
  // Mapping: Assign 'Item' a SKU
  mapping (uint => Item) items;

  // Event ForSale
  event ForSale(uint skuCount);
  // Event Sold
  event Sold(uint sku);

  // Modifier: Only Owner
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  // Modifier: Verify Caller
  modifier verifyCaller(address _address) {
    require(msg.sender == _address);
    _;
  }
  // Modifier: Paid Enough
  modifier padEnough(uint price) {
    require(msg.value >= _price);
    _;
  }
  // Modifier: For Sale
  modifier forSale(uint sku) {
    require(items[_sku].state == State.ForSale);
    _;
  }
  // Modifier: Sold
  modifer sold(uint _sku) {
    require(item[_sku].state == State.Sold);
    _;
  }
  // Function: Constructor to set some initial values

  // Function: Add Item

  // Function: Buy Item

  // Function: Fetch Item

}