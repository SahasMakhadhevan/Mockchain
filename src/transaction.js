// ./src/transaction.js
// * Contains the class definition for a single transaction.

// Generates a random IPv4 address string as a mock address
function generateRandomIPv4() {
    let ipv4 = "";
    for (let i = 0; i < 4; i++) {
        ipv4 += Math.floor(Math.random() * 255) + 1;
        if (i < 3) {
            ipv4 += ".";
        }
    }
    return ipv4;
}

// Generates a random money amount as a mock amount
function generateRandomMoney() {
    return Math.floor(Math.random() * 100000);
}

class Transaction {
    constructor(sender = generateRandomIPv4(), receiver = generateRandomIPv4(), amount = generateRandomMoney()) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
    }
    prettify() {
        return `<div>Host: <i>${this.sender}</i> sent <i>${this.amount}</i> to <i>${this.receiver}</i></div>`

    }

    // Returns the hash of the current transaction
    // getHash() {
    //     return SHA256(this.sender + this.receiver + this.amount);
    // }
}

// Export this object to be used elsewhere
module.exports = Transaction;
