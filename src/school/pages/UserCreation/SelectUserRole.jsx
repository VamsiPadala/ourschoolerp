import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconUserPlus, IconSchool, IconBuildingBank, IconBook,
    IconUsers, IconHeartHandshake, IconShield, IconPhone,
    IconLibrary, IconChartBar, IconArrowLeft
} from '@tabler/icons-react';

const ALL_ROLES = [
    { id: 'school_admin', label: 'School Admin', description: 'Full access to school management', icon: IconSchool, color: '#6366f1', bg: '#eef2ff', path: '/school/users/create/school-admin' },
    { id: 'principal', label: 'Principal', description: 'School head with full branch oversight', icon: IconShield, color: '#0ea5e9', bg: '#e0f2fe', path: '/school/users/create/principal' },
    { id: 'branch_admin', label: 'Branch Admin', description: 'Manages a specific branch', icon: IconBuildingBank, color: '#8b5cf6', bg: '#f3e8ff', path: '/school/users/create/branch-admin' },
    { id: 'accountant', label: 'Accountant', description: 'Handles financial operations', icon: IconChartBar, color: '#10b981', bg: '#d1fae5', path: '/school/users/create/accountant' },
    { id: 'teacher', label: 'Teacher', description: 'Academic staff & classroom management', icon: IconBook, color: '#f59e0b', bg: '#fef3c7', path: '/school/users/create/teacher' },
    { id: 'student', label: 'Student', description: 'Enroll a new student in the system', icon: IconUsers, color: '#3b82f6', bg: '#dbeafe', path: '/school/users/create/student' },
    { id: 'parent', label: 'Parent / Guardian', description: "Linked to student's account", icon: IconHeartHandshake, color: '#ec4899', bg: '#fce7f3', path: '/school/users/create/parent' },
    { id: 'receptionist', label: 'Receptionist', description: 'Front desk & visitor management', icon: IconPhone, color: '#6b7280', bg: '#f3f4f6', path: '/school/users/create/receptionist' },
    { id: 'librarian', label: 'Librarian', description: 'Library and book management', icon: IconLibrary, color: '#7c3aed', bg: '#ede9fe', path: '/school/users/create/librarian' },
    { id: 'pro', label: 'PRO', description: 'Public Relations Officer', icon: IconUsers, color: '#ec4899', bg: '#fce7f3', path: '/school/users/create/pro' },
    { id: 'transport_manager', label: 'Transport Manager', description: 'Vehicle and route tracking', icon: IconSchool, color: '#10b981', bg: '#d1fae5', path: '/school/users/create/transport-manager' },
    { id: 'hostel_warden', label: 'Hostel Warden', description: 'Hostel and room allocation', icon: IconBuildingBank, color: '#f59e0b', bg: '#fef3c7', path: '/school/users/create/hostel-warden' },
];


const SelectUserRole = () => {
    const navigate = useNavigate();

    const roles = ALL_ROLES;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)', padding: '40px 24px' }}>
            {/* Header */}
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontWeight: 600, fontSize: 14, marginBottom: 32 }}
                >
                    <IconArrowLeft size={18} /> Back
                </button>

                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 16px 40px rgba(99,102,241,0.3)', marginBottom: 20 }}>
                        <IconUserPlus size={36} color="white" />
                    </div>
                    <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1e1b4b', margin: 0 }}>Create New User</h1>
                    <p style={{ color: '#6b7280', marginTop: 10, fontSize: 16 }}>
                        Choose the type of user you want to add to the system
                    </p>
                </div>

                {roles.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 24px', background: 'white', borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                        <p style={{ color: '#9ca3af', fontSize: 16 }}>You don't have permission to create users.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                        {roles.map((role) => {
                            const Icon = role.icon;
                            return (
                                <button
                                    key={role.id}
                                    onClick={() => navigate(role.path)}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16,
                                        background: 'white', border: '2px solid #e5e7eb', borderRadius: 20,
                                        padding: '28px 24px', cursor: 'pointer', textAlign: 'left',
                                        transition: 'all 0.2s ease', boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = role.color;
                                        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.12)`;
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{ width: 52, height: 52, borderRadius: 14, background: role.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={26} color={role.color} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 17, color: '#1f2937', marginBottom: 4 }}>{role.label}</div>
                                        <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>{role.description}</div>
                                    </div>
                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 6, color: role.color, fontWeight: 600, fontSize: 13 }}>
                                        Create {role.label} <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectUserRole;
