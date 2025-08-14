import React from 'react';
import MainCards from '../Cards/MainCards';

const HomePage = () => {
  return (
    <>
<section className="relative bg-gradient-to-r from-purple-700 via-purple-500 to-blue-600 h-screen text-white overflow-hidden ">
  {/* Background Image with Gradient */}
  <div className="absolute inset-0 ">
    <img
      src="https://theglowmemo.com/.image/t_share/MTk3NjA4MDkzMDY2OTk1NTA2/the-ordinary-3000x2000.jpg"
      className="w-full h-full object-cover"
      alt="Background"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent backdrop-blur-sm"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6 animate-fadeIn mt-10 mb-4">
    {/* Badge */}
    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold mb-4 shadow-md">
      ✨ Best Seller
    </span>

    {/* Title */}
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-snug mb-6 drop-shadow-lg animate-slideUp">
      Simple Skincare. <br className="hidden md:block" />
      Serious Results.
    </h1>

    {/* Subtitle */}
    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-6 animate-slideUp delay-200">
      A powerful, lightweight serum made for men. Hydrates, smooths, and energizes your skin—without the fuss.
    </p>

    {/* Features */}
    <ul className="text-sm md:text-base text-gray-300 mb-8 space-y-1 animate-slideUp delay-400">
      <li>✔️ Lightweight & non-greasy formula</li>
      <li>✔️ Fights dullness, dryness, and fatigue</li>
      <li>✔️ Clean ingredients. Fast results.</li>
    </ul>

    {/* CTA */}
    <a
      href="#"
      className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50 animate-bounceSlow"
    >
      Shop Now
    </a>
  </div>

  {/* Tailwind animations */}
  <style >{`
    .animate-fadeIn {
      animation: fadeIn 1.2s ease-in-out forwards;
    }
    .animate-slideUp {
      opacity: 0;
      transform: translateY(20px);
      animation: slideUp 0.8s ease-in-out forwards;
    }
    .delay-200 { animation-delay: 0.2s; }
    .delay-400 { animation-delay: 0.4s; }
    .animate-bounceSlow {
      animation: bounce 2.5s infinite;
    }
    @keyframes fadeIn {
      to { opacity: 1; }
    }
    @keyframes slideUp {
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
</section>

 <main className="min-h-screen mt-16">
  <div className="bg-gray-100 p-6">
    <MainCards />
    </div>
  </main>
    {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "This skincare line transformed my routine. My skin has never looked better!"
                </p>
                <p className="font-medium text-gray-800">- Alex Johnson</p>
              </div>
            ))}
          </div>
        </div>
      </section>
</>

  );
};

export default HomePage;