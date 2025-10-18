import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const navItems = [
    { name: '首頁', path: '/' },
    { name: '功能特色', path: '/features' },
    { name: '價格', path: '/pricing' },
    { name: '關於我們', path: '/about' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-void-900/95 backdrop-blur-md border-b border-mystical-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/icon-180.png" 
              alt="SoulCards Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-white group-hover:text-mystical-300 transition-colors">
              SoulCards
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-lg font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-mystical-300'
                    : 'text-white hover:text-mystical-300'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mystical-gradient"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-mystical-gradient rounded-full text-white font-semibold hover:shadow-lg hover:shadow-mystical-500/25 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-mystical-300 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-void-900/98 backdrop-blur-md border-t border-mystical-500/20"
          >
            <div className="container mx-auto px-6 py-6">
              <nav className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`block text-lg font-medium py-2 transition-colors duration-300 ${
                        location.pathname === item.path
                          ? 'text-mystical-300'
                          : 'text-white hover:text-mystical-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-6 pt-6 border-t border-mystical-500/20"
              >
                <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-mystical-gradient rounded-full text-white font-semibold">
                  <Download className="w-5 h-5" />
                  <span>Download SoulCards</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header