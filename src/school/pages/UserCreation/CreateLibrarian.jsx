import React from 'react';
import StaffCreationForm, { SectionCard, Grid, Input, Select } from './StaffCreationForm';
import { IconLibrary, IconId, IconBook } from '@tabler/icons-react';

const LibrarianRoleSection = () => {
    const [data, setData] = React.useState({
        library_software: '', specialization: '', total_books_managed: '', certifications: ''
    });
    const set = (field) => (e) => setData(p => ({ ...p, [field]: e.target.value }));

    return (
        <SectionCard icon={IconLibrary} title="Librarian Details" color="#7c3aed" bg="#ede9fe">
            <Grid cols={3}>
                <Select label="Library Software Used" value={data.library_software} onChange={set('library_software')}>
                    <option value="">Select Software</option>
                    <option>Koha</option>
                    <option>OpenBiblio</option>
                    <option>Destiny</option>
                    <option>Follett</option>
                    <option>Other</option>
                </Select>
                <Select label="Specialization" value={data.specialization} onChange={set('specialization')}>
                    <option value="">Select Specialization</option>
                    <option>Academic Library</option>
                    <option>Digital Resources</option>
                    <option>Archiving & Records</option>
                    <option>Children's Library</option>
                    <option>General</option>
                </Select>
                <Input label="Total Books Managed" type="number" icon={IconBook} placeholder="e.g. 5000" value={data.total_books_managed} onChange={set('total_books_managed')} />
            </Grid>
            <div style={{ height: 16 }} />
            <Grid cols={1}>
                <Input label="Professional Certifications" placeholder="e.g. B.Lib, M.Lib, PGDLIS" value={data.certifications} onChange={set('certifications')} />
            </Grid>
        </SectionCard>
    );
};

const CreateLibrarian = () => (
    <StaffCreationForm
        role="librarian"
        title="Add Librarian"
        subtitle="Register a new library staff member"
        accentColor="#7c3aed"
        accentBg="#ede9fe"
        borderColor="#c4b5fd"
        RoleIcon={IconLibrary}
        extraDocuments={['Library Science Certificate', 'Experience Certificate']}
        roleSpecificSection={<LibrarianRoleSection />}
    />
);

export default CreateLibrarian;
