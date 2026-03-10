import React from 'react';
import StaffCreationForm, { SectionCard, Grid, Input, Select } from './StaffCreationForm';
import { IconUsers, IconMessageCircle, IconBriefcase } from '@tabler/icons-react';

const PRORoleSection = () => {
    const [data, setData] = React.useState({
        campaigns_managed: '', communication_skills: '', languages: '', experience_years: ''
    });
    const set = (field) => (e) => setData(p => ({ ...p, [field]: e.target.value }));

    return (
        <SectionCard icon={IconMessageCircle} title="PRO Details" color="#ec4899" bg="#fce7f3">
            <Grid cols={3}>
                <Input label="Campaigns Managed" type="number" icon={IconBriefcase} placeholder="e.g. 5" value={data.campaigns_managed} onChange={set('campaigns_managed')} />
                <Select label="Communication Skills" value={data.communication_skills} onChange={set('communication_skills')}>
                    <option value="">Select Level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                </Select>
                <Input label="Languages Known" placeholder="e.g. English, Spanish" value={data.languages} onChange={set('languages')} />
            </Grid>
            <div style={{ height: 16 }} />
            <Grid cols={1}>
                <Input label="Relevant Experience" placeholder="e.g. 3 years in PR" value={data.experience_years} onChange={set('experience_years')} />
            </Grid>
        </SectionCard>
    );
};

const CreatePro = () => (
    <StaffCreationForm
        role="pro"
        title="Add PRO"
        subtitle="Register a new Public Relations Officer"
        accentColor="#ec4899"
        accentBg="#fce7f3"
        borderColor="#fbcfe8"
        RoleIcon={IconUsers}
        extraDocuments={['Public Relations Certificate', 'Experience Certificate']}
        roleSpecificSection={<PRORoleSection />}
    />
);

export default CreatePro;
