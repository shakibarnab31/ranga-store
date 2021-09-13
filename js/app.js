const productDetails = document.getElementById('product-details');

// clear 
productDetails.innerHTML = '';

// load products 

const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // the below line isn't necessary so I commented out
  // const allProducts = products.map((pd) => pd);

  for (const product of products) {
    // the below line isn't necessary so I commented out
    // const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h5>${product.title}</h5>
      <p>Category: ${product.category}</p>
      <p>Total Rated: ${product.rating.count}</p>
      <p>Rating: ${product.rating.rate}</p>

      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="showdetails('${product.id}')" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// product details function
const showdetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      productDetails.innerHTML = `
    <p class="text-center">Category: ${data.category}</p>
    <p class="text-center">Title: ${data.title}</p>
    `
    })

}
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = parseFloat(convertedOldPrice) + convertPrice;
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};
