import React, { useState, useEffect } from "react";
import Nav from "./Nav"
import '../App.css';
export default function Manager_AllUsers(props) {
    const [users, setUsers] = useState([]);
    const [foundUser, setFoundUser] = useState("");
    useEffect(() => {
        async function getAllUsers() {
            let prod = await fetch("http://localhost:3678/customer/allCustomers", {
                method: 'GET'
            });
            let pro = await prod.json();
            setUsers(pro);
        }
        getAllUsers();
    }, []);
    async function findUser(event) {
        if (event.key === 'Enter' && event.target.value !== '') {
            let flag = true;
            users.map(user => {
                if (user.CustomerID === event.target.value) {
                    setFoundUser(user);
                flag = false
            }
            })
        flag && alert('no user found');
        event.target.value = null;
    }
};
return (<div style={{marginTop: "-20px"}}>
    <Nav />
    <h1 style={{color:'purple'}} className='title2'>all store users</h1>
    <h4 style={{color:'purple'}} >search client: 
    <input style={{color:'purple',marginLeft:'30px'}} list='users' name='user' id='input' placeholder='הקלד אימייל לחיפוש לקוח' onKeyDown={findUser} />
    <datalist id='users'>
        {users.map(user => {
            return (
                <option key={user.CustomerID}>
                    {user.CustomerID}
                </option>
            )
        })}
    </datalist></h4>
{foundUser&& <div className="box" style={{backgroundColor:"rgb(234, 245, 215, 0.694)"}}  key={foundUser.CustomerID}>
            <br/>
            <p style={{color:'green'}} >name:    </p>
            <p style={{color:'rgb(41, 62, 4, 0.694)'}}>{foundUser.FirstName}</p>
            <p style={{color:'green'}}  >user email:</p>
             <p style={{color:'rgb(41, 62, 4, 0.694)'}}>
                {foundUser.CustomerID}</p>
                <br/>
                <div style={{backgroundColor:'white'}}><br ></br></div>
       
        </div>}

    <br></br>{users.map((user) =>
        (<div className="box"  key={user.CustomerID}>
            <br/>
            <p style={{color:'purple'}} >name:    </p>
            <p style={{color:'black'}}>{user.FirstName}</p>
            <p style={{color:'purple'}}  >user email:</p>
             <p >
                {user.CustomerID}</p>
                <br/>
                <div style={{backgroundColor:'white'}}><br ></br></div>
       
        </div>)
    )}
</div>);
}