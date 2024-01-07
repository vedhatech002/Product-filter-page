import productsData from "../data/data.json";
console.log(productsData);

const productContainer = document.querySelector("#products-container");

// calculate discounted price and store it in data
for (const product of productsData) {
  if (product.discount_percentage !== null) {
    const discount = product.discount_percentage / 100;
    product.discountedPrice = Math.round(
      product.price - product.price * discount
    );
  } else {
    // No discount store mrp price to discounted price
    product.discountedPrice = product.price;
  }
}

console.log(productsData);

/*<!-- product card -->
<div class="product-card">
  <!-- product img -->
  <img
    class="product-img"
    src="https://www.dennislingo.com/cdn/shop/products/4_6c6c6c34-aadb-4294-b7c5-95784455cc9d_720x.jpg?v=1663893926"
    alt=""
  />
  <!-- products details -->
  <div class="product-details">
    <h1 class="text-sm font-medium">
      Cotton Buffalo Check Slim Fit Casual Shirt
    </h1>
    <!-- price area -->
    <div class="price-details">
      <p class="current-price">₹699</p>
      <p class="mrp-price">₹800</p>
      <p class="offer">68% off</p>
    </div>
    <!-- size area -->
    <div class="size-list">
      <span class="size-box">L</span>
      <span class="size-box">XL</span>
      <span class="size-box">XXL</span>
    </div>
  </div>
  <!-- badge -->
  <div class="badge">out of stock</div>
</div>*/

function displayProducts(datas) {
  if (datas.length > 0) {
    const productCardsfragment = new DocumentFragment();

    datas.forEach((productObj) => {
      //cardDivEl > productImgEL > productDetailsEL > badgeEL
      //productsdetailsEL > productNameEl > priceDetailsEL > sizeContainerEL

      const cardDivEl = document.createElement("div");
      cardDivEl.classList.add("product-card");

      const productImgEL = document.createElement("img");
      productImgEL.classList.add("product-img");
      productImgEL.setAttribute("src", `${productObj.img}`);
      productImgEL.setAttribute("alt", `${productObj.name}`);

      const productDetailsEl = document.createElement("div");
      productDetailsEl.classList.add("product-details");

      const productNameEl = document.createElement("h3");
      productNameEl.classList.add("product-name");
      productNameEl.innerText = `${productObj.name}`;

      const priceDetailsEl = document.createElement("div");
      priceDetailsEl.classList.add("price-details");

      const currentpriceEl = document.createElement("p");
      currentpriceEl.classList.add("current-price");
      currentpriceEl.innerText = ` ₹${productObj.discountedPrice}`;

      const mrpPriceEL = document.createElement("p");
      mrpPriceEL.classList.add("mrp-price");

      const offerPerEL = document.createElement("p");
      offerPerEL.classList.add("offer");

      //condition to display mrp price and offer percentage
      productObj.discount_percentage !== null
        ? (mrpPriceEL.innerText = `₹${productObj.price}`) &&
          (offerPerEL.innerText = `${productObj.discount_percentage}%`)
        : (mrpPriceEL.innerText = ``) && (offerPerEL.innerText = ``);

      const sizeContainerEL = document.createElement("div");
      sizeContainerEL.classList.add("size-list");

      const sizeBoxEL = document.createElement("span");
      sizeBoxEL.classList.add("size-box");
      console.log(productObj.sizes);

      const sizes = productObj.sizes;
      sizes.forEach((el) => {
        const sizeBoxEL = document.createElement("span");
        sizeBoxEL.classList.add("size-box");
        sizeBoxEL.innerText = el;
        sizeContainerEL.append(sizeBoxEL);
      });

      // badge
      const badgeEl = productObj.in_stock
        ? ""
        : (() => {
            const badge = document.createElement("div");
            badge.classList.add("badge");
            badge.textContent = "out of stock";
            return badge;
          })();

      //append
      priceDetailsEl.append(currentpriceEl, mrpPriceEL, offerPerEL);

      productDetailsEl.append(productNameEl, priceDetailsEl, sizeContainerEL);

      cardDivEl.append(productImgEL, productImgEL, productDetailsEl, badgeEl);

      productCardsfragment.append(cardDivEl);
    });

    console.dir(productCardsfragment);
    productContainer.append(productCardsfragment);
  }
}
displayProducts(productsData);
