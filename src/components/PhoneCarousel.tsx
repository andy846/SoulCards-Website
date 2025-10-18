import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import LazyImage from './LazyImage'

interface Screenshot {
  id: string
  src: string
  title: string
  description: string
}

interface PhoneCarouselProps {
  screenshots: Screenshot[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

const PhoneCarousel = ({ 
  screenshots, 
  autoPlay = true, 
  autoPlayInterval = 4000,
  className = ''
}: PhoneCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!autoPlay || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isHovered, screenshots.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Phone Frame */}
      <div className="relative mx-auto max-w-sm">
        {/* Phone Outer Frame */}
        <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[3rem] p-2 shadow-2xl">
          {/* Phone Inner Frame */}
          <div className="relative bg-black rounded-[2.5rem] p-1">
            {/* Screen */}
            <div className="relative bg-gray-900 rounded-[2rem] overflow-hidden aspect-[9/19.5]">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>
              
              {/* Screenshot Container */}
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <LazyImage
                      src={screenshots[currentIndex].src}
                      alt={screenshots[currentIndex].title}
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Gradient Overlay for better text readability */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-32 z-10"></div>
                
                {/* Screenshot Info */}
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {screenshots[currentIndex].title}
                  </h3>
                  <p className="text-gray-300 text-xs">
                    {screenshots[currentIndex].description}
                  </p>
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200 z-30"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200 z-30"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Phone Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[3rem] pointer-events-none"></div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-mystical-500 w-6'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-mystical-400/30 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {autoPlay && (
        <div className="mt-4 w-full max-w-sm mx-auto">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <motion.div
              className="bg-mystical-500 h-1 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: autoPlayInterval / 1000,
                ease: "linear",
                repeat: Infinity,
              }}
              key={currentIndex}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PhoneCarousel