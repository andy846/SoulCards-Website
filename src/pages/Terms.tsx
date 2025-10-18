import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react'

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>服務條款 - SoulCards AI 塔羅占卜</title>
        <meta name="description" content="閱讀 SoulCards 的服務條款。了解使用我們 AI 驅動的塔羅占卜應用程式時的權利和責任。" />
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
              <div className="w-20 h-20 bg-cosmic-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                服務條款
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Clear and fair terms that govern your use of SoulCards. 
                We believe in transparency and mutual respect.
              </p>
              <p className="text-gray-400 mt-4">Last updated: January 2024</p>
            </motion.div>
          </div>
        </section>

        {/* Key Points */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Key Points</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Scale,
                  title: "Fair Usage",
                  description: "Use SoulCards responsibly and respect other users' experience. No abuse or misuse of our services."
                },
                {
                  icon: AlertTriangle,
                  title: "Entertainment Purpose",
                  description: "SoulCards is for entertainment and self-reflection. Not a substitute for professional advice."
                },
                {
                  icon: CheckCircle,
                  title: "Your Rights",
                  description: "You retain ownership of your personal readings and can export or delete your data at any time."
                }
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="w-16 h-16 bg-cosmic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <point.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{point.title}</h3>
                  <p className="text-gray-300">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Content */}
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
                  <h2 className="text-2xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>By downloading, installing, or using SoulCards ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.</p>
                    <p>These Terms constitute a legally binding agreement between you and SoulCards ("we," "us," or "our"). We may update these Terms from time to time, and your continued use of the App constitutes acceptance of any changes.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">2. Description of Service</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">SoulCards</strong> is an AI-powered tarot reading application that provides:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Digital tarot card readings with AI-generated interpretations</li>
                      <li>Personalized insights based on your reading history</li>
                      <li>Daily guidance and spiritual reflection tools</li>
                      <li>Reading history and progress tracking</li>
                      <li>Premium features for enhanced experience</li>
                    </ul>
                    <p><strong className="text-white">Important:</strong> SoulCards is intended for entertainment, self-reflection, and spiritual exploration purposes only. It is not a substitute for professional medical, psychological, legal, or financial advice.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">3. User Accounts and Registration</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">Account Creation:</strong> To access certain features, you may need to create an account. You must provide accurate and complete information.</p>
                    <p><strong className="text-white">Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                    <p><strong className="text-white">Age Requirement:</strong> You must be at least 13 years old to use SoulCards. Users under 18 should have parental consent.</p>
                    <p><strong className="text-white">One Account Per User:</strong> You may only create one account per person. Multiple accounts may be suspended or terminated.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">4. Acceptable Use</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">You agree to use SoulCards only for lawful purposes and in accordance with these Terms. You agree NOT to:</strong></p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Use the App for any illegal or unauthorized purpose</li>
                      <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                      <li>Reverse engineer, decompile, or disassemble the App</li>
                      <li>Use automated systems (bots, scripts) to access the App</li>
                      <li>Share your account credentials with others</li>
                      <li>Upload malicious code or attempt to disrupt the service</li>
                      <li>Violate any applicable laws or regulations</li>
                    </ul>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">5. Subscription and Payment Terms</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">Free Version:</strong> SoulCards offers a free version with basic features and limited daily readings.</p>
                    <p><strong className="text-white">Premium Subscription:</strong> Premium features are available through monthly or annual subscriptions. Pricing is displayed in the App and may vary by region.</p>
                    <p><strong className="text-white">Billing:</strong> Subscriptions are billed in advance and automatically renew unless cancelled. You can cancel anytime through your device's subscription settings.</p>
                    <p><strong className="text-white">Refunds:</strong> Refunds are handled according to the app store's refund policy (Apple App Store or Google Play Store).</p>
                    <p><strong className="text-white">Price Changes:</strong> We may change subscription prices with 30 days' notice. Changes will not affect your current billing cycle.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">6. Intellectual Property</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">Our Content:</strong> SoulCards, including its design, features, tarot card images, AI algorithms, and content, is owned by us and protected by copyright and other intellectual property laws.</p>
                    <p><strong className="text-white">Your Content:</strong> You retain ownership of your personal readings and insights. However, you grant us a license to use anonymous, aggregated data to improve our services.</p>
                    <p><strong className="text-white">Limited License:</strong> We grant you a limited, non-exclusive, non-transferable license to use the App for personal, non-commercial purposes.</p>
                    <p><strong className="text-white">Trademarks:</strong> SoulCards and related logos are our trademarks. You may not use them without our written permission.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">7. Privacy and Data Protection</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
                    <p>By using SoulCards, you consent to the collection and use of your information as described in our Privacy Policy.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">8. Disclaimers and Limitations</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">Entertainment Only:</strong> SoulCards is provided for entertainment and self-reflection purposes. Tarot readings should not be used as the sole basis for making important life decisions.</p>
                    <p><strong className="text-white">No Professional Advice:</strong> SoulCards does not provide medical, psychological, legal, financial, or other professional advice. Consult qualified professionals for such matters.</p>
                    <p><strong className="text-white">AI Limitations:</strong> Our AI-generated interpretations are based on algorithms and may not always be accurate or applicable to your specific situation.</p>
                    <p><strong className="text-white">Service Availability:</strong> We strive to maintain service availability but cannot guarantee uninterrupted access. We may suspend service for maintenance or other reasons.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">9. Limitation of Liability</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>To the maximum extent permitted by law, SoulCards and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.</p>
                    <p>Our total liability to you for any claims arising from your use of SoulCards shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">10. Termination</h2>
                  <div className="space-y-4 text-gray-300">
                    <p><strong className="text-white">By You:</strong> You may stop using SoulCards at any time and delete your account through the App settings.</p>
                    <p><strong className="text-white">By Us:</strong> We may suspend or terminate your account if you violate these Terms or for other reasons at our discretion.</p>
                    <p><strong className="text-white">Effect of Termination:</strong> Upon termination, your right to use the App ceases immediately. We may delete your account data according to our data retention policy.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">11. Governing Law and Disputes</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>These Terms are governed by the laws of [Jurisdiction], without regard to conflict of law principles.</p>
                    <p>Any disputes arising from these Terms or your use of SoulCards will be resolved through binding arbitration, except where prohibited by law.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">12. Changes to Terms</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>We may modify these Terms at any time. We will notify you of material changes through the App or by email. Your continued use of SoulCards after changes become effective constitutes acceptance of the new Terms.</p>
                  </div>
                </div>

                <div className="mystical-card">
                  <h2 className="text-2xl font-bold text-white mb-6">13. Contact Information</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>If you have questions about these Terms, please contact us:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Email: legal@soulcards.app</li>
                      <li>Website: Contact form on our website</li>
                      <li>Mail: SoulCards Legal Team, [Address]</li>
                    </ul>
                  </div>
                </div>

                <div className="mystical-card bg-mystical-600/20 border-mystical-400">
                  <h2 className="text-2xl font-bold text-white mb-6">14. Acknowledgment</h2>
                  <div className="space-y-4 text-gray-300">
                    <p>By using SoulCards, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. You also acknowledge that you have read and understood our Privacy Policy.</p>
                    <p className="text-mystical-300 font-semibold">Thank you for choosing SoulCards for your spiritual journey. We're honored to be part of your path to self-discovery.</p>
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

export default Terms