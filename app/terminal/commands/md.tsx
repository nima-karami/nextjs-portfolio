import Markdown from 'markdown-to-jsx';

// Renders inline markdown (**bold**, links) with terminal styling. Used by the
// content commands so data files can stay plain strings.
export function Md({ children }: { children: string }) {
  return (
    <Markdown
      options={{
        forceInline: true,
        overrides: {
          strong: { props: { className: 'text-term-fg font-semibold' } },
          a: {
            props: {
              className: 'text-term-accent underline',
              target: '_blank',
              rel: 'noreferrer',
            },
          },
        },
      }}
    >
      {children}
    </Markdown>
  );
}
