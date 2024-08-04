import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, Outlet } from "react-router-dom"
import '../App.css';
// import image from "../img/menue.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
// import { FontAwesomeIcon } from '../img/black_vi.jpg';
// import SignOut from './Log_Out'
// import check from './logic/search'

export default function Shoe_Size_Table(props) {
    const [code, setCode] = useState(props.code ? props.code : "")
    const [shoes, set_Shoes] = useState([])
    const [total, set_Total] = useState(0)
    const [hidden, set_Hidden] = useState("hidden")
    const [amountValue, set_AmountValue] = useState("")
    const [sizeValue, set_SizeValue] = useState("")
    const [amountValueList, set_AmountValueList] = useState([])
    const [disabled, set_Disabled] = useState(true)
    const [backgroundColor, set_BackgroundColor] = useState(true)

    let navigate = useNavigate();
    async function get_shoe_sizes() {
        let shoeSizesArray = await fetch(`http://localhost:3678/quantityofsize/get/${code}`, {
            method: 'GET',
        });
        shoeSizesArray = await shoeSizesArray.json();
        shoeSizesArray.sort((a, b) => a.ShoeSize - b.ShoeSize);
        set_AmountValueList(shoeSizesArray.flatMap((e) => e.Quantity))
        return shoeSizesArray
    }
    async function setTotal() {
        let update_Product_Quantity = await fetch(`http://localhost:3678/products/Update_Quantity`, {
            method: 'Put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        update_Product_Quantity = await update_Product_Quantity.json();
    }
    async function setShoes() {
        let shoe_sizes = await get_shoe_sizes()
        set_Shoes(shoe_sizes)
        setTotal()
        let sum = 0;
        shoe_sizes.map((shoe) => {
            sum += shoe.Quantity
        })
        set_Total(sum)

    }
    useEffect(() => {

        return async () => {

            setShoes()
        }
    }, []);
    async function addToShoeList(e, size, amount) {
        e.preventDefault();
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
                        message = "Size exists. please change shoe size quantity at the table.";
                        break
                    }
                }
                break;
        }
        if (message == '') {
            let req={
               "body": [{ShoeSize: size,Quantity: amount }],
               "codeItem":code
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
            // navigate(`/manager/currentProduct/${code}`, { state: { currentProduct: props.state.currentProduct, categories: props.state.categories } });
            setShoes()
        }
        else {
            alert(message)
        }
    }

    async function deleteSize(shoe) {
        let getByItemAndSize = await fetch(`http://localhost:3678/cart/getByItemAndSize/${shoe.ItemCode}/${shoe.ShoeSize}`, {
            method: 'Get',
        });
        getByItemAndSize = await getByItemAndSize.json();
        if (getByItemAndSize.length > 0) {
            alert('This item is still ordered and can not be deleted before all products of this sort are sent to client.')
        }
        else {
            if (window.confirm('Are you sure you want to delete this item?') == true) {
                let deleteSize = await fetch(`http://localhost:3678/quantityofsize/delete/${shoe.ItemCode}/${shoe.ShoeSize}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                deleteSize = await deleteSize.json();
                let update_Product_Quantity = await fetch(`http://localhost:3678/products/Update_Quantity`, {
                    method: 'Put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                update_Product_Quantity = await update_Product_Quantity.json();
                setShoes()

            }
        }

    }

    function changeAmountValueInList(val, i) {
        let currentAmountValueList = amountValueList
        currentAmountValueList[i] = val
        set_AmountValueList(currentAmountValueList);
        set_Disabled(false)
    }
    async function submitChanges() {
        let changesList = []
        for (let index = 0; index < shoes.length; index++) {
            if (shoes[index].Quantity != amountValueList[index]) {
                if (amountValueList[index] >= 0 && amountValueList[index] != '') {
                    let item = shoes[index]
                    item.Quantity = amountValueList[index]
                    changesList.push(item)
                    // alert("changes submitted successfully.")

                }
                else {
                    let amountList = amountValueList
                    amountList[index] = shoes[index].Quantity
                    set_AmountValueList(amountList)
                    alert("amount not valid.")
                    window.location.reload()

                }

            }
        }
        if (changesList.length > 0) {
            let update_Quantity = await fetch(`http://localhost:3678/quantityofsize/Update_Quantity`, {
                method: 'Put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(changesList)
            });
            update_Quantity = await update_Quantity.json();
            setShoes()
            alert("submitted successfully")
        }
        set_Disabled(true)
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
                {shoes.map((shoe, i) =>
                (
                    <tr key={shoe}>

                        <td>{shoe.ShoeSize}</td>
                        <td value={amountValueList[i]} onInput={(e) => changeAmountValueInList(e.target.innerText, i)} contentEditable={true}>{shoe.Quantity}</td>
                        <button className="but2 table_btn" onClick={(e) => {
                            e.preventDefault();deleteSize(shoe)
                        }}>delete</button>
                    </tr>
                )
                )}


                <tr>
                    <th className="th">total:</th>
                    <td>{total}</td>
                </tr>

            </table>

            {hidden !== "hidden" && <div className="add_form" >
                <input type="number" min="0" max="90" value={sizeValue} onChange={(e) => set_SizeValue(e.target.value)} className="newtr" placeholder="Size"></input>
                <input type="number" className="newtr" min={0} max="" value={amountValue} onChange={(e) => set_AmountValue(e.target.value)} placeholder="Amount"></input>
                <br></br>
                <div className="table_btn">
                    <button className="but2 submit_cancel" onClick={(e) => addToShoeList(e, sizeValue, amountValue)}>Submit</button>
                    <button className="but2 submit_cancel Cancel_btn" onClick={() => set_Hidden("hidden")}>Cancel</button>
                </div>
            </div >}

            <br></br>
            {
                hidden === "hidden" && <button className="but2 table_btn" style={{ hidden: true, width: "35%" }} onClick={() => set_Hidden("visible")}>add size</button>
            }
            <br></br>

            <button disabled={disabled} className="but2 table_btn submitChanges_btn" style={{width: "35%" }} onClick={(e) => { e.preventDefault(); submitChanges() }}>Submit quantity changes</button>

        </div >)
};

