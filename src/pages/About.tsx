import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Users, Mail, MessageCircle } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: '用心服務',
      description: '我們致力於為每位用戶提供最貼心、最專業的塔羅體驗。',
    },
    {
      icon: Star,
      title: '品質至上',
      description: '堅持高品質的產品設計與用戶體驗，不斷追求完美。',
    },
    {
      icon: Users,
      title: '社群共好',
      description: '建立溫暖的靈性社群，讓每個人都能在這裡找到歸屬感。',
    },
  ];

  const team = [
    {
      name: '創辦人 & CEO',
      role: '產品願景領導者',
      description: '擁有多年軟體開發經驗，熱愛塔羅與靈性成長，致力於將科技與靈性完美結合。',
    },
    {
      name: '首席設計師',
      role: '視覺體驗創造者',
      description: '專精於神秘主義美學設計，為 SoulCards 打造獨特的視覺語言與用戶體驗。',
    },
    {
      name: 'AI 技術總監',
      role: '智慧解讀架構師',
      description: '人工智慧領域專家，負責開發先進的塔羅解讀算法與個人化推薦系統。',
    },
  ];

  const stats = [
    { number: '10,000+', label: '活躍用戶' },
    { number: '100,000+', label: '占卜次數' },
    { number: '4.8', label: 'App Store 評分' },
    { number: '99%', label: '用戶滿意度' },
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
            <span className="text-gradient">關於</span>
            <br />
            <span className="text-white">SoulCards</span>
          </h1>
          <p className="text-xl md:text-2xl text-mystical-star-silver mb-8 max-w-3xl mx-auto leading-relaxed">
            我們相信每個人內心都有無限的智慧，SoulCards 致力於幫助您探索並連接這份內在力量
          </p>
        </motion.div>
      </Section>

      {/* Mission Section */}
      <Section background="dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              我們的使命
            </h2>
            <p className="text-lg text-mystical-star-silver mb-6 leading-relaxed">
              在這個快節奏的現代社會中，人們往往迷失在外在的喧囂中，忘記了聆聽內心的聲音。SoulCards 的誕生，正是為了幫助每個人重新連接內在智慧，透過古老的塔羅智慧與現代 AI 技術的結合，為您的人生旅程提供指引與洞察。
            </p>
            <p className="text-lg text-mystical-star-silver mb-8 leading-relaxed">
              我們相信，每個人都擁有解決問題的內在力量，塔羅牌只是一個媒介，幫助您更清楚地看見自己的內心世界，做出更明智的選擇。
            </p>
            <Button variant="outline" href="/features">
              了解更多功能
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8" glow>
              <div className="aspect-square bg-mystical-gold/5 rounded-2xl flex items-center justify-center">
                <OptimizedImage
                  src="/assets/app-screenshots/IMG_0771.PNG"
                  alt="SoulCards App 功能展示 - AI 塔羅占卜介面"
                  className="w-full h-full rounded-2xl"
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="gradient">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">核心價值</span>
          </motion.h2>
          <motion.p
            className="text-xl text-mystical-star-silver max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            指引我們前進的核心理念與價值觀
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="w-16 h-16 mx-auto bg-mystical-gold/10 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-mystical-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-mystical-star-silver leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* App Features Showcase */}
      <Section background="dark">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">App 功能展示</span>
          </motion.h2>
          <motion.p
            className="text-xl text-mystical-star-silver max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            探索 SoulCards 的豐富功能，體驗 AI 塔羅的神奇魅力
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              image: "/assets/app-screenshots/IMG_0772.PNG",
              title: "智慧占卜",
              description: "AI 驅動的個人化塔羅解讀"
            },
            {
              image: "/assets/app-screenshots/IMG_0773.PNG",
              title: "精美界面",
              description: "沉浸式的視覺體驗設計"
            },
            {
              image: "/assets/app-screenshots/IMG_0774.PNG",
              title: "深度洞察",
              description: "多維度的人生指引分析"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="aspect-[3/4] mb-6 rounded-lg overflow-hidden bg-mystical-gold/5">
                  <OptimizedImage
                    src={feature.image}
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

      {/* Stats Section */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-mystical-star-silver">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section background="dark">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">團隊介紹</span>
          </motion.h2>
          <motion.p
            className="text-xl text-mystical-star-silver max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            充滿熱忱的團隊，致力於為您打造最佳的塔羅體驗
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="w-20 h-20 mx-auto bg-mystical-gold/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-mystical-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-mystical-gold mb-4">
                  {member.role}
                </div>
                <p className="text-mystical-star-silver leading-relaxed">
                  {member.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* App Showcase Section */}
      <Section background="gradient">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              SoulCards App
            </h2>
            <p className="text-lg text-mystical-star-silver mb-6 leading-relaxed">
              將神秘的塔羅智慧裝進您的口袋，隨時隨地獲得人生指引。我們精心設計的 iOS App 結合了傳統塔羅的深厚智慧與現代 AI 的先進技術。
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-mystical-gold" />
                <span className="text-mystical-star-silver">AI 智能解讀</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-mystical-gold" />
                <span className="text-mystical-star-silver">精美視覺設計</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-mystical-gold" />
                <span className="text-mystical-star-silver">隱私保護</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-mystical-gold" />
                <span className="text-mystical-star-silver">即時占卜</span>
              </div>
            </div>
            <Button size="lg" href="/download">
              立即下載 App
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8" glow>
              <div className="aspect-square bg-mystical-gold/5 rounded-2xl flex items-center justify-center">
                <OptimizedImage
                  src="/assets/app-screenshots/IMG_0769.PNG"
                  alt="SoulCards App截圖"
                  className="w-full h-full rounded-2xl"
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">聯繫我們</span>
          </h2>
          <p className="text-xl text-mystical-star-silver mb-8 max-w-2xl mx-auto">
            有任何問題或建議嗎？我們很樂意聽到您的聲音
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              icon={Mail}
              href="mailto:andy846@soulcards-app.com"
              className="text-lg px-10 py-4"
            >
              發送郵件
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={MessageCircle}
              href="/support"
              className="text-lg px-10 py-4"
            >
              客服中心
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default About;