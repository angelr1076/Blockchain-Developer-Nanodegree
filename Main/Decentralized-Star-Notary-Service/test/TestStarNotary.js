const StarNotary = artifacts.require('StarNotary');

var accounts;
var owner;

contract('StarNotary', accs => {
  accounts = accs;
  owner = accounts[0];
});

it('can Create a Star', async () => {
  let tokenId = 1;
  let instance = await StarNotary.deployed();
  await instance.createStar('Awesome Star!', tokenId, { from: accounts[0] });
  assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!');
});

it('lets user1 put up their star for sale', async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let starId = 2;
  let starPrice = web3.utils.toWei('.01', 'ether');
  await instance.createStar('awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let starId = 3;
  let starPrice = web3.utils.toWei('.01', 'ether');
  let balance = web3.utils.toWei('.05', 'ether');
  await instance.createStar('awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
  await instance.buyStar(starId, { from: user2, value: balance });
  let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
  let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
  let value2 = Number(balanceOfUser1AfterTransaction);
  assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let starId = 4;
  let starPrice = web3.utils.toWei('.01', 'ether');
  let balance = web3.utils.toWei('.05', 'ether');
  await instance.createStar('awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
  await instance.buyStar(starId, { from: user2, value: balance });
  assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async () => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let starId = 5;
  let starPrice = web3.utils.toWei('.01', 'ether');
  let balance = web3.utils.toWei('.05', 'ether');
  await instance.createStar('awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  const balanceOfUser2BeforeTransaction = web3.utils.toBN(
    await web3.eth.getBalance(user2),
  );

  // Fix from https://github.com/udacity/nd1309-p2-Decentralized-Star-Notary-Service-Starter-Code/issues/13
  const txInfo = await instance.buyStar(starId, {
    from: user2,
    value: balance,
  });
  const balanceAfterUser2BuysStar = web3.utils.toBN(
    await web3.eth.getBalance(user2),
  );
  // calculate the gas fee
  const tx = await web3.eth.getTransaction(txInfo.tx);
  const gasPrice = web3.utils.toBN(tx.gasPrice);
  const gasUsed = web3.utils.toBN(txInfo.receipt.gasUsed);
  const txGasCost = gasPrice.mul(gasUsed);

  // make sure that [final_balance == initial_balance - star_price - gas_fee]
  const starPriceBN = web3.utils.toBN(starPrice); // from string
  const expectedFinalBalance = balanceOfUser2BeforeTransaction
    .sub(starPriceBN)
    .sub(txGasCost);
  assert.equal(
    expectedFinalBalance.toString(),
    balanceAfterUser2BuysStar.toString(),
  );
});

// The token name and token symbol are added properly.
it('can add the star name and star symbol properly', async () => {
  // 1. create a Star with different tokenId
  let instance = await StarNotary.deployed();
  let user = accounts[1];
  let starId = 6;
  await instance.createStar('Maxi', starId, { from: user });

  // Get the name and symbol from the contract
  const name = await instance.name.call();
  const symbol = await instance.symbol.call();
  // 2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
  assert.equal(name, 'Ellie');
  assert.equal(symbol, 'EGR');
});

// 2 users can exchange their stars.
it('lets 2 users exchange stars', async () => {
  // 1. create 2 Stars with different tokenId
  let instance = await StarNotary.deployed();
  let user1 = accounts[0];
  let user2 = accounts[1];
  let starId1 = 7;
  let starId2 = 8;
  await instance.createStar('Star1', starId1, { from: user1 });
  await instance.createStar('Star2', starId2, { from: user2 });
  // 2. Call the exchangeStars functions implemented in the Smart Contract
  await instance.exchangeStars(starId1, starId2);
  // Create variables for the owners of the star after exchanging stars
  let ownsStar1 = await instance.ownerOf.call(starId1);
  let ownsStar2 = await instance.ownerOf.call(starId2);
  // 3. Verify that the owners changed
  assert.equal(ownsStar1, user2);
  assert.equal(ownsStar2, user1);
});

// Stars Tokens can be transferred from one address to another.
it('lets a user transfer a star', async () => {
  // 1. create a Star with different tokenId
  let instance = await StarNotary.deployed();
  let user1 = accounts[0];
  let user2 = accounts[1];
  let starId = 9;
  await instance.createStar('SuperStar', starId, { from: user1 });
  // 2. use the transferStar function implemented in the Smart Contract
  await instance.transferStar(user2, starId);
  // 3. Verify the star owner changed.
  let ownsStar = await instance.ownerOf.call(starId);
  assert.equal(ownsStar, user2);
});

it('lookUptokenIdToStarInfo test', async () => {
  // 1. create a Star with different tokenId
  let instance = await StarNotary.deployed();
  let user = accounts[0];
  let starId = 10;
  typeof starId;
  await instance.createStar('MyStar', starId, { from: user });
  // 2. Call your method lookUptokenIdToStarInfo
  const lookUpStar = await instance.lookUptokenIdToStarInfo(starId);
  // 3. Verify if you Star name is the same
  assert.equal(lookUpStar, 'MyStar');
});
