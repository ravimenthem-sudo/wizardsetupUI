import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import ProgressBar from './ui/ProgressBar';

interface WizardLayoutProps {
    children: React.ReactNode;
    currentStep: number;
    onNext: () => void;
    onBack: () => void;
    canNext?: boolean;
    isLastStep?: boolean;
    isFirstStep?: boolean;
    hideNavOnLast?: boolean;
}

const WizardLayout: React.FC<WizardLayoutProps> = ({
    children,
    currentStep,
    onNext,
    onBack,
    canNext = true,
    isLastStep = false,
    isFirstStep = false,
    hideNavOnLast = false
}) => {
    return (
        <div className="min-h-screen bg-paper text-ink font-body selection:bg-accent-violet selection:text-paper">
            <div className="max-w-[1000px] mx-auto px-8 py-12 flex flex-col min-h-screen">
                {!(hideNavOnLast && currentStep === 7) && (
                    <header className="mb-16">
                        <ProgressBar currentStep={currentStep} totalSteps={6} />
                    </header>
                )}

                <main className="flex-1 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {!(hideNavOnLast && currentStep === 7) && (
                    <footer className="mt-16 py-8 flex justify-between items-center">
                        <button
                            onClick={onBack}
                            disabled={isFirstStep}
                            className={`flex items-center gap-2 font-accent text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${isFirstStep
                                ? 'opacity-0 pointer-events-none'
                                : 'text-ink hover:translate-x-[-4px]'
                                }`}
                        >
                            <ChevronLeft size={14} strokeWidth={3} />
                            Back
                        </button>

                        <button
                            onClick={onNext}
                            disabled={!canNext}
                            className={`flex items-center gap-4 font-accent text-[10px] font-bold tracking-[0.2em] uppercase px-12 py-5 rounded-full transition-all duration-300 group ${currentStep === 1
                                ? 'bg-ink text-paper hover:scale-[1.02]'
                                : canNext
                                    ? 'bg-accent-violet text-paper hover:scale-[1.02] shadow-[0_10px_30px_rgba(124,58,237,0.15)]'
                                    : 'bg-mist text-graphite-light cursor-not-allowed'
                                }`}
                        >
                            <span>
                                {currentStep === 1 ? 'Start Setup' : isLastStep ? 'Finish Setup' : 'Next'}
                            </span>
                            {isLastStep ? (
                                <Check size={14} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
                            ) : (
                                <ChevronRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                            )}
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default WizardLayout;
