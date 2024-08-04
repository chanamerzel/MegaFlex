import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import orders_requests from "./logic/orders_requests"
import cart_requests from './logic/cart_requests'
let d = new Date();
let date = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
function Log_In(props) {
    const [countGmails, setcountGmails] = useState(0);
    const [password_value, setPassword_value] = useState("");
    const [user_name_value, setUser_name_value] = useState("");
    let navigate = useNavigate();
    function savePasswordValue(val) {
        setPassword_value(val);
    }
    function saveUsernameValue(val) {
        setUser_name_value(val);
    }
    useEffect(() => {
    }, []);
    async function checkIntegrity() {
        try {
            if (password_value === '' || user_name_value === "") {
                alert("password or username are empty");
            } else {
                let flag = await fetch(`http://localhost:3678/customer/getcustomers`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: user_name_value, password: password_value })
                });
                flag = await flag.json();
                if (!flag) {
                    alert("the password or username do not exist");
                }
                else {
                    if (flag.FirstName==="manager"&&(flag.CustomerID === user_name_value || flag.FirstName === user_name_value)&&password_value===flag.PassWord) {
                        navigate(`/manager`);
                    } else {
                        sessionStorage.setItem("currentuser", JSON.stringify({ password: password_value, user_name: user_name_value, cart: [], OrderID: "0" }));
                        let a = sessionStorage.getItem("currentuser");
                        let order = await orders_requests("exists", { CustomerID: password_value, FirstName: user_name_value })
                        if (order) {
                            let cart = await cart_requests("shopingCart", { password: password_value })
                            let cartarray = []

                            if (cart.length !== 0) {
                                cart.map((element) => {
                                    cartarray.push({
                                        CodeCategory: element.CodeCategory, CodeItem: element.CodeItem, ItemName: element.ItemName, Price: element.Price, QuantityItem: (element.Quantity), description: element.description, path: element.path, ItemInCartSize: element.ItemInCartSize

                                    })
                                })
                            }
                            let currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
                            sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: cartarray, OrderID: order[0].OrderCode }));
                            console.log("login 59 order[0].OrderCode:" + order[0].OrderCode)
                        }
                        else {
                            let res = await fetch(`http://localhost:3678/orders/add`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ customerid: JSON.parse(sessionStorage.getItem("currentuser")).password, orderprice: 0, date: date, status: 0 })
                            });
                            res = await res.json();
                            let currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
                            sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: [], OrderID: res[0].OrderCode }));
                            console.log("login 73 res[0].OrderCode:" + res[0].OrderCode)
                        }

                        navigate(`/Client`);
                    }
                }
            }
        } catch (error) {
            alert(error);
        }
        savePasswordValue("");
        saveUsernameValue("");
    }
    function automatic_complete(val) {
        if (val.includes("@gmail.com") || countGmails >= 1) {
            saveUsernameValue(val)
        }
        else {
            saveUsernameValue(val + "@gmail.com");
            setcountGmails(1)
        }
    }
    return (
        <div>
            <div className="page">
                <section className="section-sign-up">
                    <div className="login_signin_card">
                        <div className="form">
                            <header>
                                <h2 className="line-hight">Log In Your Account</h2>
                            </header>
                            <div >
                                <input step={{ marginTop: -27 }} type="input" className="form-control" value={user_name_value} onChange={(e) => { automatic_complete(e.target.value) }} placeholder="username\email"></input>
                            </div>
                            {/* <div >
                                <input type="email" className="form-control" value={password_value} onChange={(e) => { automatic_complete(e.target.value) }} placeholder="email@gmail.com"></input>
                            </div> */}
                            <div >
                                <input type="password" className="form-control" value={password_value} onChange={(e) => { savePasswordValue(e.target.value) }} placeholder="password"></input>
                            </div>
                            <div >
                                <button className="btn-sign-up" onClick={checkIntegrity}>Log In</button>
                            </div>
                            <br></br>
                            <div className="more">
                                <p style={{ fontSize: "15px" }}>New Customer? <span className="a-linq" onClick={() => { navigate("/signin"); }}>sign up</span> </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}
export default Log_In;