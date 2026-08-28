export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
  updateCartQuantity();
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
  const cartQuantityElement = document.querySelector(".js-return-to-home-link");
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }
  homeCart();
}

export function homeCart() {
  let homeCartQuantity = document.querySelector(".js-cart-quantity");
  let it = JSON.parse(localStorage.getItem("cartQuantity"));
  if(homeCartQuantity && it){
  homeCartQuantity.innerHTML = it; 
}}

export function addTocart(productId) {
  const quantityElement = document.querySelector(
    `.js-quantity-selector-${productId}`,
  );
  const number = Number(quantityElement.value);
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
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
  updateCartQuantity();
}
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  updateCartQuantity();
}
