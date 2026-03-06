import React, { useState } from 'react';
import {
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar,
    PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import '../Dashboard/Dashboard.css';
import '../Dashboard/RolesDashboard.css';
import './TeacherDashboard.css';

// ── DATA ─────────────────────────────────────────────────────────────
const kpiCards = [
    { label: 'My Students', value: '186', sub: '6 Classes', icon: '👨‍🎓', color: '#3d5ee1', bg: '#eef1fd' },
    { label: "Today's Classes", value: '5', sub: '2 Remaining', icon: '📖', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Attendance Rate', value: '94.2%', sub: 'This Month', icon: '✅', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Avg Class Score', value: '78.4%', sub: 'Last Exam', icon: '📊', color: '#7367f0', bg: '#efedfd' },
    { label: 'Homework Due', value: '3', sub: 'Pending Review', icon: '📝', color: '#00cfe8', bg: '#e0f9fc' },
    { label: 'Leave Balance', value: '12', sub: 'Days Remaining', icon: '🏖️', color: '#ea5455', bg: '#fce8e8' },
];

const todaysClasses = [
    { time: '08:30 AM', subject: 'Mathematics', class: 'X-A', room: 'R-101', done: true },
    { time: '10:00 AM', subject: 'Mathematics', class: 'IX-B', room: 'R-102', done: true },
    { time: '11:30 AM', subject: 'Mathematics', class: 'X-B', room: 'R-101', done: true },
    { time: '01:00 PM', subject: 'Mathematics', class: 'VIII-A', room: 'R-103', done: false },
    { time: '02:30 PM', subject: 'Mathematics', class: 'XI-A', room: 'R-105', done: false },
];

const weeklyAttendance = [
    { day: 'Mon', pct: 96 }, { day: 'Tue', pct: 94 }, { day: 'Wed', pct: 91 },
    { day: 'Thu', pct: 95 }, { day: 'Fri', pct: 92 }, { day: 'Sat', pct: 86 },
];

const classPerformance = [
    { class: 'VIII-A', avg: 74 }, { class: 'IX-B', avg: 79 },
    { class: 'X-A', avg: 83 }, { class: 'X-B', avg: 78 },
    { class: 'XI-A', avg: 76 }, { class: 'XII-A', avg: 82 },
];

const gradeDistribution = [
    { name: 'A+ (90+)', value: 32, color: '#28c76f' },
    { name: 'A (80-89)', value: 48, color: '#3d5ee1' },
    { name: 'B (70-79)', value: 54, color: '#ff9f43' },
    { name: 'C (60-69)', value: 30, color: '#00cfe8' },
    { name: 'D (<60)', value: 22, color: '#ea5455' },
];

const topStudents = [
    { name: 'Anjali Sharma', class: 'X-A', score: 97, avatar: '👩‍🎓', bg: '#eef1fd', color: '#3d5ee1' },
    { name: 'Rohit Menon', class: 'XII-A', score: 95, avatar: '👨‍🎓', bg: '#e8faf1', color: '#28c76f' },
    { name: 'Fatima Sheikh', class: 'XI-A', score: 93, avatar: '👩‍🎓', bg: '#fff5e6', color: '#ff9f43' },
    { name: 'Aditya Kumar', class: 'X-B', score: 91, avatar: '👨‍🎓', bg: '#efedfd', color: '#7367f0' },
    { name: 'Priya Rao', class: 'IX-B', score: 89, avatar: '👩‍🎓', bg: '#e0f9fc', color: '#00cfe8' },
];

const pendingHomework = [
    { title: 'Chapter 8 – Quadratic Equations', class: 'X-A', due: 'Mar 05', submitted: 28, total: 38 },
    { title: 'Chapter 6 – Trigonometry', class: 'XI-A', due: 'Mar 06', submitted: 22, total: 32 },
    { title: 'Chapter 3 – Coordinate Geometry', class: 'IX-B', due: 'Mar 07', submitted: 30, total: 35 },
];

const syllabusProgress = [
    { class: 'X-A', pct: 78, color: '#3d5ee1' },
    { class: 'X-B', pct: 72, color: '#28c76f' },
    { class: 'IX-B', pct: 85, color: '#ff9f43' },
    { class: 'VIII-A', pct: 91, color: '#7367f0' },
    { class: 'XI-A', pct: 65, color: '#ea5455' },
    { class: 'XII-A', pct: 60, color: '#00cfe8' },
];

const recentActivities = [
    { title: 'Marked attendance for X-A', time: '08:35 AM', icon: '✅', bg: '#e8faf1', color: '#28c76f' },
    { title: 'Uploaded marks for IX-B', time: '10:15 AM', icon: '📊', bg: '#efedfd', color: '#7367f0' },
    { title: 'New homework added for X-B', time: '11:50 AM', icon: '📝', bg: '#e0f9fc', color: '#00cfe8' },
    { title: 'Leave request submitted', time: '12:30 PM', icon: '🏖️', bg: '#fff5e6', color: '#ff9f43' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
                <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0' }}>{p.name}: <strong>{p.value}{typeof p.value === 'number' && p.value < 200 ? '%' : ''}</strong></p>
                ))}
            </div>
        );
    }
    return null;
};

