import "./Card.css";

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card = ({ companyName, ticker, price }: Props) => {
  return (
    <div className="card">
      <img src="https://placehold.co/200x300" alt={companyName} />
      <div className="details">
        <h2>
          {companyName} ({ticker.toLowerCase()})
        </h2>
        <p>${price}</p>
      </div>
      <p className="infon">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
        enim?
      </p>
    </div>
  );
};

export default Card;
