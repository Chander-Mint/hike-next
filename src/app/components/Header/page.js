'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../(website)/context/CartContext';
import { usePathname } from 'next/navigation';

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
    const [navLinks, setNavLinks] = useState([
        {
            name: "HOME",
            href: "/",
        },
        { name: "ABOUT US", href: "/about-us" },
        { name: "CONTACT", href: "/contact" },
    ]);
    const [error, setError] = useState(null);
    const { getCartCount } = useCart();
    const [logo, setLogo] = useState('')
    const cartCount = getCartCount();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchHeaderData = async () => {
        try {
            const data = await Promise.all([
                fetch('/api/category'),
                fetch('/api/generalSettings')
            ])

            const [categoryRes, settingsRes] = await Promise.all([
                data[0].json(),
                data[1].json()
            ]);

            const categories = categoryRes?.categories;
            const settings = settingsRes?.settings;

            const dynamicNavLinks = categories?.map((category) => ({
                name: category?.name.toUpperCase(),
                href: `/${category?.slug}`,
            }));

            const updatedNavLinks = [
                {
                    name: "HOME",
                    href: "/",
                },
                ...dynamicNavLinks,
                { name: "ABOUT US", href: "/about-us" },
                { name: "CONTACT", href: "/contact" },
            ];

            setNavLinks(updatedNavLinks);
            localStorage.setItem('selectedHome', `Home${settings?.themeType}`);

            setLogo(settings?.logo);

            localStorage.setItem('hikeSettings', JSON.stringify(settings));

        }
        catch (error) {
            setError('Failed to fecth header data.');
        }
    }

    useEffect(() => {
        fetchHeaderData();
    }, [])

    if (error) {
        console.error('Error fetching categories:', error);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isHomeDropdownOpen) setIsHomeDropdownOpen(false);
    };

    const toggleHomeDropdown = () => {
        setIsHomeDropdownOpen(!isHomeDropdownOpen);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#333] backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="block w-[60px]" >
                        <Image
                            src={logo || "/hike_logo.png"}
                            alt="Hike"
                            width={100}
                            height={100}
                            className="object-contain"
                            sx={{ height: '100% !important' }}
                        />
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks?.map((link) => (
                            <div key={link?.name} className="relative">
                                {link.dropdown ? (
                                    <>
                                        <button
                                            onClick={toggleHomeDropdown}
                                            className={`text-sm lg:text-sm font-semibold tracking-wider ${pathname.split('?')[0] === link.href.split('?')[0] ||
                                                link.dropdown.some(item => pathname.split('?')[0] === item.href.split('?')[0])
                                                ? "text-orange-700"
                                                : "text-white"
                                                } hover: white transition-colors duration-200`}
                                        >
                                            {link?.name} ▼
                                        </button>
                                        {isHomeDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-2 bg-orange-700 bg-opacity-100 backdrop-blur-sm rounded-md shadow-lg py-3 w-48">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={`block px-4 py-2 text-sm font-semibold tracking-wider ${pathname.split('?')[0] === item.href.split('?')[0]
                                                            ? "text-white"
                                                            : "text-white"
                                                            } hover:text-gray-700 transition-colors duration-200`}
                                                        onClick={() => {
                                                            setIsHomeDropdownOpen(false);
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={link?.href}
                                        className={`text-xs lg:text-sm font-semibold tracking-wider ${pathname.split('?')[0] === link.href.split('?')[0]
                                            ? "text-orange-700"
                                            : "text-white"
                                            } hover:text-orange-700 transition-colors duration-200`}
                                    >
                                        {link?.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="flex items-center space-x-5">
                            <button className="text-white hover:text-orange-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <Link href="/cart" className="text-white hover:text-orange-700">
                                <div className="relative flex">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="absolute -top-2 -right-2 bg-orange-700 text-black text-[10px] lg:text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </nav>

                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>

                {isMenuOpen && (
                    <nav className="md:hidden bg-black bg-opacity-90 backdrop-blur-sm mt-2 py-4">
                        <div className="flex flex-col items-center space-y-4">
                            {navLinks?.map((link) => (
                                <div key={link?.name}>
                                    {link.dropdown ? (
                                        <>
                                            <button
                                                onClick={toggleHomeDropdown}
                                                className={`text-xs lg:text-sm font-bold tracking-wider ${pathname.split('?')[0] === link.href.split('?')[0] ||
                                                    link.dropdown.some(item => pathname.split('?')[0] === item.href.split('?')[0])
                                                    ? "text-orange-700"
                                                    : "text-white"
                                                    } hover:text-orange-700 transition-colors duration-200`}
                                            >
                                                {link?.name} ▼
                                            </button>
                                            {isHomeDropdownOpen && (
                                                <div className="flex flex-col items-center space-y-2 mt-2">
                                                    {link.dropdown.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className={`text-xs font-bold tracking-wider ${pathname.split('?')[0] === item.href.split('?')[0]
                                                                ? "text-orange-700"
                                                                : "text-white"
                                                                } hover:text-orange-700 transition-colors duration-200`}
                                                            onClick={() => {
                                                                setIsMenuOpen(false);
                                                                setIsHomeDropdownOpen(false);
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={link?.href}
                                            className={`text-xs lg:text-sm font-bold tracking-wider ${pathname.split('?')[0] === link.href.split('?')[0]
                                                ? "text-orange-700"
                                                : "text-white"
                                                } hover:text-orange-700 transition-colors duration-200`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link?.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="flex items-center space-x-5">
                                <button className="text-white hover:text-orange-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                <Link href="/cart" className="text-white hover:text-orange-700" onClick={() => setIsMenuOpen(false)}>
                                    <div className="relative flex">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="absolute -top-2 -right-2 bg-orange-700 text-black text-[10px] lg:text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}