// ── COMPONENT ─────────────────────────────────────────────────────────
const TeacherDashboard = () => {
    const [currentTab, setCurrentTab] = useState('overview');
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

    return (
        <div className="dashboard-page">
            {/* Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Teacher Dashboard</h4>
                    <nav className="breadcrumb"><span>Dashboard</span> / <span className="current">Teacher Dashboard</span></nav>
                </div>
                <div className="page-header-actions">
                    <button className="btn btn-outline">📅 My Schedule</button>
                    <button className="btn btn-primary">+ Add Homework</button>
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="tdb-welcome-banner dashboard-row">
                <div className="tdb-welcome-left">
                    <div className="tdb-avatar">👩‍🏫</div>
                    <div className="tdb-welcome-text">
                        <p className="tdb-greeting">{greeting},</p>
                        <h3 className="tdb-name">Dr. Meera Iyer</h3>
                        <p className="tdb-role">Mathematics Teacher · North Campus</p>
                        <div className="tdb-welcome-stats">
                            <span>📖 6 Classes Today</span>
                            <span>👨‍🎓 186 Students</span>
                            <span>⭐ 4.9 Rating</span>
                        </div>
                    </div>
                </div>
                <div className="tdb-welcome-right">
                    <div className="tdb-quote">
                        <span className="tdb-quote-icon">💡</span>
                        <p>"Education is not the filling of a pail, but the lighting of a fire."</p>
                    </div>
                    <div className="tdb-quick-actions">
                        <button className="tdb-quick-btn" style={{ background: '#eef1fd', color: '#3d5ee1' }}>📊 Take Attendance</button>
                        <button className="tdb-quick-btn" style={{ background: '#e8faf1', color: '#28c76f' }}>📝 Add Marks</button>
                        <button className="tdb-quick-btn" style={{ background: '#fff5e6', color: '#ff9f43' }}>📬 Send Notice</button>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="rdb-kpi-grid">
                {kpiCards.map((k, i) => (
                    <div key={i} className="rdb-kpi-card dashboard-card tdb-kpi-animated" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="rdb-kpi-icon" style={{ background: k.bg, color: k.color }}>{k.icon}</div>
                        <div className="rdb-kpi-info">
                            <p className="rdb-kpi-label">{k.label}</p>
                            <h3 className="rdb-kpi-value" style={{ color: k.color }}>{k.value}</h3>
                            <span className="rdb-kpi-sub">{k.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Row: Today's Schedule + Attendance + Grade Distribution */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr', gap: 16 }}>
                {/* Today's Schedule */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h5>Today's Schedule</h5>
                        <span className="rdb-badge badge-blue">5 Classes</span>
                    </div>
                    <div className="card-body" style={{ paddingTop: 8 }}>
                        {todaysClasses.map((cls, i) => (
                            <div key={i} className="tdb-class-item" style={{ borderLeft: `3px solid ${cls.done ? '#28c76f' : '#3d5ee1'}` }}>
                                <div className="tdb-class-time">{cls.time}</div>
                                <div className="tdb-class-info">
                                    <strong>{cls.subject}</strong>
                                    <span>{cls.class} · {cls.room}</span>
                                </div>
                                <span className={`rdb-badge ${cls.done ? 'badge-green' : 'badge-blue'}`}>
                                    {cls.done ? '✓ Done' : '▶ Next'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Attendance Chart */}
                <div className="dashboard-card">
                    <div className="card-header"><h5>Weekly Student Attendance (%)</h5></div>
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={240}>
                            <AreaChart data={weeklyAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gTchAtnd" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} domain={[80, 100]} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="pct" name="Attendance" stroke="#3d5ee1" fill="url(#gTchAtnd)" strokeWidth={2.5} dot={{ r: 5, fill: '#3d5ee1', strokeWidth: 2, stroke: '#fff' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Grade Distribution */}
                <div className="dashboard-card">
                    <div className="card-header"><h5>Grade Distribution</h5></div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={gradeDistribution} cx="50%" cy="50%" outerRadius={70} dataKey="value"
                                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                    {gradeDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v, n) => [`${v} students`, n]} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {gradeDistribution.map((g, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12 }}>
                                    <span className="rdb-dot" style={{ background: g.color }} />
                                    <span style={{ flex: 1 }}>{g.name}</span>
                                    <strong>{g.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Row: Class Performance + Top Students + Activity */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', gap: 16 }}>
                {/* Class Performance */}
                <div className="dashboard-card">
                    <div className="card-header"><h5>Class-wise Average Score (%)</h5></div>
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={classPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} domain={[60, 100]} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="avg" name="Avg Score" radius={[6, 6, 0, 0]} barSize={24}>
                                    {classPerformance.map((entry, i) => (
                                        <Cell key={i} fill={entry.avg >= 80 ? '#28c76f' : entry.avg >= 75 ? '#ff9f43' : '#ea5455'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Students */}
                <div className="dashboard-card">
                    <div className="card-header"><h5>Top Performers</h5></div>
                    <div className="card-body" style={{ paddingTop: 8 }}>
                        {topStudents.map((s, i) => (
                            <div key={i} className="rdb-staff-item" style={{ marginBottom: 8 }}>
                                <div className="tdb-rank-badge">{i + 1}</div>
                                <div className="rdb-staff-avatar" style={{ background: s.bg, color: s.color }}>{s.avatar}</div>
                                <div className="rdb-staff-meta">
                                    <div className="rdb-staff-name">{s.name}</div>
                                    <div className="rdb-staff-dept">{s.class}</div>
                                </div>
                                <span className="rdb-badge badge-green">{s.score}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="dashboard-card">
                    <div className="card-header"><h5>Recent Activity</h5></div>
                    <div className="card-body" style={{ paddingTop: 8 }}>
                        <ul className="rdb-activity-list">
                            {recentActivities.map((a, i) => (
                                <li key={i} className="rdb-activity-item">
                                    <div className="rdb-activity-icon" style={{ background: a.bg, color: a.color }}>{a.icon}</div>
                                    <div className="rdb-activity-content">
                                        <p className="rdb-activity-title">{a.title}</p>
                                        <span className="rdb-activity-time">{a.time}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Row: Pending Homework + Syllabus Progress */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header">
                        <h5>Pending Homework Reviews</h5>
                        <span className="rdb-badge badge-orange">3 Pending</span>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="rdb-table">
                            <thead>
                                <tr><th>Topic</th><th>Class</th><th>Due</th><th>Submitted</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                {pendingHomework.map((hw, i) => {
                                    const pct = Math.round(hw.submitted / hw.total * 100);
                                    return (
                                        <tr key={i}>
                                            <td><strong>{hw.title}</strong></td>
                                            <td><span className="rdb-badge badge-blue">{hw.class}</span></td>
                                            <td style={{ fontSize: 12 }}>{hw.due}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <div style={{ width: 60, height: 5, background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden' }}>
                                                        <div style={{ width: `${pct}%`, height: '100%', background: '#3d5ee1', borderRadius: 3 }} />
                                                    </div>
                                                    <span style={{ fontSize: 12 }}>{hw.submitted}/{hw.total}</span>
                                                </div>
                                            </td>
                                            <td><button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: 12 }}>Review</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header"><h5>Syllabus Completion</h5></div>
                    <div className="card-body" style={{ paddingTop: 8 }}>
                        {syllabusProgress.map((s, i) => (
                            <div key={i} className="rdb-fee-row">
                                <div className="rdb-fee-meta">
                                    <span className="rdb-fee-class">{s.class}</span>
                                    <span className="rdb-fee-pct" style={{ color: s.color }}>{s.pct}%</span>
                                </div>
                                <div className="rdb-fee-bar-bg">
                                    <div className="rdb-fee-bar-fill" style={{ width: `${s.pct}%`, background: s.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="dashboard-footer"><p>Copyright © 2024 MindWhile. All rights reserved.</p></footer>
        </div>
    );
};

export default TeacherDashboard;
