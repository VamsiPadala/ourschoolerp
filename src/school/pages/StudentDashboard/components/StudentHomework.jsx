import React, { useState } from 'react';
import { IconBook } from '@tabler/icons-react';

const HOMEWORKS = [
    { subject: 'Physics', color: '#3D5EE1', bg: '#eef2ff', title: 'Write about Theory of Pendulum', teacher: 'Aaron', due: '16 Jun 2024', pct: 90 },
    { subject: 'Chemistry', color: '#f59e0b', bg: '#fef3c7', title: 'Chemistry - Change of Elements', teacher: 'Hellana', due: '16 Jun 2024', pct: 65 },
    { subject: 'Maths', color: '#10b981', bg: '#d1fae5', title: 'Maths - Problems to Solve Page 21', teacher: 'Morgan', due: '21 Jun 2024', pct: 30 },
    { subject: 'English', color: '#ec4899', bg: '#fce7f3', title: 'English - Vocabulary Introduction', teacher: 'Daniel Josua', due: '21 Jun 2024', pct: 10 },
];
const FILTERS = ['All Subject', 'Physics', 'Chemistry', 'Maths', 'English'];

const StudentHomework = () => {
    const [filter, setFilter] = useState('All Subject');
    const list = HOMEWORKS.filter(h => filter === 'All Subject' || h.subject === filter);

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconBook size={18} color="#3D5EE1" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Home Works</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {FILTERS.map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: filter === f ? '#3D5EE1' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {list.map((hw, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderRadius: 12, background: hw.bg, border: `1px solid ${hw.color}25` }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: hw.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                            <IconBook size={19} color="white" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: hw.color, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{hw.subject}</div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e1b4b', margin: '3px 0 6px' }}>{hw.title}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                                <span>👤 {hw.teacher}</span>
                                <span>📅 Due: {hw.due}</span>
                            </div>
                            {/* Progress */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ flex: 1, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.6)', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${hw.pct}%`, background: hw.color, borderRadius: 99 }} />
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 700, color: hw.color }}>{hw.pct}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentHomework;
