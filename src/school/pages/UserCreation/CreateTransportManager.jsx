import React from 'react';
import StaffCreationForm, { SectionCard, Grid, Input, Select } from './StaffCreationForm';
import { IconBus, IconMapPin, IconSteeringWheel } from '@tabler/icons-react';

const TransportManagerRoleSection = () => {
    const [data, setData] = React.useState({
        vehicles_managed: '', license_type: '', routes_managed: '', certifications: ''
    });
    const set = (field) => (e) => setData(p => ({ ...p, [field]: e.target.value }));

    return (
        <SectionCard icon={IconBus} title="Transport Manager Details" color="#10b981" bg="#d1fae5">
            <Grid cols={3}>
                <Input label="Vehicles Managed" type="number" icon={IconSteeringWheel} placeholder="e.g. 20" value={data.vehicles_managed} onChange={set('vehicles_managed')} />
                <Select label="Driving License Type" value={data.license_type} onChange={set('license_type')}>
                    <option value="">Select License</option>
                    <option>Class A</option>
                    <option>Class B</option>
                    <option>Class C</option>
                    <option>Commercial</option>
                </Select>
                <Input label="Routes Managed" type="number" icon={IconMapPin} placeholder="e.g. 15" value={data.routes_managed} onChange={set('routes_managed')} />
            </Grid>
            <div style={{ height: 16 }} />
            <Grid cols={1}>
                <Input label="Safety Certifications" placeholder="e.g. Advanced Defensive Driving" value={data.certifications} onChange={set('certifications')} />
            </Grid>
        </SectionCard>
    );
};

const CreateTransportManager = () => (
    <StaffCreationForm
        role="transport_manager"
        title="Add Transport Manager"
        subtitle="Register a new Transport Manager"
        accentColor="#10b981"
        accentBg="#d1fae5"
        borderColor="#a7f3d0"
        RoleIcon={IconBus}
        extraDocuments={['Driving License Copy', 'Safety Certification']}
        roleSpecificSection={<TransportManagerRoleSection />}
    />
);

export default CreateTransportManager;
