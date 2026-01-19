import React from 'react';
import { Pencil, CheckCircle2, Circle } from 'lucide-react';

interface Props {
    config: any;
    onEdit: (step: number) => void;
}

const ReviewScreen: React.FC<Props> = ({ config, onEdit }) => {
    const roles = ['Admin', 'Manager'];
    const perms = ['VIEW', 'CREATE', 'APPROVE', 'MANAGE'];

    return (
        <div className="py-8 text-center max-w-5xl mx-auto">
            <h2 className="font-display text-4xl font-bold italic mb-2 text-ink">Review & Confirm</h2>
            <p className="font-body text-sm text-graphite-light mb-16">
                Double check your configuration before we finalize your workspace.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-left">
                {/* Organization Card */}
                <div className="bg-white rounded-[40px] border border-mist/30 p-10 shadow-sm relative">
                    <button
                        onClick={() => onEdit(2)}
                        className="absolute top-8 right-8 text-accent-violet hover:scale-110 transition-transform"
                    >
                        <Pencil size={18} />
                    </button>

                    <h3 className="font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light mb-8 opacity-60">
                        Organization
                    </h3>

                    <div className="space-y-8">
                        <div>
                            <div className="font-accent text-[8px] font-bold uppercase tracking-[0.2em] text-graphite-light opacity-40 mb-1">Company Name</div>
                            <div className="font-display text-2xl font-bold text-ink">{config.companyInfo.name || '---'}</div>
                        </div>

                        <div>
                            <div className="font-accent text-[8px] font-bold uppercase tracking-[0.2em] text-graphite-light opacity-40 mb-1">Organization ID</div>
                            <div className="font-body text-sm font-bold text-ink">{config.companyInfo.id || '---'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules & Features Card */}
            <div className="bg-white rounded-[40px] border border-mist/30 p-10 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light opacity-60">
                        Modules & Features
                    </h3>
                    <div className="flex gap-4">
                        <button onClick={() => onEdit(3)} className="flex items-center gap-1.5 text-accent-violet font-accent text-[8px] font-bold tracking-widest uppercase hover:underline">
                            Modules <Pencil size={10} />
                        </button>
                        <button onClick={() => onEdit(4)} className="flex items-center gap-1.5 text-accent-violet font-accent text-[8px] font-bold tracking-widest uppercase hover:underline">
                            Features <Pencil size={10} />
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <div className="font-accent text-[8px] font-bold uppercase tracking-[0.2em] text-graphite-light opacity-40 mb-4">Enabled Modules</div>
                        <div className="flex flex-wrap gap-2">
                            {config.modules.map((m: string) => (
                                <span key={m} className="px-4 py-1.5 bg-accent-violet/10 text-accent-violet text-[9px] font-bold uppercase tracking-widest rounded-full">
                                    {m}
                                </span>
                            ))}
                            {config.modules.length === 0 && <span className="text-xs text-graphite-light/40 italic font-body">No modules selected.</span>}
                        </div>
                    </div>

                    <div>
                        <div className="font-accent text-[8px] font-bold uppercase tracking-[0.2em] text-graphite-light opacity-40 mb-4">Enabled Features</div>
                        <div className="flex flex-wrap gap-2">
                            {config.features.map((f: string) => (
                                <span key={f} className="px-4 py-1.5 bg-accent-violet/10 text-accent-violet text-[9px] font-bold uppercase tracking-widest rounded-full">
                                    {f}
                                </span>
                            ))}
                            {config.features.length === 0 && <span className="text-xs text-graphite-light/40 italic font-body">No features enabled.</span>}
                        </div>
                    </div>
                </div>
            </div>


            {/* Permissions Overview Card */}
            <div className="bg-white rounded-[40px] border border-mist/30 p-10 shadow-sm text-left relative">
                <button
                    onClick={() => onEdit(5)}
                    className="absolute top-8 right-8 text-accent-violet hover:scale-110 transition-transform"
                >
                    <Pencil size={18} />
                </button>

                <h3 className="font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light mb-12 opacity-60 text-center md:text-left">
                    Role Permissions Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roles.map(role => (
                        <div key={role} className="bg-paper-warm p-8 rounded-[30px] border border-mist/10">
                            <h4 className="font-display text-2xl font-bold text-ink mb-6">{role}</h4>
                            <div className="space-y-4">
                                {perms.map(p => {
                                    const isEnabled = config.permissions[role.toLowerCase()]?.includes(p);
                                    return (
                                        <div key={p} className={`flex items-center gap-3 font-accent text-[9px] font-bold tracking-widest transition-opacity ${isEnabled ? 'text-accent-violet' : 'text-graphite-light opacity-20'}`}>
                                            {isEnabled ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                                            {p}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default ReviewScreen;
