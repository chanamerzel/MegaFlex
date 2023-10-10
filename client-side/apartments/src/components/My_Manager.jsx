import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Manager_Product_List from "./Manager_Product_List";
import Manager_Add_Product from "./Manager_Add_Product";
import Manager_Orderding_List from "./Manager_Orderding_List";
import Manager_Profits from "./Manager_Profits";
import Manager_Items_To_Order from "./Manager_Items_To_Order";
import Manager_AllUsers from "./Manager_AllUsers";
import Manager_Add_Category from "./Manager_Add_Category";
import { Link, Outlet } from "react-router-dom"
import Nav from "./Nav"
import '../App.css';

export default function My_Manager(props) {
    let navigate = useNavigate();
    
    const [client, setClient] = useState([]);
    const [category, setCategory] = useState("");
    const [mystyle, setMystyle] = useState({});
    useEffect(() => {
        async function getProducts() {
            let prod = await fetch("http://localhost:3678/products", {
                method: 'GET'
            });
            let pro = await prod.json();
         
            setMystyle({
                color: "#3aedff",
                fontSize: "20px", marginLeft: "330px",
                marginTop: "70PX"
            });
        }
        getProducts();
    }, []);

  
    
    

    return (<div className="manager">
       
        <div >
            <Nav />
        </div>
        <br/><br/><p className="title">welcome manager <br/> To check new orders click on ordering list...</p>
      

    </div>);
}