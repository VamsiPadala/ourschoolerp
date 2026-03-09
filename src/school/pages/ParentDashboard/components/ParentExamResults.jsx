import React from 'react';
import { IconMedal } from '@tabler/icons-react';

const RESULTS = [
    { id: '35013', name: 'Janet', classNum: 'III', exam: 'Quarterly', marks: '89%', grade: 'A', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
    { id: '35013', name: 'Joann', classNum: 'IV', exam: 'Quarterly', marks: '88%', grade: 'A', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg' },
    { id: '35010', name: 'Gifford', classNum: 'I', exam: '1st Term', marks: '21%', grade: 'D', status: 'Fail', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-04.jpg' },
    { id: '35009', name: 'Lisa', classNum: 'II', exam: 'Practical', marks: '31%', grade: 'D', status: 'Fail', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-05.jpg' },
    { id: '35014', name: 'Riana', classNum: 'V', exam: 'Quarterly', marks: '76%', grade: 'B', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg' },
    { id: '35015', name: 'Angelo', classNum: 'IV', exam: 'Practical', marks: '91%', grade: 'A+', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
];

const ParentExamResults = ({ fullWidth = false }) => {
    const gridCols = fullWidth ? '2fr 80px 140px 80px 80px 80px' : '1.8fr 60px 70px 65px';
    const headers = fullWidth ? ['Name', 'Class', 'Exam', 'Grade', 'Marks', 'Status'] : ['Name', 'Class', 'Marks', 'Status'];

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconMedal size={18} color="#f59e0b" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b' }}>Exam Results</span>
            </div>

            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '8px 20px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                {headers.map((h, i) => (
                    <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: i > 0 ? 'center' : 'left' }}>{h}</div>
                ))}
            </div>

            {/* Rows */}
            {RESULTS.map((s, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: gridCols, alignItems: 'center', padding: '12px 20px', borderBottom: i < RESULTS.length - 1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>

                    {/* Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, overflow: 'hidden', border: '1.5px solid #e5e7eb', flexShrink: 0 }}>
                            <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&size=32&background=3D5EE1&color=fff`; }} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 13, color: '#1f2937' }}>{s.name}</span>
                    </div>

                    {/* Class */}
                    <div style={{ textAlign: 'center', fontSize: 13, color: '#6b7280' }}>{s.classNum}</div>

                    {/* Exam — only in fullWidth */}
                    {fullWidth && <div style={{ textAlign: 'center', fontSize: 12, color: '#6b7280' }}>{s.exam}</div>}

                    {/* Grade — only in fullWidth */}
                    {fullWidth && (
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, background: '#eef2ff', color: '#3D5EE1' }}>{s.grade}</span>
                        </div>
                    )}

                    {/* Marks */}
                    <div style={{ textAlign: 'center', fontWeight: 800, fontSize: 13, color: parseInt(s.marks) >= 60 ? '#10b981' : '#ef4444' }}>{s.marks}</div>

                    {/* Status */}
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: s.status === 'Pass' ? '#d1fae5' : '#fee2e2', color: s.status === 'Pass' ? '#065f46' : '#b91c1c' }}>{s.status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ParentExamResults;
