import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TarotCardProps {
  name: string;
  image: string;
  description?: string;
  className?: string;
  onClick?: () => void;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  name, 
  image, 
  description, 
  className = '',
  onClick 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onClick?.();
  };

  return (
    <div className={`relative w-32 h-48 md:w-40 md:h-60 perspective-1000 ${className}`}>
      <motion.div
        className="relative w-full h-full cursor-pointer preserve-3d"
        onClick={handleClick}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 卡片背面 */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 rounded-lg border-2 border-purple-400 shadow-lg overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* 神秘花紋背景 */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-purple-800/30 to-indigo-800/30"></div>
              </div>
              
              {/* 中央圖案 */}
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-yellow-400 to-purple-400 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-xs text-purple-200 font-mystical">SoulCards</div>
              </div>
            </div>
          </div>
        </div>

        {/* 卡片正面 */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white rounded-lg border-2 border-purple-300 shadow-lg overflow-hidden">
            {/* 載入動畫 */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            )}
            
            {/* 塔羅牌圖片 */}
            <img
              src={image}
              alt={name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            
            {/* 卡片名稱覆蓋層 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <h3 className="text-white text-xs font-mystical text-center capitalize">
                {name ? name.replace(/_/g, ' ') : '未知卡片'}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* 描述文字（可選） */}
      {description && isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-0 right-0 text-center"
        >
          <p className="text-xs text-gray-300 font-mystical">{description}</p>
        </motion.div>
      )}
    </div>
  );
};

export default TarotCard;