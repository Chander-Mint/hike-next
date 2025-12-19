'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { fetchApiData } from '@/src/app/utils/api';
import { useCart } from '@/src/app/(website)/context/CartContext';

export default function HeaderThree() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([
    {
      name: 'Home',
      href: '/',
      dropdown: [
        { name: 'Home1', href: '/home1' },
        { name: 'Home2', href: '/home2' },
        { name: 'Home3', href: '/home3' },
        { name: 'Home4', href: '/home4' },
      ],
    },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/contact' },
  ]);
  const [error, setError] = useState(null);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const pathname = usePathname();
  const selectedTheme = localStorage.getItem('selectedHome') || 'Home1';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchApiData('/api/category');
        const categories = data?.categories;

        const dynamicNavLinks = categories?.map((category) => ({
          name: category?.name.toLowerCase(),
          href: `/${category?.slug}`,
        }));

        const updatedNavLinks = [
          {
            name: 'Home',
            href: '/',
            dropdown: [
              { name: 'Home1', href: '/home1' },
              { name: 'Home2', href: '/home2' },
              { name: 'Home3', href: '/home3' },
              { name: 'Home4', href: '/home4' },
            ],
          },
          ...dynamicNavLinks,
          { name: 'About Us', href: '/about-us' },
          { name: 'Contact', href: '/contact' },
        ];

        setNavLinks(updatedNavLinks);
      } catch (err) {
        setError('Failed to fetch categories. Using default navigation links.');
      }
    };

    fetchCategories();
  }, []);

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

  const storeHomeKey = (key) => {
    localStorage.setItem('selectedHome', key);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* LEFT: Logo + Nav Links */}
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/hike_logo.png"
                alt="Hike"
                width={100}
                height={100}
                className="object-contain"
              />
            </Link>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks?.map((link) => (
                <div key={link.name} className="relative">
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={toggleHomeDropdown}
                        className={`text-md font-600 capitalize tracking-wide ${
                          pathname.split('?')[0] === link.href.split('?')[0] ||
                          link.dropdown.some(
                            (item) => pathname.split('?')[0] === item.href.split('?')[0]
                          )
                            ? 'text-black underline underline-offset-4'
                            : 'text-gray-800 hover:text-black'
                        } transition duration-150`}
                      >
                        {link.name} ▼
                      </button>
                      {isHomeDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg py-2 w-32">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`block px-4 py-2 text-sm font-semibold capitalize ${
                                selectedTheme === item.name ||
                                pathname.split('?')[0] === item.href.split('?')[0]
                                  ? 'text-black underline underline-offset-4'
                                  : 'text-gray-600 hover:text-black'
                              } transition duration-150`}
                              onClick={() => {
                                storeHomeKey(item.name);
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
                      href={link.href}
                      className={`text-md font-600 capitalize tracking-wide ${
                        pathname.split('?')[0] === link.href.split('?')[0]
                          ? 'text-black underline underline-offset-4'
                          : 'text-gray-800 hover:text-black'
                      } transition duration-150`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* RIGHT: Search, Cart Button, Get Started */}
          <div className="flex items-center gap-6">
            {/* Cart as Button */}
            <Link href="/cart">
              <button className="relative flex items-center gap-2 bg-orange-700 hover:bg-gray-700 px-5 py-3 text-md font-medium text-white transition">
                Book a Trip
                <span className="absolute -top-1 -right-2 bg-black text-white shadow-lg text-[10px] font-bold rounded-full h-5 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-gray-800"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 bg-white border-t pt-4 pb-6">
            <div className="flex flex-col items-center space-y-4">
              {navLinks?.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={toggleHomeDropdown}
                        className={`text-sm font-semibold capitalize tracking-wide ${
                          pathname.split('?')[0] === link.href.split('?')[0] ||
                          link.dropdown.some(
                            (item) => pathname.split('?')[0] === item.href.split('?')[0]
                          )
                            ? 'text-black underline underline-offset-4'
                            : 'text-gray-600 hover:text-black'
                        } transition duration-150`}
                      >
                        {link.name} ▼
                      </button>
                      {isHomeDropdownOpen && (
                        <div className="flex flex-col items-center space-y-2 mt-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`text-sm font-semibold capitalize ${
                                selectedTheme === item.name ||
                                pathname.split('?')[0] === item.href.split('?')[0]
                                  ? 'text-black underline underline-offset-4'
                                  : 'text-gray-600 hover:text-black'
                              } transition duration-150`}
                              onClick={() => {
                                storeHomeKey(item.name);
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
                      href={link.href}
                      className={`text-sm font-semibold capitalize tracking-wide ${
                        pathname.split('?')[0] === link.href.split('?')[0]
                          ? 'text-black underline underline-offset-4'
                          : 'text-gray-600 hover:text-black'
                      } transition duration-150`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-4">
                <button className="text-gray-700 hover:text-black">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="relative"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}