const requestURL = 'https://greenz081081.github.io/DataFiles/data/data.json';

async function getData () {
  let response = await fetch(requestURL);
  if (response.ok) {
    let data = await response.json();
    console.log(data);
    buildProductDetails(data);
  } else {
    throw Error(response.statusText);
  }
}

getData()

function buildProductDetails(data) {
  let productDetails = '';
  data.Products.forEach(product => {
    productDetails += `<div class="product-detail">${product.product1.productDescription}</div>`;
  });
  return productDetails;
}

function query(data) {
  $(".product").html(buildProductDetails(data));
}
