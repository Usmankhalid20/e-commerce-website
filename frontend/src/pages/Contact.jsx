import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-stone-50 flex items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-accent font-medium tracking-widest text-sm uppercase mb-4 block animate-fade-in">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-primary mb-6 leading-tight">
            Connect With Us
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed font-light">
            We'd love to hear from you. Whether you have questions about our serum or just want to say hello.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <Section className="bg-white">
          <div className="lg:flex gap-16">
            {/* Contact Form */}
            <div className="lg:w-1/2 mb-16 lg:mb-0">
              <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-stone-100">
                <h2 className="text-3xl font-serif font-medium text-primary mb-8">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-500 mb-2 uppercase tracking-wide">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-0 py-3 border-b border-stone-300 focus:border-accent focus:ring-0 bg-transparent transition-colors placeholder-stone-300"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-500 mb-2 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-0 py-3 border-b border-stone-300 focus:border-accent focus:ring-0 bg-transparent transition-colors placeholder-stone-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-500 mb-2 uppercase tracking-wide">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-0 py-3 border-b border-stone-300 focus:border-accent focus:ring-0 bg-transparent transition-colors text-stone-600"
                    >
                      <option value="">Select a topic</option>
                      <option value="product">Product Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-500 mb-2 uppercase tracking-wide">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="w-full px-0 py-3 border-b border-stone-300 focus:border-accent focus:ring-0 bg-transparent transition-colors placeholder-stone-300 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" variant="primary" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="lg:w-1/2">
              <div className="bg-stone-50 p-8 md:p-10 rounded-xl h-full">
                <h2 className="text-3xl font-serif font-medium text-primary mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  <ContactItem 
                    icon={FaPhone} 
                    title="Phone" 
                    content="+1 (555) 123-4567" 
                    sub="Monday-Friday, 9am-5pm EST" 
                  />
                  <ContactItem 
                    icon={FaEnvelope} 
                    title="Email" 
                    content="hello@onedrop.com" 
                    sub="We typically reply within 24 hours" 
                  />
                  <ContactItem 
                    icon={FaMapMarkerAlt} 
                    title="Headquarters" 
                    content="123 Beauty Avenue" 
                    sub="New York, NY 10001" 
                  />
                </div>
                
                <div className="mt-12 pt-12 border-t border-stone-200">
                  <h3 className="text-lg font-medium text-primary mb-6">Follow Us</h3>
                  <div className="flex space-x-4">
                    <SocialButton icon={FaInstagram} />
                    <SocialButton icon={FaFacebookF} />
                    <SocialButton icon={FaTwitter} />
                  </div>
                </div>
                
                <div className="mt-12 bg-white p-6 rounded-lg border border-stone-100 shadow-sm">
                  <h3 className="text-lg font-serif font-medium text-primary mb-3">Skincare Advice</h3>
                  <p className="text-stone-600 mb-4 text-sm leading-relaxed">
                    Need personalized skincare advice? Our dermatology experts are available for consultations.
                  </p>
                  <button className="text-accent hover:text-primary font-medium flex items-center text-sm transition-colors">
                    Book a Consultation
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
      </Section>
      
      {/* Map Section */}
      <section className="w-full h-96 bg-stone-100 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe
          title="One Drop Headquarters"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.98784492416446!3d40.7484409713898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623251234567!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
};

const ContactItem = ({ icon: Icon, title, content, sub }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 bg-white p-3 rounded-full text-accent shadow-sm">
      <Icon className="h-5 w-5" />
    </div>
    <div className="ml-5">
      <h3 className="text-lg font-medium text-primary">{title}</h3>
      <p className="text-stone-600 mt-1">{content}</p>
      {sub && <p className="text-sm text-stone-400 mt-1">{sub}</p>}
    </div>
  </div>
);

const SocialButton = ({ icon: Icon }) => (
  <a href="#" className="bg-white hover:bg-accent hover:text-white text-stone-400 p-3 rounded-full transition-all duration-300 shadow-sm border border-stone-100">
    <Icon className="h-5 w-5" />
  </a>
);

export default Contact;