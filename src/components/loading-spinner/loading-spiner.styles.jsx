import styled from "styled-components";
import { keyframes } from "styled-components";

const LoadAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `;

export const Loader = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #626767;
    border-color: #626767 transparent #626767 transparent;
    animation-name: ${LoadAnimation};
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
  }
`;
