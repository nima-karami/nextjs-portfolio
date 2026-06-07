import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { PostHogProvider } from './providers';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: 'Nima Karami — Full-stack Developer & UX/UI Designer',
  description:
    'The terminal portfolio of Nima Karami, a Toronto-based Lead Full-stack Developer and UX/UI Designer. Type a command to explore — or play a game.',
  keywords: [
    'Nima Karami',
    'Full-stack Developer',
    'UX/UI Designer',
    'React',
    'Next.js',
    'Toronto',
    'portfolio',
  ],
  authors: [{ name: 'Nima Karami' }],
  openGraph: {
    title: 'Nima Karami — terminal portfolio',
    description:
      'A Toronto-based Lead Full-stack Developer & UX/UI Designer. Explore the résumé through an interactive terminal.',
    type: 'website',
    siteName: 'Nima Karami',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nima Karami — terminal portfolio',
    description:
      'Lead Full-stack Developer & UX/UI Designer. Explore via an interactive terminal.',
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
