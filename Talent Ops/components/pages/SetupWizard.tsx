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
                return <ReviewScreen config={config} onEdit={goToStep} />;
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
            onNext={nextStep}
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
