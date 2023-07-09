
// Array to store the books and information and display to the home page    

// you can add array to store more books with its properties and image source in img key
const booksInfo = [{
    id: 1,
    img: "images/Book 1.jpg",
    ISBN: 35353531,
    Title: "name1",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 2,
    img: "images/Book 2.jpg",
    ISBN: 35353532,
    Title: "name2",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"

}, {
    id: 3,
    img: "images/Book 3.jpg",
    ISBN: 35353533,
    Title: "name3",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"

}, {
    id: 4,
    img: "images/Book 4.jpg",
    ISBN: 35353534,
    Title: "name4",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 5,
    img: "images/Book 5.jpg",
    ISBN: 35353535,
    Title: "name5",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 6,
    img: "images/Book 6.jpg",
    ISBN: 353535356,
    Title: "name6",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 7,
    img: "images/Book 7.jpg",
    ISBN: 35353537,
    Title: "name7",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 8,
    img: "images/Book 8.jpg",
    ISBN: 35353538,
    Title: "name8",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 9,
    img: "images/Book 9.jpg",
    ISBN: 35353539,
    Title: "name9",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 10,
    img: "images/Book 10.jpg",
    ISBN: 353535310,
    Title: "name10",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 11,
    img: "images/Book 11.jpg",
    ISBN: 353535311,
    Title: "name11",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}, {
    id: 12,
    img: "images/Book 12.jpg",
    ISBN: 35353512,
    Title: "name12",
    Authors: "Author",
    Price: 500,
    Description: "Lorem ipsum .",
    Category: "fiction"
}
    // you can add moreeeeeeeeeeeeeeeeee
]




//  selecting the div of id books where we have to store books items

//for new render function
// let bookel = document.querySelector("#books");
let bookel
if (document.querySelector("#books")) {
    bookel = document.querySelector("#books");
}
// const cartItemsEl = document.querySelector(".cart-items");
let cartItemsEl
let itemUnitEl 
let totalitemsEl
let totalAmountEl
if (document.querySelector(".cart-items")) {
    cartItemsEl = document.querySelector(".cart-items");
    itemUnitEl = document.querySelector(".number");
    totalitemsEl = document.querySelector(".subtotalCount");
    totalAmountEl = document.querySelector(".totalAmount");
}

//for old render function
// let bookname = document.getElementById('books')


// function to append each books inside the div of id books


bookrender = () => {
    booksInfo.forEach((book) => {

        //creating a div for each books and for appending inside div of id books
        // when i'm on cart.html the error is that bookel is null
        bookel.innerHTML += `  
    <div class="col-4">
    <img src="${book.img}">
    
    <p> ISBN:${book.ISBN} </p>
    <p> Title:${book.Title} </p>
    <p> Authors:${book.Authors} </p>
    <p> Price:${book.Price} </p>
    <p> Description:${book.Description} </p>
    <p> Category:${book.Category} </p>
    <div>
    <button class="add-to-cart" onclick="addtocart(${book.id})">Add To Cart</button>
    </div>
    </div>

`
    })
}


//calling function to render the books 

if (!document.querySelector("#cart")) {
    bookrender();
}
// bookrender();


//cart array
let cart = [];
let idarray = []; // for storing the id ;

//add to cart function 
addtocart = (id) => {
    let getid = [];  // initializing the getid as an array that will take the array from localstorage

    if (localStorage.getItem('id')) { // only parse the json if there is any item in the local storage of id
        getid = JSON.parse(localStorage.getItem('id')) // parse the localstorage id so that we can achieve the data in the form of array
    }
    idarray = getid  // assigning getid to idarray so that later we can add or combine the array items for page reload so that previous items also can be added to the new array of id
    const existid = getid.some((item) => item === id)  //it returns the id from localstorage id if any id matches to the current id clicked by user
    if (existid) {
        alert("product already exist in cart")
    }
    else {
        const item = booksInfo.find((book) => book.id === id);
        cart.push({
            ...item,
            numberOfUnits: 1,
        });

        // now storing cart items in local storage in array of object form
        localStorage.setItem("cart", JSON.stringify(cart))
        let previousItemCount = localStorage.getItem('itemCount');
        previousItemCount = parseInt(previousItemCount)
        if (previousItemCount) {
            localStorage.setItem('itemCount', previousItemCount + 1);
            document.querySelector('.cart-count').innerHTML = previousItemCount + 1;  
        }
        else {
            localStorage.setItem('itemCount', 1);
            document.querySelector('.cart-count').innerHTML = 1;
        }
        idarray.push(id)
        localStorage.setItem('id', JSON.stringify(idarray));
    }
    updateCart();
}


