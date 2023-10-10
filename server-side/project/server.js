const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3678;
app.use(express.json({ limit: '1mb' }))
app.use(cors());
app.use(express.json());
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "shoesShop"
});

connection.connect((err) => {
    if (err) {
        throw err;
    } else
        console.log('connected');
});
const image = require('./image_upload');
const customer = require('./customer');
const products = require('./products');
const orders = require('./orders');
const cart = require('./cart');

app.get('/', (req, res) => { res.json("server"); });
app.use('/image', image);
app.use('/customer', customer);
app.use('/products', products);
app.use('/orders', orders);
app.use('/cart', cart);

app.use(express.static('images'));
app.listen(port, () => {
    console.log('server is up and running');
});