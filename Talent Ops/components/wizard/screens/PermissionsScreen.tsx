import React from 'react';

interface PermissionsMatrix {
    [role: string]: string[];
}

interface Props {
    matrix: PermissionsMatrix;
    onToggle: (role: string, permission: string) => void;
}

const ROLES = [
    { id: 'admin', label: 'Admin', sub: 'Default Admin access' },
    { id: 'manager', label: 'Manager', sub: 'Default Manager access' }
];

const PERMS = ['VIEW', 'CREATE', 'APPROVE', 'MANAGE'];

const PermissionsScreen: React.FC<Props> = ({ matrix, onToggle }) => {
    return (
        <div className="py-8 text-center max-w-4xl mx-auto">
            <h2 className="font-display text-4xl font-bold italic mb-2 text-ink">Permissions Setup</h2>
            <p className="font-body text-sm text-graphite-light mb-16 max-w-lg mx-auto leading-relaxed">
                Define what each role can do in your organization. These can be adjusted later.
            </p>

            <div className="bg-white rounded-[40px] border border-mist/30 p-12 shadow-sm mb-12">
                <table className="w-full">
                    <thead>
                        <tr className="font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light opacity-50">
                            <th className="text-left pb-10">Role</th>
                            {PERMS.map(p => <th key={p} className="pb-10">{p}</th>)}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-mist/20">
                        {ROLES.map(role => (
                            <tr key={role.id}>
                                <td className="py-8 text-left">
                                    <div className="font-display text-2xl font-bold text-ink mb-1">{role.label}</div>
                                    <div className="font-body text-[11px] text-graphite-light opacity-60 italic">{role.sub}</div>
                                </td>
                                {PERMS.map(p => {
                                    const isEnabled = matrix[role.id]?.includes(p);
                                    return (
                                        <td key={p} className="text-center py-8">
                                            <button
                                                onClick={() => onToggle(role.id, p)}
                                                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isEnabled ? 'bg-accent-violet' : 'bg-mist/30'
                                                    }`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isEnabled ? 'left-7' : 'left-1'
                                                    }`} />
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-accent-violet/5 py-8 px-12 rounded-[20px] border border-accent-violet/10">
                <p className="font-body text-xs text-accent-violet opacity-80 italic">
                    Note: Admin roles have full access by default to ensure system management capabilities.
                </p>
            </div>
        </div>
    );
};

export default PermissionsScreen;
