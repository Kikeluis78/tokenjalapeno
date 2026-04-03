'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Page } from '@/components/PageLayout';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AuthButton } from '@/components/AuthButton';

export default function Home() {
  const [loading, setLoading] = useState(false); // Cambiado a false por defecto

  if (loading) {
    return <LoadingSpinner onComplete={() => setLoading(false)} />;
  }

  return (
    <Page>
      <Page.Main className="min-h-screen bg-linear-to-br from-purple-900 via-pink-800 to-orange-600 relative overflow-hidden">
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              initial={{ y: -100, x: Math.random() * window.innerWidth }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: 360,
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              {['🎰', '🎲', '🃏', '💰', '⭐', '🌶️', '₿', 'Ξ', '◎', '💎', '🪙'][Math.floor(Math.random() * 11)]}
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
          
          {/* Título 3D con efecto globo */}
          <motion.div 
            className="text-center mb-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <h1 className="text-9xl md:text-[12rem] font-black mb-4 leading-none" style={{
                textShadow: '0 15px 0 rgba(0,0,0,0.4), 0 20px 30px rgba(0,0,0,0.6)',
                WebkitTextStroke: '4px black',
                paintOrder: 'stroke fill',
                letterSpacing: '0.05em'
              }}>
                <span className="text-red-500">L</span>
                <span className="text-yellow-400">O</span>
                <span className="text-green-500">T</span>
                <span className="text-blue-500">E</span>
                <span className="text-purple-500">R</span>
                <span className="text-pink-500">Í</span>
                <span className="text-orange-500">A</span>
              </h1>
              <h2 className="text-7xl md:text-8xl font-black mb-2 leading-none" style={{
                textShadow: '0 12px 0 rgba(0,0,0,0.4), 0 15px 25px rgba(0,0,0,0.6)',
                WebkitTextStroke: '3px black',
                paintOrder: 'stroke fill',
              }}>
                <span className="text-yellow-400">M</span>
                <span className="text-green-500">E</span>
                <span className="text-blue-500">X</span>
                <span className="text-purple-500">I</span>
                <span className="text-pink-500">C</span>
                <span className="text-orange-500">A</span>
                <span className="text-red-500">N</span>
                <span className="text-cyan-500">A</span>
              </h2>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 mt-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-3xl">🌶️</span>
              <h3 className="text-3xl font-black text-red-600" style={{
                textShadow: '0 3px 0 rgba(0,0,0,0.3), 0 5px 10px rgba(0,0,0,0.4)',
                WebkitTextStroke: '1.5px black',
                paintOrder: 'stroke fill',
              }}>
                Jalapeño
              </h3>
            </motion.div>
          </motion.div>

          {/* Cards de juego con animación */}
          <div className="flex justify-center mb-12">
            <motion.div 
              className="bg-linear-to-br from-red-500 to-pink-600 rounded-3xl shadow-2xl p-6 border-4 border-yellow-400 relative overflow-hidden max-w-md w-full"
              whileHover={{ scale: 1.05, rotate: 2 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="absolute inset-0 bg-white opacity-20"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <div className="text-7xl mb-3 text-center relative z-10">🎮</div>
              <h3 className="text-3xl font-black text-white mb-4 text-center" style={{
                textShadow: '3px 3px 6px rgba(0,0,0,0.5)'
              }}>Humano vs IA</h3>
              <div className="flex justify-center relative z-10">
                <AuthButton />
              </div>
            </motion.div>
          </div>

          {/* Próximamente - más pequeño */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-12">
            <motion.div 
              className="bg-linear-to-br from-gray-700 to-gray-900 rounded-2xl shadow-xl p-4 border-2 border-gray-500 opacity-60"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl mb-2 text-center">👥</div>
              <h3 className="text-lg font-black text-gray-300 text-center">Multijugador</h3>
              <p className="text-xs text-gray-400 text-center">Próximamente</p>
            </motion.div>

            <motion.div 
              className="bg-linear-to-br from-gray-700 to-gray-900 rounded-2xl shadow-xl p-4 border-2 border-gray-500 opacity-60"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-4xl mb-2 text-center">🏆</div>
              <h3 className="text-lg font-black text-gray-300 text-center">Torneo</h3>
              <p className="text-xs text-gray-400 text-center">Próximamente</p>
            </motion.div>
          </div>

          {/* Footer minimalista */}
          <footer className="text-center text-white/60 text-sm py-6">
            <p>© 2026 Jalapeño 🌶️ | Powered by World App</p>
          </footer>
        </div>
      </Page.Main>
    </Page>
  );
}
