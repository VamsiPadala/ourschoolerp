import React, { useState } from 'react';
import { IconBook } from '@tabler/icons-react';

const HOMEWORKS = [
    { subject: 'Physics', title: 'Write about Theory of Pendulum', teacher: 'Aaron', due: '16 Jun 2024', color: '#3D5EE1', bg: '#eef2ff' },
    { subject: 'Chemistry', title: 'Chemistry – Change of Elements', teacher: 'Hellana', due: '16 Jun 2024', color: '#10b981', bg: '#d1fae5' },
    { subject: 'Maths', title: 'Maths – Problems to Solve Pg 21', teacher: 'Morgan', due: '21 Jun 2024', color: '#f59e0b', bg: '#fef3c7' },
    { subject: 'English', title: 'English – Vocabulary Introduction', teacher: 'Daniel Josua', due: '21 Jun 2024', color: '#ec4899', bg: '#fce7f3' },
];
const FILTERS = ['All Subject', 'Physics', 'Chemistry', 'Maths', 'English'];

const ParentHomeworks = () => {
    const [filter, setFilter] = useState('All Subject');
    const list = HOMEWORKS.filter(h => filter === 'All Subject' || h.subject === filter);

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconBook size={18} color="#3D5EE1" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b' }}>Home Works</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {FILTERS.map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: filter === f ? '#3D5EE1' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>{f}</button>
                    ))}
                </div>
            </div>
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {list.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 24, color: '#9ca3af', fontSize: 13 }}>No homeworks for this subject.</div>
                ) : (
                    list.map((hw, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderRadius: 12, background: hw.bg, border: `1px solid ${hw.color}22` }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: hw.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                                <IconBook size={19} color="white" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: hw.color, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{hw.subject}</div>
                                <div style={{ fontWeight: 700, fontSize: 14, color: '#1e1b4b', marginBottom: 6 }}>{hw.title}</div>
                                <div style={{ display: 'flex', gap: 18, fontSize: 12, color: '#6b7280' }}>
                                    <span>👤 {hw.teacher}</span>
                                    <span>📅 Due: {hw.due}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ParentHomeworks;
