export const cart = [];

 export function addTocart(productId) {
  const quantityElement = document.querySelector(
    `.js-quantity-selector-${productId}`,
  );
  const number = Number(quantityElement.value);
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += number;
  } else {
    cart.push({
      productId: productId,
      quantity: number,
    });
  }
}