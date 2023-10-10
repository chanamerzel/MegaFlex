import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import '../App.css';

export default function Manager_Items_To_Order(props) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        async function getAllOrders() {
            let prod = await fetch("http://localhost:3678/products/itemsToOrder", {
                method: 'GET'
            });
            let pro = await prod.json();
            setItems(pro);
        }
        getAllOrders();
    }, []);

    return (<div>
        <Nav />
        <br /><br /><br />
       <h1 className="title2">Items that are about to run out of stock</h1>
       <h1 className="title2"> and it is necessary to order the items to replenish the stock</h1>
       <br></br>{items.map((item) =>
                    (<div className="box" key={item.CodeItem}>
                        <p className="title3">item name:</p>{item.ItemName}
                       <p className="title3">code item:</p> {item.CodeItem}
                        <p className="title3">quantity left</p>{item.QuantityItem}<br></br><br></br>
                    </div>)
                )}
    </div>);
}