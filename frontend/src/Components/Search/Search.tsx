import { ChangeEvent, SyntheticEvent } from "react";

interface Props {
  search?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: SyntheticEvent) => void;
}

export default function Search({ search, onChange, onClick }: Props) {
  return (
    <div>
      <input type="text" value={search} onChange={onChange} />
      <button onClick={onClick}>click</button>
    </div>
  );
}
