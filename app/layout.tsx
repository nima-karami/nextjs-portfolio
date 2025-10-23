import type { Metadata } from 'next';
import { Jura, Roboto } from 'next/font/google';

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
    'Portfolio website of Nima Karami, a web developer and designer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jura.variable} ${roboto.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
