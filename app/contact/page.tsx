export default function ContactPage() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="font-jura text-ink text-3xl font-light tracking-wide uppercase">
        Get in Touch
      </h1>
      <p className="text-ink-soft max-w-sm">
        Have a project in mind or just want to say hello? I&apos;d love to hear
        from you.
      </p>
      <a
        href="mailto:karami.nima@gmail.com"
        className="bg-accent rounded-full px-6 py-3 text-sm font-medium text-white shadow transition hover:opacity-90"
      >
        Say hello
      </a>
    </div>
  );
}
