export default async function get_sortedProducts(name) { //returns the list of all the categories available in the shop
    let allCatItems = []
    if (name != 0) {
        let catItems = await fetch(`http://localhost:3678/products/category/${name}`, {
            method: 'GET'
        });
        allCatItems = await catItems.json();
    } else {
        let catItems = await fetch(`http://localhost:3678/products/`, {
            method: 'GET'
        });
        allCatItems = await catItems.json();
    }

    return (allCatItems)

}