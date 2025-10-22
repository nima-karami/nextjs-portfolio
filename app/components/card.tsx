type CardProps = {
  title: string;
  description: string;
};

function Card({ title, description }: CardProps) {
  return (
    <div className="border-secondary border p-4">
      <h3 className="font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
