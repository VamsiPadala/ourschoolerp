import React, { useState, useEffect } from 'react';
import { IconBuilding, IconPlus, IconEdit, IconTrash, IconCheck, IconX, IconMapPin, IconPhone, IconUser, IconLoader, IconMail, IconHash, IconArrowsExchange } from '@tabler/icons-react';
import { useBranch } from '../../../context/BranchContext';
import useBranches from '../../../hooks/useBranches';

const EMPTY_FORM = { name: '', code: '', email: '', address: '', city: '', phone: '', principal_name: '', is_active: true };

const ManageBranches = () => {
    const { activeBranch, setActiveBranch, fetchBranches } = useBranch();
    const { branches, saving, createBranch, updateBranch, deleteBranch } = useBranches();

    const [showModal, setShowModal] = useState(false);
    const [editingBranch, setEditingBranch] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [toast, setToast] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => { fetchBranches(); }, []);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const openCreate = () => { setForm(EMPTY_FORM); setEditingBranch(null); setShowModal(true); };
    const openEdit = (b) => { 
        setForm({ 
            name: b.name, 
            code: b.code || '', 
            email: b.email || '',
            address: b.address || '', 
            city: b.city || '', 
            phone: b.phone || '', 
            principal_name: b.principal_name || '', 
            is_active: b.is_active 
        }); 
        setEditingBranch(b); 
        setShowModal(true); 
    };
    const closeModal = () => { setShowModal(false); setEditingBranch(null); };

    const handleSave = async () => {
        if (!form.name.trim()) return showToast('Branch name is required', 'error');
        if (editingBranch) {
            const res = await updateBranch(editingBranch.id, form);
            if (res.success) { showToast('Branch updated!'); closeModal(); }
            else showToast(res.error, 'error');
        } else {
            const res = await createBranch(form);
            if (res.success) { showToast('Branch created!'); closeModal(); }
            else showToast(res.error, 'error');
        }
    };

    const handleDelete = async (id) => {
        const res = await deleteBranch(id);
        if (res.success) { showToast('Branch deleted'); setConfirmDelete(null); }
        else showToast(res.error, 'error');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F7F7FA', fontFamily: "'Poppins', sans-serif", padding: '28px 28px 60px' }}>

            {/* Toast */}
            {toast && (
                <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, padding: '12px 20px', borderRadius: 12, background: toast.type === 'error' ? '#fee2e2' : '#d1fae5', color: toast.type === 'error' ? '#b91c1c' : '#065f46', fontWeight: 700, fontSize: 13, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {toast.type === 'error' ? <IconX size={16} /> : <IconCheck size={16} />} {toast.msg}
                </div>
            )}

            {/* Page Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#3D5EE1,#6C49EF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconBuilding size={20} color="white" />
                        </div>
                        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1e1b4b', margin: 0 }}>Branch Management</h1>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: 13, margin: '6px 0 0 50px' }}>Add, edit, and switch between school campuses</p>
                </div>
                <button onClick={openCreate}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, background: 'linear-gradient(135deg,#3D5EE1,#6C49EF)', border: 'none', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 16px rgba(61,94,225,0.35)', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                    <IconPlus size={18} /> Add Branch
                </button>
            </div>

            {/* Quick Switch Row (Easy Switch) */}
            {branches.length > 0 && (
                <div style={{ marginBottom: 32, padding: '20px', background: 'white', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <IconArrowsExchange size={18} color="#3D5EE1" />
                        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e1b4b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Quick Switch Campus
                        </h3>
                    </div>
                    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
                        {branches.map(b => (
                            <button
                                key={b.id}
                                onClick={() => setActiveBranch(b)}
                                style={{
                                    padding: '12px 20px',
                                    borderRadius: 14,
                                    background: activeBranch?.id === b.id ? 'linear-gradient(135deg,#3D5EE1,#6C49EF)' : '#f8fafc',
                                    color: activeBranch?.id === b.id ? 'white' : '#475569',
                                    fontWeight: 700,
                                    fontSize: 13,
                                    border: activeBranch?.id === b.id ? 'none' : '1px solid #e2e8f0',
                                    boxShadow: activeBranch?.id === b.id ? '0 8px 16px rgba(61,94,225,0.25)' : 'none',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10
                                }}
                            >
                                <IconBuilding size={16} />
                                {b.name}
                                {activeBranch?.id === b.id && <IconCheck size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Branch Details Section Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <IconBuilding size={20} color="#3D5EE1" />
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1e1b4b', margin: 0 }}>All Active Branches Details</h2>
            </div>

            {/* Branch Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 24 }}>
                {/* Create New Branch Interactive Card */}
                <div 
                    onClick={openCreate}
                    style={{ 
                        background: '#f8fafc', 
                        borderRadius: 20, 
                        border: '2px dashed #cbd5e1', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        minHeight: 220,
                        padding: 30,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#3D5EE1'; e.currentTarget.style.background = '#f1f5f9'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; }}
                >
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <IconPlus size={28} color="#3D5EE1" />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Create New Branch</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 6, textAlign: 'center' }}>Add another school campus location to your network</div>
                </div>

                {branches.map((b) => {
                    const isActive = activeBranch?.id === b.id;
                    return (
                        <div key={b.id} style={{ background: 'white', borderRadius: 20, boxShadow: isActive ? '0 0 0 3px #3D5EE1, 0 12px 40px rgba(61,94,225,0.14)' : '0 10px 30px rgba(0,0,0,0.04)', border: isActive ? 'none' : '1px solid #f1f5f9', overflow: 'hidden', position: 'relative', transition: 'all 0.2s' }}>
                            {isActive && (
                                <div style={{ position: 'absolute', top: 16, right: 16, padding: '4px 12px', borderRadius: 20, background: 'linear-gradient(135deg,#3D5EE1,#6C49EF)', color: 'white', fontSize: 10, fontWeight: 900, boxShadow: '0 4px 10px rgba(61,94,225,0.3)' }}>ACTIVE</div>
                            )}

                            <div style={{ padding: '24px 24px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                                    <div style={{ width: 52, height: 52, borderRadius: 14, background: isActive ? 'linear-gradient(135deg,#3D5EE1,#6C49EF)' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: isActive ? '0 6px 16px rgba(61,94,225,0.2)' : 'none' }}>
                                        <IconBuilding size={24} color={isActive ? 'white' : '#6b7280'} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: 18, color: '#1e1b4b' }}>{b.name}</div>
                                        {b.code && <div style={{ fontSize: 12, fontWeight: 600, color: '#3D5EE1', marginTop: 2 }}>Code: {b.code}</div>}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {b.address && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#475569' }}>
                                            <IconMapPin size={16} style={{ flexShrink: 0, marginTop: 2, color: '#94a3b8' }} />
                                            <span style={{ lineHeight: 1.5 }}>{b.address}{b.city ? `, ${b.city}` : ''}</span>
                                        </div>
                                    )}
                                    {b.phone && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#475569' }}>
                                            <IconPhone size={16} color="#94a3b8" /> {b.phone}
                                        </div>
                                    )}
                                    {b.email && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#475569' }}>
                                            <IconMail size={16} color="#94a3b8" /> {b.email}
                                        </div>
                                    )}
                                    {b.principal_name && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#475569' }}>
                                            <IconUser size={16} color="#94a3b8" /> Principal: {b.principal_name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions area */}
                            <div style={{ padding: '16px 24px', borderTop: '1px solid #f8fafc', display: 'flex', gap: 10, background: '#fcfdfe' }}>
                                {!isActive && (
                                    <button onClick={() => setActiveBranch(b)}
                                        style={{ flex: 1, padding: '10px', borderRadius: 12, border: '1.5px solid #3D5EE1', background: 'white', color: '#3D5EE1', fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#3D5EE1'; e.currentTarget.style.color = 'white'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#3D5EE1'; }}>
                                        <IconArrowsExchange size={16} /> Switch
                                    </button>
                                )}
                                <button onClick={() => openEdit(b)}
                                    style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#334155', fontWeight: 600 }}>
                                    <IconEdit size={16} /> Edit
                                </button>
                                <button onClick={() => setConfirmDelete(b)}
                                    style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #fee2e2', background: '#fff5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#ef4444', fontWeight: 600 }}>
                                    <IconTrash size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
                    onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
                    <div style={{ background: 'white', borderRadius: 24, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: 580, overflow: 'hidden' }}>
                        {/* Modal Header */}
                        <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconBuilding size={20} color="#3D5EE1" />
                                </div>
                                <div>
                                    <span style={{ fontWeight: 800, fontSize: 18, color: '#1e1b4b', display: 'block' }}>{editingBranch ? 'Edit Campus Branch' : 'Add New Branch'}</span>
                                    <span style={{ fontSize: 12, color: '#64748b' }}>Enter the details to {editingBranch ? 'update' : 'register'} a school campus</span>
                                </div>
                            </div>
                            <button onClick={closeModal} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                <IconX size={20} color="#64748b" />
                            </button>
                        </div>

                        {/* Form Body - Scrollable Area */}
                        <div style={{ 
                            padding: '28px', 
                            display: 'grid', 
                            gridTemplateColumns: '1fr 1fr', 
                            gap: 18, 
                            maxHeight: 'calc(90vh - 160px)', 
                            overflowY: 'auto',
                            scrollbarWidth: 'thin'
                        }}>
                            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 18 }}>
                                {[
                                    { key: 'name', label: 'Branch Name *', placeholder: 'e.g. Main Campus', full: true, icon: <IconBuilding size={16} /> },
                                    { key: 'code', label: 'Branch Code', placeholder: 'e.g. MC-001', icon: <IconHash size={16} /> },
                                    { key: 'email', label: 'Branch Email', placeholder: 'contact@school.com', icon: <IconMail size={16} /> },
                                    { key: 'address', label: 'Full Address', placeholder: 'Door no, Street, Area', full: true, icon: <IconMapPin size={16} /> },
                                    { key: 'city', label: 'City', placeholder: 'e.g. Bangalore' },
                                    { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', icon: <IconPhone size={16} /> },
                                    { key: 'principal_name', label: "Principal In-Charge", placeholder: 'Full Name', full: true, icon: <IconUser size={16} /> },
                                ].map(f => (
                                    <div key={f.key} style={{ gridColumn: f.full ? 'span 2' : 'span 1' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                                            {f.icon || <IconBuilding size={16} />} {f.label}
                                        </label>
                                        <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                            placeholder={f.placeholder}
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: '#1e1b4b', background: '#f8fafc', transition: 'all 0.2s' }}
                                            onFocus={e => { e.target.style.borderColor = '#3D5EE1'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 4px rgba(61,94,225,0.1)'; }}
                                            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }} />
                                    </div>
                                ))}
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', gridColumn: 'span 2', background: '#f1f5f9', padding: '12px 16px', borderRadius: 12 }}>
                                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} style={{ width: 20, height: 20, accentColor: '#3D5EE1' }} />
                                <div>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b', display: 'block' }}>Mark as Active</span>
                                    <span style={{ fontSize: 11, color: '#64748b' }}>Inactive branches won't be visible in general selectors</span>
                                </div>
                            </label>
                        </div>

                        {/* Modal Footer Controls */}
                        <div style={{ padding: '20px 28px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12, justifyContent: 'flex-end', background: '#fcfdfe' }}>
                            <button onClick={closeModal} style={{ padding: '11px 24px', borderRadius: 12, border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }}>
                                Cancel
                            </button>
                            <button onClick={handleSave} disabled={saving}
                                style={{ padding: '11px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#3D5EE1,#6C49EF)', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, opacity: saving ? 0.7 : 1, boxShadow: '0 4px 12px rgba(61,94,225,0.3)', transition: 'all 0.2s' }}>
                                {saving && <IconLoader size={18} className="animate-spin" />}
                                {saving ? 'Saving...' : editingBranch ? 'Update Campus' : 'Register Branch'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div style={{ background: 'white', borderRadius: 24, padding: '32px', maxWidth: 420, width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', textAlign: 'center' }}>
                        <div style={{ width: 64, height: 64, borderRadius: 20, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 16px rgba(239, 68, 68, 0.15)' }}>
                            <IconTrash size={32} color="#ef4444" />
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1e1b4b', marginBottom: 10 }}>Remove Campus?</h3>
                        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>
                            Are you sure you want to delete <strong>"{confirmDelete.name}"</strong>? This will remove all associated configurations. This action cannot be reversed.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>
                                Keep Branch
                            </button>
                            <button onClick={() => handleDelete(confirmDelete.id)} disabled={saving}
                                style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: '#ef4444', color: 'white', fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.7 : 1, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)' }}>
                                {saving ? 'Removing...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBranches;
