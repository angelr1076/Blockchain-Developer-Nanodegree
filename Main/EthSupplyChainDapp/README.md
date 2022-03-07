# Project 3 - BeanFul Coffee Bean Supply Chain

A small portion of the README uses the initially cloned README instructions.

[FAQ - Architect a Blockchain Dapp](https://andresaaap.medium.com/architect-a-blockchain-supply-chain-solution-part-b-project-faq-udacity-blockchain-da86496fce55)

# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

The DApp User Interface when running should look like...

![truffle test](images/ftc_product_overview.png)

![truffle test](images/ftc_farm_details.png)

![truffle test](images/ftc_product_details.png)

![truffle test](images/ftc_transaction_history.png)

# Project write-up

## Part 1: Plan the project with write-ups

![Activity Diagram](https://res.cloudinary.com/angelrodriguez/image/upload/c_scale,h_320,w_500/v1646004278/BlockchainDevNanodegree/Project3/CoffeeActivityDiagram.png)
![Flow Sequence Diagram](https://res.cloudinary.com/angelrodriguez/image/upload/c_scale,h_320,w_500/v1646683786/BlockchainDevNanodegree/Project3/flowsequence.png)
![State Diagram](https://res.cloudinary.com/angelrodriguez/image/upload/c_scale,w_500/v1646004278/BlockchainDevNanodegree/Project3/CoffeBeanStateDiagram.png)
![Data Model Diagram](https://res.cloudinary.com/angelrodriguez/image/upload/c_scale,h_320,w_500/v1646004278/BlockchainDevNanodegree/Project3/CoffeeDataModDiagram.png)

## Acknowledgments

- Truffle v4.1.14 (core: 4.1.14)
- Ganache-cli
- Solidity v0.4.24 (solc-js)
- Node v16.4.2

## Project write-up - Libraries

- lite-server: 2.4.0,
- prettier: ^2.5.1, <!-- Used for formatting solidity code -->
- prettier-plugin-solidity: ^1.0.0-beta.19 <!-- Used for formatting solidity code -->
- @truffle/contract: ^4.4.10,
- dotenv: ^16.0.0, <!-- Used to hide env variables, namely infuraKey and nmemonic phrase -->
- truffle-hdwallet-provider: ^1.0.17

## Part 2: Write smart contracts

AccessControl:

- ConsumerRole.sol
- DistributorRole.sol
- FarmerRole.sol
- RetailerRole.sol

Base:

- SupplyChain.sol

Core:

- Ownable.sol

## Part 3: Test smart contract code coverage

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

### Installing

> The starter code is written for **Solidity v0.4.24**. At the time of writing, the current Truffle v5 comes with Solidity v0.5 that requires function *mutability* and *visibility* to be specified (please refer to Solidity [documentation](https://docs.soliditylang.org/en/v0.5.0/050-breaking-changes.html) for more details). To use this starter code, please run `npm i -g truffle@4.1.14` to install Truffle v4 with Solidity v0.4.24.

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/udacity/nd1309/tree/master/course-5/project-6
```

Change directory to ```project-6``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd project-6
npm install
```

Testing:
Launch Ganache from the terminal within the project-3 folder for testing
```ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"```

In a separate terminal window, run truffle in dev mode
Your terminal should look something like this:

![truffle test](images/ganache-cli.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

![truffle test](images/truffle_compile.png)

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

- harvestItem()
- processItem()
- packItem()
- addItem()
- buyItem()
- shiptItem()
- receiveItem()
- purchaseItem()
- fetchItemBufferOne()
- fetchItemBufferTwo()

![image](https://res.cloudinary.com/angelrodriguez/image/upload/v1646683786/BlockchainDevNanodegree/Project3/flowsequence.png)

```
Using network 'development'.

ganache-cli accounts used here...
Contract Owner: accounts[0]  0x3c04e47421ea00122c9794b5aa67be62686fb99c
Farmer: accounts[1]  0x26bfa6514fe7b2edb29c9eeae934961a2374c15a
Distributor: accounts[2]  0xaa86a66d0122aeb5d77db7c9fb30278b5bab1461
Retailer: accounts[3]  0xbd7d4c2f36858eea66089a5563258e52001c879f
Consumer: accounts[4]  0x6bddf7341d996b8f18e1cc0e65ac62291a52797c


  Contract: SupplyChain
    ✓ Testing smart contract function harvestItem() that allows a farmer to harvest coffee (960ms)
    ✓ Testing smart contract function processItem() that allows a farmer to process coffee (322ms)
    ✓ Testing smart contract function packItem() that allows a farmer to pack coffee (294ms)
    ✓ Testing smart contract function sellItem() that allows a farmer to sell coffee (538ms)
    ✓ Testing smart contract function buyItem() that allows a distributor to buy coffee (1198ms)
    ✓ Testing smart contract function shipItem() that allows a distributor to ship coffee (531ms)
    ✓ Testing smart contract function receiveItem() that allows a retailer to mark coffee received (922ms)
    ✓ Testing smart contract function purchaseItem() that allows a consumer to purchase coffee (1024ms)
    ✓ Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain (244ms)
    ✓ Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain (61ms)
```

In a separate terminal window, launch the DApp:

```
npm run dev
```

## Part 4: Deploy smart contracts on public test network

Deploy to Rinkeby:

```
truffle migrate --reset --network rinkeby
```

```
Compiling ./contracts/CoffeeAccessControl/ConsumerRole.sol...
Compiling ./contracts/CoffeeAccessControl/DistributorRole.sol...
Compiling ./contracts/CoffeeAccessControl/FarmerRole.sol...
Compiling ./contracts/CoffeeAccessControl/RetailerRole.sol...
Compiling ./contracts/CoffeeAccessControl/Roles.sol...
Compiling ./contracts/CoffeeBase/SupplyChain.sol...
Compiling ./contracts/CoffeeCore/Ownable.sol...
Compiling ./contracts/Migrations.sol...

Writing artifacts to ./build/contracts

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xdce763bf302d88a47aec5deb809f9c4b714fabf519c171330ea6fcc9a0bc8e60
  Migrations: 0x6dc4e7bb455d317d13bc434fbcfdad9079d6982f
Saving successful migration to network...
  ... 0xe9fb9ae93c7336337deb09e9880c54891ae63bf409193422f7d903a367a384c6
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying FarmerRole...
  ... 0x84793239d3b2f7e06d68acb5b40a7e45952243bb72063d6247d95e102f978e9b
  FarmerRole: 0x19ce08069554b2beda46efc521e6ecd0689761bc
  Deploying DistributorRole...
  ... 0x5a231e343a50d0a13fe2578f1643c005d5dff6818008c1acd90357ca8c46745a
  DistributorRole: 0x9f56ad0cf64021a0c5a583b5236823a2a09b6b74
  Deploying RetailerRole...
  ... 0x2a5316bb3beca90a38c3ed5c8996d761257c42cabda160151b3337ba9fbdd362
  RetailerRole: 0x1ed66dc0953120e5da752c9bd60e5af365c61ff4
  Deploying ConsumerRole...
  ... 0x8ba6bfbb46c6d5135bab68673432152c1a0b3f36123cbb544df7b2c89ef6c38d
  ConsumerRole: 0xdacdfdf90c60b3691f153f77b65f211bf09adbc6
  Deploying SupplyChain...
  ... 0x7d21495b8e1a185da418a5b2438e8c17c03b3226815d39636a46628175ee3813
  SupplyChain: 0xaa61f4692aef0a89fa06bb77a0c0e51a6ce63c41
Saving successful migration to network...
  ... 0x6741a56302291aa8bb5976c26cfb31a5c26fd60aee4c829013633626c6029bd6
Saving artifacts...
MacBook-Angel:Project-3 angelrodriguez$ npm run dev

> BeanFul@1.0.0 dev
> lite-server
```

[Contract Address: 0x6DC4E7bb455D317D13bc434fbCfdaD9079D6982f](https://rinkeby.etherscan.io/address/0x6dc4e7bb455d317d13bc434fbcfdad9079d6982f)

- Transaction hash: ```0x6741a56302291aa8bb5976c26cfb31a5c26fd60aee4c829013633626c6029bd6```

![Deployed on Rinkeby](https://res.cloudinary.com/angelrodriguez/image/upload/v1646586250/BlockchainDevNanodegree/Project3/RinkebyDeploy.png)

## Part 5: Modify client code to interact with smart contracts

### Requirement: Configure client code for each actor

Front-end is configured to:

1) Submit a product for shipment (farmer to the distributor, distributor to retailer, etc).
2) Receive product from shipment.
3) Validate the authenticity of the product.
Frontend code can be downloaded and executed from a local environment
