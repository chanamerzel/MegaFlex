export default async function cart_requests(name, values = null) { //returns the list of all the categories available in the shop
    let response;
    switch (name) {
        case "shopingCart":
            response = shopingCart(values)
            break;
        case "update_items_in_cart":
            response = update_items_in_cart(values)
            break;
        case "deleteitem":
            response = deleteitem(values)
            break;

        default:
            break;
    }
    return response
}
async function shopingCart(values) {
    let carty = await fetch(`http://localhost:3678/cart/shopingCart`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    let cart = await carty.json();
    return cart
}

async function update_items_in_cart(values) {
    let ans = await fetch("http://localhost:3678/cart/update_items_in_cart", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    ans = await ans.json();
    return ans
}

async function deleteitem(values) {
    let prod = await fetch(`http://localhost:3678/cart/deleteitem`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });
    prod = await prod.json();
    return prod
}