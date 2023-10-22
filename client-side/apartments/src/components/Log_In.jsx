import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

let d = new Date();
let date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

function Log_In(props) {
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
                console.log("password_value: " + password_value)


                let flag = await fetch(`http://localhost:3678/customer/getcustomers`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: user_name_value, password: password_value })
                });
                flag = await flag.json();
                console.log("flag: " + flag)

                if (!flag) {
                    alert("the password or username do not exist");
                }
                else {
                    if ("manager" === user_name_value && "96679@gmail.com" === password_value) {
                        navigate(`/manager`);
                    } else {
                        let pro;
                        sessionStorage.setItem("currentuser", JSON.stringify({ password: password_value, user_name: user_name_value, cart: [], OrderID: "0" }));
                        let a = sessionStorage.getItem("currentuser");
                        console.log(JSON.parse(a));
                        let prod = await fetch("http://localhost:3678/cart/shopingCart", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ password: JSON.parse(sessionStorage.getItem("currentuser")).password })
                        });
                        pro = await prod.json();
                        if (pro.length === 0 ) {
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
                            sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: pro, OrderID: res[0].OrderCode }));
                        }
                        else {
                            let currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
                            sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: pro, OrderID: pro[0].OrderID }));

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

    return (
        <div>
            <div className="page">
                <section className="section-sign-up">
                    <div className="login_signin_card">
                        <div className="form">
                            <header>
                                <h2 className="line-hight">Sign In Your Account</h2>
                            </header>
                            <div >

                                <input step={{ marginTop: -27 }} type="input" className="form-control" value={user_name_value} onChange={(e) => { saveUsernameValue(e.target.value) }} id={date} placeholder="username"></input>
                            </div>
                            <div >
                                <input type="email" className="form-control" value={password_value} onChange={(e) => { savePasswordValue(e.target.value) }} id={date} placeholder="email"></input>
                            </div>
                            <div >
                                <button className="btn-sign-up" onClick={checkIntegrity}>Log In</button>
                            </div>
                            <br></br>
                            <div className="more">

                                <h7>New Customer? <span className="a-linq" onClick={() => { navigate("/signin"); }}>sign up</span> </h7>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}
export default Log_In;