import { Service } from './services-section';

type ServiceCardProps = Service;

function ServiceCard({
  title,
  summary,
  featureBullets,
  price,
}: ServiceCardProps) {
  return (
    <div className="border-secondary flex h-96 w-1/3 flex-col border transition duration-300 hover:border-gray-200">
      <div className="border-secondary relative flex h-32 flex-col border-b p-4">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-400">{summary}</p>
      </div>
      <ul className="border-secondary grow list-inside list-disc p-4 text-sm">
        {featureBullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
      <p className="p-4 font-bold">Starting at {price}</p>
    </div>
  );
}

export default ServiceCard;
