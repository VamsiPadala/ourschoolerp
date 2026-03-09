import React from 'react';
import { IconMedal, IconCalendarEvent } from '@tabler/icons-react';

const students = [
    {
        name: 'Susan Boswell',
        class: 'III, B',
        percentage: 98,
        medal: 'gold',
        avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg',
    },
    {
        name: 'Richard Mayes',
        class: 'V, A',
        percentage: 98,
        medal: 'silver',
        avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg',
    },
    {
        name: 'Veronica Randle',
        class: 'V, B',
        percentage: 78,
        medal: null,
        avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg',
    },
];

const medalColor = { gold: '#f59e0b', silver: '#9ca3af', bronze: '#cd7f32' };

const StudentProgress = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #f1f5f9' }}>
            <h4 style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Student Progress</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b7280' }}>
                <IconCalendarEvent size={15} />
                <span>This Month</span>
            </div>
        </div>

        {/* Students grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {students.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: '1px solid #f1f5f9', background: '#fafbff' }}>
                    {/* Avatar */}
                    <div style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #e5e7eb' }}>
                        <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=3D5EE1&color=fff`; }}
                        />
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#1f2937', marginBottom: 1 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.class}</div>
                    </div>
                    {/* Percentage + Medal */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                        {s.medal && <IconMedal size={18} color={medalColor[s.medal]} />}
                        <span style={{
                            padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                            background: s.percentage >= 90 ? '#d1fae5' : '#dbeafe',
                            color: s.percentage >= 90 ? '#065f46' : '#1d4ed8',
                        }}>{s.percentage}%</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default StudentProgress;
