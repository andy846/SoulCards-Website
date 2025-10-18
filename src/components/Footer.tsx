import React from 'react';
import { motion } from 'framer-motion';
import { Star, Mail, Shield, FileText, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: '功能介紹', path: '/features' },
      { name: '訂閱方案', path: '/pricing' },
      { name: '系統需求', path: '/requirements' },
    ],
    legal: [
      { name: '隱私政策', path: '/privacy' },
      { name: '服務條款', path: '/terms' },
      { name: '退款政策', path: '/refund' },
    ],
    company: [
      { name: '關於我們', path: '/about' },
      { name: '聯繫我們', path: '/contact' },
      { name: '支援中心', path: '/support' },
    ],
  };

  const socialLinks = [
    { name: 'App Store', url: '#', icon: '📱' },
    { name: 'Email', url: 'mailto:andy846@soulcards-app.com', icon: '✉️' },
  ];

  return (
    <footer className="relative bg-mystical-cosmic-black/50 border-t border-mystical-gold/20">
      {/* 星空粒子背景 */}
      <div className="cosmic-particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="/assets/icons/icon-1024.png"
                  alt="SoulCards"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-xl font-bold text-gradient">SoulCards</span>
            </Link>
            <p className="text-mystical-star-silver text-sm mb-6 leading-relaxed">
              探索塔羅的神秘世界，透過 AI 智慧解讀，獲得人生指引與內心洞察。
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-mystical-gold/10 rounded-full flex items-center justify-center text-mystical-gold hover:bg-mystical-gold hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-mystical-gold font-semibold mb-4">產品</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-mystical-star-silver hover:text-mystical-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-mystical-gold font-semibold mb-4">法律條款</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-mystical-star-silver hover:text-mystical-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-mystical-gold font-semibold mb-4">公司</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-mystical-star-silver hover:text-mystical-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-mystical-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-mystical-star-silver">
              <span>&copy; {currentYear} SoulCards. 版權所有。</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/privacy"
                className="flex items-center space-x-1 text-mystical-star-silver hover:text-mystical-gold transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span>隱私保護</span>
              </Link>
              <Link
                to="/terms"
                className="flex items-center space-x-1 text-mystical-star-silver hover:text-mystical-gold transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>服務條款</span>
              </Link>
            </div>
          </div>
          
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-mystical-star-silver text-xs flex items-center justify-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-mystical-pink" />
              <span>for spiritual seekers</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;