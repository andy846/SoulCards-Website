import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Check, Star, Crown, Zap } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: "免費版",
      price: "$0",
      period: "永久免費",
      description: "適合初學者探索塔羅",
      icon: Star,
      features: [
        "每日3次占卜",
        "基礎牌義解釋",
        "簡單三張牌陣",
        "占卜記錄（7天）",
        "社群支援"
      ],
      limitations: [
        "僅限基礎牌陣",
        "無進階AI洞察",
        "含廣告"
      ],
      buttonText: "開始使用",
      popular: false
    },
    {
      name: "進階版",
      price: "$9.99",
      period: "每月",
      description: "解鎖AI塔羅的完整力量",
      icon: Crown,
      features: [
        "無限制每日占卜",
        "進階AI解讀",
        "所有塔羅牌陣",
        "無限占卜記錄",
        "個人占卜日誌",
        "詳細牌義說明",
        "優先客服支援",
        "無廣告體驗"
      ],
      limitations: [],
      buttonText: "開始免費試用",
      popular: true
    },
    {
      name: "終身版",
      price: "$99.99",
      period: "一次性付費",
      description: "永久完整存取權限",
      icon: Zap,
      features: [
        "包含進階版所有功能",
        "終身存取權限",
        "未來功能更新",
        "獨家內容",
        "VIP客服支援",
        "新功能搶先體驗",
        "自訂牌陣創建器",
        "占卜資料匯出"
      ],
      limitations: [],
      buttonText: "購買終身版",
      popular: false
    }
  ]

  const testimonials = [
    {
      name: "Emma Thompson",
      plan: "Premium",
      text: "The Premium plan has transformed my spiritual practice. The AI insights are incredibly detailed and accurate.",
      rating: 5,
      avatar: "🌟"
    },
    {
      name: "David Chen",
      plan: "Lifetime",
      text: "Best investment I've made for my spiritual journey. The lifetime plan pays for itself within a year.",
      rating: 5,
      avatar: "🔮"
    },
    {
      name: "Sarah Williams",
      plan: "Premium",
      text: "The unlimited readings and advanced spreads have helped me gain deeper insights into my life path.",
      rating: 5,
      avatar: "✨"
    }
  ]

  return (
    <>
      <Helmet>
        <title>價格方案 - SoulCards AI 塔羅占卜</title>
        <meta name="description" content="為您的靈性旅程選擇完美的 SoulCards 方案。提供免費版、進階版和終身版，具備先進的 AI 塔羅占卜功能。" />
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
                選擇您的道路
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                為您的靈性旅程選擇完美的方案。
                所有方案都包含我們核心的AI塔羅占卜技術。
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                        Most Popular
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
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-cosmic-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center gap-3 opacity-60">
                        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-gray-500"></div>
                        </div>
                        <span className="text-gray-400 text-sm">{limitation}</span>
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

        {/* Feature Comparison */}
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
                Feature Comparison
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                See exactly what's included in each plan to make the best choice for your needs.
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-mystical-700">
                    <th className="text-left py-4 px-6 text-white font-semibold">Features</th>
                    <th className="text-center py-4 px-6 text-white font-semibold">Free</th>
                    <th className="text-center py-4 px-6 text-white font-semibold">Premium</th>
                    <th className="text-center py-4 px-6 text-white font-semibold">Lifetime</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    { feature: "Daily Readings", free: "3", premium: "Unlimited", lifetime: "Unlimited" },
                    { feature: "Tarot Spreads", free: "Basic", premium: "All", lifetime: "All + Custom" },
                    { feature: "AI Insights", free: "Basic", premium: "Advanced", lifetime: "Advanced" },
                    { feature: "Reading History", free: "7 days", premium: "Unlimited", lifetime: "Unlimited" },
                    { feature: "Personal Journal", free: "❌", premium: "✅", lifetime: "✅" },
                    { feature: "Priority Support", free: "❌", premium: "✅", lifetime: "VIP" },
                    { feature: "Ad-free Experience", free: "❌", premium: "✅", lifetime: "✅" },
                    { feature: "Export Data", free: "❌", premium: "❌", lifetime: "✅" }
                  ].map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-b border-void-800 hover:bg-void-800/30"
                    >
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center">{row.free}</td>
                      <td className="py-4 px-6 text-center">{row.premium}</td>
                      <td className="py-4 px-6 text-center">{row.lifetime}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                What Our Subscribers Say
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
                  <p className="text-gray-500 text-sm">{testimonial.plan} User</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "Can I cancel my subscription anytime?",
                  answer: "Yes, you can cancel your Premium subscription at any time. You'll continue to have access until the end of your billing period."
                },
                {
                  question: "Is there a free trial for Premium?",
                  answer: "Yes! We offer a 7-day free trial for Premium so you can experience all the advanced features before committing."
                },
                {
                  question: "What happens to my data if I downgrade?",
                  answer: "Your reading history and journal entries are preserved. You'll just have limited access to some features until you upgrade again."
                },
                {
                  question: "Is the Lifetime plan really lifetime?",
                  answer: "Absolutely! The Lifetime plan gives you permanent access to SoulCards Premium features, including future updates and new features."
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
                Start Your Journey Today
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have unlocked their spiritual potential with SoulCards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="cosmic-button text-lg px-8 py-4">
                  Start Free Trial
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-void-950 px-8 py-4 rounded-lg transition-all duration-300">
                  Download Free Version
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