// -- Step 1: Set up the appropriate configuration
let Web3 = require('web3');
let EthTransact = require('ethereumjs-tx').Transaction; // Create, manipulate and sign Eth transactions`
let web3 = new Web3('http://127.0.0.1:8545');

// -- Step 2: Set the sending and receiving addresses for the transaction.
let sendAddress = '0x8dFaede1a18adb2D2c06f6EbC2BDFc22295aDaef';
let recAddress = '0x70F8BdFB0A23C09D27b6870a883A8540F2aF297E';

// -- Step 3: Check the balances of each address

// -- Step 4: Set up the transaction using the transaction variables as shown
let rawTransaction = {
    nonce: 2,
    to: recAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 30000,
    data: '0x',
};

// -- Step 5: View the raw transaction rawTransaction

// -- Step 6: Check the new account balances (they should be the same)
// web3.eth.getBalance(sendAddress).then(console.log);
// web3.eth.getBalance(recAddress).then(console.log);

// Note: They haven't changed because they need to be signed...
// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
let privateKeySender =
    '3a0737fdf15c46688af413102aa21f88efd4efbc1b6973b7153975c7ae49fdc5';
let privateKeySenderHex = Buffer.from(privateKeySender, 'hex');
console.log('Buffer: ', privateKeySender);
let transaction = new EthTransact(rawTransaction);
transaction.sign(privateKeySenderHex);

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
let serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);
web3.eth.getBalance(sendAddress).then(console.log);
web3.eth.getBalance(recAddress).then(console.log);