import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import StudentPageContainer from './components/StudentPageContainer';
import './SiblingsData.css';

// ── Dummy Data ───────────────────────────────────────────────────────────────
const SIBLINGS_DATA = [
    {
        id: 'SG001',
        family: 'Sharma Family',
        parentName: 'Rajesh Sharma',
        parentPhone: '+91 98765 43210',
        address: 'Flat 4B, Green Park Colony, Hyderabad',
        siblings: [
            { admNo: 'ADM-001', name: 'Arjun Sharma', class: 'Class 10', section: 'A', rollNo: '05', gender: 'Male', photo: '🧑', status: 'Active' },
            { admNo: 'ADM-002', name: 'Priya Sharma', class: 'Class 7', section: 'B', rollNo: '12', gender: 'Female', photo: '👧', status: 'Active' },
            { admNo: 'ADM-003', name: 'Rohan Sharma', class: 'Class 3', section: 'A', rollNo: '21', gender: 'Male', photo: '👦', status: 'Active' },
        ]
    },
    {
        id: 'SG002',
        family: 'Nair Family',
        parentName: 'Suresh Nair',
        parentPhone: '+91 91234 56789',
        address: '12, Rose Garden, Vijayawada',
        siblings: [
            { admNo: 'ADM-010', name: 'Deepa Nair', class: 'Class 11', section: 'A', rollNo: '03', gender: 'Female', photo: '👩', status: 'Active' },
            { admNo: 'ADM-011', name: 'Arun Nair', class: 'Class 8', section: 'C', rollNo: '17', gender: 'Male', photo: '🧑', status: 'Active' },
        ]
    },
    {
        id: 'SG003',
        family: 'Patel Family',
        parentName: 'Mahesh Patel',
        parentPhone: '+91 99887 76655',
        address: '45, Sunrise Avenue, Visakhapatnam',
        siblings: [
            { admNo: 'ADM-021', name: 'Ananya Patel', class: 'Class 9', section: 'B', rollNo: '08', gender: 'Female', photo: '👧', status: 'Active' },
            { admNo: 'ADM-022', name: 'Mihir Patel', class: 'Class 6', section: 'A', rollNo: '30', gender: 'Male', photo: '👦', status: 'Active' },
            { admNo: 'ADM-023', name: 'Aisha Patel', class: 'Class 2', section: 'B', rollNo: '14', gender: 'Female', photo: '👶', status: 'Active' },
        ]
    },
    {
        id: 'SG004',
        family: 'Kumar Family',
        parentName: 'Ravi Kumar',
        parentPhone: '+91 98001 23456',
        address: '8, Lake View Road, Tirupati',
        siblings: [
            { admNo: 'ADM-031', name: 'Vikram Kumar', class: 'Class 12', section: 'A', rollNo: '01', gender: 'Male', photo: '🧑', status: 'Active' },
            { admNo: 'ADM-032', name: 'Sneha Kumar', class: 'Class 9', section: 'C', rollNo: '22', gender: 'Female', photo: '👩', status: 'Active' },
        ]
    },
    {
        id: 'SG005',
        family: 'Reddy Family',
        parentName: 'Venkatesh Reddy',
        parentPhone: '+91 90001 11223',
        address: '22, MG Road, Nellore',
        siblings: [
            { admNo: 'ADM-041', name: 'Kavya Reddy', class: 'Class 8', section: 'A', rollNo: '09', gender: 'Female', photo: '👧', status: 'Active' },
            { admNo: 'ADM-042', name: 'Kiran Reddy', class: 'Class 5', section: 'B', rollNo: '18', gender: 'Male', photo: '👦', status: 'Active' },
            { admNo: 'ADM-043', name: 'Keerthi Reddy', class: 'Class 1', section: 'A', rollNo: '07', gender: 'Female', photo: '👶', status: 'Active' },
        ]
    },
    {
        id: 'SG006',
        family: 'Singh Family',
        parentName: 'Harpreet Singh',
        parentPhone: '+91 97777 88899',
        address: '33, Patel Nagar, Warangal',
        siblings: [
            { admNo: 'ADM-051', name: 'Gurpreet Singh', class: 'Class 11', section: 'B', rollNo: '14', gender: 'Male', photo: '🧑', status: 'Active' },
            { admNo: 'ADM-052', name: 'Simran Singh', class: 'Class 7', section: 'A', rollNo: '26', gender: 'Female', photo: '👧', status: 'Active' },
        ]
    },
];

