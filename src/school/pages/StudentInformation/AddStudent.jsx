import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../../../context/StudentContext';
import { AcademicsContext } from '../../../context/AcademicsContext';
import StudentAddress from './sections/StudentAddress';
import ReferenceDetails from './sections/ReferenceDetails';
import StudentPageContainer from './components/StudentPageContainer';
import './AddStudent.css';
import './AddStudentV2.css';

// ── Sibling helper data ────────────────────────────────────────────────────
const CLASS_OPTIONS = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const SECTION_OPTIONS = ['A', 'B', 'C', 'D', 'E'];
const RELATION_OPTIONS = ['Brother', 'Sister', 'Twin Brother', 'Twin Sister', 'Cousin'];

// Mock student names by class+section (in real app, fetch from context)
const STUDENT_NAMES_BY_CLASS = {
    'Class 1-A': ['Arjun Sharma', 'Priya Nair', 'Ravi Kumar'],
    'Class 1-B': ['Sneha Patel', 'Karan Singh', 'Divya Rao'],
    'Class 2-A': ['Rohit Verma', 'Meena Pillai', 'Suresh Raj'],
    'Class 5-A': ['Aisha Khan', 'Vikram Nair', 'Anjali Roy'],
    'Class 10-A': ['Aaliyah Sharma', 'Deepak Kumar', 'Pooja Singh'],
};
const getStudentNames = (cls, sec) => STUDENT_NAMES_BY_CLASS[`${cls}-${sec}`] || ['— No students found —'];

// ── Default sibling entry ──────────────────────────────────────────────────
const emptysibling = () => ({ class: '', section: '', name: '', relation: '' });

