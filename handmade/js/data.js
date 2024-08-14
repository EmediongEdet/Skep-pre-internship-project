document.addEventListener("DOMContentLoaded", function () {

const requestURL = 'https://greenz081081.github.io/DataFiles/data/data.json';
const produDetailsHTML = document.querySelector(".productDetails");
const productDescriptionHTML = document.querySelector(".productDescription");
const productImageHTML = document.querySelector(".productImage");
const mainSubmitButtonHTML = document.querySelector(".mainSubmitButton");
const cartDisplayHTML = document.querySelector(".cartIcon2");

let cart = [];


// Asycnronous function to get data
async function getData() {
  let response = await fetch(requestURL);
  if (response.ok) {
    let data = await response.json();
    console.log(data);
    buildProductDescription(data);
    buildProductDetails(data);
    buildProductImage(data);
    mainSubmitButtonHTML.addEventListener("click", () => addToCart(data));
  } else {
    throw Error(response.statusText);
  }
}

getData();


// Function to build the product details
function buildProductDetails(data) {
  const productDetailsDiv = document.createElement("div");
  let productDetailsH2 = document.createElement("h2");
  let productDetailsp1 = document.createElement("p");
  let productDetailsp2 = document.createElement("p");
  let ProductDetailsp3 = document.createElement("p");
  data.products.slice(0, 1).forEach(product => {
    productDetailsH2.innerHTML = `Name: ${product.productName}`;
    productDetailsp1.innerHTML = `Price: ${product.productPrice}`;
    productDetailsp2.innerHTML = `Number in Stock: ${product.productStock}`;
    ProductDetailsp3.innerHTML = `Variation: ${product.productVariation}`;

    productDetailsDiv.append(productDetailsH2);
    productDetailsDiv.append(productDetailsp1);
    productDetailsDiv.append(productDetailsp2);
    productDetailsDiv.append(ProductDetailsp3);
    produDetailsHTML.append(productDetailsDiv);
  });
}


// Function to build the product Image
function buildProductImage(data) {
  const productImageDiv = document.createElement("div");
  let productImage = document.createElement('img');
  data.products.slice(0, 1).forEach(product => {
    productImage.setAttribute("src", product.productImage);
    productImage.setAttribute("alt", `image of ${product.productName}`);

    productImageDiv.append(productImage);
    productImageHTML.append(productImageDiv);
  });
}

// Function to build the product Description
function buildProductDescription(data) {
  const productDescriptionDiv = document.createElement("div");
  let productDescriptionH1 = document.createElement("h1");
  let productDescriptionp = document.createElement("p");
  let productDescriptionImage1 = document.createElement("img");
  let productDescriptionImage2 = document.createElement("img");
  let productDescriptionImage3 = document.createElement("img");

  data.products.slice(0, 1).forEach(product => {

    productDescriptionH1.innerHTML = `Product Description`;
    productDescriptionp.innerHTML = `${product.productDescription}`;

    productDescriptionImage1.setAttribute("src", product.productImage1);
    productDescriptionImage1.setAttribute("alt", `Image of ${product.productName}`);

    productDescriptionImage2.setAttribute("src", product.productImage2);
    productDescriptionImage2.setAttribute("alt", `Image of ${product.productName}`);

    productDescriptionImage3.setAttribute("src", product.productImage2);
    productDescriptionImage3.setAttribute("alt", `Image of ${product.productName}`);

    productDescriptionDiv.append(productDescriptionH1);
    productDescriptionDiv.append(productDescriptionp);
    productDescriptionDiv.append(productDescriptionImage1);
    productDescriptionDiv.append(productDescriptionImage2);
    productDescriptionDiv.append(productDescriptionImage3);

    productDescriptionHTML.append(productDescriptionDiv);
  });
}

// Function to generate alert message 
function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  
  alert.addEventListener('click', function(e) {
      if(e.target.tagName == 'SPAN') {
        main.removeChild(this);
      }
  })
  const main = document.querySelector('main');
  main.prepend(alert);

  if(scroll)
    window.scrollTo(0,0);
    setTimeout(()=>{
      alert.style.display = "none"
    }, 3000)

}

// Function to add a product to the cart
function addToCart(data) {
  const selectedProduct = data.products[0];  // Assuming we're adding the first product for simplicity

  let existingItem = cart.find(cartItem => cartItem.id === selectedProduct.id);

  if (existingItem) {
    existingItem.quantity += 1;

  } 
  
  else {
    cart.push(selectedProduct);
    cart.forEach(item => {
      alert(`${item.productName} has been added to cart`);
    })
    // alert("The product has been added to cart");
    //   ...selectedProduct,
    //   quantity: 1
    // });
  }

  updateCartDisplay()

}


// Function to update the cart display (if you have a cart UI)
function updateCartDisplay() {
  console.log("Cart:", cart);

  // Clear previous cart display
  cartDisplayHTML.innerHTML = "";

  // Loop through each item in the cart and display it
  cart.forEach(item => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    const itemName = document.createElement("p");
    itemName.textContent = `Name: ${item.productName}`;
    
    const itemPrice = document.createElement("p");
    itemPrice.textContent = `Price: ${item.productPrice}`;

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity || 1}`;

    // Append the item details to the cart item div
    cartItemDiv.appendChild(itemName);
    cartItemDiv.appendChild(itemPrice);
    cartItemDiv.appendChild(itemQuantity);

    // Append the cart item div to the cart display area
    cartDisplayHTML.appendChild(cartItemDiv);
    console.log(cartDisplayHTML);
  });
}



buildProductDescription()
buildProductDetails()
buildProductImage()

});