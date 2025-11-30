import React from 'react';
import { FaLeaf, FaFlask, FaChessPawn, FaCreativeCommonsNcEu } from 'react-icons/fa';
import Section from '../UI/Section';
import Button from '../UI/Button';

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-stone-50 flex items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-accent font-medium tracking-widest text-sm uppercase mb-4 block animate-fade-in">
            Since 2020
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-primary mb-8 leading-tight">
            Our Story
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed font-light">
            One Drop was born from a simple belief - that one drop of the right ingredients can transform your skin.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <Section className="bg-white">
          <div className="lg:flex items-center gap-20">
            <div className="lg:w-1/2 mb-10 lg:mb-0 relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/20 rounded-lg transform -translate-x-2 -translate-y-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883" 
                alt="Skincare serum bottle"
                className="relative rounded-lg shadow-2xl w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-serif font-medium text-primary mb-8">Our Mission</h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                At One Drop, we're revolutionizing skincare by harnessing the power of concentrated, 
                scientifically-proven ingredients in their purest form. Our signature serum delivers 
                transformative results with just one drop.
              </p>
              <p className="text-lg text-stone-600 mb-10 leading-relaxed">
                We believe in quality over quantity, purity over fillers, and results over hype. 
                Every bottle is crafted with meticulous attention to detail and a commitment to 
                sustainable beauty.
              </p>
              <Button to="/shop" variant="primary">
                Discover Our Serum
              </Button>
            </div>
          </div>
      </Section>

      {/* Values Section */}
      <Section className="bg-stone-50">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-4xl font-serif font-medium text-primary mb-4">Our Core Values</h2>
             <p className="text-stone-500">The principles that guide everything we do.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard 
              icon={FaLeaf} 
              title="Pure Ingredients" 
              desc="We use only the purest, most effective ingredients nature and science can provide." 
            />
            <ValueCard 
              icon={FaFlask} 
              title="Science-Backed" 
              desc="Every formula is developed with dermatologists and clinically tested for results." 
            />
            <ValueCard 
              icon={FaChessPawn} 
              title="Luxury Experience" 
              desc="From packaging to application, we deliver a sensorial experience that delights." 
            />
            <ValueCard 
              icon={FaCreativeCommonsNcEu} 
              title="Sustainable Beauty" 
              desc="We're committed to ethical sourcing and environmentally responsible practices." 
            />
          </div>
      </Section>

      {/* Founder Section */}
      <Section className="bg-white">
          <div className="lg:flex items-center gap-20 flex-row-reverse">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e" 
                alt="Founder"
                className="rounded-lg shadow-xl w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-serif font-medium text-primary mb-8">Meet Our Founder</h2>
              <blockquote className="text-xl text-stone-600 mb-8 italic font-serif leading-relaxed border-l-4 border-accent pl-6">
                "After years of struggling with sensitive skin and ineffective products, I set out to create 
                something different. One Drop is the culmination of my journey - a serum that actually works, 
                with no unnecessary additives."
              </blockquote>
              <div className="mb-6">
                <p className="text-lg font-bold text-primary">— Dr. Emily Chen</p>
                <p className="text-stone-500">Dermatologist and Founder</p>
              </div>
              <p className="text-stone-600 leading-relaxed">
                Board-certified dermatologist with over 15 years of experience in cosmetic chemistry.
              </p>
            </div>
          </div>
      </Section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8">Experience the One Drop Difference</h2>
          <p className="text-xl text-stone-300 mb-10 max-w-2xl mx-auto font-light">
            Join thousands of customers who have transformed their skin with our revolutionary serum.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/shop" variant="white" size="lg">
              Shop Now
            </Button>
            <Button to="/about" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

const ValueCard = ({ icon: Icon, title, desc }) => (
  <div className="text-center p-8 rounded-xl bg-white border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex justify-center mb-6">
      <div className="w-14 h-14 bg-stone-50 rounded-full flex items-center justify-center text-accent">
         <Icon className="text-2xl" />
      </div>
    </div>
    <h3 className="text-xl font-serif font-medium text-primary mb-3">{title}</h3>
    <p className="text-stone-500 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);

export default About;