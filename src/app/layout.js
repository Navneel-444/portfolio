'use client'
import '@/styles/main.scss';
import Navigation from '@/app/ui/navigation/Navigation.jsx';
import MobileNav from './ui/MobileNav/MobileNav';
import { JetBrains_Mono } from 'next/font/google'
import { useState, useEffect } from 'react';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  fallback: ['Consolas', 'monospace', 'Source Code Pro', 'Menlo']
})

export default function RootLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const windowResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    windowResize();
    window.addEventListener('resize', windowResize);

    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);
  return (
    <html lang="en" className={jetbrains.className}>
      <body>
        {isMobile ? <MobileNav /> : <Navigation />}
        {children}
      </body>
    </html>
  );
}