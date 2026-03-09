import React from 'react';
import { IconCalendarTime, IconShare, IconRefresh } from '@tabler/icons-react';

const LESSONS = [
    { title: 'Introduction to Physics on Tech', subject: 'Physics', class: 'Class V-B', status: 'Completed', color: '#10b981' },
    { title: 'Biometric & their Working Functionality', subject: 'Science', class: 'Class IV-C', status: 'In Progress', color: '#3D5EE1' },
    { title: 'Analyze and interpret literary texts', subject: 'English', class: 'Class V-A', status: 'Pending', color: '#f59e0b' },
    { title: 'Enhance vocabulary and grammar skills', subject: 'English', class: 'Class III-B', status: 'Completed', color: '#10b981' },
    { title: 'Atomic structure and periodic table', subject: 'Chemistry', class: 'Class V-B', status: 'Pending', color: '#f59e0b' },
];

const statusStyle = {
    Completed: { bg: '#d1fae5', color: '#065f46' },
    'In Progress': { bg: '#dbeafe', color: '#1d4ed8' },
    Pending: { bg: '#fef3c7', color: '#92400e' },
};

const LessonPlans = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h4 style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Syllabus / Lesson Plan</h4>
            <a href="#" style={{ fontSize: 12, color: '#3D5EE1', fontWeight: 600, textDecoration: 'none' }}>View All</a>
        </div>
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f8fafc' }}>
                        {['Lesson Title', 'Subject', 'Class', 'Status', 'Actions'].map((h, i) => (
                            <th key={h} style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: i === 4 ? 'right' : 'left', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {LESSONS.map((l, i) => {
                        const s = statusStyle[l.status] || { bg: '#f3f4f6', color: '#374151' };
                        return (
                            <tr key={i} style={{ borderBottom: i < LESSONS.length - 1 ? '1px solid #f8fafc' : 'none' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                                onMouseLeave={e => e.currentTarget.style.background = 'white'}
                            >
                                <td style={{ padding: '13px 14px' }}>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: '#1f2937' }}>{l.title}</div>
                                </td>
                                <td style={{ padding: '13px 14px' }}>
                                    <span style={{ fontSize: 12, color: '#6b7280' }}>{l.subject}</span>
                                </td>
                                <td style={{ padding: '13px 14px' }}>
                                    <span style={{ fontSize: 12, color: '#6b7280' }}>{l.class}</span>
                                </td>
                                <td style={{ padding: '13px 14px' }}>
                                    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{l.status}</span>
                                </td>
                                <td style={{ padding: '13px 14px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
                                        <button title="Reschedule" style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#f9fafb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#374151', fontWeight: 600 }}>
                                            <IconCalendarTime size={13} /> Reschedule
                                        </button>
                                        <button title="Share" style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#f9fafb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#374151', fontWeight: 600 }}>
                                            <IconShare size={13} /> Share
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);

export default LessonPlans;
