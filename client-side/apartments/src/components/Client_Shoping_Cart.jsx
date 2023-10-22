import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Client_Current_Product from "./Client_Current_Product";
// import Client_Product_In_Cart from "./Client_Product_In_Cart";
import Client_Nav from "./Client_Nav";

export default function Client_Shoping_Cart() {
    const [products, setProducts] = useState([]);
    const [orderid, setOrderid] = useState([]);
    const [proinstore, setproinstore] = useState([]);
    const [outOfStock, setOutOfStock] = useState([]);
    const [belowStock, setBelowStock] = useState([]);
    const [quantity, setquantity] = useState([]);

    let navigate = useNavigate();
    useEffect(() => {
        let myquantity = [];
        let usercart = JSON.parse(sessionStorage.getItem('currentuser')).cart;
        let userid=JSON.parse(sessionStorage.getItem('currentuser')).OrderID;
        let Allitemss = usercart;
        setProducts(Allitemss);
        checkbtns(Allitemss);
        checkAtStart();

        Allitemss.forEach(element => {
            myquantity.push({ quantity: element.QuantityItem, itemname: element.ItemName, shoeSize: element.ItemInCartSize });
        })
        setquantity(myquantity);
        return async () => {
            let ans = await fetch("http://localhost:3678/cart/update_items_in_cart", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: Allitemss,
                    orderid:userid
                })
            })
            ans = await ans.json();

        }

    }, []);
    async function checkbtns(Allitemss) {
        let arrm = [];
        let arrp = [];
        let userid = JSON.parse(sessionStorage.getItem('currentuser')).OrderID;

        let pro_in_cart_and_store = await fetch(`http://localhost:3678/products/item/name`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderID: userid })
        })
        pro_in_cart_and_store = await (pro_in_cart_and_store).json();
        setproinstore(pro_in_cart_and_store);
        Allitemss.map(element => {
            console.log("pro_in_cart_and_store: " + pro_in_cart_and_store);
            pro_in_cart_and_store.map(proelement => {
                if (element.ItemName === proelement.ItemName) {
                    if (element.QuantityItem >= proelement.QuantityItem) {
                        arrp.push(true);
                        arrm.push(false)
                    } else {
                        if (element.QuantityItem - 1 <= 0) {
                            arrm.push(true);
                            arrp.push(false);
                        } else {
                            arrp.push(false);
                            arrm.push(false);

                        }
                    }
                }
            });
        });
        setOutOfStock(arrp);
        setBelowStock(arrm);
        // checkAtStart();

    }
    async function checkAtStart() {
        let arrm = belowStock;
        let arrp = outOfStock;
        let arrq = quantity;
        let user = JSON.parse(sessionStorage.getItem("currentuser"));
        let carty = user.cart;

        proinstore.map((proelement, i) => {
            carty.map((cart, index) => {
                if (cart.ItemName === proelement.ItemName) {
                    if (cart.QuantityItem + 1 >= proelement.QuantityItem) {
                        arrp[i] = true;
                    }
                    else {
                        if (cart.QuantityItem - 1 <= 0) {
                            arrm[i] = true;
                        } else {
                            arrp[i] = false;
                            arrm[i] = false;

                        }
                    }

                }
            })


        });

        setOutOfStock(arrp);
        setBelowStock(arrm);
        // window.location.reload();
    }


    async function forPaying() {
        navigate("/client/finalBill", { state: { products: products, orderid: orderid } });
    }
    async function increaseQ(i, myproduct) {
        let arrm = belowStock;
        let arrp = outOfStock;
        let arrq = quantity;
        arrq[i].quantity += 1;
        let user = JSON.parse(sessionStorage.getItem("currentuser"));
        let carty = user.cart;
        carty.map((cart, index) => {
            if (cart.ItemName === myproduct.ItemName) {
                carty[index].QuantityItem += 1;
            }
        })
        sessionStorage.setItem("currentuser", JSON.stringify({ password: user.password, user_name: user.user_name, cart: carty, OrderID: user.OrderID }));
        setquantity(arrq);
        proinstore.forEach(proelement => {
            if (myproduct.ItemName === proelement.ItemName) {
                if (myproduct.QuantityItem + 1 >= proelement.QuantityItem) {
                    arrp[i] = true;
                } else {
                    if (myproduct.QuantityItem - 1 <= 0) {
                        arrm[i] = true;
                    } else {
                        arrp[i] = false;
                        arrm[i] = false;

                    }
                }
            }
        });

        setOutOfStock(arrp);
        setBelowStock(arrm);
        window.location.reload();
    }
    async function reduceQ(i, myproduct) {
        let arrm = belowStock;
        let arrp = outOfStock;
        let arrq = quantity;
        let user = JSON.parse(sessionStorage.getItem("currentuser"));
        let carty = user.cart;
        // 

        proinstore.map(proelement => {
            if (myproduct.ItemName === proelement.ItemName) {
                if (myproduct.QuantityItem - 1 >= proelement.QuantityItem) {
                    arrp[i] = true;
                } else {
                    if (myproduct.QuantityItem - 1 <= 0) {
                        arrm[i] = true;
                    } else {
                        arrq[i].quantity -= 1;
                        carty.map((cart, index) => {
                            if (cart.ItemName === myproduct.ItemName) {
                                carty[index].QuantityItem -= 1;
                            }
                        })
                        arrp[i] = false;
                        arrm[i] = false;

                    }
                }
            }
        });
        sessionStorage.setItem("currentuser", JSON.stringify({ password: user.password, user_name: user.user_name, cart: carty, OrderID: user.OrderID }));
        setquantity(arrq);
        setOutOfStock(arrp);
        setBelowStock(arrm);
        window.location.reload();
    }
    async function removeItem(i, myproduct) {
        let curquantity = quantity;
        curquantity.splice(i, 1);
        setquantity(curquantity);
        let arr = JSON.parse(sessionStorage.getItem("currentuser"));
        let cartarr = arr.cart;
        cartarr.splice(i, 1);
        sessionStorage.setItem("currentuser", JSON.stringify({ password: arr.password, user_name: arr.user_name, cart: cartarr, OrderID: arr.OrderID }));
        setProducts(cartarr);
        let prod = await fetch(`http://localhost:3678/cart/deleteitem`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ myproduct: myproduct, orderid: arr.OrderID })
        });
        setOutOfStock(outOfStock);
        setBelowStock(belowStock);
        window.location.reload();
    }

    async function setItemInCartSize(myproduct, shoeSize) {
        let arr = JSON.parse(sessionStorage.getItem("currentuser"));
        let cartarr = arr.cart;
        cartarr.map((pro, i) => {
            if (pro.ItemName === myproduct.ItemName && pro.CodeItem === myproduct.CodeItem && parseInt(pro.ItemInCartSize) === parseInt(shoeSize)) {
                removeItem(i, myproduct)
                arr = JSON.parse(sessionStorage.getItem("currentuser"));
                cartarr = arr.cart;
                cartarr[i].QuantityItem += myproduct.QuantityItem;
                cartarr[i].ItemInCartSize = shoeSize;
            }
            if (pro.CodeItem === myproduct.CodeItem && parseInt(pro.ItemInCartSize) !== parseInt(shoeSize)) {
                pro.ItemInCartSize = shoeSize;
            }
        })
        sessionStorage.setItem("currentuser", JSON.stringify({ password: arr.password, user_name: arr.user_name, cart: cartarr, OrderID: arr.OrderID }));
        let myquantity = [];
        arr = JSON.parse(sessionStorage.getItem("currentuser"));
        cartarr = arr.cart;
        // let update_cart=[]
        cartarr.forEach(element => {
            myquantity.push({ quantity: element.QuantityItem, itemname: element.ItemName, shoeSize: element.ItemInCartSize });
            // update_cart.push({element,orderid:arr.OrderID})
            console.log("element: " + element + "myquantity: " + myquantity);
        })
        setquantity(myquantity);
        // console.log("myquantity code: " + myquantity[0].ItemCartCode);
        let ans = await fetch("http://localhost:3678/cart/update_items_in_cart", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: cartarr,
                orderid:arr.OrderID
            })
        })
        ans = await ans.json();
    }

    return (<div className="background-color-gray">
        <Client_Nav />
        <p className="title">shoping cart</p>
        <div >
            {products.map((myproduct, index) => (
                <div key={index}>
                    {console.log("myproduct: " + myproduct)}
                    {console.log("index: " + index)}
                    <section className="tpg">
                        <div className="sign-up-card">
                            <div className="form">
                                <div class="container" key={index}>
                                    <br></br>
                                    <div class="image">
                                        <p className="title2">{myproduct.ItemName}</p>
                                        <img className="product_images" src={myproduct.path}></img>
                                    </div>

                                    <div class="text">
                                        <form >
                                            <br /><br />
                                            <label htmlFor="sizeOfShoe"> size of shoe:  </label>
                                            <select id="sizeOfShoe" onChange={(e) => setItemInCartSize(myproduct, e.target.value)} name="sizeOfShoe">
                                                {[36, 37, 38, 39, 40, 41].map((m, i) => {
                                                    if (parseInt(myproduct.ItemInCartSize) === m) {
                                                        return <option key={m} value={m} selected="selected">{m}</option>

                                                    }
                                                    else {
                                                        return <option key={m} value={m}>{m}</option>
                                                    }
                                                })}
                                            </select>
                                        </form>
                                        <p className="title3">quantity: </p>
                                        <p className="title3">{quantity[index].quantity}</p>
                                        {console.log(quantity[index].quantity)}
                                        <button className="toS" disabled={outOfStock[index]} onClick={() => { increaseQ(index, myproduct) }}>+</button>
                                        {console.log("outOfStock[index]: " + outOfStock[index])}
                                        <button className="toS" disabled={belowStock[index]} onClick={() => { reduceQ(index, myproduct) }}>-</button>
                                        {console.log("belowStock[index]: " + belowStock[index])}

                                        <button className="but2" onClick={() => { removeItem(index, myproduct) }}>remove</button>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </section>
                   
                </div>
            ))}
        </div>
        <button className="my-btn" onClick={forPaying}>PayMent</button>
    </div>);
}