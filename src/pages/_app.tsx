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
        <title>Nima Karami | Lead Full-stack Developer</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Nima Karami | Portfolio" />
        <meta name="author" content="Nima Karami" />
        <meta
          name="keywords"
          content="Nima Karami, Portfolio, Developer, Fullstack Developer, React Developer, NextJS Developer, Web Developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Nima Karami | Fullstack Developer | UX Designer"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Toronto-based Fullstack Developer and UX Designer"
        />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:url" content="https://www.nima-karami.com" />
        <meta property="og:site_name" content="Nima Karami Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nimakarami" />
        <meta
          name="twitter:title"
          content="Nima Karami | Lead Fullstack Developer | UX Designer"
        />
        <meta
          name="twitter:description"
          content="Toronto-based Fullstack Developer and UX Designer"
        />
        <meta name="twitter:image" content="/preview.png" />
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
            {process.env.NODE_ENV === 'production' && (
              <>
                <SpeedInsights />
                <Analytics />
              </>
            )}
          </Layout>
        </main>
      </ThemeProvider>
    </>
  );
}
