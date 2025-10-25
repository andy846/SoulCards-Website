import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, Scale, FileText, AlertTriangle } from 'lucide-react';

const Terms = () => {
  const keyPoints = [
    {
      icon: <Scale className="w-8 h-8 text-purple-400" />,
      title: "公平使用",
      description: "我們的服務條款確保所有用戶都能公平地享受 SoulCards 的功能"
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-400" />,
      title: "娛樂目的",
      description: "塔羅占卜僅供娛樂和個人反思，不構成專業建議"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      title: "您的權利",
      description: "我們尊重並保護您的用戶權利和個人資料"
    }
  ];

  return (
    <>
      <Helmet>
        <title>服務條款 - SoulCards</title>
        <meta name="description" content="SoulCards 服務條款 - 了解我們的使用條款、用戶權利和責任" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                服務條款
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                歡迎使用 SoulCards 塔羅占卜應用。使用本服務即表示您同意遵守本服務條款。請仔細閱讀以下條款。
              </p>
              <div className="text-sm text-gray-400">
                最後更新：2025年
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Points */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center mb-4">
                    {point.icon}
                    <h3 className="text-xl font-semibold text-white ml-3">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <div className="prose prose-invert max-w-none">
                
                <div className="mb-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-400/30 relative">
                  <img 
                    src="/icon-1024.png" 
                    alt="SoulCards Icon" 
                    className="absolute top-4 right-4 w-12 h-12 opacity-30 rounded-lg"
                  />
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                    重要提示
                  </h2>
                  <p className="text-gray-300">
                    歡迎使用 SoulCards 塔羅占卜應用（以下簡稱「本服務」）。使用本服務即表示您同意遵守本服務條款。請仔細閱讀以下條款。
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  1. 接受條款
                </h2>
                <div className="text-gray-300 mb-6 space-y-3">
                  <p>1.1 通過下載、安裝、訪問或使用 SoulCards，您同意受本服務條款約束。</p>
                  <p>1.2 如果您不同意任何條款，請勿使用本服務。</p>
                  <p>1.3 我們保留隨時修改本條款的權利，修改後的條款將在應用內公佈。</p>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  2. 服務描述
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">2.1 塔羅占卜服務</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 提供數字塔羅牌占卜功能</li>
                    <li>• 包含多種塔羅牌陣和解讀</li>
                    <li>• 保存占卜歷史和個人筆記</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mb-3">2.2 AI 解讀服務</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 使用人工智能技術提供塔羅牌解讀</li>
                    <li>• AI 建議僅供參考，不構成專業建議</li>
                    <li>• 不保證 AI 解讀的準確性或完整性</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">2.3 訂閱服務</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 提供免費和付費訂閱選項</li>
                    <li>• 付費訂閱通過 Apple App Store 處理</li>
                    <li>• 訂閱自動續訂，除非提前取消</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">2.4 社交功能</h3>
                  <ul className="space-y-2">
                    <li>• 用戶檔案和頭像上傳</li>
                    <li>• 占卜結果分享（可選）</li>
                    <li>• 社區互動功能</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-purple-400" />
                  3. 用戶帳戶
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">3.1 註冊要求</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 提供準確、完整和最新的註冊信息</li>
                    <li>• 年滿 13 歲或在監護人同意下使用</li>
                    <li>• 對帳戶活動負全責</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">3.2 帳戶安全</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 保護您的登入憑證</li>
                    <li>• 立即通知任何未經授權的使用</li>
                    <li>• 我們對因您未遵守安全義務導致的損失不負責</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">3.3 第三方登入</h3>
                  <ul className="space-y-2">
                    <li>• 支持 Apple Sign-In 和 Google Sign-In</li>
                    <li>• 受第三方服務條款和私隱政策約束</li>
                    <li>• 我們不對第三方服務的問題負責</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  4. 訂閱和付款
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">4.1 訂閱類型</h3>
                  <div className="mb-4">
                    <p className="font-semibold text-purple-300 mb-2">免費版：</p>
                    <ul className="space-y-2 mb-4">
                      <li>• 基本塔羅牌占卜功能</li>
                      <li>• 有限的每日占卜次數</li>
                      <li>• 基本歷史記錄保存</li>
                    </ul>
                    
                    <p className="font-semibold text-purple-300 mb-2">Premium 訂閱：</p>
                    <ul className="space-y-2">
                      <li>• 無限制占卜次數</li>
                      <li>• 高級塔羅牌陣</li>
                      <li>• AI 深度解讀</li>
                      <li>• 雲端同步功能</li>
                      <li>• 優先客戶支持</li>
                    </ul>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">4.2 付款處理</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 所有付款通過 Apple App Store 處理</li>
                    <li>• 受 Apple 的付款條款約束</li>
                    <li>• 我們不存儲您的付款信息</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">4.3 自動續訂</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 訂閱自動續訂，週期與原始訂閱相同</li>
                    <li>• 在當前期間結束前至少 24 小時取消</li>
                    <li>• 通過 App Store 帳戶設置管理訂閱</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">4.4 退款政策</h3>
                  <ul className="space-y-2">
                    <li>• 退款受 Apple App Store 退款政策約束</li>
                    <li>• 請聯繫 Apple 支持處理退款請求</li>
                    <li>• 我們保留拒絕不合理退款請求的權利</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  5. 用戶內容
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">5.1 內容所有權</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 您保留對上傳內容的所有權</li>
                    <li>• 授予我們非獨家、全球性的使用許可</li>
                    <li>• 僅限於提供和改善服務的目的</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">5.2 內容責任</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 對您的所有內容負全責</li>
                    <li>• 不得上傳非法、有害或侵權內容</li>
                    <li>• 我們保留刪除不當內容的權利</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">5.3 頭像和個人檔案</h3>
                  <ul className="space-y-2">
                    <li>• 遵守社區標準和指導原則</li>
                    <li>• 不得使用冒犯性或不適當的圖像</li>
                    <li>• 我們保留要求更改的權利</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-purple-400" />
                  6. 知識產權
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">6.1 應用內容</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 所有塔羅牌圖像、設計和內容受版權保護</li>
                    <li>• 未經許可不得複製、分發或商業使用</li>
                    <li>• 僅限個人、非商業用途</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">6.2 商標</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• SoulCards 名稱和標誌是我們的商標</li>
                    <li>• 未經書面許可不得使用</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">6.3 用戶生成內容</h3>
                  <ul className="space-y-2">
                    <li>• 占卜筆記和個人解讀歸您所有</li>
                    <li>• 授予我們改善服務的使用權</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                  7. 免責聲明
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">7.1 占卜免責聲明</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 塔羅占卜僅供娛樂和個人反思用途</li>
                    <li>• 不構成專業建議（醫療、法律、財務等）</li>
                    <li>• 不對占卜結果的準確性負責</li>
                    <li>• 重要決定請諮詢專業人士</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">7.2 AI 解讀免責聲明</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• AI 生成的內容僅供參考</li>
                    <li>• 不保證準確性、完整性或適用性</li>
                    <li>• 不承擔因依賴 AI 建議導致的任何損失</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">7.3 服務可用性</h3>
                  <ul className="space-y-2">
                    <li>• 服務按「現狀」和「可用」基礎提供</li>
                    <li>• 不保證無中斷、及時或無錯誤</li>
                    <li>• 保留隨時修改或終止服務的權利</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  8. 責任限制
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">8.1 直接損害</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 對因我們的重大過失導致的直接損害負責</li>
                    <li>• 最高賠償限額為您最近 12 個月的訂閱費用</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">8.2 間接損害</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 不對間接、偶然、特殊或後果性損害負責</li>
                    <li>• 包括利潤損失、數據丟失、業務中斷等</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">8.3 第三方行為</h3>
                  <ul className="space-y-2">
                    <li>• 不對其他用戶或第三方的行為負責</li>
                    <li>• 不對第三方服務的問題負責</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-purple-400" />
                  9. 用戶行為
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">9.1 禁止行為</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 不得濫用、騷擾、威脅其他用戶</li>
                    <li>• 不得上傳惡意軟件或病毒</li>
                    <li>• 不得試圖未經授權訪問系統</li>
                    <li>• 不得進行自動化訪問或數據挖掘</li>
                    <li>• 不得冒充他人或提供虛假信息</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">9.2 合理使用</h3>
                  <ul className="space-y-2">
                    <li>• 不得過度使用服務資源</li>
                    <li>• 不得干擾服務的正常運行</li>
                    <li>• 不得繞過任何安全功能</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  10. 終止
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">10.1 用戶終止</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 隨時可以刪除帳戶停止使用</li>
                    <li>• 訂閱取消遵循 App Store 政策</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">10.2 我們的終止權</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 違反本條款時可暫停或終止帳戶</li>
                    <li>• 無理由終止，提前 30 天通知</li>
                    <li>• 終止後刪除您的內容（法律要求保留的除外）</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">10.3 終止後果</h3>
                  <ul className="space-y-2">
                    <li>• 失去對服務的訪問權限</li>
                    <li>• 訂閱費用不退還（除非法律要求）</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  11. 修改和更新
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">11.1 服務更新</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 保留隨時修改、暫停或終止服務的權利</li>
                    <li>• 重大變更將提前通知</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">11.2 條款更新</h3>
                  <ul className="space-y-2">
                    <li>• 保留修改本條款的權利</li>
                    <li>• 變更後繼續使用即表示接受新條款</li>
                    <li>• 重大變更將通過應用通知</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-purple-400" />
                  12. 適用法律
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">12.1 管轄法律</h3>
                  <ul className="space-y-2 mb-4">
                    <li>• 受香港特別行政區法律管轄</li>
                    <li>• 不考慮法律衝突原則</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white mb-3">12.2 爭議解決</h3>
                  <ul className="space-y-2">
                    <li>• 首先嘗試通過友好協商解決</li>
                    <li>• 協商不成時提交香港法院管轄</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  13. 聯繫方式
                </h2>
                <div className="text-gray-300 mb-6">
                  <p className="mb-4">如有任何問題或疑慮，請聯繫：</p>
                  <ul className="space-y-2">
                    <li>• <strong>支持郵箱</strong>：<a href="mailto:service@soulcards-app.com" className="text-mystical-400 hover:text-mystical-300 transition-colors duration-200 underline">service@soulcards-app.com</a></li>
                    <li>• <strong>應用內反饋</strong>：<a href="/#download" className="text-mystical-400 hover:text-mystical-300 transition-colors duration-200 underline">設置 &gt; 幫助與反饋</a></li>
                    <li>• <strong>一般查詢</strong>：<a href="mailto:info@soulcards-app.com" className="text-mystical-400 hover:text-mystical-300 transition-colors duration-200 underline">info@soulcards-app.com</a></li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  14. 其他條款
                </h2>
                <div className="text-gray-300 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">14.1 完整協議</h3>
                  <p className="mb-4">• 本條款構成完整協議，取代之前的所有協議</p>

                  <h3 className="text-lg font-semibold text-white mb-3">14.2 可分割性</h3>
                  <p className="mb-4">• 如某條款被認定無效，不影響其他條款的有效性</p>

                  <h3 className="text-lg font-semibold text-white mb-3">14.3 放棄</h3>
                  <p className="mb-4">• 我們未能執行某條款不構成對該條款的放棄</p>

                  <h3 className="text-lg font-semibold text-white mb-3">14.4 轉讓</h3>
                  <ul className="space-y-2">
                    <li>• 未經書面同意，您不得轉讓本協議下的權利</li>
                    <li>• 我們保留轉讓服務給第三方的權利</li>
                  </ul>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                感謝您的理解
              </h3>
              <p className="text-gray-300 mb-4">
                使用本服務即表示您已閱讀、理解並同意遵守本服務條款。
              </p>
              <p className="text-sm text-gray-400">
                最後更新：2025年
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Terms;