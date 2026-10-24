import React, { useState, lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { WorkflowDemo } from './components/sections/WorkflowDemo';
import { Process } from './components/sections/Process';
import { CapacityCalculator } from './components/sections/CapacityCalculator';
import { Faq } from './components/sections/Faq';
import { Booking } from './components/sections/Booking';
import { LegalDialog } from './components/legal/LegalDialog';

// Lazy-load chat widget for minimal initial bundle impact
const ChatWidget = lazy(() => import('./components/assistant/ChatWidget'));

export const App: React.FC = () => {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState(0);
  const [capacitySummary, setCapacitySummary] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<
    'privacy' | 'terms' | 'security' | null
  >(null);

  const handleSelectWorkflow = (tabIndex: number) => {
    setActiveWorkflowTab(tabIndex);
  };

  const handleApplyCapacity = (summary: string) => {
    setCapacitySummary(summary);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-[var(--surface-page)] text-[var(--text-primary)] selection:bg-[var(--accent-primary)]/30 selection:text-white flex flex-col font-sans">
        <Header />

        <main id="main-content" className="flex-1">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: Four Workflows */}
          <Services onSelectWorkflow={handleSelectWorkflow} />

          {/* Section 3: Example Transformation */}
          <WorkflowDemo
            activeTab={activeWorkflowTab}
            onTabChange={setActiveWorkflowTab}
          />

          {/* Section 4: How Engagement Works */}
          <Process />

          {/* Section 5: Capacity Model */}
          <CapacityCalculator onApplyToBooking={handleApplyCapacity} />

          {/* Section 6: Security & FAQ */}
          <Faq />

          {/* Section 7: Booking */}
          <Booking capacitySummary={capacitySummary} />
        </main>

        <Footer onOpenLegal={(type) => setLegalModalType(type)} />

        <LegalDialog
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />

        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </div>
    </MotionConfig>
  );
};

export default App;
