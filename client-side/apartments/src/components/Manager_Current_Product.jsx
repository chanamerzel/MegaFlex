import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import My_Manager from "./My_Manager";

export default function Manager_Current_Product(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let currentProduct = location.state;
    const [product_name, setproduct_name] = useState(currentProduct.currentProduct[0].ItemName);
    const [amount_of_units, setamount_of_units] = useState(currentProduct.currentProduct[0].QuantityItem);
    const [categories, setcategories] = useState(currentProduct.categories);
    const [category, setcategory] = useState(currentProduct.currentProduct[0].CodeCategory);
    const [select, setselect] = useState("selected");
    const [price, setprice] = useState(currentProduct.currentProduct[0].Price);
    const [description, setdescription] = useState(currentProduct.currentProduct[0].description);
    const [image, setImage] = useState({ preview: currentProduct.currentProduct[0].path, data: '' });
    const [code, setcode] = useState(currentProduct.currentProduct[0].CodeItem);
    const [status, setStatus] = useState('');
    const [truf, settruf] = useState(true);
    const [lastpr, setlastpr] = useState({});
console.log( currentProduct.currentProduct[0].path);

    useEffect(() => {
        let lastpr = {
            name: product_name,
            description: description,
            path: image.data.name,
            amount: amount_of_units,
            category: category,
            price: price
        }
        setlastpr(lastpr);
        // getcategories();
    }, []);
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
        return (
            <div className='App'>
                <h1>insert a picture:</h1>
                {truf && image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                    <button className="btn btn-outline-secondary btn-lg" type='submit'>download</button>
                </form>
                {truf && status && <h4>{status}</h4>}
            </div>
        );
    }
    // function setproduct_name(product) {
    //     setproductname(product);
    // }
    function saveproductdescription(text) {
        setdescription(text);
    }
    function saveamountofunits(units) {
        setamount_of_units(units);
    }
    // function savecatagory(catagory) {
    //     setcatagory(catagory);
    // }
    // function savecode(code) {
    //     setcode(code);
    // }
    function saveprice(price) {
        setprice(price);
    }
    async function categoryType(val) {
        setcategory(val);
        // setcategories(val);
        console.log(`val ${val}`);
        let codeC = await fetch(`http://localhost:3678/products/category/${val}`, {
            method: 'GET'
        });
        let codeCateg = await codeC.json();

        let catItems = await fetch(`http://localhost:3678/products/codecategory/${codeCateg[0].CategoryCode}`, {
            method: 'GET'
        });
        let allCatItems = await catItems.json();
        console.log(allCatItems);
        // setProducts(allCatItems);
    };
    function saveproductdescription(text) {
        setdescription(text);
    }
    function saveamountofunits(units) {
        setamount_of_units(units);
    }
    function savecatagory(catagory) {
        setcategories(catagory);
    }
    // function savecode(code) {
    //     setcode(code);
    // }
    function saveprice(price) {
        setprice(price);
    }
    async function save_new_product() {
        if (product_name == '' || description == '' || image.preview == '' || amount_of_units == '' || categories == '' || price == '') {
            alert("Please fill in all input fields!!");
        }
        else {
            if (typeof product_name == "string" && isNaN(product_name) && typeof description == "string" && isNaN(description)
                && typeof image.preview == "string" && isNaN(image.preview) &&
                !isNaN(amount_of_units) && !isNaN(category) && !isNaN(price) && product_name.length > 0
                && description.length > 0 && image.preview.length > 0 && amount_of_units > 0 && categories.length > 0 && price > 0) {
                

                let newpro = {
                    name: product_name,
                    description: description,
                    path: image.data.name,
                    amount: amount_of_units,
                    category: category,
                    price: price,
                    code: code
                }
                console.log(image.data.name);
                let ans = await fetch("http://localhost:3678/products/save", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        lastpr: lastpr,
                        newpro: newpro
                    })
                })
                ans = await ans.json();
                console.log(ans);
                
                navigate("/manager/productlist");
               
            }
            else {
                alert('There is a problem with the input fields');
                console.log("typeof product_name: " + Number(product_name));
                if (isNaN(amount_of_units)) {
                    console.log("nan!");
                }
                console.log("typeof product_description: " + typeof description);
                console.log("typeof image.preview: " + typeof image.preview);
                console.log("typeof amount_of_units: " + typeof Number(amount_of_units));
                console.log("typeof catagory: " + typeof categories);
               
                console.log("typeof price: " + typeof price);
            }
         
        }

    }


  
    if (categories.length > 0) {
        return (<div>
           
            <Nav></Nav>
            <form>
                <h4 className="">put in a product name</h4>
                <input type="input" className="" value={product_name} onChange={(e) => setproduct_name(e.target.value)} placeholder="product name"></input>
                <h4>put in the amount of units</h4>
                <input type="input" className="" value={amount_of_units} onChange={(e) => { saveamountofunits(e.target.value) }} placeholder="amount of units"></input>
                <select onChange={(e) => { categoryType(e.target.value) }} >
                    {categories.map((option, index) => (
                        <option key={option.CategoryCode} value={index + 1} >
                            {option.CategoryName}
                        </option>
                    ))}
                </select>
               
            
                <h4>price</h4>
                <input type="text" className="" value={price} onChange={(e) => { saveprice(e.target.value) }} placeholder="price"></input>
                <h4>put in a product description</h4>
                <textarea className="" value={description} onChange={(e) => { saveproductdescription(e.target.value) }} rows="10" cols="50" placeholder="product description"></textarea >
             
            </form>
            <br></br>
            {App()}
            <br></br>
            <button className="btn btn-outline-secondary btn-lg" onClick={save_new_product}>save</button>

        </div>);
    }
}



