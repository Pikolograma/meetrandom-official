import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

import VideoPlayer from '@/components/video/VideoPlayer';
import ChatBox from '@/components/video/ChatBox';
import ControlBar from '@/components/video/ControlBar';

export default function VideoChat() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineCount, setOnlineCount] = useState(2847);
  const [connectionCount, setConnectionCount] = useState(0);

  // Initialize local camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
      } catch (err) {
        console.log('Camera access denied:', err);
      }
    };
    initCamera();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Simulate online count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 21) - 10);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  }, [localStream]);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  }, [localStream]);

  const handleNext = useCallback(() => {
    // Disconnect from current
    if (isConnected) {
      setRemoteStream(null);
      setIsConnected(false);
      setMessages(prev => [...prev, {
        text: "L'inconnu s'est déconnecté.",
        isSystem: true,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }]);
    }

    // Start searching
    setIsSearching(true);
    setMessages([]);

    // Simulate finding someone (in real app, this would be WebRTC/signaling)
    const searchTime = 2000 + Math.random() * 3000;
    setTimeout(() => {
      setIsSearching(false);
      setIsConnected(true);
      setConnectionCount(prev => prev + 1);
      setMessages([{
        text: "Tu es connecté avec un inconnu. Dis bonjour !",
        isSystem: true,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }]);
      
      // Simulate remote stream (in real app, would come from WebRTC)
      // For demo, we'll just show a connected state
    }, searchTime);
  }, [isConnected]);

  const handleStop = useCallback(() => {
    setIsSearching(false);
    setIsConnected(false);
    setRemoteStream(null);
    if (isConnected) {
      setMessages(prev => [...prev, {
        text: "Tu as quitté la conversation.",
        isSystem: true,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [isConnected]);

  const handleSendMessage = useCallback((text) => {
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { text, isOwn: true, time }]);
    
    // Simulate response (in real app, would send via WebRTC data channel)
    if (isConnected) {
      setTimeout(() => {
        const responses = [
          "Salut ! Comment ça va ?",
          "Hey ! D'où tu viens ?",
          "Hello ! 😊",
          "Coucou !",
          "Salut, tu fais quoi dans la vie ?",
          "Bien et toi ?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, {
          text: randomResponse,
          isOwn: false,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000 + Math.random() * 2000);
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="px-4 py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Home')}>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">M</span>
              </div>
              <span className="text-lg font-semibold hidden sm:block">MeetRandom</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">{connectionCount} connexions</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300">{onlineCount.toLocaleString()} en ligne</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          {/* Video section */}
          <div className={`${isChatOpen ? 'lg:col-span-2' : 'lg:col-span-3'} flex flex-col gap-4 transition-all duration-300`}>
            {/* Remote video (large) */}
            <div className="flex-1 relative">
              <VideoPlayer
                stream={remoteStream}
                isSearching={isSearching}
                isConnecting={false}
                label={isConnected ? "Inconnu" : null}
              />
              
              {/* Local video (small overlay) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-4 right-4 w-32 sm:w-48 aspect-video rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl"
              >
                <VideoPlayer
                  stream={localStream}
                  muted={true}
                  isLocal={true}
                  label="Toi"
                />
              </motion.div>

              {/* Status overlay */}
 