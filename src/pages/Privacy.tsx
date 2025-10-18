import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

const Privacy: React.FC = () => {
  const privacyPrinciples = [
    {
      icon: Shield,
      title: '數據保護',
      description: '我們採用業界最高標準的加密技術保護您的個人資料。',
    },
    {
      icon: Lock,
      title: '安全存儲',
      description: '所有數據都經過加密存儲，確保您的隱私安全無虞。',
    },
    {
      icon: Eye,
      title: '透明公開',
      description: '我們清楚說明數據的收集、使用和分享方式。',
    },
    {
      icon: UserCheck,
      title: '用戶控制',
      description: '您擁有完全的數據控制權，可隨時查看、修改或刪除。',
    },
  ];

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
            <span className="text-gradient">隱私政策</span>
          </h1>
          <p className="text-xl md:text-2xl text-mystical-star-silver mb-8 max-w-3xl mx-auto leading-relaxed">
            我們重視並保護您的隱私權，以下說明我們如何收集、使用和保護您的個人資料
          </p>
          <div className="text-mystical-star-silver">
            最後更新：{lastUpdated}
          </div>
        </motion.div>
      </Section>

      {/* Privacy Principles */}
      <Section background="dark">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">隱私保護原則</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {privacyPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="w-16 h-16 mx-auto bg-mystical-gold/10 rounded-full flex items-center justify-center mb-6">
                  <principle.icon className="w-8 h-8 text-mystical-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {principle.title}
                </h3>
                <p className="text-mystical-star-silver leading-relaxed">
                  {principle.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Privacy Policy Content */}
      <Section background="gradient">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Database className="w-6 h-6 text-mystical-gold mr-3" />
                資料收集
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>我們可能收集以下類型的資料：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>帳戶資訊：包括您的 Apple ID 相關資訊</li>
                  <li>使用資料：App 使用情況、占卜記錄、偏好設定</li>
                  <li>設備資訊：設備型號、作業系統版本、唯一設備識別碼</li>
                  <li>分析資料：匿名化的使用統計和效能資料</li>
                </ul>
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
                <Eye className="w-6 h-6 text-mystical-gold mr-3" />
                資料使用
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>我們使用收集的資料來：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>提供和改善 SoulCards 服務</li>
                  <li>個人化您的塔羅體驗</li>
                  <li>處理訂閱和付款</li>
                  <li>提供客戶支援</li>
                  <li>分析和改善 App 效能</li>
                  <li>遵守法律義務</li>
                </ul>
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
                <Lock className="w-6 h-6 text-mystical-gold mr-3" />
                資料保護
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>我們採取以下措施保護您的資料：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>端到端加密技術</li>
                  <li>安全的雲端存儲服務</li>
                  <li>定期安全審核和更新</li>
                  <li>嚴格的員工存取控制</li>
                  <li>符合國際資料保護標準</li>
                </ul>
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
                <UserCheck className="w-6 h-6 text-mystical-gold mr-3" />
                您的權利
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>您擁有以下權利：</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>查看我們持有的您的個人資料</li>
                  <li>要求更正不準確的資料</li>
                  <li>要求刪除您的個人資料</li>
                  <li>限制資料處理</li>
                  <li>資料可攜性</li>
                  <li>撤回同意</li>
                </ul>
                <p className="mt-4">
                  如需行使這些權利，請聯繫我們：
                  <a href="mailto:andy846@soulcards-app.com" className="text-mystical-gold hover:underline ml-1">
                    andy846@soulcards-app.com
                  </a>
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
                <AlertCircle className="w-6 h-6 text-mystical-gold mr-3" />
                政策更新
              </h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>
                  我們可能會不時更新此隱私政策。重大變更將通過 App 內通知或電子郵件告知您。
                  建議您定期查看此頁面以了解最新的隱私保護措施。
                </p>
                <p>
                  繼續使用 SoulCards 即表示您同意更新後的隱私政策。
                </p>
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
              <h2 className="text-2xl font-bold text-white mb-6">聯繫我們</h2>
              <div className="space-y-4 text-mystical-star-silver">
                <p>如果您對此隱私政策有任何疑問或建議，請聯繫我們：</p>
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

export default Privacy;