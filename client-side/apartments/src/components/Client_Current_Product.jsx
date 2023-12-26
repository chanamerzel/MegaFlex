import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import Nav from "./Client_Nav";
//presents each product on its own. gives the option to add product to users cart.
export default function Client_Current_Product(props) {

    const [product, setProduct] = useState({});
    const [emptyStock, setemptyStock] = useState(false)
    const [shoeSizes, setshoeSizes] = useState([])
    const [ItemInCartSize, setItemInCartSize] = useState(36);
    const [currentUser, setcurrentUser] = useState({});

    let navigate = useNavigate();
    let location = useLocation();
    let itemCode =  location.state.CodeItem?location.state.CodeItem:0;
    let items =  location.state.products?location.state.products:[];
    let myproduct = location.state.myproduct?location.state.myproduct:{};
    // myproduct.ItemInCartSize = ItemInCartSize;
    let user;


    useEffect(() => {
        if (location.state) {
            itemCode = location.state.CodeItem;
            items = location.state.products;
            myproduct = location.state.myproduct;
            myproduct.ItemInCartSize = ItemInCartSize;
            user = JSON.parse(sessionStorage.getItem("currentuser"));
            setemptyStock(location.state.emptyStock)
            getShoeSizes()
            setcurrentUser(user)
            let item = items.filter(i => i.CodeItem === itemCode);
            setProduct(item[0]);
        }
        else {

            // alert("you are not registered. please sign or log in.")
            navigate("/")
        }
    }, []);
    async function getShoeSizes() {
        let shoeSizesArray = await fetch(`http://localhost:3678/quantityofsize/${myproduct.ItemName}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: itemCode })
        });
        shoeSizesArray = await shoeSizesArray.json();
        setshoeSizes(shoeSizesArray)
        setItemInCartSize(shoeSizesArray[0].ShoeSize)

    }
    //adds product to user cart wen the button is pressed.
    async function addToCart() {
        //registration check. checks if user is an existing customer.
        if (!currentUser || currentUser.length === 0) {
            alert("You cannot add item to cart because you are not registered. Please go to sign up");
            navigate('/');
        }//if user is registered:
        else {
            let helparrray = [];
            //avoid the case of the exact same item existing more than once in the cart.
            if (currentUser.cart.length > 0) {
                let istrue = false;
                currentUser.cart.map((item) => {
                    //if item already exists in the cart-increase quantity by 1.
                    if (itemCode === item.CodeItem && ItemInCartSize === item.ItemInCartSize) {
                        istrue = true;
                        console.log((item.QuantityItem + 1));
                        helparrray.push({ CodeCategory: item.CodeCategory, CodeItem: item.CodeItem, ItemName: item.ItemName, Price: item.Price, QuantityItem: (item.QuantityItem + 1), description: item.description, path: item.path, ItemInCartSize: ItemInCartSize });
                    }
                    else {//if it does not- don't increase quantity.
                        helparrray.push({ CodeCategory: item.CodeCategory, CodeItem: item.CodeItem, ItemName: item.ItemName, Price: item.Price, QuantityItem: (item.QuantityItem), description: item.description, path: item.path, ItemInCartSize: item.ItemInCartSize });
                    }
                })
                console.log(helparrray);
                if (istrue) {
                    sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: helparrray, OrderID: currentUser.OrderID }));
                    console.log("current product 85 currentUser.OrderID:"+ currentUser.OrderID)

                }
                else {
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
                    console.log("current product 100 currentUser.OrderID:"+ currentUser.OrderID)
               
                }
                alert("Successfully added to your cart!!");
            }
            else {
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
                console.log("current product 117 ItemInCartSize:"+ ItemInCartSize)
                
                alert("Successfully added to your cart!!");
            }
            navigate("/client");
            console.log("addtocart");
            console.log("helparrray: "+helparrray);
        }
    }
    if (location.state) {
        return (<div>
            {currentUser && <Nav />}
            {!currentUser && <div>
                <nav className="navs ">
                    <Link className="App-link" to={`/login`}>Log In</Link>
                    <Link className="App-link" to={`/signin`}>Sign Up</Link>
                    <Link className="App-link" to={`/`}>product list</Link>

                </nav>
                <Outlet />
            </div>}
            <p className="title2">{product.ItemName}</p>
            <img className="cImg" src={`${product.path}`} />
            <p className="title3">{product.description}</p>
            <p className="title3">price:</p>
            <p className="title3">$ {product.Price} </p>
            <form >
                <label htmlFor="sizeOfShoe">choose size of shoe:  </label>
                <select id="sizeOfShoe" onChange={(e) => setItemInCartSize(e.target.value)} name="sizeOfShoe">
                    {shoeSizes.map((currentshoesize, i) => {
                        if (currentshoesize.Quantity > 0) {
                            return <option key={i} value={currentshoesize.ShoeSize}>{currentshoesize.ShoeSize}</option>
                        }
                    })}
                </select>
            </form>
            <button className="toS2" disabled={!currentUser ? true : emptyStock} onClick={(e) => addToCart()}>add to shopping cart</button><br />
        </div>);
    }
    else {
        alert("you are not registered. please sign or log in.")
        navigate("/")
    }
}