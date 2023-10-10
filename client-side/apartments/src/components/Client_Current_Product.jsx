import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Nav from "./Client_Nav";
import Our_Client from "./Our_Client";
export default function Client_Current_Product(props) {
    const [product, setProduct] = useState({});
    const [ItemInCartSize, setItemInCartSize] = useState(36);

    let navigate = useNavigate();
    let location = useLocation();
    let itemCode = location.state.CodeItem;
    let items = location.state.products;
    let myproduct = location.state.myproduct;
    useEffect(() => {
        let item = items.filter(i => i.CodeItem == itemCode);
        setProduct(item[0]);
    }, []);
    let user = sessionStorage.getItem("currentuser");
    let currentUser = JSON.parse(user);
    async function getItemCartCode(){
        let res = await fetch(`http://localhost:3678/products/GetItemCartCode`, {
                    method: 'GET'
                });
                let code = await res.json();
    }
    async function addToCart() {
        if (!currentUser || currentUser.length === 0) {
            alert("You cannot log in because you are not registered. Please go to sign in");
            navigate('/');
        } else {
            let helparrray = [];
            if (currentUser.cart.length > 0) {
                let istrue = false;
                currentUser.cart.map((item) => {
                    if (itemCode === item.CodeItem&&myproduct.ItemInCartSize==item.ItemInCartSize) {
                        istrue = true;
                        console.log((item.QuantityItem + 1));
                        helparrray.push({ CodeCategory: item.CodeCategory, CodeItem: item.CodeItem, ItemName: item.ItemName, Price: item.Price, QuantityItem: (item.QuantityItem + 1), description: item.description, path: item.path,ItemInCartSize: ItemInCartSize});
                    }
                    else {
                        helparrray.push({ CodeCategory: item.CodeCategory, CodeItem: item.CodeItem, ItemName: item.ItemName, Price: item.Price, QuantityItem: (item.QuantityItem), description: item.description, path: item.path,ItemInCartSize:item.ItemInCartSize });
                    }
                })
                console.log(helparrray);
                if (istrue) {
                    sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: helparrray, OrderID: currentUser.OrderID }));
                } else {
                    helparrray.push({
                        CodeCategory: myproduct.CodeCategory,
                        CodeItem: myproduct.CodeItem,
                        ItemName: myproduct.ItemName,
                        Price: myproduct.Price,
                        QuantityItem: 1,
                        description: myproduct.description,
                        path: myproduct.path,
                        ItemInCartSize: ItemInCartSize
                    });
                    sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: helparrray, OrderID: currentUser.OrderID }));
                }
                alert("Successfully added to your cart!!");
            } else {
                let res = await fetch(`http://localhost:3678/products/GetItemCartCode`, {
                    method: 'GET'
                });
                let code = await res.json();
               let ItemCartCode=code;
                helparrray.push({
                    CodeCategory: myproduct.CodeCategory,
                    CodeItem: myproduct.CodeItem,
                    ItemName: myproduct.ItemName,
                    Price: myproduct.Price,
                    QuantityItem: 1,
                    description: myproduct.description,
                    path: myproduct.path,
                    ItemInCartSize: ItemInCartSize
                });
                sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: helparrray, OrderID: currentUser.OrderID }));
                alert("Successfully added to your cart!!");
            }
            navigate("/client");
            console.log("addtocart");

        }
    }



    return (<div>
        <Nav />
        <p className="title2">{product.ItemName}</p>
        <img className="cImg" src={`${product.path}`} />
        <p className="title3">{product.description}</p>

        <p className="title3">price:</p>
        <p className="title3">$ {product.Price} </p>
        <form >
            <label htmlFor="sizeOfShoe">choose size of shoe:  </label>

            <select id="sizeOfShoe" onChange={(e)=>setItemInCartSize(e.target.value)} name="sizeOfShoe">
                {[36,37,38,39,40,41].map((m,i)=> {return <option key={m}  value={m}>{m}</option>})}
            </select>
        </form>
        <button className="toS2" onClick={(e) => addToCart()}>add to shopping cart</button><br />
    </div>);
}

