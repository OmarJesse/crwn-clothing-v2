import styled, { css } from "styled-components";

export const DirectoriesCotntainer = styled.div`
  width: 100%;
  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 80vh;
    `}
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
