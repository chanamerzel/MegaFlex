const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const mysql = require('mysql2');
router.use(express.json());
router.use(express.text());
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
router.post('/add', (req, res) => {
    console.log("/orders/add");
    let bodyData = req.body;
    console.log(req);
    let sqlQuery = `INSERT INTO orders (CustomerID,OrderPrice,DateOrder,Status) VALUES("${bodyData.customerid}","${bodyData.orderprice}","${bodyData.date}","0");`
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("9err " + err);

    });

    sqlQuery = `SELECT OrderCode FROM shoesshop.orders WHERE CustomerID="${bodyData.customerid}" AND Status="0" ;`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("10 err " + err);
        res.send(result);
        console.log(result);
    });
});
router.post('/setOrder', (req, res) => {
    let bodyData = req.body;
    console.log("bodyData: " + bodyData + " bodyData.address: " + bodyData.address + " bodyData.customerid: " + bodyData.customerid);
    let sqlQuery = `UPDATE customers SET Address="${bodyData.address}" where CustomerID="${bodyData.customerid}";`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, rows) => {
        if (err) console.log("11 err " + err);
    });
    res.send(true);
});
router.get('/profits', (req, res) => {
    console.log("in orders");
    let sqlQuery = `SELECT * FROM orders WHERE Status=1 or Status=2`;
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("12 err " + err);
        console.log(result);
        res.send(result);

    });
});
router.post('/ifexists', (req, res) => {
    console.log("in orders");
    let bodydata = req.body;
    console.log(bodydata);
    console.log(req);
    let sqlQuery = `select * from orders where Status="0" and CustomerID="${bodydata.customerid}";`;
    console.log(sqlQuery);

    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("13 err " + err);
        if (result.length == 0) {
            res.send(false);
        } else {
            res.send(result);
        }
        // res.json(resulaat);
        console.log(result);
    });
});

router.get('/ordered', (req, res) => {
    console.log("in orders");
    let sqlQuery = `SELECT * FROM shoesshop.orders
    join customers on customers.CustomerID=orders.CustomerID
    where orders.Status=1;`;
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("23 err " + err);
        console.log(result);
        res.send(result);

    });
});

router.put('/updateOrdered/1', (req, res) => {
    const bodyData = req.body
    connection.query(
        `UPDATE orders
        SET Status =1
        WHERE OrderCode = ${bodyData.OrderCode}`, (err, rows) => {
            if (err)
                console.log(err);
            res.send(true);
        }
    );
})
router.put('/updateOrdered/price', (req, res) => {
    const bodyData = req.body
    console.log("bodyData: " + bodyData + "bodyData.OrderPrice: " + bodyData.OrderPrice + "bodyData.OrderCode: " + bodyData.OrderCode)
    connection.query(
        `UPDATE orders
        SET OrderPrice =${bodyData.OrderPrice}
        WHERE OrderCode = ${bodyData.OrderCode}`, (err, rows) => {
            if (err)
                console.log(err);
            res.send(true);
        }
    );
})
router.put('/updateOrdered/2', (req, res) => {
    const bodyData = req.body
    connection.query(
        `UPDATE orders
        SET Status =2
        WHERE OrderCode = ${bodyData.OrderCode}`, (err, rows) => {
            if (err)
                console.log(err);
        }
    );
})

router.get('/itemsInOrder/:OrderCode', (req, res) => {
    let OrderCode = req.params.OrderCode;
    let sqlQuery = `SELECT b.ItemName, b.path from shoesshop.itemsincart a JOIN shoesshop.items b ON a.CodeItem = b.CodeItem
    where OrderID = "${OrderCode}";`;
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
});

module.exports = router;