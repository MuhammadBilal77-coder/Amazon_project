import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";

export function renderPaymentSummary() {
  let productId;
  let itemsPrice = 0;
  cart.forEach((cartItem) => {
    productId = cartItem.productId;
    products.forEach((product) => {
      if (product.id === productId) {
        itemsPrice += ((product.priceCents * cartItem.quantity) /100);
       }});});
       console.log(itemsPrice);
}
renderPaymentSummary();
