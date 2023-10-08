import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import '../App.css';
import { useLocation } from 'react-router-dom';

export default function Manager_Add_Category(props) {
    const [category_name, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    async function getAllCategories() {
        let cat = await fetch(`http://localhost:3678/products/allcategories`, {
            method: 'GET'
        });
        let categories = await cat.json();
        setCategories(categories)
    }
    useEffect(() => {
        getAllCategories();
    }, []);
    function saveCategoryName(product) {
        setCategoryName(product);
    }
    async function save_new_category() {
        debugger;
        if (category_name == '') {
            alert("Please fill in the input field!!");
        }
        else {
            if (typeof category_name == "string" && isNaN(category_name)) {

                let exsistname = false;
                categories.forEach(cat => {
                    if (cat.CategoryName === category_name) {
                        exsistname = true;
                    }
                });
                if (exsistname) {
                    alert("name exsists");
                    saveCategoryName('');
                }
                else {
                    let ans = await fetch("http://localhost:3678/products/saveCategory", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            CategoryName: category_name,
                        })
                    })
                    ans = await ans.json();
                    console.log(ans);
                    saveCategoryName('');
                    getAllCategories()
                }
            }
            else {
                alert('There is a problem with the input field');
                console.log("typeof category_name: " + Number(category_name));
            }
        }

    }







    return (<div>
        <Nav />
        <br /><br /><br />
        <p className="title2">add category</p>
        <form>
            <p className="title3">put in a category name</p>
            <input type="input" className="" value={category_name} onChange={(e) => setCategoryName(e.target.value)} placeholder="category name"></input>
        </form>
        <br></br>
        <button className="but" onClick={save_new_category}>save</button>
        {categories.map((catagory) =>
        (<div className="box" key={catagory}>
            <p className='title3'>{catagory.name}</p>
        </div>)
        )}
    </div>);
}
