// ./routes/newtransaction.js
// * Creates a new mock transaction and adds it to the system.

// * Imports
const Transaction = require("../src/transaction");

function newtransaction(app) {
    // Create a new transaction
    app.get("/newtransaction", function (request, response) {
        let responseMessage = global.navbar;

        // Create a new transaction
        let transaction = new Transaction();

        // Add the transaction to the list of transactions
        global.transactions.push(transaction);

        // Send the transaction that was created
        responseMessage += `<p>Transaction added: ${transaction.prettify()}</p>`;
        response
            .status(200)
            .send(responseMessage);
    });
}

module.exports = newtransaction;
