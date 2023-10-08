
// import React, { Component, useEffect } from 'react';
// import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Routes, Route, Link, Outlet } from 'react-router-dom';
// // import Client_Product_List from "./Client_Product_List";
// import Client_Current_Product from "./Client_Current_Product";
// import Client_Shoping_Cart from "./Client_Shoping_Cart";
// import Client_Nav from "./Client_Nav";
// export default function Products_List(props) {
//     const [products, setProducts] = useState([]);
//     const [client, setClient] = useState("");
//     const [category, setCategory] = useState("");
//     const [mystyle, setMystyle] = useState({});

//     let navigate = useNavigate();

//     useEffect(() => {
//         async function getProducts() {
//             let prod = await fetch("http://localhost:3678/products", {
//                 method: 'GET'
//             });
//             let pro = await prod.json();
//             setProducts(pro);

//             // let mclient = await fetch("http://localhost:3678/client", {
//             //     method: 'GET'
//             // });
//             // let cli = await mclient.json();
//             // setClient(pro);
//             //get products from db and save in usestate
//         }
//         getProducts();
//         setMystyle({
//             color: "#3aedff",
//             fontSize: "20px", marginLeft: "330px",
//             marginTop: "70PX"
//         });
//         // return async () => {

//         //     let up = await fetch('http://localhost:3678/cart/delete/allitem', {
//         //         method: 'DELETE',
//         //         headers: {
//         //             'Accept': 'application/json',
//         //             'Content-Type': 'application/json'
//         //         },
//         //         body: JSON.stringify({
//         //             orderid: JSON.parse(sessionStorage.getItem("currentuser")).OrderID
//         //         })
//         //     });
//         //     let response = up.json();

//             // if (JSON.parse(sessionStorage.getItem("currentuser")).user_name != null) {
//             //     let up = await fetch('http://localhost:3678/cart/cartUpdate', {
//             //         method: 'PUT',
//             //         headers: {
//             //             'Accept': 'application/json',
//             //             'Content-Type': 'application/json'
//             //         },
//             //         body: JSON.stringify({
//             //             user_name: JSON.parse(sessionStorage.getItem("currentuser")).user_name,
//             //             password: JSON.parse(sessionStorage.getItem("currentuser")).password,
//             //             cart: JSON.parse(sessionStorage.getItem("currentuser")).cart
//             //         })
//             //     });
//             //     alert('updated details and exit');
//             // }
//             // let prod = await fetch("http://localhost:3678/cart/shopingCart", {
//             //     method: 'POST',
//             //     headers: {
//             //         'Accept': 'application/json',
//             //         'Content-Type': 'application/json'
//             //     },
//             //     body: JSON.stringify({ password: JSON.parse(sessionStorage.getItem("currentuser")).password })
//             // });
//             // let prodb = await prod.json();
//             // let prosession = JSON.parse(sessionStorage.getItem("currentuser")).cart;
//             // let isbool = false;
//             // let post = [];
//             // let update = [];
//             // for (let i = 0; i < prosession.length; i++) {
//             //     isbool = false;
//             //     for (let j = 0; j < prodb.length; j++) {
//             //         // const element = array[index];
//             //         if (prosession[i] === prodb[j]) {
//             //             isbool = true;
//             //         }

//             //     }
//             //     if (isbool) {
//             //         update.push(prosession[i]);
//             //     }else{
//             //         post.push(prosession[i]);
//             //     }
//             //     // const element = prosession[index];
//             // }
//             // let up = await fetch('http://localhost:3678/cart/cartUpdate', {
//             //         method: 'PUT',
//             //         headers: {
//             //             'Accept': 'application/json',
//             //             'Content-Type': 'application/json'
//             //         },
//             //         body: JSON.stringify({
//             //             update:update,
//             //             OrderID:JSON.parse(sessionStorage.getItem('currentuser')).OrderID
//             //         })
//             //     });
//             // console.log("post "+JSON.stringify(post)+"  hh");
//         //     let postt = await fetch('http://localhost:3678/cart/insert', {
//         //         method: 'POST',
//         //         headers: {
//         //             'Accept': 'application/json',
//         //             'Content-Type': 'application/json'
//         //         },
//         //         body: JSON.stringify({
//         //             post: JSON.parse(sessionStorage.getItem('currentuser')).cart,
//         //             OrderID: JSON.parse(sessionStorage.getItem('currentuser')).OrderID
//         //         })
//         //     });
//         //     let res=postt.json();
//         // }
//     }, []);

//     async function categoryType(val) {
//         setCategory(val);
//         console.log(`val ${val}`);
//         let codeC = await fetch(`http://localhost:3678/products/category/${val}`, {
//             method: 'GET'
//         });
//         let codeCateg = await codeC.json();

//         let catItems = await fetch(`http://localhost:3678/products/codecategory/${codeCateg[0].CategoryCode}`, {
//             method: 'GET'
//         });
//         let allCatItems = await catItems.json();
//         console.log(allCatItems);
//         setProducts(allCatItems);
//     };
//     async function forShoppingCart() {
//         console.log(products);
//         navigate("/client/shopingCart", { state: { products: products } });
//     }

