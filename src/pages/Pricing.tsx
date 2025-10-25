import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Check, Star, Crown, Calendar, Zap, X } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: "SoulCards 高級用戶",
      price: "HKD 38",
      period: "每月",
      description: "解鎖所有高級功能，享受無限占卜體驗",
      icon: Crown,
      features: [
        "無限占卜次數",
        "AI深度解讀",
        "歷史記錄雲端同步",
        "每日運勢推送",
        "專屬牌陣",
        "高級動畫效果",
        "完整歷史分析",
        "高級分享模板",
        "優先客服支持",
        "所有視覺特效"
      ],
      limitations: [],
      buttonText: "開始月付訂閱",
      popular: false,
      savings: null
    },
    {
      name: "SoulCards 高級用戶",
      price: "HKD 368",
      period: "每年",
      description: "年付方案，享受更優惠的價格",
      icon: Calendar,
      features: [
        "包含月付所有功能",
        "無限占卜次數",
        "AI深度解讀",
        "歷史記錄雲端同步",
        "每日運勢推送",
        "專屬牌陣",
        "高級動畫效果",
        "完整歷史分析",
        "高級分享模板",
        "優先客服支持",
        "所有視覺特效"
      ],
      limitations: [],
      buttonText: "選擇年付方案",
      popular: true,
      savings: "節省 HKD 88"
    }
  ]

  const freeFeatures = [
    "基礎塔羅占卜（每日3次）",
    "基本牌陣選擇",
    "基礎卡牌解讀",
    "完整歷史記錄查看",
    "占卜結果分享",
    "AI分析（在每日限制內）",
    "基本用戶界面"
  ]

  const premiumFeatures = [
    "無限占卜次數",
    "AI深度解讀",
    "歷史記錄雲端同步",
    "每日運勢推送",
    "專屬牌陣",
    "高級動畫效果",
    "完整歷史分析",
    "高級分享模板",
    "優先客服支持",
    "所有視覺特效"
  ]

  const testimonials = [
    {
      name: "李美華",
      plan: "高級用戶",
      text: "高級版的無限占卜功能讓我能夠隨時探索內心，AI深度解讀非常準確，幫助我做出重要決定。",
      rating: 5,
      avatar: "🌟"
    },
    {
      name: "陳志明",
      plan: "高級用戶",
      text: "年付方案非常划算！雲端同步功能讓我在不同設備上都能查看占卜記錄，專屬牌陣也很有趣。",
      rating: 5,
      avatar: "🔮"
    },
    {
      name: "王小雅",
      plan: "高級用戶",
      text: "每日運勢推送和高級動畫效果讓整個體驗變得更加豐富，優先客服也很貼心。",
      rating: 5,
      avatar: "✨"
    }
  ]

  return (
    <>
      <Helmet>
        <title>價格方案 - SoulCards AI 塔羅占卜</title>
        <meta name="description" content="選擇 SoulCards 高級用戶方案，享受無限占卜、AI深度解讀、雲端同步等豪華功能。月付 HKD38 或年付 HKD368。" />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-cosmic-gradient opacity-10"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-mystical-gradient bg-clip-text text-transparent">
                升級至高級用戶
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                解鎖 SoulCards 的完整潛能，享受無限占卜和專業級 AI 洞察。
                選擇最適合您的訂閱方案。
              </p>
            </motion.div>
          </div>
        </section>

        {/* Free vs Premium Comparison */}
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
                免費 vs 高級用戶
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                了解升級後您將獲得的強大功能和無限可能。
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Free User Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mystical-card"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">免費用戶</h3>
                  <p className="text-gray-400 mb-4">基礎功能，適合初學者</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">免費</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="text-sm text-gray-400 font-semibold mb-2">核心限制：</div>
                  <div className="flex items-center gap-3 text-red-400">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>每日占卜次數限制 3次</span>
                  </div>
                  <div className="flex items-center gap-3 text-red-400">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>AI分析僅在每日限制內</span>
                  </div>
                  
                  <div className="text-sm text-gray-400 font-semibold mt-6 mb-2">可用功能：</div>
                  {freeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-cosmic-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 px-6 rounded-lg font-semibold bg-gray-600 hover:bg-gray-500 text-white transition-all duration-300">
                  免費使用
                </button>
              </motion.div>

              {/* Premium User Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mystical-card ring-2 ring-mystical-500 relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-mystical-gradient text-white px-4 py-2 rounded-full text-sm font-semibold">
                    推薦方案
                  </span>
                </div>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">高級用戶</h3>
                  <p className="text-gray-400 mb-4">完整功能，無限可能</p>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-white">HKD 38</span>
                    <span className="text-gray-400 ml-2">/月</span>
                    <div className="text-sm text-mystical-400 mt-1">或年付 HKD 368（節省 HKD 88）</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="text-sm text-mystical-400 font-semibold mb-2">核心特權：</div>
                  <div className="flex items-center gap-3 text-green-400">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    <span>無限占卜次數</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-400">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    <span>所有高級功能完全解鎖</span>
                  </div>
                  
                  <div className="text-sm text-mystical-400 font-semibold mt-6 mb-2">完整功能列表：</div>
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-cosmic-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 px-6 rounded-lg font-semibold cosmic-button">
                  立即升級
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
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
                選擇您的訂閱方案
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                兩種靈活的付費方式，滿足不同需求。年付方案更優惠！
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative mystical-card ${plan.popular ? 'ring-2 ring-mystical-500 scale-105' : ''} hover:scale-110 transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-mystical-gradient text-white px-4 py-2 rounded-full text-sm font-semibold">
                        最受歡迎
                      </span>
                    </div>
                  )}

                  {plan.savings && (
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {plan.savings}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                      {plan.period === "每年" && (
                        <div className="text-sm text-gray-400 mt-1">
                          平均每月 HKD 30.7
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-cosmic-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'cosmic-button' 
                      : 'bg-void-800 hover:bg-void-700 text-white border border-mystical-700 hover:border-mystical-600'
                  }`}>
                    {plan.buttonText}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
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
                用戶評價
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-cosmic-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="text-mystical-400 font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.plan}用戶</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                常見問題
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "我可以隨時取消訂閱嗎？",
                  answer: "是的，您可以隨時取消高級用戶訂閱。取消後您將繼續享有服務直到當前計費週期結束，之後自動降級為免費用戶。"
                },
                {
                  question: "月付和年付方案有什麼區別？",
                  answer: "功能完全相同，年付方案更優惠，一年只需 HKD 368，相比月付可節省 HKD 88，平均每月只需 HKD 30.7。"
                },
                {
                  question: "升級後我的免費期間數據會保留嗎？",
                  answer: "當然！您的所有占卜記錄、歷史數據和個人設置都會完整保留，升級後還會享受雲端同步功能。"
                },
                {
                  question: "高級用戶真的可以無限占卜嗎？",
                  answer: "是的！高級用戶沒有每日占卜次數限制，您可以隨時進行占卜，並享受 AI 深度解讀和所有高級功能。"
                },
                {
                  question: "如果我降級會怎樣？",
                  answer: "降級後您的數據會保留，但會受到免費用戶的限制（每日 3 次占卜）。您可以隨時重新升級恢復所有高級功能。"
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mystical-card"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
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
                立即升級，開啟無限可能
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                加入數千名高級用戶，體驗 SoulCards 的完整力量。
                無限占卜，專業洞察，助您探索人生道路。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="cosmic-button text-lg px-8 py-4">
                  開始月付訂閱
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-void-950 px-8 py-4 rounded-lg transition-all duration-300">
                  選擇年付方案
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Pricing