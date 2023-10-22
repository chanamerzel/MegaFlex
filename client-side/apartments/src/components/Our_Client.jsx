
import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Client_Current_Product from "./Client_Current_Product";
import Client_Shoping_Cart from "./Client_Shoping_Cart";
import Client_Nav from "./Client_Nav";
export default function Our_Client(props) {
    const [products, setProducts] = useState([]);
    const [client, setClient] = useState("");
    const [categories,setCategories]=useState([]);
    const [category, setCategory] = useState("");
    let navigate = useNavigate();
    const [limit, setLimit] = useState(-10);
    const [displayB, setDisplayB] = useState("block");
    const [displayP, setDisplayP] = useState("none");
    let a = 0
    async function getAllCategories() {
        let cat = await fetch(`http://localhost:3678/products/allcategories`, {
            method: 'GET'
        });
        let allCategories = await cat.json();
        let all = {
            CategoryCode: 0,
            CategoryName: "all"
        }
        allCategories.unshift(all)
        setCategories(allCategories);
        setCategories(allCategories);
    }
   
    useEffect(() => {
        a++;
       
            
            getAllCategories();
             getProducts(a);
    
            
        return async () => {

            outofcomponent();
        }
    }, []);

    function checkExistence(product, arr) {
        for (let index = 0; index < arr.length; index++) {
            if (product.CodeItem == arr[index].CodeItem) {

                return true
            }
        }
        return false
    }

    async function getProducts(a) {
        let newLimit = limit + 10;
        setLimit(newLimit)
        console.log("newLimit" + newLimit);
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
            if (pro.length == 0) {
                setDisplayB("none")
                setDisplayP("block")
            }
            else {

                let i = 0;
                while (i != pro.length) {
                    if (checkExistence(pro[i], arr)) { }
                    else {
                        if (category != "") {
                            if (pro[i].CodeCategory == category) {
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

async function outofcomponent(){
     let up = await fetch('http://localhost:3678/cart/delete/allitem', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderid: JSON.parse(sessionStorage.getItem("currentuser")).OrderID
                })
            });
            let response = await up.json();
            let cart=JSON.parse(sessionStorage.getItem('currentuser')).cart;
            let postt = await fetch('http://localhost:3678/cart/insert', {
                // 'content-type': 'application/json',
                // 'Accept': 'application/json',    
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post: cart,
                    OrderID: JSON.parse(sessionStorage.getItem('currentuser')).OrderID
                })
            });
            let res=await postt.json();
            // console.log("res: "+res)
            let plus_to_cart=[];
            cart.forEach((element,i) => {
                plus_to_cart.push({...element,ItemInCartCode:res[i].ItemInCartCode})
                element={...element,ItemInCartCode:res[i].ItemInCartCode};
            console.log("res["+i+"].ItemInCartCode: "+res[i].ItemInCartCode)

            });
    }
    async function categoryType(val) {
        setCategory(val);
        console.log(`val ${val}`);
        
        if (val == 0) {
            window.location.reload()
        }
        else {
        let catItems = await fetch(`http://localhost:3678/products/codecategory/${val}`, {
            method: 'GET'
        });
        let allCatItems = await catItems.json();
        console.log(allCatItems);
        setProducts(allCatItems);
    }
    };
    async function forShoppingCart() {
        console.log(products);
        navigate("/client/shopingCart", { state: { products: products } });
    }

    async function toTheItem(myproduct) {
        navigate(`/client/currentProduct/${myproduct.CodeItem}`, { state: { products: products, CodeItem: myproduct.CodeItem, myproduct: myproduct } });
    }


    return (<div>
        <Client_Nav />
        <p className='title'>all items</p>
        <br></br>
        <label className='title2'>categories: </label>
        <div className="allS">
            <div className="select">
                <select onChange={(e) => { categoryType(e.target.value) }}>
                    {categories.map((option, index) => (
                        <option key={option.CategoryCode} value={option.CategoryCode} >
                            {option.CategoryName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <br></br>
        <br></br>
        <div className='grid'>
            {products.map((myproduct) =>
                (<div key={myproduct.CodeItem}>
                    <button className='button' onClick={() => { toTheItem(myproduct) }}>
                        <img className='product_images img_hovering' src={`${myproduct.path}`} /><br />
                        <p className='itemName'> {myproduct.ItemName}</p>
                    </button>

                </div>)
            )}
        </div>
        <button className="but3" style={{ display: displayB ,}} onClick={() => { getProducts(1) }}>Show more</button>
       <br></br>
      
       <button  disabled style={{ display: displayP ,fontSize:"19px" ,marginLeft:"45%",paddingLeft:"30px",paddingBottom:"5px",color:"white",borderRadius:"2px",marginBottom:"3px",paddingRight:"30px",backgroundColor:"gray"}} >no more products</button>

        {/* <h2 style={{ display: displayP, color: "gray" }}>no more products</h2> */}
    </div>);

}
