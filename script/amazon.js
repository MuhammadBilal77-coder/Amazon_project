import { cart, addTocart,updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let productsHtml = "";
products.forEach((products) => {
  productsHtml += `
  
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="/images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(products.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${products.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${products.id}">
            Add to Cart
          </button>
        </div>
  `;
});

// Fuctions



document.querySelector(".js-products-grid").innerHTML = productsHtml;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const timer = setTimeout(() => {
      const messageElement = button.closest(".product-container");
      const addedMessage = messageElement.querySelector(
        `.js-added-to-cart-${productId}`,
      );
      addedMessage.style.opacity = "1";
      setTimeout(() => {
        addedMessage.style.opacity = "0";
      }, 2000);
    }, 1000);
    addTocart(productId);
  });
});

let loaclItemRepresent = JSON.parse(localStorage.getItem("cartQuantity"));
  let homeCartQuantity = document.querySelector(".js-cart-quantity");
  homeCartQuantity.innerHTML = loaclItemRepresent;