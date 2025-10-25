import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, Database, Users, Globe } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>私隱政策 - SoulCards</title>
        <meta name="description" content="了解 SoulCards 如何保護您的個人資料和私隱。我們致力於透明的資料處理和用戶權利保護。" />
        <meta name="keywords" content="私隱政策, 資料保護, 個人資料, SoulCards, 塔羅占卜" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                  <Shield className="h-12 w-12 text-purple-300" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                私隱政策
              </h1>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
                我們重視您的私隱，並致力於保護您的個人資料。了解我們如何收集、使用、存儲和保護您的資料。
              </p>
              <div className="mt-8 text-sm text-purple-300">
                最後更新日期：2025年
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-400/30 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="p-2 bg-purple-500/30 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-300" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-2">重要提示</h3>
                <p className="text-purple-300 leading-relaxed">
                  使用本應用即表示您同意本私隱政策的條款。我們採用業界標準的安全措施保護您的資料，並承諾不會出售您的個人資料。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Principles */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-purple-200">我們的私隱原則</h2>
            <p className="text-purple-300 max-w-2xl mx-auto">
              我們的私隱保護建立在透明度、安全性和用戶控制的基礎上
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6 mx-auto">
                <Lock className="h-8 w-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-purple-200">資料加密</h3>
              <p className="text-purple-300 text-center leading-relaxed">
                使用端到端加密保護您的資料傳輸，採用業界標準的安全措施保護本地存儲
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6 mx-auto">
                <Database className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-blue-200">本地儲存</h3>
              <p className="text-blue-300 text-center leading-relaxed">
                您的部分資料存儲在設備本地，包括用戶偏好、離線占卜記錄和應用設置
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full mb-6 mx-auto">
                <Users className="h-8 w-8 text-pink-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-pink-200">用戶控制</h3>
              <p className="text-pink-300 text-center leading-relaxed">
                您擁有訪問、更正、刪除和可攜性等完整的資料控制權利
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Privacy Policy */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-12">
            
            {/* Section 1: Introduction */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">1. 引言</h2>
              <div className="space-y-4 text-purple-300 leading-relaxed">
                <p>
                  歡迎使用 SoulCards（以下簡稱「本應用」）。我們重視您的私隱，並致力於保護您的個人資料。本私隱政策說明我們如何收集、使用、存儲和保護您的資料。
                </p>
                <p>
                  使用本應用即表示您同意本私隱政策的條款。
                </p>
              </div>
            </div>

            {/* Section 2: Data Collection */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">2. 我們收集的資料</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">2.1 您提供的資料</h3>
                  <ul className="space-y-2 text-purple-300 leading-relaxed">
                    <li>• <strong>帳戶資料</strong>：當您註冊時，我們收集您的電郵地址、用戶名、頭像（如適用）</li>
                    <li>• <strong>個人檔案</strong>：您可以選擇性提供個人簡介、偏好設定等</li>
                    <li>• <strong>塔羅占卜記錄</strong>：您進行的占卜結果、筆記和標記</li>
                    <li>• <strong>意見回饋</strong>：您向我們提供的任何意見、評論或建議</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">2.2 自動收集的資料</h3>
                  <ul className="space-y-2 text-purple-300 leading-relaxed">
                    <li>• <strong>設備資料</strong>：設備型號、操作系統版本、唯一設備識別碼</li>
                    <li>• <strong>使用資料</strong>：應用使用情況、功能使用頻率、錯誤報告</li>
                    <li>• <strong>日誌資料</strong>：IP地址、訪問時間、瀏覽器類型（如適用）</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">2.3 第三方登入資料</h3>
                  <p className="text-purple-300 leading-relaxed mb-2">當您使用 Apple Sign-In 或 Google Sign-In 時：</p>
                  <ul className="space-y-2 text-purple-300 leading-relaxed">
                    <li>• 我們接收您的第三方帳戶識別碼</li>
                    <li>• 不會接收您的第三方密碼</li>
                    <li>• 根據第三方平台的私隱設置接收基本資料</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Data Usage */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">3. 資料使用目的</h2>
              <p className="text-purple-300 leading-relaxed mb-4">我們使用您的資料用於：</p>
              <ul className="space-y-2 text-purple-300 leading-relaxed">
                <li>• 提供和維護應用服務</li>
                <li>• 個人化您的使用體驗</li>
                <li>• 處理訂閱和付款（通過 Apple IAP）</li>
                <li>• 發送重要通知和更新</li>
                <li>• 改善應用功能和性能</li>
                <li>• 提供客戶支援</li>
                <li>• 遵守法律義務</li>
              </ul>
            </div>

            {/* Section 4: Data Storage and Protection */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">4. 資料存儲和保護</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">4.1 本地存儲</h3>
                  <ul className="space-y-2 text-purple-300 leading-relaxed">
                    <li>• 您的部分資料存儲在設備本地（使用 SwiftData）</li>
                    <li>• 包括：用戶偏好、離線占卜記錄、應用設置</li>
                    <li>• 我們使用業界標準加密保護本地資料</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">4.2 雲端同步</h3>
                  <ul className="space-y-2 text-purple-300 leading-relaxed">
                    <li>• 選擇性同步到 Supabase 雲端服務</li>
                    <li>• 包括：用戶檔案、占卜歷史、訂閱狀態</li>
                    <li>• 使用端到端加密保護傳輸中的資料</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">4.3 資料安全</h3>
                  <ul className="space-y-2 text-purple-300 leading-relaxed">
                    <li>• 採用行業標準的安全措施</li>
                    <li>• 定期備份和災難恢復</li>
                    <li>• 限制員工訪問您的個人資料</li>
                    <li>• 定期進行安全審計</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5: Data Sharing */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">5. 資料共享</h2>
              <p className="text-purple-300 leading-relaxed mb-4">我們不會出售您的個人資料。我們只在以下情況共享資料：</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">5.1 第三方服務提供商</h3>
                  <ul className="space-y-2 text-purple-300 leading-relaxed">
                    <li>• <strong>Apple Inc.</strong>：處理應用內購買和登入</li>
                    <li>• <strong>Google LLC</strong>：提供 Google 登入服務</li>
                    <li>• <strong>Supabase</strong>：雲端資料存儲和同步</li>
                    <li>• <strong>OpenRouter</strong>：AI 塔羅解讀服務</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">5.2 法律要求</h3>
                  <ul className="space-y-2 text-purple-300 leading-relaxed">
                    <li>• 遵守法律義務或政府機構的合法要求</li>
                    <li>• 保護我們的權利、私隱、安全或財產</li>
                    <li>• 調查、防止非法活動、欺詐或安全問題</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6: Your Rights */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">6. 您的權利</h2>
              <p className="text-purple-300 leading-relaxed mb-4">根據適用的資料保護法律，您擁有以下權利：</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">6.1 訪問權</h3>
                  <ul className="space-y-1 text-purple-300 leading-relaxed">
                    <li>• 要求我們提供您個人資料的副本</li>
                    <li>• 了解我們如何使用您的資料</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">6.2 更正權</h3>
                  <ul className="space-y-1 text-purple-300 leading-relaxed">
                    <li>• 更正不準確或不完整的個人資料</li>
                    <li>• 更新您的個人檔案信息</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">6.3 刪除權</h3>
                  <ul className="space-y-1 text-purple-300 leading-relaxed">
                    <li>• 要求刪除您的個人資料（某些情況下）</li>
                    <li>• 清除您的帳戶和相關資料</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">6.4 資料可攜性</h3>
                  <ul className="space-y-1 text-purple-300 leading-relaxed">
                    <li>• 以結構化、常用格式接收您的資料</li>
                    <li>• 將資料傳輸給其他服務提供商</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">6.5 撤回同意</h3>
                  <ul className="space-y-1 text-purple-300 leading-relaxed">
                    <li>• 隨時撤回對資料處理的同意</li>
                    <li>• 這不會影響撤回前基於同意的處理合法性</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 7: Data Retention */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">7. 資料保留</h2>
              <p className="text-purple-300 leading-relaxed mb-4">我們只在必要時保留您的資料：</p>
              <ul className="space-y-2 text-purple-300 leading-relaxed">
                <li>• <strong>帳戶資料</strong>：帳戶存續期間</li>
                <li>• <strong>占卜記錄</strong>：根據您的設置（可選擇保留或自動刪除）</li>
                <li>• <strong>日誌資料</strong>：通常保留 30-90 天</li>
                <li>• <strong>法律要求</strong>：根據適用法律的要求</li>
              </ul>
            </div>

            {/* Section 8: International Data Transfer */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">8. 國際資料傳輸</h2>
              <p className="text-purple-300 leading-relaxed mb-4">您的資料可能傳輸到您所在地以外的伺服器：</p>
              <ul className="space-y-2 text-purple-300 leading-relaxed">
                <li>• 使用加密保護傳輸中的資料</li>
                <li>• 確保接收方提供適當的資料保護</li>
                <li>• 遵守適用的資料傳輸法規</li>
              </ul>
            </div>

            {/* Section 9: Children's Privacy */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">9. 兒童私隱</h2>
              <ul className="space-y-2 text-purple-300 leading-relaxed">
                <li>• 本應用不針對 13 歲以下的兒童</li>
                <li>• 我們不會有意收集兒童的個人資料</li>
                <li>• 如發現收集了兒童資料，將立即刪除</li>
              </ul>
            </div>

            {/* Section 10: Third Party Links */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">10. 第三方連結</h2>
              <p className="text-purple-300 leading-relaxed mb-4">應用可能包含第三方網站或服務的連結：</p>
              <ul className="space-y-2 text-purple-300 leading-relaxed">
                <li>• 我們不對第三方的私隱做法負責</li>
                <li>• 建議查看第三方的私隱政策</li>
                <li>• 離開應用後的資料處理受第三方政策約束</li>
              </ul>
            </div>

            {/* Section 11: Policy Changes */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">11. 政策變更</h2>
              <p className="text-purple-300 leading-relaxed mb-4">我們可能更新本私隱政策：</p>
              <ul className="space-y-2 text-purple-300 leading-relaxed">
                <li>• 重大變更將通過應用通知您</li>
                <li>• 建議定期查看本政策</li>
                <li>• 變更後繼續使用即表示接受新條款</li>
              </ul>
            </div>

            {/* Section 12: Contact Us */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">12. 聯繫我們</h2>
              <p className="text-purple-300 leading-relaxed mb-4">如有私隱相關問題，請聯繫：</p>
              <ul className="space-y-2 text-purple-300 leading-relaxed">
                <li>• <strong>電郵</strong>：service@soulcards-app.com</li>
                <li>• <strong>應用內</strong>：設置 &gt; 幫助與反饋</li>
              </ul>
            </div>

            {/* Section 13: Legal Basis */}
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold mb-6 text-purple-200">13. 法律依據</h2>
              <p className="text-purple-300 leading-relaxed mb-4">我們的資料處理基於：</p>
              <ul className="space-y-2 text-purple-300 leading-relaxed">
                <li>• <strong>合同履行</strong>：提供您要求的服務</li>
                <li>• <strong>合法利益</strong>：改善服務、防止欺詐</li>
                <li>• <strong>同意</strong>：特定情況下的資料處理</li>
                <li>• <strong>法律義務</strong>：遵守適用法律要求</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acknowledgment Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl p-8 border border-purple-400/50 backdrop-blur-sm text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-purple-500/30 rounded-full">
                <Globe className="h-8 w-8 text-purple-300" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-purple-200">感謝您的信任</h3>
            <p className="text-purple-300 leading-relaxed mb-6">
              我們承諾保護您的私隱和個人資料。如果您對我們的私隱做法有任何疑問或建議，請隨時與我們聯繫。
            </p>
            <div className="text-sm text-purple-400">
              <p>最後更新：2025年</p>
              <p className="mt-2">本政策的某些部分可能因您所在地區而有所不同。請查看應用內的具體條款。</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;