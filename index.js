``// ./index.js
// * Imports
const express = require("express"); // Imports Express's class definition
const morgan = require("morgan"); // Imports Morgan's class definition
// Imports from our class modules
const Blockchain = require("./src/blockchain");

// Global variables
global.difficulty = 5; // Target number of 0s
global.blockchain = new Blockchain(); // Create a blockchain instance
global.transactions = []; // CReate an empty array for transactions

// create an express app
const app = express();
// use morgan for logging
app.use(morgan("dev"));

// port to listen on
const port = 8080;

global.navbar = `<div>
    <a href="http://localhost:${port}"><button type="button">Home</button></a>
    <a href="http://localhost:${port}/mine"><button type="button">Mine</button></a>
    <a href="http://localhost:${port}/newtransaction"><button type="button">New Transaction</button></a>
    <a href="http://localhost:${port}/listtransactions"><button type="button">List Transactions</button></a>
    <a href="http://localhost:${port}/validate"><button type="button">Validate</button></a>
    <a href="http://localhost:${port}/brew"><button type="button">Brew Coffee</button></a>
    <br>
</div>`;

// Dynamically load all routes with DLR
require("./routes/dlr.js")(app);

// got the server configured and running
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})