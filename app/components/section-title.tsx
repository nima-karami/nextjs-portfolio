type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="border-secondary after:dashed-border-b relative p-8 after:block md:p-16">
      <h2 className="font-jura text-3xl font-light text-gray-200">{title}</h2>
      {subtitle && <p className="mt-4 max-w-xl text-gray-400">{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;
