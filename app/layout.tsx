import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';
import { PostHogProvider } from './providers';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  // Trimmed to the first two segments of the positioning line: the whole headline
  // runs past what a browser tab or a search result will actually show.
  title: 'Nima Karami · Senior Software Engineer · Full-stack product engineer',
  description:
    'The terminal portfolio of Nima Karami, a Toronto-based senior software engineer and full-stack product engineer who takes things from ambiguous idea to shipped software. Type a command to explore, or play a game.',
  keywords: [
    'Nima Karami',
    'Senior Software Engineer',
    'Product Engineer',
    'Full-Stack Developer',
    'Design Engineer',
    'AI-native',
    'React',
    'Next.js',
    'Toronto',
    'portfolio',
  ],
  authors: [{ name: 'Nima Karami' }],
  openGraph: {
    title: 'Nima Karami · terminal portfolio',
    description:
      'A Toronto-based senior software engineer and full-stack product engineer. Explore the résumé through an interactive terminal.',
    type: 'website',
    siteName: 'Nima Karami',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Karami · terminal portfolio',
    description:
      'Senior Software Engineer · Full-stack product engineer · AI-native · Architect by training. Explore via an interactive terminal.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="antialiased">
        <PostHogProvider>
          {children}
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
