const express = require("express");
const app = express();
const dotenv = require('dotenv');

const db = require('./models');
const upload = require('./routes/upload');
const crud = require('./routes/crud');
const authRoute = require('./routes/auth');
const logger = require("./config/logger");

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/', crud );
app.use('/upload', upload);
app.use('/user',authRoute);

db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        logger.log('info',`Server started at ${PORT}`);
    });
    
}).catch((err) => {
    console.error(err);
});

