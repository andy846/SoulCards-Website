import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            SoulCards
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            神秘塔羅之旅 - 探索你的內心世界
          </p>
          <div className="space-y-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              開始占卜
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home