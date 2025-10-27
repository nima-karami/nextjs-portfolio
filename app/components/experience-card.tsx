import Markdown from 'markdown-to-jsx';

import { Experience } from './experience-section';

type ExperienceCardProps = Experience;

function ExperienceCard({
  company,
  description,
  date,
  position,
}: ExperienceCardProps) {
  return (
    <div className="border-secondary-dark group flex flex-col gap-4 border-b p-8 transition duration-300 last:border-0 hover:bg-gray-200 md:p-16">
      <div>
        <h3 className="font-jura text-xl font-light text-gray-100 transition duration-300 group-hover:text-gray-800">
          {position}
        </h3>
        <h4 className="font-jura text-lg text-gray-400 transition duration-300 group-hover:text-gray-600">
          {company} | {date}
        </h4>
      </div>

      <ul className="list-inside list-disc font-light text-gray-400 transition duration-300 group-hover:text-gray-600">
        {description.map((item, index) => (
          <li key={index} className="">
            <Markdown>{item}</Markdown>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExperienceCard;
