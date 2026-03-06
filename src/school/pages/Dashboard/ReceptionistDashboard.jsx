import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import './RolesDashboard.css';

// ── Data ─────────────────────────────────────────────────────────────
const kpiCards = [
    { label: 'Visitors Today', value: '24', sub: 'Signed In', icon: '🚶', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Complaints', value: '6', sub: '2 Pending', icon: '📝', color: '#ea5455', bg: '#fce8e8' },
    { label: 'Enquiries', value: '18', sub: 'This Week', icon: '❓', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Staff Present', value: '82/87', sub: 'Today', icon: '✅', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Postal Received', value: '7', sub: 'This Week', icon: '📬', color: '#7367f0', bg: '#efedfd' },
    { label: 'Postal Sent', value: '12', sub: 'This Week', icon: '📮', color: '#00cfe8', bg: '#e0f9fc' },
];

const genderData = [
    { name: 'Male Students', value: 672, color: '#3d5ee1' },
    { name: 'Female Students', value: 576, color: '#ff6b9d' },
];

const visitorsWeek = [
    { day: 'Mon', count: 18 },
    { day: 'Tue', count: 24 },
    { day: 'Wed', count: 15 },
    { day: 'Thu', count: 22 },
    { day: 'Fri', count: 20 },
    { day: 'Sat', count: 10 },
];

const recentVisitors = [
    { name: 'Mr. Ramesh Kumar', purpose: 'Meet Teacher', time: '09:30 AM', status: 'Inside' },
    { name: 'Mrs. Anita Sharma', purpose: 'Admission Enquiry', time: '10:15 AM', status: 'Left' },
    { name: 'Mr. Vijay Nair', purpose: 'Fee Payment', time: '11:00 AM', status: 'Inside' },
    { name: 'Mrs. Kavitha Rao', purpose: 'Meet Principal', time: '11:45 AM', status: 'Left' },
    { name: 'Mr. Deepak Singh', purpose: 'Complaint', time: '12:30 PM', status: 'Inside' },
];

const pendingComplaints = [
    { title: 'Canteen food quality', date: 'Feb 28', priority: 'Medium' },
    { title: 'Washroom not clean', date: 'Mar 01', priority: 'High' },
];

const recentEnquiries = [
    { name: 'Sunita Mishra', class: 'Class V', date: 'Mar 03', status: 'Pending' },
    { name: 'Abdul Rahman', class: 'Class IX', date: 'Mar 02', status: 'Follow-up' },
    { name: 'Lakshmi Priya', class: 'Class I', date: 'Mar 01', status: 'Admitted' },
    { name: 'Rahul Gupta', class: 'Class VI', date: 'Feb 28', status: 'Pending' },
];

const notices = [
    { text: 'Staff Meeting – Tomorrow 4 PM', color: '#3d5ee1', date: 'Mar 04' },
    { text: 'Parent-Teacher Meet – Mar 10', color: '#ff9f43', date: 'Mar 04' },
    { text: 'Sports Day – Mar 15', color: '#28c76f', date: 'Mar 03' },
    { text: 'Holiday: Holi – Mar 17', color: '#ea5455', date: 'Mar 03' },
];

const ReceptionistDashboard = () => {
    return (
        <div className="dashboard-page">
            {/* Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Receptionist Dashboard</h4>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span className="current">Receptionist Dashboard</span>
                    </nav>
                </div>
                <div className="page-header-actions">
                    <button className="btn btn-outline">📝 Log Visitor</button>
                    <button className="btn btn-primary">+ New Enquiry</button>
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

            {/* Row: Visitors chart + Gender + Notices */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header"><h5>Daily Visitor Count (This Week)</h5></div>
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={visitorsWeek} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <Tooltip formatter={(v) => [v + ' visitors', 'Count']} />
                                <Bar dataKey="count" name="Visitors" fill="#3d5ee1" radius={[6, 6, 0, 0]} barSize={28} />
                            </BarChart>
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

            {/* Row: Recent Visitors + Admission Enquiries + Pending Complaints */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header">
                        <h5>Recent Visitors</h5>
                        <a href="#" className="view-all">View All →</a>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="rdb-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Purpose</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentVisitors.map((v, i) => (
                                    <tr key={i}>
                                        <td><strong>{v.name}</strong></td>
                                        <td style={{ fontSize: 12 }}>{v.purpose}</td>
                                        <td style={{ fontSize: 12 }}>{v.time}</td>
                                        <td>
                                            <span className={`rdb-badge ${v.status === 'Inside' ? 'badge-green' : 'badge-purple'}`}>{v.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h5>Admission Enquiries</h5>
                        <a href="#" className="view-all">View All →</a>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="rdb-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentEnquiries.map((e, i) => (
                                    <tr key={i}>
                                        <td><strong>{e.name}</strong></td>
                                        <td style={{ fontSize: 12 }}>{e.class}</td>
                                        <td style={{ fontSize: 12 }}>{e.date}</td>
                                        <td>
                                            <span className={`rdb-badge ${e.status === 'Admitted' ? 'badge-green' : e.status === 'Follow-up' ? 'badge-orange' : 'badge-blue'}`}>{e.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header"><h5>Pending Issues</h5></div>
                    <div className="card-body" style={{ paddingTop: 8 }}>
                        {pendingComplaints.map((c, i) => (
                            <div key={i} className="rdb-activity-item">
                                <div className="rdb-activity-icon" style={{ background: c.priority === 'High' ? '#fce8e8' : '#fff5e6', color: c.priority === 'High' ? '#ea5455' : '#ff9f43' }}>
                                    {c.priority === 'High' ? '🔴' : '🟠'}
                                </div>
                                <div className="rdb-activity-content">
                                    <p className="rdb-activity-title">{c.title}</p>
                                    <span className="rdb-activity-sub">{c.date} · {c.priority}</span>
                                </div>
                            </div>
                        ))}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                            {[
                                { label: '📬 Postal Received', count: '7', color: '#7367f0', bg: '#efedfd' },
                                { label: '📮 Postal Sent', count: '12', color: '#00cfe8', bg: '#e0f9fc' },
                                { label: '📞 Calls Logged', count: '31', color: '#28c76f', bg: '#e8faf1' },
                            ].map((item, i) => (
                                <div key={i} className="rdb-visitor-item">
                                    <span className="rdb-visitor-label">{item.label}</span>
                                    <span className="rdb-visitor-count" style={{ color: item.color }}>{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="dashboard-footer">
                <p>Copyright © 2024 MindWhile. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ReceptionistDashboard;
