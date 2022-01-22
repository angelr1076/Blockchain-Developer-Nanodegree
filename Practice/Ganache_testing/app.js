// -- Step 1: Set up the appropriate configuration
let Web3 = require('web3');
let EthTransact = require('ethereumjs-tx').Transaction; // Create, manipulate and sign Eth transactions`
let web3 = new Web3('http://127.0.0.1:8545');

// -- Step 2: Set the sending and receiving addresses for the transaction.
let sendAddress = '0x28Fb76cd5CD3aDF0DeDF12F9bbFf0A2327EF4aDc';
let recAddress = '0x628613a62120a0A76F50bc6E97eee13ce952ABDf';

// -- Step 3: Check the balances of each address

// -- Step 4: Set up the transaction using the transaction variables as shown
let rawTransaction = {
  nonce: 1,
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
  'e0b349a01a475f5330055f2bf1977f9e1f5525339e480ec0455d523ca7a3a0e0';
let privateKeySenderHex = Buffer.from(privateKeySender, 'hex');
console.log('Buffer: ', privateKeySender);
let transaction = new EthTransact(rawTransaction);
transaction.sign(privateKeySenderHex);

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
let serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);
web3.eth.getBalance(sendAddress).then(console.log);
web3.eth.getBalance(recAddress).then(console.log);
