import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Heart, Users, Lightbulb, Target, Award, Globe, Compass, BookOpen, Star, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LazyImage from '../components/LazyImage'

const About = () => {
  const navigate = useNavigate()

  const handleStartReading = () => {
    // 跳轉到主頁的下載區域
    navigate('/#download')
    // 或者直接跳轉到下載頁面
    // navigate('/download')
  }

  const handleLearnMore = () => {
    navigate('/features')
  }

  const values = [
    {
      icon: Heart,
      title: "真誠陪伴",
      description: "以溫暖的心意陪伴您探索內心，提供真誠的靈性指導。"
    },
    {
      icon: BookOpen,
      title: "古今智慧",
      description: "結合傳統塔羅智慧與現代便利，讓古老知識觸手可及。"
    },
    {
      icon: Compass,
      title: "方向指引",
      description: "在人生迷茫時提供方向，幫助您找到屬於自己的道路。"
    },
    {
      icon: Shield,
      title: "安全私密",
      description: "保護您的隱私，在安全的環境中進行靈性探索。"
    }
  ]

  const milestones = [
    {
      year: "2022",
      title: "SoulCards 誕生",
      description: "開始探索如何讓塔羅占卜更貼近現代生活"
    },
    {
      year: "2023",
      title: "用戶體驗優化",
      description: "持續改善使用體驗，讓占卜過程更加流暢自然"
    },
    {
      year: "2024",
      title: "個人化服務",
      description: "推出更貼心的個人化功能，為每位用戶提供獨特體驗"
    },
    {
      year: "2025",
      title: "社群建立",
      description: "建立溫暖的用戶社群，讓靈性探索不再孤單"
    }
  ]

  return (
    <>
      <Helmet>
        <title>關於 SoulCards - 您的靈性探索夥伴</title>
        <meta name="description" content="了解 SoulCards 如何將傳統塔羅智慧與現代科技結合，為您提供溫暖、真誠的靈性指導體驗。" />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-mystical-gradient opacity-10"></div>
          
          {/* Background Images */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src="/ai-mystical-1.png"
              alt=""
              className="absolute top-10 right-10 w-32 h-32 object-cover rounded-full opacity-20 blur-sm"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.img
              src="/ai-mystical-2.png"
              alt=""
              className="absolute bottom-20 left-10 w-24 h-24 object-cover rounded-full opacity-15 blur-sm"
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                您的靈性探索夥伴
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                SoulCards 致力於讓每個人都能輕鬆接觸塔羅智慧，
                在現代生活中找到內心的平靜與方向。
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">傳統與現代的溫暖結合</h2>
                <div className="space-y-6 text-gray-300">
                  <p>
                    SoulCards 相信每個人都有探索內心世界的權利。我們將古老的塔羅智慧
                    與現代科技相結合，讓這份千年傳承的指引變得更加親近和便利。
                  </p>
                  <p>
                    我們的目標不是取代傳統占卜師的智慧，而是作為一個溫暖的陪伴者，
                    在您需要指引的時刻提供支持，幫助您更好地理解自己的內心聲音。
                  </p>
                  <p>
                    無論您是塔羅新手還是資深愛好者，SoulCards 都希望成為您靈性旅程中
                    值得信賴的夥伴，陪伴您探索生命的無限可能。
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="mystical-card overflow-hidden relative">
                  <LazyImage 
                    src="/ai-mystical-3.png"
                    alt="塔羅牌與現代科技的溫暖結合"
                    className="h-80"
                    placeholder="溫暖的靈性指導"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-semibold text-white mb-2">溫暖的靈性指導</h3>
                    <p className="text-gray-300 text-sm">結合傳統智慧與現代便利，為您提供貼心的占卜體驗</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-void-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">我們的理念</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                這些核心價值觀指引著我們為用戶提供真誠、溫暖的靈性體驗
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20 bg-void-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">我們的成長歷程</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                從一個簡單的想法開始，逐步成長為值得信賴的靈性夥伴
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="flex-1 mystical-card">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-mystical-gradient rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                    <div className="w-4 h-4 bg-mystical-gradient rounded-full flex-shrink-0"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Community */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">我們的社群</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                這些數字代表著我們與用戶共同建立的溫暖社群
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "活躍用戶", icon: Users },
                { number: "50K+", label: "占卜次數", icon: Star },
                { number: "20+", label: "支援地區", icon: Globe },
                { number: "4.8", label: "用戶評分", icon: Heart }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="w-16 h-16 bg-cosmic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-mystical-gradient">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">開始您的靈性探索</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                讓 SoulCards 陪伴您踏上自我發現的旅程，
                在塔羅的智慧中找到屬於您的答案。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartReading}
                  className="cosmic-button"
                >
                  開始占卜
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLearnMore}
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-mystical-900 transition-all duration-300"
                >
                  了解更多
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About