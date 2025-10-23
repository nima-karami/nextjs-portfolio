import { ProcessStep } from './process-section';

type ProcessCardProps = ProcessStep;

function ProcessCard({ title, description, deliverables }: ProcessCardProps) {
  return (
    <div className="border-secondary-dark group flex flex-col border-b p-16 px-16 transition duration-300 last:border-0 hover:bg-gray-200">
      <h3 className="font-jura mb-4 text-xl font-light text-gray-100 transition duration-300 group-hover:text-gray-800">
        {title}
      </h3>
      <p className="mb-4 grow text-gray-400 transition duration-300 group-hover:text-gray-600">
        {description}
      </p>
      <p className="mt-auto text-sm text-gray-400 transition duration-300 group-hover:text-gray-600">
        <strong>Deliverables:</strong> {deliverables}
      </p>
    </div>
  );
}

export default ProcessCard;
