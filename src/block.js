// ./src/block.js
// * Contains the class definition for a single block.

// * Imports
const crypto = require("crypto"); // Used for encryption algorithms; Built-in
// Define a SHA256 hash function from our crypto library
function SHA256(message) {
    return crypto
        .createHash("sha256") // Set the hashing algorithm to SHA256
        .update(message) // Update the hash with the message
        .digest("hex"); // Return the hash as a hexadecimal string
}

class Block {
    constructor(prevHash = "", transactions = []) {
        this.timestamp = Date.now();
        this.prevHash = prevHash
        this.transactions = transactions;
        this.hash = this.getHash();
        this.nonce = 0;

        // Mine the block
        this.mine();
    }

    // Returns the hash of the current block
    getHash() {
        let txStr = "";
        // Extra 10% if you create a merkel tree
        for (let i = 0; i < this.transactions.length; i++) {
            // txStr += this.transactions[i].getHash();
            txStr += JSON.stringify(this.transactions[i]);
        }

        // Hash these together
        return SHA256(this.prevHash + this.timestamp + txStr + this.nonce);

        // Step 1: Collect all transaction data
        // let txData = [];
        // for (let i = 0; i < this.transactions.length; i++) {
        //     txData.push(JSON.stringify(this.transactions[i]));
        // }
        //
        // // Step 2: Create an array of initial hash values
        // let hashes = txData.map(tx => SHA256(tx));
        //
        // // Step 3: Create the Merkle tree by pairing and hashing adjacent hash values
        // while (hashes.length > 1) {
        //     // Pair up adjacent hash values
        //     let pairs = [];
        //     for (let i = 0; i < hashes.length; i += 2) {
        //         let left = hashes[i];
        //         let right = (i + 1 < hashes.length) ? hashes[i+1] : left; // if there's no right node, use the left node again
        //         pairs.push(left + right);
        //     }
        //     // Hash the pairs together to create the next level of the Merkle tree
        //     hashes = pairs.map(pair => SHA256(pair));
        // }
        //
        // // Step 4: Return the Merkle root hash
        // return hashes[0];
    }

    // Mine a new block (generate a hash that works)
    mine() {
        // Creating a string to check if the current hash
        // has the number of 0s in front as necessary
        let checkString = Array(global.difficulty + 1).join("0");

        // Keeping track of tries
        let tries = 0;
        while (!this.hash.startsWith(checkString)) {
            // Increment the nonce
            this.nonce++;

            // Get a new hash
            this.hash = this.getHash();

            // Increment the tries
            tries++;
        }

        // Print the number of tries it took to mine the block
        console.log(`Mined block in ${tries} tries. Hash: ${this.hash}`);
    }

    // Pretty prints the block
    prettify() {
        let blockstr = `<div><b>Block:</b> #${this.hash}</div>`;
        blockstr += `<div><b>Timestamp:</b> ${this.timestamp}</div>`;
        blockstr += `<div><b>Previous Hash:</b> ${this.prevHash}</div>`;
        blockstr += `<div><b>Transactions:</b> ${this.transactions.length}`;
        for (let i = 0; i < this.transactions.length; i++) {
            blockstr += "   " + this.transactions[i].prettify();
        }
        blockstr += "</div>";
        return blockstr;
    }
}

// Export this object to be used elsewhere
module.exports = Block;
