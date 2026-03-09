import React from 'react';
import UserCreationForm from './UserCreationForm';

const CreateBranchAdmin = () => (
    <UserCreationForm
        role="branch_admin"
        title="Add Branch Admin"
        description="Assign an administrator to manage a branch"
        color="#8b5cf6"
        bg="#f3e8ff"
        extraFields={[
            { name: 'employee_id', label: 'Employee ID', type: 'text', placeholder: 'e.g. BA-2024-01', required: false },
            { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 9876543210', required: false },
            { name: 'branch_name', label: 'Branch Name', type: 'text', placeholder: 'e.g. Main Campus', required: false },
        ]}
    />
);

export default CreateBranchAdmin;
