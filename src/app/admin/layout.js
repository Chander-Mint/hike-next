'use client';

import { SessionProvider } from 'next-auth/react'
import AdminLayout from './AdminLayout';
import { Toaster } from 'react-hot-toast';
import '@/src/app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          richColors
          duration={3000}
          toastOptions={{
            style: { zIndex: 9999 },
          }}
        />
        <SessionProvider>
          <AdminLayout>
            {children}
          </AdminLayout>
        </SessionProvider>
      </body>
    </html>
  );
}