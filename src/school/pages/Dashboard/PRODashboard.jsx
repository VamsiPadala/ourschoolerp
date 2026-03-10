import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import './RolesDashboard.css';

const PRO_STATIC = {
    name: 'Siddharth Roy',
    role: 'Chief Public Relations Officer',
    email: 'siddharth.roy@mindwhile.com',
    phone: '+91 98765 12345',
    joinDate: '15 Aug 2022',
    branch: 'Main Campus',
};

const kpiCards = [
    { label: 'New Enquiries', value: '145', sub: '+12% This Week', icon: '📈', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Social Reach', value: '52K', sub: '+5% This Month', icon: '🌐', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Active Campaigns', value: '4', sub: 'Running Now', icon: '📢', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Pending Complaints', value: '7', sub: 'Needs Attention', icon: '⚠️', color: '#ea5455', bg: '#fce8e8' },
    { label: 'Alumni Network', value: '1,250', sub: 'Registered', icon: '🤝', color: '#7367f0', bg: '#efedfd' },
    { label: 'Total Events', value: '8', sub: 'This Semester', icon: '🎫', color: '#00cfe8', bg: '#e0f9fc' },
];

const admissionTrends = [
    { month: 'Jan', enquiries: 400, admissions: 240 },
    { month: 'Feb', enquiries: 300, admissions: 139 },
    { month: 'Mar', enquiries: 200, admissions: 980 },
    { month: 'Apr', enquiries: 278, admissions: 390 },
    { month: 'May', enquiries: 189, admissions: 480 },
    { month: 'Jun', enquiries: 239, admissions: 380 },
    { month: 'Jul', enquiries: 349, admissions: 430 },
];

const leadSources = [
    { name: 'Social Media', value: 400, color: '#3d5ee1' },
    { name: 'Website', value: 300, color: '#00cfe8' },
    { name: 'Referrals', value: 300, color: '#28c76f' },
    { name: 'Walk-ins', value: 200, color: '#ff9f43' },
];

const campaignPerformance = [
    { name: 'Summer Camp', reach: 4000, conversion: 240 },
    { name: 'Scholarship', reach: 3000, conversion: 139 },
    { name: 'Campus Tour', reach: 2000, conversion: 98 },
    { name: 'Alumni Meet', reach: 2780, conversion: 390 },
];

const upcomingEvents = [
    { text: 'Annual Science Fair', color: '#3d5ee1', date: 'Mar 15' },
    { text: 'Alumni Meet 2026', color: '#28c76f', date: 'Mar 22' },
    { text: 'Press Conference', color: '#ff9f43', date: 'Apr 05' },
    { text: 'Career Guidance Seminar', color: '#ea5455', date: 'Apr 12' },
];

const recentFeedback = [
    { user: 'Rohan (Parent)', subject: 'Transport Delay', status: 'Pending', avatar: '👤', bg: '#fce8e8', color: '#ea5455' },
    { user: 'Sneha (Student)', subject: 'Library Hours Extension', status: 'Resolved', avatar: '👩‍🎓', bg: '#e8faf1', color: '#28c76f' },
    { user: 'Amit (Alumni)', subject: 'Reunion Suggestions', status: 'In Progress', avatar: '👨‍🎓', bg: '#fff5e6', color: '#ff9f43' },
    { user: 'Priya (Parent)', subject: 'Fee Payment Issue', status: 'Resolved', avatar: '👤', bg: '#efedfd', color: '#7367f0' },
];

const PRODashboard = () => (
    <div className="dashboard-page">
        <div className="page-header">
            <div className="page-title">
                <h4>PRO Dashboard</h4>
                <nav className="breadcrumb"><span>Dashboard</span> / <span className="current">Public Relations Officer</span></nav>
            </div>
            <div className="page-header-actions">
                <button className="btn btn-outline-primary" style={{ marginRight: '10px' }}>📢 Post Announcement</button>
                <button className="btn btn-primary">📊 Generate PR Report</button>
            </div>
        </div>

        {/* ── Individual PRO Info Card ── */}
        <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderRadius: '20px',
            padding: '20px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 30px rgba(30, 41, 59, 0.2)',
            color: '#fff',
            flexWrap: 'wrap',
            gap: '15px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div style={{
                    width: '60px', height: '60px', borderRadius: '16px',
                    background: 'linear-gradient(135deg, #3d5ee1, #7367f0)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', fontWeight: '800', boxShadow: '0 4px 15px rgba(61, 94, 225, 0.4)'
                }}>
                    {PRO_STATIC.name.charAt(0)}
                </div>
                <div>
                    <h5 style={{ margin: '0 0 3px 0', fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                        {PRO_STATIC.name}
                    </h5>
                    <p style={{ margin: '2px 0', fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)' }}>
                        <strong>{PRO_STATIC.role}</strong> &nbsp;•&nbsp; 📍 {PRO_STATIC.branch}
                    </p>
                    <p style={{ margin: '2px 0', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.65)' }}>
                        ✉️ {PRO_STATIC.email} &nbsp;•&nbsp; 📞 {PRO_STATIC.phone} &nbsp;•&nbsp; 📅 Joined: {PRO_STATIC.joinDate}
                    </p>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{
                    padding: '6px 16px', borderRadius: '30px', fontSize: '11px', fontWeight: '700',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                    ✅ ACTIVE
                </span>
                <span style={{
                    padding: '6px 16px', borderRadius: '30px', fontSize: '11px', fontWeight: '700',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: 'rgba(255, 159, 67, 0.2)', color: '#ff9f43', border: '1px solid rgba(255, 159, 67, 0.3)'
                }}>
                    🏆 PRO OF THE MONTH
                </span>
                <span style={{
                    padding: '6px 16px', borderRadius: '30px', fontSize: '11px', fontWeight: '700',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    background: 'rgba(115, 103, 240, 0.2)', color: '#b39ef5', border: '1px solid rgba(115, 103, 240, 0.3)'
                }}>
                    🌐 PR CAMPAIGNS
                </span>
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
                <div className="card-header"><h5>Admission & Enquiries Trend</h5></div>
                <div className="card-body" style={{ paddingTop: 0 }}>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={admissionTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#28c76f" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#28c76f" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip />
                            <Area type="monotone" dataKey="enquiries" name="Enquiries" stroke="#3d5ee1" fillOpacity={1} fill="url(#colorEnquiries)" strokeWidth={2.5} />
                            <Area type="monotone" dataKey="admissions" name="Admissions" stroke="#28c76f" fillOpacity={1} fill="url(#colorAdmissions)" strokeWidth={2.5} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="dashboard-card">
                <div className="card-header"><h5>Lead Sources</h5></div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 0 }}>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie isAnimationActive={false} data={leadSources} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                                {leadSources.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Tooltip formatter={(v) => [`${v} Leads`, '']} />
                        </PieChart>
                    </ResponsiveContainer>
                    {leadSources.map((g, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, width: '100%' }}>
                            <span className="rdb-dot" style={{ background: g.color }} />
                            <span style={{ flex: 1, fontSize: 13 }}>{g.name}</span>
                            <strong>{g.value}</strong>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashboard-card">
                <div className="card-header"><h5>Event Calendar</h5></div>
                <div className="card-body" style={{ paddingTop: 8 }}>
                    <ul className="rdb-notice-list">
                        {upcomingEvents.map((n, i) => (
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
                <div className="card-header"><h5>Campaign Performance</h5></div>
                <div className="card-body" style={{ paddingTop: 0 }}>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={campaignPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="reach" name="Reach" fill="#00cfe8" radius={[4, 4, 0, 0]} barSize={15} />
                            <Bar dataKey="conversion" name="Conversions" fill="#ff9f43" radius={[4, 4, 0, 0]} barSize={15} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="dashboard-card">
                <div className="card-header"><h5>Recent Feedback & Complaints</h5></div>
                <div className="card-body" style={{ paddingTop: 8 }}>
                    {recentFeedback.map((f, i) => (
                        <div key={i} className="rdb-staff-item" style={{ marginBottom: 8 }}>
                            <div className="rdb-staff-avatar" style={{ background: f.bg, color: f.color }}>{f.avatar}</div>
                            <div className="rdb-staff-meta">
                                <div className="rdb-staff-name">{f.subject}</div>
                                <div className="rdb-staff-dept">from: {f.user}</div>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 8px', borderRadius: '4px', background: f.bg, color: f.color }}>
                                {f.status}
                            </span>
                        </div>
                    ))}
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <button className="btn btn-link" style={{ fontSize: '12px' }}>View All Feedback →</button>
                    </div>
                </div>
            </div>
        </div>

        <footer className="dashboard-footer"><p>Copyright © 2026 MindWhile. All rights reserved.</p></footer>
    </div>
);

export default PRODashboard;
