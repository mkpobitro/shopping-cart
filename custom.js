//getting elements
const userInfoBtn = document.getElementById("user-info-btn");
const incrementQuantityBtnList = document.querySelectorAll(".increment-quantity-btn");
const decrementQuantityBtnList = document.querySelectorAll(".decrement-quantity-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const finishOrderBtn = document.getElementById("finish-order-btn");
const userInfo = document.getElementById("user-info");
const cart = document.getElementById("cart");
const invoice = document.getElementById("invoice");

// get all single product price
var prices = [];
var p = document.querySelectorAll(".price");
for(var i=0; i<p.length; i++) prices.push(parseInt(p[i].innerText));


// adding event listeners to html elements

userInfoBtn.addEventListener("click", ()=>{
    
    userInfo.style.display = "none";
    cart.style.display  = "block";
})

//set all the values according to quantity change
function quantityIncrementOrDecrement(serial, type){

    const quantityElement = document.querySelectorAll(".quantity")[serial];
    const priceElement = document.querySelectorAll(".price")[serial];
    const singlePrice = prices[serial];
    const subTotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    var quantityValue = parseInt(quantityElement.value);
    var priceValue = parseFloat(priceElement.innerText);
    var subTotalValue = parseFloat(subTotalElement.innerText.replace(",",""));
    var taxValue = parseFloat(taxElement.innerText);
    var totalValue = parseFloat(totalElement.innerText);
    

    if(type === "inc") 
    {
        quantityValue++;
        priceValue += singlePrice;
        subTotalValue += singlePrice;
        taxValue = Math.round(subTotalValue * 0.10);
    }
    else if( quantityValue > 1){
        quantityValue--; 
        priceValue -= singlePrice;
        subTotalValue -= singlePrice;
        taxValue = Math.round(subTotalValue * 0.10);
    }
    
    totalValue = subTotalValue + taxValue;

    quantityElement.value = quantityValue;
    priceElement.innerText = priceValue;
    subTotalElement.innerText = [subTotalValue.toString().slice(0,1), ",", subTotalValue.toString().slice(1)].join("");
    taxElement.innerText = taxValue;
    totalElement.innerText = [totalValue.toString().slice(0,1), ",", totalValue.toString().slice(1)].join("");
    
}


// increment product quantity

incrementQuantityBtnList[0].addEventListener("click", ()=>{
    quantityIncrementOrDecrement(0, "inc");
    
});

incrementQuantityBtnList[1].addEventListener("click", ()=>{
    
    quantityIncrementOrDecrement(1, "inc");
    
});


//decrement product quantity.

decrementQuantityBtnList[0].addEventListener("click", ()=>{
    quantityIncrementOrDecrement(0, "dec");

});

decrementQuantityBtnList[1].addEventListener("click", ()=>{
    quantityIncrementOrDecrement(1, "dec");
});

//checkout btn click

checkoutBtn.addEventListener("click", ()=>{
    
    prepareInvoice();

    userInfo.style.display = "none";
    cart.style.display = "none";
    invoice.style.display = "block";
    
})

//prepare invoice

function generateInvoice(){
    const invoiceNo = document.getElementById("invoiceNo");
    invoiceNo.innerText = parseInt(Math.random()*10000);
}

function prepareInvoice(){

    generateInvoice();

    const userName = document.getElementById("user-name");
    const userAddress = document.getElementById("user-address");
    const invoiceUser = document.getElementById("invoice-user");
    const invoiceUserAddress = document.getElementById("invoice-user-address");
    
    const productQuantityList = document.querySelectorAll(".product-quantity");
    const singleProductPriceList = document.querySelectorAll(".single-product-price");
    const totalProductPriceList = document.querySelectorAll(".total-product-price");
    const invoiceSubtotal = document.getElementById("invoice-subtotal");
    const invoiceTax = document.getElementById("invoice-tax");
    const invoiceTotal = document.getElementById("invoice-total");

    const subTotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    invoiceUser.innerText = userName.value;
    invoiceUserAddress.innerText = userAddress.value;

    for(var i=0; i < productQuantityList.length; i++){
        productQuantityList[i].innerText = document.querySelectorAll(".quantity")[i].value;
        singleProductPriceList[i].innerText = prices[i];
        totalProductPriceList[i].innerText = document.querySelectorAll(".price")[i].innerText;
    }

    invoiceSubtotal.innerText = subTotalElement.innerText.replace(",","");
    invoiceTax.innerText = taxElement.innerText;
    invoiceTotal.innerText = totalElement.innerText;
    
}

//finish order btn press
finishOrderBtn.addEventListener("click", ()=>{
    alert("Order placed successfully!");
    location.reload();
})





