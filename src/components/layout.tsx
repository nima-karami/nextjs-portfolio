import { PropsWithChildren } from 'react';

import { useRouter } from 'next/router';

import CustomCursor from './custom-cursor';
import DynamicBg from './dynamic-bg';
import Navbar from './navbar';
import ThemeController from './theme-controller';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const navbarVisible = router.pathname !== '/';

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {navbarVisible && <Navbar />}
      {children}
      <DynamicBg />
      <CustomCursor />
      <ThemeController />
    </div>
  );
};

export default Layout;
