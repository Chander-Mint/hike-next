'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AdminLoader from './components/AdminLoader';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        if (status === 'unauthenticated' && !isLoginPage) {
            router.push('/admin/login');
        }

        if (status === 'authenticated' && isLoginPage) {
            router.push('/admin');
        }
    }, [status, isLoginPage, router]);

    if (status === 'authenticated' && isLoginPage) {
        return null;
    }

    if (status === 'loading') {
        return <AdminLoader />;
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    if (status === 'unauthenticated') {
        return null;
    }
    return (
        <>

            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
