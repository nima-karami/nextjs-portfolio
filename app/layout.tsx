import type { Metadata } from 'next';
import { Jura, Roboto } from 'next/font/google';

import { SpeedInsights } from '@vercel/speed-insights/next';

import GlassShell from './shell/glass-shell';
import { PostHogProvider } from './providers';
import './globals.css';

const jura = Jura({
  variable: '--font-jura',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nima Karami',
  description:
    'Website of Nima Karami, a Lead Full-stack Developer and UX/UI Designer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jura.variable} ${roboto.variable} antialiased`}>
        <PostHogProvider>
          <GlassShell>{children}</GlassShell>
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
