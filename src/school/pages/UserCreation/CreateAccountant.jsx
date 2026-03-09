import React from 'react';
import StaffCreationForm, { SectionCard, Grid, Input, Select } from './StaffCreationForm';
import { IconChartBar, IconId, IconCurrencyRupee } from '@tabler/icons-react';

const AccountantRoleSection = () => {
    const [data, setData] = React.useState({
        tax_id: '', accounting_software: '', specialty: '', certifications: ''
    });
    const set = (field) => (e) => setData(p => ({ ...p, [field]: e.target.value }));

    return (
        <SectionCard icon={IconChartBar} title="Accountant Details" color="#10b981" bg="#d1fae5">
            <Grid cols={3}>
                <Input label="Tax / GST ID" icon={IconId} placeholder="e.g. GSTIN123456" value={data.tax_id} onChange={set('tax_id')} />
                <Select label="Accounting Software" value={data.accounting_software} onChange={set('accounting_software')}>
                    <option value="">Select Software</option>
                    <option>Tally</option>
                    <option>QuickBooks</option>
                    <option>Zoho Books</option>
                    <option>SAP</option>
                    <option>Other</option>
                </Select>
                <Select label="Specialty" value={data.specialty} onChange={set('specialty')}>
                    <option value="">Select Specialty</option>
                    <option>General Accounting</option>
                    <option>Tax & Compliance</option>
                    <option>Payroll Management</option>
                    <option>Auditing</option>
                    <option>Budgeting & Forecasting</option>
                </Select>
            </Grid>
            <div style={{ height: 16 }} />
            <Grid cols={1}>
                <Input label="Professional Certifications" placeholder="e.g. CA, CMA, CPA, ACCA" value={data.certifications} onChange={set('certifications')} />
            </Grid>
        </SectionCard>
    );
};

const CreateAccountant = () => (
    <StaffCreationForm
        role="accountant"
        title="Add Accountant"
        subtitle="Register a new finance & accounting staff member"
        accentColor="#10b981"
        accentBg="#d1fae5"
        borderColor="#6ee7b7"
        RoleIcon={IconChartBar}
        extraDocuments={['CA / CMA Certificate', 'Tax Registration Document']}
        roleSpecificSection={<AccountantRoleSection />}
    />
);

export default CreateAccountant;
