import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Manager_Product_List from "./Manager_Product_List";
import Manager_Add_Product from "./Manager_Add_Product";
import Manager_Orderding_List from "./Manager_Orderding_List";
import Manager_Profits from "./Manager_Profits";
import { Link, Outlet } from "react-router-dom"
import '../App.css';
import image from "../img/menue.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {FontAwesomeIcon} from'../img/black_vi.jpg';
import SignOut from './Log_Out'
export default function Nav(props) {
    const [mystyle, setMystyle] = useState({});
    const [array, setarray] = useState([]);
   const  LASTARRAY=1;
   const [wind, setWind] = useState(false);
   const [img, setImg] = useState();
   
    useEffect(() => {
      setWind(wind)
      let imag;
      if (imag){
        imag=imag
      }else{
        imag=false
        setImg(imag)
      }
        setMystyle({
            // color: "#3aedff",
            fontSize: "20px", marginLeft: "330px",
            marginTop: "70PX"
        });
        // let lastArray=0
        if(array.length<LASTARRAY){
            array.push(["/manager/productlist","productlist","http://localhost:3678/GreenHeels.jpg"],
            ["/manager/addProduct","addProduct","http://localhost:3678/logo.svg"],
            ["/manager/orderingList","orderingList ","http://localhost:3678/white.jpg"],
            ["/manager/profits","profits","http://localhost:3678/.jpg"],
            ["/manager/addCategory","addCategory","http://localhost:3678/.jpg"],
            ["/manager/itemsToOrder","itemsToOrder","http://localhost:3678/.jpg"],
            ["/manager/allUsers","allUsers","http://localhost:3678/.jpg"])
            
        }
    }, []);
//     return (
//     // <div>
//     //     <div className="n">
//     //         <nav id="navs ">
//     //             <Link className={window.location.pathname==="/manager/productlist"?"last-clicked":"App-link" }  to={`/manager/productlist`}>productlist</Link>
//     //             <Link className={window.location.pathname==="/manager/addProduct"?"last-clicked":"App-link" }   to={`/manager/addProduct`}>addProduct</Link>
//     //             <Link className={window.location.pathname==="/manager/orderingList"?"last-clicked":"App-link" } to={`/manager/orderingList`}>orderingList</Link>
//     //             <Link className={window.location.pathname==="/manager/profits"?"last-clicked":"App-link" }      to={`/manager/profits`}>profits</Link>
//     //             <Link className={window.location.pathname==="/manager/addCategory"?"last-clicked":"App-link" }  to={`/manager/addCategory`}>add category</Link>
//     //             <Link className={window.location.pathname==="/manager/itemsToOrder"?"last-clicked":"App-link" } to={`/manager/itemsToOrder`}>items to order</Link>
//     //             <Link className={window.location.pathname==="/manager/allUsers"?"last-clicked":"App-link" }     to={`/manager/allUsers`}>see all users</Link>
//     //             <Link className={window.location.pathname==="/Log_Out"?"last-clicked":"App-link" }              to={`/Log_Out`}>log out</Link>
            
//     //         </nav>
//     //         <Outlet />
//     //     </div>
        
//     // </div>
//     <div>
//     <div className="n">
//         <nav className="navs">
        
//         <img src={image}  />
    
//                 <Link className={window.location.pathname==="/manager/productlist"?"last-clicked":"Nav-link" }  to={`/manager/productlist`}>productlist</Link>
//                 <Link className={window.location.pathname==="/manager/addProduct"?"last-clicked":"Nav-link" }   to={`/manager/addProduct`}>addProduct</Link>
//                 <Link className={window.location.pathname==="/manager/orderingList"?"last-clicked":"Nav-link" } to={`/manager/orderingList`}>orderingList</Link>
//                 <Link className={window.location.pathname==="/manager/profits"?"last-clicked":"Nav-link" }      to={`/manager/profits`}>profits</Link>
//                 <Link className={window.location.pathname==="/manager/addCategory"?"last-clicked":"Nav-link" }  to={`/manager/addCategory`}>add category</Link>
//                 <Link className={window.location.pathname==="/manager/itemsToOrder"?"last-clicked":"Nav-link" } to={`/manager/itemsToOrder`}>items to order</Link>
//                 <Link className={window.location.pathname==="/manager/allUsers"?"last-clicked":"Nav-link" }     to={`/manager/allUsers`}>see all users</Link>
//                 <Link className={window.location.pathname==="/Log_Out"?"last-clicked":"Nav-link" }              to={`/Log_Out`}>log out</Link>
            
//         </nav>
        
//         <Outlet />
//     </div>
    

       
          
// </div>);

  
    let openClose = () => {
      if (wind) {
        setWind(false);
        setImg(false)
      } else {
        setWind(true);
        setImg(true)
      }
      
    };
    return (
      <nav className="navbar-menu" style={{ width: wind === false && img==false ? 213 : 80, position: "fixed" }}>
        {/* <div className="burger" onClick={() => openClose()}>
          <img src="http://localhost:3678/black_border.jpg" style={{height:"50px"}} alt="burger" />
        </div> */}
        <span id="s"onClick={() => openClose()}  style={{ justifyContent:"normal"}}>&#9776;</span>
        {/* <span className="openclose" onClick={() => openClose()}>&#9776;</span> */}
        <ul className="navbar__list">
          {array.map((item, i) => (
            <div className="navbar__li-box" key={i} style={{display: "flex",marginLeft: "-30px"}}>
                <Link   onClick={()=>img=true}  to={`${item[0]}`}>
                  <img src={item[2]} style={{display: wind === true ? "inline-block" : "none", paddingLeft: wind === false ? 27 : 17 , width:"53px"}}/>
                </Link>

              
                {/* marginBottom: "-50px",paddingBottom:"20px",paddingTop:"20px" */}
              {console.log(array.length)}
              {/* <li
                className="navbar__li"
                style={{ display: wind === false ? "inline-block" : "none" }}
              >
                {item[0]}
              </li>  */}
               
                <Link   style={{ display: wind === false ? "inline-block" : "none" ,paddingTop: "0px"}}  className={window.location.pathname===item[0]?"last-cld navbar__li":"Nav-link navbar__li" }  to={`${item[0]}`}>{item[1]} </Link>
                
            </div>
           ))} 
          <div className="navbar__li-box"  style={{display: "flex",marginLeft: "-34px"}}>
        <Link   style={{ display: wind === false ? "inline-block" : "none" ,paddingTop: "0px"}} className="Nav-link navbar__li"   to={`/`}>Sign Out </Link>
        </div>
        </ul> 
       
  
  {/* <div className="icon-bar">
  <FontAwesomeIcon icon="fa-solid fa-house" size="xs" style={{color: "#0a9fb2",}} />
    <a className="active" href="#"><i className="fa fa-home"></i></a> 
    <a href="#"><i className="FontAwesomeIcon"></i></a> 
    <a href="#"><i className="fa fa-envelope"></i></a> 
    <a href="#"><i className="fa fa-globe"></i></a>
    <a href="#"><i className="fa fa-trash"></i></a> 
  </div> */}

      </nav>
    );
  };
  
