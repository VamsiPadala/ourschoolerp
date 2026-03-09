import React, { useState } from 'react';

const DAYS = [
    { day: 'Mon', letter: 'M', status: 'P' },
    { day: 'Tue', letter: 'T', status: 'P' },
    { day: 'Wed', letter: 'W', status: 'A' },
    { day: 'Thu', letter: 'T', status: 'P' },
    { day: 'Fri', letter: 'F', status: 'P' },
    { day: 'Sat', letter: 'S', status: 'P' },
    { day: 'Sun', letter: 'S', status: 'H' },
];

const STATUS_STYLE = {
    P: { bg: '#d1fae5', color: '#065f46', border: '#10b981' },
    A: { bg: '#fee2e2', color: '#b91c1c', border: '#ef4444' },
    H: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
};

const FILTERS = ['This Week', 'Last Week', 'Last Month'];

const StudentAttendance = () => {
    const [filter, setFilter] = useState('This Week');
    const stats = { total: 28, present: 25, absent: 2, halfday: 0 };

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Attendance</h5>
                <div style={{ display: 'flex', gap: 4 }}>
                    {FILTERS.map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: filter === f ? '#3D5EE1' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                {/* Stats row */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                    <div style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: 12, background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                        <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Working Days</div>
                        <div style={{ fontWeight: 800, fontSize: 20, color: '#1e1b4b' }}>{stats.total}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: 12, background: '#d1fae5', border: '1px solid #6ee7b7' }}>
                        <div style={{ fontSize: 11, color: '#064e3b', marginBottom: 4 }}>Present</div>
                        <div style={{ fontWeight: 800, fontSize: 20, color: '#065f46' }}>{stats.present}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: 12, background: '#fee2e2', border: '1px solid #fca5a5' }}>
                        <div style={{ fontSize: 11, color: '#7f1d1d', marginBottom: 4 }}>Absent</div>
                        <div style={{ fontWeight: 800, fontSize: 20, color: '#b91c1c' }}>{stats.absent}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: 12, background: '#fef3c7', border: '1px solid #fcd34d' }}>
                        <div style={{ fontSize: 11, color: '#78350f', marginBottom: 4 }}>Halfday</div>
                        <div style={{ fontWeight: 800, fontSize: 20, color: '#92400e' }}>{stats.halfday}</div>
                    </div>
                </div>

                {/* Day labels */}
                <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>Last 7 Days &nbsp; <span style={{ fontWeight: 400 }}>14 May 2024 — 21 May 2024</span></div>

                {/* Day bubbles */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                    {DAYS.map((d, i) => {
                        const s = STATUS_STYLE[d.status];
                        return (
                            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 5 }}>{d.letter}</div>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.bg, color: s.color, fontWeight: 800, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', border: `2px solid ${s.border}` }}>
                                    {d.status}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginBottom: 6 }}>
                        <span>Attendance Rate</span>
                        <span style={{ fontWeight: 700, color: '#10b981' }}>{Math.round((stats.present / stats.total) * 100)}%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(stats.present / stats.total) * 100}%`, background: 'linear-gradient(90deg,#3D5EE1,#10b981)', borderRadius: 99 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendance;
