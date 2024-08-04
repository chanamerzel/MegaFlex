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


router.get('/get/:code', async(req, res) => {
    const bodyData = req.body;
    const code = req.params.code
    let p = `SELECT *  FROM shoesshop.quantityofsize where ItemCode=${code};`
    console.log(p)
    connection.query(
        p, (err, result) => {
            if (err)
                console.log("err");
            res.send(result)
        });

})

router.post('/getShoeSizes', async(req, res) => {
    const bodyData = req.body.products;
    // let check = false
    var response = []

    console.log(JSON.stringify(bodyData))
        // await Promise.all(
    bodyData.map((element, i) => {
        fetch(`/get/${element.CodeItem}`)
        let shoeSizesArray = fetch(`/get/${element.CodeItem}`, {
            method: 'GET'
        });
        response.push(shoeSizesArray)
            // let p = `SELECT *  FROM shoesshop.quantityofsize where ItemCode=${element.CodeItem};`
            // console.log(p)
            // connection.query(
            //     p, (err, result) => {
            //         if (err)
            //             console.log("err");
            //         console.log("result" + JSON.stringify(result))
            //             // check = true
            //             // console.log("response" + JSON.parse(response))

        //         response.push(result);
        //         // console.log("response::: " + JSON.stringify(response))
        //         if (response.length == bodyData.length) {
        //             res.send(response)
        //         }
        //         console.log("response: " + (response.length))

        //     });

    })

    // )
    // console.log("response::: " + JSON.stringify(response))
    // if (check)

    //now execute promise all
    // Promise.all(response)
    //     .then((reslt) => res.json(response))
    //     .catch((err) => res.send(err));
    res.send(await response)

})
router.post('/item/:itemName', (req, res) => {
    const bodyData = req.body;
    let p = `SELECT *  FROM shoesshop.quantityofsize where ItemCode=${bodyData.code};`
    console.log(p)
    connection.query(
        p, (err, result) => {
            if (err)
                console.log("err");
            res.send(result);
        }
    );
})
router.post('/insert', (req, res) => {
    const body = req.body;
    var codeItem = body.codeItem;
    const bodyData = body.body;
    console.log(bodyData);

    bodyData.forEach(item => {
        let p = `insert into quantityofsize (ItemCode, ShoeSize, Quantity) values(${codeItem}, ${item.ShoeSize},${item.Quantity});`
        console.log(p)
        connection.query(
            p, (err, result) => {
                if (err) {
                    console.log("err: " + req.codeItem);
                }
                res.send(true);
            }
        );
    });
})
router.put('/reduce_Quantity', (req, res) => {
    const bodyData = req.body;
    console.log(bodyData);
    bodyData.forEach(item => {
        let txt = `update shoesshop.quantityofsize t2, 
        (SELECT * from quantityofsize ) t1 ,(SELECT * from quantityofsize  ) t3
        set t2.Quantity=t1.Quantity-${item.QuantityItem}
         where t2.quantityindex=t3.quantityindex  and 
         t1.ItemCode=${item.CodeItem} and t1.ShoeSize=${item.ItemInCartSize} and
          t3.ItemCode=${item.CodeItem} 
         and t3.ShoeSize=${item.ItemInCartSize};
        `
        console.log(txt)
        connection.query(
            txt, (err, rows) => {
                if (err)
                    console.log(err);
            }
        );
    });

    res.send(true);
})

router.put('/Update_Quantity', (req, res) => {
    const bodyData = req.body;
    console.log(bodyData);
    bodyData.forEach(item => {
        let txt = `update shoesshop.quantityofsize 
        set Quantity=${item.Quantity}
         where ItemCode=${item.ItemCode} and ShoeSize=${item.ShoeSize};
        `
        console.log(txt)
        connection.query(
            txt, (err, rows) => {
                if (err)
                    console.log(err);
            }
        );
    });

    res.send(true);
})
router.delete("/delete/:itemCode/:size", (req, res) => {
    let code = req.params.itemCode;
    let size = req.params.size;
    let sqlQuery = `DELETE FROM quantityofsize WHERE ItemCode="${code}" and ShoeSize=${size}`;
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
module.exports = router;