'use client';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const slides = [
  {
    bg: '/slide4.jpeg',
    title: 'SUNRISE ON PEAKS',
    name: 'Sunrise',
    des: 'Witness the serene beauty of the sunrise over majestic mountain peaks. A moment of pure tranquility.'
  },
  {
    bg: '/slide3.jpeg',
    title: 'RUGGED ROCKS',
    name: 'Rocky',
    des: "Explore the rugged beauty of barren rocky mountains. A testament to nature's raw power."
  },
  {
    bg: '/slide1.jpeg',
    title: 'FOREST PATHWAY',
    name: 'Forest',
    des: 'A peaceful trail through dense green forests. Perfect for reconnecting with nature.'
  },
  {
    bg: '/slide2.jpg',
    title: 'COLORFUL MEADOW',
    name: 'Meadow',
    des: 'A colorful meadow filled with butterflies and blooming flowers. Nature at its best.'
  },
  {
    bg: '/slide5.jpeg',
    title: 'SERENE LAKE',
    name: 'Lake',
    des: 'A calm and serene lake surrounded by towering trees and mountains. A perfect escape.'
  }
];

const TIME_AUTO_NEXT = 3000;

const Slider = () => {
  const [items, setItems] = useState(slides);
  const [activeIndex, setActiveIndex] = useState(1);
  const progressRef = useRef(null);
  const intervalRef = useRef(null);

  const goToNext = () => {
    const newList = [...items];
    const first = newList.shift();
    newList.push(first);
    setItems(newList);
    updateAfterSlide(newList);
  };

  const goToPrev = () => {
    const newList = [...items];
    const last = newList.pop();
    newList.unshift(last);
    setItems(newList);
    updateAfterSlide(newList);
  };

  const updateAfterSlide = (updatedList) => {
    const index = slides.indexOf(updatedList[1]);
    setActiveIndex(index + 1);

    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      setTimeout(() => {
        progressRef.current.style.transition = `width ${TIME_AUTO_NEXT}ms linear`;
        progressRef.current.style.width = `${((index + 1) / slides.length) * 100}%`;
      }, 50);
    }
  };

  // Autoplay Setup
  useEffect(() => {
    intervalRef.current = setInterval(goToNext, TIME_AUTO_NEXT);

    return () => clearInterval(intervalRef.current);
  }, [items]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-rubik">
      {/* Slides */}
      <div className="absolute inset-0 overflow-hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute bg-cover bg-center transition-all duration-1000 ease-in-out ${
              index === 1
                ? 'w-full h-full z-20 animate-fadeSlideUp'
                : 'w-[200px] h-[250px] bottom-36 z-10'
            }`}
            style={{
              backgroundImage: `url(${item.bg})`,
              left: index === 1 ? '0%' : `calc(75% + ${(index - 2) * 220}px)`,
              top: index === 1 ? '0' : 'auto',
              borderRadius: index === 1 ? '0px' : '16px',
              boxShadow: index === 1 ? 'none' : '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            {index === 1 && (
              <div className="absolute bottom-16 left-10 text-white max-w-lg animate-fadeSlideUp">
                <h2 className="text-4xl md:text-5xl font-bold mb-2 uppercase">{item.title}</h2>
                <h4 className="text-xl text-orange-400 mb-3">{item.name}</h4>
                <p className="text-white text-sm md:text-base">{item.des}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Arrows + Progress + Slide Number */}
      <div className="absolute bottom-12 left-[55%] w-[40%] flex items-center gap-6 z-50">
        <button
          onClick={() => {
            clearInterval(intervalRef.current);
            goToPrev();
            intervalRef.current = setInterval(goToNext, TIME_AUTO_NEXT);
          }}
          className="w-10 h-10 border border-white rounded-full text-white text-xl flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <button
          onClick={() => {
            clearInterval(intervalRef.current);
            goToNext();
            intervalRef.current = setInterval(goToNext, TIME_AUTO_NEXT);
          }}
          className="w-10 h-10 border border-white rounded-full text-white text-xl flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          <i className="bi bi-arrow-right"></i>
        </button>

        <div className="ml-auto text-white text-lg tracking-widest">
          {activeIndex.toString().padStart(2, '0')}/{slides.length}
        </div>

        <div className="w-1/2 h-[3px] bg-white bg-opacity-30 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-orange-500 transition-all duration-1000 ease-in-out"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
