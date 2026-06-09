import { education } from './data/education';
import { experience } from './data/experience';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { technicalSkills } from './data/skills';
import { socials } from './data/socials';

const strip = (s: string) => s.replace(/\*\*/g, '');

// Server-rendered, semantic, crawlable résumé behind the interactive terminal.
// Visually hidden (sr-only) but present in the HTML for SEO and available to
// screen readers as a proper document.
export default function SeoContent() {
  return (
    <div className="sr-only">
      <h1>{profile.name}</h1>
      <p>
        {profile.title} · {profile.location}
      </p>
      {profile.bio.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <h2>Experience</h2>
      {experience.map((job) => (
        <section key={`${job.company} ${job.position}`}>
          <h3>
            {job.position} — {job.company}
          </h3>
          <p>{job.date}</p>
          <ul>
            {job.description.map((d, i) => (
              <li key={i}>{strip(d)}</li>
            ))}
          </ul>
        </section>
      ))}

      <h2>Education</h2>
      {education.map((e) => (
        <section key={e.school}>
          <h3>
            {e.degree} — {e.school}
          </h3>
          <p>{e.date}</p>
        </section>
      ))}

      <h2>Projects</h2>
      {projects.map((p) => (
        <section key={p.name}>
          <h3>
            {p.name}
            {p.wip ? ' (work in progress)' : ''}
          </h3>
          <p>{p.description}</p>
          <p>Technologies: {p.technologies.join(', ')}</p>
        </section>
      ))}

      <h2>Skills</h2>
      <ul>
        <li>Engineering: {technicalSkills.engineering.join(', ')}</li>
        <li>Product &amp; AI: {technicalSkills.productAi.join(', ')}</li>
        <li>Practice: {technicalSkills.practice.join(', ')}</li>
      </ul>

      <h2>Contact</h2>
      <ul>
        <li>
          <a href={`mailto:${socials.email}`}>{socials.email}</a>
        </li>
        <li>
          <a href={socials.website}>Website: nima-karami.com</a>
        </li>
        <li>
          <a href={socials.github}>GitHub: github.com/nima-karami</a>
        </li>
        <li>
          <a href={socials.linkedin}>LinkedIn: in/nima-karami</a>
        </li>
      </ul>
    </div>
  );
}
