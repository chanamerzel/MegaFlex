const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "shoesShop"
});

connection.connect((err) => {
    if (err) {
        console.log("8err " + err);

    } else
        console.log('connected');
});
router.post("/", (req, res) => {
    const bodyData = req.body;
    console.log(bodyData);
    let p = `INSERT INTO Customers(CustomerID,FirstName,Address)  VALUES(${bodyData.password},"${bodyData.username}","no addres")`;
    console.log(p);

    connection.query(
        `INSERT INTO Customers(CustomerID,FirstName,Address)  VALUES("${bodyData.password}","${bodyData.username}","no addres")`, (err, rows) => {
            if (err)
                console.log(err);
            console.log(bodyData.username);
        }
    );
});
router.post('/getcustomers', (req, res) => {
    console.log(`PPPPPPPPPPPPPPreq.body${JSON.stringify(req.body)}`);
    let sqlQuery = `SELECT * FROM customers WHERE FirstName="${req.body.username}" AND CustomerID="${req.body.password}"  ;`
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err)
            console.log(err);
        console.log(result);
        if (result.length == 0) {
            console.log("false");
            res.send(false);
        } else {
            console.log(result);
            res.send(result);

        }
    });
});
router.delete("/delete/customer", (req, res) => {
    let body = req.body;
    console.log("body" + body);
    let sqlQuery = `DELETE FROM customers WHERE OrderID="${body.orderid}" `;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) {
            console.log("6err " + err);
            res.send(false);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});
router.get('/allCustomers', (req, res) => {
    let sqlQuery = `SELECT * FROM customers`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

});
module.exports = router;