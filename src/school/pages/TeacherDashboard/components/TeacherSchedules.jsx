import React from 'react';
import { IconClock, IconMapPin } from '@tabler/icons-react';

const SCHEDULES = [
    { subject: 'Mathematics', class: 'Class V-B', time: '08:00 – 08:45', room: 'Room 12', color: '#3D5EE1' },
    { subject: 'Physics', class: 'Class IV-C', time: '09:00 – 09:45', room: 'Lab 2', color: '#10b981' },
    { subject: 'Chemistry', class: 'Class V-B', time: '10:00 – 10:45', room: 'Lab 1', color: '#f59e0b' },
    { subject: 'Mathematics', class: 'Class III-A', time: '11:00 – 11:45', room: 'Room 7', color: '#8b5cf6' },
    { subject: 'Physics Lab', class: 'Class V-B', time: '01:00 – 02:30', room: 'Lab 2', color: '#ec4899' },
];

const TeacherSchedules = () => {
    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h4 style={{ fontWeight: 700, fontSize: 15, color: '#1e1b4b', margin: 0 }}>Today's Schedule</h4>
                <a href="#" style={{ fontSize: 12, color: '#3D5EE1', fontWeight: 600, textDecoration: 'none' }}>+ Add New</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {SCHEDULES.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 12, background: '#f9fafb', borderLeft: `4px solid ${s.color}` }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#1e1b4b' }}>{s.subject}</div>
                            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{s.class}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 3 }}>
                                <IconClock size={11} /> {s.time}
                            </div>
                            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                                <IconMapPin size={11} /> {s.room}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherSchedules;
