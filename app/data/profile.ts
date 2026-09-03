// Single source of the site's identity copy: the banner, the intro overlay, `whoami`,
// `about`, `resume` and the sr-only SEO block all read from here. `title` is the
// positioning line and is kept in sync with LinkedIn and the career MCP corpus.
export const profile = {
  name: 'Nima Karami',
  title:
    'Senior Software Engineer · Full-stack product engineer · AI-native · Architect by training',
  location: 'Toronto, Ontario, Canada',
  tagline:
    'Product engineer who takes things from ambiguous idea to shipped software, across the whole stack.',
  bio: [
    'Product engineer who takes things from ambiguous idea to shipped software, across the whole stack. I trained as an architect, which taught me to hold messy, multi-dimensional problems in my head until the through-line appears; I now use that to decompose problems, decide what gets built, and own what happens after it ships.',
    'Senior engineer at TimePlay, where I own the web client of a real-money gaming platform and built the backend pieces it needed. On my own time I build AI-native products end to end (React, TypeScript, Node, Python, GCP), and for the last year most of that code is written by coding agents I direct and verify: github.com/nima-karami/conduit is the open-source editor I built for exactly that.',
    'Design is where I started and it still shows in the work. Toronto, in person.',
  ],
  email: 'karami.nima@live.com',
} as const;
