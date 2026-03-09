import React from 'react';
import { IconClipboardList } from '@tabler/icons-react';

const LEAVE_TYPES = [
    { label: 'Medical Leaves', total: 10, used: 5, color: '#10b981', bg: '#d1fae5' },
    { label: 'Casual Leaves', total: 12, used: 5, color: '#f59e0b', bg: '#fef3c7' },
];

const ParentLeaveBalance = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconClipboardList size={18} color="#3D5EE1" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b' }}>Leave Balance</span>
        </div>
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LEAVE_TYPES.map(lv => {
                const available = lv.total - lv.used;
                return (
                    <div key={lv.label} style={{ background: lv.bg, borderRadius: 12, padding: '16px' }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#1e1b4b', marginBottom: 12 }}>
                            {lv.label} <span style={{ fontWeight: 400, color: '#6b7280', fontSize: 12 }}>({lv.total})</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: 22, color: lv.color }}>{lv.used}</div>
                                <div style={{ fontSize: 11, color: '#6b7280' }}>Used</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 800, fontSize: 22, color: lv.color }}>{available}</div>
                                <div style={{ fontSize: 11, color: '#6b7280' }}>Available</div>
                            </div>
                        </div>
                        <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.55)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${(lv.used / lv.total) * 100}%`, background: lv.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

export default ParentLeaveBalance;
