export const Table = ({ tableHeader, children }) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>{tableHeader}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
