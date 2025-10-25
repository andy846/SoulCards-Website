import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import StarfieldBackground from './components/StarfieldBackground'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import About from './pages/About'
import Cookies from './pages/Cookies'

function App() {
  return (
    <div className="min-h-screen bg-void-900 text-white relative">
      <StarfieldBackground />
      
      <div className="relative z-10">
        <Header />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/cookies" element={<Cookies />} />
          </Routes>
        </motion.main>

        <Footer />
      </div>
    </div>
  )
}

export default App
