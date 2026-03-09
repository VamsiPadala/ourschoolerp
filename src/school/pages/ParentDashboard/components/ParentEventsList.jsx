import React from 'react';
import { IconCalendarEvent } from '@tabler/icons-react';

const EVENTS = [
    { title: 'Parents, Teacher Meet', date: '15 July 2024', type: 'Full Day', color: '#3D5EE1', bg: '#eef2ff' },
    { title: 'Farewell', date: '11 Mar 2024', type: 'Half Day', color: '#f59e0b', bg: '#fef3c7' },
    { title: 'Annual Day', date: '11 Mar 2024', type: 'Full Day', color: '#10b981', bg: '#d1fae5' },
    { title: 'Holi Celebration', date: '15 July 2024', type: 'Full Day', color: '#ec4899', bg: '#fce7f3' },
    { title: 'Exam Result', date: '16 July 2024', type: 'Half Day', color: '#8b5cf6', bg: '#ede9fe' },
];

const ParentEventsList = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconCalendarEvent size={18} color="#ec4899" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b' }}>Events List</span>
            </div>
            <a href="#" style={{ fontSize: 12, color: '#3D5EE1', fontWeight: 600, textDecoration: 'none' }}>View All</a>
        </div>
        <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {EVENTS.map((ev, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: ev.bg, border: `1px solid ${ev.color}22` }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: ev.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <IconCalendarEvent size={16} color="white" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#1e1b4b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.title}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{ev.date}</div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: 'white', color: ev.color, flexShrink: 0 }}>{ev.type}</span>
                </div>
            ))}
        </div>
    </div>
);

export default ParentEventsList;
