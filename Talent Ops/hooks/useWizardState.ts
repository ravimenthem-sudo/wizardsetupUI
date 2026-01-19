import { useState, useEffect } from 'react';

export type CompanyInfo = {
    companyName: string;
    companySize: string;
    organizationId: string;
    adminEmail: string;
};

export type PermissionsMatrix = {
    [role: string]: string[];
};

export type WizardConfig = {
    companyInfo: {
        name: string;
        industry: string;
        size: string;
        website: string;
    };
    modules: string[];
    features: string[];
    permissions: PermissionsMatrix;
};

const DEFAULT_CONFIG: WizardConfig = {
    companyInfo: {
        name: '',
        industry: '',
        size: '',
        website: '',
    },
    modules: [],
    features: [],
    permissions: {
        admin: ['VIEW', 'CREATE', 'APPROVE', 'MANAGE'],
        manager: ['VIEW', 'CREATE', 'APPROVE'],
        employee: ['VIEW'],
    },
};

export const useWizardState = () => {
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState<WizardConfig>(() => {
        const saved = localStorage.getItem('talentops_organization_config');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Simple validation: check if permissions.admin is an array (new structure)
                if (parsed.permissions && Array.isArray(parsed.permissions.admin)) {
                    return parsed;
                }
            } catch (e) {
                console.error("Error parsing wizard config", e);
            }
        }
        return DEFAULT_CONFIG;
    });

    useEffect(() => {
        localStorage.setItem('talentops_organization_config', JSON.stringify(config));
    }, [config]);

    const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
        setConfig(prev => ({
            ...prev,
            companyInfo: { ...prev.companyInfo, ...info },
        }));
    };

    const toggleModule = (moduleId: string) => {
        setConfig(prev => ({
            ...prev,
            modules: prev.modules.includes(moduleId)
                ? prev.modules.filter(id => id !== moduleId)
                : [...prev.modules, moduleId],
        }));
    };

    const toggleFeature = (featureId: string) => {
        setConfig(prev => ({
            ...prev,
            features: prev.features.includes(featureId)
                ? prev.features.filter(id => id !== featureId)
                : [...prev.features, featureId],
        }));
    };

    const togglePermission = (role: string, permission: string) => {
        setConfig(prev => {
            const currentRolePerms = prev.permissions[role] || [];
            const newRolePerms = currentRolePerms.includes(permission)
                ? currentRolePerms.filter(p => p !== permission)
                : [...currentRolePerms, permission];

            return {
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [role]: newRolePerms,
                },
            };
        });
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 7));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const goToStep = (s: number) => setStep(s);

    return {
        step,
        config,
        updateCompanyInfo,
        toggleModule,
        toggleFeature,
        togglePermission,
        nextStep,
        prevStep,
        goToStep,
    };
};
