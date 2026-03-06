import React, { useState } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';
import './Dashboard.css';
import './RolesDashboard.css';

// ── Data ─────────────────────────────────────────────────────────────
const kpiCards = [
    { label: 'Total Students', value: '1,248', sub: '1,232 Active', icon: '👨‍🎓', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Total Staff', value: '87', sub: '82 Present Today', icon: '👩‍🏫', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Fee Collected', value: '₹4.82L', sub: 'This Month', icon: '💰', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Fee Pending', value: '₹1.24L', sub: 'Outstanding', icon: '⚠️', color: '#ea5455', bg: '#fce8e8' },
    { label: 'Attendance', value: '93.2%', sub: 'Today', icon: '✅', color: '#00cfe8', bg: '#e0f9fc' },
    { label: 'New Admissions', value: '14', sub: 'This Week', icon: '📝', color: '#7367f0', bg: '#efedfd' },
];

const attendanceData = [
    { day: 'Mon', students: 1180, staff: 82 },
    { day: 'Tue', students: 1205, staff: 84 },
    { day: 'Wed', students: 1120, staff: 80 },
    { day: 'Thu', students: 1190, staff: 85 },
    { day: 'Fri', students: 1148, staff: 79 },
    { day: 'Sat', students: 1080, staff: 71 },
];

const feeData = [
    { month: 'Oct', collected: 380000, due: 430000 },
    { month: 'Nov', collected: 350000, due: 400000 },
    { month: 'Dec', collected: 310000, due: 375000 },
    { month: 'Jan', collected: 440000, due: 470000 },
    { month: 'Feb', collected: 482300, due: 505000 },
    { month: 'Mar', collected: 510000, due: 530000 },
];

const genderData = [
    { name: 'Male', value: 672, color: '#3d5ee1' },
    { name: 'Female', value: 576, color: '#ff6b9d' },
];

const classStrength = [
    { class: 'I-V', students: 473 },
    { class: 'VI-VIII', students: 348 },
    { class: 'IX-X', students: 292 },
    { class: 'XI-XII', students: 135 },
];

const recentAdmissions = [
    { name: 'Arjun Sharma', class: 'X-A', date: '02 Mar', status: 'New' },
    { name: 'Priya Nair', class: 'VIII-B', date: '01 Mar', status: 'New' },
    { name: 'Ravi Kumar', class: 'VI-A', date: '28 Feb', status: 'Transfer' },
    { name: 'Sneha Patel', class: 'XI-B', date: '27 Feb', status: 'New' },
    { name: 'Karan Singh', class: 'IX-A', date: '25 Feb', status: 'New' },
];

const classWiseFee = [
    { class: 'Class X', collected: 92000, due: 18000, pct: 84 },
    { class: 'Class XI', collected: 65000, due: 12000, pct: 84 },
    { class: 'Class IX', collected: 78000, due: 22000, pct: 78 },
    { class: 'Class VIII', collected: 55000, due: 15000, pct: 79 },
    { class: 'Class VII', collected: 48000, due: 14000, pct: 77 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
                <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0' }}>
                        {p.name}: <strong>{typeof p.value === 'number' && p.value > 10000 ? `₹${p.value.toLocaleString()}` : p.value}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// ── Component ─────────────────────────────────────────────────────────
const BranchAdminDashboard = () => {
    const [feePeriod, setFeePeriod] = useState('6M');

    return (
        <div className="dashboard-page">
            {/* Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Branch Admin Dashboard</h4>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span className="current">Branch Admin Dashboard</span>
                    </nav>
                </div>
                <div className="page-header-actions">
                    <div className="rdb-branch-badge">
                        🏫 <strong>North Campus Branch</strong>
                    </div>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="rdb-kpi-grid">
                {kpiCards.map((k, i) => (
                    <div key={i} className="rdb-kpi-card dashboard-card">
                        <div className="rdb-kpi-icon" style={{ background: k.bg, color: k.color }}>{k.icon}</div>
                        <div className="rdb-kpi-info">
                            <p className="rdb-kpi-label">{k.label}</p>
                            <h3 className="rdb-kpi-value" style={{ color: k.color }}>{k.value}</h3>
                            <span className="rdb-kpi-sub">{k.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Row: Attendance trend + Gender ratio */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header">
                        <h5>Weekly Attendance (Students & Staff)</h5>
                        <div className="rdb-legend-row">
                            <span className="rdb-dot" style={{ background: '#3d5ee1' }} />Students
                            <span className="rdb-dot" style={{ background: '#ff9f43' }} />Staff
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={240}>
                            <AreaChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gradStu" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.18} />
                                        <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gradStaff" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff9f43" stopOpacity={0.18} />
                                        <stop offset="95%" stopColor="#ff9f43" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="students" name="Students" stroke="#3d5ee1" fill="url(#gradStu)" strokeWidth={2.5} dot={false} />
                                <Area type="monotone" dataKey="staff" name="Staff" stroke="#ff9f43" fill="url(#gradStaff)" strokeWidth={2.5} dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header"><h5>Student Gender Ratio</h5></div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={genderData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                                    {genderData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [`${v} students`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        {genderData.map((g, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, width: '100%' }}>
                                <span className="rdb-dot" style={{ background: g.color }} />
                                <span style={{ flex: 1, fontSize: 13 }}>{g.name}</span>
                                <strong>{g.value}</strong>
                                <span style={{ fontSize: 12, color: '#6e6b7b' }}>({Math.round(g.value / 1248 * 100)}%)</span>
                            </div>
                        ))}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, width: '100%' }}>
                            {classStrength.map((c, i) => (
                                <div key={i} className="rdb-class-chip">
                                    <span className="rdb-class-name">{c.class}</span>
                                    <strong>{c.students}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



            {/* Row: Recent Admissions */}
            <div className="dashboard-card dashboard-row">
                <div className="card-header">
                    <h5>Recent Admissions</h5>
                    <a href="#" className="view-all">View All →</a>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="rdb-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Date</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAdmissions.map((s, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><strong>{s.name}</strong></td>
                                    <td>{s.class}</td>
                                    <td>{s.date}</td>
                                    <td>
                                        <span className={`rdb-badge ${s.status === 'New' ? 'badge-blue' : 'badge-orange'}`}>{s.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="dashboard-footer">
                <p>Copyright © 2024 MindWhile. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BranchAdminDashboard;
