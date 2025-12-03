import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'InsureCore - Enterprise Insurance Management',
  description: 'Complete Insurance ERP Platform for Modern Enterprises',
  keywords: 'insurance, ERP, management, policies, claims, customers',
  authors: [{ name: 'InsureCore Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}