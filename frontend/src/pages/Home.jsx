import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainCards from '../components/common/Cards/MainCards';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star, Tag, Heart, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-stone-50">
        <div className="absolute inset-0 z-0">
           <img
              src="https://unsplash.com/photos/a-couple-of-bottles-of-liquid-sitting-on-top-of-a-bed-iZQDneG5KoY"
              alt="Background"
              className="w-full h-full object-cover opacity-5"
            />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Text Content */}
            <div className="max-w-xl animate-fade-in-up">
              <span className="text-accent font-medium tracking-widest text-sm uppercase mb-4 block">
                The New Standard in Skincare
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-primary mb-8 leading-[1.1]">
                Restore Your Skin’s Natural Barrier
              </h1>
              
              <p className="text-lg text-stone-600 mb-6 leading-relaxed max-w-lg">
                Discover the clinical-grade serum designed to calm, hydrate, and protect sensitive skin. Formulated with dermatologists for visible results.
              </p>

              <p className="text-sm text-accent font-medium mb-10 block">
                ✓ Dermatologist-tested &nbsp; • &nbsp; ✓ 30-day money-back guarantee
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors">
                  Shop Skincare <ArrowRight size={16} />
                </Link>
                <Link to="/#ingredients" className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors">
                  See Ingredients <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
               <div className="relative z-10 w-full max-w-md">
                 <div className="absolute -inset-4 bg-accent/10 rounded-full blur-3xl"></div>
                 <img
                    src="https://images.unsplash.com/photo-1643747394944-89b11e7fb616?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="OneDrop Skincare Model"
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
               <p className="text-stone-300 text-sm">Try it risk-free. Return if not satisfied.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <Section className="bg-white">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
               <img 
                 src="https://images.unsplash.com/photo-1696025522422-aa9a74e4f3d5?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                 alt="Radiant Skin Collection" 
                 className="rounded-lg shadow-xl w-full h-auto"
               />
               <div className="absolute -bottom-6 -right-6 bg-cream p-8 rounded-lg shadow-lg hidden md:block max-w-xs">
                 <p className="font-serif text-2xl text-primary mb-2">"Pure & Potent"</p>
                 <div className="flex text-accent">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-accent font-medium tracking-widest text-sm uppercase mb-4 block">
                Pure Formulations
              </span>
              <h2 className="text-4xl font-serif font-medium text-primary mb-6">Clean skincare for a healthy glow</h2>
              <p className="text-stone-600 mb-10 leading-relaxed text-lg">
                We believe in skincare that is effective and safe. Our ingredients are ethically sourced, minimal, and scientifically proven to repair your barrier.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="border-l-2 border-accent pl-6">
                  <span className="text-5xl font-serif text-primary block mb-2">100%</span>
                  <span className="text-sm text-stone-500 uppercase tracking-wide">Clean Ingredients</span>
                </div>
                <div className="border-l-2 border-accent pl-6">
                  <span className="text-5xl font-serif text-primary block mb-2">Zero</span>
                  <span className="text-sm text-stone-500 uppercase tracking-wide">Cruelty Free</span>
                </div>
              </div>
              
              <Button to="/about" variant="outline">Our Philosophy</Button>
            </div>
          </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-stone-50">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-medium text-primary mb-4">Why Choose OneDrop</h2>
            <p className="text-stone-600">Experience the difference with our clinical approach to daily skincare.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Star, title: "Clinical Formulations", desc: "Developed with dermatologists to ensure maximum safety and efficacy for all skin types." },
               { icon: Tag, title: "Potent Actives", desc: "High concentrations of active ingredients that deliver real, visible change to your skin." },
               { icon: Heart, title: "Visible Results", desc: "Join thousands of users who have seen healthier, more radiant skin in just weeks." }
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
                Curated solutions for your skin's unique needs.
              </p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-accent hover:text-primary transition-colors font-medium">
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <MainCards />
          <div className="mt-12 text-center md:hidden">
             <Button to="/shop" variant="outline" className="w-full">View All</Button>
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
              question="Is OneDrop suitable for sensitive skin?" 
              answer="Yes, all our products are hypoallergenic and free from fragrance, alcohol, and harsh chemicals, making them perfect for sensitive skin." 
            />
            <AccordionItem 
              question="How often should I use the serum?" 
              answer="For best results, we recommend applying 2-3 drops twice daily, morning and night, after cleansing." 
            />
            <AccordionItem 
              question="When will I see results?" 
              answer="Most users report increased hydration immediately, with visible improvements in texture and tone within 2-4 weeks of consistent use." 
            />
             <AccordionItem 
              question="Are your products cruelty-free?" 
              answer="Absolutely. We never test on animals and are committed to 100% ethical sourcing standards for all our ingredients." 
            />
          </div>
        </div>
      </Section>

      {/* Sticky Mobile Buy Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-stone-200 p-4 md:hidden z-40 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div>
           <p className="text-xs text-stone-500 uppercase tracking-wide">Daily Repair Serum</p>
           <p className="font-serif font-bold text-primary">Available Now</p>
        </div>
        <Button to="/shop" variant="primary" size="sm">
          Shop Skincare
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
