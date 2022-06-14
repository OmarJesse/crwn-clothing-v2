import "./checkout-item.styles.scss";
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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name}></img>
      </div>
      <span className="name">{name}</span>

      <div className="quantity">
        <div onClick={decreaseCartItem} className="arrow">
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={increaseCartItem}>
          &#10095;
        </div>
      </div>

      <span className="price">{quantity * price}</span>
      <div className="remove-button" onClick={removeCartItem}>
        &#10005;
      </div>
    </div>
  );
};
export default CheckoutItem;
