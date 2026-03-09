import React from 'react';

const DAYS = [
    { day: 'M', status: 'P' }, { day: 'T', status: 'P' }, { day: 'W', status: 'A' },
    { day: 'T', status: 'P' }, { day: 'F', status: 'P' }, { day: 'S', status: 'P' }, { day: 'S', status: 'H' },
];
const dayStyle = { P: ['#d1fae5', '#065f46'], A: ['#fee2e2', '#b91c1c'], H: ['#fef3c7', '#92400e'] };

const ParentWeeklyAttendance = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b' }}>This Week's Attendance</span>
        </div>
        <div style={{ padding: '16px 20px' }}>
            {/* Day bubbles */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between', marginBottom: 16 }}>
                {DAYS.map((d, i) => {
                    const [bg, color] = dayStyle[d.status] || ['#f3f4f6', '#6b7280'];
                    return (
                        <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 5 }}>{d.day}</div>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: bg, color, fontWeight: 800, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: `2px solid ${color}33` }}>{d.status}</div>
                        </div>
                    );
                })}
            </div>
            {/* Summary tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[['25', 'Present', '#d1fae5', '#065f46'], ['2', 'Absent', '#fee2e2', '#b91c1c'], ['1', 'Half Day', '#fef3c7', '#92400e']].map(([v, l, bg, c]) => (
                    <div key={l} style={{ background: bg, borderRadius: 10, padding: '10px 6px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 800, fontSize: 20, color: c }}>{v}</div>
                        <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{l}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ParentWeeklyAttendance;
