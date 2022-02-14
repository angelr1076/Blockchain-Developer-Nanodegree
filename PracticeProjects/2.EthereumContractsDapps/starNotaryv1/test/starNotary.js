// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)
const StarNotary = artifacts.require('StarNotary');

let accounts; // List of development accounts provided by Truffle
let owner; // Global variable use it in the tests cases

// This called the StartNotary Smart contract and initialize it
contract('StarNotary', accs => {
    accounts = accs; // Assigning test accounts
    owner = accounts[0]; // Assigning the owner test account
});

// Example test case, it will test if the contract is able to return the starName property
// initialized in the contract constructor
it('has correct name', async() => {
    let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
    let starName = await instance.starName.call(); // Calling the starName property
    assert.equal(starName, 'Awesome Udacity Star'); // Assert if the starName property was initialized correctly
});

it('can be claimed', async() => {
    let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
    await instance.claimStar({ from: owner }); // Special object that can be sent via keywords. Remember, claimStar doesn't take any arguments
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner); // Assert if the starName property was initialized correctly
});

it('can change owners', async() => {
    let instance = await StarNotary.deployed();
    let secondUser = accounts[1];
    await instance.claimStar({ from: owner });
    let starOwner = await instance.starOwner.call();
    assert.equal(starOwner, owner);
    await instance.claimStar({ from: secondUser });
    let secondOwner = await instance.starOwner.call();
    assert.equal(secondOwner, secondUser);
});

it('star name can be changed', async() => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({ from: owner });
    await instance.changeName("Elorah's Star", { from: owner });
    let newName = await instance.starName.call();
    assert.equal(newName, "Elorah's Star");
});