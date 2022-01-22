// -- Step 1: Set up the appropriate configuration
let Web3 = require('web3');
let web3 = new Web3('<infura mainnet address>');
let gasPrice = web3.eth.getGasPrice().then(console.log());
let uncle = web3.eth.getUncle(500, 0).then(console.log);
let transCount = web3.eth.getBlockTransactionCount('pending').then(console.log);
console.log(gasPrice);
console.log(uncle);
console.log(transCount);
