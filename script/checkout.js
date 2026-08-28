import { cart, removeFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let carSummaryHTML = "";
let matchingProduct;
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  carSummaryHTML += `
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link">
              Update
            </span>
            <span class="delete-quantity-link  link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  
  `;
});
document.querySelector(".js-order-summary").innerHTML = carSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
  });
});
const store = JSON.parse(localStorage.getItem("cartQuantity"));
document.querySelector(".js-return-to-home-link").innerHTML = store;

function update() {
  let updateButton = document.querySelectorAll(".js-update-quantity-link");
  updateButton.forEach((bun) => {
    bun.addEventListener("click", () => {
      //code for only one time generating Html element

      if(bun.querySelector('.js-input-element')){
        return;
      }
      //Remove the update button
      bun.innerHTML = '';
      //Generating HTML process
      //create the button when press update button
      const input = document.createElement("input");
      const saveButton = document.createElement("button");
      //Give the classes of created button
      input.classList.add("js-input-element");
      saveButton.classList.add("js-button-element");
      //Give placeholder or data
      saveButton.textContent = "Save";
      input.placeholder = "No:";
      //Display or append Element
      bun.appendChild(input);
      bun.appendChild(saveButton);
      //End of HTML Creation
    });
  });

  //End of the update function
}
update();
