import React, { useState } from 'react';
import {
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import './RolesDashboard.css';

// ── Data ─────────────────────────────────────────────────────────────
const kpiCards = [
    { label: 'Total Students', value: '1,248', sub: 'All Branches', icon: '👨‍🎓', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Total Staff', value: '87', sub: 'Teaching + Non-Teaching', icon: '👩‍🏫', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Branches', value: '3', sub: 'Under Management', icon: '🏫', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Revenue YTD', value: '₹54.1L', sub: 'Apr 2024 – Feb 2025', icon: '💰', color: '#7367f0', bg: '#efedfd' },
    { label: 'Fee Collection', value: '88.3%', sub: 'This Quarter', icon: '✅', color: '#00cfe8', bg: '#e0f9fc' },
    { label: 'Exam Pass Rate', value: '94.2%', sub: 'Last Term', icon: '🏆', color: '#ea5455', bg: '#fce8e8' },
];

const monthlyRevenue = [
    { month: 'Apr', revenue: 410000, expense: 95000 },
    { month: 'May', revenue: 420000, expense: 102000 },
    { month: 'Jun', revenue: 395000, expense: 110000 },
    { month: 'Jul', revenue: 450000, expense: 98000 },
    { month: 'Aug', revenue: 480000, expense: 115000 },
    { month: 'Sep', revenue: 430000, expense: 108000 },
    { month: 'Oct', revenue: 510000, expense: 130000 },
    { month: 'Nov', revenue: 400000, expense: 120000 },
    { month: 'Dec', revenue: 375000, expense: 140000 },
    { month: 'Jan', revenue: 470000, expense: 112000 },
    { month: 'Feb', revenue: 505000, expense: 123450 },
];

const branchPerformance = [
    { branch: 'North Campus', students: 520, fee: 88, score: 91 },
    { branch: 'South Campus', students: 448, fee: 85, score: 89 },
    { branch: 'East Campus', students: 280, fee: 92, score: 94 },
];

const examResultData = [
    { name: 'A+ (90+)', value: 220, color: '#28c76f' },
    { name: 'A (80-90)', value: 340, color: '#3d5ee1' },
    { name: 'B (70-79)', value: 280, color: '#ff9f43' },
    { name: 'C (60-69)', value: 180, color: '#00cfe8' },
    { name: 'D (50-59)', value: 130, color: '#7367f0' },
    { name: 'F (<50)', value: 98, color: '#ea5455' },
];

const topTeachers = [
    { name: 'Dr. Meera Iyer', subject: 'Mathematics', rating: 4.9, avatar: '👩‍🏫', bg: '#eef1fd', color: '#3d5ee1' },
    { name: 'Mr. Suresh Rajan', subject: 'Physics', rating: 4.8, avatar: '👨‍🔬', bg: '#e8faf1', color: '#28c76f' },
    { name: 'Ms. Priya Sinha', subject: 'English', rating: 4.7, avatar: '👩‍💼', bg: '#fff5e6', color: '#ff9f43' },
    { name: 'Dr. Kiran Nair', subject: 'Chemistry', rating: 4.7, avatar: '🧪', bg: '#efedfd', color: '#7367f0' },
];

const recentActivities = [
    { title: 'Board Meeting – Q2 Results', time: '2h ago', icon: '📋', bg: '#eef1fd', color: '#3d5ee1' },
    { title: 'Annual Sports Day Approved', time: '5h ago', icon: '🏅', bg: '#e8faf1', color: '#28c76f' },
    { title: 'New Teacher Recruitment', time: '1d ago', icon: '👩‍🏫', bg: '#fff5e6', color: '#ff9f43' },
    { title: 'Annual Budget Reviewed', time: '2d ago', icon: '💰', bg: '#fce8e8', color: '#ea5455' },
    { title: 'Parent Meeting Scheduled', time: '3d ago', icon: '🤝', bg: '#efedfd', color: '#7367f0' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
                <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0' }}>
                        {p.name}: <strong>₹{p.value.toLocaleString()}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const PrincipalDashboard = () => {
    const [period, setPeriod] = useState('This Year');

    return (
        <div className="dashboard-page">
            {/* Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Principal Dashboard</h4>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span className="current">Principal Dashboard</span>
                    </nav>
                </div>
                <div className="page-header-actions">
                    <div className="period-toggle">
                        {['This Month', 'This Quarter', 'This Year'].map(p => (
                            <button key={p} className={`period-btn ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
                        ))}
                    </div>
                    <button className="btn btn-primary">📥 Export Report</button>
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

            {/* Row: Revenue + Exam Results */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header">
                        <h5>Yearly Revenue vs Expense</h5>
                        <div className="rdb-legend-row">
                            <span className="rdb-dot" style={{ background: '#3d5ee1' }} />Revenue
                            <span className="rdb-dot" style={{ background: '#ea5455' }} />Expense
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ea5455" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#ea5455" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3d5ee1" fill="url(#gRev)" strokeWidth={2.5} dot={false} />
                                <Area type="monotone" dataKey="expense" name="Expense" stroke="#ea5455" fill="url(#gExp)" strokeWidth={2.5} dot={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header"><h5>Exam Result Distribution</h5></div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={examResultData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                    {examResultData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v, n) => [`${v} students`, n]} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', justifyContent: 'center', marginTop: 8 }}>
                            {examResultData.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
                                    <span className="rdb-dot" style={{ background: item.color }} />
                                    <span>{item.name}: <strong>{item.value}</strong></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Row: Branch Performance + Top Teachers + Activity */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header"><h5>Branch-wise Performance</h5></div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="rdb-table">
                            <thead>
                                <tr>
                                    <th>Branch</th>
                                    <th>Students</th>
                                    <th>Fee Coll%</th>
                                    <th>Exam Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {branchPerformance.map((b, i) => (
                                    <tr key={i}>
                                        <td><strong>{b.branch}</strong></td>
                                        <td>{b.students}</td>
                                        <td><span className="rdb-badge badge-blue">{b.fee}%</span></td>
                                        <td><span className="rdb-badge badge-green">{b.score}%</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Bar chart below */}
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={120}>
                            <BarChart data={branchPerformance} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="branch" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={false} />
                                <Tooltip />
                                <Bar dataKey="students" name="Students" fill="#3d5ee1" radius={[4, 4, 0, 0]} barSize={28} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header"><h5>Top Teachers</h5></div>
                    <div className="card-body" style={{ paddingTop: 8 }}>
                        {topTeachers.map((t, i) => (
                            <div key={i} className="rdb-staff-item" style={{ marginBottom: 8 }}>
                                <div className="rdb-staff-avatar" style={{ background: t.bg, color: t.color }}>{t.avatar}</div>
                                <div className="rdb-staff-meta">
                                    <div className="rdb-staff-name">{t.name}</div>
                                    <div className="rdb-staff-dept">{t.subject}</div>
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#ff9f43' }}>⭐ {t.rating}</span>
                            </div>
                        ))}
                    </div>
                </div>

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

            <footer className="dashboard-footer">
                <p>Copyright © 2024 MindWhile. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PrincipalDashboard;
