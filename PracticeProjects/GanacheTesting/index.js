let Web3 = require('web3');

// Run the ganache-cli in a separate terminal to start the server

let url = 'http://127.0.0.1:8545';
let web3 = new Web3(url);

// Call to view Web3 methods after instantiating
// console.log(web3);
web3.eth.getBalance(
    '0x818aeB74df1743Bba9A52BEa6F52F2fEC957F487',
    (err, result) =>
    err ?
    console.log(err) :
    console.log(web3.utils.fromWei(result, 'ether') + ' eth')
);
// web3.eth.getAccounts().then(accounts => console.log(accounts));