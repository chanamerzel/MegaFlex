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
       <h1 style={{color:'purple'}} className="title2">Items that are about to run out of stock</h1>
       <h1 style={{color:'purple'}} className="title2"> and it is necessary to order the items to replenish the stock</h1>
       <br></br>{items.map((item) =>
                    (<div className="box" key={item.CodeItem}>
                        <h4 style={{color:'purple'}} >item name:</h4>{item.ItemName}
                       {/* <span ><br></br>-----------------------------</span> */}
                       <h4 style={{color:'purple'}} >code item:</h4> {item.CodeItem}
                       {/* {/* <span ><br></br>-----------------------------</span> */} 
                        <h4 style={{color:'purple'}} >quantity left</h4>{item.QuantityItem}<br></br><br></br>
                       {/* {/* <span ><br></br>_____________________________</span> */} 
                    
                    </div>)
                )}
    </div>);
}