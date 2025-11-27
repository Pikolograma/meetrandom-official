import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function ChatBox({ messages, onSendMessage, disabled, isConnected }) {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Chat</span>
          {isConnected && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span className="text-xs text-emerald-400">Connecté</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                {isConnected 
                  ? "Dis bonjour ! 👋" 
                  : "Les messages apparaîtront ici..."}
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  msg.isOwn ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-2.5 rounded-2xl",
                    msg.isOwn
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-br-md"
                      : "bg-white/10 text-white rounded-bl-md",
                    msg.isSystem && "bg-yellow-500/20 text-yellow-200 text-center max-w-full"
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  {!msg.isSystem && (
                    <p className={cn(
                      "text-[10px] mt-1",
                      msg.isOwn ? "text-white/60" : "text-gray-500"
                    )}>
                      {msg.time}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
 