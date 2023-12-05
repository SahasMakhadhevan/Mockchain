// ./src/blockchain.js
// * Contains the class definition for a blockchain.

// * Imports
const Block = require("./block"); // Our class definition for a block

class Blockchain {
    constructor() {
        this.chain = [new Block(Array(65).join("0"))]; // Genesis block
    }

    // Returns the last block in the chain
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Returns the length of our chain
    getChainLength() {
        return this.chain.length;
    }

    // Adds a new block to the chain
    addBlock() {
        let newBlock = new Block(this.getLastBlock().hash, global.transactions);
        // Freeze the new block to prevent tampering and concurrency issues
        this.chain.push((Object.freeze(newBlock)));
    }

    // Validates the chain
    isChainValid(blockchain = this) {
        // Iterating over the chain to check if hashes are correct
        for (let i = 1; i < blockchain.chain.length; i++) {
            // Get the current block
            let currentBlock = blockchain.chain[i];
            // Get the previous block
            let prevBlock = blockchain.chain[i - 1];

            // Validate hashes
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }

            // Check if the previous hash is correct
            if (currentBlock.prevHash !== prevBlock.hash) {
                return false;
            }

            // Check that the difficulty target has been hit on all blocks
            let checkString = Array(global.difficulty + 1).join("0");
            if (!currentBlock.hash.startsWith(checkString)) {
                return false;
            }
        }
        return true;
    }

    // Update the chain with a new blockchain
    replaceChain(newChain) {
        // Check if the new chain is longer than the current chain
        if (newChain.chain.length <= this.chain.length) return;

        // Check Chain Validity
        if (!this.isChainValid(newChain)) return;

        // Replace the chain
        this.chain = newChain.chain;

    }

    // Returns a string representation of the blockchain
    prettify() {
        // String to return
        let chainStr = "";

        // Iterate over the chain
        for (let i = 0; i < this.chain.length; i++) {
            chainStr += this.chain[i].prettify();
            chainStr += "<br><hr>";
        }
        return chainStr;
    }
}

// Export this object to be used elsewhere
module.exports = Blockchain;
