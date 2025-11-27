import React from 'react';
import { 
  Video, VideoOff, Mic, MicOff, 
  SkipForward, PhoneOff, MessageCircle,
  Settings, Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function ControlBar({
  isVideoOn,
  isMicOn,
  onToggleVideo,
  onToggleMic,
  onNext,
  onStop,
  onToggleChat,
  isChatOpen,
  isConnected,
  isSearching
}) {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-center gap-3 p-4">
        {/* Left controls */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleMic}
                className={cn(
                  "w-12 h-12 rounded-full transition-all duration-200",
                  isMicOn 
                    ? "bg-white/10 hover:bg-white/20 text-white" 
                    : "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                )}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMicOn ? 'Couper le micro' : 'Activer le micro'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleVideo}
                className={cn(
                  "w-12 h-12 rounded-full transition-all duration-200",
                  isVideoOn 
                    ? "bg-white/10 hover:bg-white/20 text-white" 
                    : "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                )}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isVideoOn ? 'Couper la caméra' : 'Activer la caméra'}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Center controls */}
        <div className="flex items-center gap-3 mx-4">
          {(isConnected || isSearching) && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onStop}
                  className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all duration-200 hover:scale-105"
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrêter</p>
              </TooltipContent>
            </Tooltip>
          )}
