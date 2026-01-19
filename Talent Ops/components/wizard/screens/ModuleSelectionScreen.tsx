import React from 'react';
import {
    Users,
    CreditCard,
    CalendarCheck,
    Package,
    Briefcase,
    PieChart,
    TrendingUp,
    LifeBuoy
} from 'lucide-react';
import SelectionCard from '@/components/wizard/ui/SelectionCard';

const MODULES = [
    { id: 'hr', title: 'HR Management', description: 'Enables: Employees, Policies, Org Hierarchy, Announcements.', icon: Users },
    { id: 'payroll', title: 'Payroll', description: 'Enables: Payroll Dashboard and Payslip Management.', icon: CreditCard },
    { id: 'attendance', title: 'Attendance', description: 'Enables: Employee Status, Shift Tracking, and Presence.', icon: CalendarCheck },
    { id: 'tasks', title: 'Task Management', description: 'Enables: Projects, My Tasks, Team Tasks, and Hierarchies.', icon: Package },
    { id: 'hiring', title: 'Hiring / Recruitment', description: 'Enables: Hiring Portal for managing applicants.', icon: Briefcase },
    { id: 'finance', title: 'Finance', description: 'Enables: Invoices and Financial Reporting.', icon: PieChart },
    { id: 'performance', title: 'Performance Management', description: 'Enables: Analytics and Performance Reviews.', icon: TrendingUp },
    { id: 'helpdesk', title: 'Helpdesk & Support', description: 'Enables: \"Raise a Ticket\" functionality.', icon: LifeBuoy },
];

interface Props {
    selectedModules: string[];
    onToggle: (id: string) => void;
}

const ModuleSelectionScreen: React.FC<Props> = ({ selectedModules, onToggle }) => {
    return (
        <div className="py-8 text-center">
            <h2 className="font-display text-4xl font-bold italic mb-2 text-ink">Select Modules</h2>
            <p className="font-body text-sm text-graphite-light mb-16 max-w-lg mx-auto">
                Choose the core capabilities you want to enable for your workspace.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
                {MODULES.map(module => (
                    <SelectionCard
                        key={module.id}
                        id={module.id}
                        title={module.title}
                        description={module.description}
                        icon={module.icon}
                        isSelected={selectedModules.includes(module.id)}
                        onClick={onToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default ModuleSelectionScreen;
