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
        if (event.key === 'Enter' && event.target.value != '') {
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
    <h1 className='title2'>all store users</h1>
    <h1 className='title3'>search client</h1>
    <input list='users' name='user' id='input' placeholder='הקלד אימייל לחיפוש לקוח' onKeyDown={findUser} />
    <datalist id='users'>
        {users.map(user => {
            return (
                <option key={user.CustomerID}>
                    {user.CustomerID}
                </option>
            )
        })}
    </datalist>
    <p className="title3">{foundUser.FirstName}</p>
    <p className="title3">{foundUser.CustomerID}</p>
    <br></br>{users.map((user) =>
        (<div className="box" key={user.CustomerID}>
            <p className='title3'>{user.FirstName}</p>
            <p className='title3'>user email:</p> <p className='title3'>{user.CustomerID}</p><br></br><br></br>
        </div>)
    )}
</div>);
}