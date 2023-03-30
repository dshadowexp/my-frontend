const mongoose = require('mongoose');
const config = require('config');

function db() {
    const dbURL = config.get("db");
    mongoose
        .connect(dbURL)
        .then(() => {
            console.log(`Mongodb Connection Success: ${dbURL}`);
        })
        .catch((err) => {
            console.log(`Mongodb Connection Error: ${err}`);
        })
}

module.exports = db;