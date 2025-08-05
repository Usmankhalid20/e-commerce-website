import React from 'react';
import { FaLeaf, FaFlask, FaChessPawn, FaCreativeCommonsNcEu } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-rose-100 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">Our Story</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              One Drop was born from a simple belief - that one drop of the right ingredients can transform your skin.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex items-center gap-16">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883" 
                alt="Skincare serum bottle"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At One Drop, we're revolutionizing skincare by harnessing the power of concentrated, 
                scientifically-proven ingredients in their purest form. Our signature serum delivers 
                transformative results with just one drop.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                We believe in quality over quantity, purity over fillers, and results over hype. 
                Every bottle is crafted with meticulous attention to detail and a commitment to 
                sustainable beauty.
              </p>
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-medium transition duration-300">
                Discover Our Serum
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 font-serif">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-rose-50">
              <div className="flex justify-center mb-4">
                <FaLeaf className="text-4xl text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pure Ingredients</h3>
              <p className="text-gray-700">
                We use only the purest, most effective ingredients nature and science can provide.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-rose-50">
              <div className="flex justify-center mb-4">
                <FaFlask className="text-4xl text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Science-Backed</h3>
              <p className="text-gray-700">
                Every formula is developed with dermatologists and clinically tested for results.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-rose-50">
              <div className="flex justify-center mb-4">
                <FaChessPawn className="text-4xl text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Luxury Experience</h3>
              <p className="text-gray-700">
                From packaging to application, we deliver a sensorial experience that delights.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-rose-50">
              <div className="flex justify-center mb-4">
                <FaCreativeCommonsNcEu className="text-4xl text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable Beauty</h3>
              <p className="text-gray-700">
                We're committed to ethical sourcing and environmentally responsible practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex items-center gap-16 flex-row-reverse">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e" 
                alt="Founder"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Meet Our Founder</h2>
              <p className="text-lg text-gray-700 mb-6">
                "After years of struggling with sensitive skin and ineffective products, I set out to create 
                something different. One Drop is the culmination of my journey - a serum that actually works, 
                with no unnecessary additives."
              </p>
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-semibold">— Dr. Emily Chen</span>, Dermatologist and Founder
              </p>
              <p className="text-gray-700">
                Board-certified dermatologist with over 15 years of experience in cosmetic chemistry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Experience the One Drop Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of customers who have transformed their skin with our revolutionary serum.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition duration-300">
              Shop Now
            </button>
            <button className="border-2 border-white hover:bg-rose-700 px-8 py-3 rounded-full font-medium transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;