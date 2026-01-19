import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SelectionCardProps {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({
    id,
    icon,
    title,
    description,
    isSelected,
    onClick,
}) => {
    return (
        <div
            onClick={() => onClick(id)}
            className={`cursor-pointer transition-all duration-300 p-8 rounded-2xl relative border h-full bg-white group ${isSelected
                    ? 'border-accent-violet shadow-[0_15px_40px_rgba(124,58,237,0.08)]'
                    : 'border-mist/50 hover:border-accent-violet/30 hover:shadow-xl'
                }`}
        >
            {/* Selection Indicator */}
            <div className={`absolute top-6 right-6 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${isSelected ? 'border-accent-violet bg-accent-violet/10' : 'border-mist'
                }`}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-accent-violet" />}
            </div>

            {/* Icon Container */}
            <div className={`mb-8 p-4 rounded-xl inline-block transition-colors duration-300 ${isSelected ? 'bg-accent-violet/10 text-accent-violet' : 'bg-paper text-graphite-light group-hover:bg-accent-violet/5 group-hover:text-accent-violet'
                }`}>
                {React.createElement(icon, { size: 24 })}
            </div>

            <h3 className={`font-display text-xl font-bold mb-3 transition-colors ${isSelected ? 'text-ink' : 'text-ink'
                }`}>
                {title}
            </h3>

            <p className="font-body text-[13px] text-graphite-light leading-relaxed opacity-80">
                {description}
            </p>
        </div>
    );
};

export default SelectionCard;
