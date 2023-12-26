export default async function orders_requests(name, values = null) { //returns the list of all the categories available in the shop
    let response = [];
    switch (name) {
        case "exists":
            response = check_order_existence(values)
            break;
        case "setOrder":
            response = setOrder(values)
            break;
        case "updateOrdered/1":
            response = updateOrdered_1(values)
            break;
        case "updateOrdered/price":
            response = updateOrdered_Price(values)
            break;
        case "add":
            response = add(values)
            break;

        default:
            break;
    }
    return response
}
async function check_order_existence(values) {
    console.log(values)
    let ord = await fetch(`http://localhost:3678/orders/exists`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ CustomerID: values.CustomerID, FirstName: values.FirstName })
    });
    let order = await ord.json();

    return order
}
async function setOrder(values) {
    let setaddress = await fetch(`http://localhost:3678/orders/setOrder`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    setaddress = await setaddress.json();
    return setaddress
}
async function updateOrdered_1(values) {
    let updateStatus = await fetch(`http://localhost:3678/orders/updateOrdered/1`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    updateStatus = await updateStatus.json();
    return updateStatus
}
async function updateOrdered_Price(values) {
    let updatePrice = await fetch(`http://localhost:3678/orders/updateOrdered/price`, {
        method: 'Put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    updatePrice = await updatePrice.json();
    return updatePrice
}
async function add(values) {
    let orderCode = await fetch(`http://localhost:3678/orders/add`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    orderCode = await orderCode.json();
    return orderCode
}