import { useState } from 'react'
import { motion } from 'framer-motion'
import { TarotCard } from '../data/tarotCards'
import LazyImage from './LazyImage'

interface TarotCardDisplayProps {
  card: TarotCard
  isFlipped?: boolean
  onFlip?: () => void
  size?: 'small' | 'medium' | 'large'
  showDetails?: boolean
  className?: string
}

const TarotCardDisplay = ({ 
  card, 
  isFlipped = false, 
  onFlip, 
  size = 'medium',
  showDetails = false,
  className = ''
}: TarotCardDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: 'w-24 h-36',
    medium: 'w-32 h-48',
    large: 'w-40 h-60'
  }

  const cardBackImage = '/tarot-cards/card-back.png'

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`relative ${sizeClasses[size]} cursor-pointer perspective-1000`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onFlip}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Card Container */}
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Card Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border-2 border-mystical-500/30">
              <LazyImage
                src={cardBackImage}
                alt="塔羅牌背面"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-mystical-600/20 to-cosmic-500/20"></div>
              
              {/* Mystical Glow Effect */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-mystical-400/30 to-cosmic-400/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </div>

          {/* Card Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border-2 border-mystical-500/30 bg-gradient-to-br from-void-900 to-mystical-900">
              <LazyImage
                src={card.image}
                alt={card.name}
                className="w-full h-full"
              />
              
              {/* Card Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-void-900/90 via-void-900/60 to-transparent p-2">
                <h3 className="text-white text-sm font-semibold text-center">{card.name}</h3>
                <p className="text-mystical-300 text-xs text-center">{card.nameEn}</p>
              </div>

              {/* Suit Indicator */}
              <div className="absolute top-2 right-2">
                <div className={`w-3 h-3 rounded-full ${getSuitColor(card.suit)}`}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Particles Effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-mystical-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, -30],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Card Details */}
      {showDetails && isFlipped && (
        <motion.div
          className="mt-4 p-4 mystical-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">{card.name}</h3>
          <p className="text-mystical-300 text-sm mb-3">{card.nameEn}</p>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-mystical-400 font-semibold mb-1">正位含義</h4>
              <p className="text-gray-300 text-sm">{card.meaning}</p>
            </div>
            
            <div>
              <h4 className="text-mystical-400 font-semibold mb-1">逆位含義</h4>
              <p className="text-gray-300 text-sm">{card.reversedMeaning}</p>
            </div>
            
            <div>
              <h4 className="text-mystical-400 font-semibold mb-1">關鍵詞</h4>
              <div className="flex flex-wrap gap-1">
                {card.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-mystical-600/30 text-mystical-300 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

const getSuitColor = (suit: string) => {
  switch (suit) {
    case 'cups':
      return 'bg-blue-500'
    case 'pentacles':
      return 'bg-green-500'
    case 'swords':
      return 'bg-gray-500'
    case 'wands':
      return 'bg-red-500'
    case 'major':
      return 'bg-mystical-500'
    default:
      return 'bg-purple-500'
  }
}

export default TarotCardDisplay