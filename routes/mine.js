// ./routes/mine.js
// * The server mines a new block, and adds it to its personal chain.

function mine(app) {
    app.get("/mine", (request, response) => {
        let responseMessage = global.navbar;

        // Add a block to the chain
        global.blockchain.addBlock();

        // Clear our transactions
        global.transactions = [];

        // Send the block that was mined
        responseMessage += `<p>Block added: ${global.blockchain.getLastBlock().prettify()}</p>`;
        response
            .status(200)
            .send(responseMessage);
    });
}

module.exports = mine;
