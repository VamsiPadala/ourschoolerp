import React, { useState } from 'react';
import {
    IconSearch,
    IconDeviceFloppy,
    IconCheck,
    IconCurrencyRupee
} from '@tabler/icons-react';
import './AssignFees.css'; // Leverage existing premium styles

const EditFee = () => {
    const [filters, setFilters] = useState({
        feeGroup: '',
        classId: '',
        sectionId: ''
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Dummy Data for Select Options
    const feeGroups = [
        { id: 1, name: 'Term 1 Fee' },
        { id: 2, name: 'Term 2 Fee' },
        { id: 3, name: 'Annual Fee' }
    ];

    const classes = [
        { id: 1, name: 'Class 1' },
        { id: 2, name: 'Class 2' },
        { id: 3, name: 'Class 3' }
    ];

    const sections = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' }
    ];

    // Dummy Data for Table
    const [studentsData, setStudentsData] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!filters.feeGroup || !filters.classId || !filters.sectionId) {
            alert("Please select all filters");
            return;
        }

        // Load dummy data
        setStudentsData([
            {
                id: 1,
                admissionNo: '1001',
                name: 'John Doe',
                isStaffChild: false,
                fees: {
                    tuitionFee: 5000,
                    transportFee: 1500,
                    libraryFee: 500,
                    concession: 0
                }
            },
            {
                id: 2,
                admissionNo: '1002',
                name: 'Jane Smith',
                isStaffChild: true,
                fees: {
                    tuitionFee: 5000,
                    transportFee: 0,
                    libraryFee: 500,
                    concession: 0
                }
            },
            {
                id: 3,
                admissionNo: '1003',
                name: 'Alice Johnson',
                isStaffChild: false,
                fees: {
                    tuitionFee: 5000,
                    transportFee: 1500,
                    libraryFee: 0,
                    concession: 0
                }
            }
        ]);
        setIsLoaded(true);
        setSuccessMessage('');
    };

    const handleFeeChange = (studentId, feeKey, value) => {
        setStudentsData(prevData =>
            prevData.map(student => {
                if (student.id === studentId) {
                    return {
                        ...student,
                        fees: {
                            ...student.fees,
                            [feeKey]: Number(value)
                        }
                    };
                }
                return student;
            })
        );
    };

    const calculateTotal = (fees) => {
        let sum = Object.entries(fees).reduce((acc, [key, val]) => {
            if (key !== 'concession') return acc + Number(val || 0);
            return acc;
        }, 0);
        return Math.max(0, sum - Number(fees.concession || 0));
    };

    const grandTotal = studentsData.reduce((acc, student) => acc + calculateTotal(student.fees), 0);

    const handleSave = () => {
        // Simulate save
        setSuccessMessage('Fees updated successfully!');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="af-page">
            <header className="af-header">
                <div>
                    <div className="af-title">Bulk Edit Fees</div>
                    <nav className="af-breadcrumb">
                        Finance / <span>Edit Fee</span>
                    </nav>
                </div>
                <div className="af-steps">
                    <div className={`af-step ${isLoaded ? 'af-step-done' : 'af-step-active'}`}>
                        <div className="af-step-num">{isLoaded ? <IconCheck size={14} /> : '1'}</div>
                        Apply Filters
                    </div>
                    <div className="af-step-line" />
                    <div className={`af-step ${isLoaded ? 'af-step-active' : ''}`}>
                        <div className="af-step-num">2</div>
                        Edit Entities
                    </div>
                </div>
            </header>

            {/* Filter Section */}
            <div className="af-card">
                <div className="af-card-head" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div className="af-badge-num">1</div>
                        <div>
                            <div className="af-card-title">Select Demographic & Billing</div>
                            <div className="af-card-subtitle">Filter students to bulk edit their assigned fees.</div>
                        </div>
                    </div>
                </div>

                <div className="af-step1-body" style={{ marginTop: '1.5rem' }}>
                    <form onSubmit={handleSearch}>
                        <div className="af-form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', alignItems: 'end' }}>
                            <div className="af-field">
                                <label className="af-label">Fee Group *</label>
                                <select
                                    className="af-select"
                                    value={filters.feeGroup}
                                    onChange={(e) => setFilters({ ...filters, feeGroup: e.target.value })}
                                    required
                                >
                                    <option value="">Select Fee Group</option>
                                    {feeGroups.map(fg => (
                                        <option key={fg.id} value={fg.id}>{fg.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="af-field">
                                <label className="af-label">Target Class *</label>
                                <select
                                    className="af-select"
                                    value={filters.classId}
                                    onChange={(e) => setFilters({ ...filters, classId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Class</option>
                                    {classes.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="af-field">
                                <label className="af-label">Section / Batch *</label>
                                <select
                                    className="af-select"
                                    value={filters.sectionId}
                                    onChange={(e) => setFilters({ ...filters, sectionId: e.target.value })}
                                    required
                                >
                                    <option value="">Select Section</option>
                                    {sections.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ paddingBottom: '0' }}>
                                <button
                                    type="submit"
                                    className="btn-premium btn-premium-primary w-full"
                                    style={{ height: '46px', display: 'flex', justifyContent: 'center', width: '100%' }}
                                >
                                    <IconSearch size={18} /> Initialize
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                    <IconCheck size={20} />
                    {successMessage}
                </div>
            )}

            {/* Table Section */}
            {isLoaded && (
                <main className="af-card animate-in" style={{ marginTop: '1.5rem' }}>
                    <div className="af-card-head">
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div className="af-badge-num">2</div>
                            <div>
                                <div className="af-card-title">Modify Fee Allocations</div>
                                <div className="af-card-subtitle">Review and update records for {studentsData.length} students.</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ maxHeight: 600, overflow: 'auto' }}>
                        <table className="af-table">
                            <thead>
                                <tr>
                                    <th>Student Identity</th>
                                    <th>Tuition Fee</th>
                                    <th>Transport Fee</th>
                                    <th>Library Fee</th>
                                    <th>Fee Concession</th>
                                    <th style={{ textAlign: 'right', paddingRight: '2rem' }}>Total Allocated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData.length > 0 ? (
                                    studentsData.map((student) => (
                                        <tr key={student.id}>
                                            <td>
                                                <div className="student-profile">
                                                    <img src={`https://i.pravatar.cc/150?u=${student.id}`} alt="" style={{ width: 44, height: 44, borderRadius: 12 }} />
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                        <div className="student-info-name">{student.name}</div>
                                                        <div className="student-info-id" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            #{student.admissionNo}
                                                            {student.isStaffChild && (
                                                                <span style={{ fontSize: '10px', fontWeight: 600, color: '#0284c7', backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', width: 'fit-content', border: '1px solid #bae6fd', lineHeight: 1 }}>
                                                                    Teacher's Ward
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ position: 'relative', width: 140 }}>
                                                    <IconCurrencyRupee size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                                    <input
                                                        type="number"
                                                        value={student.fees.tuitionFee}
                                                        onChange={(e) => handleFeeChange(student.id, 'tuitionFee', e.target.value)}
                                                        className="af-input"
                                                        style={{ paddingLeft: '2.5rem', width: '100%', paddingRight: '0.5rem' }}
                                                        min="0"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ position: 'relative', width: 140 }}>
                                                    <IconCurrencyRupee size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                                    <input
                                                        type="number"
                                                        value={student.fees.transportFee}
                                                        onChange={(e) => handleFeeChange(student.id, 'transportFee', e.target.value)}
                                                        className="af-input"
                                                        style={{ paddingLeft: '2.5rem', width: '100%', paddingRight: '0.5rem' }}
                                                        min="0"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ position: 'relative', width: 140 }}>
                                                    <IconCurrencyRupee size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                                    <input
                                                        type="number"
                                                        value={student.fees.libraryFee}
                                                        onChange={(e) => handleFeeChange(student.id, 'libraryFee', e.target.value)}
                                                        className="af-input"
                                                        style={{ paddingLeft: '2.5rem', width: '100%', paddingRight: '0.5rem' }}
                                                        min="0"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ position: 'relative', width: 140 }}>
                                                    <IconCurrencyRupee size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                                    <input
                                                        type="number"
                                                        value={student.fees.concession}
                                                        onChange={(e) => handleFeeChange(student.id, 'concession', e.target.value)}
                                                        className="af-input"
                                                        style={{ paddingLeft: '2.5rem', width: '100%', paddingRight: '0.5rem', borderColor: '#fcd34d', backgroundColor: '#fef3c7' }}
                                                        min="0"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', textAlign: 'right', paddingRight: '1rem' }}>
                                                    ₹{calculateTotal(student.fees).toLocaleString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                            No students found for this filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {studentsData.length > 0 && (
                        <div className="af-footer" style={{ marginTop: 0, borderTop: '1px solid #e2e8f0', borderRadius: '0 0 16px 16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Consolidated Total</span>
                                <div className="af-footer-total">
                                    <IconCurrencyRupee size={28} />
                                    {grandTotal.toLocaleString()}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button className="btn-premium btn-premium-primary" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={handleSave}>
                                    <IconDeviceFloppy size={20} /> Commit Changes
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            )}
        </div>
    );
};

export default EditFee;
