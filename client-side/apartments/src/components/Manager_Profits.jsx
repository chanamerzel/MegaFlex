import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import '../App.css';
export default function Manager_Profits(props) {
    const [orders, setOrders] = useState([{}]);
    useEffect(() => {
        async function getOrdersProfit() {
            let prod = await fetch("http://localhost:3678/orders/profits", {
                method: 'GET'
            });
            let pro = await prod.json();
            setOrders(pro);
        }
        getOrdersProfit();
    }, []);
    function sumprices(orders) {
        let sum =0;
        orders.forEach(function(order){
            sum += order.OrderPrice;
        })
        return sum;
    }
    return (<div>
        <Nav />
        <br/><br/><br/>
        {orders.map((order) => 
                    (<div style={{borderBottom:"8px solid white"}} className="box">
                        <p className='title3'><strong>order code: </strong>{order.OrderCode}</p>
                        <p className='title3'><strong>order price:</strong>{order.OrderPrice}$</p>
                    </div>)
                )}
                 <p className='title'>Total Revenues:</p>
                    <p className="total">{sumprices(orders)}$</p>
        </div>);
}