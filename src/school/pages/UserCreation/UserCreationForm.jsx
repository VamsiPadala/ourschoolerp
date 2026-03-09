import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/lib/api-client';
import {
    IconArrowLeft, IconUserPlus, IconLoader2, IconCheck,
    IconMail, IconUser, IconLock, IconId, IconPhone
} from '@tabler/icons-react';

const UserCreationForm = ({ role, title, description, color, bg, extraFields = [] }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', email: '', username: '', password: '', role,
        ...Object.fromEntries(extraFields.map(f => [f.name, '']))
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const setValue = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await api.post('/users/create', form);
            setSuccess(true);
            setTimeout(() => navigate(-1), 2000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to create user. Please check the details and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)', padding: '40px 24px' }}>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontWeight: 600, fontSize: 14, marginBottom: 28 }}
                >
                    <IconArrowLeft size={18} /> Back to User Type Selection
                </button>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32, background: 'white', borderRadius: 20, padding: '24px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', borderLeft: `5px solid ${color}` }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconUserPlus size={28} color={color} />
                    </div>
                    <div>
                        <h2 style={{ fontWeight: 800, fontSize: 24, color: '#1e1b4b', margin: 0 }}>{title}</h2>
                        <p style={{ color: '#9ca3af', margin: '4px 0 0', fontSize: 14 }}>{description}</p>
                    </div>
                </div>

                {/* Success State */}
                {success && (
                    <div style={{ background: '#d1fae5', border: '1.5px solid #34d399', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, color: '#065f46', fontWeight: 600 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconCheck size={20} color="white" />
                        </div>
                        User created successfully! Redirecting...
                    </div>
                )}

                {/* Form Card */}
                <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: '32px 28px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Standard Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Field label="Full Name" icon={<IconUser size={18} />} required>
                                <input id="name" type="text" required placeholder="e.g. Jane Smith"
                                    value={form.name} onChange={e => setValue('name', e.target.value)}
                                    style={inputStyle} />
                            </Field>
                            <Field label="Email Address" icon={<IconMail size={18} />} required>
                                <input id="email" type="email" required placeholder="jane@school.com"
                                    value={form.email} onChange={e => setValue('email', e.target.value)}
                                    style={inputStyle} />
                            </Field>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Field label="Username" icon={<IconId size={18} />} required>
                                <input id="username" type="text" required placeholder="jane_smith"
                                    value={form.username} onChange={e => setValue('username', e.target.value)}
                                    style={inputStyle} />
                            </Field>
                            <Field label="Temporary Password" icon={<IconLock size={18} />} required>
                                <input id="password" type="password" required placeholder="••••••••"
                                    value={form.password} onChange={e => setValue('password', e.target.value)}
                                    style={inputStyle} />
                            </Field>
                        </div>

                        {/* Role-specific extra fields */}
                        {extraFields.length > 0 && (
                            <>
                                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 20 }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px' }}>
                                        Role-Specific Details
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        {extraFields.map(f => (
                                            <Field key={f.name} label={f.label} icon={<IconPhone size={18} />} required={f.required}>
                                                <input
                                                    type={f.type || 'text'}
                                                    placeholder={f.placeholder || ''}
                                                    required={f.required}
                                                    value={form[f.name]}
                                                    onChange={e => setValue(f.name, e.target.value)}
                                                    style={inputStyle}
                                                />
                                            </Field>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Error */}
                        {error && (
                            <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 10, padding: '12px 16px', color: '#b91c1c', fontSize: 14 }}>
                                {error}
                            </div>
                        )}

                        {/* Info callout */}
                        <div style={{ background: '#f0f9ff', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#0369a1' }}>
                            💡 The user will be prompted to change their password on first login. A welcome email will be sent to the provided address.
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                            <button type="button" onClick={() => navigate(-1)}
                                style={{ flex: 1, padding: '14px', borderRadius: 14, border: '2px solid #e5e7eb', background: 'white', fontWeight: 700, cursor: 'pointer', color: '#6b7280', fontSize: 15 }}>
                                Cancel
                            </button>
                            <button type="submit" disabled={isSubmitting || success}
                                style={{ flex: 2, padding: '14px', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${color}, ${color}dd)`, color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: `0 8px 20px ${color}40`, opacity: isSubmitting ? 0.7 : 1 }}>
                                {isSubmitting ? <IconLoader2 size={20} className="animate-spin" /> : <IconUserPlus size={20} />}
                                {isSubmitting ? 'Creating...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Field wrapper component
const Field = ({ label, icon, required, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
        </label>
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }}>
                {icon}
            </div>
            {React.cloneElement(children, { style: { ...inputStyle, paddingLeft: 40 } })}
        </div>
    </div>
);

const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb',
    fontSize: 14, color: '#1f2937', background: '#f9fafb', outline: 'none',
    transition: 'border-color 0.15s', boxSizing: 'border-box'
};

export default UserCreationForm;
