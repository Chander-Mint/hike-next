'use client';

import { usePathname } from 'next/navigation';
import Header from '@/src/app/components/Header/page';
import Footer from '@/src/app/components/Footer/page';
import { CartProvider } from '@/src/app/(website)/context/CartContext';

export default function WebLayout({ children }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            {isAdminRoute ? (
                <div className="admin-layout">{children}</div>
            ) : (
                <CartProvider>
                    <div className="main-layout">
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </div>
                </CartProvider>
            )}

        </>
    );
}