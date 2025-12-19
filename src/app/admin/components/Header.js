'use client';
import { Icon } from '@iconify/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';

function formatTitle(path) {
    const segments = path.split('/').filter(Boolean);
    const last = segments[segments.length - 1];

    if (!last) return 'Dashboard';

    const isId = /^[0-9a-fA-F]{24}$/.test(last) || /^[0-9]+$/.test(last) || /^[0-9a-fA-F-]{36}$/.test(last);

    if (isId) return '';

    return last
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}


export default function Header({ title, subtitle, actions = null }) {
    const router = useRouter();
    const pathname = usePathname();
    const dynamicTitle = title || formatTitle(pathname);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const goBack = () => router.back();
    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const handleLogout = () => {
        signOut({ callbackUrl: '/admin/login' })
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b mb-6">
            <div className="flex items-start md:items-center space-x-2">
                <button
                    onClick={goBack}
                    className="p-2 ml-2 rounded hover:bg-gray-100 text-gray-700 transition"
                    aria-label="Go back"
                >
                    <span className="text-xl font-bold"><Icon icon="stash:signout-alt" width="34" height="34" /></span>
                </button>
                <div>
                    <h1 className="text-2xl font-bold">{dynamicTitle}</h1>
                    {subtitle && <p className="text-base text-gray-500">{subtitle}</p>}
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {actions && <div className="flex space-x-2">{actions}</div>}

                <div className="relative mr-16" ref={dropdownRef}>
                    <button
                        onClick={toggleDropdown}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                        <span className="text-lg font-semibold">👤</span>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-30 bg-white border shadow-md rounded-md z-50">
                            {/* <button
                                onClick={() => {
                                    router.push('/admin/profile');
                                    setDropdownOpen(false);
                                }}
                                className="w-full text-left px-2 py-2 hover:bg-gray-100 flex"
                            >
                                <Icon icon="material-symbols:person" width="24" height="24" />
                                Profile
                            </button> */}
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-2 py-2 hover:bg-gray-100 flex"
                            >
                                <Icon icon="material-symbols:logout" width="24" height="24" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
