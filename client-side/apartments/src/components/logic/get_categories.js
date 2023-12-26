export default async function get_categories() { //returns the list of all the categories available in the shop
    let cat = await fetch(`http://localhost:3678/products/allcategories`, {
        method: 'GET'
    });
    let allCategories = await cat.json();
    let all = {
        CategoryCode: 0,
        CategoryName: "all"
    }
    allCategories.unshift(all) //adds the option of getting all products as a category to allCategories
    console.log(allCategories)
    return (allCategories)

}