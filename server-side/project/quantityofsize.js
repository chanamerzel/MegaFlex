const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "shoesshop"
});

connection.connect((err) => {
    if (err) {
        console.log("7err " + err);

    } else
        console.log('connected');
});
console.log("in quantityofsize");

router.get('/stock', (req, res) => {
    console.log("in stock");
    let sqlQuery = `SELECT ItemCode,sum(Quantity) as sum FROM shoesshop.quantityofsize group by ItemCode;`
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("144444 err " + err);
        console.log("result: " + result);
        res.send(result);
    });
});

router.post('/:itemName', (req, res) => {
    const bodyData = req.body;
    connection.query(
        `SELECT *  FROM shoesshop.quantityofsize where ItemCode=${bodyData.code};`, (err, result) => {
            if (err)
                console.log("err");
            res.send(result);
        }
    );
})

module.exports = router;