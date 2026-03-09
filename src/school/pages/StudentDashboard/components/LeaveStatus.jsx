import React, { useState } from 'react';
import { IconClipboardList, IconClock } from '@tabler/icons-react';

const LEAVES = [
    { type: 'Emergency Leave', date: '15 Jun 2024', tag: 'Emergency', color: '#ef4444', bg: '#fee2e2' },
    { type: 'Medical Leave', date: '15 Jun 2024', tag: 'Medical', color: '#f59e0b', bg: '#fef3c7' },
    { type: 'Medical Leave', date: '16 Jun 2024', tag: 'Medical', color: '#f59e0b', bg: '#fef3c7' },
    { type: 'Fever', date: '16 Jun 2024', tag: 'Sick', color: '#ef4444', bg: '#fee2e2' },
];
const FILTERS = ['This Month', 'This Year', 'Last Week'];

const LeaveStatus = () => {
    const [filter, setFilter] = useState('This Month');
    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Leave Status</h5>
                <div style={{ display: 'flex', gap: 4 }}>
                    {FILTERS.map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: filter === f ? '#ef4444' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LEAVES.map((lv, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: lv.bg, border: `1px solid ${lv.color}22` }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: lv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <IconClipboardList size={18} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e1b4b' }}>{lv.type}</div>
                            <div style={{ fontSize: 12, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                <IconClock size={11} /> Date: {lv.date}
                            </div>
                        </div>
                        <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: 'white', color: lv.color }}>{lv.tag}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaveStatus;
