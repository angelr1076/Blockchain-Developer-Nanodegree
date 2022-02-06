/* ===== SHA256 with Crypto-js ===================================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js      |
|  =============================================================*/

const SHA256 = require('crypto-js/sha256');

/* ===== Block Class ===================================
|  Class with a constructor for block data model       |
|  ====================================================*/

class Block {
    constructor(data) {
        this.height = '';
        this.timeStamp = '';
        this.data = data;
        this.previousHash = '0x';
        this.hash = '';
    }

    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            // Save in auxiliary variable the current block hash
            let currentHash = {...self, hash: null };

            console.log('Current hash: ', currentHash);
            // Recalculate the hash of the Block
            const recalculatedHash = SHA256(JSON.stringify(currentHash)).toString();
            console.log('Recalc hash: ', recalculatedHash);
            // Comparing if the hashes changed
            self.hash === recalculatedHash ?
                resolve(true) :
                resolve(
                    false,
                    Error(
                        `The current block has been tampered with ${currentHash} !== ${recalculatedHash}`
                    )
                );
        });
    }
}

/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/

class Blockchain {
    constructor() {
        // new chain array
        this.chain = [];
        // add first genesis block
        this.addBlock(this.createGenesisBlock());
    }

    createGenesisBlock() {
        return new Block('First block in the chain - Genesis block');
    }

    // getLatest block method
    getLatestBlock() {
        // Go to the end of the chain index minus 1
        return this.chain[this.chain.length - 1];
    }

    // addBlock method
    addBlock(newBlock) {
        // block height
        newBlock.height = this.chain.length;
        // UTC timestamp
        newBlock.timeStamp = new Date().getTime().toString().slice(0, -3);
        // console.log(newBlock.timeStamp);
        if (this.chain.length > 0) {
            // previous block hash
            newBlock.previousHash = this.getLatestBlock().hash;
        }
        // SHA256 requires a string of data
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        newBlock.validate();
        // add block to chain
        this.chain.push(newBlock);
    }
}

let blockchain = new Blockchain();
blockchain.addBlock(new Block('test1'));

// blockchain.addBlock(new Block('test2'));
// blockchain.addBlock(new Block('test3'));