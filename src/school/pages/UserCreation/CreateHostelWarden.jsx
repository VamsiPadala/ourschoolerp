import React from 'react';
import StaffCreationForm, { SectionCard, Grid, Input, Select } from './StaffCreationForm';
import { IconBuildingBank, IconBed, IconKey } from '@tabler/icons-react';

const HostelWardenRoleSection = () => {
    const [data, setData] = React.useState({
        hostels_managed: '', shift_type: '', capacity_managed: '', certifications: ''
    });
    const set = (field) => (e) => setData(p => ({ ...p, [field]: e.target.value }));

    return (
        <SectionCard icon={IconBuildingBank} title="Hostel Warden Details" color="#f59e0b" bg="#fef3c7">
            <Grid cols={3}>
                <Input label="Hostels Managed" type="number" icon={IconKey} placeholder="e.g. 2" value={data.hostels_managed} onChange={set('hostels_managed')} />
                <Select label="Shift Type" value={data.shift_type} onChange={set('shift_type')}>
                    <option value="">Select Shift</option>
                    <option>Day Shift</option>
                    <option>Night Shift</option>
                    <option>Rotating</option>
                </Select>
                <Input label="Student Capacity" type="number" icon={IconBed} placeholder="e.g. 200" value={data.capacity_managed} onChange={set('capacity_managed')} />
            </Grid>
            <div style={{ height: 16 }} />
            <Grid cols={1}>
                <Input label="First Aid Certifications" placeholder="e.g. Basic CPR & First Aid" value={data.certifications} onChange={set('certifications')} />
            </Grid>
        </SectionCard>
    );
};

const CreateHostelWarden = () => (
    <StaffCreationForm
        role="hostel_warden"
        title="Add Hostel Warden"
        subtitle="Register a new Hostel Warden"
        accentColor="#f59e0b"
        accentBg="#fef3c7"
        borderColor="#fde68a"
        RoleIcon={IconBuildingBank}
        extraDocuments={['First Aid Certificate', 'Experience Letter']}
        roleSpecificSection={<HostelWardenRoleSection />}
    />
);

export default CreateHostelWarden;
