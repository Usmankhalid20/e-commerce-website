import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainCards from '../Cards/MainCards';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star, Tag, Heart, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../UI/Button';
import Section from '../UI/Section';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-stone-50">
        <div className="absolute inset-0 z-0">
           <img
              src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2574&auto=format&fit=crop"
              alt="Background"
              className="w-full h-full object-cover opacity-5"
            />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Text Content */}
            <div className="max-w-xl animate-fade-in-up">
              <span className="text-accent font-medium tracking-widest text-sm uppercase mb-4 block">
                The New Standard
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-primary mb-8 leading-[1.1]">
                Elevate Your Style Without Compromise
              </h1>
              
              <p className="text-lg text-stone-600 mb-10 leading-relaxed max-w-lg">
                Discover premium essentials designed for the modern lifestyle. Quality craftsmanship meets timeless design in our latest collection.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button to="/shop" variant="primary" size="lg">
                  Shop Collection
                </Button>
                <Button to="/about" variant="outline" size="lg">
                  Our Story
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
               <div className="relative z-10 w-full max-w-md">
                 <div className="absolute -inset-4 bg-accent/10 rounded-full blur-3xl"></div>
                 <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                    alt="Fashion Model"
                    className="relative rounded-t-[10rem] rounded-b-[2rem] shadow-2xl object-cover aspect-[3/4] w-full"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <div className="bg-primary text-white py-12 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="px-4 py-4 md:py-0">
               <h3 className="font-serif text-xl mb-2 flex items-center justify-center md:justify-start gap-2">
                 <Truck className="w-5 h-5 text-accent-light" /> Fast Shipping
               </h3>
               <p className="text-stone-300 text-sm">Free express shipping on all orders over $100.</p>
            </div>
            <div className="px-4 py-4 md:py-0">
               <h3 className="font-serif text-xl mb-2 flex items-center justify-center md:justify-start gap-2">
                 <ShieldCheck className="w-5 h-5 text-accent-light" /> Secure Payment
               </h3>
               <p className="text-stone-300 text-sm">Encrypted payment gateways for your protection.</p>
            </div>
             <div className="px-4 py-4 md:py-0">
               <h3 className="font-serif text-xl mb-2 flex items-center justify-center md:justify-start gap-2">
                 <RefreshCw className="w-5 h-5 text-accent-light" /> Easy Returns
               </h3>
               <p className="text-stone-300 text-sm">Return within 30 days, no questions asked.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <Section className="bg-white">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
               <img 
                 src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop" 
                 alt="Clothing Collection" 
                 className="rounded-lg shadow-xl w-full h-auto"
               />
               <div className="absolute -bottom-6 -right-6 bg-cream p-8 rounded-lg shadow-lg hidden md:block max-w-xs">
                 <p className="font-serif text-2xl text-primary mb-2">"Ethical & Elegant"</p>
                 <div className="flex text-accent">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-accent font-medium tracking-widest text-sm uppercase mb-4 block">
                Sustainability First
              </span>
              <h2 className="text-4xl font-serif font-medium text-primary mb-6">Sustainable fashion for a better future</h2>
              <p className="text-stone-600 mb-10 leading-relaxed text-lg">
                We believe in fashion that looks good and does good. Our materials are ethically sourced and environmentally friendly.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="border-l-2 border-accent pl-6">
                  <span className="text-5xl font-serif text-primary block mb-2">100%</span>
                  <span className="text-sm text-stone-500 uppercase tracking-wide">Organic Cotton</span>
                </div>
                <div className="border-l-2 border-accent pl-6">
                  <span className="text-5xl font-serif text-primary block mb-2">Zero</span>
                  <span className="text-sm text-stone-500 uppercase tracking-wide">Carbon Footprint</span>
                </div>
              </div>
              
              <Button to="/about" variant="outline">Learn More About Us</Button>
            </div>
          </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-stone-50">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-medium text-primary mb-4">Why Choose OneDrop</h2>
            <p className="text-stone-600">Experience the difference with our premium services and customer-first approach.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Star, title: "Premium Quality", desc: "Hand-picked materials ensuring durability and comfort in every stitch." },
               { icon: Tag, title: "Best Prices", desc: "Luxury fashion at accessible prices, without the markup." },
               { icon: Heart, title: "Loyalty Rewards", desc: "Earn points with every purchase and unlock exclusive benefits." }
             ].map((item, idx) => (
               <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100">
                 <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mb-6 text-accent">
                   <item.icon size={24} />
                 </div>
                 <h3 className="text-xl font-serif font-medium text-primary mb-3">{item.title}</h3>
                 <p className="text-stone-500 leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
      </Section>

      {/* Featured Products */}
      <Section className="bg-white border-t border-stone-100">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-medium text-primary mb-4">Featured Collection</h2>
              <p className="text-stone-600 max-w-xl">
                Our most popular items, handpicked for you.
              </p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-accent hover:text-primary transition-colors font-medium">
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <MainCards />
          <div className="mt-12 text-center md:hidden">
             <Button to="/shop" variant="outline" className="w-full">View All Products</Button>
          </div>
      </Section>
      
      {/* FAQ Section */}
      <Section className="bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-serif font-medium text-primary mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <AccordionItem 
              question="What is your return policy?" 
              answer="We offer a 30-day return policy for all unused items in their original packaging. Returns are free for all domestic orders." 
            />
            <AccordionItem 
              question="Do you ship internationally?" 
              answer="Yes, we ship to over 50 countries worldwide. Shipping costs and times vary by location." 
            />
            <AccordionItem 
              question="How do I track my order?" 
              answer="Once your order ships, you will receive a confirmation email with a tracking number to monitor your delivery." 
            />
             <AccordionItem 
              question="Are your products sustainable?" 
              answer="Absolutely. We are committed to 100% ethical sourcing and use organic, eco-friendly materials whenever possible." 
            />
          </div>
        </div>
      </Section>

      {/* Sticky Mobile Buy Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 md:hidden z-40 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div>
           <p className="text-xs text-stone-500 uppercase tracking-wide">New Collection</p>
           <p className="font-serif font-bold text-primary">Available Now</p>
        </div>
        <Button to="/shop" variant="primary" size="sm">
          Shop Now
        </Button>
      </div>
    </>
  );
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-stone-50 transition-colors"
      >
        <span className="font-medium text-primary">{question}</span>
        {isOpen ? <ChevronUp size={18} className="text-stone-400" /> : <ChevronDown size={18} className="text-stone-400" />}
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
      >
        <p className="text-stone-600 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default HomePage;
