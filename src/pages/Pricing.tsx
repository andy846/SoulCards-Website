import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Sparkles } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: '免費版',
      price: '免費',
      period: '',
      description: '體驗基礎塔羅功能',
      icon: Star,
      features: [
        '每日 3 次免費占卜體驗',
        '基礎塔羅牌組',
        '基本 AI 解讀功能',
        '簡單歷史記錄',
      ],
      limitations: [
        '功能有限',
        '廣告顯示',
        '解讀深度有限',
      ],
      buttonText: '免費下載',
      popular: false,
      color: 'mystical-star-silver',
    },
    {
      name: 'SoulCards Premium Monthly',
      price: 'HK$ 38',
      period: '/月',
      description: 'AI智能解讀，完整塔羅體驗',
      icon: Sparkles,
      features: [
        '無限次塔羅占卜體驗',
        '完整 78 張精美塔羅牌（含正位逆位）',
        'AI 智能個人化深度解讀',
        '精美卡牌翻轉動畫效果',
        '多種占卜方式選擇',
        '跨設備安全雲端同步',
        '詳細占卜歷史記錄',
        '個人化心靈指導建議',
        '無廣告沉浸式體驗',
        '優先客服支援',
      ],
      buttonText: '開始訂閱',
      popular: true,
      color: 'mystical-gold',
    },
    {
      name: 'SoulCards Premium Yearly',
      price: 'HK$ 368',
      period: '/年',
      originalPrice: 'HK$ 456',
      description: '最佳價值，節省 HK$ 88（約19%折扣）',
      icon: Crown,
      features: [
        '月度會員所有功能',
        '完整 78 張精美塔羅牌（含正位逆位）',
        'AI 智能深度解讀分析',
        '沉浸式卡牌翻轉動畫',
        '多種占卜方式（單卡、三卡、愛情占卜等）',
        '獨家年度塔羅牌組',
        '專屬解讀模式',
        '高級統計分析',
        '個人成長報告',
        '跨設備安全雲端同步',
        '優先新功能體驗',
        '專屬客服通道',
        '免費功能更新',
      ],
      buttonText: '立即訂閱',
      popular: false,
      color: 'mystical-purple',
      badge: '最超值',
    },
  ];

  const faqs = [
    {
      question: '可以隨時取消訂閱嗎？',
      answer: '是的，您可以隨時在 App Store 設定中取消訂閱，取消後仍可使用至當前計費週期結束。',
    },
    {
      question: '免費版有什麼限制？',
      answer: '免費版每日提供 3 次占卜機會，功能相對基礎，並會顯示廣告。升級 Premium 會員後可享受無限占卜、完整 78 張塔羅牌與 AI 智能解讀。',
    },
    {
      question: '年度訂閱真的比較划算嗎？',
      answer: '年度訂閱 HK$368 相比月度訂閱可節省 HK$88（約19%折扣），還包含獨家功能與優先支援服務，是最超值的選擇。',
    },
    {
      question: 'AI 智能解讀有什麼特色？',
      answer: 'SoulCards 採用先進 AI 技術，根據您選擇的卡牌組合提供個人化深度解讀，不是固定的卡牌解釋，而是針對您的具體情況給出專屬指導。',
    },
    {
      question: '什麼是沉浸式動畫體驗？',
      answer: 'SoulCards 特別設計了精美的卡牌翻轉和抽取動畫，配合神秘優雅的視覺設計，營造出寧靜神秘的占卜氛圍，讓每次占卜都成為一場心靈的儀式。',
    },
    {
      question: '支援哪些付款方式？',
      answer: '透過 App Store 訂閱，支援信用卡、Apple Pay 等 Apple 認可的付款方式。',
    },
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <Section className="text-center" padding="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">選擇您的</span>
            <br />
            <span className="text-white">SoulCards 方案</span>
          </h1>
          <p className="text-xl md:text-2xl text-mystical-star-silver mb-8 max-w-3xl mx-auto leading-relaxed">
            AI 智能塔羅解讀，78 張精美卡牌，開啟您的心靈探索之旅
          </p>
        </motion.div>
      </Section>

      {/* Pricing Plans */}
      <Section background="dark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-mystical-gold text-black px-4 py-1 rounded-full text-sm font-semibold">
                    最受歡迎
                  </div>
                </div>
              )}
              
              {/* Value Badge */}
              {plan.badge && (
                <div className="absolute -top-4 right-4 z-20">
                  <div className="bg-mystical-purple text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {plan.badge}
                  </div>
                </div>
              )}

              <Card 
                className={`h-full ${plan.popular ? 'border-mystical-gold/50 shadow-gold' : ''}`}
                glow={plan.popular}
              >
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto bg-${plan.color}/10 rounded-full flex items-center justify-center mb-4`}>
                    <plan.icon className={`w-8 h-8 text-${plan.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-mystical-star-silver mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <div className="text-mystical-star-silver line-through text-lg mb-1">
                        {plan.originalPrice}
                      </div>
                    )}
                    <div className="text-3xl md:text-4xl font-bold text-mystical-gold">
                      {plan.price}
                      <span className="text-lg text-mystical-star-silver">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.05 }}
                    >
                      <Check className="w-5 h-5 text-mystical-gold flex-shrink-0" />
                      <span className="text-mystical-star-silver">{feature}</span>
                    </motion.div>
                  ))}
                  
                  {plan.limitations && (
                    <div className="pt-4 border-t border-mystical-gold/20">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div
                          key={limitation}
                          className="flex items-center space-x-3 text-mystical-star-silver/60 text-sm"
                        >
                          <div className="w-5 h-5 flex items-center justify-center">
                            <div className="w-1 h-1 bg-mystical-star-silver/60 rounded-full" />
                          </div>
                          <span>{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="lg"
                  href="https://apps.apple.com/app/soulcards"
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="gradient">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gradient">常見問題</span>
            </motion.h2>
            <motion.p
              className="text-xl text-mystical-star-silver"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              解答您對訂閱方案的疑問
            </motion.p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-mystical-star-silver leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">開始您的</span>
            <br />
            <span className="text-white">SoulCards 之旅</span>
          </h2>
          <p className="text-xl text-mystical-star-silver mb-8 max-w-2xl mx-auto">
            AI 智能解讀 × 78 張精美塔羅牌，探索內心的神秘指引
          </p>
          
          <Button
            size="lg"
            href="https://apps.apple.com/app/soulcards"
            className="text-lg px-10 py-4"
          >
            立即下載體驗
          </Button>
        </motion.div>
      </Section>
    </div>
  );
};

export default Pricing;