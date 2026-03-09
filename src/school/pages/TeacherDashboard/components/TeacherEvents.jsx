import React, { useState } from 'react';
import { IconCalendarEvent, IconClock, IconMapPin } from '@tabler/icons-react';

const EVENTS = [
    { title: 'Vacation Meeting', date: '07 July 2024', time: '09:10 AM – 10:50 AM', color: '#3D5EE1', bg: '#eef2ff' },
    { title: 'Parents–Teacher Meet', date: '15 July 2024', time: '09:10 AM – 10:50 AM', color: '#10b981', bg: '#d1fae5' },
    { title: 'Staff Meeting', date: '10 July 2024', time: '09:10 AM – 10:50 AM', color: '#f59e0b', bg: '#fef3c7' },
    { title: 'Admission Camp', date: '12 July 2024', time: '09:10 AM – 10:50 AM', color: '#ec4899', bg: '#fce7f3' },
    { title: 'Science Exhibition', date: '20 July 2024', time: '10:00 AM – 01:00 PM', color: '#8b5cf6', bg: '#ede9fe' },
];

const TeacherEvents = () => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h4 style={{ fontWeight: 700, fontSize: 15, color: '#1e1b4b', margin: 0 }}>Upcoming Events</h4>
                <a href="#" style={{ fontSize: 12, color: '#3D5EE1', fontWeight: 600, textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {EVENTS.map((ev, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 12, background: ev.bg, border: `1px solid ${ev.color}22` }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: ev.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <IconCalendarEvent size={18} color="white" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#1e1b4b', marginBottom: 2 }}>{ev.title}</div>
                            <div style={{ fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <IconClock size={11} /> {ev.time}
                            </div>
                            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{ev.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherEvents;
