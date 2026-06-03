import { profile } from '../data/profile';

// Placeholder welcome shown on load. Phase 4 replaces this with the ASCII boot
// intro (name rendered as 3D ASCII through the renderer).
export default function Banner() {
  return (
    <div className="text-term-dim mb-4">
      <p className="text-term-fg">
        {profile.name} — {profile.title}
      </p>
      <p>
        Welcome. Type <span className="text-term-accent">help</span> to get
        started.
      </p>
    </div>
  );
}
