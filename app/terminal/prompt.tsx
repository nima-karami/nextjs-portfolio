// The shell prompt, shared by the live input line and echoed history lines.
export default function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-term-green">visitor@nima</span>
      <span className="text-term-dim"> ~ </span>
      <span className="text-term-accent">$</span>
    </span>
  );
}
