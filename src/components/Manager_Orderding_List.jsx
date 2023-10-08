import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import '../App.css';

export default function Manager_Orderding_List(props) {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [show, setShow] = useState([false]);
    const [showbtn, setShowbtn] = useState("show");

    useEffect(() => {
        async function getAllOrders() {
            let prod = await fetch("http://localhost:3678/orders/ordered", {
                method: 'GET'
            });
            let pro = await prod.json();
            initShow(pro);
            setOrders(pro);
            

        }
        getAllOrders();
    }, []);

    const initShow=(pro)=>{
        let arr=[];
for(let i=0;i<pro.length;i++){
    arr.push(false);
}
setShow(arr);
    }
    async function updateOrder(order) {
        let ans = await fetch("http://localhost:3678/orders/updateOrdered/2", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                OrderCode: order.OrderCode

            })
        });
        ans = await ans.json();
    }

    async function isChecked(order) {
        updateOrder(order);
        let index = orders.indexOf(order)
        orders.splice(index, 1);
        setOrders(orders);
        window.location.reload();
    }

    async function showItems(OrderCode,index) {
        let prod = await fetch(`http://localhost:3678/orders/itemsInOrder/${OrderCode}`, {
            method: 'GET'
        });
        let pro = await prod.json();
        setItems(pro);
        let arr=[...show];
        for(let i=0;i<arr.length;i++)
        {
            if(i!=index)
            {
                arr[i]=false;
            }
        }

        arr[index]=!arr[index];
        setShow(arr);
    }
    function onclickShowBtn(){
        if (showbtn == "show"){
            setShowbtn("hide")
        }else{
            setShowbtn("show")
        }
    }
  
    return (<div>
        <Nav />
        <div className='grid2'>
        <div style={{marginLeft:"200px"}} >
                <h1 style={{paddingTop: "13px",marginBottom: "43px"}}>Order List</h1>
            {orders.map((order, index) =>
                (<div className="box2" key={index}>
                    <p className='title2'>order:</p>
                    <p className='title3'>order code:</p>
                    {order.OrderCode}

                    <p className='title3'>date:</p>
                    {order.DateOrder}
                    <p className='title2'>client details:</p>
                    <p className='title3'>name:</p>
                    {order.FirstName}
                    <p className='title3'>adress:</p>
                    {order.Address}
                    <p className='title3'>total payment:</p>
                    {order.OrderPrice}<br></br><br />
                    <button className="but" style={{marginLeft:"0px"}} onClick={() => { showItems(order.OrderCode,index) 
                        onclickShowBtn()}}>{showbtn} items</button>
                    {show[index]&&<div>{items.map((item)=>
                    <div key={item}>
                    <p className="title3">{item.ItemName}</p>
                    <img className='img' src={`${item.path}`} />
                   </div>
                    )}
                    </div>}
                    <p className='title3'>done:</p>
                    <input type="checkbox" id="myCheck" onClick={(e) => { isChecked(order) }}></input>
                </div>)
            )}
        </div>
    </div>
    </div>
    );
}