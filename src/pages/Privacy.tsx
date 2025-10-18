import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Shield, Lock, Eye, Database } from 'lucide-react'

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>隱私政策 - SoulCards AI 塔羅占卜</title>
        <meta name="description" content="了解 SoulCards 如何保護您的隱私和處理個人資料。我們致力於保持您的靈性旅程私密且安全。" />
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
              <div className="w-20 h-20 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                隱私政策
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Your spiritual journey is sacred. We are committed to protecting your privacy 
                and ensuring your personal data remains secure.
              </p>
              <p className="text-gray-400 mt-4">Last updated: January 2024</p>
            </motion.div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Our Privacy Principles</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Lock,
                  title: "Data Encryption",
                  description: "All your personal data and readings are encrypted using industry-standard AES-256 encryption."
                },
                {
                  icon: Eye,
                  title: "No Tracking",
                  description: "We don't track your behavior across other websites or sell your data to third parties."
                },
                {
                  icon: Database,
                  title: "Local Storage",
                  description: "Your readings and personal insights are stored locally on your device whenever possible."
                }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{principle.title}</h3>
                  <p className="text-gray-300">{principle.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 bg-void-900/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">1. Information We Collect</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">Account Information:</strong> When you create an account, we collect your email address and chosen username. We do not require your real name.</p>
                    <p><strong className="text-white">Reading Data:</strong> Your tarot readings, card selections, and personal interpretations are stored to provide you with reading history and personalized insights.</p>
                    <p><strong className="text-white">Usage Analytics:</strong> We collect anonymous usage data to improve our app's performance and user experience. This data cannot be linked back to your identity.</p>
                    <p><strong className="text-white">Device Information:</strong> We may collect device type, operating system version, and app version for technical support and optimization purposes.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">2. How We Use Your Information</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">Personalized Experience:</strong> We use your reading history to provide more accurate and personalized tarot interpretations.</p>
                    <p><strong className="text-white">Service Improvement:</strong> Anonymous usage data helps us understand how users interact with our app and identify areas for improvement.</p>
                    <p><strong className="text-white">Communication:</strong> We may send you important updates about our service, but we will never send unsolicited marketing emails.</p>
                    <p><strong className="text-white">Support:</strong> Your account information helps us provide customer support when you contact us.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">3. Data Storage and Security</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">Local Storage:</strong> Whenever possible, your personal readings and insights are stored locally on your device using encrypted storage.</p>
                    <p><strong className="text-white">Cloud Backup:</strong> For Premium users, we offer optional encrypted cloud backup of your reading history. This data is encrypted before transmission and storage.</p>
                    <p><strong className="text-white">Security Measures:</strong> We implement industry-standard security measures including encryption, secure servers, and regular security audits.</p>
                    <p><strong className="text-white">Data Retention:</strong> We retain your data only as long as necessary to provide our services or as required by law.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">4. Data Sharing and Third Parties</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">No Data Sales:</strong> We never sell, rent, or trade your personal information to third parties for marketing purposes.</p>
                    <p><strong className="text-white">Service Providers:</strong> We may share limited data with trusted service providers who help us operate our app (e.g., cloud hosting, analytics). These providers are bound by strict confidentiality agreements.</p>
                    <p><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and the safety of our users.</p>
                    <p><strong className="text-white">Anonymous Data:</strong> We may share anonymous, aggregated usage statistics that cannot be linked to individual users.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">5. Your Rights and Choices</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">Access:</strong> You can access and review your personal data through your account settings.</p>
                    <p><strong className="text-white">Correction:</strong> You can update or correct your personal information at any time.</p>
                    <p><strong className="text-white">Deletion:</strong> You can request deletion of your account and associated data. Some data may be retained for legal or security purposes.</p>
                    <p><strong className="text-white">Data Portability:</strong> Premium users can export their reading data in a standard format.</p>
                    <p><strong className="text-white">Opt-out:</strong> You can opt out of non-essential communications and data collection features.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">6. Children's Privacy</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>SoulCards is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">7. International Users</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>SoulCards is available worldwide. If you are located outside the United States, please note that your information may be transferred to and processed in the United States. By using our service, you consent to this transfer and processing.</p>
                    <p>For users in the European Union, we comply with GDPR requirements and provide additional rights as required by law.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">8. Changes to This Policy</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
                    <p>We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">9. Contact Us</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Email: privacy@soulcards.app</li>
                      <li>Website: Contact form on our website</li>
                      <li>Mail: SoulCards Privacy Team, [Address]</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Privacy