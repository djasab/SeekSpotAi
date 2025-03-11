import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { TrialProvider } from '@/lib/trial-context';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'SeekSpot',
  description: 'Find local recommendations based on your preferences and budget',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDfIpW1mntHpBheyec-VTQFiKAStyv3gTU&libraries=places,geometry`}
          async
          defer
        ></script>
        <meta name="theme-color" content="#0D1B2A" />
      </head>
      <body className={`${inter.className} dark`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TrialProvider>
            <SiteHeader />
            <div className="min-h-[calc(100vh-8rem)]">
              {children}
            </div>
            <SiteFooter />
            <Toaster />
          </TrialProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}