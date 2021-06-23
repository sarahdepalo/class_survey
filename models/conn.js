require('dotenv').config();

// These values will usually change but the rest will generally be the same. 
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// You can copy and paste this each time you use pg promise
const pgp = require('pg-promise')({
    query: function(event) {
        console.log("QUERY: ", event.query);
    }
});

const options = {
    host, 
    database, 
    user, 
    password
}

const db = pgp(options);

module.exports = db;