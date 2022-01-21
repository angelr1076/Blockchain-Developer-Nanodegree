/*##########################

CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration
let Web3 = require('web3');
let EthereumTransaction = require('ethereumjs-tx').Transaction; // Create, manipulate and sign Eth transactions`
let web3 = new Web3('http://127.0.0.1:8545');

// console.log(EthereumTransaction);

// -- Step 2: Set the sending and receiving addresses for the transaction.
let sendingAddress = '0x8dFaede1a18adb2D2c06f6EbC2BDFc22295aDaef';
let receivingAddress = '0x70F8BdFB0A23C09D27b6870a883A8540F2aF297E';

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

/*##########################

CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown
let rawTransaction = {
    nonce: 1,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 10000,
    data: '0x',
};

// -- Step 5: View the raw transaction rawTransaction

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

// Note: They haven't changed because they need to be signed...

/*##########################

Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
let privateKeySender =
    '3a0737fdf15c46688af413102aa21f88efd4efbc1b6973b7153975c7ae49fdc5';
let privateKeySenderHex = Buffer.from(privateKeySender, 'hex');
console.log('Buffer: ', privateKeySender);
let transaction = new EthereumTransaction(rawTransaction);
transaction.sign(privateKeySenderHex);

/*#########################################

Send the transaction to the network
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
let serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);