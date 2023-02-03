let carts = document.querySelectorAll('.add-cart');

let products = [ 
    {
        name: "Docent zonder haar",
        tag: "docentzonderhaar",
        price: 15,
        inCart: 0
    },
    {
        name: "Docent met haar 1",
        tag: "docentmethaar1",
        price: 20,
        inCart: 0
    },
    {
        name: "Docent met haar 2",
        tag: "docentmethaar2",
        price: 20,
        inCart: 0
    },
    {
        name: "Studiepunten",
        tag: "studiepunten",
        price: 100,
        inCart: 0
    },
	    {
        name: "Minnaert gebouw",
        tag: "minnaertgebouw",
        price: 40000,
        inCart: 0
    },
	    {
        name: "Academie gebouw",
        tag: "academiegebouw",
        price: 60000,
        inCart: 0
    },
	{
        name: "Bachelor diploma",
        tag: "bachelordiploma",
        price: 10000
    },
	{
        name: "Docent met haar 3",
        tag: "docentmethaar3",
        price: 400
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    // declare variables
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    let totalContainer = document.querySelector('.products-total');
    
    // code to display the products on the cart page
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            // display the products with the details
            productContainer.innerHTML += 
            `<!-- Product Image -->
            <div class="product col-lg-3 col-2 mb-4 mb-lg-0 mx-sm-2">
			
				<img src="./assets/images/${item.tag}.jpg" class="px-lg-1 w-100 rounded" /><br><br>
                
            </div>
            <!-- Product Info -->
            <div class="product col-4 mb-4 mb-lg-0 mx-2">
                <span><strong>${item.name}</strong></span>
                <span class="d-none d-sm-block">1 piece = &#8364 ${item.price},00</span><br class="d-none d-sm-block">
                <span class="d-block d-sm-none my-0">1 piece =</span>
                <span class="d-block d-sm-none">&#8364 ${item.price},00</span><br>
                <button type="button" class="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="lg-hide"></div>
            <!-- Product Quantity and Price-->
            <div class="quantity col-lg-5 col-6 mb-4 mb-lg-0">
                
                <button class="btn btn-primary px-3 me-2 decrease">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="mx-2">${item.inCart}</span>
                <button class="btn btn-primary px-3 ms-2 increase">
                    <i class="fas fa-plus"></i>
                </button><br>
                <span class="text-start text-md-center mt-3"><strong>&#8364 ${item.inCart * item.price},00</strong></span>
            </div>`;
        });

        // display the cart total
        totalContainer.innerHTML = '';
        totalContainer.innerHTML += `<p class="basketTotal">&#8364 ${cart},00</p>`;
        
        calcShipping()
        deleteButtons();
        manageQuantity();
        displayFutureDays();
    }
}

function displayPay() {
    // declare variables
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let payContainer = document.querySelector('.pay-page');
    
    // code to display the products on the payment page
    if( cartItems && payContainer ) {
        payContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            payContainer.innerHTML += 
                `<!-- Product Image -->
                <div class="product col-1 mb-4 mb-lg-0 mx-sm-2">
                    <img src="./assets/images/${item.tag}.jpg" class="px-lg-1 w-100 rounded" />
                </div>
                <!-- Product Info -->
                <div class="product col-7 mb-4 mb-lg-0 mx-2">
                    <span><strong>${item.name}</strong></span>
                    <span>Quantity: ${item.inCart}</span>
                </div>
                <div class="lg-hide"></div>
                <!-- Product Quantity and Price-->
                <div class="quantity quantity-pay col-4 mb-4 mb-lg-0 mt-0">
                    <span class="text-start text-md-center mt-3"><strong>&#8364 ${item.inCart * item.price},00</strong></span>
                </div>`;
        })
        calcShipping();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product button');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

// function to calculate the shipping costs
function calcShipping() {
    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let totalShipping = document.querySelector('.shipping-cost');
    let totalPay = document.querySelector('.total-pay');
    
    // if statement to decide if customer has to pay for shipping
    if( cart < 75 ){
        totalShipping.innerHTML =`<p class="mb-0">€ 20,00</p>`;
        let totalPayAmount = cart + 20;
        totalPay.innerHTML = `<p><strong>€ ${totalPayAmount},00</strong></p>`;
    } else {
        totalShipping.innerHTML =`<p class="mb-0">Free</p>`;
        let totalPayAmount = cart;
        totalPay.innerHTML = `<p><strong>€ ${totalPayAmount},00</strong></p>`;
    }
}

// function to show delivery range of 2 till 7 days
function displayFutureDays() {
    let shippingDate = document.querySelector('.shipping-date');
    
    var today = new Date();
    var twoDays = new Date(today);
    twoDays.setDate(today.getDate() + 2);
    var dd2 = twoDays.getDate();
    var mm2 = twoDays.getMonth() + 1;
    var yyyy2 = twoDays.getFullYear();
  
    var sevenDays = new Date(today);
    sevenDays.setDate(today.getDate() + 7);
    var dd7 = sevenDays.getDate();
    var mm7 = sevenDays.getMonth() + 1;
    var yyyy7 = sevenDays.getFullYear();
  
    if (dd2 < 10) {
      dd2 = '0' + dd2;
    }
    if (mm2 < 10) {
      mm2 = '0' + mm2;
    }
    
    if (dd7 < 10) {
      dd7 = '0' + dd7;
    }
    if (mm7 < 10) {
      mm7 = '0' + mm7;
    }

    shippingDate.innerHTML = '';
    shippingDate.innerHTML = dd2 + '/' + mm2 + '/' + yyyy2 + ' - ' + dd7 + '/' + mm7 + '/' + yyyy7;
}
  

onLoadCartNumbers();
displayCart();
displayPay();
