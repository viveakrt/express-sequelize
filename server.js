const express = require("express");
const app = express();
const db = require('./models');
const dotenv = require('dotenv');
const upload = require('./routes/upload');
const crud = require('./routes/crud');
const mysql = require("mysql2");
const logger = require("./config/logger");

dotenv.config();

app.use(express.json());

PORT = process.env.PORT;

app.use('/', crud );
app.use('/upload', upload);


db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        logger.log('info',`Server started at ${PORT}`);
    });
    
}).catch((err) => {
    console.error(err);
});

