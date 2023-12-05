// ./routes/listtransactions.js
// * Lists all transactions in the system, not currently on blocks.

// * Imports
const Transaction = require("../src/transaction");

function listtransactions(app) {
    // List all transactions
    app.get("/listtransactions", function (request, response) {
        let transactionStr = global.navbar;
        // Loop through all transactions
        for (let i = 0; i < global.transactions.length; i++) {
            transactionStr += global.transactions[i].prettify();
        }
        response
            .status(200)
            .send(transactionStr);
    });
}

module.exports = listtransactions;
