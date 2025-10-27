import type { Metadata } from 'next';
import { Jura, Roboto } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Navbar from './components/navbar';
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
  title: 'Nima Karami Portfolio',
  description:
    'Portfolio Website of Nima Karami, a Lead Full-stack Developer and UX/UI Designer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <meta property="og:image" content="/images/og-image.jpg" />
      <body className={`${jura.variable} ${roboto.variable} antialiased`}>
        <Navbar />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
