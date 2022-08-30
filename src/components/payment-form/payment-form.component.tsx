import { BUTTON_TYPES } from "../button/button.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  FormContainer,
  PaymentButton,
  PaymentFormContainer,
} from "./payment-form.styles";
import { FormEvent, useState } from "react";
import { StripeCardElement } from "@stripe/stripe-js";

const ifValidCardElement = (
  cardElement: StripeCardElement | null
): cardElement is StripeCardElement => cardElement !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessing, setIsProcessing] = useState(false);
  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.client_secret;

    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement(cardDetails)) {
      return;
    }

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser?.displayName : "Guest",
        },
      },
    });

    setIsProcessing(false);

    if (paymentResult.error) {
      alert(`Payment error: ${paymentResult.error}`);
    } else if (paymentResult.paymentIntent.status === "succeeded") {
      alert("Payment succeeded!");
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessing}
          buttonType={BUTTON_TYPES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
