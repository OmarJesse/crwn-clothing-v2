import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  if (cartItems.find((cartItem) => cartItem.id === productToAdd.id))
    return increaseQuantity(cartItems, productToAdd);
  else return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const increaseQuantity = (cartItems, productToIncrease) =>
  cartItems.map((cartItem) =>
    cartItem.id === productToIncrease.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );

const decreaseQuantity = (cartItems, productToDecrease) => {
  if (productToDecrease.quantity === 1)
    return removeCartItem(cartItems, productToDecrease);
  return cartItems.map((cartItem) =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartCount: 0,
  totalPrice: 0,
  removeItemFromCart: () => null,
  decreaseItemQuantity: () => null,
  increaseItemQuantity: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemFromCart = (productToRemove) =>
    setCartItems(removeCartItem(cartItems, productToRemove));

  const decreaseItemQuantity = (productToDecrease) =>
    setCartItems(decreaseQuantity(cartItems, productToDecrease));

  const increaseItemQuantity = (productToIncrease) =>
    setCartItems(increaseQuantity(cartItems, productToIncrease));

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    );

    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    decreaseItemQuantity,
    increaseItemQuantity,
    totalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
