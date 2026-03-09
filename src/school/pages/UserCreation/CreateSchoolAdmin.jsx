import React from 'react';
import UserCreationForm from './UserCreationForm';

const CreateSchoolAdmin = () => (
    <UserCreationForm
        role="school_admin"
        title="Add School Admin"
        description="Create a school-level administrator account"
        color="#6366f1"
        bg="#eef2ff"
        extraFields={[
            { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 9876543210', required: false },
            { name: 'school_name', label: 'School Name', type: 'text', placeholder: 'e.g. Greenwood High', required: false },
        ]}
    />
);

export default CreateSchoolAdmin;
