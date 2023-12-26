import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Client_Nav from "./Client_Nav";
import cart_requests from './logic/cart_requests'
export default function Client_Shoping_Cart() {
    const [products, setProducts] = useState([]);
    const [proinstore, setproinstore] = useState([]);
    const [outOfStock, setOutOfStock] = useState([]);
    const [belowStock, setBelowStock] = useState([]);
    const [shoeSizes, setshoeSizes] = useState(window.hasOwnProperty("shoeSizes") ? shoeSizes : [])

    // let shoeSizes;
    // shoeSizes = typeof shoeSizes === "undefined"?[]:shoeSizes
    const [quantity, setquantity] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        let myquantity = [];
        let usercart = JSON.parse(sessionStorage.getItem('currentuser')).cart;
        let userid = JSON.parse(sessionStorage.getItem('currentuser')).OrderID;
        let Allitemss = usercart;
        setProducts(Allitemss);
        checkbtns(Allitemss);
        checkAtStart();
        Allitemss.forEach(element => {
            myquantity.push({ quantity: element.QuantityItem, itemname: element.ItemName, shoeSize: element.ItemInCartSize });
        })
        setquantity(myquantity);

        return async () => {
            let myshoeSizes = await getShoeSizes(Allitemss)
            if (myshoeSizes.length === Allitemss.length) {
                // myshoeSizes = await getShoeSizes(Allitemss)

                setshoeSizes(myshoeSizes)
            }
            let update = await cart_requests("update_items_in_cart", { quantity: Allitemss, orderid: userid })
            // console.log("do i get size of shoe here? "+JSON.parse(Allitemss))
        }
    }, []);

    async function checkbtns(Allitemss) {
        let arrm = [];
        let arrp = [];
        let userid = JSON.parse(sessionStorage.getItem('currentuser')).OrderID;
        // console.log("client shoping cart 33 Allitemss[0].ItemInCartSize: "+Allitemss[0].ItemInCartSize+" Allitemss[1].ItemInCartSize: "+Allitemss[1].ItemInCartSize)
        let pro_in_cart_and_store = await fetch(`http://localhost:3678/products/itemsInOrder`, {
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
            pro_in_cart_and_store.map(proelement => {
                if (element.ItemName === proelement.ItemName && parseInt(element.ItemInCartSize) === parseInt(proelement.ItemInCartSize)) {
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
    }
    async function checkAtStart() {
        let arrm = belowStock;
        let arrp = outOfStock;
        let arrq = quantity;
        let user = JSON.parse(sessionStorage.getItem("currentuser"));
        let carty = user.cart;
        proinstore.map((proelement, i) => {
            carty.map((cart, index) => {
                if (cart.ItemName === proelement.ItemName && parseInt(cart.ItemInCartSize) === parseInt(proelement.ItemInCartSize)) {
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
    }
    async function forPaying() {
        navigate("/client/finalBill", { state: { products: products } });
    }
    async function increaseQ(i, myproduct) {
        let arrm = belowStock;
        let arrp = outOfStock;
        let arrq = quantity;
        arrq[i].quantity += 1;
        let user = JSON.parse(sessionStorage.getItem("currentuser"));
        let carty = user.cart;
        carty.map((cart, index) => {
            if (cart.ItemName === myproduct.ItemName && parseInt(cart.ItemInCartSize) === parseInt(myproduct.ItemInCartSize)) {
                carty[index].QuantityItem += 1;
            }
        })
        sessionStorage.setItem("currentuser", JSON.stringify({ password: user.password, user_name: user.user_name, cart: carty, OrderID: user.OrderID }));
        setquantity(arrq);
        proinstore.forEach(proelement => {
            if (myproduct.ItemName === proelement.ItemName && parseInt(proelement.ItemInCartSize) === parseInt(myproduct.ItemInCartSize)) {
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
        proinstore.map(proelement => {
            if (myproduct.ItemName === proelement.ItemName && parseInt(myproduct.ItemInCartSize) === parseInt(proelement.ItemInCartSize)) {
                // if (myproduct.QuantityItem - 1 >= proelement.QuantityItem) {
                //     arrp[i] = true;
                // } else {
                if (myproduct.QuantityItem - 1 <= 0) {
                    arrm[i] = true;
                } else {
                    arrq[i].quantity -= 1;
                    carty.map((cart, index) => {
                        if (cart.ItemName === myproduct.ItemName && parseInt(cart.ItemInCartSize) === parseInt(myproduct.ItemInCartSize)) {
                            carty[index].QuantityItem -= 1;
                        }
                    })
                    arrp[i] = false;
                    arrm[i] = false;
                }
                // }
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
        let prod = await cart_requests("deleteitem", { myproduct: myproduct, orderid: arr.OrderID })
        if (!prod) {
            alert("Sorry. an error ocurred in deleting this product")
        }
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
        cartarr.forEach(element => {
            myquantity.push({ quantity: element.QuantityItem, itemname: element.ItemName, shoeSize: element.ItemInCartSize });
        })
        console.log("arr.OrderID: " + arr.OrderID)
        setquantity(myquantity);
        let ans = await cart_requests("update_items_in_cart", { quantity: cartarr, orderid: arr.OrderID })
    }

    async function getShoeSizes(myproducts) {
        let myproduct = {}
        let myshoeSizes = shoeSizes
        for (let index = 0; index < myproducts.length; index++) {
            myproduct = myproducts[index]
            let shoeSizesArray = await fetch(`http://localhost:3678/quantityofsize/${myproduct.ItemName}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: myproduct.CodeItem })
            });
            shoeSizesArray = await shoeSizesArray.json();
            myshoeSizes.push(shoeSizesArray)
            // setshoeSizes(myshoeSizes)
        }
        return myshoeSizes
    }
    if (shoeSizes.length === products.length) {

        return (<div className="background-color-gray">
            <Client_Nav />
            <p className="title">shoping cart</p>
            <div >
                {products.map((myproduct, index) => (
                    <div key={index}>
                        <section className="tpg">
                            <div className="sign-up-card">
                                <div className="form">
                                    <div className="container" style={{ paddingLeft: "90px" }} key={index}>
                                        <br></br>
                                        <div className="image">
                                            <p className="title2">{myproduct.ItemName}</p>
                                            <img className="product_images" src={myproduct.path}></img>
                                        </div>
                                        <div className="text">
                                            <form >
                                                <br /><br />
                                                <label htmlFor="sizeOfShoe"> size of shoe:  </label>
                                                <select id="sizeOfShoe" onChange={(e) => setItemInCartSize(myproduct, e.target.value)} name="sizeOfShoe">
                                                    {shoeSizes[index] && shoeSizes[index].map((currentshoesize, i) => {
                                                        if (parseInt(myproduct.ItemInCartSize) === currentshoesize.ShoeSize) {
                                                            return <option key={[index, i]} value={currentshoesize.ShoeSize} selected="selected">{currentshoesize.ShoeSize}</option>
                                                        }
                                                        else {
                                                            if (currentshoesize.Quantity > 0) {
                                                                return <option key={[index, i]} value={currentshoesize.ShoeSize}>{currentshoesize.ShoeSize}</option>
                                                            }
                                                        }
                                                    })}
                                                </select>
                                            </form>
                                            <p>Price: {myproduct.Price * myproduct.QuantityItem}$</p>
                                            <p className="title3">quantity: </p>
                                            <p className="title3">{quantity[index].quantity}</p>
                                            <button className="toS" disabled={outOfStock[index]} onClick={() => { increaseQ(index, myproduct) }}>+</button>
                                            <button className="toS" disabled={belowStock[index]} onClick={() => { reduceQ(index, myproduct) }}>-</button>
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
}