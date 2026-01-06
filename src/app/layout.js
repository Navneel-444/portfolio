import '@/styles/main.scss';
import Navigation from '@/app/ui/navigation/Navigation.jsx';
import MobileNav from './ui/MobileNav/MobileNav';
import PageTimeTracker from './ui/PageTimeTracker/PageTimeTracker';
import { JetBrains_Mono } from 'next/font/google'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  fallback: ['Consolas', 'monospace', 'Source Code Pro', 'Menlo']
})

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={jetbrains.className}>
      <body>
        <PageTimeTracker>
          <Navigation />
          <MobileNav />
          {children}
        </PageTimeTracker>
      </body>
    </html>
  );
}