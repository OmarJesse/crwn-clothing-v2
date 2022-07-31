import styled from "styled-components";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedSignInButton,
} from "../button/button.styles";

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedSignInButton} {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }

  @media (max-width: 800px) {
    ${BaseButton},
    ${GoogleSignInButton},
    ${InvertedSignInButton} {
      display: block;
      opacity: 0.9;
      min-width: unset;
      padding: 0 10px;
    }
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    ${BaseButton},
    ${GoogleSignInButton},
    ${InvertedSignInButton} {
      opacity: 0.85;
      display: flex;
    }
  }

  @media (max-width: 800px) {
    width: 40vw;
    &:hover {
      img {
        opacity: unset;
      }

      ${BaseButton},
      ${GoogleSignInButton},
    ${InvertedSignInButton} {
        opacity: unset;
        display: flex;
      }
    }
  }
`;
export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;
export const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const Price = styled.span`
  width: 10%;
`;
