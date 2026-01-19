import React from 'react';
import WizardLayout from '../wizard/WizardLayout';
import WelcomeScreen from '../wizard/screens/WelcomeScreen';
import CompanyInfoScreen from '../wizard/screens/CompanyInfoScreen';
import ModuleSelectionScreen from '../wizard/screens/ModuleSelectionScreen';
import FeatureSelectionScreen from '../wizard/screens/FeatureSelectionScreen';
import PermissionsScreen from '../wizard/screens/PermissionsScreen';
import ReviewScreen from '../wizard/screens/ReviewScreen';
import CompletionScreen from '../wizard/screens/CompletionScreen';
import { useWizardState } from '../../hooks/useWizardState';
import { saveWizardConfig } from '../../services/wizardService';
import { useState } from 'react';

export const SetupWizard: React.FC = () => {
    const {
        step,
        config,
        updateCompanyInfo,
        toggleModule,
        toggleFeature,
        togglePermission,
        nextStep,
        prevStep,
        goToStep
    } = useWizardState();

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handleNext = async () => {
        if (step === 6) {
            // We are on ReviewScreen, trying to go to CompletionScreen
            setIsSaving(true);
            setSaveError(null);

            try {
                const result = await saveWizardConfig(config);
                if (result.success) {
                    nextStep();
                } else {
                    setSaveError(result.error || 'Failed to save configuration.');
                }
            } catch (err) {
                setSaveError('An unexpected error occurred.');
            } finally {
                setIsSaving(false);
            }
        } else {
            nextStep();
        }
    };

    const renderScreen = () => {
        switch (step) {
            case 1:
                return <WelcomeScreen />;
            case 2:
                return <CompanyInfoScreen data={config.companyInfo} onUpdate={updateCompanyInfo} />;
            case 3:
                return <ModuleSelectionScreen selectedModules={config.modules} onToggle={toggleModule} />;
            case 4:
                return (
                    <FeatureSelectionScreen
                        selectedModules={config.modules}
                        selectedFeatures={config.features}
                        onToggle={toggleFeature}
                    />
                );
            case 5:
                return <PermissionsScreen matrix={config.permissions} onToggle={togglePermission} />;
            case 6:
                return (
                    <div className="relative">
                        {saveError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-auto max-w-2xl text-center" role="alert">
                                <span className="block sm:inline">{saveError}</span>
                            </div>
                        )}
                        <ReviewScreen config={config} onEdit={goToStep} />
                        {isSaving && (
                            <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-violet"></div>
                            </div>
                        )}
                    </div>
                );
            case 7:
                return <CompletionScreen />;
            default:
                return <WelcomeScreen />;
        }
    };

    const isStepValid = () => {
        if (step === 2) return !!config.companyInfo.name;
        if (step === 3) return config.modules.length > 0;
        return true;
    };

    return (
        <WizardLayout
            currentStep={step}
            onNext={handleNext}
            onBack={prevStep}
            canNext={isStepValid()}
            isFirstStep={step === 1}
            isLastStep={step === 6}
            hideNavOnLast={step === 7}
        >
            {renderScreen()}
        </WizardLayout>
    );
};
