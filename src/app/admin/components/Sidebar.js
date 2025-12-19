'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, status } = useSession();

  const settings = JSON.parse(localStorage.getItem('hikeSettings'));

  if (status === 'loading') {
    return null;
  }

  let menuItems = [
    { title: 'Dashboard', icon: 'mdi:view-dashboard-outline', path: '/admin' },
    { title: 'Categories', icon: 'mdi:format-list-bulleted-type', path: '/admin/categories' },
    { title: 'Events', icon: 'mdi:calendar-multiselect', path: '/admin/events' },
    { title: 'Blog Posts', icon: 'mdi:note-text-outline', path: '/admin/blog-posts' },
    { title: 'Bookings', icon: 'mdi:calendar-check-outline', path: '/admin/bookings' },
    { title: 'Testimonials', icon: 'mdi:comment-account-outline', path: '/admin/testimonials' },
    { title: 'Queries', icon: 'mdi:chat-question', path: '/admin/queries' },
    { title: 'Gallery', icon: 'mdi:image-multiple-outline', path: '/admin/gallery' },
  ];

  if (session?.user?.role === 'superAdmin') {
    menuItems.push({ title: 'Settings', icon: 'mdi:cog-outline', path: '/admin/settings' });
  }

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-gray-900 p-4 text-white fixed top-0 left-0 right-0 z-50">
        <h1 className="text-xl font-semibold">
          <Link href="/admin" className="flex items-center">
            <Image
              src={settings?.logo || "/hike_logo.png"}
              alt="Hike"
              width={60}
              height={20}
              className="object-contain"
            />
            Hike Admin
          </Link>
        </h1>
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Icon icon="mdi:menu" className="text-3xl" />
        </button>
      </div>

      <aside
        className={`bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:h-auto`}
      >
        <div className="p-4 border-b border-gray-700 hidden md:block">
          <h1 className="text-lg font-semibold tracking-wide">
            <Link href="/admin" className="flex items-center justify-center">
              <Image
                src={"/hike_logo.png"}
                alt="Hike"
                width={60}
                height={20}
                className="object-cover"
                sx={{ height: '40px !important' }}
              />
            </Link>
          </h1>
        </div>

        <nav className="mt-6 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition duration-200 ${pathname === item.path
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon icon={item.icon} className="text-xl mr-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="md:hidden h-16" />
    </>
  );
}
