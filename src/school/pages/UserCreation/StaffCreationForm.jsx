import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/lib/api-client';
import {
    IconArrowLeft, IconUserPlus, IconLoader2, IconCheck, IconChevronDown,
    IconUser, IconMail, IconPhone, IconLock, IconId, IconCalendar,
    IconMapPin, IconBuildingBank, IconBus, IconBuildingCommunity,
    IconFileText, IconBrandLinkedin, IconBrandTwitter, IconBrandFacebook,
    IconBrandInstagram, IconAlertCircle, IconUpload, IconCamera,
    IconCurrencyRupee, IconLeaf, IconWorld
} from '@tabler/icons-react';

// ─── Base UI Components ───────────────────────────────────────────────────────
export const Input = ({ label, required, icon: Icon, hint, ...props }) => (
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
                outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit'
            }} />
        </div>
        {hint && <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>{hint}</p>}
    </div>
);

export const Select = ({ label, required, children, value, onChange }) => (
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

export const Textarea = ({ label, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</label>
        <textarea {...props} rows={3} style={{
            width: '100%', padding: '10px 14px', borderRadius: 10,
            border: '1.5px solid #e5e7eb', fontSize: 14, color: '#1f2937',
            background: '#f9fafb', outline: 'none', resize: 'vertical',
            boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.5
        }} />
    </div>
);

export const SectionCard = ({ icon: Icon, title, color, bg, children }) => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: '24px', border: '1px solid #f3f4f6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '2px solid #f3f4f6' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={color} />
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 17, color: '#1e1b4b', margin: 0 }}>{title}</h3>
        </div>
        {children}
    </div>
);

export const Grid = ({ cols = 3, children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>{children}</div>
);

// ─── Photo Upload ─────────────────────────────────────────────────────────────
export const PhotoUpload = ({ value, onChange, accentColor = '#6366f1', accentBg = '#eef2ff', borderColor = '#a5b4fc' }) => {
    const ref = useRef();
    const previewUrl = value ? URL.createObjectURL(value) : null;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div onClick={() => ref.current.click()} style={{
                width: 110, height: 110, borderRadius: '50%',
                background: previewUrl ? 'transparent' : accentBg,
                border: `3px dashed ${borderColor}`, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', transition: 'border-color 0.2s'
            }}
                onMouseEnter={e => e.currentTarget.style.borderColor = accentColor}
                onMouseLeave={e => e.currentTarget.style.borderColor = borderColor}
            >
                {previewUrl
                    ? <img src={previewUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <IconCamera size={30} color={accentColor} />
                }
            </div>
            <p style={{ fontSize: 11, color: '#9ca3af', margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
                Click to upload<br /><span>JPG, PNG (max 4MB)</span>
            </p>
            <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => e.target.files[0] && onChange(e.target.files[0])} />
        </div>
    );
};

// ─── Document Upload Row ──────────────────────────────────────────────────────
export const DocUpload = ({ label }) => {
    const ref = useRef();
    const [file, setFile] = useState(null);
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1.5px dashed #e5e7eb', borderRadius: 12, background: '#fafafa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconFileText size={18} color="#6b7280" />
                </div>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{file ? file.name : 'PDF, JPG, PNG (max 4MB)'}</div>
                </div>
            </div>
            <button type="button" onClick={() => ref.current.click()} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                borderRadius: 8, border: '1.5px solid #e5e7eb', background: 'white',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#374151'
            }}>
                <IconUpload size={14} /> Upload
            </button>
            <input ref={ref} type="file" style={{ display: 'none' }}
                onChange={e => e.target.files[0] && setFile(e.target.files[0])} />
        </div>
    );
};

// ─── Main Shared Staff Form ───────────────────────────────────────────────────
/**
 * @param {object} props
 * @param {string} props.role            - backend role string e.g. 'accountant'
 * @param {string} props.title           - Page title e.g. 'Add Accountant'
 * @param {string} props.subtitle        - Sub-description
 * @param {string} props.accentColor     - Primary color hex
 * @param {string} props.accentBg        - Light bg for icons
 * @param {string} props.borderColor     - Border color for photo
 * @param {React.FC} props.RoleIcon      - Tabler icon component
 * @param {string[]} props.extraDocuments - Additional doc labels beyond defaults
 * @param {React.ReactNode} props.roleSpecificSection - Extra JSX section for role-specific fields
 */
