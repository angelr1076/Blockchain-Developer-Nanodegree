# Project 3 - Bait to Plate

[Architect a Blockchain Dapp](https://andresaaap.medium.com/architect-a-blockchain-supply-chain-solution-part-b-project-faq-udacity-blockchain-da86496fce55)

## Project write-up

### Requirement 1: Project write-up - UML

![Sequence Diagram](https://res.cloudinary.com/angelrodriguez/image/upload/c_scale,w_500/v1645975448/BlockchainDevNanodegree/Project3/sequence-diagram.png)
![State Diagram](https://res.cloudinary.com/angelrodriguez/image/upload/c_scale,h_298,w_500/v1645975448/BlockchainDevNanodegree/Project3/state-diagram.png)
![Sequence Diagram](https://res.cloudinary.com/angelrodriguez/image/upload/c_scale,h_298,w_500/v1645975448/BlockchainDevNanodegree/Project3/activity-diagram.png)
![Sequence Diagram](https://res.cloudinary.com/angelrodriguez/image/upload/c_scale,h_298,w_500/v1645975448/BlockchainDevNanodegree/Project3/data-modeling.png)

### Requirement 2: Project write-up - Libraries

If libraries are used in the project, the project write-up indicates which libraries and discusses why these libraries were adopted.

### Requirement 3: Project write-up - IPFS

If IPFS is used, the project write-up discusses how IPFS is used in this project.

### Requirement 1: Define and implement required interfaces

- AccessControl: Collection of Contracts: These contracts manages the various addresses and constraints for operations that can be executed only by specific roles.

- Base SupplyChain.sol: This is where we define the most fundamental code shared throughout the core functionality. This includes our main data storage, constants, and data types, plus internal functions for managing these items.

- Core: Ownable.sol: is the contract that controls ownership and transfer of ownership.

### Requirement 2: Build out AccessControl Contracts

From the Starter Code, the files in coffeeaccesscontrol controls access control for each actor.

Build out these contracts so that each actor’s role in your supply chain is distinct with no overlap in their access abilities. The abilities listed for each role are exhaustive.

Example of 4 actors in a coffee supply chain are:

- Farmer: The Farmer can harvest coffee beans, process coffee beans, pack coffee palettes, add coffee palettes, ship coffee palettes, and track authenticity.
- Distributor: The Distributor can buy coffee palettes and track authenticity.
- Retailer: The Retailer can receive coffee palettes and track authenticity.
- Consumer: The consumer can buy coffee palettes and track authenticity.

### Requirement 3: Build out Base Contract

From the Starter Code, SupplyChain.sol contract holds all common structs, events and base variables.

This smart contract must implement functions that track:

- Product ID
- Product UPC
- Origination Information
- Origin Actor (e.g. Farmer ID, Farmer Name, )
- Misc. organization information (e.g. Farmer Information)
- Longitude and Latitude of Origin Coordinates (e.g. Farm’s Longitude and Latitude)
- Product notes
- Product price

### Requirement 4: Build out Core Contract

Ownable.sol is the contract that controls ownership and transfer of ownership.

This Core Contract must implement:

- Ownable: Define an owner for all the contracts.
- Secondary: Allows contract to be transferred owners.
