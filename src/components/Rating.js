import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

export default function Rating({ value }) {
  return RATINGS.map((rating) => (
    <Star key={rating} selected={value >= rating} />
  ));
}

function Star({ selected }) {
  const className = selected ? "true" : "false";
  return <span className={className}>★</span>;
}
