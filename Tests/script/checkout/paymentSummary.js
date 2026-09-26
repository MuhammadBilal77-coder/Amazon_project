import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOption } from "../../data/deliveryOptions.js";

function ShippingPrice(ItemId) {
  let shippingPriceCents = 0;
  deliveryOption.forEach((Item) => {
    if (Item.id === ItemId) {
      shippingPriceCents += Item.priceCents;
    }
  });
  return shippingPriceCents;
}

export function renderPaymentSummary() {
  let itemsPrice = 0;
  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        itemsPrice += product.priceCents * cartItem.quantity;
      }
    });
  });

  return itemsPrice / 100;
}

function ship() {
  let shipping = 0;
  cart.forEach((cartItem) => {
    shipping += ShippingPrice(cartItem.deliveryOptionId);
  });

  return shipping / 100;
}

export function RegenerateHTML() {
  // Total price of all items
  const itemsAmount = renderPaymentSummary();
  // Shipping
  const totalShipping = ship();
  // Result before tax
  const beforeTaxPrice = itemsAmount + totalShipping;
  // Tax of all items
  const estimateTax = beforeTaxPrice * 0.1;
  // Order total
  const orderTotal = beforeTaxPrice + estimateTax;
  const paymentSummary = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div class="js-payment-summary-items">Items(${JSON.parse(localStorage.getItem("cartQuantity"))}):</div>
    <div class="payment-summary-money">$${itemsAmount.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${totalShipping.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${beforeTaxPrice.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${estimateTax.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${orderTotal.toFixed(2)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
`;

  return paymentSummary;
}

let re = document.querySelector(".js-payment-summary");
re.innerHTML = RegenerateHTML();
