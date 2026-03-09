import React from 'react';
import { IconUsers, IconCalendarEvent, IconPhone, IconClipboardList } from '@tabler/icons-react';

const STATS = [
    { label: "Today's Visitors", value: '42', change: '+8', sub: 'vs yesterday', icon: IconUsers, color: '#3D5EE1', bg: '#eef2ff', gradient: 'linear-gradient(135deg,#3D5EE1,#6C49EF)' },
    { label: 'Appointments', value: '18', change: '+3', sub: 'scheduled today', icon: IconCalendarEvent, color: '#10b981', bg: '#d1fae5', gradient: 'linear-gradient(135deg,#10b981,#059669)' },
    { label: 'Calls Handled', value: '67', change: '+12', sub: 'since 9 AM', icon: IconPhone, color: '#f59e0b', bg: '#fef3c7', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
    { label: 'Pending Inquiries', value: '9', change: '-4', sub: 'unresolved', icon: IconClipboardList, color: '#ef4444', bg: '#fee2e2', gradient: 'linear-gradient(135deg,#ef4444,#dc2626)' },
];

const ReceptionistStatCards = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
        {STATS.map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', padding: '20px', overflow: 'hidden', position: 'relative', transition: 'transform 0.2s,box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)'; }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: s.gradient }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <s.icon size={22} color={s.color} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: s.bg, color: s.color }}>{s.change}</span>
                </div>
                <div style={{ fontWeight: 900, fontSize: 28, color: '#1e1b4b', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{s.sub}</div>
            </div>
        ))}
    </div>
);

export default ReceptionistStatCards;
