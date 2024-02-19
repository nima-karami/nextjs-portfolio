import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Head from 'next/head';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Layout from '@/components/layout';
import { ThemeProvider } from '@/contexts/theme-context';
import '@/styles/globals.css';
import cn from '@/util/cn';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const calSans = localFont({
  src: '../../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Nima Karami | Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Nima Karami | Portfolio" />
      </Head>

      <ThemeProvider>
        <main
          className={cn(
            'bg-neutral flex h-full w-full flex-col ',
            inter.variable,
            calSans.variable
          )}
        >
          <Layout>
            <Component {...pageProps} />
            <SpeedInsights />
            <Analytics />
          </Layout>
        </main>
      </ThemeProvider>
    </>
  );
}
