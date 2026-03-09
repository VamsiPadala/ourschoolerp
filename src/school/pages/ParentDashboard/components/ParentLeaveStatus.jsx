import React, { useState } from 'react';
import { IconClipboardList, IconClock } from '@tabler/icons-react';

const LEAVES = [
    { title: 'Emergency Leave', date: '15 Jun 2024', type: 'Emergency', color: '#ef4444', bg: '#fee2e2' },
    { title: 'Medical Leave', date: '15 Jun 2024', type: 'Medical', color: '#f59e0b', bg: '#fef3c7' },
    { title: 'Medical Leave', date: '16 Jun 2024', type: 'Medical', color: '#f59e0b', bg: '#fef3c7' },
    { title: 'Fever', date: '16 Jun 2024', type: 'Sick', color: '#ef4444', bg: '#fee2e2' },
];
const PERIODS = ['This Month', 'This Year', 'Last Week'];

const ParentLeaveStatus = () => {
    const [period, setPeriod] = useState('This Month');
    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconClipboardList size={18} color="#ef4444" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b' }}>Leave Status</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {PERIODS.map(p => (
                        <button key={p} onClick={() => setPeriod(p)} style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: period === p ? '#ef4444' : '#f3f4f6', color: period === p ? 'white' : '#6b7280', transition: 'all 0.15s' }}>{p}</button>
                    ))}
                </div>
            </div>
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {LEAVES.map((lv, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, background: lv.bg, border: `1px solid ${lv.color}22` }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: lv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <IconClipboardList size={18} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e1b4b' }}>{lv.title}</div>
                            <div style={{ fontSize: 12, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                <IconClock size={11} /> Date: {lv.date}
                            </div>
                        </div>
                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: 'white', color: lv.color, flexShrink: 0 }}>{lv.type}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParentLeaveStatus;
