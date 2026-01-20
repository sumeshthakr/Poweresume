'use client';

import { useState } from 'react';
import type { Resume, Job } from '@/lib/schemas';

interface ChatInterfaceProps {
  resume: Partial<Resume> | null;
  job: Partial<Job> | null;
  onLatexUpdate: (latex: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface({
  resume,
  job,
  onLatexUpdate,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you tailor your resume. Try commands like:\n\n• "Make bullets more technical"\n• "Shorten to one page"\n• "Add more GPU/graphics focus"\n• "Emphasize leadership"\n• "Remove older job"\n\nWhat would you like to change?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI response (in production, this would call OpenAI API)
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: `I understand you want to: "${input}"\n\nNote: AI integration requires OpenAI API key. For now, you can manually edit the LaTeX code in the editor.\n\nIn the full version, I would:\n1. Analyze your request\n2. Modify the relevant sections\n3. Show you a diff of changes\n4. Update the LaTeX code\n5. Explain what changed and why`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-100 px-4 py-2 border-b">
        <h3 className="font-semibold">AI Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me to edit your resume..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isProcessing}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Note: AI features require OpenAI API integration
        </p>
      </div>
    </div>
  );
}
