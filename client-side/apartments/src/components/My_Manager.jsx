import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom"
import Nav from "./Nav"
import '../App.css';
export default function My_Manager(props) {
    let navigate = useNavigate();
    useEffect(() => {
        async function getProducts() {
            let prod = await fetch("http://localhost:3678/products", {
                method: 'GET'
            });
            let pro = await prod.json();
        }
        getProducts();
    }, []);
    return (<div className="manager">
        <div >
            <Nav />
        </div>
        <br/><br/>
        <p className="title" style={{marginLeft: "378px"}}>welcome manager <br/> To check new orders click on ordering list...</p>
    </div>);
}