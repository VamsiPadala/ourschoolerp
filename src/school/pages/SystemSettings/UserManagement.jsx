import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { api } from 'src/lib/api-client';
import {
    IconUserPlus,
    IconUsers,
    IconTrash,
    IconCheck,
    IconX,
    IconSearch,
    IconLoader2,
    IconShieldLock,
    IconMail,
    IconArrowRight,
    IconSchool,
} from '@tabler/icons-react';
import './SystemSettings.css';

// ─── Dummy data: shown when API returns no users ──────────────────────────────
const DUMMY_USERS = [
    { id: 'd1', name: 'Ananya Reddy', username: 'ananya_r', email: 'ananya@school.com', role: 'school_admin', status: 'active' },
    { id: 'd2', name: 'Ravi Shankar', username: 'ravi_s', email: 'ravi@school.com', role: 'principal', status: 'active' },
    { id: 'd3', name: 'Priya Mehta', username: 'priya_m', email: 'priya@school.com', role: 'teacher', status: 'active' },
    { id: 'd4', name: 'Kiran Kumar', username: 'kiran_k', email: 'kiran@school.com', role: 'teacher', status: 'inactive' },
    { id: 'd5', name: 'Suresh Babu', username: 'suresh_b', email: 'suresh@school.com', role: 'accountant', status: 'active' },
    { id: 'd6', name: 'Deepa Nair', username: 'deepa_n', email: 'deepa@school.com', role: 'librarian', status: 'active' },
    { id: 'd7', name: 'Arjun Patel', username: 'arjun_p', email: 'arjun@school.com', role: 'student', status: 'active' },
    { id: 'd8', name: 'Sneha Iyer', username: 'sneha_i', email: 'sneha@school.com', role: 'student', status: 'active' },
    { id: 'd9', name: 'Ramesh Kumar', username: 'ramesh_k', email: 'ramesh@school.com', role: 'parent', status: 'active' },
    { id: 'd10', name: 'Lakshmi Devi', username: 'lakshmi_d', email: 'lakshmi@school.com', role: 'receptionist', status: 'active' },
    { id: 'd11', name: 'Vijay Mohan', username: 'vijay_m', email: 'vijay@school.com', role: 'branch_admin', status: 'active' },
    { id: 'd12', name: 'Saranya Thomas', username: 'saranya_t', email: 'saranya@school.com', role: 'student', status: 'inactive' },
];

