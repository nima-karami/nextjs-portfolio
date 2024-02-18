import { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';

import CustomCursor from './custom-cursor';
import DynamicBg from './dynamic-bg';
import Navbar from './navbar';
import ThemeController from './theme-controller';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const navbarVisible = router.pathname !== '/';

  return (
    <>
      {navbarVisible && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-full w-full flex-col overflow-hidden"
        >
          <CustomCursor />
          {children}
        </motion.div>
      </AnimatePresence>
      <DynamicBg />
      <ThemeController />
    </>
  );
};

export default Layout;
