import React from 'react';
import StaffCreationForm, { SectionCard, Grid, Input, Select } from './StaffCreationForm';
import { IconPhone, IconId, IconUser } from '@tabler/icons-react';

const ReceptionistRoleSection = () => {
    const [data, setData] = React.useState({
        desk_location: '', languages_known: '', typing_speed: '', software_known: ''
    });
    const set = (field) => (e) => setData(p => ({ ...p, [field]: e.target.value }));

    return (
        <SectionCard icon={IconPhone} title="Receptionist Details" color="#0ea5e9" bg="#e0f2fe">
            <Grid cols={3}>
                <Input label="Desk / Counter Location" icon={IconId} placeholder="e.g. Main Entrance, Block B" value={data.desk_location} onChange={set('desk_location')} />
                <Input label="Languages Known" placeholder="e.g. English, Hindi, Telugu" value={data.languages_known} onChange={set('languages_known')} />
                <Input label="Typing Speed (WPM)" type="number" placeholder="e.g. 45" value={data.typing_speed} onChange={set('typing_speed')} />
            </Grid>
            <div style={{ height: 16 }} />
            <Grid cols={1}>
                <Input label="Software / Tools Known" placeholder="e.g. MS Office, Google Workspace, Visitor Management System" value={data.software_known} onChange={set('software_known')} />
            </Grid>
        </SectionCard>
    );
};

const CreateReceptionist = () => (
    <StaffCreationForm
        role="receptionist"
        title="Add Receptionist"
        subtitle="Register a new front desk & visitor management staff member"
        accentColor="#0ea5e9"
        accentBg="#e0f2fe"
        borderColor="#7dd3fc"
        RoleIcon={IconPhone}
        extraDocuments={['Communication Skills Certificate', 'Computer Proficiency Certificate']}
        roleSpecificSection={<ReceptionistRoleSection />}
    />
);

export default CreateReceptionist;
