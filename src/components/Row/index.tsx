import React from "react";
import {
  MainContent,
  RowTextContainer,
  SecondaryContent,
  ImageWrapper,
  StyledRow,
  StyledImage,
} from "./styles";

interface IRow {
  image?: string;
  title: string | Element | Element[];
  secondary?: string | JSX.Element | JSX.Element[];
  size?: number;
  clickHandler?: () => void;
}
export default function Row({
  image,
  title,
  secondary,
  size = 50,
  clickHandler,
}: IRow) {
  return (
    <StyledRow onClick={clickHandler}>
      {image && (
        <ImageWrapper size={size}>
          <StyledImage src={image} height={size} width={size} />
        </ImageWrapper>
      )}
      <RowTextContainer>
        <MainContent>{title}</MainContent>
        {secondary && <SecondaryContent>{secondary}</SecondaryContent>}
      </RowTextContainer>
    </StyledRow>
  );
}
