import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Shield, Paperclip } from 'lucide-react';
import { useGetAgentsQuery } from '../api/queries/useGetAgentsQuery';
import { useSendMessageMutation, TextResponse } from '../api/mutations/sendMessageMutation';

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [expandedProof, setExpandedProof] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<TextResponse[]>([
    {
      text: 'Hello! How can I assist you with your crypto portfolio today?',
      user: 'ai',
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: agents } = useGetAgentsQuery();
  const currentAgent = agents?.[0]; // Using the first agent by default

  const { mutate: sendMessage, isLoading } = useSendMessageMutation({
    setMessages,
    setSelectedFile,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;
    if (!currentAgent) return;

    // Add user message immediately
    setMessages(prev => [...prev, { text: input, user: 'user' }]);

    // Send message to API
    sendMessage({
      text: input,
      agentId: currentAgent.id,
      selectedFile,
    });

    setInput('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const toggleProof = (messageId: string) => {
    setExpandedProof(expandedProof === messageId ? null : messageId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 m-8 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-400/10">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {currentAgent?.name || 'AI Assistant'}
            </h2>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/20 py-1.5 px-3 rounded-full">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>Processing</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.user === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-xl p-4 ${
                message.user === 'user' 
                  ? 'bg-indigo-600/50 backdrop-blur-sm' 
                  : 'bg-gray-700/30 backdrop-blur-sm'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${
                    message.user === 'user' ? 'bg-purple-400/10' : 'bg-indigo-400/10'
                  }`}>
                    {message.user === 'user' ? (
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-indigo-400" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {message.user === 'user' ? 'You' : currentAgent?.name || 'AI Assistant'}
                  </span>
                </div>
                <p className="text-gray-100">
                  {message.text}
                </p>
                {message.attachments?.map((attachment, i) => (
                  <div key={i} className="mt-2">
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-2"
                    >
                      <Paperclip className="w-4 h-4" />
                      {attachment.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/20 p-2 rounded-lg">
                <Paperclip className="w-4 h-4" />
                <span>{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about crypto..."
                className="w-full rounded-xl bg-gray-700/50 border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-24"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white/5 hover:bg-white/10 text-white rounded-lg px-4 py-1.5 transition-all flex items-center gap-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}