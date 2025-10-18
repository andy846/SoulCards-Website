import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  href,
  disabled = false,
  loading = false,
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-xl overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gold-gradient text-black hover:scale-105 hover:shadow-gold',
    secondary: 'bg-mystical-purple text-white hover:bg-mystical-deep-purple hover:shadow-mystical',
    outline: 'border-2 border-mystical-gold text-mystical-gold bg-transparent hover:bg-mystical-gold hover:text-black',
    ghost: 'text-mystical-gold hover:bg-mystical-gold/10',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const content = (
    <>
      {/* Shimmer effect for primary variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
      )}
      
      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className={`border-2 border-current border-t-transparent rounded-full ${iconSizes[size]}`} />
        </motion.div>
      )}
      
      {/* Icon */}
      {Icon && !loading && iconPosition === 'left' && (
        <Icon className={`${iconSizes[size]} mr-2`} />
      )}
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Icon */}
      {Icon && !loading && iconPosition === 'right' && (
        <Icon className={`${iconSizes[size]} ml-2`} />
      )}
    </>
  );

  const MotionComponent = motion.div;

  if (href) {
    return (
      <MotionComponent
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className="inline-block"
      >
        <a
          href={href}
          className={`${classes} group`}
          onClick={disabled ? undefined : onClick}
        >
          {content}
        </a>
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <button
        className={`${classes} group`}
        onClick={disabled || loading ? undefined : onClick}
        disabled={disabled || loading}
      >
        {content}
      </button>
    </MotionComponent>
  );
};

export default Button;