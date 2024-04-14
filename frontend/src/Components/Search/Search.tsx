import { ChangeEvent, SyntheticEvent, useState } from "react";

type Props = {};

export default function Search({}: Props) {
  const [search, setSearch] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = (e: SyntheticEvent) => {
    console.log(e);
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleInputChange} />
      <button onClick={handleClick}>click</button>
    </div>
  );
}
