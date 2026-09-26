import * as orderSummary from "./checkout/orderSummary.js";

import * as paymentSummary from "./checkout/paymentSummary.js";

 export function renderCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  // Top of checkout page
  document.querySelector(".js-return-to-home-link").innerHTML =
    `${cartQuantity} items`;

  // Order summary
  document.querySelector(".js-payment-summary-items").innerHTML =
    `Items (${cartQuantity}):`;
}
