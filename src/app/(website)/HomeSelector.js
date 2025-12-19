'use client';
import { useState, useEffect } from 'react';
import Home from "@/src/app/components/Home/page";
import Template2 from "@/src/app/(website)/template-2/page";
import Template3 from "@/src/app/(website)/template-3/page";
import Template4 from "@/src/app/(website)/template-4/page";
import Template5 from './template-5/page';

export default function HomeSelector({ homeData }) {
  const [selectedTheme, setSelectedTheme] = useState('Home1');

  const updateTheme = () => {
    const theme = localStorage.getItem('selectedHome') || 'Home1';
    setSelectedTheme(theme);
  };

  useEffect(() => {
    updateTheme();

    const handleStorageChange = (event) => {
      if (event.key === 'selectedHome') {
        updateTheme();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [localStorage.getItem('selectedHome')]);

  return (

    <div>
      {selectedTheme === 'Home1' ? <Home data={homeData} /> :
        selectedTheme === 'Home2' ? <Template2 data={homeData} /> :
          selectedTheme === 'Home3' ? <Template3 data={homeData} /> :
            selectedTheme === 'Home4' ? <Template4 data={homeData} /> :
              selectedTheme === 'Home5' ? <Template5 data={homeData} /> :

                <Home data={homeData} />}

    </div>
  );
}