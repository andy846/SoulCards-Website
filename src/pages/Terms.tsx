import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, CreditCard, Shield, AlertTriangle, Users } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

const Terms: React.FC = () => {
  const lastUpdated = '2024年1月15日';

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
            <span className="text-gradient">服務條款</span>
          </h1>
          <p className="text-xl md:text-2xl text-mystical-star-silver mb-8 max-w-3xl mx-auto leading-relaxed">
            使用 SoulCards 服務前，請仔細閱讀以下條款與條件
          </p>
          <div className="text-mystical-star-silver">
            最後更新：{lastUpdated}
          </div>
        </motion.div>
      </Section>

      {/* Terms Content */}
      <Section background="dark">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Scale className="w-6 h-6 text-mystical-gold mr-3" />
                接受條款
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>
                  歡迎使用 SoulCards！這些服務條款（「條款」）構成您與 SoulCards（「我們」、「我們的」或「公司」）
                  之間具有法律約束力的協議。
                </p>
                <p>
                  通過下載、安裝或使用 SoulCards 應用程式，您同意受這些條款的約束。
                  如果您不同意這些條款，請不要使用我們的服務。
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 text-mystical-gold mr-3" />
                服務描述
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>SoulCards 是一款塔羅牌占卜應用程式，提供以下服務：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI 驅動的塔羅牌解讀</li>
                  <li>個人化占卜體驗</li>
                  <li>占卜歷史記錄</li>
                  <li>訂閱制高級功能</li>
                  <li>客戶支援服務</li>
                </ul>
                <p>
                  我們保留隨時修改、暫停或終止任何服務功能的權利，恕不另行通知。
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 text-mystical-gold mr-3" />
                用戶責任
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>使用 SoulCards 時，您同意：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>提供準確、完整的帳戶資訊</li>
                  <li>保護您的帳戶安全</li>
                  <li>不濫用或干擾服務運作</li>
                  <li>不進行任何非法活動</li>
                  <li>尊重其他用戶的權利</li>
                  <li>遵守所有適用的法律法規</li>
                </ul>
                <p>
                  您對通過您的帳戶進行的所有活動負責。
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <CreditCard className="w-6 h-6 text-mystical-gold mr-3" />
                付款與訂閱
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>關於付款和訂閱的重要資訊：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>所有付款通過 Apple App Store 處理</li>
                  <li>訂閱將自動續費，除非您取消</li>
                  <li>您可以隨時在 App Store 設定中管理訂閱</li>
                  <li>退款政策遵循 Apple App Store 的標準政策</li>
                  <li>價格可能因地區而異</li>
                  <li>我們保留隨時調整價格的權利</li>
                </ul>
                <p>
                  取消訂閱不會影響您已付費的當前計費週期。
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 text-mystical-gold mr-3" />
                知識產權
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>
                  SoulCards 及其所有內容（包括但不限於文字、圖像、設計、商標、軟體）
                  均受知識產權法保護，歸 SoulCards 或其授權方所有。
                </p>
                <p>您同意：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>不複製、修改或分發我們的內容</li>
                  <li>不進行反向工程或嘗試提取原始碼</li>
                  <li>不移除任何版權或商標聲明</li>
                  <li>僅為個人、非商業用途使用服務</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-mystical-gold mr-3" />
                免責聲明
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p className="font-semibold text-mystical-gold">重要聲明：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SoulCards 僅供娛樂和個人反思用途</li>
                  <li>塔羅解讀不應被視為專業建議</li>
                  <li>我們不對基於解讀結果的決定負責</li>
                  <li>服務按「現狀」提供，不提供任何保證</li>
                  <li>我們不保證服務的持續可用性</li>
                </ul>
                <p>
                  對於重要的人生決定，請諮詢相關專業人士。
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">責任限制</h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>
                  在法律允許的最大範圍內，SoulCards 對任何間接、偶然、特殊或後果性損害不承擔責任，
                  包括但不限於利潤損失、數據丟失或業務中斷。
                </p>
                <p>
                  我們的總責任不超過您在過去 12 個月內支付給我們的金額。
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">條款修改</h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>
                  我們保留隨時修改這些條款的權利。重大變更將通過 App 內通知或電子郵件告知您。
                </p>
                <p>
                  修改後的條款將在發布後立即生效。繼續使用服務即表示您接受修改後的條款。
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">聯繫資訊</h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>如果您對這些服務條款有任何疑問，請聯繫我們：</p>
                <div className="space-y-2">
                  <p>電子郵件：<a href="mailto:andy846@soulcards-app.com" className="text-mystical-gold hover:underline">andy846@soulcards-app.com</a></p>
                  <p>客服信箱：<a href="mailto:andy846@soulcards-app.com" className="text-mystical-gold hover:underline">andy846@soulcards-app.com</a></p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Terms;