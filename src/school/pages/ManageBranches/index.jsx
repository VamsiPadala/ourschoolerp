import React, { useState, useEffect } from 'react';
import { IconBuilding, IconPlus, IconEdit, IconTrash, IconCheck, IconX, IconMapPin, IconPhone, IconUser, IconLoader } from '@tabler/icons-react';
import { useBranch } from '../../../context/BranchContext';
import useBranches from '../../../hooks/useBranches';

const EMPTY_FORM = { name: '', address: '', city: '', phone: '', principal_name: '', is_active: true };

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
    const openEdit = (b) => { setForm({ name: b.name, address: b.address || '', city: b.city || '', phone: b.phone || '', principal_name: b.principal_name || '', is_active: b.is_active }); setEditingBranch(b); setShowModal(true); };
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

            {/* Branch Cards Grid */}
            {branches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🏫</div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#374151', marginBottom: 8 }}>No branches yet</div>
                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 24 }}>Click "Add Branch" to create your first campus</div>
                    <button onClick={openCreate} style={{ padding: '10px 24px', borderRadius: 12, background: '#3D5EE1', border: 'none', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                        + Add Branch
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
                    {branches.map((b) => {
                        const isActive = activeBranch?.id === b.id;
                        return (
                            <div key={b.id} style={{ background: 'white', borderRadius: 16, boxShadow: isActive ? '0 0 0 2.5px #3D5EE1, 0 8px 32px rgba(61,94,225,0.14)' : '0 4px 20px rgba(0,0,0,0.06)', border: isActive ? '1.5px solid #3D5EE1' : '1px solid #f1f5f9', overflow: 'hidden', position: 'relative', transition: 'all 0.2s' }}>
                                {/* Top accent */}
                                <div style={{ height: 4, background: isActive ? 'linear-gradient(90deg,#3D5EE1,#6C49EF)' : '#f1f5f9' }} />

                                {isActive && (
                                    <div style={{ position: 'absolute', top: 12, right: 12, padding: '3px 10px', borderRadius: 20, background: '#eef2ff', color: '#3D5EE1', fontSize: 10, fontWeight: 800 }}>ACTIVE</div>
                                )}

                                <div style={{ padding: '20px 20px 16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: isActive ? 'linear-gradient(135deg,#3D5EE1,#6C49EF)' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <IconBuilding size={20} color={isActive ? 'white' : '#6b7280'} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>{b.name}</div>
                                            <div style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: b.is_active ? '#d1fae5' : '#fee2e2', color: b.is_active ? '#065f46' : '#b91c1c', display: 'inline-block', marginTop: 2 }}>
                                                {b.is_active ? '● Active' : '● Inactive'}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {b.address && (
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#6b7280' }}>
                                                <IconMapPin size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                                                <span>{b.address}{b.city ? `, ${b.city}` : ''}</span>
                                            </div>
                                        )}
                                        {b.phone && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>
                                                <IconPhone size={14} /> {b.phone}
                                            </div>
                                        )}
                                        {b.principal_name && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280' }}>
                                                <IconUser size={14} /> {b.principal_name}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8 }}>
                                    {!isActive && (
                                        <button onClick={() => setActiveBranch(b)}
                                            style={{ flex: 1, padding: '8px', borderRadius: 10, border: '1.5px solid #3D5EE1', background: 'white', color: '#3D5EE1', fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s' }}
                                            onMouseEnter={e => { e.currentTarget.style.background = '#3D5EE1'; e.currentTarget.style.color = 'white'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#3D5EE1'; }}>
                                            Switch to This
                                        </button>
                                    )}
                                    <button onClick={() => openEdit(b)}
                                        style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#374151', fontWeight: 600 }}>
                                        <IconEdit size={14} /> Edit
                                    </button>
                                    <button onClick={() => setConfirmDelete(b)}
                                        style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #fee2e2', background: '#fff5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#ef4444', fontWeight: 600 }}>
                                        <IconTrash size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
                    onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
                    <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', width: '100%', maxWidth: 520, overflow: 'hidden' }}>
                        {/* Modal Header */}
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <IconBuilding size={18} color="#3D5EE1" />
                                </div>
                                <span style={{ fontWeight: 800, fontSize: 17, color: '#1e1b4b' }}>{editingBranch ? 'Edit Branch' : 'Add New Branch'}</span>
                            </div>
                            <button onClick={closeModal} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconX size={16} color="#6b7280" />
                            </button>
                        </div>

                        {/* Form */}
                        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { key: 'name', label: 'Branch Name *', placeholder: 'e.g. Main Campus' },
                                { key: 'address', label: 'Address', placeholder: 'Street address' },
                                { key: 'city', label: 'City', placeholder: 'City name' },
                                { key: 'phone', label: 'Phone', placeholder: '+91 9876543210' },
                                { key: 'principal_name', label: "Principal's Name", placeholder: 'Full name' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 5 }}>{f.label}</label>
                                    <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                        placeholder={f.placeholder}
                                        style={{ width: '100%', padding: '9px 13px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: '#1f2937', background: 'white' }}
                                        onFocus={e => e.target.style.borderColor = '#3D5EE1'}
                                        onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                                </div>
                            ))}
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} style={{ width: 16, height: 16, accentColor: '#3D5EE1' }} />
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Branch is Active</span>
                            </label>
                        </div>

                        {/* Modal Footer */}
                        <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={closeModal} style={{ padding: '9px 20px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', fontWeight: 600, fontSize: 13, cursor: 'pointer', color: '#6b7280' }}>
                                Cancel
                            </button>
                            <button onClick={handleSave} disabled={saving}
                                style={{ padding: '9px 24px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#3D5EE1,#6C49EF)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: saving ? 0.7 : 1 }}>
                                {saving && <IconLoader size={14} />}
                                {saving ? 'Saving...' : editingBranch ? 'Update Branch' : 'Create Branch'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            {confirmDelete && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                    <div style={{ background: 'white', borderRadius: 16, padding: '28px 28px', maxWidth: 400, width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
                        <div style={{ width: 52, height: 52, borderRadius: 14, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <IconTrash size={24} color="#ef4444" />
                        </div>
                        <h3 style={{ textAlign: 'center', fontSize: 17, fontWeight: 800, color: '#1e1b4b', marginBottom: 8 }}>Delete Branch?</h3>
                        <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', marginBottom: 24 }}>
                            Are you sure you want to delete <strong>"{confirmDelete.name}"</strong>? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', fontWeight: 600, cursor: 'pointer' }}>
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(confirmDelete.id)} disabled={saving}
                                style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: '#ef4444', color: 'white', fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
                                {saving ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBranches;
