import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import '../App.css';
export default function Manager_Orderding_List(props) {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [show, setShow] = useState([false]);
    const [showbtn, setShowbtn] = useState([]);
    useEffect(() => {
        async function getAllOrders() {
            let prod = await fetch("http://localhost:3678/orders/ordered", {
                method: 'GET'
            });
            let pro = await prod.json();
            initShow(pro);
            setOrders(pro);
            let showbtn = []
            pro.forEach(element => {
                showbtn.push("show")
            });
            setShowbtn(showbtn)
        }
        getAllOrders();
    }, []);
    const initShow = (pro) => {
        let arr = [];
        for (let i = 0; i < pro.length; i++) {
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
    async function showItems(OrderCode, index) {
        let prod = await fetch(`http://localhost:3678/orders/itemsInOrder/${OrderCode}`, {
            method: 'GET'
        });
        let pro = await prod.json();
        setItems(pro);
        let arr = [...show];
        for (let i = 0; i < arr.length; i++) {
            if (i !== index) {
                arr[i] = false;
            }
        }
        arr[index] = !arr[index];
        setShow(arr);
    }
    function onclickShowBtn(index) {
        showbtn.map((btn, i) => {
            if (i === index) {
                if (btn === "show") {
                    showbtn[index]="hide"
                    setShowbtn(showbtn)
                } else {
                    showbtn[index]="show"
                    setShowbtn(showbtn)
                }
            }
            else{
                showbtn[i]="show"
                setShowbtn(showbtn)
            }
        })
    }
    return (<div>
        <Nav />
        <div >
            <div  style={{ marginTop:"-29px"}} >
                <h1 style={{ paddingTop: "13px", marginBottom: "43px" }}>Order List</h1>
                <div className='grid'>
                {orders.map((order, index) =>
                (<div style={{marginLeft:"171px",marginRight:"143px"}} className="box2 button" key={index}>
                    <p className='title2'><strong>order:</strong></p>
                    <p className='title5'><strong>order code:</strong> {order.OrderCode}</p>
                    <p className='title5'><strong>date:</strong> {Date(order.DateOrder).slice(0,21)}</p>
                    <p className='title3'><strong style={{borderBottom:"1px solid black"}}>client details:</strong></p>
                    <p className='title5'><strong>name: </strong>{order.FirstName}</p>
                    <p className='title5'><strong>address:</strong> {order.Address}</p>
                    <p className='title5'><strong>total payment:</strong> {order.OrderPrice}$</p>
                    <br></br><br />
                    <button className="but" style={{ marginLeft: "0px" }} onClick={() => {
                        showItems(order.OrderCode, index)
                        onclickShowBtn(index)
                    }}>{showbtn[index]} items</button>
                    {show[index] && <div>{items.map((item) =>
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
    </div>
    );
}