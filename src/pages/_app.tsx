import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Head from 'next/head';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from '@/components/layout';
import { ThemeProvider } from '@/contexts/theme-context';
import '@/styles/globals.css';

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
        <AnimatePresence mode="wait" initial={false}>
          <main
            className={clsx(
              'bg-neutral flex h-full w-full flex-col ',
              inter.variable,
              calSans.variable
            )}
          >
            <Layout>
              <motion.div
                key={router.route}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={clsx('h-full w-full')}
              >
                <Component {...pageProps} />
              </motion.div>
            </Layout>
          </main>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}
