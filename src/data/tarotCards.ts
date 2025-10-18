export interface TarotCard {
  id: string
  name: string
  nameEn: string
  suit: string
  number?: number
  type: 'major' | 'minor'
  image: string
  meaning: string
  reversedMeaning: string
  keywords: string[]
  element?: string
}

export const tarotCards: TarotCard[] = [
  // Major Arcana
  {
    id: 'the_fool',
    name: '愚者',
    nameEn: 'The Fool',
    suit: 'major',
    number: 0,
    type: 'major',
    image: '/tarot-cards/the_fool.png',
    meaning: '新的開始、純真、自發性、自由精神',
    reversedMeaning: '魯莽、風險、愚蠢、缺乏方向',
    keywords: ['新開始', '冒險', '純真', '自由'],
    element: 'air'
  },
  {
    id: 'the_magician',
    name: '魔術師',
    nameEn: 'The Magician',
    suit: 'major',
    number: 1,
    type: 'major',
    image: '/tarot-cards/the_magician.png',
    meaning: '意志力、創造力、技能、專注',
    reversedMeaning: '操縱、欺騙、缺乏技能、意志薄弱',
    keywords: ['創造力', '技能', '意志力', '專注'],
    element: 'air'
  },
  {
    id: 'death',
    name: '死神',
    nameEn: 'Death',
    suit: 'major',
    number: 13,
    type: 'major',
    image: '/tarot-cards/death.png',
    meaning: '轉變、結束、重生、新開始',
    reversedMeaning: '抗拒改變、停滯、恐懼',
    keywords: ['轉變', '重生', '結束', '新開始'],
    element: 'water'
  },

  // Cups (聖杯)
  {
    id: 'ace_of_cups',
    name: '聖杯王牌',
    nameEn: 'Ace of Cups',
    suit: 'cups',
    number: 1,
    type: 'minor',
    image: '/tarot-cards/ace_of_cups.png',
    meaning: '新的愛情、情感的開始、直覺、靈性',
    reversedMeaning: '情感封閉、失望、缺乏愛',
    keywords: ['新愛情', '情感', '直覺', '靈性'],
    element: 'water'
  },
  {
    id: 'two_of_cups',
    name: '聖杯二',
    nameEn: 'Two of Cups',
    suit: 'cups',
    number: 2,
    type: 'minor',
    image: '/tarot-cards/two_of_cups.png',
    meaning: '愛情、夥伴關係、和諧、相互吸引',
    reversedMeaning: '關係問題、不平衡、分離',
    keywords: ['愛情', '夥伴關係', '和諧', '吸引'],
    element: 'water'
  },
  {
    id: 'three_of_cups',
    name: '聖杯三',
    nameEn: 'Three of Cups',
    suit: 'cups',
    number: 3,
    type: 'minor',
    image: '/tarot-cards/three_of_cups.png',
    meaning: '友誼、慶祝、社交、團體和諧',
    reversedMeaning: '社交問題、孤立、過度放縱',
    keywords: ['友誼', '慶祝', '社交', '和諧'],
    element: 'water'
  },
  {
    id: 'four_of_cups',
    name: '聖杯四',
    nameEn: 'Four of Cups',
    suit: 'cups',
    number: 4,
    type: 'minor',
    image: '/tarot-cards/four_of_cups.png',
    meaning: '冥想、重新評估、無聊、錯失機會',
    reversedMeaning: '新機會、動機、重新參與',
    keywords: ['冥想', '評估', '機會', '內省'],
    element: 'water'
  },
  {
    id: 'five_of_cups',
    name: '聖杯五',
    nameEn: 'Five of Cups',
    suit: 'cups',
    number: 5,
    type: 'minor',
    image: '/tarot-cards/five_of_cups.png',
    meaning: '失望、悲傷、損失、遺憾',
    reversedMeaning: '接受、原諒、向前看、恢復',
    keywords: ['失望', '悲傷', '損失', '遺憾'],
    element: 'water'
  },
  {
    id: 'eight_of_cups',
    name: '聖杯八',
    nameEn: 'Eight of Cups',
    suit: 'cups',
    number: 8,
    type: 'minor',
    image: '/tarot-cards/eight_of_cups.png',
    meaning: '放棄、尋求更高目標、精神追求',
    reversedMeaning: '恐懼改變、停滞不前、逃避',
    keywords: ['放棄', '追求', '精神', '成長'],
    element: 'water'
  },

  // Pentacles (錢幣)
  {
    id: 'ace_of_pentacles',
    name: '錢幣王牌',
    nameEn: 'Ace of Pentacles',
    suit: 'pentacles',
    number: 1,
    type: 'minor',
    image: '/tarot-cards/ace_of_pentacles.png',
    meaning: '新的財務機會、物質成功、繁榮',
    reversedMeaning: '錯失機會、貪婪、物質主義',
    keywords: ['財務機會', '成功', '繁榮', '物質'],
    element: 'earth'
  },
  {
    id: 'four_of_pentacles',
    name: '錢幣四',
    nameEn: 'Four of Pentacles',
    suit: 'pentacles',
    number: 4,
    type: 'minor',
    image: '/tarot-cards/four_of_pentacles.png',
    meaning: '安全感、控制、保守、儲蓄',
    reversedMeaning: '貪婪、物質主義、缺乏安全感',
    keywords: ['安全感', '控制', '保守', '儲蓄'],
    element: 'earth'
  },
  {
    id: 'five_of_pentacles',
    name: '錢幣五',
    nameEn: 'Five of Pentacles',
    suit: 'pentacles',
    number: 5,
    type: 'minor',
    image: '/tarot-cards/five_of_pentacles.png',
    meaning: '財務困難、貧困、孤立、需要幫助',
    reversedMeaning: '財務恢復、精神貧困、內在資源',
    keywords: ['困難', '貧困', '孤立', '幫助'],
    element: 'earth'
  },
  {
    id: 'eight_of_pentacles',
    name: '錢幣八',
    nameEn: 'Eight of Pentacles',
    suit: 'pentacles',
    number: 8,
    type: 'minor',
    image: '/tarot-cards/eight_of_pentacles.png',
    meaning: '技能發展、勤奮工作、專精、學習',
    reversedMeaning: '缺乏專注、平庸、急於求成',
    keywords: ['技能', '勤奮', '專精', '學習'],
    element: 'earth'
  },

  // Swords (寶劍)
  {
    id: 'ace_of_swords',
    name: '寶劍王牌',
    nameEn: 'Ace of Swords',
    suit: 'swords',
    number: 1,
    type: 'minor',
    image: '/tarot-cards/ace_of_swords.png',
    meaning: '新想法、心智清晰、突破、真理',
    reversedMeaning: '混亂思維、缺乏清晰、誤解',
    keywords: ['新想法', '清晰', '突破', '真理'],
    element: 'air'
  },
  {
    id: 'five_of_swords',
    name: '寶劍五',
    nameEn: 'Five of Swords',
    suit: 'swords',
    number: 5,
    type: 'minor',
    image: '/tarot-cards/five_of_swords.png',
    meaning: '衝突、失敗、背叛、自私',
    reversedMeaning: '和解、原諒、從錯誤中學習',
    keywords: ['衝突', '失敗', '背叛', '自私'],
    element: 'air'
  },
  {
    id: 'eight_of_swords',
    name: '寶劍八',
    nameEn: 'Eight of Swords',
    suit: 'swords',
    number: 8,
    type: 'minor',
    image: '/tarot-cards/eight_of_swords.png',
    meaning: '束縛、限制、受困、無助感',
    reversedMeaning: '自由、解脫、新視角、自我解放',
    keywords: ['束縛', '限制', '受困', '無助'],
    element: 'air'
  },

  // Wands (權杖)
  {
    id: 'ace_of_wands',
    name: '權杖王牌',
    nameEn: 'Ace of Wands',
    suit: 'wands',
    number: 1,
    type: 'minor',
    image: '/tarot-cards/ace_of_wands.png',
    meaning: '新項目、創造力、靈感、潛力',
    reversedMeaning: '缺乏方向、創意阻塞、延遲',
    keywords: ['新項目', '創造力', '靈感', '潛力'],
    element: 'fire'
  },
  {
    id: 'five_of_wands',
    name: '權杖五',
    nameEn: 'Five of Wands',
    suit: 'wands',
    number: 5,
    type: 'minor',
    image: '/tarot-cards/five_of_wands.png',
    meaning: '競爭、衝突、挑戰、不和',
    reversedMeaning: '避免衝突、內在衝突、和解',
    keywords: ['競爭', '衝突', '挑戰', '不和'],
    element: 'fire'
  },
  {
    id: 'eight_of_wands',
    name: '權杖八',
    nameEn: 'Eight of Wands',
    suit: 'wands',
    number: 8,
    type: 'minor',
    image: '/tarot-cards/eight_of_wands.png',
    meaning: '快速行動、進展、消息、旅行',
    reversedMeaning: '延遲、挫折、缺乏進展',
    keywords: ['快速', '進展', '消息', '旅行'],
    element: 'fire'
  }
]

export const getSuitCards = (suit: string) => {
  return tarotCards.filter(card => card.suit === suit)
}

export const getMajorArcana = () => {
  return tarotCards.filter(card => card.type === 'major')
}

export const getMinorArcana = () => {
  return tarotCards.filter(card => card.type === 'minor')
}

export const getRandomCards = (count: number) => {
  const shuffled = [...tarotCards].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}