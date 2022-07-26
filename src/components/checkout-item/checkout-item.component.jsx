import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Quantity,
  Price,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const increaseCartItem = () =>
    dispatch(increaseItemQuantity(cartItems, cartItem));
  const decreaseCartItem = () =>
    dispatch(decreaseItemQuantity(cartItems, cartItem));
  const removeCartItem = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>

      <Quantity>
        <Arrow onClick={decreaseCartItem}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseCartItem}>&#10095;</Arrow>
      </Quantity>
      <Price>{quantity * price}</Price>
      <RemoveButton onClick={removeCartItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