const StaffCreationForm = ({
    role, title, subtitle, accentColor, accentBg, borderColor, RoleIcon, extraDocuments = [], roleSpecificSection = null
}) => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [personal, setPersonal] = useState({
        name: '', dob: '', gender: '', blood_group: '', religion: '',
        marital_status: '', nationality: '', phone: '', email: '',
        emergency_contact: '', aadhar_number: ''
    });
    const [account, setAccount] = useState({ username: '', password: '' });
    const [professional, setProfessional] = useState({
        employee_id: '', department: '', designation: '', shift: '',
        qualification: '', experience_years: '', joining_date: '', contract_type: ''
    });
    const [payroll, setPayroll] = useState({
        epf_number: '', basic_salary: '', payment_type: '', pf_contribution: '', gratuity: ''
    });
    const [leaves, setLeaves] = useState({
        medical_leave: '', casual_leave: '', maternity_leave: '', sick_leave: ''
    });
    const [bank, setBank] = useState({
        account_name: '', account_number: '', bank_name: '', branch: '', ifsc_code: ''
    });
    const [address, setAddress] = useState({
        current: '', permanent: '', city: '', state: '', pincode: '', country: 'India'
    });
    const [transport, setTransport] = useState({ use_transport: '', route: '', pickup_point: '' });
    const [hostel, setHostel] = useState({ use_hostel: '', hostel_name: '', room_number: '' });
    const [social, setSocial] = useState({ linkedin: '', twitter: '', facebook: '', instagram: '', website: '' });

    const set = (setter) => (field) => (e) => setter(p => ({ ...p, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await api.post('/users/create', {
                name: personal.name, email: personal.email,
                username: account.username, password: account.password,
                role,
                phone: personal.phone,
                employee_id: professional.employee_id,
                designation: professional.designation,
                department: professional.department,
                joining_date: professional.joining_date,
            });
            setSuccess(true);
            setTimeout(() => navigate('/school/settings/users'), 2000);
        } catch (err) {
            setError(err.response?.data?.detail || `Failed to create ${role}. Please check the details.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const gradientBtn = `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`;

    return (
        <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${accentBg} 0%, #f9fafb 100%)`, paddingBottom: 60 }}>

            {/* Sticky Top Bar */}
            <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f3f4f6', border: 'none', cursor: 'pointer', color: '#6b7280', fontWeight: 600, fontSize: 14, padding: '8px 14px', borderRadius: 10 }}>
                        <IconArrowLeft size={16} /> Back
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <RoleIcon size={22} color={accentColor} />
                        </div>
                        <div>
                            <h1 style={{ fontWeight: 800, fontSize: 20, color: '#1e1b4b', margin: 0 }}>{title}</h1>
                            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{subtitle}</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" onClick={() => navigate(-1)} style={{ padding: '10px 22px', borderRadius: 10, border: '1.5px solid #e5e7eb', background: 'white', fontWeight: 600, cursor: 'pointer', color: '#6b7280', fontSize: 14 }}>Cancel</button>
                    <button form="staff-form" type="submit" disabled={isSubmitting || success} style={{ padding: '10px 26px', borderRadius: 10, border: 'none', background: gradientBtn, color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, boxShadow: `0 6px 18px ${accentColor}55`, opacity: isSubmitting ? 0.7 : 1 }}>
                        {isSubmitting ? <IconLoader2 size={18} className="animate-spin" /> : <IconUserPlus size={18} />}
                        {isSubmitting ? 'Saving...' : `Save ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                    </button>
                </div>
            </div>

            <form id="staff-form" onSubmit={handleSubmit} style={{ maxWidth: 1100, margin: '32px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Alerts */}
                {success && (<div style={{ background: '#d1fae5', border: '1.5px solid #34d399', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, color: '#065f46', fontWeight: 600 }}><IconCheck size={22} /> {title} added successfully! Redirecting...</div>)}
                {error && (<div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, color: '#b91c1c' }}><IconAlertCircle size={22} /> {error}</div>)}

                {/* ── 1. Personal Information ── */}
                <SectionCard icon={IconUser} title="Personal Information" color={accentColor} bg={accentBg}>
                    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24, marginBottom: 20 }}>
                        <PhotoUpload value={photo} onChange={setPhoto} accentColor={accentColor} accentBg={accentBg} borderColor={borderColor} />
                        <Grid cols={3}>
                            <Input label="Full Name" required icon={IconUser} placeholder="e.g. Arjun Mehta" value={personal.name} onChange={set(setPersonal)('name')} />
                            <Input label="Date of Birth" type="date" icon={IconCalendar} value={personal.dob} onChange={set(setPersonal)('dob')} />
                            <Select label="Gender" required value={personal.gender} onChange={set(setPersonal)('gender')}>
                                <option value="">Select Gender</option>
                                <option>Male</option><option>Female</option><option>Other</option>
                            </Select>
                            <Select label="Marital Status" value={personal.marital_status} onChange={set(setPersonal)('marital_status')}>
                                <option value="">Select Status</option>
                                <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                            </Select>
                            <Select label="Blood Group" value={personal.blood_group} onChange={set(setPersonal)('blood_group')}>
                                <option value="">Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <option key={b}>{b}</option>)}
                            </Select>
                            <Input label="Religion" placeholder="e.g. Hindu" value={personal.religion} onChange={set(setPersonal)('religion')} />
                        </Grid>
                    </div>
                    <Grid cols={4}>
                        <Input label="Mobile Number" required icon={IconPhone} placeholder="+91 9876543210" value={personal.phone} onChange={set(setPersonal)('phone')} />
                        <Input label="Email Address" required icon={IconMail} type="email" placeholder="staff@school.com" value={personal.email} onChange={set(setPersonal)('email')} />
                        <Input label="Emergency Contact" icon={IconPhone} placeholder="+91 9876543210" value={personal.emergency_contact} onChange={set(setPersonal)('emergency_contact')} />
                        <Input label="Nationality" placeholder="e.g. Indian" value={personal.nationality} onChange={set(setPersonal)('nationality')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={2}>
                        <Input label="Aadhar Number" placeholder="xxxx xxxx xxxx" value={personal.aadhar_number} onChange={set(setPersonal)('aadhar_number')} />
                    </Grid>
                </SectionCard>

                {/* ── 2. Login Credentials ── */}
                <SectionCard icon={IconLock} title="Login Credentials" color="#6366f1" bg="#eef2ff">
                    <Grid cols={2}>
                        <Input label="Username" required icon={IconId} placeholder="arjun_mehta" value={account.username} onChange={set(setAccount)('username')} />
                        <Input label="Temporary Password" required icon={IconLock} type="password" placeholder="••••••••" hint="Staff will be prompted to change on first login." value={account.password} onChange={set(setAccount)('password')} />
                    </Grid>
                </SectionCard>

                {/* ── 3. Role-Specific Professional Details (injected by parent) ── */}
                {roleSpecificSection}

                {/* ── 4. Job Info ── */}
                <SectionCard icon={RoleIcon} title="Job Information" color={accentColor} bg={accentBg}>
                    <Grid cols={4}>
                        <Input label="Employee ID" icon={IconId} placeholder="EMP-2024-01" value={professional.employee_id} onChange={set(setProfessional)('employee_id')} />
                        <Input label="Department" placeholder="e.g. Finance" value={professional.department} onChange={set(setProfessional)('department')} />
                        <Input label="Designation" placeholder="e.g. Senior Accountant" value={professional.designation} onChange={set(setProfessional)('designation')} />
                        <Select label="Shift" value={professional.shift} onChange={set(setProfessional)('shift')}>
                            <option value="">Select Shift</option>
                            <option>Morning</option><option>Afternoon</option><option>Evening</option><option>Full Day</option>
                        </Select>
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={4}>
                        <Input label="Highest Qualification" placeholder="e.g. B.Com, CA" value={professional.qualification} onChange={set(setProfessional)('qualification')} />
                        <Input label="Years of Experience" type="number" placeholder="e.g. 5" value={professional.experience_years} onChange={set(setProfessional)('experience_years')} />
                        <Input label="Date of Joining" type="date" icon={IconCalendar} value={professional.joining_date} onChange={set(setProfessional)('joining_date')} />
                        <Select label="Contract Type" value={professional.contract_type} onChange={set(setProfessional)('contract_type')}>
                            <option value="">Select Type</option>
                            <option>Permanent</option><option>Contractual</option><option>Part-time</option>
                        </Select>
                    </Grid>
                </SectionCard>

                {/* ── 5. Payroll ── */}
                <SectionCard icon={IconCurrencyRupee} title="Payroll" color="#10b981" bg="#d1fae5">
                    <Grid cols={3}>
                        <Input label="EPF / PF Number" placeholder="e.g. PF123456" value={payroll.epf_number} onChange={set(setPayroll)('epf_number')} />
                        <Input label="Basic Salary (₹)" type="number" icon={IconCurrencyRupee} placeholder="e.g. 35000" value={payroll.basic_salary} onChange={set(setPayroll)('basic_salary')} />
                        <Select label="Payment Type" value={payroll.payment_type} onChange={set(setPayroll)('payment_type')}>
                            <option value="">Select Type</option>
                            <option>Monthly</option><option>Weekly</option><option>Daily</option>
                        </Select>
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={2}>
                        <Input label="PF Contribution (%)" type="number" placeholder="e.g. 12" value={payroll.pf_contribution} onChange={set(setPayroll)('pf_contribution')} />
                        <Input label="Gratuity (₹)" type="number" placeholder="e.g. 3000" value={payroll.gratuity} onChange={set(setPayroll)('gratuity')} />
                    </Grid>
                </SectionCard>

                {/* ── 6. Leaves ── */}
                <SectionCard icon={IconLeaf} title="Leave Allocation" color="#8b5cf6" bg="#f3e8ff">
                    <Grid cols={4}>
                        <Input label="Medical Leave (days)" type="number" placeholder="12" value={leaves.medical_leave} onChange={set(setLeaves)('medical_leave')} />
                        <Input label="Casual Leave (days)" type="number" placeholder="10" value={leaves.casual_leave} onChange={set(setLeaves)('casual_leave')} />
                        <Input label="Maternity Leave (days)" type="number" placeholder="180" value={leaves.maternity_leave} onChange={set(setLeaves)('maternity_leave')} />
                        <Input label="Sick Leave (days)" type="number" placeholder="7" value={leaves.sick_leave} onChange={set(setLeaves)('sick_leave')} />
                    </Grid>
                </SectionCard>

                {/* ── 7. Bank Account ── */}
                <SectionCard icon={IconBuildingBank} title="Bank Account Detail" color="#ec4899" bg="#fce7f3">
                    <Grid cols={3}>
                        <Input label="Account Holder Name" icon={IconUser} placeholder="As on bank records" value={bank.account_name} onChange={set(setBank)('account_name')} />
                        <Input label="Account Number" placeholder="e.g. 1234567890123456" value={bank.account_number} onChange={set(setBank)('account_number')} />
                        <Input label="Bank Name" placeholder="e.g. State Bank of India" value={bank.bank_name} onChange={set(setBank)('bank_name')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={2}>
                        <Input label="Branch Name" placeholder="e.g. Hyderabad Main Branch" value={bank.branch} onChange={set(setBank)('branch')} />
                        <Input label="IFSC Code" placeholder="e.g. SBIN0001234" value={bank.ifsc_code} onChange={set(setBank)('ifsc_code')} />
                    </Grid>
                </SectionCard>

                {/* ── 8. Address ── */}
                <SectionCard icon={IconMapPin} title="Address" color="#0ea5e9" bg="#e0f2fe">
                    <Grid cols={2}>
                        <Textarea label="Current Address" placeholder="House No., Street, Area..." value={address.current} onChange={set(setAddress)('current')} />
                        <Textarea label="Permanent Address" placeholder="Same as current or permanent address..." value={address.permanent} onChange={set(setAddress)('permanent')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={4}>
                        <Input label="City" placeholder="e.g. Hyderabad" value={address.city} onChange={set(setAddress)('city')} />
                        <Input label="State" placeholder="e.g. Telangana" value={address.state} onChange={set(setAddress)('state')} />
                        <Input label="Pincode" placeholder="e.g. 500001" value={address.pincode} onChange={set(setAddress)('pincode')} />
                        <Input label="Country" value={address.country} onChange={set(setAddress)('country')} />
                    </Grid>
                </SectionCard>

                {/* ── 9. Transport & Hostel ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <SectionCard icon={IconBus} title="Transport Information" color="#f59e0b" bg="#fef3c7">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <Select label="Use School Transport?" value={transport.use_transport} onChange={set(setTransport)('use_transport')}>
                                <option value="">Select</option><option>Yes</option><option>No</option>
                            </Select>
                            <Input label="Route Name" placeholder="e.g. Route 3 - Gachibowli" value={transport.route} onChange={set(setTransport)('route')} />
                            <Input label="Pickup Point" placeholder="e.g. Gachibowli Signal" value={transport.pickup_point} onChange={set(setTransport)('pickup_point')} />
                        </div>
                    </SectionCard>
                    <SectionCard icon={IconBuildingCommunity} title="Hostel Information" color="#6366f1" bg="#eef2ff">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <Select label="Stays in Hostel?" value={hostel.use_hostel} onChange={set(setHostel)('use_hostel')}>
                                <option value="">Select</option><option>Yes</option><option>No</option>
                            </Select>
                            <Input label="Hostel Name" placeholder="e.g. Staff Quarter A" value={hostel.hostel_name} onChange={set(setHostel)('hostel_name')} />
                            <Input label="Room Number" placeholder="e.g. A-104" value={hostel.room_number} onChange={set(setHostel)('room_number')} />
                        </div>
                    </SectionCard>
                </div>

                {/* ── 10. Social Media ── */}
                <SectionCard icon={IconWorld} title="Social Media Links" color="#6b7280" bg="#f3f4f6">
                    <Grid cols={3}>
                        <Input label="LinkedIn" icon={IconBrandLinkedin} placeholder="https://linkedin.com/in/..." value={social.linkedin} onChange={set(setSocial)('linkedin')} />
                        <Input label="Twitter / X" icon={IconBrandTwitter} placeholder="https://twitter.com/..." value={social.twitter} onChange={set(setSocial)('twitter')} />
                        <Input label="Facebook" icon={IconBrandFacebook} placeholder="https://facebook.com/..." value={social.facebook} onChange={set(setSocial)('facebook')} />
                        <Input label="Instagram" icon={IconBrandInstagram} placeholder="https://instagram.com/..." value={social.instagram} onChange={set(setSocial)('instagram')} />
                        <Input label="Personal Website" icon={IconWorld} placeholder="https://yourwebsite.com" value={social.website} onChange={set(setSocial)('website')} />
                    </Grid>
                </SectionCard>

                {/* ── 11. Documents ── */}
                <SectionCard icon={IconFileText} title="Documents" color="#374151" bg="#f3f4f6">
                    <p style={{ fontSize: 13, color: '#9ca3af', margin: '0 0 16px' }}>Upload required documents (PDF, JPG, PNG — max 4MB each)</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <DocUpload label="Resume / CV" />
                        <DocUpload label="Educational Certificates" />
                        <DocUpload label="Aadhar Card" />
                        <DocUpload label="PAN Card" />
                        <DocUpload label="Experience Certificates" />
                        {extraDocuments.map(doc => <DocUpload key={doc} label={doc} />)}
                    </div>
                </SectionCard>

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button type="button" onClick={() => navigate(-1)} style={{ padding: '13px 32px', borderRadius: 12, border: '1.5px solid #e5e7eb', background: 'white', fontWeight: 700, cursor: 'pointer', color: '#6b7280', fontSize: 15 }}>Cancel</button>
                    <button type="submit" disabled={isSubmitting || success} style={{ padding: '13px 40px', borderRadius: 12, border: 'none', background: gradientBtn, color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', gap: 10, boxShadow: `0 8px 20px ${accentColor}44`, opacity: isSubmitting ? 0.7 : 1 }}>
                        {isSubmitting ? <IconLoader2 size={20} className="animate-spin" /> : <IconUserPlus size={20} />}
                        {isSubmitting ? 'Saving...' : `Add ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StaffCreationForm;
