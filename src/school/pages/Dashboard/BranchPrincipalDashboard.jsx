import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import './RolesDashboard.css';

const kpiCards = [
    { label: 'Branch Students', value: '520', sub: 'North Campus', icon: '👨‍🎓', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Teachers', value: '34', sub: '32 Active Today', icon: '👩‍🏫', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Attendance', value: '91.8%', sub: 'Today', icon: '✅', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Fee Collection', value: '88%', sub: 'This Month', icon: '💰', color: '#7367f0', bg: '#efedfd' },
    { label: 'Avg Exam Score', value: '78.4%', sub: 'Last Term', icon: '📊', color: '#00cfe8', bg: '#e0f9fc' },
    { label: 'Open Complaints', value: '3', sub: 'Pending Review', icon: '📝', color: '#ea5455', bg: '#fce8e8' },
];

const weeklyAttendance = [
    { day: 'Mon', pct: 92 }, { day: 'Tue', pct: 94 }, { day: 'Wed', pct: 89 },
    { day: 'Thu', pct: 93 }, { day: 'Fri', pct: 91 }, { day: 'Sat', pct: 82 },
];

const classPassRate = [
    { class: 'VI', pass: 96 }, { class: 'VII', pass: 92 }, { class: 'VIII', pass: 88 },
    { class: 'IX', pass: 85 }, { class: 'X', pass: 82 }, { class: 'XI', pass: 80 }, { class: 'XII', pass: 84 },
];

const genderData = [
    { name: 'Male', value: 285, color: '#3d5ee1' },
    { name: 'Female', value: 235, color: '#ff6b9d' },
];

const notices = [
    { text: 'Branch Review Meeting – Mar 6', color: '#3d5ee1', date: 'Mar 04' },
    { text: 'Science Exhibition – Mar 12', color: '#28c76f', date: 'Mar 04' },
    { text: 'Parent-Teacher Meet – Mar 10', color: '#ff9f43', date: 'Mar 03' },
    { text: 'Exam Timetable Released', color: '#ea5455', date: 'Mar 02' },
];

const topStudents = [
    { name: 'Anjali Sharma', class: 'XII-A', score: 97.4, avatar: '👩‍🎓', bg: '#eef1fd', color: '#3d5ee1' },
    { name: 'Rohit Menon', class: 'X-B', score: 95.8, avatar: '👨‍🎓', bg: '#e8faf1', color: '#28c76f' },
    { name: 'Fatima Sheikh', class: 'XI-A', score: 94.2, avatar: '👩‍🎓', bg: '#fff5e6', color: '#ff9f43' },
    { name: 'Aditya Kumar', class: 'X-A', score: 93.5, avatar: '👨‍🎓', bg: '#efedfd', color: '#7367f0' },
];

const BranchPrincipalDashboard = () => (
    <div className="dashboard-page">
        <div className="page-header">
            <div className="page-title">
                <h4>Branch Principal Dashboard</h4>
                <nav className="breadcrumb"><span>Dashboard</span> / <span className="current">Branch Principal Dashboard</span></nav>
            </div>
            <div className="page-header-actions">
                <div className="rdb-branch-badge">🏫 <strong>North Campus</strong></div>
                <button className="btn btn-primary">📊 View Reports</button>
            </div>
        </div>

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

        <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
            <div className="dashboard-card">
                <div className="card-header"><h5>Weekly Attendance (%)</h5></div>
                <div className="card-body" style={{ paddingTop: 0 }}>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={weeklyAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gAtnd" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} domain={[70, 100]} />
                            <Tooltip formatter={(v) => [`${v}%`, 'Attendance']} />
                            <Area type="monotone" dataKey="pct" name="Attendance %" stroke="#3d5ee1" fill="url(#gAtnd)" strokeWidth={2.5} dot={{ r: 4, fill: '#3d5ee1' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="dashboard-card">
                <div className="card-header"><h5>Student Ratio</h5></div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 0 }}>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie isAnimationActive={false} data={genderData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                                {genderData.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Tooltip formatter={(v) => [`${v} students`, '']} />
                        </PieChart>
                    </ResponsiveContainer>
                    {genderData.map((g, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, width: '100%' }}>
                            <span className="rdb-dot" style={{ background: g.color }} />
                            <span style={{ flex: 1, fontSize: 13 }}>{g.name}</span>
                            <strong>{g.value}</strong>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dashboard-card">
                <div className="card-header"><h5>Notice Board</h5></div>
                <div className="card-body" style={{ paddingTop: 8 }}>
                    <ul className="rdb-notice-list">
                        {notices.map((n, i) => (
                            <li key={i} className="rdb-notice-item">
                                <span className="rdb-notice-dot" style={{ background: n.color }} />
                                <div className="rdb-notice-content">
                                    <p className="rdb-notice-title">{n.text}</p>
                                    <span className="rdb-notice-date">{n.date}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr', gap: 16 }}>
            <div className="dashboard-card">
                <div className="card-header"><h5>Class-wise Pass Rate (%)</h5></div>
                <div className="card-body" style={{ paddingTop: 0 }}>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={classPassRate} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                            <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} domain={[70, 100]} />
                            <Tooltip formatter={(v) => [`${v}%`, 'Pass Rate']} />
                            <Bar dataKey="pass" name="Pass Rate" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={28} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="dashboard-card">
                <div className="card-header"><h5>Top Students</h5></div>
                <div className="card-body" style={{ paddingTop: 8 }}>
                    {topStudents.map((s, i) => (
                        <div key={i} className="rdb-staff-item" style={{ marginBottom: 8 }}>
                            <div className="rdb-staff-avatar" style={{ background: s.bg, color: s.color }}>{s.avatar}</div>
                            <div className="rdb-staff-meta">
                                <div className="rdb-staff-name">{s.name}</div>
                                <div className="rdb-staff-dept">{s.class}</div>
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#ff9f43' }}>⭐ {s.score}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <footer className="dashboard-footer"><p>Copyright © 2024 MindWhile. All rights reserved.</p></footer>
    </div>
);

export default BranchPrincipalDashboard;
