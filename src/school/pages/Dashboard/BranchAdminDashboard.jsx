import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';
import '../../pages/Reports/Reports.css';

// ── Dummy Data ──────────────────────────────────────────────────────────────
const kpiData = [
    { label: 'Total Students', value: '1,250', change: '+3.8%', up: true, color: '#3d5ee1', bg: '#eef1fd', icon: '👨‍🎓' },
    { label: 'Total Staff', value: '85', change: '+2', up: true, color: '#28c76f', bg: '#e8faf1', icon: '👩‍🏫' },
    { label: 'Monthly Revenue', value: '₹4,82,300', change: '+11.5%', up: true, color: '#ff9f43', bg: '#fff5e6', icon: '💰' },
    { label: 'Pending Tasks', value: '14', change: '-3', up: true, color: '#7367f0', bg: '#efedfd', icon: '📋' },
    { label: 'Fee Collected', value: '₹3,60,000', change: '+8.2%', up: true, color: '#00cfe8', bg: '#e0f9fc', icon: '💳' },
    { label: 'Fee Pending', value: '₹1,22,300', change: '-5.1%', up: false, color: '#ea5455', bg: '#fce8e8', icon: '⚠️' },
    { label: 'Avg. Attendance', value: '93.4%', change: '+1.2%', up: true, color: '#ff6b6b', bg: '#fff0f0', icon: '✅' },
    { label: 'Active Classes', value: '42', change: '0', up: true, color: '#6c757d', bg: '#f0f0f0', icon: '🏫' },
];

const enrollmentData = [
    { month: 'Apr', students: 1100 }, { month: 'May', students: 1150 },
    { month: 'Jun', students: 1120 }, { month: 'Jul', students: 1200 },
    { month: 'Aug', students: 1220 }, { month: 'Sep', students: 1180 },
    { month: 'Oct', students: 1240 }, { month: 'Nov', students: 1210 },
    { month: 'Dec', students: 1190 }, { month: 'Jan', students: 1250 },
    { month: 'Feb', students: 1248 }, { month: 'Mar', students: 1250 },
];

const feeData = [
    { month: 'Apr', collected: 320000, due: 80000 }, { month: 'May', collected: 350000, due: 70000 },
    { month: 'Jun', collected: 300000, due: 95000 }, { month: 'Jul', collected: 420000, due: 60000 },
    { month: 'Aug', collected: 460000, due: 50000 }, { month: 'Sep', collected: 390000, due: 85000 },
    { month: 'Oct', collected: 480000, due: 40000 }, { month: 'Nov', collected: 360000, due: 72000 },
    { month: 'Dec', collected: 310000, due: 100000 }, { month: 'Jan', collected: 440000, due: 62000 },
    { month: 'Feb', collected: 482300, due: 55000 }, { month: 'Mar', collected: 510000, due: 45000 },
];

const genderPie = [
    { name: 'Male', value: 672, color: '#3d5ee1' },
    { name: 'Female', value: 578, color: '#ff6b9d' },
];

const feeCollectionPie = [
    { name: 'Collected', value: 3600000, color: '#28c76f' },
    { name: 'Pending', value: 1223000, color: '#ea5455' },
];

const attendancePie = [
    { name: 'Present (Students)', value: 1167, color: '#3d5ee1' },
    { name: 'Absent (Students)', value: 83, color: '#ea5455' },
];

const staffAttendancePie = [
    { name: 'Present (Staff)', value: 80, color: '#28c76f' },
    { name: 'Absent (Staff)', value: 5, color: '#ff9f43' },
];

const classPassRate = [
    { class: 'VI', pass: 91, fail: 9 }, { class: 'VII', pass: 85, fail: 15 },
    { class: 'VIII', pass: 82, fail: 18 }, { class: 'IX', pass: 78, fail: 22 },
    { class: 'X', pass: 75, fail: 25 }, { class: 'XI', pass: 80, fail: 20 },
    { class: 'XII', pass: 82, fail: 18 },
];

