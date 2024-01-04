import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Nav from "./Nav"
import '../App.css';

export default function Manager_Add_Product(props) {
    const [product_name, setproductname] = useState("");
    const [product_description, setproductdescription] = useState("");
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');
    const [truf, settruf] = useState(true);
    const [amount_of_units, setamountofunits] = useState("");
    const [catagory, setcatagory] = useState("1");
    const [categories,setCategories]=useState([]);
    const [price, setprice] = useState("");
    function App() {
        const handleSubmit = async (e) => {
            e.preventDefault();
            let formData = new FormData();
            formData.append('file', image.data);
            const response = await fetch('http://localhost:3678/image', {
                method: 'POST',
                body: formData,
            });
            if (response) {
                setStatus(response.statusText);
            }
        }
        const handleFileChange = (e) => {
            const img = {
                preview: URL.createObjectURL(e.target.files[0]),
                data: e.target.files[0],
            }
            setImage(img);
            settruf(true);
            setStatus('');
        }
        useEffect(() => {
        async function getAllCategories() {
            let cat = await fetch(`http://localhost:3678/products/allcategories`, {
                method: 'GET'
            });
            let allCategories = await cat.json();
            setCategories(allCategories);
        }
        getAllCategories();
    },[]);
        return (
            <div className='App' style={{ MarginTop: "-11px"}}>
                <h1>insert a picture:</h1>
                {truf && image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <form  style={{marginLeft:"188px"}} onSubmit={handleSubmit}>
                    <input   type='file' name='file' style={{marginLeft:" 72px"}}  onChange={handleFileChange}></input>
                    <button className="but2" style={{marginLeft: "486px", marginTop: "-16px",display:"flex", justifyContent:"center"}} type='submit'>download</button>
                </form>
                {truf && status && <h4>{status}</h4>}
            </div>
        );
    }
    function saveproductname(product) {
        setproductname(product);
    }
    function saveproductdescription(text) {
        setproductdescription(text);
    }
    function saveamountofunits(units) {
        setamountofunits(units);
    }
    function saveprice(price) {
        setprice(price);
    }
    async function save_new_product() {
        if (product_name === '' || product_description === '' || image.preview === '' || amount_of_units === '' || catagory === '' || price === '') {
            alert("Please fill in all input fields!!");
        }
        else {
            if (typeof product_name === "string" && isNaN(product_name) && typeof product_description === "string"
                && isNaN(product_description) && typeof image.preview === "string" && isNaN(image.preview) &&
                !isNaN(amount_of_units) && !isNaN(catagory) && !isNaN(price) && product_name.length > 0 &&
                product_description.length > 0 && image.preview.length > 0 && amount_of_units.length > 0 &&
                catagory.length > 0 && price.length > 0) {
                let codeC = await fetch(`http://localhost:3678/products`, {
                    method: 'GET'
                });
                let codeCateg = await codeC.json();
                let exsistname = false;
                codeCateg.forEach(element => {
                    if (element.ItemName === product_name) {
                        exsistname = true;
                    }
                });
                if (exsistname) {
                    alert("name exsists");
                    saveproductname('');
                }
                else {
                    let ans = await fetch("http://localhost:3678/products/save", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: product_name,
                            description: product_description,
                            path: image.data.name,
                            amount: amount_of_units,
                            category: catagory,
                            price: price
                        })
                    })
                    ans = await ans.json();
                    setStatus("");
                    setImage({ preview: '', data: '' });
                    saveproductname('');
                    setproductdescription('');
                    setamountofunits('');
                    setcatagory('1');
                    setprice('');
                }
            }
            else {
                alert('There is a problem with the input fields');
            }
        }
    }
    async function categoryType(val) {
        setcatagory(val);
        let catItems = await fetch(`http://localhost:3678/products/codecategory/${val}`, {
            method: 'GET'
        });
        let allCatItems = await catItems.json();
    };
    return (<div style={{marginTop: "-21px"}}>
        <Nav></Nav>
        <div style={{marginLeft:"200px"}}>
                <h1 style={{paddingTop: "13px",marginBottom: "43px"}}>Add Product</h1>
        <form >
            <h4 className="">put in a product name</h4>
            <input type="input" className="" value={product_name} onChange={(e) => setproductname(e.target.value)} placeholder="product name"></input>
            <h4>put in the amount of units</h4>
            <input type="input" className="" value={amount_of_units} onChange={(e) => { saveamountofunits(e.target.value) }} placeholder="amount of units"></input>
            <h4>catagory</h4>
            <select onChange={(e) => { categoryType(e.target.value) }}>
                    {categories.map((option, index) => (
                        <option key={option.CategoryCode} value={index + 1} >
                            {option.CategoryName}
                        </option>
                    ))}
                </select>
            <h4>price</h4>
            <input type="text" className="" value={price} onChange={(e) => { saveprice(e.target.value) }} placeholder="price"></input>
            <h4>put in a product description</h4>
            <textarea className="" value={product_description} onChange={(e) => { saveproductdescription(e.target.value) }} rows="10" cols="50" placeholder="product description"></textarea >
        </form>
        <br></br>
        {App()}
        <br></br>
        <button className="but" style={{display:"flex", justifyContent:"center"}} onClick={save_new_product}>save</button>
        </div>
    </div>)
}