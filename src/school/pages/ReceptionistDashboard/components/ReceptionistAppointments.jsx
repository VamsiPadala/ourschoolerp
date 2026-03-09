import React, { useState } from 'react';
import { IconCalendarEvent, IconClock, IconUser } from '@tabler/icons-react';

const APPOINTMENTS = [
    { time: '09:00 AM', name: 'Mr. & Mrs. Sharma', purpose: 'Admission Inquiry', with: 'Principal', status: 'Confirmed', color: '#10b981' },
    { time: '09:45 AM', name: 'Ramesh Gupta', purpose: 'Fee Discussion', with: 'Accountant', status: 'Waiting', color: '#f59e0b' },
    { time: '10:30 AM', name: 'Lisa Brown', purpose: 'Parent-Teacher Meet', with: 'Mr. Aaron', status: 'Confirmed', color: '#10b981' },
    { time: '11:00 AM', name: 'Tech Solutions Ltd', purpose: 'Vendor Meeting', with: 'Admin', status: 'Pending', color: '#3D5EE1' },
    { time: '11:30 AM', name: 'Sandra Peters', purpose: 'Document Submission', with: 'Front Desk', status: 'Confirmed', color: '#10b981' },
    { time: '02:00 PM', name: 'Vikram Singh', purpose: 'Transfer Certificate', with: 'Registrar', status: 'Pending', color: '#3D5EE1' },
    { time: '03:00 PM', name: 'Mrs. Meena Nair', purpose: 'Counselling Session', with: 'Counsellor', status: 'Confirmed', color: '#10b981' },
];

const ReceptionistAppointments = () => {
    const [filter, setFilter] = useState('All');
    const list = filter === 'All' ? APPOINTMENTS : APPOINTMENTS.filter(a => a.status === filter);

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconCalendarEvent size={18} color="#10b981" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Today's Appointments</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    {['All', 'Confirmed', 'Pending', 'Waiting'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: filter === f ? '#3D5EE1' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {list.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 12, background: '#f8fafc', borderLeft: `4px solid ${a.color}`, transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'} onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <IconUser size={16} color={a.color} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#1f2937' }}>{a.name}</div>
                            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{a.purpose} · with {a.with}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6b7280', justifyContent: 'flex-end' }}>
                                <IconClock size={11} />{a.time}
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: `${a.color}15`, color: a.color, marginTop: 3, display: 'inline-block' }}>{a.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReceptionistAppointments;
