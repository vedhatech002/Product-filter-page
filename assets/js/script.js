import productsData from "../data/data.json";

/*const productsData = [
  {
    id: 1,
    name: "Cotton Buffalo Check Slim Fit Casual Shirt",
    category: "shirts",
    price: 799,
    img: "https://www.dennislingo.com/cdn/shop/products/4_6c6c6c34-aadb-4294-b7c5-95784455cc9d_720x.jpg?v=1663893926",
  },
  {
    id: 2,
    name: "BRILLIANCE BLACK SHIRT",
    category: "shirts",
    price: 899,
    img: "https://www.snitch.co.in/cdn/shop/files/NOTAG-010-M7888.jpg?v=1685453209&width=1800",
  },
  {
    id: 3,
    name: "Men's Navyblue Slim Fit Casual Shirt",
    category: "shirts",
    price: 599,
    img: "https://www.dennislingo.com/cdn/shop/products/DLMSH319_NB_1_720x.jpg?v=1679661865",
  },
  {
    id: 4,
    name: "Tapered Fit Cotton Chinos ",
    category: "pants",
    price: 999,
    img: "https://www.dennislingo.com/cdn/shop/products/1_b75a6003-3866-4a75-8c28-c265f2e3d768_720x.jpg?v=1663891949",
  },
  {
    id: 5,
    name: "Solid Indigo Denim Jeans For Men",
    category: "pants",
    price: 2599,
    img: "https://www.dennislingo.com/cdn/shop/products/STDLMJNS2028-IN_7_720x.jpg?v=1688983163",
  },
  {
    id: 6,
    name: "POISE BEIGE TROUSERS",
    category: "pants",
    price: 1499,
    img: "https://www.snitch.co.in/cdn/shop/files/IMG_6273.jpg?v=1694259997&width=120",
  },
  {
    id: 7,
    name: "Men Blue Polo Collar Pockets T-shirt",
    category: "tshirts",
    price: 649,
    img: "https://www.dennislingo.com/cdn/shop/products/main-image_2227b736-7985-4259-b7ec-eebe93c5c94e_120x.jpg?v=1693402539",
  },
  {
    id: 8,
    name: "Olive Tshirts for Men",
    category: "tshirts",
    price: 720,
    img: "https://www.dennislingo.com/cdn/shop/products/DLMTSS23140_OL_6_720x.jpg?v=1690265082",
  },
  {
    id: 9,
    name: "Mandarin Collar Solid Cotton Teal Tshirt",
    category: "tshirts",
    price: 499,
    img: "https://www.dennislingo.com/cdn/shop/products/DLMTSS23130-TL_2_720x.jpg?v=1688718408",
  },
];*/

const productContainer = document.querySelector("#products-container");
const categoryList = document.querySelector("#category-list");
// console.log(productContainer);

//function to display product
function displayProducts(products) {
  if (products.length > 0) {
    let products_details = products
      .map(
        (product) => `
        <div class="bg-white w-[180px] h-[320px]">
        <!-- product img -->
        <img
          class="h-[240px] w-full"
          src="${product.img}"
          alt=""
        />
        <!-- products details -->
        <div class="py-2 space-y-2">
          <h1 class="text-sm font-medium">
            ${product.name}
          </h1>
          <!-- price -->
          <div class="flex items-center justify-between">
            <p>₹${product.price}</p>
            <p>4.5⭐</p>
          </div>
        </div>
      </div>
        `
      )
      .join("");
    productContainer.innerHTML = products_details;
    // console.log(products_details);
  } else {
    console.log("uhhho! sorry No products found");
  }
}
displayProducts(productsData);

function setCategories() {
  const allCategories = productsData.map((product) => product.category);
  const categories = [
    "All",
    ...allCategories.filter((category, index) => {
      return allCategories.indexOf(category) === index;
    }),
  ];

  categoryList.innerHTML = categories
    .map(
      (category) =>
        `<li class="cursor-pointer">
        <label>
        <input type="radio" name="category" value="${category}"/>${category}
        </label>
        </li>`
    )
    .join("");

  // filter
  categoryList.addEventListener("change", filterbyCategories);
}
setCategories();

function filterbyCategories(e) {
  let selectedCategory = e.target.value;
  console.log(selectedCategory);
  // console.log(selectedCategory);
  selectedCategory === "All"
    ? displayProducts(productsData)
    : displayProducts(
        productsData.filter((product) => product.category === selectedCategory)
      );
}
