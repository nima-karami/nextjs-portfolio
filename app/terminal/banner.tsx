import { profile } from '../data/profile';

// Terminal welcome shown on load.
export default function Banner() {
  return (
    <div className="text-term-dim mb-4">
      <p className="text-term-fg">
        {profile.name} — {profile.title}
      </p>
      <p>
        Ask me anything about my work — or type{' '}
        <span className="text-term-accent">/help</span> for commands.
      </p>
      <p className="mt-1 opacity-80">
        psst — bored? try <span className="text-term-accent">/games</span>.
      </p>
    </div>
  );
}
