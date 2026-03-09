import React, { useState } from 'react';
import { IconCalendarEvent, IconClock, IconDoor } from '@tabler/icons-react';

const EXAMS = [
    { quarter: '1st Quarterly', subject: 'Mathematics', time: '01:30 - 02:15 PM', date: '06 May 2024', room: '15', color: '#3D5EE1', bg: '#eef2ff' },
    { quarter: '2nd Quarterly', subject: 'Physics', time: '01:30 - 02:15 PM', date: '07 May 2024', room: '15', color: '#10b981', bg: '#d1fae5' },
];

const StudentSchedules = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Schedules</h5>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#3D5EE1', background: '#eef2ff', padding: '4px 12px', borderRadius: 20 }}>Exams</span>
        </div>
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {EXAMS.map((exam, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: 14, background: exam.bg, border: `1px solid ${exam.color}25` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: exam.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{exam.quarter}</div>
                    <h6 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: '0 0 10px' }}>{exam.subject}</h6>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b7280' }}>
                            <IconClock size={13} color={exam.color} /> {exam.time}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b7280' }}>
                            <IconCalendarEvent size={13} color={exam.color} /> {exam.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6b7280' }}>
                            <IconDoor size={13} color={exam.color} /> Room No: {exam.room}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default StudentSchedules;
