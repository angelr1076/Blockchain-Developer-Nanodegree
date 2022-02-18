// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

// Define a contract 'Lemonade Stand'
contract LemonadeStand {

    // Variable: Owner
    address owner;

    // Variable: SKU count
    uint skuCount;

    // Event: 'State' with value 'ForSale'
    enum State { ForSale, Sold, Shipped }

    // Struct: Item. name, sku, price, state, seller, buyer
    struct Item {
        string  name;
        uint  sku;
        uint  price;
        State  state;
        address seller;
        address buyer;
    }
  
    // Define a public mapping 'items' that maps the SKU (a number) to an Item.
    mapping (uint => Item) items;

    // Events
    event ForSale(uint skuCount);
    event Sold(uint sku);
    event Shipped(uint sku);

    // Modifier: Only Owner see if msg.sender == owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Define a modifier that verifies the Caller
    modifier verifyCaller (address _address) {
        require(msg.sender == _address);
        _;
    }

    // Define a modifier that checks if the paid amount is sufficient to cover the price
    modifier paidEnough(uint _price) {
        require(msg.value >= _price);
        _;
    }

    // Define a modifier that checks if an item.state of a sku is ForSale
    modifier forSale(uint _sku) {
        require(items[_sku].state == State.ForSale);
        _;
    }

    // Define a modifier that checks if an item.state of a sku is Sold
    modifier sold(uint _sku) {
        require(items[_sku].state == State.Sold);
        _;
    }

    // Define a modifier that checks the price and refunds the remaining balance
    modifier checkValue(uint _sku) {
        _;
        uint _price = items[_sku].price;
        uint amountToRefund = msg.value - _price;
      // Breaking changes https://docs.soliditylang.org/en/v0.8.2/080-breaking-changes.html#how-to-update-your-code
      // Example https://ethereum.stackexchan e.com/questions/94707/how-to-fix-typeerror-type-address-is-not-implicitly-convertible-to-expected-ty
        payable(items[_sku].buyer).transfer(amountToRefund);
    }

    constructor() payable {
        owner = msg.sender;
        skuCount = 0;
    }

    function addItem(string memory _name, uint _price) onlyOwner public {
        // Increment sku
        skuCount = skuCount + 1;

        // Emit the appropriate event
        emit ForSale(skuCount);
        // Add the new item into inventory and mark it for sale
        items[skuCount] = Item({name: _name, sku: skuCount, price: _price, state: State.ForSale, seller: msg.sender, buyer: address(0)});
    }

    function buyItem(uint sku) forSale(sku) paidEnough(items[sku].price) checkValue(sku) public payable {
        address buyer = msg.sender;
        uint price = items[sku].price;

        // Update Buyer
        items[sku].buyer = buyer;

        // Update State
        items[sku].state = State.Sold;

        // Transfer money to seller
        payable(items[sku].seller).transfer(price);

        // Emit the appropriate event
        emit Sold(sku);
    }

    // Define a function 'shipItem' that allows the seller to change the state to 'Shipped'
    function shipItem(uint sku) sold(sku) sold(sku) verifyCaller(items[sku].seller) public {
        // Update state
        items[sku].state = State.Shipped;
        // Emit the appropriate event
        emit Shipped(sku);
    }

    function fetchItem(uint _sku) public view returns (string memory name, uint sku, uint price, string memory stateIs, address seller, address buyer) {
        uint state;
        name = items[_sku].name;
        sku = items[_sku].sku;
        price = items[_sku].price;
        state = uint(items[_sku].state);

        if( state == 0) {
            stateIs = "For Sale";
        }

        if( state == 1) {
            stateIs = "Sold";
        }

        if (state == 2) {
            stateIs = "Shipped";
        }

        seller = items[_sku].seller;
        buyer = items[_sku].buyer;
    }

}