const CLASS_FILTERS = ['All Classes', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

const FAMILY_COLORS = [
    { bg: 'linear-gradient(135deg,#3d5ee1,#5a7dff)', light: '#eef1fd', text: '#3d5ee1' },
    { bg: 'linear-gradient(135deg,#10b981,#34d399)', light: '#ecfdf5', text: '#059669' },
    { bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)', light: '#fffbeb', text: '#d97706' },
    { bg: 'linear-gradient(135deg,#8b5cf6,#a78bfa)', light: '#f5f3ff', text: '#7c3aed' },
    { bg: 'linear-gradient(135deg,#ef4444,#f87171)', light: '#fef2f2', text: '#dc2626' },
    { bg: 'linear-gradient(135deg,#06b6d4,#22d3ee)', light: '#ecfeff', text: '#0891b2' },
];

const SiblingsData = () => {
    const [search, setSearch] = useState('');
    const [classFilter, setClassFilter] = useState('All Classes');
    const [view, setView] = useState('cards'); // 'cards' | 'table'

    const filtered = useMemo(() => {
        return SIBLINGS_DATA.filter(group => {
            const matchesSearch =
                !search ||
                group.family.toLowerCase().includes(search.toLowerCase()) ||
                group.parentName.toLowerCase().includes(search.toLowerCase()) ||
                group.siblings.some(s => s.name.toLowerCase().includes(search.toLowerCase()) ||
                    s.admNo.toLowerCase().includes(search.toLowerCase()));
            const matchesClass =
                classFilter === 'All Classes' ||
                group.siblings.some(s => s.class === classFilter);
            return matchesSearch && matchesClass;
        });
    }, [search, classFilter]);

    const totalFamilies = filtered.length;
    const totalStudents = filtered.reduce((acc, g) => acc + g.siblings.length, 0);
    const totalWith3Plus = filtered.filter(g => g.siblings.length >= 3).length;

    return (
        <StudentPageContainer
            title="Siblings Data"
            breadcrumb={<><span>Student Information</span> / <span className="current">Siblings Data</span></>}
            backTitle="Go back"
            pageClass="sib-page"
        >
            {/* ── KPI Summary ───────────────────────────── */}
            <div className="sib-kpi-row">
                <div className="sib-kpi" style={{ background: 'linear-gradient(135deg,#3d5ee1,#5a7dff)' }}>
                    <div className="sib-kpi-icon">👨‍👩‍👧‍👦</div>
                    <div><span className="sib-kpi-val">{SIBLINGS_DATA.length}</span><span className="sib-kpi-lbl">Total Families</span></div>
                </div>
                <div className="sib-kpi" style={{ background: 'linear-gradient(135deg,#10b981,#34d399)' }}>
                    <div className="sib-kpi-icon">👨‍🎓</div>
                    <div><span className="sib-kpi-val">{SIBLINGS_DATA.reduce((a, g) => a + g.siblings.length, 0)}</span><span className="sib-kpi-lbl">Total Siblings</span></div>
                </div>
                <div className="sib-kpi" style={{ background: 'linear-gradient(135deg,#f59e0b,#fbbf24)' }}>
                    <div className="sib-kpi-icon">🏆</div>
                    <div><span className="sib-kpi-val">{SIBLINGS_DATA.filter(g => g.siblings.length >= 3).length}</span><span className="sib-kpi-lbl">3+ Siblings</span></div>
                </div>
                <div className="sib-kpi" style={{ background: 'linear-gradient(135deg,#8b5cf6,#a78bfa)' }}>
                    <div className="sib-kpi-icon">📊</div>
                    <div>
                        <span className="sib-kpi-val">{(SIBLINGS_DATA.reduce((a, g) => a + g.siblings.length, 0) / SIBLINGS_DATA.length).toFixed(1)}</span>
                        <span className="sib-kpi-lbl">Avg per Family</span>
                    </div>
                </div>
            </div>

            {/* ── Filter Bar ─────────────────────────────── */}
            <div className="sib-filter-bar">
                <div className="sib-search-wrap">
                    <span className="sib-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search family, student name, admission no..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="sib-search"
                    />
                    {search && <button className="sib-clear" onClick={() => setSearch('')}>✕</button>}
                </div>
                <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="sib-select">
                    {CLASS_FILTERS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="sib-view-toggle">
                    <button className={`sib-vbtn ${view === 'cards' ? 'active' : ''}`} onClick={() => setView('cards')}>⊞ Cards</button>
                    <button className={`sib-vbtn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')}>☰ Table</button>
                </div>
                <span className="sib-results">{totalStudents} students · {totalFamilies} families</span>
            </div>

            {/* ── Content ────────────────────────────────── */}
            {filtered.length === 0 ? (
                <div className="sib-empty">
                    <span>🔍</span>
                    <p>No matching siblings found. Try a different search.</p>
                </div>
            ) : view === 'cards' ? (
                <div className="sib-cards-grid">
                    {filtered.map((group, gi) => {
                        const color = FAMILY_COLORS[gi % FAMILY_COLORS.length];
                        return (
                            <div key={group.id} className="sib-family-card">
                                {/* Card Header */}
                                <div className="sib-card-header" style={{ background: color.bg }}>
                                    <div className="sib-fam-avatar">👨‍👩‍👧‍👦</div>
                                    <div className="sib-fam-info">
                                        <h5>{group.family}</h5>
                                        <p>👤 {group.parentName}</p>
                                        <p>📞 {group.parentPhone}</p>
                                    </div>
                                    <div className="sib-count-badge">{group.siblings.length}</div>
                                </div>
                                {/* Address */}
                                <div className="sib-address">📍 {group.address}</div>
                                {/* Siblings List */}
                                <div className="sib-students-list">
                                    {group.siblings.map((s, si) => (
                                        <div key={si} className="sib-student-row">
                                            <div className="sib-stu-avatar" style={{ background: color.light, color: color.text }}>
                                                {s.photo}
                                            </div>
                                            <div className="sib-stu-info">
                                                <p className="sib-stu-name">{s.name}</p>
                                                <p className="sib-stu-meta">{s.class} – Sec {s.section} · Roll {s.rollNo}</p>
                                            </div>
                                            <div className="sib-stu-right">
                                                <span className={`sib-gender-badge ${s.gender === 'Female' ? 'female' : 'male'}`}>{s.gender}</span>
                                                <span className="sib-adm">{s.admNo}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Card Footer */}
                                <div className="sib-card-footer">
                                    <span style={{ fontSize: 12, color: '#64748b' }}>ID: {group.id}</span>
                                    <button className="sib-view-btn" style={{ borderColor: color.text, color: color.text }}>
                                        View Profiles →
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Table View */
                <div className="sib-table-card">
                    <table className="sib-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Family</th>
                                <th>Sibling Name</th>
                                <th>Adm No</th>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Roll No</th>
                                <th>Gender</th>
                                <th>Parent</th>
                                <th>Parent Phone</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((group, gi) =>
                                group.siblings.map((s, si) => (
                                    <tr key={`${gi}-${si}`}>
                                        {si === 0 && (
                                            <td rowSpan={group.siblings.length} className="sib-td-group">
                                                <span className="sib-group-badge" style={{ background: FAMILY_COLORS[gi % FAMILY_COLORS.length].light, color: FAMILY_COLORS[gi % FAMILY_COLORS.length].text }}>
                                                    {group.id}
                                                </span>
                                            </td>
                                        )}
                                        {si === 0 && (
                                            <td rowSpan={group.siblings.length} className="sib-td-family">
                                                <strong>{group.family}</strong>
                                            </td>
                                        )}
                                        <td>
                                            <div className="sib-tbl-stu">
                                                <span className="sib-tbl-avatar">{s.photo}</span>
                                                {s.name}
                                            </div>
                                        </td>
                                        <td><span className="sib-adm-badge">{s.admNo}</span></td>
                                        <td>{s.class}</td>
                                        <td><span className="sib-sec-chip">{s.section}</span></td>
                                        <td>{s.rollNo}</td>
                                        <td><span className={`sib-gender-badge ${s.gender === 'Female' ? 'female' : 'male'}`}>{s.gender}</span></td>
                                        {si === 0 && <td rowSpan={group.siblings.length}>{group.parentName}</td>}
                                        {si === 0 && <td rowSpan={group.siblings.length}>{group.parentPhone}</td>}
                                        <td><span className="sib-active-badge">✓ {s.status}</span></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </StudentPageContainer>
    );
};

export default SiblingsData;
