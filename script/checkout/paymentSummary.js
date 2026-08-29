import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";

export function renderPaymentSummary() {
  let productId;
  let totalPrice = 0;
  cart.forEach((cartItem) => {
    productId = cartItem.productId;
    products.forEach((product) => {
      if (product.id === productId) {
        totalPrice += ((product.priceCents * cartItem.quantity) /100);
       }});});
       console.log(totalPrice);
}
renderPaymentSummary();
