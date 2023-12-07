var productName = document.querySelector("#productName");
var productPrice = document.querySelector("#productPrice");
var productCategory = document.querySelector("#productCategory");
var productDesc = document.querySelector("#productDesc");
var addProduct = document.querySelector("#addProduct");
var editProduct = document.querySelector("#editProduct");
var container = document.querySelector(".products-tbody");
var search = document.querySelector("#search");
var selectexIndex = 0;
var products = [];
var searchingValue = "";

// document.addEventListener("DOMContentLoaded", ()=>{
//     addProduct.ariaDisabled = true;
// })

addProduct.addEventListener('click',(e)=>{
    if(validate()){
        products.push({name:productName.value, price:productPrice.value, category:productCategory.value, description:productDesc.value});  
        resetForm();  
        display(products);
    }
});

search.addEventListener('keydown', (e)=>{
    // console.log(e.key.length)
    // console.log(e.key)
    if(e.key.length == 1){
        searchingValue = searchingValue+e.key;
    }else if(e.key == "Backspace"){
        searchingValue = searchingValue.slice(0,-1);
    }
    var newList = products.filter((m)=>{
        return m.name.includes(searchingValue);
    });
    display(newList);
})

function display(list){
    container.innerHTML = "";
    list.forEach((e,i)=>{
        var temp = "";
        temp = `
        <tr>
            <th scope="row">${i}</th>
            <td>${e.name}</td>
            <td>${e.price}</td>
            <td>${e.category}</td>
            <td>${e.description}</td>
            <td class="icons">
                <i class="fa-solid fa-pen-to-square" id="update" onclick="updateProduct(${i})"></i>
                <i class="fa-solid fa-trash" id="delete" onclick="deleteProduct(${i})"></i>
            </td>
            </tr>
        `;
        container.innerHTML += temp;
    });
}

function validate(){
    if(productName.value == ""){
        resetColors();
        productName.style.border = "1px solid red";
        return false;
    }else if(productPrice.value == ""){
        resetColors();
        productPrice.style.border = "1px solid red";
        return false;

    }else if(productCategory.value == ""){
        resetColors();
        productCategory.style.border = "1px solid red";
        return false;

    }else if(productDesc.value == ""){
        resetColors();
        productDesc.style.border = "1px solid red";
        return false;

    }else{
        resetColors();
        return true;
    }

    function resetColors(){
        productName.style.border = "1px solid lightgray";
        productPrice.style.border = "1px solid lightgray";
        productCategory.style.border = "1px solid lightgray";
        productDesc.style.border = "1px solid lightgray";
    }
}

function resetForm(){
    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
    productDesc.value = "";
}

function deleteProduct(index){
    var deleted = products.slice(index,index+1);
    products = products.filter((e)=>{
        return e != deleted[0];
    });
    display(products);
}

// update_icon
function updateProduct(index){
    selectexIndex = index;
    console.log(selectexIndex);
    addProduct.style.display = "none";
    editProduct.style.display = "block"
    productName.value = products[index].name;
    productCategory.value = products[index].category;
    productPrice.value = products[index].price;
    productDesc.value = products[index].description;
}

// update_btn
editProduct.addEventListener('click', ()=>{
    addProduct.style.display = "block";
    editProduct.style.display = "none";

    products[selectexIndex].name = productName.value;
    products[selectexIndex].category = productCategory.value;
    products[selectexIndex].price = productPrice.value;
    products[selectexIndex].description = productDesc.value;

    display(products)
    resetForm()
});