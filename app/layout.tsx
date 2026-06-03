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
  title: 'Nima Karami — terminal',
  description:
    'The terminal portfolio of Nima Karami, a Lead Full-stack Developer and UX/UI Designer. Type a command to explore.',
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
