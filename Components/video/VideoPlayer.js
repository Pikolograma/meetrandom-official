import React, { useEffect, useRef } from 'react';
import { User, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VideoPlayer({ 
  stream, 
  muted = false, 
  isLocal = false, 
  isConnecting = false,
  isSearching = false,
  label 
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={cn(
      "relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden",
      isLocal ? "aspect-video" : "aspect-video"
    )}>
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted}
          className={cn(
            "w-full h-full object-cover",
            isLocal && "transform scale-x-[-1]"
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {isSearching ? (
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center animate-pulse">
                    <User className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-emerald-500/30 animate-ping" />
                <div className="absolute inset-0 w-24 h-24 rounded-full border border-cyan-500/20 animate-ping delay-300" />
              </div>
              <p className="text-gray-400 text-lg font-medium">Recherche en cours...</p>
              <p className="text-gray-600 text-sm mt-2">Connexion à un inconnu</p>
            </div>
          ) : isConnecting ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <WifiOff className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-gray-400">Connexion...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <User className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-500">En attente</p>
            </div>
          )}
        </div>
      )}

      {/* Label badge */}
      {label && stream && (
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
          <span className="text-xs text-white/90 font-medium">{label}</span>
        </div>
      )}

      {/* Live indicator */}
      {stream && (
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs text-white/80 font-medium">LIVE</span>
        </div>
      )}
    </div>
  );
}