const AddStudent = () => {
    const navigate = useNavigate();
    const { addStudent } = useContext(StudentContext);
    const { classes } = useContext(AcademicsContext);

    const [formData, setFormData] = useState({
        admissionNo: '', admissionDate: new Date().toISOString().split('T')[0],
        penNumber: '', childId: '', medium: 'english', rfId: '',
        class: '', section: '', rollNo: '', joinedClass: '', group: '',
        remarks: '', motherTongue: '', addAdmissionFee: false,
        firstName: '', lastName: '', idCardName: '', gender: '', bloodGroup: '',
        dob: '', religion: '', caste: '', subCaste: '',
        fatherName: '', fatherAadhaar: '', motherName: '', motherAadhaar: '',
        phone: '', alternatePhone: '', alternatePhone2: '', email: '',
        mole1: '', mole2: '', photo: null, photoPreview: null,
        address: '', village: '', state: 'Andhra Pradesh', country: 'India',
        aadhaarCardNumber: '', rationCardNumber: '', accountNo: '', bankName: '',
        ifscCode: '', branchName: '', studentType: '',
        referredBy: '', guardianName: '', guardianRelation: '', guardianPhone: '',
        referenceContact: '', referenceAddress: '', localGuardian: ''
    });

    const [siblings, setSiblings] = useState([emptysibling()]);
    const [errorsState, setErrorsState] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData(prev => ({ ...prev, photo: file, photoPreview: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    // ── Siblings helpers ────────────────────────────────────────────────────
    const updateSibling = (index, field, value) => {
        setSiblings(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            // Reset dependent fields when parent changes
            if (field === 'class') updated[index] = { ...updated[index], section: '', name: '' };
            if (field === 'section') updated[index] = { ...updated[index], name: '' };
            return updated;
        });
    };
    const addSibling = () => setSiblings(prev => [...prev, emptysibling()]);
    const removeSibling = (i) => setSiblings(prev => prev.filter((_, idx) => idx !== i));

    // ── Form Submit ────────────────────────────────────────────────────────
    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const errs = {};
        if (!formData.class) errs.class = 'Class is required';
        if (!formData.section) errs.section = 'Section is required';
        if (!formData.rollNo) errs.rollNo = 'Roll number is required';
        if (!formData.joinedClass) errs.joinedClass = 'Joined Class is required';
        if (!formData.fatherName) errs.fatherName = 'Father name is required';
        if (!formData.phone) errs.phone = 'Phone is required';
        setErrorsState(errs);
        if (Object.keys(errs).length > 0) { window.scrollTo({ top: 160, behavior: 'smooth' }); return; }
        setSubmitting(true);
        setTimeout(() => {
            addStudent({ ...formData, siblings, name: `${formData.firstName} ${formData.lastName}`.trim(), id: `STU${Math.floor(Math.random() * 100000)}` });
            setSubmitting(false);
            setSaved(true);
            setTimeout(() => navigate('/school/student-list'), 1100);
        }, 1000);
    };

    // ── Print handler ──────────────────────────────────────────────────────
    const handlePrint = () => window.print();

    return (
        <StudentPageContainer
            title="Add Student"
            breadcrumb={<><span>Student List</span> / <span className="current">Add Student</span></>}
            backTitle="Go back to Student List"
            showDashboard={true}
            pageClass="add-student-page"
        >
            <form onSubmit={handleSubmit} className="add-student-form" id="add-student-print-form">

                {/* ── SECTION 1: ADMISSION ──────────────────────────────────── */}
                <div className="asv2-section">
                    <div className="asv2-section-header">
                        <div className="asv2-section-icon" style={{ background: '#eef1fd', color: '#3d5ee1' }}>📋</div>
                        <div>
                            <h5>Admission Details</h5>
                            <span>Academic and admission information</span>
                        </div>
                    </div>

                    <div className="asv2-grid">
                        <div className="asv2-field">
                            <label>Admission No</label>
                            <input type="text" name="admissionNo" value={formData.admissionNo} onChange={handleChange} placeholder="ADM-2025-001" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Admission Date</label>
                            <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>PEN Number</label>
                            <input type="text" name="penNumber" value={formData.penNumber} onChange={handleChange} placeholder="Permanent Education Number" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Child ID</label>
                            <input type="text" name="childId" value={formData.childId} onChange={handleChange} placeholder="Unique Child ID" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Medium</label>
                            <select name="medium" value={formData.medium} onChange={handleChange} className="asv2-input">
                                <option value="english">English</option>
                                <option value="telugu">Telugu</option>
                                <option value="hindi">Hindi</option>
                            </select>
                        </div>
                        <div className="asv2-field">
                            <label>RF ID</label>
                            <input type="text" name="rfId" value={formData.rfId} onChange={handleChange} placeholder="RF ID Card No" className="asv2-input" />
                        </div>

                        {/* CLASS */}
                        <div className={`asv2-field ${errorsState.class ? 'asv2-has-error' : ''}`}>
                            <label>Class <span className="asv2-req">*</span></label>
                            <select name="class" value={formData.class} onChange={handleChange} className="asv2-input">
                                <option value="">Select Class</option>
                                {classes?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                {(!classes || classes.length === 0) && CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errorsState.class && <span className="asv2-error">{errorsState.class}</span>}
                        </div>

                        {/* SECTION */}
                        <div className={`asv2-field ${errorsState.section ? 'asv2-has-error' : ''}`}>
                            <label>Section <span className="asv2-req">*</span></label>
                            <select name="section" value={formData.section} onChange={handleChange} className="asv2-input">
                                <option value="">Select Section</option>
                                {SECTION_OPTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
                            </select>
                            {errorsState.section && <span className="asv2-error">{errorsState.section}</span>}
                        </div>

                        {/* ROLL NO */}
                        <div className={`asv2-field ${errorsState.rollNo ? 'asv2-has-error' : ''}`}>
                            <label>Roll No <span className="asv2-req">*</span></label>
                            <input type="number" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Class Roll Number" className="asv2-input" />
                            {errorsState.rollNo && <span className="asv2-error">{errorsState.rollNo}</span>}
                        </div>

                        {/* JOINED CLASS */}
                        <div className={`asv2-field ${errorsState.joinedClass ? 'asv2-has-error' : ''}`}>
                            <label>Joined Class <span className="asv2-req">*</span></label>
                            <select name="joinedClass" value={formData.joinedClass} onChange={handleChange} className="asv2-input">
                                <option value="">Select Class</option>
                                {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errorsState.joinedClass && <span className="asv2-error">{errorsState.joinedClass}</span>}
                        </div>

                        <div className="asv2-field">
                            <label>Group</label>
                            <select name="group" value={formData.group} onChange={handleChange} className="asv2-input">
                                <option value="">Select Group</option>
                                <option value="arts">Arts</option>
                                <option value="science">Science</option>
                                <option value="commerce">Commerce</option>
                            </select>
                        </div>
                        <div className="asv2-field">
                            <label>Mother Tongue</label>
                            <select name="motherTongue" value={formData.motherTongue} onChange={handleChange} className="asv2-input">
                                <option value="">Select Mother Tongue</option>
                                <option value="telugu">Telugu</option>
                                <option value="hindi">Hindi</option>
                                <option value="urdu">Urdu</option>
                                <option value="tamil">Tamil</option>
                                <option value="kannada">Kannada</option>
                            </select>
                        </div>

                        <div className="asv2-field asv2-full">
                            <label>Remarks</label>
                            <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Any additional notes about the student" className="asv2-input asv2-textarea" rows={2} />
                        </div>
                        <div className="asv2-field">
                            <label>Optional Subject</label>
                            <input type="text" className="asv2-input" disabled placeholder="Field is disabled - no input allowed" />
                        </div>
                        <div className="asv2-field asv2-full">
                            <label className="asv2-toggle-label">
                                <input type="checkbox" name="addAdmissionFee" checked={formData.addAdmissionFee} onChange={handleChange} className="asv2-toggle-inp" />
                                <span className="asv2-toggle-track"><span className="asv2-toggle-thumb" /></span>
                                <span>Add Admission Fee to Invoice</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 2: STUDENT PERSONAL DETAILS ──────────────── */}
                <div className="asv2-section">
                    <div className="asv2-section-header">
                        <div className="asv2-section-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>👤</div>
                        <div>
                            <h5>Student Personal Details</h5>
                            <span>Personal information about the student</span>
                        </div>
                    </div>

                    <div className="asv2-grid">
                        <div className="asv2-field">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>ID Card Name</label>
                            <input type="text" name="idCardName" value={formData.idCardName} onChange={handleChange} placeholder="Name as per ID card" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="asv2-input">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="asv2-field">
                            <label>Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="asv2-input">
                                <option value="">Select Blood Group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>
                        <div className="asv2-field">
                            <label>Date of Birth</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Religion</label>
                            <input type="text" name="religion" value={formData.religion} onChange={handleChange} placeholder="Enter religion" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Caste</label>
                            <select name="caste" value={formData.caste} onChange={handleChange} className="asv2-input">
                                <option value="">Select Caste</option>
                                {['OC', 'BC-A', 'BC-B', 'BC-C', 'BC-D', 'SC', 'ST'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="asv2-field">
                            <label>Sub Caste</label>
                            <input type="text" name="subCaste" value={formData.subCaste} onChange={handleChange} placeholder="Enter sub caste" className="asv2-input" />
                        </div>
                        <div className={`asv2-field ${errorsState.fatherName ? 'asv2-has-error' : ''}`}>
                            <label>Father Name <span className="asv2-req">*</span></label>
                            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Enter father's name" className="asv2-input" />
                            {errorsState.fatherName && <span className="asv2-error">{errorsState.fatherName}</span>}
                        </div>
                        <div className="asv2-field">
                            <label>Father Aadhaar</label>
                            <input type="text" name="fatherAadhaar" value={formData.fatherAadhaar} onChange={handleChange} placeholder="12-digit Aadhaar" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Mother Name</label>
                            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Enter mother's name" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Mother Aadhaar</label>
                            <input type="text" name="motherAadhaar" value={formData.motherAadhaar} onChange={handleChange} placeholder="12-digit Aadhaar" className="asv2-input" />
                        </div>
                        <div className={`asv2-field ${errorsState.phone ? 'asv2-has-error' : ''}`}>
                            <label>Phone <span className="asv2-req">*</span></label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit phone number" className="asv2-input" />
                            {errorsState.phone && <span className="asv2-error">{errorsState.phone}</span>}
                        </div>
                        <div className="asv2-field">
                            <label>WhatsApp Number</label>
                            <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} placeholder="WhatsApp number" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Alternate Phone</label>
                            <input type="tel" name="alternatePhone2" value={formData.alternatePhone2} onChange={handleChange} placeholder="Alternate number" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Mole 1 (Identify Mark)</label>
                            <input type="text" name="mole1" value={formData.mole1} onChange={handleChange} placeholder="First identify mark" className="asv2-input" />
                        </div>
                        <div className="asv2-field">
                            <label>Mole 2 (Identify Mark)</label>
                            <input type="text" name="mole2" value={formData.mole2} onChange={handleChange} placeholder="Second identify mark" className="asv2-input" />
                        </div>

                        {/* Photo upload */}
                        <div className="asv2-field asv2-full">
                            <label>Student Photo</label>
                            <div className="asv2-upload-box">
                                <input type="file" id="asv2-photo" accept="image/*" onChange={handlePhotoChange} className="asv2-file-inp" />
                                <label htmlFor="asv2-photo" className="asv2-upload-label">
                                    <span className="asv2-upload-icon">📷</span>
                                    <span>Click to upload photo or drag & drop</span>
                                    <span className="asv2-upload-hint">PNG, JPG up to 2MB</span>
                                </label>
                                {formData.photoPreview && (
                                    <div className="asv2-photo-preview">
                                        <img src={formData.photoPreview} alt="Preview" />
                                        <button type="button" className="asv2-remove-photo" onClick={() => setFormData(p => ({ ...p, photo: null, photoPreview: null }))}>✕</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 3: ADDRESS & BANK ─────────────────────────── */}
                <StudentAddress formData={formData} handleChange={handleChange} />

                {/* ── SECTION 4: REFERENCE DETAILS ─────────────────────── */}
                <ReferenceDetails formData={formData} handleChange={handleChange} />

                {/* ── SECTION 5: SIBLINGS ───────────────────────────────── */}
                <div className="asv2-section">
                    <div className="asv2-section-header">
                        <div className="asv2-section-icon" style={{ background: '#fff5e6', color: '#ff9f43' }}>👨‍👧‍👦</div>
                        <div>
                            <h5>Siblings Information</h5>
                            <span>Details of siblings studying in this school</span>
                        </div>
                        <button type="button" className="asv2-add-sib-btn" onClick={addSibling}>
                            + Add Sibling
                        </button>
                    </div>

                    {siblings.map((sib, idx) => {
                        const nameOptions = sib.class && sib.section
                            ? getStudentNames(sib.class, sib.section)
                            : [];
                        return (
                            <div key={idx} className="asv2-sibling-card">
                                <div className="asv2-sibling-card-header">
                                    <span className="asv2-sib-num">Sibling {idx + 1}</span>
                                    {siblings.length > 1 && (
                                        <button type="button" className="asv2-remove-sib" onClick={() => removeSibling(idx)}>✕ Remove</button>
                                    )}
                                </div>
                                <div className="asv2-grid asv2-sib-grid">
                                    {/* Class dropdown */}
                                    <div className="asv2-field">
                                        <label>Class</label>
                                        <select
                                            value={sib.class}
                                            onChange={e => updateSibling(idx, 'class', e.target.value)}
                                            className="asv2-input"
                                        >
                                            <option value="">Select Class</option>
                                            {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>

                                    {/* Section dropdown – enabled only when class selected */}
                                    <div className="asv2-field">
                                        <label>Section</label>
                                        <select
                                            value={sib.section}
                                            onChange={e => updateSibling(idx, 'section', e.target.value)}
                                            className="asv2-input"
                                            disabled={!sib.class}
                                        >
                                            <option value="">{sib.class ? 'Select Section' : '— Select class first —'}</option>
                                            {sib.class && SECTION_OPTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
                                        </select>
                                    </div>

                                    {/* Name dropdown – cascades from class+section */}
                                    <div className="asv2-field">
                                        <label>Sibling Name</label>
                                        <select
                                            value={sib.name}
                                            onChange={e => updateSibling(idx, 'name', e.target.value)}
                                            className="asv2-input"
                                            disabled={!sib.section}
                                        >
                                            <option value="">{sib.section ? 'Select Name' : '— Select section first —'}</option>
                                            {nameOptions.map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>

                                    {/* Relation dropdown */}
                                    <div className="asv2-field">
                                        <label>Relation</label>
                                        <select
                                            value={sib.relation}
                                            onChange={e => updateSibling(idx, 'relation', e.target.value)}
                                            className="asv2-input"
                                            disabled={!sib.name}
                                        >
                                            <option value="">{sib.name ? 'Select Relation' : '— Select name first —'}</option>
                                            {RELATION_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── FOOTER NOTE ───────────────────────────────────────── */}
                <div className="asv2-note" style={{ marginBottom: 80 }}>
                    <span>ℹ️</span>
                    <span><strong>Note:</strong> Create teacher, class, and section before creating a new student.</span>
                </div>

            </form>

            {/* ── STICKY BOTTOM BAR ─────────────────────────────────────── */}
            <div className="asv2-sticky-bar">
                <button type="button" className="asv2-btn asv2-btn-outline" onClick={() => navigate(-1)}>Cancel</button>
                <button type="button" className="asv2-btn asv2-btn-print" onClick={handlePrint}>🖨️ Print</button>
                <button
                    type="button"
                    className={`asv2-btn asv2-btn-primary ${submitting ? 'asv2-loading' : ''}`}
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? 'Saving...' : '+ Add Student'}
                </button>
            </div>

            {saved && <div className="asv2-saved-badge">✓ Saved!</div>}

            {/* ── PRINT PREVIEW OVERLAY ─────────────────────────────────── */}
            <div className="asv2-print-only">
                <div className="asv2-print-header">
                    <h2>Student Admission Form</h2>
                    <p>MindWhile School ERP &nbsp;|&nbsp; Academic Year 2024–2025</p>
                </div>
                <table className="asv2-print-table">
                    <tbody>
                        <tr><th colSpan={4} className="asv2-print-section-title">🎓 Admission Details</th></tr>
                        <tr><td>Admission No</td><td>{formData.admissionNo || '—'}</td><td>Admission Date</td><td>{formData.admissionDate || '—'}</td></tr>
                        <tr><td>PEN Number</td><td>{formData.penNumber || '—'}</td><td>Child ID</td><td>{formData.childId || '—'}</td></tr>
                        <tr><td>Medium</td><td>{formData.medium || '—'}</td><td>RF ID</td><td>{formData.rfId || '—'}</td></tr>
                        <tr><td>Class</td><td>{formData.class || '—'}</td><td>Section</td><td>{formData.section || '—'}</td></tr>
                        <tr><td>Roll No</td><td>{formData.rollNo || '—'}</td><td>Joined Class</td><td>{formData.joinedClass || '—'}</td></tr>
                        <tr><td>Group</td><td>{formData.group || '—'}</td><td>Mother Tongue</td><td>{formData.motherTongue || '—'}</td></tr>
                        <tr><td>Remarks</td><td colSpan={3}>{formData.remarks || '—'}</td></tr>

                        <tr><th colSpan={4} className="asv2-print-section-title">👤 Student Personal Details</th></tr>
                        <tr><td>First Name</td><td>{formData.firstName || '—'}</td><td>Last Name</td><td>{formData.lastName || '—'}</td></tr>
                        <tr><td>ID Card Name</td><td>{formData.idCardName || '—'}</td><td>Gender</td><td>{formData.gender || '—'}</td></tr>
                        <tr><td>Blood Group</td><td>{formData.bloodGroup || '—'}</td><td>Date of Birth</td><td>{formData.dob || '—'}</td></tr>
                        <tr><td>Religion</td><td>{formData.religion || '—'}</td><td>Caste</td><td>{formData.caste || '—'}</td></tr>
                        <tr><td>Sub Caste</td><td>{formData.subCaste || '—'}</td><td>Email</td><td>{formData.email || '—'}</td></tr>
                        <tr><td>Father Name</td><td>{formData.fatherName || '—'}</td><td>Father Aadhaar</td><td>{formData.fatherAadhaar || '—'}</td></tr>
                        <tr><td>Mother Name</td><td>{formData.motherName || '—'}</td><td>Mother Aadhaar</td><td>{formData.motherAadhaar || '—'}</td></tr>
                        <tr><td>Phone</td><td>{formData.phone || '—'}</td><td>WhatsApp</td><td>{formData.alternatePhone || '—'}</td></tr>
                        <tr><td>Alternate Phone</td><td>{formData.alternatePhone2 || '—'}</td><td>Mole 1</td><td>{formData.mole1 || '—'}</td></tr>
                        <tr><td>Mole 2</td><td colSpan={3}>{formData.mole2 || '—'}</td></tr>

                        <tr><th colSpan={4} className="asv2-print-section-title">📍 Address Details</th></tr>
                        <tr><td>Address</td><td colSpan={3}>{formData.address || '—'}</td></tr>
                        <tr><td>Village</td><td>{formData.village || '—'}</td><td>State</td><td>{formData.state || '—'}</td></tr>
                        <tr><td>Country</td><td>{formData.country || '—'}</td><td>Aadhaar No</td><td>{formData.aadhaarCardNumber || '—'}</td></tr>

                        <tr><th colSpan={4} className="asv2-print-section-title">👨‍👧‍👦 Siblings Details</th></tr>
                        {siblings.some(s => s.name) ? siblings.filter(s => s.name).map((s, i) => (
                            <tr key={i}>
                                <td>Sibling {i + 1}</td>
                                <td>{s.name}</td>
                                <td>{s.class} – {s.section}</td>
                                <td>{s.relation}</td>
                            </tr>
                        )) : <tr><td colSpan={4} style={{ textAlign: 'center', color: '#94a3b8' }}>No siblings added</td></tr>}
                    </tbody>
                </table>
                <div className="asv2-print-footer">
                    <div className="asv2-sig-box">Admission Officer Signature</div>
                    <div className="asv2-sig-box">Parent / Guardian Signature</div>
                </div>
            </div>
        </StudentPageContainer>
    );
};

export default AddStudent;
