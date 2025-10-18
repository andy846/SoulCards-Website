import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Heart, Users, Lightbulb, Target, Award, Globe } from 'lucide-react'
import LazyImage from '../components/LazyImage'

const About = () => {
  const team = [
    {
      name: "Sarah Chen",
      role: "創辦人暨靈性導師",
      description: "結合20年以上塔羅專業與AI創新技術",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20wise%20woman%20with%20long%20dark%20hair%2C%20wearing%20mystical%20jewelry%2C%20warm%20smile%2C%20spiritual%20aura%2C%20soft%20lighting%2C%20professional%20headshot&image_size=square"
    },
    {
      name: "Marcus Rodriguez",
      role: "AI技術總監",
      description: "前Google AI研究員，專注於靈性科技發展",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20a%20hispanic%20man%20with%20beard%2C%20intelligent%20eyes%2C%20modern%20casual%20attire%2C%20tech%20background%2C%20confident%20expression&image_size=square"
    },
    {
      name: "Luna Nakamura",
      role: "用戶體驗設計總監",
      description: "為靈性探索者創造美麗直觀的使用體驗",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20portrait%20of%20an%20asian%20woman%20with%20creative%20style%2C%20artistic%20background%2C%20colorful%20elements%2C%20designer%20aesthetic%2C%20inspiring%20look&image_size=square"
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "真實性",
      description: "我們相信真正的靈性指導，既尊重古老智慧又擁抱現代科技。"
    },
    {
      icon: Users,
      title: "社群",
      description: "建立一個支持性社群，讓探索者能夠一起探索他們的靈性旅程。"
    },
    {
      icon: Lightbulb,
      title: "創新",
      description: "開創AI技術與傳統塔羅智慧融合的先河，提供更深層的洞察。"
    },
    {
      icon: Target,
      title: "目標",
      description: "賦能個人發現真正的道路，做出有意義的人生決定。"
    }
  ]

  const milestones = [
    {
      year: "2022",
      title: "The Vision",
      description: "Founded with the mission to democratize spiritual guidance through AI"
    },
    {
      year: "2023",
      title: "Beta Launch",
      description: "Released to 1,000 beta users, receiving overwhelming positive feedback"
    },
    {
      year: "2024",
      title: "Global Release",
      description: "Launched worldwide with 50,000+ users in the first month"
    },
    {
      year: "2024",
      title: "AI Breakthrough",
      description: "Achieved 95% accuracy in personalized reading interpretations"
    }
  ]

  return (
    <>
      <Helmet>
        <title>關於我們 - SoulCards AI 塔羅占卜</title>
        <meta name="description" content="了解 SoulCards 團隊和我們的使命，透過 AI 驅動的塔羅占卜帶來真實的靈性指導。認識魔法背後的人們。" />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-mystical-gradient opacity-10"></div>
          
          {/* AI Generated Background Images */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src="/ai-mystical-1.png"
              alt=""
              className="absolute top-10 right-10 w-32 h-32 object-cover rounded-full opacity-20 blur-sm"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.img
              src="/ai-mystical-2.png"
              alt=""
              className="absolute bottom-20 left-10 w-24 h-24 object-cover rounded-full opacity-15 blur-sm"
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                關於 SoulCards
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                我們致力於連接古老智慧與現代科技，
                讓每個人都能獲得真實的靈性指導。
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6 text-white">Our Story</h2>
                <div className="space-y-6 text-gray-300">
                  <p>
                    SoulCards was born from a simple yet profound realization: while technology has transformed 
                    every aspect of our lives, spiritual guidance remained largely unchanged for centuries.
                  </p>
                  <p>
                    Our founder, Sarah Chen, a master tarot reader with over two decades of experience, 
                    envisioned a world where the wisdom of tarot could reach anyone, anywhere, at any time. 
                    But not just any digital tarot—one that truly understood the seeker's journey.
                  </p>
                  <p>
                    Partnering with AI experts and spiritual practitioners, we've created something unprecedented: 
                    an AI that doesn't just interpret cards, but understands the deeper patterns of human experience, 
                    offering guidance that's both technologically advanced and spiritually authentic.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="mystical-card overflow-hidden relative">
                  <LazyImage 
                    src="/ai-mystical-3.png"
                    alt="AI 生成的神秘視覺元素"
                    className="h-80"
                    placeholder="技術與靈性的融合"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-semibold text-white mb-2">技術與靈性的融合</h3>
                    <p className="text-gray-300 text-sm">AI 驅動的塔羅牌占卜，將古老智慧與現代科技完美結合</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-void-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Our Values</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                These core principles guide everything we do at SoulCards
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Meet Our Team</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Passionate individuals dedicated to bringing you the best spiritual guidance experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-mystical-300 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-300">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-20 bg-void-900/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Our Journey</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Key milestones in our mission to revolutionize spiritual guidance
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="flex-1 mystical-card">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-mystical-gradient rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                    <div className="w-4 h-4 bg-mystical-gradient rounded-full flex-shrink-0"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Our Impact</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Numbers that reflect our commitment to serving the spiritual community
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "100K+", label: "Active Users", icon: Users },
                { number: "1M+", label: "Readings Given", icon: Award },
                { number: "50+", label: "Countries", icon: Globe },
                { number: "4.9", label: "App Store Rating", icon: Heart }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="mystical-card text-center"
                >
                  <div className="w-16 h-16 bg-cosmic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-mystical-gradient">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">加入我們的旅程</h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                成為重新定義數位時代靈性指導的社群一員。
                您的自我發現之旅從這裡開始。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cosmic-button"
                >
                  下載 SoulCards
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-mystical-900 transition-all duration-300"
                >
                  聯絡我們
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About