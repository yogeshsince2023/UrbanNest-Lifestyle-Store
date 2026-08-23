import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, X, Bot, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export const DEFAULT_CHATBOT_WEBHOOK_URL =
  'https://soham6050.app.n8n.cloud/webhook/a35826c3-52aa-487c-a499-7da1565c630b/chat';

const PROACTIVE_STORAGE_KEY = 'urbannest_proactive_chat_v1';

/**
 * ChatbotWidget Component
 * Performance-optimized: `@n8n/chat` is loaded dynamically ONLY when opened.
 */
export function ChatbotWidget({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const chatInitializedRef = useRef(false);
  const containerRef = useRef(null);

  const webhookUrl =
    import.meta.env.VITE_N8N_CHATBOT_URL || DEFAULT_CHATBOT_WEBHOOK_URL;

  // Dynamically load and initialize @n8n/chat on-demand when chat is opened
  const initChatOnDemand = async () => {
    if (chatInitializedRef.current) return;
    chatInitializedRef.current = true;
    setIsInitializing(true);

    try {
      // Dynamic imports prevent 1.5MB library from blocking initial page render
      const [{ createChat }] = await Promise.all([
        import('@n8n/chat'),
        import('@n8n/chat/style.css'),
      ]);

      createChat({
        webhookUrl,
        target: '#n8n-chat-root',
        mode: 'fullscreen',
        showWelcomeScreen: true,
        defaultLanguage: 'en',
        initialMessages: [
          'Hello! Welcome to UrbanNest Lifestyle Store. 🌿',
          'I am your AI Studio Concierge. How can I assist you with our handcrafted pottery, washed linens, or bespoke gift parcels today?',
        ],
        i18n: {
          en: {
            title: 'UrbanNest Studio Concierge',
            subtitle: 'Artisan curation & order guidance powered by N8N',
            footer: 'Crafted with mindfulness • UrbanNest Store',
            getStarted: 'Start New Conversation',
            inputPlaceholder: 'Ask about stoneware glazes, parcel gifts...',
          },
        },
      });
    } catch (err) {
      console.warn('[N8N Chatbot Init Notice]: Fallback container active.', err);
    } finally {
      setIsInitializing(false);
    }
  };

  // Proactive Greeting Bubble Trigger (once per session after ~5s)
  useEffect(() => {
    let timerId;
    try {
      const alreadyShown = sessionStorage.getItem(PROACTIVE_STORAGE_KEY);
      if (!alreadyShown && !isOpen) {
        timerId = setTimeout(() => {
          setShowGreeting(true);
          sessionStorage.setItem(PROACTIVE_STORAGE_KEY, 'true');
        }, 5000);
      }
    } catch {
      // Session storage blocked
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isOpen]);

  // Dismiss greeting and close chat on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showGreeting) {
          setShowGreeting(false);
        }
        if (isOpen) {
          setIsOpen(false);
          const rootEl = document.getElementById('n8n-chat-root');
          const n8nCloseBtn = rootEl?.querySelector('.n8n-chat-toggle, .chat-close, button[aria-label*="close" i]');
          if (n8nCloseBtn) n8nCloseBtn.click();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGreeting, isOpen]);

  // Open the N8N chat window programmatically
  const handleOpenChat = () => {
    setShowGreeting(false);
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !chatInitializedRef.current) {
        initChatOnDemand();
      }
      return next;
    });
  };

  const handleDismissGreeting = (e) => {
    e.stopPropagation();
    setShowGreeting(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none',
        className
      )}
      aria-label="Artisan Concierge Chat Widget"
    >
      {/* Custom Popup Window Container wrapping n8n fullscreen mode */}
      <div
        className={cn(
          "absolute bottom-16 right-0 w-[380px] h-[580px] max-h-[80vh] max-w-[calc(100vw-3rem)] rounded-[14px] overflow-hidden shadow-2xl border border-ink/15 transition-all duration-300 origin-bottom-right z-50 bg-[var(--color-paper)]",
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* Custom Close Button for the Popup */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-[9999] p-1.5 bg-paper/80 hover:bg-cloud backdrop-blur-sm rounded-full text-ink/70 hover:text-ink shadow-sm transition-colors border border-ink/10 cursor-pointer"
          aria-label="Close Chat"
        >
          <X className="w-4 h-4" />
        </button>
        
        {/* Target Mount for @n8n/chat UI */}
        <div id="n8n-chat-root" className="w-full h-full relative">
          {isInitializing && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-paper)] z-10">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-2 border-moss border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="font-utility text-xs text-ink/70">Connecting to Concierge...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Proactive Greeting Bubble */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleOpenChat}
            className="pointer-events-auto mb-3 max-w-[280px] sm:max-w-xs bg-[var(--color-cloud)]/95 backdrop-blur-md text-ink p-4 rounded-parcel border border-ink/15 shadow-parcel hover:shadow-parcel-hover cursor-pointer transition-all group relative mr-1"
          >
            {/* Signature Gift Tag Hole Accent */}
            <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-paper border border-ink/20" />

            <div className="flex items-start justify-between gap-2 pl-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-tag bg-moss/20 text-moss-dark dark:text-moss-light flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold font-utility text-ink flex items-center gap-1">
                    Studio Concierge
                    <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
                  </div>
                  <div className="text-[10px] font-utility text-ink/50">Online & Ready</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDismissGreeting}
                aria-label="Dismiss proactive greeting"
                className="p-1 rounded-tag hover:bg-paper text-ink/50 hover:text-ink transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="mt-2.5 text-xs font-body text-ink/85 leading-relaxed pl-3">
              Have a question about our slow-crafted goods, glaze batches, or gift parcel curation?
            </p>

            <div className="mt-3 pt-2 border-t border-ink/10 flex items-center justify-between text-[11px] font-utility text-moss-dark dark:text-moss-light pl-3 font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Chat with Artisan Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Gift-Tag Launcher Button */}
      <motion.button
        type="button"
        onClick={handleOpenChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Studio Concierge Chatbot"
        className="pointer-events-auto relative group flex items-center gap-2.5 bg-moss hover:bg-moss-dark dark:bg-moss-light dark:hover:bg-moss text-[#F7F5EF] dark:text-[#181614] font-semibold px-4 py-3 rounded-parcel border-2 border-moss-dark/40 dark:border-moss-light/50 shadow-parcel hover:shadow-parcel-hover transition-colors cursor-pointer"
      >
        <span
          aria-hidden="true"
          className="w-2.5 h-2.5 rounded-full bg-paper border border-moss-dark/50 shadow-inner"
        />

        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#F7F5EF] dark:text-[#181614]" />
          <span className="text-xs font-utility font-bold uppercase tracking-wider text-[#F7F5EF] dark:text-[#181614] hidden sm:inline-block">
            Concierge AI
          </span>
        </div>

        <Sparkles className="w-3.5 h-3.5 text-brass-light dark:text-brass-dark" />
      </motion.button>
    </div>
  );
}

export default ChatbotWidget;