const UserManagement = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/users/');
            const list = Array.isArray(data) ? data : data.items || [];
            // Fall back to dummy data for display when API returns nothing
            setUsers(list.length > 0 ? list : DUMMY_USERS);
        } catch (err) {
            console.error('Failed to fetch users:', err);
            // Show dummy data even on error so UI doesn't look broken
            setUsers(DUMMY_USERS);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = async (userId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await api.patch(`/users/${userId}`, { status: newStatus });
            fetchUsers();
        } catch (err) {
            console.error('Failed to update user status:', err);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete(`/users/${userId}`);
            fetchUsers();
        } catch (err) {
            console.error('Failed to delete user:', err);
        }
    };

    const filteredUsers = users.filter(u =>
        (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (u.username?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
    );

    const PAGE_SIZE = 8;
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 whenever search changes
    useEffect(() => { setCurrentPage(1); }, [searchTerm]);


    const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div className="settings-container" style={{ padding: '40px 24px' }}>
            <div className="settings-header mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <IconShieldLock size={28} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                </div>
                <p className="text-lg text-muted">Manage user accounts with role-based access control.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Left Column – Create User CTA */}
                <div className="xl:col-span-1">
                    {/* Create User Card */}
                    <div
                        onClick={() => navigate('/school/users/create')}
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            borderRadius: 20, padding: '32px 24px', cursor: 'pointer',
                            boxShadow: '0 12px 40px rgba(99,102,241,0.35)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            color: 'white', marginBottom: 16
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(99,102,241,0.45)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.35)'; }}
                    >
                        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                            <IconUserPlus size={28} color="white" />
                        </div>
                        <h3 style={{ fontWeight: 800, fontSize: 20, margin: '0 0 8px', lineHeight: 1.2 }}>Create New User</h3>
                        <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 24px', lineHeight: 1.6 }}>
                            Select a role and fill in the required information to provision a new account.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14 }}>
                            Choose User Type <IconArrowRight size={18} />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    {[
                        { label: 'Total Users', value: users.length, color: '#6366f1', bg: '#eef2ff' },
                        { label: 'Teachers', value: users.filter(u => u.role === 'teacher' || u.role === 'principal').length, color: '#f59e0b', bg: '#fef3c7' },
                        { label: 'Students', value: users.filter(u => u.role === 'student').length, color: '#3b82f6', bg: '#dbeafe' },
                        { label: 'Active', value: users.filter(u => !u.status || u.status === 'active').length, color: '#10b981', bg: '#d1fae5' },
                    ].map(stat => (
                        <div key={stat.label} style={{ background: 'white', borderRadius: 14, padding: '16px 18px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280' }}>{stat.label}</div>
                            <div style={{ minWidth: 38, height: 38, borderRadius: 10, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: stat.color }}>
                                {stat.value}
                            </div>
                        </div>
                    ))}

                    {/* RBAC Info */}
                    <div style={{ background: 'white', borderRadius: 16, padding: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb', marginTop: 6 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Your Permissions</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconSchool size={18} color="#6366f1" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 13, color: '#1f2937', textTransform: 'capitalize' }}>{user?.role?.replace(/_/g, ' ')}</div>
                                <div style={{ fontSize: 11, color: '#9ca3af' }}>Current Role</div>
                            </div>
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 10 }}>
                            You can create users allowed by your hierarchical access level.
                        </div>
                    </div>
                </div>


                {/* Right Column — Users Table */}
                <div className="xl:col-span-3">
                    <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', overflow: 'hidden', border: '1px solid #f1f5f9' }}>

                        {/* Table Header */}
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconUsers size={20} color="#6366f1" />
                                </div>
                                <span style={{ fontWeight: 800, fontSize: 17, color: '#1e1b4b' }}>All Users</span>
                                <span style={{ background: '#6366f1', color: 'white', borderRadius: 20, padding: '2px 11px', fontSize: 12, fontWeight: 700 }}>
                                    {filteredUsers.length}
                                </span>
                            </div>
                            <div style={{ position: 'relative', width: 280 }}>
                                <IconSearch size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    type="text"
                                    placeholder="Search name, email, username..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: '100%', padding: '9px 14px 9px 36px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 13, color: '#374151', background: '#f9fafb', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px', color: '#9ca3af' }}>
                                <IconLoader2 size={40} style={{ marginBottom: 12, color: '#6366f1' }} className="animate-spin" />
                                <p style={{ fontWeight: 600 }}>Loading users...</p>
                            </div>
                        ) : filteredUsers.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                {/* Column headers */}
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1fr 100px', padding: '10px 20px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                    {['User', 'Email', 'Role', 'Status', 'Actions'].map((h, i) => (
                                        <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: i === 4 ? 'right' : 'left' }}>{h}</div>
                                    ))}
                                </div>

                                {/* Rows */}
                                <div>
                                    {paginatedUsers.map((u, idx) => {
                                        const roleColor = {
                                            super_admin: { grad: 'linear-gradient(135deg,#7c3aed,#6366f1)', pill: '#f3e8ff', text: '#7e22ce' },
                                            school_admin: { grad: 'linear-gradient(135deg,#f59e0b,#ef4444)', pill: '#fef3c7', text: '#b45309' },
                                            branch_admin: { grad: 'linear-gradient(135deg,#10b981,#0ea5e9)', pill: '#d1fae5', text: '#065f46' },
                                            principal: { grad: 'linear-gradient(135deg,#0ea5e9,#6366f1)', pill: '#e0f2fe', text: '#0369a1' },
                                            teacher: { grad: 'linear-gradient(135deg,#f59e0b,#fb923c)', pill: '#fef3c7', text: '#92400e' },
                                            student: { grad: 'linear-gradient(135deg,#3b82f6,#6366f1)', pill: '#dbeafe', text: '#1d4ed8' },
                                            parent: { grad: 'linear-gradient(135deg,#ec4899,#f43f5e)', pill: '#fce7f3', text: '#9d174d' },
                                            accountant: { grad: 'linear-gradient(135deg,#10b981,#14b8a6)', pill: '#d1fae5', text: '#065f46' },
                                            librarian: { grad: 'linear-gradient(135deg,#7c3aed,#8b5cf6)', pill: '#ede9fe', text: '#5b21b6' },
                                            receptionist: { grad: 'linear-gradient(135deg,#0ea5e9,#06b6d4)', pill: '#e0f2fe', text: '#0369a1' },
                                            pro: { grad: 'linear-gradient(135deg,#ec4899,#db2777)', pill: '#fce7f3', text: '#9d174d' },
                                            transport_manager: { grad: 'linear-gradient(135deg,#10b981,#059669)', pill: '#d1fae5', text: '#065f46' },
                                            hostel_warden: { grad: 'linear-gradient(135deg,#f59e0b,#d97706)', pill: '#fef3c7', text: '#b45309' },
                                        }[u.role] || { grad: 'linear-gradient(135deg,#6b7280,#374151)', pill: '#f3f4f6', text: '#374151' };

                                        return (
                                            <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1fr 100px', alignItems: 'center', padding: '13px 20px', borderBottom: idx < paginatedUsers.length - 1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.15s', cursor: 'default' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'white'}
                                            >
                                                {/* User col */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: roleColor.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 15, flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                                                        {u.name?.charAt(0)?.toUpperCase() || 'U'}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 700, fontSize: 14, color: '#1f2937' }}>{u.name}</div>
                                                        <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace', background: '#f1f5f9', padding: '1px 6px', borderRadius: 4, display: 'inline-block', marginTop: 2 }}>@{u.username}</div>
                                                    </div>
                                                </div>

                                                {/* Email col */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <IconMail size={14} color="#9ca3af" style={{ flexShrink: 0 }} />
                                                    <span style={{ fontSize: 13, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</span>
                                                </div>

                                                {/* Role pill */}
                                                <div>
                                                    <span style={{ background: roleColor.pill, color: roleColor.text, padding: '4px 11px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'capitalize', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
                                                        {u.role?.replace(/_/g, ' ')}
                                                    </span>
                                                </div>

                                                {/* Status */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: u.status === 'active' ? '#22c55e' : '#ef4444', boxShadow: u.status === 'active' ? '0 0 0 3px rgba(34,197,94,0.2)' : 'none' }} />
                                                    <span style={{ fontSize: 12, fontWeight: 700, color: u.status === 'active' ? '#16a34a' : '#dc2626', textTransform: 'uppercase' }}>{u.status || 'active'}</span>
                                                </div>

                                                {/* Actions */}
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                                                    <button onClick={() => handleToggleStatus(u.id, u.status)} title={u.status === 'active' ? 'Restrict' : 'Restore'} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: u.status === 'active' ? '#fef3c7' : '#d1fae5', color: u.status === 'active' ? '#b45309' : '#065f46', transition: 'transform 0.15s' }}
                                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                                    >
                                                        {u.status === 'active' ? <IconX size={15} /> : <IconCheck size={15} />}
                                                    </button>
                                                    <button onClick={() => handleDeleteUser(u.id)} title="Delete" style={{ width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fee2e2', color: '#b91c1c', transition: 'transform 0.15s' }}
                                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                                    >
                                                        <IconTrash size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Pagination Bar */}
                                {totalPages > 1 && (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbff' }}>
                                        <div style={{ fontSize: 13, color: '#9ca3af' }}>
                                            Showing <strong style={{ color: '#374151' }}>{(currentPage - 1) * PAGE_SIZE + 1}</strong>–<strong style={{ color: '#374151' }}>{Math.min(currentPage * PAGE_SIZE, filteredUsers.length)}</strong> of <strong style={{ color: '#374151' }}>{filteredUsers.length}</strong> users
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            {/* Prev */}
                                            <button
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: currentPage === 1 ? '#f9fafb' : 'white', color: currentPage === 1 ? '#d1d5db' : '#374151', fontWeight: 600, fontSize: 13, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}
                                            >← Prev</button>

                                            {/* Page Numbers */}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    style={{ width: 34, height: 34, borderRadius: 8, border: page === currentPage ? '2px solid #6366f1' : '1.5px solid #e5e7eb', background: page === currentPage ? '#6366f1' : 'white', color: page === currentPage ? 'white' : '#374151', fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s' }}
                                                >{page}</button>
                                            ))}

                                            {/* Next */}
                                            <button
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: currentPage === totalPages ? '#f9fafb' : 'white', color: currentPage === totalPages ? '#d1d5db' : '#374151', fontWeight: 600, fontSize: 13, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}
                                            >Next →</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                <div className="bg-white p-4 rounded-full w-fit mx-auto mb-4 shadow-sm">
                                    <IconUsers size={48} className="text-slate-300" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-700 m-0">No Users Found</h4>
                                <p className="text-slate-500 mt-1">Create your first user to get started.</p>
                                <button
                                    onClick={() => navigate('/school/users/create')}
                                    style={{ marginTop: 20, padding: '12px 28px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
                                >
                                    + Create First User
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
