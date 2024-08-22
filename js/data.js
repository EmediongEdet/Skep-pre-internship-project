document.addEventListener("DOMContentLoaded", function () {

  const requestURL = 'https://greenz081081.github.io/DataFiles/data/data.json';
  const productDetailsHTML = document.querySelector(".productDetails");
  const productDescriptionHTML = document.querySelector(".productDescription");
  const productImageHTML = document.querySelector(".productImage");
  const mainSubmitButtonHTML = document.querySelector("#mainSubmitButton");
  const cartDisplayHTML = document.querySelector(".modal-body");
  const customerReviewHTML = document.querySelector(".reviews");
  const quantityHTML = document.querySelector(".quantity");


  let cart = [];
  let currentIndex = 0;




  // This is an asynchronous function that handles data retrieval from the server
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
      removeButton.addEventListener("click", () => removeItem(data, itemId));
      
    } else {
      throw Error(response.statusText);
    }
  }

  getData();




  // This function handles the building of the product details
  function buildProductDetails(data, index) {
    // clears all the HTML content inside the productDetailsHTML element,
    // ensuring that old or irrelevant content is removed before new content is inserted.
    productDetailsHTML.innerHTML = "";
    const productDetailsDiv = document.createElement("div");
    let productDetailsH2 = document.createElement("h2");
    let productDetailsp1 = document.createElement("p");
    let productDetailsp2 = document.createElement("p");
    let ProductDetailsp3 = document.createElement("p");
    let product = data.products[index];

    productDetailsH2.innerHTML = `Name: ${product.productName}`;
    productDetailsp1.innerHTML = `<strong>Price:</strong> #${product.productPrice}`;
    productDetailsp2.innerHTML = `<strong>Number in Stock:</strong> ${product.productStock}`;
    ProductDetailsp3.innerHTML = `<strong>Variation:</strong> ${product.productVariation}`;

    productDetailsDiv.append(productDetailsH2);
    productDetailsDiv.append(productDetailsp1);
    productDetailsDiv.append(productDetailsp2);
    productDetailsDiv.append(ProductDetailsp3);
    productDetailsHTML.append(productDetailsDiv);
  }




  // This function handles the building and generating of the product Image
  function buildProductImage(data, index) {
    // clears all the HTML content inside the productImageHTML element,
    // ensuring that old or irrelevant content is removed before new content is inserted.
    productImageHTML.innerHTML = "";
    const productImageDiv = document.createElement("div");
    let productImage = document.createElement('img');
    let product = data.products[index];

    productImage.setAttribute("src", product.productImage);
    productImage.setAttribute("alt", `Image of ${product.productName}`);
    productImage.setAttribute("data-src", product.placeholderImage);

    productImageDiv.append(productImage);
    productImageHTML.append(productImageDiv);
  }




  // This function handles the building and generating of the product description
  function buildProductDescription(data, index) {
    // clears all the HTML content inside the produDescriptionHTML element,
    // ensuring that old or irrelevant content is removed before new content is inserted.
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




  // This function builds and generates the different customer reeviews
  function buildCustomerReview(data) {
    // clears all the HTML content inside the customerReviewHTML element,
    // ensuring that old or irrelevant content is removed before new content is inserted.
    customerReviewHTML.innerHTML = ""; 
    const customerReviewDiv = document.createElement("div");
    customerReviewDiv.classList.add("review-item");

    const customerReviewDiv1 = document.createElement("div");
    customerReviewDiv1.classList.add("reviewsHeading");

    let customerReviewHeading = document.createElement("h2");
    customerReviewHeading.innerHTML = "Reviews";

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




  // This function handles the navigation from one item to the other on the page
  function nextItem(data) {
    currentIndex++;
    if (currentIndex >= data.products.length) {
      currentIndex = 0;
    }
    buildProductDescription(data, currentIndex);
    buildProductDetails(data, currentIndex);
    buildProductImage(data, currentIndex);
  }



  // This function handles to process of adding to cart
  function addToCart(data) {
    const selectedProduct = data.products[currentIndex];  

    const price = parseFloat(selectedProduct.productPrice) || 0;
    selectedProduct.productPrice = price;

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


  // This function removes an item from the cart
  function removeFromCart(productName) {
    const productIndex = cart.findIndex(cartItem => cartItem.productName === productName);

    if (productIndex > -1) {
      cart.splice(productIndex, 1);
      alert(`${productName} has been removed from the cart`);
      updateCartDisplay();
    }
  }


  // This function updates the cart UI after an item(s) has been added to the cart 
  function updateCartDisplay() {
    cartDisplayHTML.innerHTML = "";
    quantityHTML.innerHTML = "";

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const totalQuantityDisplay = document.createElement("p");

    totalQuantityDisplay.textContent = `${totalQuantity}`;
    totalQuantityDisplay.classList.add("total-quantity");

    const totalPrice = cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
    console.log(`Total Price: ${totalPrice}`)
    const totalPriceDisplay = document.createElement("p");
    totalPriceDisplay.textContent = `Total Price: #${totalPrice.toFixed(2)}`;
    totalPriceDisplay.classList.add("total-price");
    
    quantityHTML.appendChild(totalQuantityDisplay);

    cart.forEach(item => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("modal-item");

      const itemName = document.createElement("p");
      itemName.textContent = `Name: ${item.productName}`;

      const itemPrice = document.createElement("p");
      itemPrice.textContent = `Price: #${parseFloat(item.productPrice).toFixed(2)}`;

      const itemImage = document.createElement("img");
      itemImage.setAttribute("src", item.productImage);
      itemImage.setAttribute("alt", `Image of ${item.productName}`);

      const itemQuantity = document.createElement("p");
      itemQuantity.textContent = `Quantity: ${item.quantity}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove Item";
      removeButton.classList.add("removeButton");
      removeButton.addEventListener("click", () => removeFromCart(item.productName));

      cartItemDiv.appendChild(itemImage);
      cartItemDiv.appendChild(itemName);
      cartItemDiv.appendChild(itemPrice);
      cartItemDiv.appendChild(itemQuantity);
      cartItemDiv.appendChild(totalPriceDisplay)
      cartItemDiv.appendChild(removeButton)

      cartDisplayHTML.appendChild(cartItemDiv);
    });
  }

});