const onLoadCartCount = () => {

    let previousItemCount = localStorage.getItem('itemCount');
    previousItemCount = parseInt(previousItemCount)

    if (previousItemCount) {
        document.querySelector('.cart-count').innerHTML = previousItemCount;
    }
    else {
        console.log('nothing was there')
    }
}
//calling the function that initiates the value of cart-count from local storage on page load
onLoadCartCount();
//cart update function
updateCart = () => {
    renderCartItems();
    updateSubtotal();
}
//getting cart items from local storage
const cartItemFromLocalstorage = () => {
    cart = localStorage.getItem("cart")
    if (cart) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    else {
        cart = [];
    }
    return cart
}
// render cart items on adding items to cart
renderCartItems = () => {
    cartItemsEl.innerHTML="";
    const getid = localStorage.getItem('id')
    let item = cartItemFromLocalstorage();
   
    item.forEach((item) => { 
        cartItemsEl.innerHTML += `  
        <div class="cart-item">
        <div class="item-info">
            <img src="../${item.img}">
            <h4>${item.Title}</h4>
            <button class="remove" onclick="removeItem(${item.id})">Remove</button>
        </div>
        <div class="unit-price">
            <small>$</small>${item.Price}
        </div>
        <div class="units">
            <div class="btn minus" onclick="decrement(${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick="increment(${item.id})">+</div>
        </div>
    </div>
    `;
    })
}

function decrement(id){
    const item = booksInfo.find((book) => book.id === id);
        let cartitems =cartItemFromLocalstorage()
    let matchingitem = cartitems.find((item)=>item.id===id)
    if(matchingitem.numberOfUnits<=1){
        matchingitem.numberOfUnits = 1;
    }
    else{
        matchingitem.numberOfUnits -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(cartitems))
    renderCartItems();
    updateCart();
}
function increment(id){
    const item = booksInfo.find((book) => book.id === id);
        let cartitems =cartItemFromLocalstorage()
    let matchingitem = cartitems.find((item)=>item.id===id)
        matchingitem.numberOfUnits += 1;
    localStorage.setItem("cart", JSON.stringify(cartitems))
    renderCartItems();
    updateCart();
}


function updateSubtotal(){
    let cartitems = cartItemFromLocalstorage()
    let totalitems=0;
    let totalAmount=0;
    cartitems.forEach((item)=>{
        totalitems += item.numberOfUnits;
        totalAmount += item.numberOfUnits*item.Price;
    })

 
    totalitemsEl.innerHTML = totalitems;
    totalAmountEl.innerHTML = totalAmount;

}

function removeItem(id){

    // decrementing the cart item
    let items  = cartItemFromLocalstorage();
    for (var i =0; i< items.length; i++) {
        var item = items[i];
        if (item.id === id) {
           
            items.splice(i, 1);
          
            localStorage.setItem("cart", JSON.stringify(items))


            //decrementing the itemcount
            let previousItemCount = localStorage.getItem('itemCount');
        previousItemCount = parseInt(previousItemCount)
        previousItemCount -= 1;
        localStorage.setItem('itemCount', previousItemCount );
        document.querySelector('.cart-count').innerHTML = previousItemCount ;

        //decrementing the id in localstorage
        getid = JSON.parse(localStorage.getItem('id'))
        for (var i =0; i< getid.length; i++) {
            var idold = getid[i];
            if (idold=== id) {
                getid.splice(i,1);
                localStorage.setItem('id', JSON.stringify(getid));

            }
        }
            renderCartItems();
            updateCart();
        }
    }
}








if (!document.querySelector("#home")) {
    renderCartItems();
    updateCart();
}

const jpt = cartItemFromLocalstorage()









