import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom";
import '../App.css';
export default function Log_Out(props) {
    const [order, setorder] = useState();
    let navigate=useNavigate();
    let user=JSON.parse(sessionStorage.getItem("currentuser")).OrderID;
    useEffect(() => {
        setorder(user);
        deletefromcustomers();
       
    }, []);
    async function deletefromcustomers(){
        let prod = await fetch(`http://localhost:3678/customer/delete/customer`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 's/json'
            },
            body: JSON.stringify({orderid:user})
        });
        let pro = await prod.json();
        navigate('/');
        sessionStorage.clear();

    }
    return (
    <div>
        
    </div>);
}