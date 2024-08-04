import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import get_categories from './logic/get_categories';
import searching from './logic/search';
import get_sortedProducts from './logic/get_sortedProducts'
export default function Sorting_Bar(props) {
    const [price, setPrice] = useState(1000);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState(0);
    const [search, setSearch] = useState("");
    const [found, setFound] = useState(true);
    const [current_products, setCurrent_products] = useState(true);
    const [all_products, setAll_products] = useState(true);

    async function getAllCategories() {
        let mycategories = await get_categories()
        setCategories(mycategories)
    }
    async function getAllProducts() {
        let allProducts = await get_sortedProducts(0)
        setCurrent_products(allProducts)
        setAll_products(allProducts)
    }

    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, []);

    async function searchByName(name) {
        setSearch(name)
        let products = searching(search, 0, price, current_products)
        if (products.length === 0) {
            if (current_products.length === all_products.length ) {
                setChecked(0)
            } else {
                setChecked(current_products[0].CodeCategory)
            }
            products = current_products
            setFound(false)
        }
        else {
            setChecked(products[0].CodeCategory)
            setFound(true)

        }
        props.setProducts(products)
        setCurrent_products(products)
    }

    function price_onchange(price) {
        setPrice(price)
        setFound(true)
        let products = searching(null, 0, price, current_products)
        if (products.length === 0) {
            setChecked(0)
            props.setProducts(current_products)
        }
        else {
            props.setProducts(products)

        }
    }
    async function sort_by_categories(CategoryName,categoryCode) {
        setChecked(categoryCode)
        let products = await get_sortedProducts(CategoryName)
        setCurrent_products(products)
        props.setProducts(products)
        setPrice(1000)
        setSearch("")
        setFound(true)
    }
    return (
        <div style={{ display: props.sortVisibility ? "none" : "block" }} className="sorting_bar">
            {!props.sortVisibility && <div className='sticky'>
                <img className="right-arrow" onClick={() => props.setSortVisibility(true)} src='http://localhost:3678/right-chevron.png' ></img>
                <p style={{ marginTop: "-29px", marginLeft: "-369px" }} ><strong> Filters:</strong></p>

            </div>}
            <p style={{ fontSize: "15px", marginTop: "50px" }}>search by name of shoe: </p>
            <input type='text' style={{ marginTop: "-12px" }} value={search} onChange={(e) => { setSearch(e.target.value); setFound(true) }} placeholder='search..' />
            <button style={{ width: "30px", marginLeft: "3px" }} onClick={() => searchByName(search)}><img src='http://localhost:3678/search_icon1.png' /></button>
            {!found && <p style={{ color: "red" }}>Sorry, we cant find what you're looking for. please try again.</p>}
            <div className="range">
                <p style={{ fontSize: "15px" }}>please choose price: </p>
                <input type="range" style={{ marginTop: "-12px", marginLeft: '40px', width: "80%" }} min="0" max="1000" value={price} onChange={(e) => price_onchange(e.target.value)} />
                <p>Price: {price}$</p>
            </div>
            <div>
                <h4 style={{ marginTop: "20px", marginLeft: "-300px" }}><strong>categories</strong></h4>
                <div>
                    {categories.map((category) => (
                        <label className="container" key={category.CategoryCode}>
                            <input type="radio" onChange={() => sort_by_categories(category.CategoryName,category.CategoryCode)} checked={category.CategoryCode === checked ? true : false} name="radio" />
                            <span className="checkmark" ></span>
                            {category.CategoryName}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}