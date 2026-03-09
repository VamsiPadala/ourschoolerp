import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/lib/api-client';
import {
    IconArrowLeft, IconUserPlus, IconLoader2, IconCheck, IconChevronDown,
    IconUser, IconSearch, IconX, IconAlertCircle, IconShield,
    IconCalendar, IconId, IconBuildingBank, IconNotes
} from '@tabler/icons-react';

// ─── Input ────────────────────────────────────────────────────────────────────
const Input = ({ label, required, icon: Icon, hint, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
        </label>
        <div style={{ position: 'relative' }}>
            {Icon && <Icon size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />}
            <input {...props} style={{
                width: '100%', padding: '10px 14px', paddingLeft: Icon ? 36 : 14,
                borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 14,
                color: '#1f2937', background: '#f9fafb', outline: 'none',
                boxSizing: 'border-box', fontFamily: 'inherit'
            }} />
        </div>
        {hint && <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>{hint}</p>}
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
                background: '#f9fafb', outline: 'none', appearance: 'none',
                boxSizing: 'border-box', fontFamily: 'inherit', cursor: 'pointer'
            }}>
                {children}
            </select>
            <IconChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
        </div>
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</label>
        <textarea {...props} rows={3} style={{
            width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb',
            fontSize: 14, color: '#1f2937', background: '#f9fafb', outline: 'none',
            resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.5
        }} />
    </div>
);