//     async function toTheItem(myproduct) {
//         // navigate("/client/shopingCart", { state: {products:products} });
//         navigate(`/client/currentProduct/${myproduct.CodeItem}`, { state: { products: products, CodeItem: myproduct.CodeItem, myproduct: myproduct } });
    
//     }


//     return (<div>
//         {/* <Client_Nav /> */}
//         <div className="">
//             <nav id="navs ">
//                 <Link className="App-link" style={mystyle} to={`/login`}>log in</Link>
//                 <Link className="App-link" style={mystyle} to={`/signin`}>sign in</Link>
//                 {/* <Link className="App-link" style={mystyle} to={`/manager/orderingList`}>orderingList</Link> */}
//                 {/* <Link className="App-link" style={mystyle} to={`/manager/profits`}>profits</Link> */}
//             </nav>
//             <Outlet />
//         </div>
//         <p className='title'>all items</p>
//         {/* <div>{products.map((product) => product.ItemName)}</div> */}
//         <br></br>
//         <label className='title2'>categories: </label>
//         {/* <select onChange={(e)=>{setCategory(e.target.value)}}> */}
//         <div className="allS">
//             <div className="select">
//         <select onChange={(e) => { categoryType(e.target.value) }}>
//             <option>heels</option>
//             <option>flat</option>
//             <option>sneakers</option>
//             <option>sandals</option>
//             <option>boots</option>
//             <option>slippers</option>
//         </select><br></br>
//         </div>
//         </div>



//         <br></br>
//         {products.map((myproduct) =>
//         (<div key={myproduct.CodeItem}>
//             {/* {myproduct.ItemName} */}
//             {/* <Link to={`/client/currentProduct/${myproduct.CodeItem}`}>{myproduct.ItemName}</Link> */}
//             <button onClick={() => { toTheItem(myproduct) }}>{myproduct.ItemName}</button>
//             {/* <button>add to shopping cart</button> */}
//         </div>)
//         )}
//         {/* <button onClick={(e) => { buymyproduct(e.target.value) }}>ADD TO SHOPING CART</button> */}

//         {/* <Client_Product_List products={products} /> */}
//         {/* <Routes>
//             <Route path="/currentProduct/:itemCode" element={< Client_Current_Product items={products} />}></Route>
//         </Routes>
//         <Outlet></Outlet> */}
//         {/* <button onClick={forShoppingCart}>to shopping cart</button> */}
//     </div>);
// }

import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Client_Current_Product from "./Client_Current_Product";
import Client_Shoping_Cart from "./Client_Shoping_Cart";
import Client_Nav from "./Client_Nav";
export default function Products_List(props) {
    const [products, setProducts] = useState([]);
    const [client, setClient] = useState("");
    const [categories,setCategories]=useState([]);
    const [category, setCategory] = useState("");
    let navigate = useNavigate();
    const [limit, setLimit] = useState(-10);
    const [displayB, setDisplayB] = useState("block");
    const [displayP, setDisplayP] = useState("none");
    // const [mystyle, setMystyle] = useState({});

    let a = 0
    useEffect(() => {
        a++;
            async function getAllCategories() {
                let cat = await fetch(`http://localhost:3678/products/allcategories`, {
                    method: 'GET'
                });
                let allCategories = await cat.json();
                setCategories(allCategories);
            }
            // setMystyle({
            //     color: "#3aedff",
            //     fontSize: "20px", marginLeft: "330px",
            //     marginTop: "70PX"
            // });
            getAllCategories();
             getProducts(a);
      
    }, []);

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
        if (a === 1) {
            if (pro.length == 0) {
                setDisplayB("none")
                setDisplayP("block")
            }
            else {

                let i = 0;
                while (i != pro.length) {
                    debugger;
                    arr.push(pro[i]);
                    i++;
                }

                setProducts([...arr]);
            }
        }
    }

    async function categoryType(val) {
        setCategory(val);
        console.log(`val ${val}`);
       

        let catItems = await fetch(`http://localhost:3678/products/codecategory/${val}`, {
            method: 'GET'
        });
        let allCatItems = await catItems.json();
        console.log(allCatItems);
        setProducts(allCatItems);
    };
   
   
    async function toTheItem(myproduct) {
        navigate(`/client/currentProduct/${myproduct.CodeItem}`, { state: { products: products, CodeItem: myproduct.CodeItem, myproduct: myproduct } });
    }


    return (<div>
        
         <div className="">
            <nav className="navs ">
                <Link className="App-link"     to={`/login`}>log in</Link>
                <Link className="App-link" to={`/signin`}>sign in</Link>
             </nav>
           <Outlet />
        </div> 
        <p className='title'>all items</p>
        <br></br>
        <label className='title2'>categories: </label>
        <div className="allS">
            <div className="select">
                <select onChange={(e) => { categoryType(e.target.value) }}>
                    {categories.map((option, index) => (
                        <option key={option.CategoryCode} value={index + 1} >
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
                        <img className='img' src={`${myproduct.path}`} /><br />
                        <p className='itemName'> {myproduct.ItemName}</p>
                    </button>

                </div>)
            )}
        </div>
        <button className="but2" style={{ display: displayB }} onClick={() => { getProducts(1) }}>Show more</button>
        <p style={{ display: displayP, color: "black" }}>no more products</p>

       
    </div>);

}
