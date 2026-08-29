import { cart, removeFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

import { deliveryOption } from "../data/deliveryOptions.js";

let carSummaryHTML = "";
let matchingProduct;
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOptioned;

  deliveryOption.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOptioned = option;
    }
  });

  const deliveryDate = dayjs().add(deliveryOptioned.deliveryDays, "days");

  const dateString = deliveryDate.format("dddd, MMMM D");

  carSummaryHTML += `
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
              Quantity: <span class="quantity-label js-cartItem-quantity">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
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
          ${deliveryoptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>

  
  `;
});

function deliveryoptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOption.forEach((deliveryOption) => {
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    const deliveryDate = dayjs().add(deliveryOption.deliveryDays, "days");

    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString =
      deliveryOption.priceCents === 0
        ? "Free"
        : `$${formatCurrency(deliveryOption.priceCents)}`;

    html += `
      <div class="delivery-option">
        <input
          type="radio" 
          ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        >

        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>

          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

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
  const updateButtons = document.querySelectorAll(".js-update-quantity-link");

  updateButtons.forEach((bun) => {
    bun.addEventListener("click", () => {
      // Don't create another input
      if (bun.querySelector(".js-input-element")) {
        return;
      }

      // Get product ID
      const productId = bun.dataset.productId;

      // Remove "Update"
      bun.innerHTML = "";

      // Create input
      const input = document.createElement("input");
      input.type = "number";
      input.min = "1";
      input.placeholder = "No:";

      // Create Save button
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";

      // Classes
      input.classList.add("js-input-element");
      saveButton.classList.add("js-button-element");

      // Input styling
      input.style.width = "35px";
      input.style.height = "22px";
      input.style.padding = "2px 5px";
      input.style.marginRight = "5px";
      input.style.fontSize = "14px";
      input.style.border = "1px solid #aaa";
      input.style.borderRadius = "3px";
      input.style.outline = "none";
      input.style.boxSizing = "border-box";

      // Save button styling
      saveButton.style.padding = "4px 10px 4px 10px";
      saveButton.style.fontSize = "17px";
      saveButton.style.backgroundColor = "white";
      saveButton.style.color = "rgb(1, 124, 182)";
      saveButton.style.border = "none";
      saveButton.style.borderRadius = "4px";
      saveButton.style.cursor = "pointer";

      // Add input and button
      bun.appendChild(input);
      bun.appendChild(saveButton);

      // Save button click
      saveButton.addEventListener("click", () => {
        // Get value BEFORE removing input
        const inputText = input.value;
        const inputValue = Number(inputText);

        // Remove input and Save button
        input.remove();
        saveButton.remove();

        // Show Update again
        bun.textContent = "Update";

        // If empty or invalid, stop
        if (inputText === "" || inputValue <= 0) {
          return;
        }

        // Find matching cart item
        const matchingProduct = cart.find((cartItem) => {
          return cartItem.productId === productId;
        });

        if (!matchingProduct) {
          return;
        }

        // Update cart
        matchingProduct.quantity = inputValue;

        // Update quantity on page
        const quantityElement = bun
          .closest(".cart-item-container")
          .querySelector(".quantity-label");

        quantityElement.textContent = inputValue;
      });
    });
  });
}

update();
