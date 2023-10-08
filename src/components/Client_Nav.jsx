import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Manager_Product_List from "./Manager_Product_List";
import Manager_Add_Product from "./Manager_Add_Product";
import Manager_Orderding_List from "./Manager_Orderding_List";
import Manager_Profits from "./Manager_Profits";
import { Link, Outlet } from "react-router-dom";
import '../App.css';
import ReactDOM from "react-dom/client";

export default function Client_Nav(props) {
    let navigate=useNavigate();
    return (
    <div>
        <div className="n">
            <nav className="navs">
                <Link onClick={()=>{props.checkAtStart()
                    }} className={window.location.pathname==="/client/shopingCart"?"last-clicked":"App-link" }   to={`/client/shopingCart`}>shopping-cart</Link>
                <Link className={window.location.pathname==="/client"?"last-clicked":"App-link"}  onClick={()=>{
                    }} to={`/client`}>product list</Link>
                <Link className={window.location.pathname==="/Log_Out"?"last-clicked":"App-link"}  onClick={()=>{
                      }} to={`/Log_Out`}>log out</Link>
            </nav>
            <Outlet />
        </div>
      
    </div>);
}
