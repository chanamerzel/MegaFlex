import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
let date = new Date();
function Sign_In(props) {
    const [password_value, setPassword_value] = useState("");
    const [user_name_value, setUser_name_value] = useState("");
    const [countGmails, setcountGmails] = useState(0);

    let navigate = useNavigate();
    function savePasswordValue(val) {
        setPassword_value(val);
    }
    function saveUsernameValue(val) {
        setUser_name_value(val);
    }
    function automatic_complete(val) {
        if (val.includes("@gmail.com") || countGmails >= 1) {
            savePasswordValue(val)
        }
        else {
            savePasswordValue(val + "@gmail.com");
            setcountGmails(1)
        }
    }
    async function checkIntegrity() {
        //    let r= fetch(`http://localhost:3678/emailSender`, {
        //                         method: 'POST',
        //                         headers: {
        //                             'Accept': 'application/json',
        //                             'Content-Type': 'application/json'
        //                         },
        //                         body: JSON.stringify({
        //                             username: user_name_value,
        //                             password: password_value
        //                         })
        //                     });
        //     // let t= await r.json();
        //     if (r=="true"){
        //         var myWindow = window.open("", "MsgWindow", "width=200,height=100");
        //         myWindow.document.write("<p>mail is valid</p>")
        //     }else{
        //         var myWindow = window.open("", "MsgWindow", "width=200,height=100");
        //         myWindow.document.write("<p>mail is not     valid</p>")

        //     }
        //             flag = await flag.json();

        try {
            if (password_value === '' || user_name_value === "") {
                alert("email or username are empty");
            }
            else {
                if (!password_value.match(
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )) {
                    alert("email is not valid");
                    setPassword_value("");
                }
                if (true) {
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
                        console.log("signin 96  res[0].OrderCode:"+  res[0].OrderCode)

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
                    <div className="login_signin_card">
                        <div className="form">
                            <header>
                                <h2 className="line-hight">Create An Account</h2>
                            </header>
                            <div >
                                <input step={{ marginTop: -27 }} type="input" className="form-control" value={user_name_value} onChange={(e) => { saveUsernameValue(e.target.value) }} id={date} placeholder="username"></input>
                            </div>
                            <div >
                                <input type="email" className="form-control" value={password_value} onChange={(e) => { automatic_complete(e.target.value) }} placeholder="email@gmail.com"></input>
                                {/* <input type="email" className="form-control" value={password_value} onChange={(e) => { savePasswordValue(e.target.value) }} id={date} placeholder="email"></input> */}
                            </div>
                            <div >
                                <button className="btn-sign-up" onClick={checkIntegrity}>sign up</button>
                            </div>
                            <br></br>
                            <div className="more">
                                <p style={{ fontSize: "15px" }}>already have an account? <span className="a-linq" onClick={() => { navigate("/login"); }}>log in</span> </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}
export default Sign_In;