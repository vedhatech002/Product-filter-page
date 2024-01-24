//import data from json
import productsData from "../data/data.json";

const productContainer = document.querySelector("#products-container");
const categoryList = document.querySelector("#category-list");
const brandList = document.querySelector("#brand-list");
const sortList = document.querySelector("#sortList");

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

    productContainer.innerHTML = "";
    productContainer.append(productCardsfragment);
  }
}
displayProducts(productsData);

function setFilterOption() {
  const allCategories = productsData.map((product) => product.category);
  const categories = [
    "All",
    ...allCategories.filter((category, index) => {
      return allCategories.indexOf(category) === index;
    }),
  ];

  // set brand
  const allBrand = productsData.map((product) => {
    return product.brand;
  });

  const brands = [
    ...allBrand.filter((category, index) => {
      return allBrand.indexOf(category) === index;
    }),
  ];

  categoryList.innerHTML = categories
    .map(
      (category) =>
        `<li class="cursor-pointer">
        <label
          for="${category}"
          class="flex items-center gap-2 text-xs font-semibold cursor-pointer capitalize"
         
        >
          <input
            class="p-0.5"
            type="radio"
            name="category"
            value="${category}"
            id="${category}" ${category === "All" ? "checked" : ""}
          />${category}
        </label>
      </li>`
    )
    .join("");

  sortList.innerHTML = `
<li class="cursor-pointer">
        <label
          for="lowToHigh"
          class="flex items-center gap-2 text-xs font-semibold cursor-pointer capitalize"
         
        >
          <input
            class="p-0.5"
            type="radio"
            name="sort"
            value="low"
            id="lowToHigh"
          />low -to- High
        </label>
      </li>
      <li class="cursor-pointer">
        <label
          for="HighToLow"
          class="flex items-center gap-2 text-xs font-semibold cursor-pointer capitalize"
         
        >
          <input
            class="p-0.5"
            type="radio"
            name="sort"
            value="low"
            id="HighToLow"
          />High -to- Low
        </label>
      </li>
`;

  brandList.innerHTML = brands
    .map(
      (brand) => `
    <li class="cursor-pointer">
        <label
          for="${brand}"
          class="flex items-center gap-2 text-xs font-semibold cursor-pointer capitalize"
         
        >
          <input
            class="p-0.5"
            type="checkbox"
            name="brand"
            value="${brand}"
            id="${brand}" 
          />${brand}
        </label>
      </li>
    `
    )
    .join("");

  // filter
  categoryList.addEventListener("change", filterbyCategories);
  sortList.addEventListener("change", sortbyPrice);
  brandList.addEventListener("change", filterbyBrand);
}
setFilterOption();

//filter by categoris

function filterbyCategories(e) {
  let selectedCategory = e.target.value;
  // console.log(selectedCategory);
  // console.log(selectedCategory);
  selectedCategory === "All"
    ? displayProducts(productsData)
    : displayProducts(
        productsData.filter((product) => product.category === selectedCategory)
      );
}

function sortbyPrice(e) {
  const targetId = e.target.id;

  if (targetId === "lowToHigh") {
    displayProducts(
      productsData
        .map((product) => product)
        .sort((a, b) => {
          return a.price - b.price;
        })
    );
  } else if (targetId === "HighToLow") {
    displayProducts(
      productsData
        .map((product) => product)
        .sort((a, b) => {
          return b.price - a.price;
        })
    );
  }
}

//filter by brand
function filterbyBrand() {
  const selectedBrands = Array.from(
    brandList.querySelectorAll('input[name="brand"]:checked')
  ).map((input) => input.value);

  if (selectedBrands.length > 0) {
    const selectedBrandProducts = selectedBrands.flatMap((brand) =>
      productsData.filter((product) => product.brand === brand)
    );
    displayProducts(selectedBrandProducts);
  }
}

//dropdown list
const dropdownEl = document.querySelectorAll("#drop-down");

dropdownEl.forEach((el) => {
  el.addEventListener("click", (e) => {
    let siblingEL = el.nextElementSibling;
    if (siblingEL) {
      siblingEL.classList.toggle("hidden");
    } else {
      alert("we working on that feature...");
    }
  });
});

// search functionalities
const searchBarEl = document.querySelector("#search-bar");

searchBarEl.addEventListener("input", (e) => {
  const text = e.target.value;

  txtSearch(text);
});

//textsearch functionality
function txtSearch(txt) {
  const searchText = txt.toLowerCase();
  const result = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLocaleLowerCase().includes(searchText)
  );

  displayProducts(result);
}

const searchIcon = document.querySelector("#search-icon");

searchIcon.addEventListener("click", () => {
  searchBarEl.classList.toggle("hidden");
  changeIcon(searchIcon, "fa-magnifying-glass", "fa-xmark");
});

// function to change Icon
function changeIcon(element, targetedClass, changeClass) {
  if (element.classList.contains(targetedClass)) {
    element.classList.remove(targetedClass);
    element.classList.add(changeClass);
  } else {
    element.classList.add(targetedClass);
    element.classList.remove(changeClass);
  }
}
