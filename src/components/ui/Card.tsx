import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glow = false,
  gradient = true,
  onClick,
}) => {
  const baseClasses = 'relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-300';
  
  const backgroundClasses = gradient 
    ? 'bg-card-gradient border border-mystical-gold/20' 
    : 'bg-mystical-cosmic-black/30 border border-mystical-gold/10';
    
  const hoverClasses = hover 
    ? 'hover:border-mystical-gold/40 hover:shadow-cosmic hover:scale-105' 
    : '';
    
  const glowClasses = glow 
    ? 'shadow-mystical' 
    : '';

  const classes = `
    ${baseClasses}
    ${backgroundClasses}
    ${hoverClasses}
    ${glowClasses}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={hover ? { y: -5 } : {}}
    >
      {/* Glow effect */}
      {glow && (
        <div className="absolute inset-0 bg-mystical-gold/5 blur-xl rounded-2xl" />
      )}
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-mystical-gold/30 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-mystical-gold/30 rounded-br-2xl" />
    </motion.div>
  );
};

export default Card;