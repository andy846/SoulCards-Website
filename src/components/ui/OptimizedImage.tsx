import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  objectFit = 'cover'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (loading === 'eager') {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
    }
  }, [src, loading]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div 
        className={`bg-mystical-gold/10 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-mystical-gold/50 text-sm text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-mystical-gold/20 rounded-full flex items-center justify-center">
            📷
          </div>
          圖片加載失敗
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      {!imageLoaded && loading === 'lazy' && (
        <div className="absolute inset-0 bg-mystical-gold/10 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          objectFit,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default OptimizedImage;