import React, { SyntheticEvent } from "react";

type Props = {
  onDeletePortfolio: (e: SyntheticEvent) => void;
  portfolioValue: string;
};

const DeletePortfolio = ({ onDeletePortfolio, portfolioValue }: Props) => {
  return (
    <form onSubmit={onDeletePortfolio}>
      <input type="text" value={portfolioValue} readOnly hidden />
      <button type="submit" style={{ color: "red" }}>
        Delete
      </button>
    </form>
  );
};

export default DeletePortfolio;
