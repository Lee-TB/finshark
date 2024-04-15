import { ChangeEvent, SyntheticEvent } from "react";

interface Props {
  search?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: SyntheticEvent) => void;
}

export default function Search({ search, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={search} onChange={onChange} />
      <button type="submit">Search</button>
    </form>
  );
}
