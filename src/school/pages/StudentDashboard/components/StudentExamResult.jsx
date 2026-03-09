import React, { useState } from 'react';
import { IconMedal } from '@tabler/icons-react';

const RESULTS_Q1 = [
    { subject: 'Maths', marks: 92, total: 100, grade: 'A+', color: '#3D5EE1' },
    { subject: 'Physics', marks: 85, total: 100, grade: 'A', color: '#10b981' },
    { subject: 'Chemistry', marks: 88, total: 100, grade: 'A', color: '#f59e0b' },
    { subject: 'English', marks: 90, total: 100, grade: 'A+', color: '#ec4899' },
    { subject: 'Biology', marks: 78, total: 100, grade: 'B+', color: '#8b5cf6' },
];
const RESULTS_Q2 = [
    { subject: 'Maths', marks: 88, total: 100, grade: 'A', color: '#3D5EE1' },
    { subject: 'Physics', marks: 79, total: 100, grade: 'B+', color: '#10b981' },
    { subject: 'Chemistry', marks: 82, total: 100, grade: 'A', color: '#f59e0b' },
    { subject: 'English', marks: 95, total: 100, grade: 'A+', color: '#ec4899' },
    { subject: 'Biology', marks: 71, total: 100, grade: 'B', color: '#8b5cf6' },
];

const StudentExamResult = () => {
    const [quarter, setQuarter] = useState('1st Quarter');
    const results = quarter === '1st Quarter' ? RESULTS_Q1 : RESULTS_Q2;
    const avg = Math.round(results.reduce((s, r) => s + r.marks, 0) / results.length);

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconMedal size={18} color="#f59e0b" />
                    </div>
                    <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Exam Result</h5>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    {['1st Quarter', '2nd Quarter'].map(q => (
                        <button key={q} onClick={() => setQuarter(q)}
                            style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: quarter === q ? '#f59e0b' : '#f3f4f6', color: quarter === q ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {q}
                        </button>
                    ))}
                </div>
            </div>
            {/* Avg badge */}
            <div style={{ padding: '12px 20px', background: '#fffbeb', borderBottom: '1px solid #fef3c7', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>Average Score</span>
                <span style={{ fontWeight: 800, fontSize: 18, color: avg >= 80 ? '#10b981' : avg >= 60 ? '#f59e0b' : '#ef4444' }}>{avg}%</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: avg >= 80 ? '#d1fae5' : '#fef3c7', color: avg >= 80 ? '#065f46' : '#92400e', fontWeight: 700, marginLeft: 4 }}>
                    {avg >= 80 ? 'Distinction' : avg >= 60 ? 'Pass' : 'Below Average'}
                </span>
            </div>
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {results.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                        <div style={{ width: 80, fontSize: 13, fontWeight: 600, color: '#374151' }}>{r.subject}</div>
                        <div style={{ flex: 1, height: 7, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${r.marks}%`, background: r.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
                        </div>
                        <div style={{ width: 36, textAlign: 'right', fontWeight: 800, fontSize: 13, color: r.color }}>{r.marks}</div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: `${r.color}15`, color: r.color }}>{r.grade}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentExamResult;
