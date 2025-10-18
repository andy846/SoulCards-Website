import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Mail, Twitter, Instagram, Facebook, Heart } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    product: [
      { name: '功能特色', path: '/features' },
      { name: '價格方案', path: '/pricing' },
      { name: '立即下載', path: '/#download' }
    ],
    company: [
      { name: '關於我們', path: '/about' },
      { name: '聯絡我們', path: '/contact' },
      { name: '部落格', path: '/blog' }
    ],
    legal: [
      { name: '隱私政策', path: '/privacy' },
      { name: '服務條款', path: '/terms' },
      { name: 'Cookie 政策', path: '/cookies' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Community', path: '/community' }
    ]
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/soulcards', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/soulcards', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/soulcards', label: 'Facebook' }
  ]

  return (
    <footer className="bg-void-900 border-t border-mystical-500/20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 md:col-span-4 sm:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-mystical-gradient rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">SoulCards</span>
              </Link>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Discover your path with AI-powered tarot readings. Ancient wisdom meets modern technology 
                to guide your spiritual journey.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">保持聯繫</h4>
                <div className="flex max-w-md">
                  <input
                    type="email"
                    placeholder="輸入您的電子郵件"
                    className="flex-1 px-4 py-3 bg-void-800 border border-mystical-500/30 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-mystical-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-mystical-gradient rounded-r-lg text-white font-semibold hover:shadow-lg hover:shadow-mystical-500/25 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-mystical-500/20 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-mystical-gradient transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-mystical-300 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-mystical-300 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Legal Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-mystical-300 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Support Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-mystical-300 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-mystical-500/20">
        <div className="container mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="text-gray-400 text-sm">
              © 2024 SoulCards. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </motion.div>
              <span>for spiritual seekers worldwide</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-mystical-300 transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-mystical-300 transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-mystical-300 transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mystical Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mystical-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cosmic-500/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  )
}

export default Footer