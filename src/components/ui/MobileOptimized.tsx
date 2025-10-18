import React from 'react';
import { motion } from 'framer-motion';

interface MobileOptimizedSectionProps {
  children: React.ReactNode;
  className?: string;
}

// 移動端優化的區塊組件
export const MobileOptimizedSection: React.FC<MobileOptimizedSectionProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

interface MobileGridProps {
  children: React.ReactNode;
  cols?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: string;
  className?: string;
}

// 移動端優化的網格組件
export const MobileGrid: React.FC<MobileGridProps> = ({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'gap-6',
  className = '',
}) => {
  const gridClasses = `grid grid-cols-${cols.mobile} md:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop} ${gap} ${className}`;
  
  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

interface TouchFriendlyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  fullWidth?: boolean;
}

// 觸控友好的按鈕組件
export const TouchFriendlyButton: React.FC<TouchFriendlyButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  fullWidth = false,
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center
    min-h-[48px] px-6 py-3 text-base font-semibold
    rounded-xl transition-all duration-300
    touch-manipulation select-none
    ${fullWidth ? 'w-full' : ''}
  `;
  
  const variantClasses = {
    primary: 'bg-gold-gradient text-black hover:scale-105 active:scale-95',
    secondary: 'border-2 border-mystical-gold text-mystical-gold bg-transparent hover:bg-mystical-gold hover:text-black active:scale-95',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      onClick={onClick}
      className={classes}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

interface MobileHeroProps {
  title: React.ReactNode;
  subtitle: string;
  primaryAction: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  image?: string;
  imageAlt?: string;
}

// 移動端優化的英雄區塊
export const MobileHero: React.FC<MobileHeroProps> = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  image,
  imageAlt,
}) => {
  return (
    <MobileOptimizedSection className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {title}
          </h1>
        </motion.div>
        
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-mystical-star-silver leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TouchFriendlyButton
            href={primaryAction.href}
            onClick={primaryAction.onClick}
            variant="primary"
            fullWidth
          >
            {primaryAction.text}
          </TouchFriendlyButton>
          
          {secondaryAction && (
            <TouchFriendlyButton
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
              variant="secondary"
              fullWidth
            >
              {secondaryAction.text}
            </TouchFriendlyButton>
          )}
        </motion.div>
        
        {image && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative max-w-xs sm:max-w-sm mx-auto">
              <div className="relative z-10 bg-mystical-cosmic-black/50 rounded-3xl p-4 border border-mystical-gold/30">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full rounded-2xl"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-mystical-gold/20 blur-3xl rounded-3xl" />
            </div>
          </motion.div>
        )}
      </div>
    </MobileOptimizedSection>
  );
};

interface SwipeableCardProps {
  children: React.ReactNode;
  className?: string;
}

// 可滑動的卡片組件（適用於移動端）
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      className={`
        card-mystical cursor-pointer select-none
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
    >
      {children}
    </motion.div>
  );
};