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

    let totalP;
   

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
                    (<div className="box">
                        <p className='title3'>order code:</p>
                        {order.OrderCode}
                        <p className='title3'>order price:</p>
                        {order.OrderPrice}     
                    </div>)
                )}
                 <p className='title'>total profit:</p>
                    <p className="total">{sumprices(orders)}</p>

        </div>);
}