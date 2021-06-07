import styled, { css } from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--light-blue);
  overflow: hidden;
  padding: 10px 0;
`;

export const CardContents = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 10;
`;

export const ArtistImage = styled.div<{ width?: string; height?: string }>`
  flex-shrink: 0;
  ${({ width, height }) => css`
    width: ${width ? width : "150px"};
    height: ${height ? height : "150px"};
  `};
  box-shadow: 0 8px 24px rgb(0 0 0 / 50%);
  object-fit: cover;
  object-position: center center;
  border-radius: 999px;
  overflow: hidden;
  img {
    object-fit: cover;
    object-position: center center;
    height: 100%;
    width: 100%;
    display: block;
  }
`;

export const Bubble = styled.div`
  display: flex;
  padding: 5px 10px;
  border-radius: 999px;
  background-color: var(--off-black);

  div {
    display: flex;
    align-items: center;
    gap: 5;
  }
`;
