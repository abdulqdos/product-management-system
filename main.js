// calling inputs

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteAll = document.getElementById("delete-all");

// console.log(title,price,taxes,ads,discount,total,count,category,submit) For Confirem

// Set Mood

let mood = "create";
let tmp ;
// Get Total

function getTotal () {
    if(price.value != "") {
        let res = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = res ;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

// Create Product
let dataPro ;
if(localStorage.Product != null) {
    dataPro = JSON.parse(localStorage.Product);
} else {
    dataPro = [] ;
}



submit.onclick = function () {
    // Create Object For A data
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // Save Data

    // Create Data
    if(mood === "create") {
        if(newPro.title !== "" && newPro.category !== "") {
            if(newPro.count > 1 && newPro.count < 100) {
                for( let i = 0 ; i < newPro.count ; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        }
    } else {
        dataPro[tmp] = newPro ;
        mood = "create" ;
        submit.innerHTML = "Create";
        count.style.display = 'block';
    }
    localStorage.setItem("Product",JSON.stringify(dataPro));
    clearData();
    showData();
}

// Clear Inputs

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
// Read Poduct

function showData() {
    getTotal();
    let table = "" ;
    // Create Element To The Table
    for(let i = 0 ; i < dataPro.length ; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = table ;
    // If For Delete All
    if(dataPro.length > 0) {
        deleteAll.innerHTML = `<button class = "Delete-All" onclick="DeleteAll()">Delete All</button>`;
    } else {
        deleteAll.innerHTML = ` `;
    }
}

showData();

// Delete

function deleteData(i) {
    // console.log(i);
    dataPro.splice(i,1);
    localStorage.Product = JSON.stringify(dataPro);
    showData();
}

// Delete All

function DeleteAll () {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// Count

/*
    - This Function Is If Statment Inside The Datashow Function
*/

// Update

function update(i) {
    // console.log(i) ; For Test
    title.value = dataPro[i].title ;
    price.value = dataPro[i].price ;
    taxes.value = dataPro[i].taxes ;
    ads.value = dataPro[i].ads ;
    discount.value = dataPro[i].discount ;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = "Update";
    category.value = dataPro[i].category ;
    mood = "update";
    tmp = i ;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

// Search

let searchMood = 'Title' ;

function getSearchMood(id) {
    let search = document.getElementById("search") ;
    if(id === "search-title") {
        searchMood = "Title" ;
    } else {
        searchMood = "Category" ;
    }
    search.placeholder = "Search By " + searchMood ;
    search.focus() ;
    search.value = "" ;
    showData();
}

function search(value) {
    // console.log(value);
    let table = '' ;
    if(searchMood === 'Title') {
        for(let i = 0 ; i < dataPro.length ; i++) {
            if(dataPro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>` ;
            }
        }
    } else {
        for(let i = 0 ; i < dataPro.length ; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>` ;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table ;
}
// console.log(searchMood) ; Just For Test

// Clean Data
