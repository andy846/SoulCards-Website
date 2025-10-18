import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Star, Download, Sparkles, Moon, Sun } from 'lucide-react'
import TarotCarousel from '../components/TarotCarousel'
import PhoneCarousel from '../components/PhoneCarousel'

const Home = () => {
  const screenshots = [
    {
      id: '1',
      src: '/app-screenshots/IMG_0769.PNG',
      title: '主頁面',
      description: '美麗的塔羅牌主界面'
    },
    {
      id: '2',
      src: '/app-screenshots/IMG_0770.PNG',
      title: '牌卡選擇',
      description: '選擇您的塔羅牌'
    },
    {
      id: '3',
      src: '/app-screenshots/IMG_0771.PNG',
      title: 'AI 解讀',
      description: '智能塔羅牌解讀'
    },
    {
      id: '4',
      src: '/app-screenshots/IMG_0772.PNG',
      title: '個人化指導',
      description: '獲得個人化建議'
    },
    {
      id: '5',
      src: '/app-screenshots/IMG_0773.PNG',
      title: '每日洞察',
      description: '每日塔羅牌洞察'
    }
  ]

  return (
    <>
      <Helmet>
        <title>SoulCards - AI 塔羅占卜 | 探索您的命運</title>
        <meta name="description" content="透過 AI 驅動的塔羅占卜探索您的命運。SoulCards 通過先進的人工智慧提供個人化洞察和神秘指導。" />
        <meta name="keywords" content="塔羅, AI, 占卜, 神秘, 靈性指導, 命運, 牌卡" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cosmic-gradient opacity-20"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-mystical-gradient bg-clip-text text-transparent">
                  SoulCards
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  透過 AI 驅動的塔羅牌占卜探索您的命運。
                  通過古老智慧與現代科技的結合，解開您靈魂的奧秘。
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-12"
              >
                <div className="relative inline-block">
                  <img 
                    src="/materials/the_fool.png" 
                    alt="The Fool Tarot Card" 
                    className="tarot-card w-48 h-72 mx-auto floating-card"
                  />
                  <div className="absolute -top-4 -right-4">
                    <Sparkles className="w-8 h-8 text-cosmic-400 animate-pulse" />
                  </div>
                  <div className="absolute -bottom-4 -left-4">
                    <Moon className="w-6 h-6 text-mystical-400 animate-pulse" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button className="cosmic-button flex items-center gap-2 text-lg px-8 py-4">
                  <Download className="w-5 h-5" />
                  下載 iOS 版本
                </button>
                <button className="mystical-card hover:bg-mystical-700/20 text-white border-mystical-600 px-8 py-4 rounded-lg transition-all duration-300">
                  了解更多
                </button>
              </motion.div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float">
            <Star className="w-6 h-6 text-cosmic-400 opacity-60" />
          </div>
          <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
            <Sun className="w-8 h-8 text-cosmic-500 opacity-40" />
          </div>
          <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
            <Moon className="w-7 h-7 text-mystical-400 opacity-50" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                神秘功能
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                體驗 AI 增強塔羅牌占卜的力量，這些功能專為指導您的靈性之旅而設計。
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI 智能解讀",
                  description: "先進的人工智能以前所未有的準確性和洞察力解讀您的牌卡。",
                  icon: "🔮"
                },
                {
                  title: "個人化指導",
                  description: "根據您獨特的能量和生活環境，獲得量身定制的建議。",
                  icon: "✨"
                },
                {
                  title: "每日洞察",
                  description: "每天都以來自牌卡的神秘指導和靈性智慧開始新的一天。",
                  icon: "🌙"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center group hover:scale-105"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tarot Cards Carousel */}
        <section className="py-20 bg-void-900/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-mystical-gradient opacity-10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                探索塔羅牌的奧秘
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                體驗 78 張塔羅牌的神秘力量，每張牌都蘊含著古老的智慧和深刻的洞察。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <TarotCarousel 
                autoPlay={true}
                interval={3000}
                showCount={5}
                className="mb-8"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-gray-400 mb-6">
                點擊任意牌卡查看詳細解釋和含義
              </p>
              <button className="mystical-card hover:bg-mystical-700/20 text-white border-mystical-600 px-6 py-3 rounded-lg transition-all duration-300">
                查看所有塔羅牌
              </button>
            </motion.div>
          </div>
        </section>

        {/* App Screenshots */}
        <section className="py-20 bg-void-900/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-cosmic-gradient opacity-5"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                體驗神奇魔力
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                看看 SoulCards 如何通過美麗直觀的設計，將古老智慧帶入您的現代生活。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto"
            >
              <PhoneCarousel 
                screenshots={screenshots}
                autoPlay={true}
                autoPlayInterval={4000}
                className="mb-8"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-gray-400 mb-6">
                滑動查看更多應用功能截圖
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>• AI 智能占卜</span>
                <span>• 個人化指導</span>
                <span>• 每日靈性洞察</span>
                <span>• 詳細牌卡解釋</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                用戶評價
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "莎拉 M.",
                  rating: 5,
                  text: "SoulCards 改變了我的日常靈性修行。AI 占卜非常準確且富有洞察力。"
                },
                {
                  name: "邁克爾 R.",
                  rating: 5,
                  text: "我使用塔羅牌多年了，這個應用程式提供了我見過最詳細和有用的解釋。"
                },
                {
                  name: "露娜 K.",
                  rating: 5,
                  text: "介面很美，占卜感覺真正個人化。就像口袋裡有一位靈性顧問。"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-cosmic-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">「{testimonial.text}」</p>
                  <p className="text-mystical-400 font-semibold">- {testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-mystical-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-void-950/80"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                開始您的靈性之旅
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                立即下載 SoulCards，通過 AI 驅動的塔羅牌占卜解開您命運的奧秘。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="cosmic-button text-lg px-8 py-4 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  立即下載
                </button>
                <button className="mystical-card hover:bg-white/10 text-white border-white/20 text-lg px-8 py-4 flex items-center gap-3 transition-all duration-300">
                  <img src="/google-login.png" alt="Google" className="w-5 h-5" />
                  使用 Google 登入
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home