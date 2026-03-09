import React, { useState } from 'react';
import { IconUser, IconBuilding, IconCheck, IconX, IconClock } from '@tabler/icons-react';

const VISITORS = [
    { name: 'Rajesh Kumar', purpose: 'Parent Meeting', host: 'Mr. Aaron', time: '09:15 AM', status: 'Checked In', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-01.jpg' },
    { name: 'Anita Sharma', purpose: 'Admission Inquiry', host: 'Principal', time: '09:45 AM', status: 'Waiting', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-02.jpg' },
    { name: 'David Lee', purpose: 'Vendor Meeting', host: 'Admin Office', time: '10:00 AM', status: 'Checked In', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-03.jpg' },
    { name: 'Priya Menon', purpose: 'Parent Meeting', host: 'Ms. Hellana', time: '10:30 AM', status: 'Checked Out', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-04.jpg' },
    { name: 'Suresh Pillai', purpose: 'Document Pickup', host: 'Front Desk', time: '11:00 AM', status: 'Waiting', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-05.jpg' },
    { name: 'Maria Fernandez', purpose: 'Admission Inquiry', host: 'Counsellor', time: '11:20 AM', status: 'Scheduled', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-06.jpg' },
];

const STATUS = {
    'Checked In': { bg: '#d1fae5', color: '#065f46', icon: IconCheck },
    'Checked Out': { bg: '#f3f4f6', color: '#6b7280', icon: IconX },
    'Waiting': { bg: '#fef3c7', color: '#92400e', icon: IconClock },
    'Scheduled': { bg: '#eef2ff', color: '#3D5EE1', icon: IconClock },
};

const ReceptionistVisitorLog = () => {
    const [search, setSearch] = useState('');
    const list = VISITORS.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.purpose.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconUser size={18} color="#3D5EE1" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Today's Visitor Log</span>
                </div>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search visitor..."
                    style={{ padding: '7px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 12, outline: 'none', width: 200, background: '#f8fafc' }} />
            </div>
            {/* Column headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.2fr 1fr 1fr', padding: '8px 20px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                {['Visitor', 'Purpose', 'Host', 'Time', 'Status'].map((h, i) => (
                    <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: i > 2 ? 'center' : 'left' }}>{h}</div>
                ))}
            </div>
            {list.map((v, i) => {
                const s = STATUS[v.status] || STATUS['Waiting'];
                return (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.2fr 1fr 1fr', alignItems: 'center', padding: '12px 20px', borderBottom: i < list.length - 1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fafbff'} onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 9, overflow: 'hidden', flexShrink: 0 }}>
                                <img src={v.avatar} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(v.name)}&size=32&background=3D5EE1&color=fff`; }} />
                            </div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#1f2937' }}>{v.name}</div>
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 5 }}><IconBuilding size={12} />{v.purpose}</div>
                        <div style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>{v.host}</div>
                        <div style={{ textAlign: 'center', fontSize: 12, color: '#6b7280' }}>{v.time}</div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color }}>
                                <s.icon size={10} />{v.status}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ReceptionistVisitorLog;
