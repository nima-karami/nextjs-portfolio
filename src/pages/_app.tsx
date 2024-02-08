import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Head from 'next/head';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import CustomCursor from '@/components/custom-cursor';
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
        <meta name="description" content="Nima Karami | Portfolio" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <CustomCursor />
      <AnimatePresence mode="wait" initial={false}>
        <main
          className={clsx(
            'grow w-full h-full bg-neutral flex flex-col',
            inter.variable,
            calSans.variable
          )}
        >
          <motion.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx('w-full h-full')}
          >
            <Component {...pageProps} />
          </motion.div>
        </main>
      </AnimatePresence>
    </>
  );
}
