// ./routes/validate.js
// * The server validates the blockchain.

function validate(app) {
    // Validate the server's instance of a blockchain
    app.get("/validate", function (request, response) {
        let responseMessage = global.navbar;

        // Validate the blockchain
        let isValid = global.blockchain.isChainValid();

        // Send the response
        if (isValid) {
            responseMessage += `<p>Blockchain is valid!</p>`;
        } else {
            responseMessage += `<p>Blockchain is invalid!</p>`;
        }
        response
            .status(200)
            .send(responseMessage);
    });
}

module.exports = validate;
