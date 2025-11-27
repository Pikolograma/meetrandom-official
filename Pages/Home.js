import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Video, MessageCircle, Shield, Zap, ChevronRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-6">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Meet<span className="text-emerald-400">Random</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">2,847 en ligne</span>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="px-6 pt-12 md:pt-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300">Rencontres aléatoires dans le monde entier</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  Parle avec des
                  <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    inconnus
                  </span>
                </h1>
                
                <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-lg">
                  Découvre de nouvelles personnes du monde entier en vidéo. 
                  Une connexion, une conversation, une rencontre unique.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={createPageUrl('VideoChat')}>
                    <Button
                      size="lg"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="group relative px-8 py-7 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-2xl shadow-2xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/40"
                    >
                      <span className="flex items-center gap-3">
                        <Video className="w-5 h-5" />
                        Commencer la vidéo
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                      </span>
                    </Button>
                  </Link>
                  
                  <Link to={createPageUrl('VideoChat') + '?mode=text'}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-7 text-lg font-semibold rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    >
                      <MessageCircle className="w-5 h-5 mr-3" />
                      Chat texte
                    </Button>
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sécurisé</p>
                      <p className="text-xs text-gray-500">Connexion chiffrée</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Instantané</p>
                      <p className="text-xs text-gray-500">Pas d'inscription</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  {/* Main card */}
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/10 p-2 shadow-2xl">
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden relative">
                      {/* Fake video preview */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                            <Video className="w-8 h-8 text-emerald-400" />
                          </div>
                          <p className="text-gray-500 text-sm">Prêt à se connecter...</p>
                        </div>
                      </div>
                      
                      {/* Status indicator */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-xs text-white/80">En attente</span>
                      </div>
                    </div>
                    
                    {/* Control bar preview */}
                    <div className="flex items-center justify-center gap-4 py-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Video className="w-5 h-5 text-white/60" />
                      </div>
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                        <ChevronRight className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white/60" />
                      </div>
                    </div>
                  </div>

                  {/* Floating mini card */}
                  <div className="absolute -bottom-6 -left-6 w-32 h-24 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-1.5 shadow-xl">
                    <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-pink-500/30 flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2025 MeetRandom. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="hover:text-white cursor-pointer transition-colors">Conditions</span>
              <span className="hover:text-white cursor-pointer transition-colors">Confidentialité</span>
              <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}