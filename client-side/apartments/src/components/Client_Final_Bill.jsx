import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Client_Shoping_Cart from "./Client_Shoping_Cart";
import Nav from "./Client_Nav";
export default function Client_Final_Bill(props) {
    let location = useLocation();
    const [address, setaddress] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [sir_name, setsir_name] = useState("");
    const [id, setid] = useState("");
    const [date, setdate] = useState("");
    const [last_nums, setlast_nums] = useState("");
    const [card_number, setcard_number] = useState("");
    const [Payments, setPayments] = useState(0);
    const [val, setval] = useState("0");
    let navigate = useNavigate();
    let payment = 0;
    useEffect(() => {
      let price= priceCalculations();
        setPayments(price);
    });
    async function orderConfirmation() {
        if (address != '' && first_name != '' && sir_name != '' && id != ''
            && date != '' && last_nums != '' && card_number != ''
            && typeof address == "string" && typeof first_name == "string" && typeof id == "string" &&
            typeof sir_name == "string" && !isNaN(last_nums)
            && !isNaN(card_number) && val !== "0" && last_nums.length === 3 && card_number.length >= 16 && Payments > 0) {
            let itemIC = await fetch(`http://localhost:3678/orders/setOrder`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address: address,
                    customerid: JSON.parse(sessionStorage.getItem("currentuser")).password
                })
            });
            itemIC = await itemIC.json();
            let put = await fetch(`http://localhost:3678/orders/updateOrdered/1`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    OrderCode: JSON.parse(sessionStorage.getItem("currentuser")).OrderID
                })
            });
            put = await put.json();
            let post = await fetch(`http://localhost:3678/orders/updateOrdered/price`, {
                method: 'Put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    OrderCode: JSON.parse(sessionStorage.getItem("currentuser")).OrderID,
                    OrderPrice: Payments
                })
            });
            
            post = await post.json();
            let currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
            let orderCode = await fetch(`http://localhost:3678/orders/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerid: JSON.parse(sessionStorage.getItem("currentuser")).password,
                    orderprice: Payments,
                    date: date
                })
            });
            orderCode = await orderCode.json();

            sessionStorage.setItem("currentuser", JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: [], OrderID: orderCode }))
            navigate(`/Client`);
        }
        else {
            alert("something is wrong with your input. please try again");
        }
    }

    function priceCalculations() {
        let totalPrice=0;
        location.state.products.map(element => {
            let currentPrice=element.QuantityItem* element.Price;
            totalPrice+=currentPrice;
        })
        return totalPrice;
    }

    return (<div >
        <Nav />
        <p>your items:</p>
        <div >
            {location.state.products.map((myproduct, index) =>
            (<div key={myproduct.CodeItem}>
                <h4>  {myproduct.ItemName}</h4>
                <img className="product_images" src={myproduct.path} />
                <p className="regularFont">price: $ {myproduct.Price}</p>
                {console.log(myproduct)}
                <p>quantity:  {myproduct.QuantityItem}</p>
                <p>size  :  {myproduct.ItemInCartSize}</p>
                <br/>
                <br/>
            </div>)
            )}
        </div>
        <form onChange={(e) => { setval(e.target.value); }}>
            <p>delivery Between 3-30 days </p>
            <input type="radio" name="delivary" value="1" />
            <label >Express delivery</label><br></br>
            <input type="radio" name="delivary" value="2" />
            <label >Delivery within seven business days</label><br></br>
            <input type="radio" name="delivary" value="3" />
            <label >Delivery within a month of business days</label><br></br>
        </form>
        <input placeholder="first name" value={first_name} onChange={(e) => { setfirst_name(e.target.value) }} /><br></br>
        <input placeholder="sir name" value={sir_name} onChange={(e) => { setsir_name(e.target.value) }} /><br></br>
        <input type="email" placeholder="i.d." value={id} onChange={(e) => { setid(e.target.value) }} /><br></br>
        <input type="date" value={date} onChange={(e) => { setdate(e.target.value) }} /><br></br>
        <input placeholder="last 3 numbers" value={last_nums} onChange={(e) => { setlast_nums(e.target.value) }} /><br></br>
        <input placeholder="credit card number" value={card_number} onChange={(e) => { setcard_number(e.target.value) }} /><br></br>
        <input placeholder="address" value={address} onChange={(e) => { setaddress(e.target.value) }} /><br></br>
        {console.log(Payments)}
        <h1>PayMent: {Payments}</h1>
        <br></br>
        <button className="but3" style={{paddingRight: "120px",
    paddingLeft: "125px",marginLeft:"90px", marginBottom: "30px"}} onClick={orderConfirmation}>For order confirmation</button>
        
        
    </div>);
}