// ─── Teacher Search Picker ────────────────────────────────────────────────────
const TeacherPicker = ({ onChange }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const wrapperRef = useRef(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setIsOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        if (!query || query.length < 2) { setResults([]); return; }
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setIsLoading(true);
            try {
                const data = await api.get(`/users/?role=teacher&search=${encodeURIComponent(query)}&limit=10`);
                setResults(Array.isArray(data) ? data : data.items || []);
            } catch {
                try {
                    const data = await api.get(`/users/?limit=100`);
                    const list = Array.isArray(data) ? data : data.items || [];
                    const q = query.toLowerCase();
                    setResults(list.filter(u =>
                        u.role === 'teacher' &&
                        (u.name?.toLowerCase().includes(q) || u.employee_id?.toLowerCase?.()?.includes(q) || u.username?.toLowerCase().includes(q))
                    ).slice(0, 10));
                } catch { setResults([]); }
            } finally { setIsLoading(false); }
        }, 350);
    }, [query]);

    const handleSelect = (teacher) => {
        setSelected(teacher);
        setQuery('');
        setIsOpen(false);
        onChange(teacher);
    };

    const handleClear = () => { setSelected(null); onChange(null); };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }} ref={wrapperRef}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                Select Teacher to Appoint <span style={{ color: '#ef4444' }}>*</span>
            </label>

            {selected ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 12, border: '2px solid #0ea5e9', background: '#f0f9ff', boxSizing: 'border-box' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 18 }}>
                            {selected.name?.charAt(0) || 'T'}
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: 16, color: '#0c4a6e' }}>{selected.name}</div>
                            <div style={{ fontSize: 12, color: '#0369a1', display: 'flex', gap: 10, marginTop: 2 }}>
                                {selected.employee_id && <span>ID: <strong>{selected.employee_id}</strong></span>}
                                {selected.department && <span>• {selected.department}</span>}
                                {selected.subject && <span>• {selected.subject}</span>}
                                <span>• @{selected.username}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClear} type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0ea5e9', padding: 4, borderRadius: 6 }}>
                        <IconX size={18} />
                    </button>
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                    <IconSearch size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', zIndex: 1 }} />
                    <input
                        type="text" value={query}
                        onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
                        onFocus={() => setIsOpen(true)}
                        placeholder="Search teacher by name or employee ID..."
                        style={{ width: '100%', padding: '11px 14px 11px 36px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 14, color: '#1f2937', background: '#f9fafb', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                        onFocusCapture={e => e.target.style.borderColor = '#0ea5e9'}
                        onBlurCapture={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                    {isLoading && <IconLoader2 size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />}

                    {isOpen && query.length >= 2 && (
                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999, background: 'white', borderRadius: 12, border: '1.5px solid #e5e7eb', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', marginTop: 6, maxHeight: 300, overflowY: 'auto' }}>
                            {isLoading ? (
                                <div style={{ padding: '14px 16px', color: '#9ca3af', fontSize: 13 }}>Searching teachers...</div>
                            ) : results.length === 0 ? (
                                <div style={{ padding: '20px 16px', color: '#9ca3af', fontSize: 13, textAlign: 'center' }}>
                                    <IconUser size={24} style={{ opacity: 0.3, marginBottom: 6 }} /><br />
                                    No teachers found for "{query}"<br />
                                    <span style={{ fontSize: 11 }}>Make sure teachers are already created.</span>
                                </div>
                            ) : (
                                results.map((t, i) => (
                                    <div key={t.id || i} onClick={() => handleSelect(t)} style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < results.length - 1 ? '1px solid #f3f4f6' : 'none', transition: 'background 0.15s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                                            {t.name?.charAt(0) || 'T'}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 700, fontSize: 14, color: '#1f2937' }}>{t.name}</div>
                                            <div style={{ fontSize: 12, color: '#9ca3af', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                {t.employee_id && <span>ID: <strong>{t.employee_id}</strong></span>}
                                                {t.department && <span>• {t.department}</span>}
                                                {t.subject && <span>• {t.subject}</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
            <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>Type at least 2 characters to search existing teachers.</p>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CreatePrincipal = () => {
    const navigate = useNavigate();
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [appointment, setAppointment] = useState({
        effective_date: '', term_years: '', branch: '', order_number: '', remarks: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const set = (field) => (e) => setAppointment(p => ({ ...p, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTeacher) { setError('Please select a teacher to appoint as principal.'); return; }
        setIsSubmitting(true);
        setError('');
        try {
            await api.post('/users/appoint-principal', {
                teacher_id: selectedTeacher.id,
                effective_date: appointment.effective_date,
                term_years: appointment.term_years,
                branch: appointment.branch,
                order_number: appointment.order_number,
                remarks: appointment.remarks,
            });
            setSuccess(true);
            setTimeout(() => navigate('/school/settings/users'), 2500);
        } catch (err) {
            // fallback: role update endpoint
            try {
                await api.patch(`/users/${selectedTeacher.id}`, { role: 'principal', ...appointment });
                setSuccess(true);
                setTimeout(() => navigate('/school/settings/users'), 2500);
            } catch (err2) {
                setError(err2.response?.data?.detail || 'Failed to appoint principal. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)', paddingBottom: 60 }}>

            {/* Top Bar */}
            <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f3f4f6', border: 'none', cursor: 'pointer', color: '#6b7280', fontWeight: 600, fontSize: 14, padding: '8px 14px', borderRadius: 10 }}>
                        <IconArrowLeft size={16} /> Back
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconShield size={22} color="#0ea5e9" />
                        </div>
                        <div>
                            <h1 style={{ fontWeight: 800, fontSize: 20, color: '#1e1b4b', margin: 0 }}>Appoint Principal</h1>
                            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Select an existing teacher and promote them to Principal</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" onClick={() => navigate(-1)} style={{ padding: '10px 22px', borderRadius: 10, border: '1.5px solid #e5e7eb', background: 'white', fontWeight: 600, cursor: 'pointer', color: '#6b7280', fontSize: 14 }}>Cancel</button>
                    <button form="principal-form" type="submit" disabled={isSubmitting || success} style={{ padding: '10px 26px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 18px rgba(14,165,233,0.35)', opacity: isSubmitting ? 0.7 : 1 }}>
                        {isSubmitting ? <IconLoader2 size={18} className="animate-spin" /> : <IconShield size={18} />}
                        {isSubmitting ? 'Appointing...' : 'Appoint Principal'}
                    </button>
                </div>
            </div>

            <form id="principal-form" onSubmit={handleSubmit} style={{ maxWidth: 800, margin: '32px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Alerts */}
                {success && (
                    <div style={{ background: '#d1fae5', border: '1.5px solid #34d399', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, color: '#065f46', fontWeight: 600 }}>
                        <IconCheck size={22} /> Principal appointed successfully! Redirecting...
                    </div>
                )}
                {error && (
                    <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, color: '#b91c1c' }}>
                        <IconAlertCircle size={22} /> {error}
                    </div>
                )}

                {/* Info Banner */}
                <div style={{ background: 'white', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: '4px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconShield size={22} color="#0ea5e9" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#0c4a6e' }}>Appointment from Existing Teacher</div>
                        <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4, lineHeight: 1.6 }}>
                            Principals are appointed directly from qualified teachers already in the system. Search and select the teacher below, then fill in the appointment details. Their role will be updated to <strong>Principal</strong>.
                        </div>
                    </div>
                </div>

                {/* Teacher Search */}
                <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: '2px solid #f3f4f6' }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconUser size={20} color="#0ea5e9" />
                        </div>
                        <h3 style={{ fontWeight: 700, fontSize: 17, color: '#1e1b4b', margin: 0 }}>Select Teacher</h3>
                    </div>
                    <TeacherPicker onChange={setSelectedTeacher} />
                </div>

                {/* Appointment Details — only shown after teacher is selected */}
                {selectedTeacher && (
                    <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '2px solid #bae6fd', animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: '2px solid #f3f4f6' }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconId size={20} color="#0ea5e9" />
                            </div>
                            <h3 style={{ fontWeight: 700, fontSize: 17, color: '#1e1b4b', margin: 0 }}>Appointment Details</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Input label="Effective Date" required type="date" icon={IconCalendar} value={appointment.effective_date} onChange={set('effective_date')} hint="Date from which the principal role is effective." />
                            <Input label="Appointment Term (Years)" type="number" placeholder="e.g. 3" value={appointment.term_years} onChange={set('term_years')} hint="Leave blank for indefinite." />
                            <Input label="Branch / Campus" icon={IconBuildingBank} placeholder="e.g. Main Campus, Branch A" value={appointment.branch} onChange={set('branch')} />
                            <Input label="Appointment Order Number" icon={IconNotes} placeholder="e.g. ORD-2024-001" value={appointment.order_number} onChange={set('order_number')} hint="Reference number from the appointment letter." />
                        </div>
                        <div style={{ height: 16 }} />
                        <Textarea label="Remarks / Notes" placeholder="Any special instructions or notes about this appointment..." value={appointment.remarks} onChange={set('remarks')} />
                    </div>
                )}

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button type="button" onClick={() => navigate(-1)} style={{ padding: '13px 32px', borderRadius: 12, border: '1.5px solid #e5e7eb', background: 'white', fontWeight: 700, cursor: 'pointer', color: '#6b7280', fontSize: 15 }}>
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting || success || !selectedTeacher} style={{ padding: '13px 40px', borderRadius: 12, border: 'none', background: selectedTeacher ? 'linear-gradient(135deg, #0ea5e9, #0284c7)' : '#e5e7eb', color: selectedTeacher ? 'white' : '#9ca3af', fontWeight: 700, cursor: selectedTeacher ? 'pointer' : 'not-allowed', fontSize: 15, display: 'flex', alignItems: 'center', gap: 10, boxShadow: selectedTeacher ? '0 8px 20px rgba(14,165,233,0.35)' : 'none', opacity: isSubmitting ? 0.7 : 1 }}>
                        {isSubmitting ? <IconLoader2 size={20} className="animate-spin" /> : <IconShield size={20} />}
                        {isSubmitting ? 'Appointing...' : 'Appoint as Principal'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePrincipal;
