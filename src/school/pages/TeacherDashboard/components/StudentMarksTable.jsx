import React, { useState } from 'react';
import { IconChevronDown, IconChartBar } from '@tabler/icons-react';

const STUDENTS = [
    { id: '35013', name: 'Janet', class: 'III', section: 'A', marks: '89%', cgpa: '4.2', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
    { id: '35013', name: 'Joann', class: 'IV', section: 'B', marks: '88%', cgpa: '3.2', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg' },
    { id: '35011', name: 'Kathleen', class: 'II', section: 'A', marks: '69%', cgpa: '4.5', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg' },
    { id: '35010', name: 'Gifford', class: 'I', section: 'B', marks: '21%', cgpa: '4.5', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-04.jpg' },
    { id: '35009', name: 'Lisa', class: 'II', section: 'B', marks: '31%', cgpa: '3.9', status: 'Fail', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-05.jpg' },
];

const CLASSES = ['All Classes', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V'];
const SECTIONS = ['All Sections', 'Section A', 'Section B', 'Section C'];

const FilterDropdown = ({ options, value, onChange }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, border: '1.5px solid #e5e7eb', background: 'white', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}
            >
                {value} <IconChevronDown size={14} />
            </button>
            {open && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, background: 'white', borderRadius: 10, border: '1px solid #e5e7eb', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 100, minWidth: 140, overflow: 'hidden' }}>
                    {options.map(opt => (
                        <div key={opt} onClick={() => { onChange(opt); setOpen(false); }}
                            style={{ padding: '10px 16px', fontSize: 13, cursor: 'pointer', fontWeight: opt === value ? 700 : 400, background: opt === value ? '#f0f4ff' : 'white', color: opt === value ? '#3D5EE1' : '#374151' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                            onMouseLeave={e => e.currentTarget.style.background = opt === value ? '#f0f4ff' : 'white'}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const StudentMarksTable = () => {
    const [selectedClass, setSelectedClass] = useState('All Classes');
    const [selectedSection, setSelectedSection] = useState('All Sections');

    const filtered = STUDENTS.filter(s => {
        const cMatch = selectedClass === 'All Classes' || `Class ${s.class}` === selectedClass;
        const sMatch = selectedSection === 'All Sections' || `Section ${s.section}` === selectedSection;
        return cMatch && sMatch;
    });

    const COLS = ['ID', 'Name', 'Class', 'Section', 'Marks %', 'CGPA', 'Status'];

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid #f1f5f9' }}>

            {/* Header */}
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconChartBar size={20} color="#3D5EE1" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 17, color: '#1e1b4b' }}>Student Marks</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <FilterDropdown options={CLASSES} value={selectedClass} onChange={setSelectedClass} />
                    <FilterDropdown options={SECTIONS} value={selectedSection} onChange={setSelectedSection} />
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>

                {/* Column headers */}
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1.8fr 80px 90px 100px 80px 90px', padding: '10px 24px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    {COLS.map((h, i) => (
                        <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: i >= 4 ? 'center' : 'left' }}>
                            {h}
                        </div>
                    ))}
                </div>

                {/* Rows */}
                {filtered.length === 0 ? (
                    <div style={{ padding: '40px 24px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>No students match the selected filters.</div>
                ) : (
                    filtered.map((s, i) => {
                        const marksNum = parseInt(s.marks);
                        const marksColor = marksNum >= 80 ? '#10b981' : marksNum >= 50 ? '#f59e0b' : '#ef4444';
                        return (
                            <div key={i}
                                style={{ display: 'grid', gridTemplateColumns: '100px 1.8fr 80px 90px 100px 80px 90px', alignItems: 'center', padding: '13px 24px', borderBottom: i < filtered.length - 1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                                onMouseLeave={e => e.currentTarget.style.background = 'white'}
                            >
                                {/* ID */}
                                <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>#{s.id}</div>

                                {/* Name */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: '1.5px solid #e5e7eb' }}>
                                        <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=3D5EE1&color=fff`; }}
                                        />
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1f2937' }}>{s.name}</span>
                                </div>

                                {/* Class */}
                                <div style={{ fontSize: 13, color: '#6b7280', textAlign: 'center' }}>{s.class}</div>

                                {/* Section */}
                                <div style={{ fontSize: 13, color: '#6b7280', textAlign: 'center' }}>{s.section}</div>

                                {/* Marks */}
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ fontWeight: 800, fontSize: 14, color: marksColor }}>{s.marks}</span>
                                </div>

                                {/* CGPA */}
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', textAlign: 'center' }}>{s.cgpa}</div>

                                {/* Status */}
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{
                                        padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                                        background: s.status === 'Pass' ? '#d1fae5' : '#fee2e2',
                                        color: s.status === 'Pass' ? '#065f46' : '#b91c1c',
                                    }}>
                                        {s.status}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer count */}
            <div style={{ padding: '12px 24px', borderTop: '1px solid #f1f5f9', background: '#fafbff', fontSize: 12, color: '#9ca3af' }}>
                Showing <strong style={{ color: '#374151' }}>{filtered.length}</strong> of <strong style={{ color: '#374151' }}>{STUDENTS.length}</strong> students
            </div>
        </div>
    );
};

export default StudentMarksTable;
