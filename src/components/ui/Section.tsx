import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'transparent' | 'dark' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  background = 'transparent',
  padding = 'lg',
  maxWidth = 'xl',
}) => {
  const backgroundClasses = {
    transparent: '',
    dark: 'bg-mystical-cosmic-black/30',
    gradient: 'bg-gradient-to-b from-mystical-cosmic-black/20 to-transparent',
  };

  const paddingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 lg:py-20',
    xl: 'py-20 lg:py-24',
  };

  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-8xl',
    full: 'max-w-full',
  };

  return (
    <section
      id={id}
      className={`
        relative
        ${backgroundClasses[background]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;