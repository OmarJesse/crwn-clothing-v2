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
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { increaseItemQuantity, removeItemFromCart, decreaseItemQuantity } =
    useContext(CartContext);
  const { name, imageUrl, quantity, price } = cartItem;

  const increaseCartItem = () => increaseItemQuantity(cartItem);
  const decreaseCartItem = () => decreaseItemQuantity(cartItem);
  const removeCartItem = () => removeItemFromCart(cartItem);

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
