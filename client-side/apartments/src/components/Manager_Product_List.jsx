import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from "./Nav"
import '../App.css';
import search from './logic/search'
import Sorting_Bar from './Sorting_Bar'
export default function Manager_Product_List(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [limit, setLimit] = useState(-10);
    const [displayB, setDisplayB] = useState("block");
    const [displayP, setDisplayP] = useState("none");
    let a = 0
 function checkExistence(product,arr){
    for (let index = 0; index < arr.length; index++) {
        if (product.CodeItem===arr[index].CodeItem){
            return true
        }
    }
    return false
 }
    async function getProducts(a) {
        let newLimit = limit + 10;
        setLimit(newLimit)
        let prod = await fetch(`http://localhost:3678/products/limit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ limit: newLimit })
        });
        let pro = await prod.json();
        let arr = products;
        let arrLength = arr.length
        if (a === 1) {
            if (pro.length === 0) {
                setDisplayB("none")
                setDisplayP("block")
            }
            else {
                let i = 0;
                while (i !== pro.length) {
                    if (checkExistence(pro[i],arr)) {}
                    else{
                        if (category !== "") {
                            if (pro[i].CodeCategory === category) {
                                arr.push(pro[i]);
                            }
                        }
                        else {
                            arr.push(pro[i]);
                        }
                    }
                    i++;
                }
                if (arr.length > arrLength) {
                    setProducts([...arr]);
                }
                else {
                    setDisplayB('none')
                    setDisplayP('block')
                }
            }
        }
    }
    useEffect(() => {
        a++;
        getcategories();
        getProducts(a);
    }, []);
    function confirmation(code,name){
        if (window.confirm(`are you sure you want to delete ${name} ?`)) {
            delete_item(code)
        } else {
          console.log("You pressed Cancel!");
        }
    }
    async function delete_item(code) {
        let produc = await fetch(`http://localhost:3678/products/item/name`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderID: code })
        });
        let mypro = await produc.json();
        if (mypro.length<=0) {
            let prod = await fetch(`http://localhost:3678/products/${code}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            let pro = await prod.json();
            window.location.reload()
        } else {
            alert("cannot delete item.item is Ordered by client and still not delivered");
        }
        getProducts(1);
    }
    async function categoryType(val) {
        setCategory(val);
        if (val === 0) {
            window.location.reload()
        }
        else {
            // let catItems = await fetch(`http://localhost:3678/products/codecategory/${val}`, {
            //     method: 'GET'
            // });
            // let allCatItems = await catItems.json();
            // setProducts(allCatItems);
        }
    };
    async function getcategories() {
        let categor = await fetch(`http://localhost:3678/products/allcategories`, {
            method: 'GET'
        });
        let allCategorItems = await categor.json();
        let all = {
            CategoryCode: 0,
            CategoryName: "all"
        }
        allCategorItems.unshift(all)
        setCategories(allCategorItems);
    }
    async function updating_item(code) {
        let produc = await fetch(`http://localhost:3678/products/item/name`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderID: code })
        });
        let mypro = await produc.json();
        let categor = await fetch(`http://localhost:3678/products/itemdetails/${code}`, {
            method: 'GET'
        });
        let allCategorItems = await categor.json();
        if (mypro.length<=0 ) {
       
        navigate(`/manager/currentProduct/${code}`, { state: { currentProduct: allCategorItems, categories: categories,disabled:false } });
 
    }
    else{
        navigate(`/manager/currentProduct/${code}`, { state: { currentProduct: allCategorItems, categories: categories,disabled:true } });

        // alert(mypro[0].ItemName+" is ordered and cannot be changed or updated.")
    }
}
    if (categories.length > 0) {
        return (
            <div style={{ marginTop: "-4%" }}>
                <Nav />
                
                <div>
                    <p className="title4">Product List</p>
                    <br></br>
                    <label className="title3">categories: </label>
                    <div className="allS">
                        <div className="select">
                            <select onChange={(e) => { categoryType(e.target.value) }} >
                                {categories.map((option, index) => (
                                    <option key={option.CategoryCode} value={option.CategoryCode}>
                                        {option.CategoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br />{search(null,null,null,products).map((myproduct) =>
                    (<div className="box3" key={myproduct.CodeItem}>
                        <p className="title3">{myproduct.ItemName}</p>
                        <img className='product_images img_hovering' src={`${myproduct.path}`} />
                        <br></br>
                        <br></br>
                        <div style={{ display: "flex", flexDirection: "row", marginRight: "110px", justifyContent: 'space-evenly' }}>
                            <button className="but2" onClick={() => { confirmation(myproduct.CodeItem,myproduct.ItemName) }}>delete</button>
                            <button className="but2" onClick={() => { updating_item(myproduct.CodeItem) }}>updating</button>
                        </div>
                        <br />
                    </div>)
                    )}
                    <button className="but3" style={{ display: displayB }} onClick={() => { getProducts(1) }}>Show more</button>
                    <p style={{ display: displayP, color: "black" }}>no more products</p>
                </div>
            </div>)
    }
}