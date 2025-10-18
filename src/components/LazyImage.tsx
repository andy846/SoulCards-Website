import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  onLoad?: () => void
}

const LazyImage = ({ src, alt, className = '', placeholder, onLoad }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-mystical-600/20 to-cosmic-500/20 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-8 h-8 border-2 border-mystical-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          {placeholder && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-4 bg-mystical-400/30 rounded mb-2"></div>
              <div className="h-3 bg-mystical-400/20 rounded w-3/4"></div>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-700/20 flex items-center justify-center">
          <div className="text-center text-red-300">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-sm">圖片載入失敗</div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ scale: 1.1 }}
          animate={{ scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Shimmer Effect */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 shimmer-effect">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
      )}
    </div>
  )
}

export default LazyImage