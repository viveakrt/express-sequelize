const express = require("express");
const app = express();
const db = require('./models');
const dotenv = require('dotenv');
const mysql = require("mysql2");
dotenv.config();

PORT = process.env.PORT;


db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    });
    
}).catch((err) => {
    console.error(err);
});

