import React from 'react';
import MainCards from '../Cards/MainCards';

const HomePage = () => {
  return (
    <>
<section className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
  <div className="absolute inset-0">
    <img
      src="https://theglowmemo.com/.image/t_share/MTk3NjA4MDkzMDY2OTk1NTA2/the-ordinary-3000x2000.jpg"
      className="w-full h-full object-cover"
      alt="Background"
    />
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-snug mb-6">
      Simple Skincare. <br className="hidden md:block" />
      Serious Results.
    </h1>

    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-6">
      A powerful, lightweight serum made for men. Hydrates, smooths, and energizes your skin—without the fuss.
    </p>

    {/* <ul className="text-sm md:text-base text-gray-300 mb-8 space-y-1">
      <li>✔️ Lightweight & non-greasy formula</li>
      <li>✔️ Fights dullness, dryness, and fatigue</li>
      <li>✔️ Clean ingredients. Fast results.</li>
    </ul> */}

    <a
      href="#"
      className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      Shop Now
    </a>
  </div>
 
</section>
 <main className="min-h-screen mt-16">
  <div className="bg-gray-100 p-6">
    <MainCards />
    </div>
  </main>
</>

  );
};

export default HomePage;