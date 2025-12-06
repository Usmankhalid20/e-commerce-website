import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-stone-600 pt-20 pb-10 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-primary tracking-tight">
              OneDrop<span className="text-accent">.</span>
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              Elevating your skincare routine with premium, scientifically-proven ingredients. Pure, effective, and luxurious.
            </p>
            <div className="flex space-x-5 pt-2">
              <SocialLink href="#" icon={<FaTwitter />} label="Twitter" />
              <SocialLink href="#" icon={<FaGithub />} label="GitHub" />
              <SocialLink href="#" icon={<FaLinkedin />} label="LinkedIn" />
              <SocialLink href="#" icon={<FaInstagram />} label="Instagram" />
            </div>
          </div>
          
          {/* Links Columns */}
          <div>
            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4">
              <FooterLink to="/shop">All Products</FooterLink>
              <FooterLink to="/shop?category=new">New Arrivals</FooterLink>
              <FooterLink to="/shop?category=featured">Best Sellers</FooterLink>
              <FooterLink to="/shop?category=sets">Gift Sets</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink to="/about">Our Story</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/journal">The Journal</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/shipping">Shipping & Returns</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-xs">
            &copy; {currentYear} OneDrop Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-stone-400">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
            <Link to="/sitemap" className="hover:text-accent transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a 
    href={href} 
    className="text-stone-400 hover:text-accent transition-colors transform hover:-translate-y-1 duration-200"
    aria-label={label}
  >
    <span className="text-lg">{icon}</span>
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-sm text-stone-500 hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200"
    >
      {children}
    </Link>
  </li>
);

export default Footer;