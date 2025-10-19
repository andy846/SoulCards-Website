import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Brain, Heart, Zap, Shield, Clock, Sparkles } from 'lucide-react'
import TarotCardsGrid from '../components/TarotCardsGrid'

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "先進 AI 引擎",
      description: "我們專有的 AI 使用深度學習算法分析牌卡組合，基於數千種傳統塔羅解釋進行訓練。",
      details: [
        "機器學習驅動的牌卡解釋",
        "情境感知的占卜分析",
        "從用戶反饋中持續學習"
      ]
    },
    {
      icon: Heart,
      title: "個人化占卜",
      description: "每次占卜都根據您獨特的能量特徵和個人情況量身定制，確保最大相關性。",
      details: [
        "個人能量分析",
        "定制化解釋風格",
        "自適應占卜複雜度"
      ]
    },
    {
      icon: Zap,
      title: "即時洞察",
      description: "無需等待即可獲得即時、詳細的解釋。我們的 AI 在幾秒鐘內處理您的占卜。",
      details: [
        "實時牌卡分析",
        "即時通知系統",
        "快速每日指導"
      ]
    },
    {
      icon: Shield,
      title: "隱私保護",
      description: "您的靈性之旅是私密的。所有占卜都經過加密並安全存儲在您的設備上。",
      details: [
        "端到端加密",
        "本地數據存儲",
        "不分享個人數據"
      ]
    },
    {
      icon: Clock,
      title: "占卜歷史",
      description: "通過全面的占卜歷史和模式分析追蹤您的靈性成長。",
      details: [
        "詳細的占卜檔案",
        "進度追蹤",
        "模式識別洞察"
      ]
    },
    {
      icon: Sparkles,
      title: "多種牌陣",
      description: "從為不同類型問題設計的傳統和現代塔羅牌陣中選擇。",
      details: [
        "凱爾特十字牌陣",
        "三張牌占卜",
        "自定義牌陣創建器"
      ]
    }
  ]

  return (
    <>
      <Helmet>
        <title>功能特色 - SoulCards AI 塔羅占卜</title>
        <meta name="description" content="探索 SoulCards 的強大功能：AI 驅動的塔羅占卜、個人化洞察、隱私保護和全面的靈性指導。" />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-mystical-gradient opacity-10"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-mystical-gradient bg-clip-text text-transparent">
                強大功能
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                探索 SoulCards 如何將古老智慧與尖端 AI 技術相結合，
                提供最準確和富有洞察力的塔羅牌占卜。
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mystical-card group hover:scale-105"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-mystical-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-300 mb-6">{feature.description}</p>
                      
                      <ul className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center gap-3 text-gray-400">
                            <div className="w-2 h-2 bg-cosmic-400 rounded-full"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Features Screenshots */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { src: "/app-screenshots/IMG_0776.PNG", title: "多種占卜方式", description: "選擇適合您問題的占卜類型" },
                { src: "/app-screenshots/IMG_0777.PNG", title: "分享洞察", description: "與朋友分享您的靈性發現" },
                { src: "/app-screenshots/IMG_0778.PNG", title: "靈性社群", description: "加入志同道合的靈性探索者" }
              ].map((feature, index) => (
                <motion.div
                  key={index + 4}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center group hover:scale-105"
                >
                  <img 
                    src={feature.src} 
                    alt={feature.title}
                    className="w-full h-64 object-cover rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 bg-void-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                實際操作演示
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                體驗直觀的介面和強大功能，讓 SoulCards 成為最先進的塔羅牌占卜應用程式。
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { src: "/app-screenshots/IMG_0772.PNG", title: "牌卡選擇", description: "用直觀手勢選擇您的牌卡" },
                { src: "/app-screenshots/IMG_0773.PNG", title: "AI 分析", description: "觀看 AI 解釋您的牌陣" },
                { src: "/app-screenshots/IMG_0774.PNG", title: "詳細洞察", description: "獲得全面的占卜解讀" },
                { src: "/app-screenshots/IMG_0775.PNG", title: "個人日誌", description: "追蹤您的靈性之旅" }
              ].map((demo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center group hover:scale-105"
                >
                  <img 
                    src={demo.src} 
                    alt={demo.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-lg font-semibold text-white mb-2">{demo.title}</h3>
                  <p className="text-gray-400 text-sm">{demo.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
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
                尖端技術
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                採用人工智能和機器學習的最新進展構建，
                SoulCards 代表了數字占卜的未來。
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "神經網絡",
                  description: "基於廣泛塔羅知識庫訓練的深度學習模型",
                  percentage: 95
                },
                {
                  title: "自然語言處理",
                  description: "先進的 NLP 技術實現類人解釋和溝通",
                  percentage: 92
                },
                {
                  title: "模式識別",
                  description: "識別有意義牌卡組合的精密算法",
                  percentage: 98
                }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-void-700"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - tech.percentage / 100)}`}
                        className="text-mystical-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{tech.percentage}%</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{tech.title}</h3>
                  <p className="text-gray-300">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tarot Cards Collection Section */}
        <section className="py-20 bg-void-900/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                完整塔羅牌收藏
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                探索我們精心設計的 78 張塔羅牌，每張都蘊含著古老的智慧和現代的美學。
                點擊任意卡牌查看詳細解釋和含義。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TarotCardsGrid 
                filter="all"
                size="small"
                showDetails={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <div className="mystical-card max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🔮 互動式塔羅體驗
                </h3>
                <p className="text-gray-300 mb-6">
                  每張卡牌都配有精美的翻轉動畫和詳細的解釋。在 SoulCards 應用中，
                  您可以體驗更豐富的互動功能，包括 AI 智能解讀和個人化指導。
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-mystical-300">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    聖杯 - 情感與直覺
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    錢幣 - 物質與實用
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    寶劍 - 思想與挑戰
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    權杖 - 行動與創造
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-mystical-500 rounded-full"></div>
                    大阿爾卡納 - 人生重要課題
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-mystical-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-void-900/80"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                立即體驗這些功能
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                加入數千名已經發現 AI 增強塔羅牌占卜力量的用戶。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="cosmic-button text-lg px-8 py-4">
                  下載 SoulCards
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

export default Features