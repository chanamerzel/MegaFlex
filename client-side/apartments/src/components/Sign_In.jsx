import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

import My_Manager from "./My_Manager"
import Manager_Add_Product from "./Manager_Add_Product";

let date = new Date();
function Sign_In(props) {
    const [password_value, setPassword_value] = useState("");
    const [user_name_value, setUser_name_value] = useState("");
    let navigate = useNavigate();

    function savePasswordValue(val) {
        setPassword_value(val);
    }

    function saveUsernameValue(val) {
        setUser_name_value(val);
    }
    async function checkIntegrity() {
        let myuser;
        try {
            if (password_value === '' || user_name_value === "") {
                alert("email or username are empty");
            }
            else {
                debugger
                if (!password_value.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )) {
                    alert("email is not valid");
                    setPassword_value("");
                }
                if (false) {

                }
                else {
                    setPassword_value(password_value);
                    let flag = await fetch(`http://localhost:3678/customer/getcustomers`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username: user_name_value, password: password_value })
                    });
                    flag = await flag.json();
                    
                    if (!flag) {

                        fetch(`http://localhost:3678/customer`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                username: user_name_value,
                                password: password_value
                            })
                        });
                        sessionStorage.setItem("currentuser", JSON.stringify({ password: password_value, user_name: user_name_value, cart: [], OrderID: "0" }));
                        let today = new Date();
                        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        let res = await fetch(`http://localhost:3678/orders/add`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ customerid: JSON.parse(sessionStorage.getItem("currentuser")).password, orderprice: 0, date: date, status: 0 })
                        });
                        res = await res.json();
                        sessionStorage.setItem("currentuser", JSON.stringify({ password: password_value, user_name: user_name_value, cart: [], OrderID: res[0].OrderCode }));
                        navigate(`/Client`);
                    } else {
                        alert("the email or username  exist");
                    }
                }
            }

        } catch (error) {
            alert(error);
        }
        savePasswordValue("");
        saveUsernameValue("");
    }
    let cur = JSON.parse(sessionStorage.getItem("currentuser"));
    
    useEffect(() => {
     
    }, []);

    return (
        <div>
            <div className="page">
                <section className="section-sign-up">
                    <div className="sign-up-card">
                        <div className="view">
                            <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnRhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                            <span className="check">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                        <div className="form">
                            <div className="form-control">

                                <input type="input" className="form-control" value={user_name_value} onChange={(e) => { saveUsernameValue(e.target.value) }} id={date} placeholder="username"></input>
                            </div>
                            <div className="form-control">
                                <input type="email" className="form-control" value={password_value} onChange={(e) => { savePasswordValue(e.target.value) }} id={date} placeholder="email"></input>
                            </div>
                            <div className="form-control">
                                <button className="btn-sign-up" onClick={checkIntegrity}>sign up</button>
                            </div>
                            <div className="more">
                                <a className="sign-in-link" onClick={() => { navigate("/login"); }}>log in</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}
export default Sign_In;