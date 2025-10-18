import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Palette, Shield, Zap, Heart, Star, Moon } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import OptimizedImage from '../components/ui/OptimizedImage';

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI 智慧解讀',
      description: '採用最先進的人工智慧技術，結合傳統塔羅智慧，為您提供深度且個人化的解讀體驗。',
      details: [
        '深度學習算法分析',
        '個人化解讀建議',
        '多維度洞察分析',
        '持續學習優化'
      ]
    },
    {
      icon: Palette,
      title: '精美視覺設計',
      description: '每張塔羅牌都經過精心設計，融合神秘美學與現代藝術，帶來視覺與心靈的雙重享受。',
      details: [
        '手工繪製藝術風格',
        '高清視覺體驗',
        '神秘主題設計',
        '沉浸式界面'
      ]
    },
    {
      icon: Shield,
      title: '隱私安全保護',
      description: '您的占卜記錄與個人資料受到最高級別的保護，確保您的隱私安全無虞。',
      details: [
        '端到端加密',
        '本地數據存儲',
        '匿名化處理',
        '安全認證機制'
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: Zap,
      title: '即時占卜',
      description: '隨時隨地進行塔羅占卜，無需等待，即刻獲得人生指引。'
    },
    {
      icon: Heart,
      title: '情感洞察',
      description: '專門針對愛情、人際關係提供深度分析與建議。'
    },
    {
      icon: Star,
      title: '事業指引',
      description: '為您的職業發展與重要決策提供智慧指導。'
    },
    {
      icon: Moon,
      title: '靈性成長',
      description: '幫助您探索內在世界，促進個人靈性成長與覺醒。'
    }
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
            <span className="text-gradient">強大功能</span>
            <br />
            <span className="text-white">深度體驗</span>
          </h1>
          <p className="text-xl md:text-2xl text-mystical-star-silver mb-8 max-w-3xl mx-auto leading-relaxed">
            SoulCards 結合傳統塔羅智慧與現代 AI 技術，為您帶來前所未有的占卜體驗
          </p>
        </motion.div>
      </Section>

      {/* Main Features */}
      <Section background="dark">
        <div className="space-y-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-mystical-gold/10 rounded-full flex items-center justify-center mr-4">
                    <feature.icon className="w-8 h-8 text-mystical-gold" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {feature.title}
                  </h2>
                </div>
                
                <p className="text-lg text-mystical-star-silver mb-8 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {feature.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detail}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: detailIndex * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-mystical-gold rounded-full" />
                      <span className="text-mystical-star-silver">{detail}</span>
                    </motion.div>
                  ))}
                </div>
                
                <Button variant="outline" href="/pricing">
                  立即體驗
                </Button>
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <Card className="p-8" glow>
              <div className="aspect-square bg-mystical-gold/5 rounded-2xl overflow-hidden">
                <OptimizedImage
                  src={`/assets/app-screenshots/IMG_077${index + 2}.PNG`}
                  alt={`${feature.title} - SoulCards App 功能展示`}
                  className="w-full h-full rounded-2xl hover:scale-105 transition-transform duration-500"
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
            </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Additional Features Grid */}
      <Section background="gradient">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">更多特色</span>
          </motion.h2>
          <motion.p
            className="text-xl text-mystical-star-silver max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            探索 SoulCards 的完整功能，開啟您的靈性之旅
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="w-full aspect-video mb-6 rounded-lg overflow-hidden bg-mystical-gold/5">
                  <OptimizedImage
                    src={`/assets/app-screenshots/IMG_077${index + 5}.PNG`}
                    alt={`${feature.title} - SoulCards App 功能展示`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-mystical-star-silver leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
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
            <span className="text-gradient">準備好探索</span>
            <br />
            <span className="text-white">您的內在世界了嗎？</span>
          </h2>
          <p className="text-xl text-mystical-star-silver mb-8 max-w-2xl mx-auto">
            立即下載 SoulCards，體驗 AI 智慧塔羅的神奇力量
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              href="https://apps.apple.com/app/soulcards"
              className="text-lg px-10 py-4"
            >
              立即下載
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/pricing"
              className="text-lg px-10 py-4"
            >
              查看訂閱方案
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default Features;