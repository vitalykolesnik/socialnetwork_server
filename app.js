require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db_connect');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 5000;

const router = require('./routes/router');

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    })
);
app.use(cookieParser());
app.use(express.json());
app.use('/', express.static(`${__dirname}/uploads`));
app.use('/', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () =>
            console.log(`Server started at port ${PORT}...`)
        );
    } catch (err) {
        console.log(err.message);
    }
};

start();
