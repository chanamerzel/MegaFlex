import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import '../App.css';
import ReactDOM from "react-dom/client";
export default function Client_Nav(props) {
    let navigate = useNavigate();
    const [user_name, setuser_name] = useState("")

    useEffect(() => {
        try {
            let user = JSON.parse(sessionStorage.getItem("currentuser")).user_name
            setuser_name(user)
        } catch (error) {
            setuser_name(`to MegaFlex`)
        }
       
    }, []);
    return (
        <div>
            <div className="n">
                <nav className="navs">

                    <Link onClick={() => {
                        props.checkAtStart()
                    }} className={window.location.pathname === "/client/shopingCart" ? "last-clicked" : "App-link"} to={`/client/shopingCart`}>shopping-cart</Link>
                    <Link className={window.location.pathname === "/client" ? "last-clicked" : "App-link"} onClick={() => {
                    }} to={`/client`}>product list</Link>
                    <Link className={window.location.pathname === "/Log_Out" ? "last-clicked" : "App-link"} onClick={() => {
                    }} to={`/Log_Out`}>log out</Link>
                    <div style={{marginLeft: "1000px",marginTop:"-83px",paddingBottom:"1px"}}>
                        <img src='http://localhost:3678/user4.png' style={{ width: "50px"}} />
                        <p style={{fontSize:"15px", color: "white"}}>Welcom {user_name} :)</p>
                    </div>
                </nav>

                <Outlet />
            </div>
        </div>);
}