import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return <>{children}</>;
};
