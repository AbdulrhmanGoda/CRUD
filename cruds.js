// set data
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let tbody = document.getElementById("tbody");
let deleteAll = document.querySelector("#deleteAll");
let mood = "create";
let searchMood = "title";
let temp;

// get total
function getTotal(){
    if(price.value != ""){
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = "rgb(0, 175, 0)"
    }else{
        total.innerHTML = "";
        total.style.background = "#85027a"
    }
}
// creat product
let dataPro;
if(localStorage.Product != ""){
    dataPro = JSON.parse(localStorage.Product);
}else{
    dataPro = [];
}
submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(mood == "create"){
        if(newPro.count > 1){
            for(let j=0; j<newPro.count; j++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[temp] = newPro;
        mood = "create";
        submit.innerHTML = "Create";
        count.style.display = "block";
    }
    // save localstorage
    localStorage.setItem("Product", JSON.stringify(dataPro));
    clearInput();
    showDate();
}
// clear inputs
function clearInput(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "0";
    count.value = "";
    category.value = "";
    total.style.background = "#85027a"
}
// read
function showDate(){
    let table = '';
    for(let i=0; i<dataPro.length; i++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updatePro(${i})" id="update">Update</button></td>
            <td><button onclick="deleteOnePro(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    tbody.innerHTML = table;
    if(dataPro.length > 0){
        deleteAll.innerHTML = `
            <button onclick="deleteAllPros()">Delete All (${dataPro.length})</button>
        `
    }else{
        deleteAll.innerHTML = "";
    }
}
showDate();
// count

// delete
function deleteOnePro(j){
    dataPro.splice(j,1);
    localStorage.Product = JSON.stringify(dataPro);
    showDate();
}
function deleteAllPros(){
    dataPro.splice(0);
    localStorage.Product = JSON.stringify(dataPro);
    showDate();
}
// update
function updatePro(k){
    title.value = dataPro[k].title.toLowerCase();
    price.value = dataPro[k].price;
    taxes.value = dataPro[k].taxes;
    ads.value = dataPro[k].ads;
    discount.value = dataPro[k].discount;
    category.value = dataPro[k].category.toLowerCase();
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "Update";
    mood = "update";
    temp = k;
    scroll({
        top:0,
        behavior:'smooth'
    })
}
// search
function getSearchMood(id){
    if(id == "searchTitle"){
        searchMood = "title";
        search.placeholder = "Search By Title";
    }else{
        searchMood = "category";
        search.placeholder = "Search By Categorty";
    }
    search.focus();
    search.value = "";
    showDate();
}
function searchData(val){
    let table = '';
    if(searchMood == "title"){
        for(let i=0; i<dataPro.length; i++){
            if(dataPro[i].title.includes(val.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updatePro(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteOnePro(${i})" id="delete">Delete</button></td>
                </tr>
                `;
            }
        }
    }else{
        for(let i=0; i<dataPro.length; i++){
            if(dataPro[i].category.includes(val.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updatePro(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteOnePro(${i})" id="delete">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    tbody.innerHTML = table;
}
// clean data

// theme
let optionI = document.querySelector(".option i");
let showOption = document.querySelector(".option");
let themes = document.querySelector(".toggler");
optionI.addEventListener(("click"), () => {
    showOption.classList.toggle("optionActive")
})
if(window.localStorage.getItem("body-class-dark-theme")){
    themes.classList.add("activetheme");
    document.body.classList.add(window.localStorage.getItem("body-class-dark-theme"));
}
themes.addEventListener("click", () => {
    themes.classList.toggle("activetheme");
    if(themes.classList.contains("activetheme")){
        document.body.classList.add("activebody");
        window.localStorage.setItem("body-class-dark-theme" , "activebody");
    }else{
        document.body.classList.remove("activebody");
        window.localStorage.setItem("body-class-dark-theme" , "");
    }
});