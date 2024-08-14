document.addEventListener("DOMContentLoaded", function () {

  const requestURL = 'https://greenz081081.github.io/DataFiles/data/data.json';
  const produDetailsHTML = document.querySelector(".productDetails");
  const productDescriptionHTML = document.querySelector(".productDescription");
  const productImageHTML = document.querySelector(".productImage");
  const mainSubmitButtonHTML = document.querySelector("#mainSubmitButton");
  const cartDisplayHTML = document.querySelector("#cartLink");
  const customerReviewHTML = document.querySelector(".reviews");
  const nextButton = document.querySelector("#nextButton");

  let cart = [];
  let currentIndex = 0;

  // -----------------------------------------------------------------------------------------------
  // Asynchronous function to get data
  // -----------------------------------------------------------------------------------------------
  async function getData() {
    let response = await fetch(requestURL);
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      buildProductDescription(data, currentIndex);
      buildProductDetails(data, currentIndex);
      buildProductImage(data, currentIndex);
      buildCustomerReview(data);

      mainSubmitButtonHTML.addEventListener("click", () => addToCart(data));
      nextButton.addEventListener("click", () => nextItem(data));
    } else {
      throw Error(response.statusText);
    }
  }

  getData();

  // -----------------------------------------------------------------------------------------------
  // Function to build the product details
  // -----------------------------------------------------------------------------------------------
  function buildProductDetails(data, index) {
    produDetailsHTML.innerHTML = "";
    const productDetailsDiv = document.createElement("div");
    let productDetailsH2 = document.createElement("h2");
    let productDetailsp1 = document.createElement("p");
    let productDetailsp2 = document.createElement("p");
    let ProductDetailsp3 = document.createElement("p");
    let product = data.products[index];

    productDetailsH2.innerHTML = `Name: ${product.productName}`;
    productDetailsp1.innerHTML = `<strong>Price:</strong> ${product.productPrice}`;
    productDetailsp2.innerHTML = `<strong>Number in Stock:</strong> ${product.productStock}`;
    ProductDetailsp3.innerHTML = `<strong>Variation:</strong> ${product.productVariation}`;

    productDetailsDiv.append(productDetailsH2);
    productDetailsDiv.append(productDetailsp1);
    productDetailsDiv.append(productDetailsp2);
    productDetailsDiv.append(ProductDetailsp3);
    produDetailsHTML.append(productDetailsDiv);
  }

  // -----------------------------------------------------------------------------------------------
  // Function to build the product Image
  // -----------------------------------------------------------------------------------------------
  function buildProductImage(data, index) {
    productImageHTML.innerHTML = "";
    const productImageDiv = document.createElement("div");
    let productImage = document.createElement('img');
    let product = data.products[index];

    productImage.setAttribute("src", product.productImage);
    productImage.setAttribute("alt", `Image of ${product.productName}`);

    productImageDiv.append(productImage);
    productImageHTML.append(productImageDiv);
  }

  // -----------------------------------------------------------------------------------------------
  // Function to build the product Description
  // -----------------------------------------------------------------------------------------------
  function buildProductDescription(data, index) {
    productDescriptionHTML.innerHTML = "";
    const productDescriptionDiv = document.createElement("div");
    let productDescriptionH1 = document.createElement("h1");
    let productDescriptionp = document.createElement("p");
    let productDescriptionImage1 = document.createElement("img");
    let productDescriptionImage2 = document.createElement("img");
    let productDescriptionImage3 = document.createElement("img");

    let product = data.products[index];

    productDescriptionH1.innerHTML = `Product Description`;
    productDescriptionp.innerHTML = `${product.productDescription}`;

    productDescriptionImage1.setAttribute("src", product.productImage1);
    productDescriptionImage1.setAttribute("alt", `Image of ${product.productName}`);

    productDescriptionImage2.setAttribute("src", product.productImage2);
    productDescriptionImage2.setAttribute("alt", `Image of ${product.productName}`);

    productDescriptionImage3.setAttribute("src", product.productImage3);
    productDescriptionImage3.setAttribute("alt", `Image of ${product.productName}`);

    productDescriptionDiv.append(productDescriptionH1);
    productDescriptionDiv.append(productDescriptionp);
    productDescriptionDiv.append(productDescriptionImage1);
    productDescriptionDiv.append(productDescriptionImage2);
    productDescriptionDiv.append(productDescriptionImage3);

    productDescriptionHTML.append(productDescriptionDiv);
  }


  // -----------------------------------------------------------------------------------------------
  // Function to build the customer reviews
  // -----------------------------------------------------------------------------------------------
  function buildCustomerReview(data) {
    customerReviewHTML.innerHTML = ""; // Clear previous reviews
    const customerReviewDiv = document.createElement("div");
    customerReviewDiv.classList.add("review-item");

    const customerReviewDiv1 = document.createElement("div");
    customerReviewDiv1.classList.add("reviewsHeading");

    let customerReviewHeading = document.createElement("h2");
    customerReviewHeading.innerHTML = "Customer Reviews";

    data.customerReviews.forEach(review => {
      let customerReviewImage = document.createElement("img");
      customerReviewImage.classList.add("review-image");
      let customerReviewp1 = document.createElement("p");
      let customerReviewp2 = document.createElement("p");

      customerReviewImage.setAttribute("src", review.customerImage);
      customerReviewp1.innerHTML = `<strong>Name:</strong> ${review.customerName}`;
      customerReviewp2.innerHTML = `<strong>Review:</strong> ${review.review}`;

      customerReviewDiv1.append(customerReviewImage);
      customerReviewDiv1.append(customerReviewp1);
      customerReviewDiv1.append(customerReviewp2);
    });

    customerReviewDiv.append(customerReviewHeading);
    customerReviewDiv.append(customerReviewDiv1);

    customerReviewHTML.append(customerReviewDiv);
  }

  function nextItem(data) {
    currentIndex++; // Increment the index
    if (currentIndex >= data.products.length) {
      currentIndex = 0; // Loop back to the first item
    }
    // Update the display with the next item
    buildProductDescription(data, currentIndex);
    buildProductDetails(data, currentIndex);
    buildProductImage(data, currentIndex);
  }


  // -----------------------------------------------------------------------------------------------
  // Function to add a product to the cart
  // -----------------------------------------------------------------------------------------------
  function addToCart(data) {
    const selectedProduct = data.products[currentIndex];  

    let existingItem = cart.find(cartItem => cartItem.productName === selectedProduct.productName);

    if (existingItem) {
      existingItem.quantity += 1;
      alert(`${existingItem.productName} quantity updated to ${existingItem.quantity}`);
    } else {
      selectedProduct.quantity = 1;
      cart.push(selectedProduct);
      alert(`${selectedProduct.productName} has been added to the cart`);
    }

    updateCartDisplay();
  }



  //-------------------------------------------------------------------------------------------
  // Function to update the cart display
  // ------------------------------------------------------------------------------------------
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
    });
  }

});
