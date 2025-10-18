import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Reading from './pages/Reading'
import About from './pages/About'
import './App.css'

function App() {
  return (
    <Router basename="/SoulCards-Website">
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App