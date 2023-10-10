// import logo from './logo.svg';
import react from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Our_Client from './components/Our_Client';
import './App.css';
// import Sample from './components/sample';
import Log_in from "./components/Log_In"
import Client_Current_Product from './components/Client_Current_Product';
import Sign_In from './components/Sign_In';
// import Client_Product_List from './components/Client_Product_List';
import Client_Shoping_Cart from './components/Client_Shoping_Cart';
import Client_Final_Bill from './components/Client_Final_Bill';
import Manager_Product_List from "./components/Manager_Product_List";
import Manager_Add_Product from "./components/Manager_Add_Product";
import Manager_Orderding_List from "./components/Manager_Orderding_List";
import Manager_Profits from "./components/Manager_Profits";
import My_Manager from "./components/My_Manager";
import Manager_Update_Product from "./components/Manager_Update_Product";
import Manager_Items_To_Order from './components/Manager_Items_To_Order';
import Manager_AllUsers from './components/Manager_AllUsers';
import Manager_Add_Category from './components/Manager_Add_Category';
import Products_List from "./components/Products_List";
import Log_Out from "./components/Log_Out";
function App() {
    return (
        <div className="App" >
            <BrowserRouter >
                <Routes >
                <Route path="/"
                        element={< Products_List />} />
                    <Route path="/login"
                        element={< Log_in />} />
                    <Route path="/signin"
                        element={< Sign_In />} />
                    <Route path="/client"
                        element={< Our_Client />} />
                    <Route path="manager"
                        element={< My_Manager />} />

                    <Route path = "/Log_Out"
                                element = { < Log_Out />}/> 
                  

                    <Route path="manager/profits"
                        element={< Manager_Profits />} />
                    <Route path="manager/addProduct"
                        element={< Manager_Add_Product />} />
                        <Route path="manager/addCategory"
                        element={< Manager_Add_Category />} />
                    <Route path="manager/orderingList"
                        element={< Manager_Orderding_List />} />
                    <Route path="manager/itemsToOrder"
                        element={< Manager_Items_To_Order />} />
                    <Route path="manager/allUsers"
                        element={< Manager_AllUsers />} />
                    < Route path="manager/productlist"
                        element={< Manager_Product_List />} />
                    <Route path="manager/currentProduct"
                        element={< Manager_Update_Product />} />

                  
                    <Route path="client/currentProduct/:id"
                        element={< Client_Current_Product />} />

                    <Route path="client/shopingCart"
                        element={< Client_Shoping_Cart />} />

                    <Route path="client/finalBill"
                        element={< Client_Final_Bill />} />
                </Routes>
            </BrowserRouter>
        </div >
       


    );
}

export default App;