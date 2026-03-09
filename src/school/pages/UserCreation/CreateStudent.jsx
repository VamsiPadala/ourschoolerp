import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/lib/api-client';
import {
    IconArrowLeft, IconUserPlus, IconLoader2, IconCheck, IconChevronDown,
    IconUser, IconMail, IconPhone, IconCalendar, IconMapPin, IconUpload,
    IconSchool, IconHeartHandshake, IconBuildingBank, IconNotes,
    IconAlertCircle, IconFileText, IconBus, IconBuildingCommunity
} from '@tabler/icons-react';

// ─── Reusable Field Components ──────────────────────────────────────────────
const Input = ({ label, required, icon: Icon, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
            {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
        </label>
        <div style={{ position: 'relative' }}>
            {Icon && <Icon size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />}
            <input {...props} style={{
                width: '100%', padding: `10px ${Icon ? '14px 10px 36px' : '14px'}`,
                paddingLeft: Icon ? 36 : 14,
                borderRadius: 10, border: '1.5px solid #e5e7eb',
                fontSize: 14, color: '#1f2937', background: '#f9fafb',
                outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit'
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

const Textarea = ({ label, ...props }) => (
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

const SectionHeader = ({ icon: Icon, title, color = '#6366f1', bg = '#eef2ff' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '2px solid #f3f4f6' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={20} color={color} />
        </div>
        <h3 style={{ fontWeight: 700, fontSize: 17, color: '#1e1b4b', margin: 0 }}>{title}</h3>
    </div>
);

const Card = ({ children, style }) => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: '28px 24px', border: '1px solid #f3f4f6', ...style }}>
        {children}
    </div>
);

const Grid = ({ cols = 3, children }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
        {children}
    </div>
);

// ─── Photo Upload Component ──────────────────────────────────────────────────
const PhotoUpload = ({ label, value, onChange }) => {
    const ref = useRef();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</label>
            <div
                onClick={() => ref.current.click()}
                style={{
                    border: '2px dashed #d1d5db', borderRadius: 12, padding: '20px 16px',
                    cursor: 'pointer', textAlign: 'center', background: '#fafafa',
                    transition: 'border-color 0.2s, background 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.background = '#f5f3ff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.background = '#fafafa'; }}
            >
                {value ? (
                    <img src={URL.createObjectURL(value)} alt="preview" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 8px' }} />
                ) : (
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        <IconUpload size={22} color="#6366f1" />
                    </div>
                )}
                <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Click to upload photo<br /><span style={{ color: '#9ca3af' }}>JPG, PNG, SVG (max 4MB)</span></p>
            </div>
            <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => onChange(e.target.files[0])} />
        </div>
    );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const CreateStudent = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Personal Info
    const [personal, setPersonal] = useState({
        name: '', email: '', username: '', password: '',
        roll_number: '', admission_number: '', gender: '',
        dob: '', blood_group: '', religion: '', caste: '',
        mobile: '', admission_date: '', class_name: '', section: '',
        nationality: '', mother_tongue: '', aadhar_number: '', photo: null
    });

    // Father Info
    const [father, setFather] = useState({
        name: '', phone: '', email: '', occupation: '', income: '', education: '', photo: null
    });

    // Mother Info
    const [mother, setMother] = useState({
        name: '', phone: '', email: '', occupation: '', income: '', education: '', photo: null
    });

    // Guardian
    const [guardian, setGuardian] = useState({
        name: '', phone: '', email: '', relation: '', occupation: '', photo: null
    });

    // Address
    const [address, setAddress] = useState({
        current_address: '', permanent_address: '', city: '', state: '', pincode: '', country: 'India'
    });

    // Transport
    const [transport, setTransport] = useState({
        use_transport: '', route: '', pickup_point: '', vehicle_number: ''
    });

    // Hostel
    const [hostel, setHostel] = useState({
        use_hostel: '', hostel_name: '', room_number: '', room_type: ''
    });

    // Medical
    const [medical, setMedical] = useState({
        medical_condition: '', allergies: '', medication: '', height: '', weight: ''
    });

    // Previous School
    const [previous, setPrevious] = useState({
        school_name: '', class: '', year: '', reason_leaving: '', tc_number: ''
    });

    // Other
    const [other, setOther] = useState({
        extra_curricular: '', achievements: '', remarks: ''
    });

    const set = (setter) => (field) => (e) => setter(prev => ({ ...prev, [field]: e.target.value }));
    const setPhoto = (setter) => (file) => setter(prev => ({ ...prev, photo: file }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            const payload = {
                name: personal.name,
                email: personal.email,
                username: personal.username,
                password: personal.password,
                role: 'student',
                // Flatten all extra info for backend
                roll_number: personal.roll_number,
                admission_number: personal.admission_number,
                gender: personal.gender,
                dob: personal.dob,
                blood_group: personal.blood_group,
                class_name: personal.class_name,
                section: personal.section,
                mobile: personal.mobile,
            };
            await api.post('/users/create', payload);
            setSuccess(true);
            setTimeout(() => navigate('/school/settings/users'), 2000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to create student. Please check the details and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%)', paddingBottom: 60 }}>
            {/* Top Bar */}
            <div style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f3f4f6', border: 'none', cursor: 'pointer', color: '#6b7280', fontWeight: 600, fontSize: 14, padding: '8px 14px', borderRadius: 10 }}>
                        <IconArrowLeft size={16} /> Back
                    </button>
                    <div>
                        <h1 style={{ fontWeight: 800, fontSize: 20, color: '#1e1b4b', margin: 0 }}>Enroll New Student</h1>
                        <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Fill in all sections to complete student registration</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" onClick={() => navigate(-1)} style={{ padding: '10px 24px', borderRadius: 10, border: '1.5px solid #e5e7eb', background: 'white', fontWeight: 600, cursor: 'pointer', color: '#6b7280', fontSize: 14 }}>
                        Cancel
                    </button>
                    <button form="student-form" type="submit" disabled={isSubmitting || success} style={{
                        padding: '10px 28px', borderRadius: 10, border: 'none',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14,
                        display: 'flex', alignItems: 'center', gap: 8,
                        boxShadow: '0 8px 20px rgba(99,102,241,0.35)', opacity: isSubmitting ? 0.7 : 1
                    }}>
                        {isSubmitting ? <IconLoader2 size={18} className="animate-spin" /> : <IconUserPlus size={18} />}
                        {isSubmitting ? 'Saving...' : 'Save Student'}
                    </button>
                </div>
            </div>

            <form id="student-form" onSubmit={handleSubmit} style={{ maxWidth: 1100, margin: '32px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Success / Error */}
                {success && (
                    <div style={{ background: '#d1fae5', border: '1.5px solid #34d399', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, color: '#065f46', fontWeight: 600 }}>
                        <IconCheck size={22} /> Student enrolled successfully! Redirecting...
                    </div>
                )}
                {error && (
                    <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, color: '#b91c1c' }}>
                        <IconAlertCircle size={22} /> {error}
                    </div>
                )}

                {/* ── 1. Personal Information ── */}
                <Card>
                    <SectionHeader icon={IconUser} title="Personal Information" color="#6366f1" bg="#eef2ff" />
                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24 }}>
                        <PhotoUpload label="Student Photo" value={personal.photo} onChange={(file) => setPersonal(p => ({ ...p, photo: file }))} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <Grid cols={3}>
                                <Input label="Full Name" required icon={IconUser} placeholder="e.g. Ravi Kumar" value={personal.name} onChange={set(setPersonal)('name')} />
                                <Input label="Admission Number" icon={IconNotes} placeholder="e.g. ADM-2024-001" value={personal.admission_number} onChange={set(setPersonal)('admission_number')} />
                                <Input label="Roll Number" icon={IconNotes} placeholder="e.g. 45" value={personal.roll_number} onChange={set(setPersonal)('roll_number')} />
                            </Grid>
                            <Grid cols={3}>
                                <Select label="Class / Grade" required value={personal.class_name} onChange={set(setPersonal)('class_name')}>
                                    <option value="">Select Class</option>
                                    {['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(c => <option key={c}>{c}</option>)}
                                </Select>
                                <Select label="Section" value={personal.section} onChange={set(setPersonal)('section')}>
                                    <option value="">Select Section</option>
                                    {['A', 'B', 'C', 'D', 'E'].map(s => <option key={s}>{s}</option>)}
                                </Select>
                                <Select label="Gender" required value={personal.gender} onChange={set(setPersonal)('gender')}>
                                    <option value="">Select Gender</option>
                                    <option>Male</option><option>Female</option><option>Other</option>
                                </Select>
                            </Grid>
                            <Grid cols={3}>
                                <Input label="Date of Birth" type="date" icon={IconCalendar} value={personal.dob} onChange={set(setPersonal)('dob')} />
                                <Input label="Admission Date" type="date" icon={IconCalendar} value={personal.admission_date} onChange={set(setPersonal)('admission_date')} />
                                <Select label="Blood Group" value={personal.blood_group} onChange={set(setPersonal)('blood_group')}>
                                    <option value="">Select Blood Group</option>
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <option key={b}>{b}</option>)}
                                </Select>
                            </Grid>
                        </div>
                    </div>

                    <div style={{ height: 20 }} />
                    <Grid cols={4}>
                        <Input label="Mobile Number" icon={IconPhone} placeholder="+91 9876543210" value={personal.mobile} onChange={set(setPersonal)('mobile')} />
                        <Input label="Email Address" required icon={IconMail} type="email" placeholder="student@school.com" value={personal.email} onChange={set(setPersonal)('email')} />
                        <Input label="Username" required icon={IconUser} placeholder="ravi_kumar" value={personal.username} onChange={set(setPersonal)('username')} />
                        <Input label="Temp Password" required type="password" placeholder="••••••••" value={personal.password} onChange={set(setPersonal)('password')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={4}>
                        <Input label="Religion" placeholder="e.g. Hindu" value={personal.religion} onChange={set(setPersonal)('religion')} />
                        <Input label="Caste" placeholder="Optional" value={personal.caste} onChange={set(setPersonal)('caste')} />
                        <Input label="Nationality" placeholder="e.g. Indian" value={personal.nationality} onChange={set(setPersonal)('nationality')} />
                        <Input label="Mother Tongue" placeholder="e.g. Telugu" value={personal.mother_tongue} onChange={set(setPersonal)('mother_tongue')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={2}>
                        <Input label="Aadhar Number" placeholder="xxxx xxxx xxxx" value={personal.aadhar_number} onChange={set(setPersonal)('aadhar_number')} />
                    </Grid>
                </Card>

                {/* ── 2. Parents & Guardian ── */}
                <Card>
                    <SectionHeader icon={IconHeartHandshake} title="Parents & Guardian Information" color="#ec4899" bg="#fce7f3" />

                    {/* Father */}
                    <div style={{ marginBottom: 24 }}>
                        <p style={{ fontWeight: 700, fontSize: 14, color: '#374151', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '2px 10px', borderRadius: 20, fontSize: 12 }}>Father's Info</span>
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 20, alignItems: 'start' }}>
                            <PhotoUpload label="Father's Photo" value={father.photo} onChange={setPhoto(setFather)} />
                            <Grid cols={3}>
                                <Input label="Father's Name" icon={IconUser} placeholder="Full name" value={father.name} onChange={set(setFather)('name')} />
                                <Input label="Phone" icon={IconPhone} placeholder="+91 9876543210" value={father.phone} onChange={set(setFather)('phone')} />
                                <Input label="Email" icon={IconMail} type="email" placeholder="father@email.com" value={father.email} onChange={set(setFather)('email')} />
                                <Input label="Occupation" placeholder="e.g. Engineer" value={father.occupation} onChange={set(setFather)('occupation')} />
                                <Input label="Annual Income" placeholder="e.g. 5,00,000" value={father.income} onChange={set(setFather)('income')} />
                                <Input label="Qualification" placeholder="e.g. B.Tech" value={father.education} onChange={set(setFather)('education')} />
                            </Grid>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px dashed #e5e7eb', height: 1, marginBottom: 24 }} />

                    {/* Mother */}
                    <div style={{ marginBottom: 24 }}>
                        <p style={{ fontWeight: 700, fontSize: 14, color: '#374151', marginBottom: 14 }}>
                            <span style={{ background: '#fce7f3', color: '#be185d', padding: '2px 10px', borderRadius: 20, fontSize: 12 }}>Mother's Info</span>
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 20, alignItems: 'start' }}>
                            <PhotoUpload label="Mother's Photo" value={mother.photo} onChange={setPhoto(setMother)} />
                            <Grid cols={3}>
                                <Input label="Mother's Name" icon={IconUser} placeholder="Full name" value={mother.name} onChange={set(setMother)('name')} />
                                <Input label="Phone" icon={IconPhone} placeholder="+91 9876543210" value={mother.phone} onChange={set(setMother)('phone')} />
                                <Input label="Email" icon={IconMail} type="email" placeholder="mother@email.com" value={mother.email} onChange={set(setMother)('email')} />
                                <Input label="Occupation" placeholder="e.g. Teacher" value={mother.occupation} onChange={set(setMother)('occupation')} />
                                <Input label="Annual Income" placeholder="e.g. 3,00,000" value={mother.income} onChange={set(setMother)('income')} />
                                <Input label="Qualification" placeholder="e.g. M.A." value={mother.education} onChange={set(setMother)('education')} />
                            </Grid>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px dashed #e5e7eb', height: 1, marginBottom: 24 }} />

                    {/* Guardian */}
                    <div>
                        <p style={{ fontWeight: 700, fontSize: 14, color: '#374151', marginBottom: 14 }}>
                            <span style={{ background: '#f3e8ff', color: '#7e22ce', padding: '2px 10px', borderRadius: 20, fontSize: 12 }}>Guardian Details (if different)</span>
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 20, alignItems: 'start' }}>
                            <PhotoUpload label="Guardian Photo" value={guardian.photo} onChange={setPhoto(setGuardian)} />
                            <Grid cols={3}>
                                <Input label="Guardian Name" icon={IconUser} placeholder="Full name" value={guardian.name} onChange={set(setGuardian)('name')} />
                                <Input label="Phone" icon={IconPhone} placeholder="+91 9876543210" value={guardian.phone} onChange={set(setGuardian)('phone')} />
                                <Input label="Email" icon={IconMail} type="email" placeholder="guardian@email.com" value={guardian.email} onChange={set(setGuardian)('email')} />
                                <Input label="Relation to Student" placeholder="e.g. Uncle" value={guardian.relation} onChange={set(setGuardian)('relation')} />
                                <Input label="Occupation" placeholder="e.g. Doctor" value={guardian.occupation} onChange={set(setGuardian)('occupation')} />
                            </Grid>
                        </div>
                    </div>
                </Card>

                {/* ── 3. Address ── */}
                <Card>
                    <SectionHeader icon={IconMapPin} title="Address" color="#10b981" bg="#d1fae5" />
                    <Grid cols={2}>
                        <Textarea label="Current Address" placeholder="House No., Street, Area..." value={address.current_address} onChange={set(setAddress)('current_address')} />
                        <Textarea label="Permanent Address" placeholder="Same as current or enter new..." value={address.permanent_address} onChange={set(setAddress)('permanent_address')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={4}>
                        <Input label="City" placeholder="e.g. Hyderabad" value={address.city} onChange={set(setAddress)('city')} />
                        <Input label="State" placeholder="e.g. Telangana" value={address.state} onChange={set(setAddress)('state')} />
                        <Input label="Pincode" placeholder="e.g. 500001" value={address.pincode} onChange={set(setAddress)('pincode')} />
                        <Input label="Country" value={address.country} onChange={set(setAddress)('country')} />
                    </Grid>
                </Card>

                {/* ── 4. Transport & Hostel side by side ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <Card>
                        <SectionHeader icon={IconBus} title="Transport Information" color="#f59e0b" bg="#fef3c7" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <Select label="Use School Transport?" value={transport.use_transport} onChange={set(setTransport)('use_transport')}>
                                <option value="">Select</option>
                                <option>Yes</option><option>No</option>
                            </Select>
                            <Input label="Route Name" placeholder="e.g. Route 3 - Gachibowli" value={transport.route} onChange={set(setTransport)('route')} />
                            <Input label="Pickup Point" placeholder="e.g. Gachibowli Signal" value={transport.pickup_point} onChange={set(setTransport)('pickup_point')} />
                            <Input label="Vehicle Number" placeholder="e.g. TS-09-XY-1234" value={transport.vehicle_number} onChange={set(setTransport)('vehicle_number')} />
                        </div>
                    </Card>
                    <Card>
                        <SectionHeader icon={IconBuildingCommunity} title="Hostel Information" color="#8b5cf6" bg="#f3e8ff" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <Select label="Stays in Hostel?" value={hostel.use_hostel} onChange={set(setHostel)('use_hostel')}>
                                <option value="">Select</option>
                                <option>Yes</option><option>No</option>
                            </Select>
                            <Input label="Hostel Name" placeholder="e.g. Boys Hostel A" value={hostel.hostel_name} onChange={set(setHostel)('hostel_name')} />
                            <Input label="Room Number" placeholder="e.g. B-204" value={hostel.room_number} onChange={set(setHostel)('room_number')} />
                            <Select label="Room Type" value={hostel.room_type} onChange={set(setHostel)('room_type')}>
                                <option value="">Select Type</option>
                                <option>Single</option><option>Double</option><option>Triple</option>
                            </Select>
                        </div>
                    </Card>
                </div>

                {/* ── 5. Medical History ── */}
                <Card>
                    <SectionHeader icon={IconAlertCircle} title="Medical History" color="#ef4444" bg="#fee2e2" />
                    <Grid cols={3}>
                        <Input label="Height (cm)" placeholder="e.g. 145" value={medical.height} onChange={set(setMedical)('height')} />
                        <Input label="Weight (kg)" placeholder="e.g. 42" value={medical.weight} onChange={set(setMedical)('weight')} />
                        <Input label="Allergies" placeholder="e.g. Peanuts, Dust" value={medical.allergies} onChange={set(setMedical)('allergies')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={2}>
                        <Textarea label="Medical Condition / Disability" placeholder="Any chronic illness or physical disability..." value={medical.medical_condition} onChange={set(setMedical)('medical_condition')} />
                        <Textarea label="Current Medication" placeholder="Name and dosage of any regular medication..." value={medical.medication} onChange={set(setMedical)('medication')} />
                    </Grid>
                </Card>

                {/* ── 6. Previous School Details ── */}
                <Card>
                    <SectionHeader icon={IconSchool} title="Previous School Details" color="#0ea5e9" bg="#e0f2fe" />
                    <Grid cols={3}>
                        <Input label="Previous School Name" placeholder="e.g. ABC Public School" value={previous.school_name} onChange={set(setPrevious)('school_name')} />
                        <Input label="Class Studied" placeholder="e.g. Class 5" value={previous.class} onChange={set(setPrevious)('class')} />
                        <Input label="Year of Passing" type="number" placeholder="e.g. 2023" value={previous.year} onChange={set(setPrevious)('year')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Grid cols={2}>
                        <Input label="TC Number" placeholder="Transfer Certificate Number" value={previous.tc_number} onChange={set(setPrevious)('tc_number')} />
                        <Input label="Reason for Leaving" placeholder="e.g. Relocated, Family reason" value={previous.reason_leaving} onChange={set(setPrevious)('reason_leaving')} />
                    </Grid>
                </Card>

                {/* ── 7. Documents ── */}
                <Card>
                    <SectionHeader icon={IconFileText} title="Documents" color="#6b7280" bg="#f3f4f6" />
                    <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Upload relevant documents (Birth Certificate, Aadhar, TC, etc.)</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                        {['Birth Certificate', 'Aadhar Card', 'Transfer Certificate', 'Previous Marksheet', 'Passport Photo'].map(doc => (
                            <div key={doc} style={{ border: '2px dashed #d1d5db', borderRadius: 12, padding: '16px', cursor: 'pointer', background: '#fafafa', textAlign: 'center' }}>
                                <IconUpload size={24} color="#9ca3af" style={{ marginBottom: 8 }} />
                                <p style={{ fontSize: 12, fontWeight: 600, color: '#374151', margin: 0 }}>{doc}</p>
                                <p style={{ fontSize: 11, color: '#9ca3af', margin: '4px 0 0' }}>PDF, JPG, PNG (max 4MB)</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ── 8. Other Details ── */}
                <Card>
                    <SectionHeader icon={IconBuildingBank} title="Other Details" color="#7c3aed" bg="#ede9fe" />
                    <Grid cols={2}>
                        <Textarea label="Extra-Curricular Activities" placeholder="Sports, debates, music, arts..." value={other.extra_curricular} onChange={set(setOther)('extra_curricular')} />
                        <Textarea label="Achievements / Awards" placeholder="Academic or sports achievements..." value={other.achievements} onChange={set(setOther)('achievements')} />
                    </Grid>
                    <div style={{ height: 16 }} />
                    <Textarea label="Additional Remarks" placeholder="Any other information about the student..." value={other.remarks} onChange={set(setOther)('remarks')} />
                </Card>

                {/* Bottom Submit */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 8 }}>
                    <button type="button" onClick={() => navigate(-1)} style={{ padding: '13px 32px', borderRadius: 12, border: '1.5px solid #e5e7eb', background: 'white', fontWeight: 700, cursor: 'pointer', color: '#6b7280', fontSize: 15 }}>
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting || success} style={{
                        padding: '13px 40px', borderRadius: 12, border: 'none',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 15,
                        display: 'flex', alignItems: 'center', gap: 10,
                        boxShadow: '0 8px 20px rgba(99,102,241,0.35)', opacity: isSubmitting ? 0.7 : 1
                    }}>
                        {isSubmitting ? <IconLoader2 size={20} className="animate-spin" /> : <IconUserPlus size={20} />}
                        {isSubmitting ? 'Saving Student...' : 'Enroll Student'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateStudent;
