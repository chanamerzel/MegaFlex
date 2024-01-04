
import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Client_Nav from "./Client_Nav";
import Sorting_Bar from './Sorting_Bar';
export default function Our_Client(props) {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    let navigate = useNavigate();
    const [limit, setLimit] = useState(-10);
    const [displayB, setDisplayB] = useState("block");
    const [sortVisibility, setSortVisibility] = useState(true);
    const [emptyStock,setemptyStock]=useState([])
    const [displayP, setDisplayP] = useState("none");
    let a = 0

    useEffect(() => {
        a++;
        getProducts(a);
        return async () => {
            outofcomponent();
            outOfStock()//checks which products have no amount left
        }
    }, []);
    
    async function outOfStock(){//checks which products have no amount left
        let stock=  await fetch("http://localhost:3678/quantityofsize/stock", {
            method: 'GET',
        })
        stock = await stock.json();
        let currentStock=emptyStock
        if('0' in stock){
            stock.forEach(element => {
                if('0' == element.sum){
                    currentStock.push(element.ItemCode)
                }
            });
            setemptyStock(currentStock)
        }

    }

    function checkExistence(product, arr) {
        
        for (let index = 0; index < arr.length; index++) {
            if (product.CodeItem === arr[index].CodeItem) {
                return true
            }
        }
        return false
    }
    async function getProducts(a) {
        let newLimit = limit + 10;
        setLimit(newLimit)
        console.log("newLimit" + newLimit);
        let prod = await fetch(`http://localhost:3678/products/limit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ limit: newLimit })
        });
        let pro = await prod.json();
        let arr = products;
        let arrLength = arr.length
        if (a === 1) {
            if (pro.length === 0) {
                setDisplayB("none")
                setDisplayP("block")
            }
            else {
                let i = 0;
                while (i !== pro.length) {
                    if (checkExistence(pro[i], arr)) { }
                    else {
                        if (category !== "") {
                            if (pro[i].CodeCategory === category) {
                                arr.push(pro[i]);
                            }
                        }
                        else {
                            arr.push(pro[i]);
                        }
                    }
                    i++;
                }
                if (arr.length > arrLength) {
                    setProducts([...arr]);
                }
                else {
                    setDisplayB('none')
                    setDisplayP('block')
                }
            }
        }
    }
    async function outofcomponent() {
        let user=JSON.parse(sessionStorage.getItem("currentuser"))
        let up = await fetch('http://localhost:3678/cart/delete/allitem', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderid: user.OrderID
            })
        });
        let response = await up.json();
        let cart = JSON.parse(sessionStorage.getItem('currentuser')).cart;
        let postt = await fetch('http://localhost:3678/cart/insert', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: cart,
                OrderID: user.OrderID
            })
        });
        let res = await postt.json();
        let plus_to_cart = [];
        cart.forEach((element, i) => {
            plus_to_cart.push({ ...element, ItemInCartCode: res[i].ItemInCartCode })
            element = { ...element, ItemInCartCode: res[i].ItemInCartCode };
        });
        sessionStorage.setItem("currentuser", JSON.stringify({ password: user.password, user_name: user.user_name, cart:plus_to_cart, OrderID: user.OrderID }));

    }

    async function toTheItem(myproduct) {
        navigate(`/client/currentProduct/${myproduct.CodeItem}`, { state: { products: products, CodeItem: myproduct.CodeItem, myproduct: myproduct,emptyStock:emptyStock.includes(myproduct.CodeItem) } });
    }
    return (<div>
        <Client_Nav />
        {sortVisibility && <img className="left-arrow" onClick={() => setSortVisibility(false)} src='http://localhost:3678/left-chevron.png' />}
        {sortVisibility && <p style={{ marginTop: "-31px", marginLeft: "1157px" }} >Filters</p>}
        {!sortVisibility && <Sorting_Bar sortVisibility={sortVisibility} setSortVisibility={setSortVisibility} setProducts={setProducts} />}
        <p className='title'>all items</p>
        <br></br>
        <div className='grid'>
            {products.map((myproduct) =>
            (<div key={myproduct.CodeItem}>
                <button className='button' disabled={myproduct.CodeItem in emptyStock?true:false} onClick={() => { toTheItem(myproduct) }}>
                    <p className='itemName' > {myproduct.ItemName}</p>
                    <img className='product_images img_hovering' src={`${myproduct.path}`} /><br />
                    <p className='itemName' style={{backgroundColor:emptyStock.includes(myproduct.CodeItem)?"gray":"black",color:"white",width:emptyStock.includes(myproduct.CodeItem)?"98%":"50%",marginLeft:"1px"}}> {myproduct.Price}$  {emptyStock.includes(myproduct.CodeItem) && <strong>out of stock</strong>}</p>
                   </button>
            </div>)
            )}
        </div>
        <button className="but3" style={{ display: displayB, }} onClick={() => { getProducts(1) }}>Show more</button>
        <br></br>
        <button disabled style={{ display: displayP, fontSize: "19px", marginLeft: "45%", paddingLeft: "30px", paddingBottom: "5px", color: "white", borderRadius: "2px", marginBottom: "3px", paddingRight: "30px", backgroundColor: "gray" }} >no more products</button>
    </div>);
}