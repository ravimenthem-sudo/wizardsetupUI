import React, { useState } from 'react';
import { CompanyInfo } from '../../../hooks/useWizardState';
import { verifyOrganization } from '../../../services/wizardService';
import { FaPlay, FaCheckCircle, FaSpinner } from 'react-icons/fa';

interface CompanyInfoScreenProps {
    data: CompanyInfo;
    onUpdate: (data: Partial<CompanyInfo>) => void;
}

const CompanyInfoScreen: React.FC<CompanyInfoScreenProps> = ({ data, onUpdate }) => {
    const [verifying, setVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = async () => {
        if (!data.id) {
            setVerificationError('Please enter an Organization ID');
            return;
        }
        setVerifying(true);
        setVerificationError(null);

        try {
            const result = await verifyOrganization(data.id);
            if (result.success && result.data) {
                onUpdate({ name: result.data.name });
                setIsVerified(true);
            } else {
                setVerificationError('Organization not found. Please check the ID.');
                setIsVerified(false);
            }
        } catch (err) {
            setVerificationError('Verification failed.');
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div className="animate-fade-in w-full">
            <h2 className="font-display text-4xl font-bold italic mb-2 text-ink text-center">Company Profile</h2>
            <p className="font-body text-sm text-graphite-light mb-16 text-center">Tell us a bit about your organization.</p>

            <div className="space-y-12">
                {/* Organization ID with Verify Button */}
                <div className="mb-6">
                    <label className="block font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light mb-2">
                        Organization ID
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={data.id || ''}
                            onChange={(e) => {
                                onUpdate({ id: e.target.value });
                                setIsVerified(false); // Reset verification on change
                            }}
                            className="bg-transparent border-b border-graphite-light/20 w-full py-2 font-primary text-sm text-graphite focus:outline-none focus:border-accent transition-colors placeholder:text-graphite-light/30"
                            placeholder="e.g. ORG-123-456"
                        />
                        <button
                            onClick={handleVerify}
                            disabled={verifying || !data.id}
                            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${isVerified
                                ? 'bg-green-500 text-white cursor-default'
                                : 'bg-accent text-white hover:bg-accent-dark'
                                } disabled:opacity-50`}
                        >
                            {verifying ? <FaSpinner className="animate-spin" /> : isVerified ? <FaCheckCircle /> : 'Verify'}
                        </button>
                    </div>
                    {verificationError && (
                        <p className="text-red-500 text-[10px] mt-1 font-primary">{verificationError}</p>
                    )}
                </div>

                {/* Company Name (Read-Only if Verified) */}
                <div className="mb-6">
                    <label className="block font-accent text-[9px] font-bold tracking-[0.3em] uppercase text-graphite-light mb-2">
                        Company Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => onUpdate({ name: e.target.value })}
                        disabled={isVerified}
                        className={`bg-transparent border-b border-graphite-light/20 w-full py-2 font-primary text-xl font-light text-graphite focus:outline-none focus:border-accent transition-colors placeholder:text-graphite-light/30 ${isVerified ? 'opacity-75 cursor-not-allowed' : ''}`}
                        placeholder="Enter company name"
                    />
                </div>


            </div>
        </div>
    );
};

export default CompanyInfoScreen;
