import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Nav from "./Nav"
import '../App.css';
import Shoe_Size_Table from "./Shoe_Size_Table";

export default function Manager_Add_Product(props) {
    const [product_name, setproductname] = useState("");
    const [product_description, setproductdescription] = useState("");
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');
    const [truf, settruf] = useState(true);
    // const [amount_of_units, setamountofunits] = useState("");
    const [catagory, setcatagory] = useState("1");
    const [categories, setCategories] = useState([]);
    const [price, setprice] = useState("");
    const [shoes, setShoes] = useState([]);
    const [amountValue, set_AmountValue] = useState("")
    const [sizeValue, set_SizeValue] = useState("")
    const [hidden, set_Hidden] = useState("hidden")
    const [total, set_Total] = useState(0)

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
        }, []);
        return (
            <div className='App' style={{ MarginTop: "-11px" }}>
                <h1>insert a picture:</h1>
                {truf && image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <form style={{ marginLeft: "188px" }} onSubmit={handleSubmit}>
                    <input type='file' name='file' style={{ marginLeft: " 72px" }} onChange={handleFileChange}></input>
                    <button className="but2" style={{ marginLeft: "486px", marginTop: "-16px", display: "flex", justifyContent: "center" }} type='submit'>download</button>
                </form>
                {truf && status && <h4>{status}</h4>}
            </div>
        );
    }
    function shoeSizeTable() {
        const setTotal = () => {
            let shoeList = JSON.parse(sessionStorage.getItem("newShoe"));
            let sum = 0;
            shoeList.map((shoe) => {
                sum += parseInt(shoe.Quantity)
            })
            set_Total(sum)

        }
        const deleteSize = (e, currentShoe) => {
            e.preventDefault();
            let newShoes = [];
            shoes.forEach(shoe => {
                if (shoe !== currentShoe) {
                    newShoes.push(shoe)
                }
            });
            setShoes(newShoes);
            sessionStorage.setItem("newShoe", JSON.stringify(newShoes))
            setTotal()
        }
        const addToShoeList = (e, size, amount) => {
            e.preventDefault();
            let newShoes = shoes;
            let shoe = {
                ShoeSize: size,
                Quantity: amount
            }
            var message = '';
            switch (true) {
                case size <= 0:
                    message = "Size is not valid.";
                    break;
                case amount <= 0:
                    message = "Amount is not valid.";
                    break;
                default:
                    for (let object of shoes) {
                        if (size == object.ShoeSize) {
                            message = "Size exists.";
                            break
                        }
                    }
                    break;
            }
            if (message == '') {
                newShoes.push(shoe)
                sessionStorage.setItem("newShoe", JSON.stringify(newShoes))
                setShoes(newShoes);
                setTotal()
                set_Hidden("hidden")
                set_Hidden("visible")

            }
            else {
                alert(message)
            }


        }
        return (
            <div>
                <table border="1px">
                    <thead>
                        <tr>
                            <th className="th">Size</th>
                            <th className="th">Amount</th>
                        </tr>
                    </thead>
                    {shoes.map((shoe, i) => (
                        <tr key={shoe}>
                            <td>{shoe.ShoeSize}</td>
                            <td>{shoe.Quantity}</td>
                            <button className="but2 table_btn"
                                onClick={(e) => { deleteSize(e, shoe) }}>delete</button>
                        </tr>)
                    )}
                    <tr>
                        <th className="th">total:</th>
                        <td>{total}</td>
                    </tr>
                </table>
                {hidden !== "hidden" && <div className="add_form" >
                    <input type="number" min="0" max="90" value={sizeValue}
                        onChange={(e) => set_SizeValue(e.target.value)}
                        className="newtr" placeholder="Size" />
                    <input type="number" className="newtr" min={0} max="" value={amountValue}
                        onChange={(e) => set_AmountValue(e.target.value)} placeholder="Amount" />
                    <br></br>
                    <div className="table_btn">
                        <button className="but2 submit_cancel"
                            onClick={(e) => addToShoeList(e, sizeValue, amountValue)}>Submit</button>
                        <button className="but2 submit_cancel Cancel_btn"
                            onClick={() => set_Hidden("hidden")}>Cancel</button>
                    </div>
                </div >}
                <br></br>
                {hidden === "hidden" && <button className="but2 table_btn"
                    style={{ hidden: true, width: "35%" }}
                    onClick={() => set_Hidden("visible")}>add size</button>}
            </div>
        );
    }
    useEffect(() => {
        setShoes(JSON.parse(sessionStorage.getItem("newShoe")) ?
            JSON.parse(sessionStorage.getItem("newShoe")) : [])
        return () => {
            sessionStorage.setItem("newShoe", JSON.stringify([]))

        }
    }, []);
    function saveproductname(product) {
        setproductname(product);
    }
    function saveproductdescription(text) {
        setproductdescription(text);
    }
    // function saveamountofunits(units) {
    //     setamountofunits(units);
    // }
    function saveprice(price) {
        setprice(price);
    }
    async function save_new_product() {
        if (product_name === '' || product_description === '' || image.preview === '' || catagory === '' || price === '' || shoes.length === 0) {
            alert("Please fill in all input fields!!");
        }
        else {
            if (typeof product_name === "string" && isNaN(product_name) && typeof product_description === "string"
                && isNaN(product_description) && typeof image.preview === "string" && isNaN(image.preview) &&
                !isNaN(catagory) && !isNaN(price) && product_name.length > 0 &&
                product_description.length > 0 && image.preview.length > 0 &&
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
                            name: product_name.split(' ').join('_'),
                            description: product_description,
                            path: image.data.name,
                            amount: total,
                            category: catagory,
                            price: price
                        })
                    })
                    let codeItem = await ans.json();
                    let req = {
                        "body": shoes,
                        "codeItem": codeItem
                    }
                    let insertion = await fetch(`http://localhost:3678/quantityofsize/insert`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:
                            JSON.stringify(req)

                    });
                    insertion = await insertion.json();
                    let update_Product_Quantity = await fetch(`http://localhost:3678/products/Update_Quantity`, {
                        method: 'Put',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
                    update_Product_Quantity = await update_Product_Quantity.json();
                    // setStatus("");
                    // setImage({ preview: '', data: '' });
                    // saveproductname('');
                    // setproductdescription('');
                    // setcatagory('1');
                    // setprice('');
                    // setShoes([]);
                    // set_Total(0)
                    // set_AmountValue('')
                    // set_SizeValue('')
                    window.location.reload()
                }
            }
            else {
                alert('There is a problem with the input fields');
            }
        }
    }
    async function categoryType(val) {
        alert(val)
        setcatagory(val);
        // let catItems = await fetch(`http://localhost:3678/products/codecategory/${val}`, {
        //     method: 'GET'
        // });
        // let allCatItems = await catItems.json();
    };
    return (<div style={{ marginTop: "-21px" }}>
        <Nav></Nav>
        <div style={{ marginLeft: "200px" }}>
            <h1 style={{ paddingTop: "13px", marginBottom: "43px" }}>Add Product</h1>
            <form >
                <h4 className="">put in a product name</h4>
                <input type="input" className="" value={product_name} onChange={(e) => setproductname(e.target.value)} placeholder="product name"></input>
                {/* <Shoe_Size_Table  /> */}
                {shoeSizeTable()}
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
            <button className="but" style={{ display: "flex", justifyContent: "center" }} onClick={save_new_product}>save</button>
        </div>
    </div>)
}