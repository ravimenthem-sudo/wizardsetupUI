import React from 'react';

interface CompanyInfo {
    name: string;
    industry: string;
    size: string;
    website: string;
}

interface CompanyInfoScreenProps {
    data: CompanyInfo;
    onUpdate: (data: Partial<CompanyInfo>) => void;
}

const CompanyInfoScreen: React.FC<CompanyInfoScreenProps> = ({ data, onUpdate }) => {
    const sizes = ['1-10', '11-50', '51-200', '200+'];

    return (
        <div className="max-w-xl mx-auto py-8">
            <h2 className="font-display text-4xl font-bold italic mb-2 text-ink text-center">Company Profile</h2>
            <p className="font-body text-sm text-graphite-light mb-16 text-center">Tell us a bit about your organization.</p>

            <div className="space-y-12">
                {/* Company Name */}
                <div className="group">
                    <label className="block font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light mb-4 text-center">
                        Company Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => onUpdate({ name: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="w-full bg-transparent border-b border-mist py-4 outline-none focus:border-accent-violet transition-all font-display text-2xl text-ink text-center placeholder:text-graphite-light/20"
                    />
                </div>

                {/* Company Size */}
                <div>
                    <label className="block font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light mb-6 text-center">
                        Company Size
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                        {sizes.map(size => (
                            <button
                                key={size}
                                onClick={() => onUpdate({ size })}
                                className={`py-4 rounded-sm font-accent text-[10px] font-bold tracking-widest transition-all duration-300 ${data.size === size
                                        ? 'bg-accent-violet text-paper shadow-lg scale-[1.05]'
                                        : 'bg-paper-warm border border-mist text-graphite-light hover:border-graphite'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Website/Domain - Using same style as Name */}
                <div className="group">
                    <label className="block font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light mb-4 text-center">
                        Organization ID
                    </label>
                    <input
                        type="text"
                        value={data.industry} // Reusing industry/website slots for visual alignment with screenshot
                        onChange={(e) => onUpdate({ industry: e.target.value })}
                        placeholder="e.g. ORG-001"
                        className="w-full bg-transparent border-b border-mist py-4 outline-none focus:border-accent-violet transition-all font-display text-2xl text-ink text-center placeholder:text-graphite-light/20"
                    />
                </div>

                <div className="group">
                    <label className="block font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light mb-4 text-center">
                        Primary Admin Email
                    </label>
                    <input
                        type="email"
                        value={data.website}
                        onChange={(e) => onUpdate({ website: e.target.value })}
                        placeholder="admin@company.com"
                        className="w-full bg-transparent border-b border-mist py-4 outline-none focus:border-accent-violet transition-all font-display text-lg text-ink text-center placeholder:text-graphite-light/20"
                    />
                </div>
            </div>
        </div>
    );
};

export default CompanyInfoScreen;
