import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const percentage = Math.round((currentStep / totalSteps) * 100);

    return (
        <div className="mb-20 w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-baseline mb-4">
                <div className="flex flex-col gap-1">
                    <span className="font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light opacity-60">
                        Configuration Progress
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="font-display text-2xl italic text-ink">Step {currentStep}</span>
                        <span className="font-display text-lg text-graphite-light opacity-40">/</span>
                        <span className="font-display text-lg text-graphite-light opacity-40">{totalSteps}</span>
                    </div>
                </div>
                <div className="font-body text-sm font-bold text-accent-violet">
                    {percentage}%
                </div>
            </div>

            <div className="h-[3px] w-full bg-mist rounded-full relative overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-accent-violet"
                />
            </div>
        </div>
    );
};

export default ProgressBar;
