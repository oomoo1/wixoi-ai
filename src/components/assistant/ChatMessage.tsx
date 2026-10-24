import React from 'react';
import type { ChatMessage as ChatMessageType } from './useChat';
import { Bot, User } from 'lucide-react';

export interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex items-start gap-2.5 ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {isAssistant && (
        <div className="w-7 h-7 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-highlight)]/30 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-4 h-4 text-[var(--accent-highlight)]" />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
          isAssistant
            ? 'bg-white/[0.06] border border-white/10 text-white shadow-sm'
            : 'bg-[var(--accent-primary)] text-white shadow-md'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {!isAssistant && (
        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5 text-white/80" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
