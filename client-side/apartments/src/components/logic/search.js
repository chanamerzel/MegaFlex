export default function search(name = null, startPrice = null, endPrice = null, productsList) {
    let returnSortedList = []
    let listSortByName = []
    let listSortByPrice = []
    startPrice = startPrice == null ? null : parseInt(startPrice)
    endPrice = endPrice == null ? null : parseInt(endPrice)

    if (name == null && startPrice == null && endPrice == null) {
        return productsList
    }
    if (name != null) {
        listSortByName = searchByName(name, productsList)
    }
    if (startPrice != null || endPrice != null) {
        listSortByPrice = searchByPrice(startPrice, endPrice, productsList)
    }
    if (name != null && (startPrice != null || endPrice != null)) {
        returnSortedList = combineTwoLists(listSortByName, listSortByPrice)
    } else {
        if (name == null) {
            returnSortedList = listSortByPrice
        } else {
            returnSortedList = listSortByName
        }
        return returnSortedList
    }
    console.log("returnSortedList: " + String(returnSortedList))
    return (returnSortedList)
}


function searchByPrice(startPrice, endPrice, productsList) {
    let returnListByPrice = []
    if (startPrice == null) {
        startPrice = 0
    }
    if (endPrice == null) {
        endPrice = Number.MAX_VALUE
    }
    productsList.forEach(product => {
        if (product.Price >= startPrice && product.Price <= endPrice) {
            returnListByPrice.push(product)
        }
    });

    return returnListByPrice
}

function searchByName(name, productsList) {
    let returnListByName = []
    productsList.forEach(product => {
        if (product.ItemName == name) {
            returnListByName.push(product)
        }
    });
    return returnListByName
}

function combineTwoLists(list1, list2) {
    let returnList = []
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            if (list1[i] === list2[j]) {
                returnList.push(list1[i])
            }
        }
    }
    return returnList
}

function combineThreeLists(list1, list2, list3) {
    let returnList = []
    list1.forEach(list1element => {
        if ((list1element in list2) && (list1element in list3)) {
            returnList.push(list1element)
        }
    });
    return returnList
}

function check(name) {
    return name
}