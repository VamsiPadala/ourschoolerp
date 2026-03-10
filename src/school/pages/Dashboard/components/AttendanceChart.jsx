import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// ── Data ─────────────────────────────────────────────────────────────
const attendanceConfig = [
    {
        key: 'students',
        label: 'Students',
        icon: '👨‍🎓',
        color: '#3d5ee1',
        accentBg: '#eef1fd',
        total: 1248,
        present: 1163,
        absent: 62,
        late: 23,
        pct: 93.2,
    },
    {
        key: 'teachers',
        label: 'Teachers',
        icon: '👩‍🏫',
        color: '#28c76f',
        accentBg: '#e8faf1',
        total: 87,
        present: 82,
        absent: 3,
        late: 2,
        pct: 94.3,
    },
    {
        key: 'staff',
        label: 'Staff',
        icon: '👷',
        color: '#ff9f43',
        accentBg: '#fff5e6',
        total: 45,
        present: 41,
        absent: 3,
        late: 1,
        pct: 91.1,
    },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
        const item = payload[0].payload;
        return (
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 10,
                padding: '8px 12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                fontSize: 12
            }}>
                <p style={{ margin: 0, fontWeight: 700, color: item.color }}>{item.name}</p>
                <p style={{ margin: '2px 0 0', color: 'var(--text-primary)' }}>{item.count}</p>
            </div>
        );
    }
    return null;
};

const SingleAttendancePie = ({ config }) => {
    const { label, icon, color, accentBg, total, present, absent, late, pct } = config;

    const data = [
        { name: 'Present', count: present, value: present, color },
        { name: 'Absent', count: absent, value: absent, color: '#ea5455' },
        { name: 'Late', count: late, value: late, color: '#ff9f43' },
    ];

    return (
        <div className="att-pie-block">
            {/* Icon + Label */}
            <div className="att-pie-header">
                <span className="att-pie-icon" style={{ background: accentBg, color }}>{icon}</span>
                <div>
                    <p className="att-pie-title">{label}</p>
                    <p className="att-pie-total">Total: {total}</p>
                </div>
            </div>

            {/* Donut chart */}
            <div className="att-donut-wrap">
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={46}
                            outerRadius={68}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={2}
                            isAnimationActive={true}
                        >
                            {data.map((entry, i) => (
                                <Cell key={i} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="att-donut-center">
                    <span className="att-donut-pct" style={{ color }}>{pct}%</span>
                    <span className="att-donut-label">Present</span>
                </div>
            </div>

            {/* Stats row */}
            <div className="att-stats-row">
                <div className="att-stat-chip" style={{ background: `${color}15`, color }}>
                    <span className="att-stat-num">{present}</span>
                    <span className="att-stat-lbl">Present</span>
                </div>
                <div className="att-stat-chip" style={{ background: '#fce8e8', color: '#ea5455' }}>
                    <span className="att-stat-num">{absent}</span>
                    <span className="att-stat-lbl">Absent</span>
                </div>
                <div className="att-stat-chip" style={{ background: '#fff5e6', color: '#ff9f43' }}>
                    <span className="att-stat-num">{late}</span>
                    <span className="att-stat-lbl">Late</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="att-progress-bar-bg">
                <div
                    className="att-progress-bar-fill"
                    style={{ width: `${pct}%`, background: color }}
                />
            </div>
        </div>
    );
};

const AttendanceChart = () => {
    return (
        <div className="dashboard-card attendance-triple-card">
            <div className="card-header">
                <h5>Today's Attendance</h5>
                <span style={{
                    fontSize: 12,
                    background: '#e8faf1',
                    color: '#28c76f',
                    padding: '3px 10px',
                    borderRadius: 20,
                    fontWeight: 700
                }}>
                    📅 Live
                </span>
            </div>
            <div className="attendance-triple-grid">
                {attendanceConfig.map(cfg => (
                    <SingleAttendancePie key={cfg.key} config={cfg} />
                ))}
            </div>
        </div>
    );
};

export default AttendanceChart;
