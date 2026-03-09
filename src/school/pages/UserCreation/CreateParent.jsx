import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/lib/api-client';
import {
    IconArrowLeft, IconUserPlus, IconLoader2, IconCheck, IconChevronDown,
    IconUser, IconMail, IconPhone, IconLock, IconId, IconSearch,
    IconX, IconAlertCircle, IconHeartHandshake, IconUpload, IconCamera
} from '@tabler/icons-react';


// ─── Photo Upload ────────────────────────────────────────────────────────────
const PhotoUpload = ({ value, onChange }) => {
    const ref = useRef();
    const previewUrl = value ? URL.createObjectURL(value) : null;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div
                onClick={() => ref.current.click()}
                style={{
                    width: 100, height: 100, borderRadius: '50%',
                    background: previewUrl ? 'transparent' : '#fce7f3',
                    border: '3px dashed #f9a8d4', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', position: 'relative', transition: 'border-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#ec4899'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#f9a8d4'}
            >
                {previewUrl
                    ? <img src={previewUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <IconCamera size={28} color="#ec4899" />
                }
                <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(236,72,153,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.2s'
                }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                    <IconUpload size={18} color="#ec4899" />
                </div>
            </div>
            <p style={{ fontSize: 11, color: '#9ca3af', margin: 0, textAlign: 'center', lineHeight: 1.4 }}>Click to upload<br />JPG, PNG (max 4MB)</p>
            <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => e.target.files[0] && onChange(e.target.files[0])} />
        </div>
    );
};

// ─── Reusable Input ──────────────────────────────────────────────────────────
const Input = ({ label, required, icon: Icon, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
        </label>
        <div style={{ position: 'relative' }}>
            {Icon && <Icon size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />}
            <input {...props} style={{
                width: '100%', padding: '10px 14px',
                paddingLeft: Icon ? 36 : 14,
                borderRadius: 10, border: '1.5px solid #e5e7eb',
                fontSize: 14, color: '#1f2937', background: '#f9fafb',
                outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                transition: 'border-color 0.15s'
            }} />
        </div>
    </div>
);

const Select = ({ label, required, children, value, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
        </label>
        <div style={{ position: 'relative' }}>
            <select value={value} onChange={onChange} style={{
                width: '100%', padding: '10px 36px 10px 14px', borderRadius: 10,
                border: '1.5px solid #e5e7eb', fontSize: 14, color: value ? '#1f2937' : '#9ca3af',
                background: '#f9fafb', outline: 'none', appearance: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit', cursor: 'pointer'
            }}>
                {children}
            </select>
            <IconChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
        </div>
    </div>
);

// ─── Searchable Student Picker ───────────────────────────────────────────────
const StudentPicker = ({ value, onChange }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const wrapperRef = useRef(null);
    const debounceRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setIsOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Debounced search
    useEffect(() => {
        if (!query || query.length < 2) { setResults([]); return; }
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setIsLoading(true);
            try {
                // Try fetching students - search by name or roll number
                const data = await api.get(`/users/?role=student&search=${encodeURIComponent(query)}&limit=10`);
                setResults(Array.isArray(data) ? data : data.items || []);
            } catch {
                // Fallback: search all users and filter client-side
                try {
                    const data = await api.get(`/users/?limit=100`);
                    const list = Array.isArray(data) ? data : data.items || [];
                    const q = query.toLowerCase();
                    setResults(list.filter(s =>
                        s.role === 'student' &&
                        (s.name?.toLowerCase().includes(q) || s.roll_number?.toLowerCase?.()?.includes(q) || s.username?.toLowerCase().includes(q))
                    ).slice(0, 10));
                } catch {
                    setResults([]);
                }
            } finally {
                setIsLoading(false);
            }
        }, 350);
    }, [query]);

    const handleSelect = (student) => {
        setSelected(student);
        setQuery('');
        setIsOpen(false);
        onChange(student.id, student.name, student.roll_number);
    };

    const handleClear = () => {
        setSelected(null);
        onChange(null, '', '');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }} ref={wrapperRef}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                Child's Name / Roll Number <span style={{ color: '#ef4444' }}>*</span>
            </label>

            {selected ? (
                // Selected student chip
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 10, border: '1.5px solid #6366f1',
                    background: '#eef2ff', boxSizing: 'border-box'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13 }}>
                            {selected.name?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e1b4b' }}>{selected.name}</div>
                            <div style={{ fontSize: 11, color: '#6b7280' }}>
                                {selected.roll_number ? `Roll: ${selected.roll_number}` : ''} {selected.class_name ? `• ${selected.class_name}` : ''}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClear} type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 6 }}>
                        <IconX size={16} />
                    </button>
                </div>
            ) : (
                // Search input
                <div style={{ position: 'relative' }}>
                    <IconSearch size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', zIndex: 1 }} />
                    <input
                        type="text"
                        value={query}
                        onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Search by student name or roll number..."
                        style={{
                            width: '100%', padding: '10px 14px 10px 36px', borderRadius: 10,
                            border: '1.5px solid #e5e7eb', fontSize: 14, color: '#1f2937',
                            background: '#f9fafb', outline: 'none', boxSizing: 'border-box',
                            fontFamily: 'inherit', transition: 'border-color 0.15s'
                        }}
                        onFocusCapture={e => e.target.style.borderColor = '#6366f1'}
                        onBlurCapture={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                    {isLoading && <IconLoader2 size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', animation: 'spin 1s linear infinite' }} />}

                    {/* Dropdown */}
                    {isOpen && (query.length >= 2) && (
                        <div style={{
                            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999,
                            background: 'white', borderRadius: 12, border: '1.5px solid #e5e7eb',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', marginTop: 6,
                            maxHeight: 260, overflowY: 'auto'
                        }}>
                            {isLoading ? (
                                <div style={{ padding: '14px 16px', color: '#9ca3af', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <IconLoader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Searching students...
                                </div>
                            ) : results.length === 0 ? (
                                <div style={{ padding: '14px 16px', color: '#9ca3af', fontSize: 13, textAlign: 'center' }}>
                                    <IconUser size={20} style={{ marginBottom: 6, opacity: 0.4 }} />
                                    <br />No students found for "{query}"
                                    <br /><span style={{ fontSize: 11 }}>Make sure students are enrolled first.</span>
                                </div>
                            ) : (
                                results.map((student, i) => (
                                    <div
                                        key={student.id || i}
                                        onClick={() => handleSelect(student)}
                                        style={{
                                            padding: '12px 16px', cursor: 'pointer', display: 'flex',
                                            alignItems: 'center', gap: 12, borderBottom: i < results.length - 1 ? '1px solid #f3f4f6' : 'none',
                                            transition: 'background 0.15s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f5f3ff'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'white'}
                                    >
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                                            {student.name?.charAt(0) || 'S'}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 700, fontSize: 14, color: '#1f2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{student.name}</div>
                                            <div style={{ fontSize: 12, color: '#9ca3af', display: 'flex', gap: 8 }}>
                                                {student.roll_number && <span>Roll: <strong>{student.roll_number}</strong></span>}
                                                {student.class_name && <span>• {student.class_name}</span>}
                                                {student.username && <span>• @{student.username}</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
            <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>Type at least 2 characters to search enrolled students.</p>
        </div>
    );
};

// ─── Main Create Parent Form ─────────────────────────────────────────────────
const CreateParent = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', email: '', username: '', password: '',
        phone: '', relation: '', occupation: '',
        student_id: null, student_name: '', student_roll: ''
    });
    const [photo, setPhoto] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.student_id) { setError("Please select the child's student account."); return; }
        setIsSubmitting(true);
        setError('');
        try {
            await api.post('/users/create', {
                name: form.name, email: form.email,
                username: form.username, password: form.password,
                role: 'parent', phone: form.phone,
                relation: form.relation, occupation: form.occupation,
                student_id: form.student_id
            });
            setSuccess(true);
            setTimeout(() => navigate('/school/settings/users'), 2000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to create parent account. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fce7f3 0%, #fdf4ff 100%)', padding: '40px 24px' }}>
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
                {/* Back */}
                <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#9d174d', fontWeight: 600, fontSize: 14, marginBottom: 28 }}>
                    <IconArrowLeft size={18} /> Back
                </button>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28, background: 'white', borderRadius: 20, padding: '24px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', borderLeft: '5px solid #ec4899' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconHeartHandshake size={28} color="#ec4899" />
                    </div>
                    <div>
                        <h2 style={{ fontWeight: 800, fontSize: 24, color: '#1e1b4b', margin: 0 }}>Add Parent / Guardian</h2>
                        <p style={{ color: '#9ca3af', margin: '4px 0 0', fontSize: 14 }}>Register a parent and link them to their child's student account</p>
                    </div>
                </div>

                {/* Alerts */}
                {success && (
                    <div style={{ background: '#d1fae5', border: '1.5px solid #34d399', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, color: '#065f46', fontWeight: 600, marginBottom: 20 }}>
                        <IconCheck size={22} /> Parent account created! Redirecting...
                    </div>
                )}
                {error && (
                    <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, color: '#b91c1c', marginBottom: 20 }}>
                        <IconAlertCircle size={22} /> {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Account Details */}
                    <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px' }}>Account Details</p>
                        {/* Photo + Basic Details side by side */}
                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, alignItems: 'start' }}>
                            <PhotoUpload value={photo} onChange={setPhoto} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <Input label="Full Name" required icon={IconUser} placeholder="e.g. Ramesh Kumar" value={form.name} onChange={set('name')} />
                                <Input label="Email Address" required icon={IconMail} type="email" placeholder="parent@email.com" value={form.email} onChange={set('email')} />
                                <Input label="Username" required icon={IconId} placeholder="ramesh_parent" value={form.username} onChange={set('username')} />
                                <Input label="Temporary Password" required icon={IconLock} type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px' }}>Personal Details</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Input label="Phone Number" icon={IconPhone} type="tel" placeholder="+91 9876543210" value={form.phone} onChange={set('phone')} />
                            <Select label="Relation to Child" value={form.relation} onChange={set('relation')}>
                                <option value="">Select Relation</option>
                                <option>Father</option>
                                <option>Mother</option>
                                <option>Uncle</option>
                                <option>Aunt</option>
                                <option>Grandparent</option>
                                <option>Legal Guardian</option>
                                <option>Other</option>
                            </Select>

                            {/* Show custom relation input when "Other" is selected */}
                            {form.relation === 'Other' && (
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                                            Please specify the relation <span style={{ color: '#ef4444' }}>*</span>
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Step-father, Elder Brother, Family Friend..."
                                                value={form.custom_relation || ''}
                                                onChange={e => setForm(p => ({ ...p, custom_relation: e.target.value }))}
                                                autoFocus
                                                style={{
                                                    width: '100%', padding: '10px 14px 10px 14px',
                                                    borderRadius: 10, border: '1.5px solid #ec4899',
                                                    fontSize: 14, color: '#1f2937', background: '#fff5f7',
                                                    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                                                    transition: 'border-color 0.15s, background 0.15s'
                                                }}
                                            />
                                        </div>
                                        <p style={{ fontSize: 11, color: '#ec4899', margin: 0 }}>
                                            Describe the specific relationship to the child.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div style={{ gridColumn: '1 / -1' }}>
                                <Input label="Occupation" icon={IconUser} placeholder="e.g. Engineer, Teacher, Business" value={form.occupation} onChange={set('occupation')} />
                            </div>
                        </div>
                    </div>


                    {/* Link to Student Section */}
                    <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1.5px solid #fce7f3' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>Link to Child</p>
                        <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 16px' }}>Search and select the student this parent belongs to</p>
                        <StudentPicker
                            value={form.student_id}
                            onChange={(id, name, roll) => setForm(p => ({ ...p, student_id: id, student_name: name, student_roll: roll }))}
                        />
                    </div>

                    {/* Info banner */}
                    <div style={{ background: '#f0f9ff', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#0369a1' }}>
                        💡 The parent will be prompted to change their password on first login. A welcome email will be sent to the provided address.
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button type="button" onClick={() => navigate(-1)} style={{ flex: 1, padding: '14px', borderRadius: 14, border: '2px solid #e5e7eb', background: 'white', fontWeight: 700, cursor: 'pointer', color: '#6b7280', fontSize: 15 }}>
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting || success} style={{
                            flex: 2, padding: '14px', borderRadius: 14, border: 'none',
                            background: 'linear-gradient(135deg, #ec4899, #db2777)',
                            color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 15,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            boxShadow: '0 8px 20px rgba(236,72,153,0.35)', opacity: isSubmitting ? 0.7 : 1
                        }}>
                            {isSubmitting ? <IconLoader2 size={20} className="animate-spin" /> : <IconUserPlus size={20} />}
                            {isSubmitting ? 'Creating...' : 'Create Parent Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateParent;
