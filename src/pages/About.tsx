import React from 'react'

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            關於 SoulCards
          </h1>
          <p className="text-lg text-purple-200 mb-8">
            探索塔羅的神秘世界，獲得心靈的指引
          </p>
        </div>
      </div>
    </div>
  )
}

export default About