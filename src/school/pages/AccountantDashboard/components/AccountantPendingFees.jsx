import React from 'react';
import { IconAlertCircle, IconClock, IconPhone } from '@tabler/icons-react';

const PENDING = [
    { name: 'Gifford Harris', class: 'I-A', roll: '#ST1001', amount: '$1,200', due: '10 Mar 2026', days: 4, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-04.jpg' },
    { name: 'Sara Bown', class: 'III-A', roll: '#ST1002', amount: '$950', due: '08 Mar 2026', days: 2, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg' },
    { name: 'Lisa Thompson', class: 'II-B', roll: '#ST1005', amount: '$800', due: '06 Mar 2026', days: 0, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-05.jpg' },
    { name: 'Marcus Reed', class: 'V-C', roll: '#ST1008', amount: '$1,500', due: '01 Mar 2026', days: -5, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
    { name: 'Priya Nair', class: 'IV-A', roll: '#ST1011', amount: '$700', due: '28 Feb 2026', days: -7, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg' },
];

const AccountantPendingFees = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconAlertCircle size={18} color="#f59e0b" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Pending Fee Payments</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: '#fee2e2', color: '#dc2626' }}>5 Overdue</span>
        </div>
        <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PENDING.map((s, i) => {
                const overdue = s.days <= 0;
                const dueSoon = s.days > 0 && s.days <= 3;
                const color = overdue ? '#ef4444' : dueSoon ? '#f59e0b' : '#10b981';
                const bg = overdue ? '#fee2e2' : dueSoon ? '#fef3c7' : '#f0fdf4';
                return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: bg, border: `1px solid ${color}25` }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                            <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&size=38&background=3D5EE1&color=fff`; }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#1f2937' }}>{s.name}</div>
                            <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.class} · {s.roll}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontWeight: 800, fontSize: 14, color: color }}>{s.amount}</div>
                            <div style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', color, marginTop: 2 }}>
                                <IconClock size={10} />
                                {overdue ? `${Math.abs(s.days)}d overdue` : s.days === 0 ? 'Due today' : `${s.days}d left`}
                            </div>
                        </div>
                        <button style={{ width: 30, height: 30, borderRadius: 8, background: 'white', border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                            <IconPhone size={13} color={color} />
                        </button>
                    </div>
                );
            })}
        </div>
    </div>
);

export default AccountantPendingFees;
