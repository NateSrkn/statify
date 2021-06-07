import styled, { css } from "styled-components";
export const StyledRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 10px;
  &:hover {
    background-color: var(--off-black);
  }
`;

export const RowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const MainContent = styled.span`
  font-size: 1rem;
  font-family: "new spirit", sans-serif;
  font-weight: 500;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: unset;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: unset;
`;

export const SecondaryContent = styled.span`
  font-size: 0.85rem;
  font-family: "graphie", sans-serif;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: unset;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: unset;
`;

export const ImageWrapper = styled.div<{ size?: number }>`
  flex-shrink: 0;
  ${({ size }) => css`
    height: ${size}px;
    width: ${size}px;
  `}
`;

export const StyledImage = styled.img`
  box-shadow: "0 8px 24px rgb(0 0 0 / 50%)";
  object-fit: cover;
  object-position: center center;
`;
