import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Users } from 'lucide-react';
import { useWizardState } from '@/hooks/useWizardState';

const CompletionScreen: React.FC = () => {
    const navigate = useNavigate();
    const { config } = useWizardState();

    return (
        <div className="text-center py-12 flex flex-col items-center max-w-2xl mx-auto">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="w-24 h-24 bg-accent-violet text-paper rounded-[30px] flex items-center justify-center mb-10 shadow-[0_15px_45px_rgba(124,58,237,0.3)]"
            >
                <Check size={48} strokeWidth={3} />
            </motion.div>

            <h2 className="font-display text-6xl font-bold mb-4 text-ink">
                Workspace Ready!
            </h2>

            <p className="font-display text-xl text-accent-violet italic mb-12">
                Welcome aboard, {config.companyInfo.name || 'Partner'}
            </p>

            <p className="font-body text-sm text-graphite-light leading-relaxed mb-16 opacity-80">
                We've successfully configured Your TalentOps workspace based on your specific needs.
                Your system is now optimized for your selected modules and features.
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <button
                    onClick={() => navigate('/executive-dashboard/dashboard')}
                    className="flex items-center gap-4 bg-ink text-paper font-accent text-[10px] font-bold tracking-[0.2em] uppercase px-12 py-5 rounded-full hover:bg-accent-violet transition-all duration-300 shadow-xl group"
                >
                    Go to Dashboard
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        →
                    </motion.span>
                </button>

                <button
                    className="flex items-center gap-3 bg-white text-ink border border-mist/30 font-accent text-[10px] font-bold tracking-[0.2em] uppercase px-12 py-5 rounded-full hover:border-accent-violet transition-all duration-300"
                >
                    <Users size={14} className="opacity-40" />
                    Invite Team
                </button>
            </div>
        </div>
    );
};

export default CompletionScreen;
