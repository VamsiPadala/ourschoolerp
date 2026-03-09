import React, { useState } from 'react';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
// P = Present, A = Absent, H = Half-day, L = Late
const STATUS = ['P', 'P', 'L', 'P', 'P', 'P', 'H'];

const dayColor = (s) => ({
    P: { bg: '#d1fae5', color: '#065f46' },
    A: { bg: '#fee2e2', color: '#b91c1c' },
    H: { bg: '#fef3c7', color: '#92400e' },
    L: { bg: '#e0f2fe', color: '#0369a1' },
}[s] || { bg: '#f3f4f6', color: '#6b7280' });

const TeacherAttendance = () => {
    const [period, setPeriod] = useState('This Week');

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 24, height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <h4 style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Attendance</h4>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['This Week', 'Last Week', 'Last Month'].map(p => (
                        <button key={p} onClick={() => setPeriod(p)} style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: period === p ? '#3D5EE1' : '#f3f4f6', color: period === p ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Day bubbles */}
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 8 }}>Last 7 Days</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {DAYS.map((d, i) => {
                    const s = STATUS[i];
                    const { bg, color } = dayColor(s);
                    return (
                        <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 5 }}>{d}</div>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: bg, color, fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>{s}</div>
                        </div>
                    );
                })}
            </div>

            {/* Summary counts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                    { label: 'Present', value: 25, color: '#10b981', bg: '#d1fae5' },
                    { label: 'Absent', value: 2, color: '#ef4444', bg: '#fee2e2' },
                    { label: 'Half Day', value: 1, color: '#f59e0b', bg: '#fef3c7' },
                    { label: 'Late', value: 1, color: '#0ea5e9', bg: '#e0f2fe' },
                ].map(({ label, value, color, bg }) => (
                    <div key={label} style={{ background: bg, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 800, fontSize: 22, color }}>{value}</div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{label}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 14, fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
                No. of total working days: <strong style={{ color: '#374151' }}>28 Days</strong>
            </div>
        </div>
    );
};

export default TeacherAttendance;
