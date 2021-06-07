import React from "react";
import styled from "styled-components";
interface IClickableText {
  content: string | JSX.Element;
  separator?: string;
  clickHandler: (event: React.MouseEvent) => void;
  style?: React.CSSProperties;
  [x: string]: any;
}
export default function ClickableText({
  content,
  separator = "",
  clickHandler = null,
  style = {},
  ...rest
}: IClickableText) {
  return (
    <ClickableSpan onClick={clickHandler} style={style} {...rest}>
      {content}
      {separator}
    </ClickableSpan>
  );
}

const ClickableSpan = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
