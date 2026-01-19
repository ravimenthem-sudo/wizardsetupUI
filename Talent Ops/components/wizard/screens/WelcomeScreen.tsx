import React from 'react';
import { Rocket } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
    return (
        <div className="text-center py-12 flex flex-col items-center">
            {/* Centered Icon Box */}
            <div className="w-20 h-20 bg-accent-violet/10 rounded-2xl flex items-center justify-center mb-10 text-accent-violet">
                <Rocket size={40} />
            </div>

            <h2 className="font-display text-6xl md:text-7xl font-bold mb-8 text-ink leading-[1.1]">
                Welcome to <span className="text-accent-violet italic">TalentOps</span>
                <br />Setup
            </h2>

            <p className="font-body text-lg text-graphite-light max-w-lg mx-auto leading-relaxed mb-12">
                Let's configure TalentOps for your organization in just a few steps.
                We'll help you tailor the platform to your specific needs.
            </p>

            {/* Note: In common patterns, this button triggers nextStep, 
                but since this is a screen component, the Next button 
                is actually in the WizardLayout footer. 
                However, the screenshot shows a START SETUP button here. 
                I'll keep it for visual alignment but it should ideally call onNext.
            */}
        </div>
    );
};

export default WelcomeScreen;
