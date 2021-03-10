import React from "react";
import { TableContainer } from "./styles";
import tw from "twin.macro";
export function Table({ tableHeader, children }) {
  return (
    <TableContainer>
      <tbody>{children}</tbody>
    </TableContainer>
  );
}
