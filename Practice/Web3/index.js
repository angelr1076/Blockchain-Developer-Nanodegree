// -- Step 1: Set up the appropriate configuration
let Web3 = require('web3');
// let web3 = new Web3('<infura mainnet address>');
let web3 = new Web3('http://127.0.0:8545');
let gasPrice = web3.eth.getGasPrice().then(console.log());
let uncle = web3.eth.getUncle(500, 0).then(console.log);
// let transCount = web3.eth.getBlockTransactionCount('pending').then(console.log);
// console.log(gasPrice);
// console.log(uncle);
// console.log(transCount);
let transCount = web3.eth
    .getTransactionCount('0x1E07E1eC1559138e03EB5F0C89BEAF9bD5AB3332')
    .then(console.log);
console.log(transCount);