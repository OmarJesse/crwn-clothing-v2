import { memo } from "react";
import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/payment-form.component";
const Checkout = memo(() => {
  const cartTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
        );
      })}
      <Total>Total: ${cartTotal}</Total>
      <PaymentForm />
    </CheckoutContainer>
  );
});

export default Checkout;