const recentActivities = [
    { text: 'New student Riya Sharma admitted', time: '10 mins ago', icon: '🎓', color: '#3d5ee1' },
    { text: '₹12,000 fee collected from Class X-A', time: '45 mins ago', icon: '💰', color: '#28c76f' },
    { text: 'Staff attendance marked for today', time: '1 hour ago', icon: '✅', color: '#00cfe8' },
    { text: '3 leave requests pending approval', time: '2 hours ago', icon: '📋', color: '#ff9f43' },
    { text: 'Annual exam schedule published', time: '3 hours ago', icon: '📝', color: '#7367f0' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rpt-tooltip">
                <p className="rpt-tooltip-label">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0', fontSize: 13 }}>
                        {p.name}: <strong>{typeof p.value === 'number' && p.value > 1000 ? `₹${p.value.toLocaleString()}` : p.value}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const BranchAdminDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Year');

    return (
        <div className="rpt-page">
            {/* Page Header */}
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Branch Admin Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Branch Admin</span>
                    </nav>
                </div>
                <div className="rpt-header-actions">
                    {['This Week', 'This Month', 'This Year'].map(p => (
                        <button key={p} className={`rpt-period-btn ${activePeriod === p ? 'active' : ''}`} onClick={() => setActivePeriod(p)}>{p}</button>
                    ))}
                    <button className="rpt-export-btn"><span>⬇️</span> Export</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="rpt-kpi-grid">
                {kpiData.map((kpi, i) => (
                    <div key={i} className="rpt-kpi-card">
                        <div className="rpt-kpi-icon" style={{ background: kpi.bg, color: kpi.color }}>
                            <span>{kpi.icon}</span>
                        </div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label">{kpi.label}</p>
                            <h3 className="rpt-kpi-value">{kpi.value}</h3>
                            <span className={`rpt-kpi-change ${kpi.up ? 'up' : 'down'}`}>
                                {kpi.up ? '▲' : '▼'} {kpi.change}
                                <span className="rpt-kpi-vs"> vs last month</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Row: Enrollment Trend + Fee Collection */}
            <div className="rpt-row rpt-row-2">
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Student Enrollment Trend</h5>
                        <select className="rpt-select"><option>2024-25</option><option>2023-24</option></select>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="ba-enroll" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="students" stroke="#3d5ee1" strokeWidth={2.5} fill="url(#ba-enroll)" name="Students" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Monthly Fee: Collected vs Pending</h5>
                        <select className="rpt-select"><option>2024-25</option><option>2023-24</option></select>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={feeData.slice(-6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
                                <Bar dataKey="collected" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={20} name="Collected (₹)" />
                                <Bar dataKey="due" fill="#ea5455" radius={[4, 4, 0, 0]} barSize={20} name="Pending (₹)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Row: Pie Charts */}
            <div className="rpt-row rpt-row-2">
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Gender Ratio</h5>
                    </div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={genderPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                                    {genderPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [v + ' students', '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-pie-legend">
                            {genderPie.map((g, i) => (
                                <div key={i} className="rpt-pie-legend-item">
                                    <span className="rpt-pie-dot" style={{ background: g.color }}></span>
                                    <span className="rpt-pie-name">{g.name}</span>
                                    <strong className="rpt-pie-val">{g.value}</strong>
                                    <span className="rpt-pie-pct">({Math.round(g.value / 1250 * 100)}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Fee Collection Status</h5>
                    </div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={feeCollectionPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                                    {feeCollectionPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-pie-legend">
                            {feeCollectionPie.map((item, i) => (
                                <div key={i} className="rpt-pie-legend-item">
                                    <span className="rpt-pie-dot" style={{ background: item.color }}></span>
                                    <span>{item.name}</span>
                                    <strong>₹{item.value.toLocaleString()}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Class Pass Rate */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Class-wise Pass vs Fail Rate (%)</h5>
                    <div className="rpt-legend-row" style={{ marginTop: 0 }}>
                        <div className="rpt-lgnd"><span style={{ background: '#28c76f' }}></span> Pass %</div>
                        <div className="rpt-lgnd"><span style={{ background: '#ea5455' }}></span> Fail %</div>
                    </div>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={classPassRate} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
                            <Bar dataKey="pass" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={24} name="Pass %" />
                            <Bar dataKey="fail" fill="#ea5455" radius={[4, 4, 0, 0]} barSize={24} name="Fail %" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Recent Activities</h5>
                    <a href="#" className="rpt-view-all">View All →</a>
                </div>
                <div className="rpt-chart-body">
                    {recentActivities.map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < recentActivities.length - 1 ? '1px solid #f0f2f7' : 'none' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: a.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{a.icon}</div>
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#333448' }}>{a.text}</p>
                                <p style={{ margin: 0, fontSize: 12, color: '#8c90a4', marginTop: 2 }}>{a.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Branch Admin Dashboard</p></footer>
        </div>
    );
};

export default BranchAdminDashboard;
