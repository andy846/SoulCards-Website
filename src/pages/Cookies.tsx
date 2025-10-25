import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Cookie, Shield, Settings, Info } from 'lucide-react'

const Cookies = () => {
  return (
    <>
      <Helmet>
        <title>Cookie 政策 - SoulCards</title>
        <meta name="description" content="了解 SoulCards 如何使用 Cookie 來改善您的使用體驗。" />
        <meta name="keywords" content="Cookie 政策, 隱私, SoulCards, 數據保護" />
      </Helmet>

      <div className="min-h-screen bg-void-950 text-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-mystical-gradient">
          <div className="absolute inset-0 bg-void-950/80"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center">
                  <Cookie className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie 政策</h1>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                了解我們如何使用 Cookie 來改善您的 SoulCards 使用體驗
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Introduction */}
              <div className="mystical-card">
                <div className="flex items-center mb-4">
                  <Info className="w-6 h-6 text-mystical-400 mr-3" />
                  <h2 className="text-2xl font-bold text-purple-200">什麼是 Cookie？</h2>
                </div>
                <p className="text-purple-300 leading-relaxed mb-4">
                  Cookie 是當您訪問網站時，存儲在您設備上的小型文本文件。它們被廣泛用於使網站正常運行，
                  或更有效地運行，以及向網站所有者提供信息。
                </p>
                <p className="text-purple-300 leading-relaxed">
                  SoulCards 使用 Cookie 來改善您的使用體驗，記住您的偏好設置，並提供個人化的服務。
                </p>
              </div>

              {/* Types of Cookies */}
              <div className="mystical-card">
                <div className="flex items-center mb-6">
                  <Settings className="w-6 h-6 text-mystical-400 mr-3" />
                  <h2 className="text-2xl font-bold text-purple-200">我們使用的 Cookie 類型</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-200 mb-3">必要 Cookie</h3>
                    <p className="text-purple-300 leading-relaxed mb-2">
                      這些 Cookie 對於網站的基本功能是必需的，無法在我們的系統中關閉。
                    </p>
                    <ul className="list-disc list-inside text-purple-300 space-y-1 ml-4">
                      <li>用戶身份驗證</li>
                      <li>安全性和防欺詐保護</li>
                      <li>網站基本功能運行</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-purple-200 mb-3">功能性 Cookie</h3>
                    <p className="text-purple-300 leading-relaxed mb-2">
                      這些 Cookie 使網站能夠提供增強的功能和個人化設置。
                    </p>
                    <ul className="list-disc list-inside text-purple-300 space-y-1 ml-4">
                      <li>記住您的語言偏好</li>
                      <li>保存您的設置和偏好</li>
                      <li>提供個人化的內容</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-purple-200 mb-3">分析 Cookie</h3>
                    <p className="text-purple-300 leading-relaxed mb-2">
                      這些 Cookie 幫助我們了解訪問者如何與網站互動，讓我們改善用戶體驗。
                    </p>
                    <ul className="list-disc list-inside text-purple-300 space-y-1 ml-4">
                      <li>網站使用統計</li>
                      <li>頁面瀏覽量和訪問時間</li>
                      <li>用戶行為分析（匿名化）</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cookie Management */}
              <div className="mystical-card">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-mystical-400 mr-3" />
                  <h2 className="text-2xl font-bold text-purple-200">管理您的 Cookie 設置</h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-purple-300 leading-relaxed">
                    您可以通過以下方式管理 Cookie：
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-200 mb-2">瀏覽器設置</h3>
                      <p className="text-purple-300 leading-relaxed">
                        大多數瀏覽器允許您控制 Cookie 設置。您可以設置瀏覽器拒絕 Cookie，
                        或在 Cookie 被發送時提醒您。請注意，禁用 Cookie 可能會影響網站的某些功能。
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-purple-200 mb-2">第三方 Cookie</h3>
                      <p className="text-purple-300 leading-relaxed">
                        我們可能使用第三方服務（如 Google Analytics）來分析網站使用情況。
                        這些服務可能會設置自己的 Cookie。您可以通過相應的退出機制來管理這些 Cookie。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Updates */}
              <div className="mystical-card">
                <h2 className="text-2xl font-bold mb-4 text-purple-200">政策更新</h2>
                <p className="text-purple-300 leading-relaxed mb-4">
                  我們可能會不時更新此 Cookie 政策，以反映我們做法的變化或其他運營、法律或監管原因。
                </p>
                <p className="text-purple-300 leading-relaxed">
                  <strong>最後更新日期：</strong> 2025年1月
                </p>
              </div>

              {/* Contact */}
              <div className="mystical-card">
                <h2 className="text-2xl font-bold mb-4 text-purple-200">聯繫我們</h2>
                <p className="text-purple-300 leading-relaxed mb-4">
                  如果您對我們的 Cookie 政策有任何疑問，請聯繫我們：
                </p>
                <div className="bg-void-900/50 p-4 rounded-lg">
                  <p className="text-mystical-300">
                    <strong>電子郵件：</strong> 
                    <a href="mailto:service@soulcards-app.com" className="text-mystical-400 hover:text-mystical-300 ml-2">
                      service@soulcards-app.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Cookies