import React from 'react';
import {
    FileText,
    Calendar,
    BarChart2,
    Wallet,
    UserCheck,
    PieChart,
    Mail,
    Network,
    StickyNote,
    FolderSync
} from 'lucide-react';
import SelectionCard from '@/components/wizard/ui/SelectionCard';

const ALL_FEATURES = [
    { id: 'payslip', title: 'Payslip Generator', description: 'Enables: "Payslips" menu for employees to view salary slips.', icon: FileText, module: 'payroll' },
    { id: 'leaves', title: 'Leave Approvals', description: 'Enables: "Leave Requests" and "My Leaves" menus.', icon: Calendar, module: 'attendance' },
    { id: 'reports', title: 'Reports & Analytics', description: 'Enables: "Analytics" menu for data insights.', icon: PieChart, module: 'performance' },
    { id: 'ess', title: 'Employee Self-Service', description: 'Enables: "Employee Status" (Attendance) and Profile editing.', icon: UserCheck, module: 'hr' },
    { id: 'invoice', title: 'Invoice Billing', description: 'Enables: "Invoice" and Expense management menus.', icon: Wallet, module: 'finance' },
    { id: 'tracking', title: 'Progress Tracking', description: 'Enables: Detailed task progress bars and status updates.', icon: BarChart2, module: 'tasks' },
    { id: 'org_chart', title: 'Org Hierarchy', description: 'Enables: Visual organization chart and reporting lines.', icon: Network, module: 'hr' },
    { id: 'showNotes', title: 'Dashboard Notes', description: 'Enables: "Notes & immediate tasks" tile on the dashboard.', icon: StickyNote, module: 'any' },
    { id: 'documents', title: 'Document Vault', description: 'Enables: "Project Documents" and centralized file storage.', icon: FolderSync, module: 'tasks' },
    { id: 'email', title: 'Email Notifications', description: 'Enables: System-wide email alerts (Backend feature).', icon: Mail, module: 'any' },
];

interface Props {
    selectedModules: string[];
    selectedFeatures: string[];
    onToggle: (id: string) => void;
}

const FeatureSelectionScreen: React.FC<Props> = ({ selectedModules, selectedFeatures, onToggle }) => {
    const availableFeatures = ALL_FEATURES.filter(f =>
        f.module === 'any' || selectedModules.includes(f.module)
    );

    return (
        <div className="py-8 text-center">
            <h2 className="font-display text-4xl font-bold italic mb-2 text-ink">Select Features</h2>
            <p className="font-body text-sm text-graphite-light mb-16 max-w-lg mx-auto">
                Fine-tune your experience by enabling specific features.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
                {availableFeatures.map(feature => (
                    <SelectionCard
                        key={feature.id}
                        id={feature.id}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                        isSelected={selectedFeatures.includes(feature.id)}
                        onClick={onToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeatureSelectionScreen;
