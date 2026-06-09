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
  title: 'Nima Karami — Design Engineer / Product Engineer',
  description:
    'The terminal portfolio of Nima Karami, a Toronto-based design engineer and product engineer who takes products from ambiguous idea to shipped experience. Type a command to explore — or play a game.',
  keywords: [
    'Nima Karami',
    'Design Engineer',
    'Product Engineer',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'Toronto',
    'portfolio',
  ],
  authors: [{ name: 'Nima Karami' }],
  openGraph: {
    title: 'Nima Karami — terminal portfolio',
    description:
      'A Toronto-based design engineer / product engineer. Explore the résumé through an interactive terminal.',
    type: 'website',
    siteName: 'Nima Karami',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Karami — terminal portfolio',
    description:
      'Design Engineer / Product Engineer. Explore via an interactive terminal.',
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
