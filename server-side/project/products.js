const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');
const port = 3676;
router.use(cors());
const connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "1234",
    database: "shoesshop"
});

connection.connect((err) => {
    if (err) {
        console.log("17 err " + err);

    } else
        console.log('connected');
});
router.get('/', (req, res) => {
    console.log("in products");
    let sqlQuery = `SELECT * FROM items;`
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("18 err " + err);
        console.log(result);
        res.send(result);

    });
});

router.get('/GetItemCartCode', (req, res) => {
    console.log("in products");
    let sqlQuery = `SELECT * FROM items;`
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("18 err " + err);
        console.log(result);
        res.send(result);

    });
});
router.get('/category/:category', (req, res) => {
    let cName = req.params.category;
    console.log(cName);
    let sqlQuery = `SELECT CategoryCode FROM categories WHERE CategoryName="${cName}" `;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("19 err " + err);
        console.log(result);
        res.send(result);


    });

});
router.get('/codecategory/:codeCateg', (req, res) => {
    let cCode = req.params.codeCateg;
    console.log("cCode" + cCode);
    let sqlQuery = `SELECT * FROM items WHERE CodeCategory="${cCode}"`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("20 err " + err);
        console.log(result);
        res.send(result);
    });
});
router.get('/allcategories', (req, res) => {
    let sqlQuery = `SELECT * FROM categories `;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("22 err " + err);
        console.log(result);
        res.send(result);
    });

});

// router.post('/save', (req, res) => {
//     const bodyData = req.body;
//     var path = String(bodyData.path)
//     console.log("path: " + typeof path)
//     if (!path.includes('http://localhost:3678/')) {
//         path = 'http://localhost:3678/' + path;
//     }
//     console.log("path: " + path)

//     let txt = `INSERT INTO items(ItemName,CodeCategory,Price,QuantityItem,description,path)  VALUES("${bodyData.name}","${bodyData.category}","${bodyData.price}","${bodyData.amount}","${bodyData.description}","${path}");select CodeItem from items where ItemName='${bodyData.name}' and CodeCategory='${bodyData.category}' and Price like ${parseFloat(bodyData.price)} and QuantityItem='${bodyData.amount}' and description='${bodyData.description}' and path='${path}';`
//     console.log(txt);
//     connection.query(
//         txt, (err, response) => {
//             if (err)
//                 console.log(err);
//             res.send(response);
//             console.log(bodyData.name);
//         }
//     );

// })

router.post('/save', (req, res) => {
    const bodyData = req.body;
    var path = String(bodyData.path)
    console.log("path: " + typeof path)
    if (!path.includes('http://localhost:3678/')) {
        path = 'http://localhost:3678/' + path;
    }
    console.log("path: " + path)

    const insertQuery = `INSERT INTO items(ItemName,CodeCategory,Price,QuantityItem,description,path)  VALUES("${bodyData.name}","${bodyData.category}","${bodyData.price}","${bodyData.amount}","${bodyData.description}","${path}")`;

    connection.query(insertQuery, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            // return res.status(500).send('Error inserting data');
        }

        // Once the insert is successful, execute the select query
        const selectQuery = `SELECT CodeItem FROM items WHERE ItemName='${bodyData.name}' AND CodeCategory='${bodyData.category}' AND Price like '${bodyData.price}' AND QuantityItem='${bodyData.amount}' AND description='${bodyData.description}' AND path='${path}'`;

        connection.query(selectQuery, (err, rows) => {
            if (err) {
                console.error('Error selecting data:', err);
                return res.status(500).send('Error selecting data');
            }

            // Send the result of the select query back to the client
            res.send(rows);
        });
    });
});

router.put('/save', (req, res) => {
    const bodyData = req.body;
    let path = String(bodyData.newpro.path)
    console.log(typeof path);

    if (!path.includes('http://localhost:3678/')) {
        path = 'http://localhost:3678/' + path;
    }
    let txt = `UPDATE shoesshop.items
        SET ItemName ="${bodyData.newpro.name}",CodeCategory=${bodyData.newpro.category},
        Price = ${bodyData.newpro.price},QuantityItem=${bodyData.newpro.amount},
        description="${bodyData.newpro.description}",
        path="${path}"
        WHERE CodeItem = ${bodyData.newpro.code}`
    console.log(bodyData.lastpr.name);
    console.log(txt);
    connection.query(
        txt, (err, rows) => {
            if (err)
                console.log(err);
        }
    );
    res.send(true);
})

router.put('/Update_Quantity', (req, res) => {
    // const bodyData = req.body.cart;
    // console.log(bodyData);
    let txt = `update shoesshop.items t2, (SELECT ItemCode,sum(Quantity) as sum from quantityofsize group by ItemCode ) t1 
        set t2.QuantityItem=t1.sum
         where t2.CodeItem=t1.ItemCode;`
    console.log(txt)
    connection.query(
        txt, (err, rows) => {
            if (err)
                console.log(err);
        }
    );
    res.send(true);
})
console.log("in pro");
router.delete("/:code", (req, res) => {
    let code = req.params.code;
    console.log("code" + code);
    let sqlQuery = `DELETE FROM items WHERE CodeItem="${code}"`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) {
            console.log("14 err " + err);
            res.send(false);


        } else {
            console.log(result);
            res.send(result);
        }
    });
});
router.post("/item/name", (req, res) => {
    let body = req.body;
    console.log("/item/name" + req);
    let sqlQuery = ` SELECT *FROM shoesshop.items
    JOIN shoesshop.itemsincart join shoesshop.orders ON items.CodeItem = itemsincart.CodeItem and orders.OrderCode=itemsincart.OrderID
   WHERE itemsincart.ItemInCartCode is not null and Status!=2 and itemsincart.CodeItem="${body.OrderID}" ;`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) {
            console.log("15 err " + err);

        } else {
            console.log("result" + " " + result + " mmm");
            res.send(result);
        }
    });
});

router.post("/itemsInOrder", (req, res) => {
    let body = req.body;
    console.log("/item/name" + req);
    let sqlQuery = `SELECT *
    FROM shoesshop.items
    LEFT JOIN shoesshop.itemsincart ON items.CodeItem = itemsincart.CodeItem
    WHERE itemsincart.ItemInCartCode is not null and itemsincart.OrderID=${body.OrderID}`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) {
            console.log("15 err " + err);

        } else {
            console.log("result" + " " + result + " mmm");
            res.send(result);
        }
    });
});


router.get("/itemdetails/:code", (req, res) => {
    let code = req.params.code;
    console.log("name" + code);
    let sqlQuery = `SELECT * FROM items WHERE CodeItem=${code};`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) {
            console.log("16 err " + err);
            res.send(false);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});
router.post('/limit', (req, res) => {
    let limitt = req.body.limit;
    console.log("in products" + req);
    let sqlQuery = `SELECT * FROM items limit 10 offset  ${limitt} `;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
router.post('/saveCategory', (req, res) => {
    const bodyData = req.body;
    console.log(bodyData);
    connection.query(
        `INSERT INTO categories(CategoryName)  VALUES("${bodyData.CategoryName}")`, (err, rows) => {
            if (err)
                console.log(err);
            console.log(bodyData.CategoryName);
        }
    );
    res.send(true);
})
router.get('/itemsToOrder', (req, res) => {
    let sqlQuery = `SELECT * FROM items WHERE QuantityItem<10 `;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

});
module.exports = router;