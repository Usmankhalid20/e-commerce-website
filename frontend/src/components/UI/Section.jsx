import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  containerClassName = '',
  fullWidth = false,
  id
}) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${fullWidth ? 'w-full' : 'max-w-7xl'} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
