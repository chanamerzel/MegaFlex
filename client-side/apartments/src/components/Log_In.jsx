import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

let d = new Date();
let date=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
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
    // let cur = JSON.parse(sessionStorage.getItem("currentuser"));
    useEffect(() => {
        
    }, []);
   

    async function checkIntegrity() {
        // let myuser;
        try {

            if (password_value === '' || user_name_value === "") {
                alert("password or username are empty");
            } else {
                console.log("password_value: "+password_value)
                
                
                let flag = await fetch(`http://localhost:3678/customer/getcustomers`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: user_name_value, password: password_value })
                });
                flag = await flag.json();
                console.log("flag: "+flag)

                if (!flag) {
                    alert("the password or username do not exist");
                } 
                else {
                  
                    let pro;
                    sessionStorage.setItem("currentuser", JSON.stringify({ password: password_value, user_name: user_name_value, cart: [], OrderID:"0"  }));
                    let a = sessionStorage.getItem("currentuser");
                    console.log(JSON.parse(a));
                    debugger
                  
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
                    else{
                        let currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
                        sessionStorage.setItem('currentuser', JSON.stringify({ password: currentUser.password, user_name: currentUser.user_name, cart: pro, OrderID: pro[0].OrderID }));
                  
                    }
                    if ("manager" === user_name_value && "96679@gmail.com" === password_value) {
                        navigate(`/manager`);
                    } else {
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
            <div className="sign-up-card">
                <div className="view">
                    <img src="https://ad962edbae8ba7b03b7f-d10007df79b5b7a4e475a291e50a08cf.ssl.cf3.rackcdn.com/2836/open-a-shoe-shop.png" alt="" />
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
                                    <button className="btn-sign-up" onClick={checkIntegrity}>log in</button>
                                </div>
                                <div className="more">
                                <button className="sign-in-link" onClick={() => { navigate("/signin"); }}>sign up</button>
                            </div>
                        </div>
                    </div>
                    </section>
            </div>
        </div>
    );
}
export default Log_In;