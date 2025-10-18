import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { tarotCards, getMajorArcana, getMinorArcana, getSuitCards } from '../data/tarotCards'
import TarotCardDisplay from './TarotCardDisplay'

interface TarotCardsGridProps {
  filter?: 'all' | 'major' | 'minor' | 'cups' | 'pentacles' | 'swords' | 'wands'
  maxCards?: number
  showDetails?: boolean
  size?: 'small' | 'medium' | 'large'
}

const TarotCardsGrid = ({ 
  filter = 'all', 
  maxCards, 
  showDetails = false,
  size = 'small'
}: TarotCardsGridProps) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  const [selectedFilter, setSelectedFilter] = useState(filter)

  const filteredCards = useMemo(() => {
    let cards = tarotCards
    
    switch (selectedFilter) {
      case 'major':
        cards = getMajorArcana()
        break
      case 'minor':
        cards = getMinorArcana()
        break
      case 'cups':
      case 'pentacles':
      case 'swords':
      case 'wands':
        cards = getSuitCards(selectedFilter)
        break
      default:
        cards = tarotCards
    }
    
    return maxCards ? cards.slice(0, maxCards) : cards
  }, [selectedFilter, maxCards])

  const handleCardFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const filterOptions = [
    { value: 'all', label: '全部卡牌', count: tarotCards.length },
    { value: 'major', label: '大阿爾卡納', count: getMajorArcana().length },
    { value: 'minor', label: '小阿爾卡納', count: getMinorArcana().length },
    { value: 'cups', label: '聖杯', count: getSuitCards('cups').length },
    { value: 'pentacles', label: '錢幣', count: getSuitCards('pentacles').length },
    { value: 'swords', label: '寶劍', count: getSuitCards('swords').length },
    { value: 'wands', label: '權杖', count: getSuitCards('wands').length },
  ]

  return (
    <div className="w-full">
      {/* Filter Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {filterOptions.map((option) => (
            <motion.button
              key={option.value}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedFilter === option.value
                  ? 'bg-mystical-600 text-white shadow-lg shadow-mystical-500/30'
                  : 'bg-mystical-900/50 text-mystical-300 hover:bg-mystical-800/50 hover:text-white'
              }`}
              onClick={() => setSelectedFilter(option.value as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option.label}
              <span className="ml-2 text-xs opacity-70">({option.count})</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
        layout
      >
        {filteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              ease: "easeOut"
            }}
            layout
          >
            <TarotCardDisplay
              card={card}
              isFlipped={flippedCards.has(card.id)}
              onFlip={() => handleCardFlip(card.id)}
              size={size}
              showDetails={showDetails}
              className="mx-auto"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Cards Count */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-mystical-300 text-sm">
          顯示 {filteredCards.length} 張卡牌
          {maxCards && filteredCards.length === maxCards && (
            <span className="ml-2 text-mystical-400">（已限制顯示數量）</span>
          )}
        </p>
      </motion.div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-mystical-500/5 to-cosmic-500/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default TarotCardsGrid