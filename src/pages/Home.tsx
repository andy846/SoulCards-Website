import React from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Sparkles, Shield, Zap, Heart } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { MobileHero, MobileGrid, SwipeableCard, TouchFriendlyButton } from '../components/ui/MobileOptimized';

const Home: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI 智慧解讀',
      description: '運用先進 AI 技術，為您提供深度且個人化的塔羅牌解讀',
    },
    {
      icon: Star,
      title: '精美卡牌設計',
      description: '手工繪製的精美塔羅牌，每張卡片都蘊含神秘的視覺魅力',
    },
    {
      icon: Shield,
      title: '隱私保護',
      description: '您的占卜記錄完全私密，我們重視並保護您的個人隱私',
    },
    {
      icon: Zap,
      title: '即時占卜',
      description: '隨時隨地進行塔羅占卜，獲得即時的人生指引與建議',
    },
  ];

  const featuredTarots = [
    {
      name: '愚者',
      nameEn: 'The Fool',
      image: '/assets/tarot/the_fool.png',
      description: '新的開始，無限可能，勇敢地踏上未知的旅程',
    },
    {
      name: '魔術師',
      nameEn: 'The Magician',
      description: '掌握力量，創造現實，將想法轉化為行動',
      image: '/assets/tarot/the_magician.png',
    },
    {
      name: '女祭司',
      nameEn: 'The High Priestess',
      description: '直覺智慧，內在知識，傾聽內心的聲音',
      image: '/assets/tarot/the_high_priestess.png',
    },
    {
      name: '皇后',
      nameEn: 'The Empress',
      description: '豐盛創造，母性關懷，培育與成長的力量',
      image: '/assets/tarot/the_empress.png',
    },
    {
      name: '皇帝',
      nameEn: 'The Emperor',
      description: '權威領導，穩定結構，建立秩序與規則',
      image: '/assets/tarot/the_emperor.png',
    },
    {
      name: '戀人',
      nameEn: 'The Lovers',
      description: '愛情選擇，心靈契合，重要的關係決定',
      image: '/assets/tarot/the_lovers.png',
    },
    {
      name: '戰車',
      nameEn: 'The Chariot',
      description: '意志力量，勝利征服，克服困難前進',
      image: '/assets/tarot/the_chariot.png',
    },
    {
      name: '力量',
      nameEn: 'Strength',
      description: '內在力量，溫柔堅韌，以愛征服恐懼',
      image: '/assets/tarot/strength.png',
    },
    {
      name: '隱者',
      nameEn: 'The Hermit',
      description: '內省智慧，尋求真理，獨自探索內心',
      image: '/assets/tarot/the_hermit.png',
    },
    {
      name: '命運之輪',
      nameEn: 'Wheel of Fortune',
      description: '命運轉折，機會循環，把握時機變化',
      image: '/assets/tarot/wheel_of_fortune.png',
    },
    {
      name: '正義',
      nameEn: 'Justice',
      description: '公平正義，平衡決斷，承擔責任後果',
      image: '/assets/tarot/justice.png',
    },
    {
      name: '倒吊人',
      nameEn: 'The Hanged Man',
      description: '犧牲等待，換位思考，從不同角度看世界',
      image: '/assets/tarot/the_hanged_man.png',
    },
    {
      name: '死神',
      nameEn: 'Death',
      description: '轉化重生，結束開始，放下過去迎接新生',
      image: '/assets/tarot/death.png',
    },
    {
      name: '節制',
      nameEn: 'Temperance',
      description: '平衡調和，中庸之道，融合對立元素',
      image: '/assets/tarot/temperance.png',
    },
    {
      name: '惡魔',
      nameEn: 'The Devil',
      description: '束縛誘惑，物質慾望，認清內心陰影',
      image: '/assets/tarot/the_devil.png',
    },
    {
      name: '塔',
      nameEn: 'The Tower',
      description: '突然變化，破舊立新，摧毀虛假建立真實',
      image: '/assets/tarot/the_tower.png',
    },
    {
      name: '星星',
      nameEn: 'The Star',
      description: '希望指引，靈感啟發，相信美好未來',
      image: '/assets/tarot/the_star.png',
    },
    {
      name: '月亮',
      nameEn: 'The Moon',
      description: '潛意識夢境，幻象迷惑，探索內心深處',
      image: '/assets/tarot/the_moon.png',
    },
    {
      name: '太陽',
      nameEn: 'The Sun',
      description: '光明喜悅，成功活力，純真快樂能量',
      image: '/assets/tarot/the_sun.png',
    },
    {
      name: '審判',
      nameEn: 'Judgement',
      description: '覺醒重生，最終審判，靈性的覺醒',
      image: '/assets/tarot/judgement.png',
    },
    {
      name: '世界',
      nameEn: 'The World',
      description: '完成圓滿，成就達成，人生旅程的終點',
      image: '/assets/tarot/the_world.png',
    },
  ];

  const testimonials = [
    {
      name: '小雨',
      rating: 5,
      comment: '這個 App 的 AI 解讀真的很準確，幫助我在迷茫時找到方向。',
    },
    {
      name: '阿明',
      rating: 5,
      comment: '界面設計很美，塔羅牌的畫風我很喜歡，每天都會用。',
    },
    {
      name: '莉莉',
      rating: 5,
      comment: '解讀內容很有深度，不是那種敷衍的回答，真的有幫助到我。',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <Section className="relative" padding="none">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-mystical-gold rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <MobileHero
          title={
            <>
              <span className="text-gradient">探索內心</span>
              <br />
              <span className="text-white">神秘世界</span>
            </>
          }
          subtitle="透過 AI 智慧解讀塔羅牌，獲得人生指引與內心洞察"
          primaryAction={{
            text: "立即下載",
            href: "#download"
          }}
          secondaryAction={{
            text: "了解更多",
            href: "#features"
          }}
          image="/assets/app-screenshots/IMG_0769.PNG"
          imageAlt="SoulCards App 使用截圖 - AI 塔羅占卜介面"
        />
      </Section>

      {/* Features Section */}
      <Section id="features" background="dark">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">強大功能</span>
          </motion.h2>
          <motion.p
            className="text-xl text-mystical-star-silver max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            結合傳統塔羅智慧與現代 AI 技術，為您帶來前所未有的占卜體驗
          </motion.p>
        </div>

        <MobileGrid 
          cols={{ mobile: 1, tablet: 2, desktop: 4 }}
          gap="gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SwipeableCard className="text-center h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-mystical-gold/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-mystical-gold" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-mystical-star-silver leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </SwipeableCard>
            </motion.div>
          ))}
        </MobileGrid>
      </Section>

      {/* Featured Tarots Section */}
      <Section background="dark" className="relative">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-mystical-gold rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gradient">塔羅指南</span>
          </motion.h2>
          <motion.p
            className="text-xl text-mystical-star-silver max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            深入了解塔羅牌的神秘世界，探索每張牌背後蘊含的古老智慧與人生哲理
            </motion.p>
          </div>

          <MobileGrid 
            cols={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap="gap-6 md:gap-8"
          >
            {featuredTarots.map((tarot, index) => (
              <motion.div
                key={tarot.nameEn}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <SwipeableCard className="text-center group">
                  <div className="relative mb-6 overflow-hidden rounded-lg">
                    <OptimizedImage
                      src={tarot.image}
                      alt={`${tarot.name} - ${tarot.nameEn}`}
                      className="w-full h-64 group-hover:scale-105 transition-transform duration-500"
                      objectFit="cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                    {tarot.name}
                  </h3>
                  <p className="text-sm text-mystical-gold mb-3 font-medium">
                    {tarot.nameEn}
                  </p>
                  <p className="text-sm md:text-base text-mystical-star-silver leading-relaxed">
                    {tarot.description}
                  </p>
                </SwipeableCard>
              </motion.div>
            ))}
          </MobileGrid>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section background="gradient">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">用戶見證</span>
          </motion.h2>
          <motion.p
            className="text-xl text-mystical-star-silver max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            聽聽其他用戶如何透過 SoulCards 找到人生方向
          </motion.p>
        </div>

        <MobileGrid 
          cols={{ mobile: 1, tablet: 2, desktop: 3 }}
          gap="gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SwipeableCard className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-mystical-gold fill-current" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-mystical-star-silver mb-6 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="text-mystical-gold font-semibold">
                  {testimonial.name}
                </div>
              </SwipeableCard>
            </motion.div>
          ))}
        </MobileGrid>
      </Section>

      {/* App Preview Section */}
      <Section background="dark" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              體驗 <span className="text-gradient">AI 塔羅</span>
              <br />
              的神秘力量
            </h2>
            <p className="text-lg text-mystical-star-silver mb-6 leading-relaxed">
              結合古老塔羅智慧與現代 AI 技術，為您提供準確而深刻的人生指引。每一張牌都蘊含著獨特的啟示，等待您來探索。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <TouchFriendlyButton
                href="#download"
                variant="primary"
              >
                立即體驗
              </TouchFriendlyButton>
              <TouchFriendlyButton
                href="/features"
                variant="secondary"
              >
                了解更多
              </TouchFriendlyButton>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  src: "/assets/app-screenshots/IMG_0775.PNG",
                  alt: "SoulCards App 主界面 - 塔羅占卜",
                  delay: 0
                },
                {
                  src: "/assets/app-screenshots/IMG_0776.PNG", 
                  alt: "SoulCards App 占卜結果 - AI 解讀",
                  delay: 0.2
                },
                {
                  src: "/assets/app-screenshots/IMG_0777.PNG",
                  alt: "SoulCards App 個人化設定 - 用戶體驗",
                  delay: 0.4
                }
              ].map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: screenshot.delay }}
                  className="relative max-w-xs mx-auto"
                >
                  <div className="relative z-10 bg-mystical-cosmic-black/50 rounded-3xl p-4 border border-mystical-gold/30 hover:border-mystical-gold/50 transition-colors duration-300">
                    <OptimizedImage
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="w-full rounded-2xl hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-mystical-gold/20 blur-3xl rounded-3xl" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Download Section */}
      <Section id="download" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">開始您的</span>
            <br />
            <span className="text-white">神秘之旅</span>
          </h2>
          <p className="text-xl text-mystical-star-silver mb-8 max-w-2xl mx-auto">
            立即下載 SoulCards，探索塔羅的神秘世界，獲得人生指引
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <TouchFriendlyButton
              href="https://apps.apple.com/app/soulcards"
              variant="primary"
              fullWidth
            >
              <Download className="w-5 h-5 mr-2" />
              App Store 下載
            </TouchFriendlyButton>
            <TouchFriendlyButton
              href="/pricing"
              variant="secondary"
              fullWidth
            >
              查看訂閱方案
            </TouchFriendlyButton>
          </div>

          <motion.div
            className="mt-12 flex items-center justify-center space-x-2 text-mystical-star-silver"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Heart className="w-5 h-5 text-mystical-pink" />
            <span>已有超過 10,000 位用戶信賴</span>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
};

export default Home;