const express = require("express");
const app = express();
const db = require('./models');
const dotenv = require('dotenv');
const upload = require('./routes/upload');
const crud = require('./routes/crud');
const mysql = require("mysql2");

dotenv.config();



PORT = process.env.PORT;

app.use('/', crud );
app.use('/upload', upload);

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    });
    
}).catch((err) => {
    console.error(err);
});

