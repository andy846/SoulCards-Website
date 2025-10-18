import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TarotCard from './TarotCard';
import { getRandomCards, TarotCard as TarotCardData } from '../data/tarotCards';

interface TarotCarouselProps {
  autoPlay?: boolean;
  interval?: number;
  showCount?: number;
  className?: string;
}

const TarotCarousel: React.FC<TarotCarouselProps> = ({
  autoPlay = true,
  interval = 4000,
  showCount = 5,
  className = ''
}) => {
  const [currentCards, setCurrentCards] = useState<TarotCardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    // 初始化隨機塔羅牌
    setCurrentCards(getRandomCards(showCount * 2)); // 多準備一些卡片用於輪播
  }, [showCount]);

  useEffect(() => {
    if (!isPlaying || currentCards.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.max(1, currentCards.length - showCount + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, currentCards.length, showCount]);

  const handlePrevious = () => {
    setCurrentIndex(prev => 
      prev === 0 ? Math.max(0, currentCards.length - showCount) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % Math.max(1, currentCards.length - showCount + 1));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const refreshCards = () => {
    setCurrentCards(getRandomCards(showCount * 2));
    setCurrentIndex(0);
  };

  if (currentCards.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const visibleCards = currentCards.slice(currentIndex, currentIndex + showCount);

  return (
    <div className={`relative w-full ${className}`}>
      {/* 標題和控制按鈕 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-mystical text-white mb-2">
            神秘塔羅牌
          </h3>
          <p className="text-purple-300 text-sm">
            點擊卡片翻轉，探索神秘的指引
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={refreshCards}
            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            title="重新洗牌"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            title={isPlaying ? "暫停" : "播放"}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M9 6h1m4 0h1M9 2h1m4 0h1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 塔羅牌輪播 */}
      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center space-x-4 py-4">
          <AnimatePresence mode="wait">
            {visibleCards.map((card, index) => (
              <motion.div
                key={`${card.id}-${currentIndex}-${index}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  rotateY: 90,
                  transition: { duration: 0.3 }
                }}
                whileHover={{ y: -10 }}
                className="flex-shrink-0"
              >
                <TarotCard
                  name={card.name}
                  image={card.image}
                  description={card.meaning}
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 導航按鈕 */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-r-lg transition-colors"
          disabled={currentIndex === 0}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-l-lg transition-colors"
          disabled={currentIndex >= currentCards.length - showCount}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.max(1, currentCards.length - showCount + 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-purple-400' : 'bg-purple-800'
            }`}
          />
        ))}
      </div>

      {/* 神秘光效 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default TarotCarousel;