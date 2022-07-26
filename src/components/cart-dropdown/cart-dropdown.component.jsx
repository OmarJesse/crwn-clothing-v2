import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const goToCheckoutAndClose = () => {
    navigate("/checkout");
    dispatch(setIsCartOpen(false));
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
