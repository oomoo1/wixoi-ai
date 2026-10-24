import React, { useState, useEffect, useRef } from 'react';
import { useChat } from './useChat';
import { ChatMessage } from './ChatMessage';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, loading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages without aggressive intervals
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Escape key closes widget
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end pb-[env(safe-area-inset-bottom)] pointer-events-none"
    >
      {/* Floating Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Wixoi Operational Assistant Chat"
          className="pointer-events-auto mb-3 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] rounded-2xl bg-[var(--surface-raised)] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/30 border border-[var(--accent-highlight)]/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[var(--accent-highlight)]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-none">
                  Wixoi Assistant
                </h4>
                <span className="text-[11px] font-mono text-[var(--accent-highlight)]">
                  Operational Scope Only
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 touch-target focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
              aria-label="Close assistant chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area with role="log" */}
          <div
            role="log"
            aria-live="polite"
            className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-black/20"
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-mono p-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-highlight)] animate-pulse" />
                <span>Consulting operational systems...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Accessible Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white/[0.02] border-t border-white/10 flex items-center gap-2"
          >
            <label htmlFor="chat-user-input" className="sr-only">
              Ask Wixoi operational assistant a question
            </label>
            <input
              id="chat-user-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about CRM, meetings, or invoices..."
              disabled={loading}
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-highlight)] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[oklch(0.60_0.22_260)] text-white disabled:opacity-40 disabled:cursor-not-allowed touch-target focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button: Icon-only on mobile (<640px) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close operational assistant' : 'Open operational assistant'}
        className="pointer-events-auto touch-target px-3.5 sm:px-5 py-3 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[oklch(0.60_0.22_260)] text-white shadow-[0_8px_30px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_36px_rgba(100,206,251,0.5)] flex items-center gap-2.5 transition-all select-none focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] active:scale-95"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="hidden sm:inline text-xs font-semibold tracking-wide">
              Questions?
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
