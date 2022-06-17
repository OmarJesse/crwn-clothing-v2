import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { setIsCartOpen, cartItems } = useContext(CartContext);

  const navigate = useNavigate();
  const goToCheckoutAndClose = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  };
  return (
    <CartDropdownContainer>
      {cartItems.length ? (
        <CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </CartItems>
      ) : (
        <EmptyMessage>Cart Empty</EmptyMessage>
      )}
      <Button onClick={goToCheckoutAndClose}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
