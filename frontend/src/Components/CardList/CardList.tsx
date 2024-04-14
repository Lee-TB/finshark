import Card from "../Card/Card";

interface Props {}

export default function CardList({}: Props) {
  return (
    <div>
      <h2>List</h2>
      <Card companyName="Apple" ticker="AAPL" price={100} />
      <Card companyName="Tesla" ticker="TSL" price={200} />
      <Card companyName="Microsoft" ticker="MSFT" price={400} />
    </div>
  );
}
