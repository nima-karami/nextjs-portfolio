export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-jura text-ink text-3xl font-light tracking-wide uppercase">
        Experience
      </h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="glass-panel flex-1 p-5">
          <h2 className="font-jura text-ink text-lg">TimePlay</h2>
          <p className="text-ink-soft text-sm">
            Lead Fullstack Developer · 2022–Present
          </p>
        </div>
        <div className="glass-panel flex-1 p-5">
          <h2 className="font-jura text-ink text-lg">Functionland</h2>
          <p className="text-ink-soft text-sm">
            UX Designer &amp; Web Developer · 2021–2022
          </p>
        </div>
      </div>
    </div>
  );
}
