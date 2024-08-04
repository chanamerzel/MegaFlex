const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "1234",
    database: "shoesshop"
});

connection.connect((err) => {
    if (err) {
        console.log("7err " + "err");

    } else
        console.log('connected');
});
console.log("in cart");
router.get('/getByItemAndSize/:itemCode/:size', (req, res) => {
        const itemCode = req.params.itemCode;
        const size = req.params.size;
        const query = `SELECT * FROM shoesshop.itemsincart  join shoesshop.orders where OrderCode=OrderID and Status !=2 and CodeItem=${itemCode} and ItemInCartSize=${size}; `
        connection.query(query, (err, response) => {
            if (err)
                console.log("5err " + err);
            res.send(response);
        });

    })
    // router.put('/cartUpdate', (req, res) => {
    //     let orderid = req.body.OrderID;
    //     const bodyData = req.body.update;
    //     console.log(bodyData);
    //     console.log("cartUpdate");
    //     bodyData.forEach(element => {
    //         connection.query(
    //             `UPDATE shoesshop.itemsincart
    //         SET CodeItem ="${element.CodeItem}",OrderID=${orderid},Quantity=${element.Quantity}
    //         WHERE ItemInCartCode = ${element.ItemInCartCode}`, (err, rows) => {
    //                 if (err)
    //                     console.log("1err " + err);
    //             }
    //         );
    //     });

//     res.send(true);
// })


// router.put('/quantity', (req, res) => {
//     const bodyData = req.body.quantity;
//     console.log(bodyData);
//     console.log("quantity");
//     bodyData.forEach(element => {
//         console.log(element)
//         connection.query(
//             `UPDATE shoesshop.itemsincart
//         SET Quantity ="${element.quantity}"`

//             , (err, rows) => {
//                 if (err)
//                     console.log("element.quantity " + element.quantity);
//                 console.log("2err " + err);
//             }
//         );
//     });

//     res.send(true);
// })

router.put('/update_items_in_cart', (req, res) => {
    const bodyData = req.body.quantity;
    const orderid = req.body.orderid;
    console.log(bodyData[0]);
    console.log("quantity: " + req.body);
    bodyData.forEach(element => {
        let text = `UPDATE shoesshop.itemsincart 
        SET Quantity=${element.QuantityItem},ItemInCartSize=${element.ItemInCartSize} where ItemInCartCode=${element.ItemInCartCode}`;

        connection.query(text, (err, rows) => {
            console.log("text:  " + text)
            if (err)
                console.log("element  quantity: " + element.QuantityItem);
            console.log("2err " + "err");

            console.log("element  shoeSize: " + element.ItemInCartSize);
            console.log("element  CodeItem: " + element.CodeItem);
            console.log("element  orderid: " + orderid);
            console.log("element  CodeItem: " + element.CodeItem);

        });

        // connection.query(
        //     `UPDATE shoesshop.quantityofsize 
        //     SET Quantity=${element.QuantityItem},ItemInCartSize=${element.ItemInCartSize} where CodeItem=${element.CodeItem} and OrderID =${orderid}`, (err, rows) => {
        //         if (err)
        //             console.log("element  quantity: " + element.QuantityItem);
        //         console.log("element  shoeSize: " + element.ItemInCartSize);
        //         console.log("element  CodeItem: " + element.CodeItem);
        //         console.log("element  orderid: " + orderid);
        //         console.log("2err " + err);
        //     }
        // );
    });
    res.send(true);
})


// router.put('/update/quantity$shoeSize', (req, res) => {
//     const bodyData = req.body.quantity;
//     console.log("/update/quantity$shoeSize  " + bodyData);
//     console.log("quantity");
//     bodyData.forEach(element => {
//         console.log("element: " + element)
//         connection.query(
//             ` UPDATE shoesshop.itemsincart 
// 		SET Quantity ="${element.QuantityItem}",ItemInCartSize=${element.ItemInCartSize} where ItemInCartCode="${element.ItemCartCode}";`

//             , (err, rows) => {
//                 if (err)
//                     console.log("2err " + err);
//             }
//         );
//     });

//     res.send(true);
// })



router.post('/shopingCart', (req, res) => {
    console.log("req.body" + req.body.password);
    let sqlQuery = `select * from itemsincart i
    join orders o on o.ordercode = i.orderid
    join items it on i.codeitem = it.CodeItem
    where o.customerid ="${req.body.password}" and Status = 0`;

    connection.query(sqlQuery, (err, result, fields) => {
        if (err) console.log("3err " + "err");

        res.send(result);

    });
});

router.post("/insert", (req, res) => {
        const bodyData = req.body.post;
        let orderid = req.body.OrderID
        let query = `SELECT OrderCode FROM shoesshop.orders;`;
        // let response = []
        // connection.query(query,
        //     (err, rows, fields) => {
        //         if (err)
        //             console.log("4err " + "insert query");
        //         console.log(query);
        //         response = rows;

        //     }
        // );
        // console.log("response.includes(orderid): " + JSON.stringify(response))
        // if (response.includes(orderid)) {

        bodyData.forEach(element => {
            let text = `INSERT INTO shoesshop.itemsincart (CodeItem, OrderID, Quantity, ItemInCartSize) VALUES ('${element.CodeItem}','${orderid}','${element.QuantityItem}','${element.ItemInCartSize}')`

            connection.query(text,
                (err, rows, fields) => {
                    if (err)
                        console.log("4err " + "bodyData: " + bodyData);
                    console.log(text);
                }
            );


        });
        // }
        connection.query(
            `SELECT (ItemInCartCode) FROM shoesshop.itemsincart where OrderID=${orderid}`, (err, ros) => {
                if (err)
                    console.log("33454err");
                res.send(ros)
            });
    }

);
// bodyData.forEach(element => {
//     connection.query(
//         `SELECT ItemInCartCode,CodeItem FROM shoesshop.itemsincart where CodeItem=${element.CodeItem} and OrderID="${orderid}" and ItemInCartSize="${element.ItemInCartSize}";`,
//         (err, rows, fields) => {
//             console.log("rows" + rows[0]);
//             // res.send(rows)
//             return_array.push(rows);
//             if (err)
//                 console.log(p);
//         }
//     );
// });
// console.log("return_array " + return_array)
// res.send(return_array);

router.delete("/deleteitem", (req, res) => {
    let body = req.body.myproduct;
    console.log("body" + body);
    let sqlQuery = `DELETE FROM itemsincart WHERE CodeItem="${body.CodeItem}" AND OrderID="${req.body.orderid}"`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) {
            console.log("5err " + "err");
            res.send(false);

        } else {
            console.log("result" + result);
            res.send(result);
            return;
        }
    });
});
router.delete("/delete/allitem", (req, res) => {
    let body = req.body;
    console.log("body" + body);
    let sqlQuery = `DELETE FROM itemsincart WHERE OrderID="${body.orderid}"`;
    console.log(sqlQuery);
    connection.query(sqlQuery, (err, result, fields) => {
        if (err) {
            console.log("6err " + "err");
            res.send(false);

        } else {
            console.log(result);
            res.send(result);
        }
    });
});
console.log("out of cart")
module.exports = router;