import '@/styles/main.scss';
import Navigation from '@/app/ui/navigation/Navigation.jsx';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}