import { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import DynamicBg from './dynamic-bg';
import Navbar from './navbar';
import ThemeController from './theme-controller';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const navbarVisible = router.pathname !== '/';

  return (
    <div className="flex min-h-screen flex-col">
      {navbarVisible && <Navbar />}
      {children}
      <DynamicBg />
      <ThemeController />
    </div>
  );
};

export default Layout;
