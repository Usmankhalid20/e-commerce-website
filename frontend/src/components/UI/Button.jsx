import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'md', // sm, md, lg
  className = '',
  isLoading = false,
  disabled = false,
  to,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";
  
  const variants = {
    primary: "bg-stone-900 text-white hover:bg-stone-800 shadow-sm hover:shadow-md",
    secondary: "bg-teal-700 text-white hover:bg-teal-800 shadow-sm hover:shadow-md",
    outline: "border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 bg-transparent",
    ghost: "text-stone-600 hover:text-stone-900 hover:bg-stone-50",
    white: "bg-white text-stone-900 hover:bg-stone-50 shadow-sm hover:shadow-md"
  };

  const sizes = {
    sm: "text-xs px-4 py-2 rounded",
    md: "text-sm px-6 py-3 rounded",
    lg: "text-base px-8 py-4 rounded-md"
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
