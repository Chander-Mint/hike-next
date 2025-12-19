import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerFive = () => {
  return (
    <div className="relative">

      {/* Banner */}
      <div className="relative h-screen bg-cover bg-center py-5" style={{ backgroundImage: "url('/banner2.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
          <div >
            <div className="text-center">
              <img src="/banner-imgg.png" width={100} className='mx-auto mb-3'></img>
              <h4 className="font-new text-white text-3xl">Discover the</h4></div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Adventure Travel</h1>
            <p className="text-xl text-white mb-6">Your best Adventure Deals with nature.</p>
            <button className="bg-orange-700 text-white px-6 py-3 hover:bg-black transition">View Adventures</button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <img src="/mask-img.png" className="w-full h-auto" alt="Bannermask" />
        </div>

      </div>
    </div>
  );
};

export default BannerFive;