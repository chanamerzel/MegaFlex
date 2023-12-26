import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom"
import '../App.css';
import image from "../img/menue.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '../img/black_vi.jpg';
import SignOut from './Log_Out'
// import check from './logic/search'

export default function Nav(props) {
  const [array, setarray] = useState([]);
  const LASTARRAY = 1;
  const [wind, setWind] = useState(true);
  const [img, setImg] = useState();
  useEffect(() => {
    setWind(wind)
    let imag;
    if (imag) {
      imag = imag
    } else {
      imag = false
      setImg(imag)
    }
    if (array.length < LASTARRAY) {
      array.push(["/manager/productlist", "productlist", "http://localhost:3678/shoicon.webp"],
        ["/manager/addProduct", "addProduct", "http://localhost:3678/add.png"],
        ["/manager/orderingList", "orderingList ", "http://localhost:3678/planner (1).png"],
        ["/manager/profits", "profits", "http://localhost:3678/money-growth.png"],
        ["/manager/addCategory", "addCategory", "http://localhost:3678/add-folder (1).png"],
        ["/manager/allUsers", "allUsers", "http://localhost:3678/user.png"])
    }
  }, []);
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
    <nav className="navbar-menu" style={{ width: wind === false && img === false ? 213 : 80, position: "fixed" }}>
      <span id="s" onClick={() => openClose()} style={{ justifyContent: "normal" }}>&#9776;</span>
      <ul className="navbar__list">
      {/* <p style={{background:"green"}}>{check("shani")}</p> */}

        {array.map((item, i) => (
          <div className="navbar__li-box" key={i} style={{ display: "flex", marginLeft: "-30px" }}>
            <Link onClick={() => img = true} to={`${item[0]}`}>
              <img className="img_hovering" src={item[2]} style={{ display: wind === true ? "inline-block" : "none", paddingLeft: wind === false ? 27 : 17, width: "53px" }} />
            </Link>
            <Link style={{ display: wind === false ? "inline-block" : "none", paddingTop: "0px" }} className={window.location.pathname === item[0] ? "last-cld navbar__li" : "Nav-link navbar__li"} to={`${item[0]}`}>{item[1]} </Link>
          </div>
        ))}


        <div className=" navbar__li-box" style={{ display: "flex", marginLeft: "-22px" }}>
          <Link onClick={() => img = true} to="/manager/itemsToOrder">
            <img className="img_hovering" src="http://localhost:3678/box5.png" style={{ display: wind === true ? "inline-block" : "none", paddingLeft: wind === false ? 27 : 3, width: "43px" }} />
          </Link>
          <Link style={{ display: wind === false ? "inline-block " : "none", paddingTop: "0px", marginLeft: "-2px" }} className={window.location.pathname === "/manager/itemsToOrder" ? "last-cld navbar__li" : "Nav-link navbar__li"} to="/manager/itemsToOrder">itemsToOrder </Link>
        </div>
        <div className="navbar__li-box" style={{ display: "flex", marginLeft: "-34px" }}>
          <Link onClick={() => img = true} to="/">
            <img className="img_hovering" src="http://localhost:3678/logout (1).png" style={{ display: wind === true ? "inline-block" : "none", paddingLeft: wind === false ? 27 : 17, width: "53px" }} />
          </Link>
          <Link style={{ display: wind === false ? "inline-block" : "none", paddingTop: "0px" }} className="Nav-link navbar__li" to={`/`}>Sign Out </Link>
        </div>
      </ul>
    </nav>
  );
};

