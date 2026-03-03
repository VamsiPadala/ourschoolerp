import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../pages/Reports/Reports.css';

const kpiData = [
    { label: "Today's Visitors", value: '42', change: '+8', up: true, color: '#3d5ee1', bg: '#eef1fd', icon: '🧑‍💼' },
    { label: 'Calls Handled', value: '128', change: '+15', up: true, color: '#28c76f', bg: '#e8faf1', icon: '📞' },
    { label: 'New Inquiries', value: '15', change: '+4', up: true, color: '#ff9f43', bg: '#fff5e6', icon: '📋' },
    { label: 'Appointments Today', value: '6', change: '-2', up: false, color: '#7367f0', bg: '#efedfd', icon: '📅' },
    { label: 'Admissions This Month', value: '18', change: '+5', up: true, color: '#00cfe8', bg: '#e0f9fc', icon: '🎓' },
    { label: 'Pending Callbacks', value: '7', change: '+3', up: false, color: '#ea5455', bg: '#fce8e8', icon: '⏰' },
    { label: 'Avg Wait Time', value: '4 min', change: '-1min', up: true, color: '#ff6b6b', bg: '#fff0f0', icon: '⏱️' },
    { label: 'Satisfied Visitors', value: '96%', change: '+2%', up: true, color: '#6c757d', bg: '#f0f0f0', icon: '😊' },
];

const weeklyVisitors = [
    { day: 'Mon', visitors: 45, calls: 95 }, { day: 'Tue', visitors: 52, calls: 110 },
    { day: 'Wed', visitors: 48, calls: 102 }, { day: 'Thu', visitors: 61, calls: 128 },
    { day: 'Fri', visitors: 55, calls: 120 }, { day: 'Sat', visitors: 30, calls: 60 },
];

const inquiryTypePie = [
    { name: 'Admissions', value: 50, color: '#3d5ee1' },
    { name: 'General Info', value: 30, color: '#28c76f' },
    { name: 'Fee Details', value: 15, color: '#ff9f43' },
    { name: 'Other', value: 5, color: '#ea5455' },
];

const visitorTypePie = [
    { name: 'Parents', value: 55, color: '#7367f0' },
    { name: 'New Applicants', value: 25, color: '#00cfe8' },
    { name: 'Vendors', value: 12, color: '#ff9f43' },
    { name: 'Others', value: 8, color: '#6c757d' },
];

const monthlyInquiries = [
    { month: 'Apr', inquiries: 45 }, { month: 'May', inquiries: 60 }, { month: 'Jun', inquiries: 50 },
    { month: 'Jul', inquiries: 70 }, { month: 'Aug', inquiries: 85 }, { month: 'Sep', inquiries: 65 },
    { month: 'Oct', inquiries: 55 }, { month: 'Nov', inquiries: 40 }, { month: 'Dec', inquiries: 48 },
    { month: 'Jan', inquiries: 72 }, { month: 'Feb', inquiries: 80 }, { month: 'Mar', inquiries: 90 },
];

const recentVisitors = [
    { name: 'John Smith', purpose: 'Admission Enquiry', time: '10:15 AM', status: 'checked-in', initials: 'JS', color: '#3d5ee1' },
    { name: 'Michael Wood', purpose: 'Maintenance', time: '09:30 AM', status: 'checked-out', initials: 'MW', color: '#ff9f43' },
    { name: 'Priya Raj', purpose: 'Fee Payment', time: '11:00 AM', status: 'checked-in', initials: 'PR', color: '#28c76f' },
    { name: 'Ahmed Khan', purpose: 'Parent Meeting', time: '11:45 AM', status: 'waiting', initials: 'AK', color: '#7367f0' },
    { name: 'Sarah Jones', purpose: 'New Admission', time: '12:30 PM', status: 'checked-in', initials: 'SJ', color: '#00cfe8' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rpt-tooltip">
                <p className="rpt-tooltip-label">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0', fontSize: 13 }}>
                        {p.name}: <strong>{p.value}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const ReceptionistDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Week');

    return (
        <div className="rpt-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Receptionist Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Front Desk Operations</span>
                    </nav>
                </div>
                <div className="rpt-header-actions">
                    {['Today', 'This Week', 'This Month'].map(p => (
                        <button key={p} className={`rpt-period-btn ${activePeriod === p ? 'active' : ''}`} onClick={() => setActivePeriod(p)}>{p}</button>
                    ))}
                    <button className="rpt-export-btn"><span>📋</span> Log Visitor</button>
                </div>
            </div>

            <div className="rpt-kpi-grid">
                {kpiData.map((kpi, i) => (
                    <div key={i} className="rpt-kpi-card">
                        <div className="rpt-kpi-icon" style={{ background: kpi.bg, color: kpi.color }}><span>{kpi.icon}</span></div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label">{kpi.label}</p>
                            <h3 className="rpt-kpi-value">{kpi.value}</h3>
                            <span className={`rpt-kpi-change ${kpi.up ? 'up' : 'down'}`}>{kpi.up ? '▲' : '▼'} {kpi.change}<span className="rpt-kpi-vs"> vs yesterday</span></span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Weekly Visitors + Calls */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Weekly Visitor & Call Traffic</h5>
                    <div className="rpt-legend-row" style={{ marginTop: 0 }}>
                        <div className="rpt-lgnd"><span style={{ background: '#3d5ee1' }}></span> Visitors</div>
                        <div className="rpt-lgnd"><span style={{ background: '#28c76f' }}></span> Calls</div>
                    </div>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={weeklyVisitors} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
                            <Bar dataKey="visitors" fill="#3d5ee1" radius={[4, 4, 0, 0]} barSize={22} name="Visitors" />
                            <Bar dataKey="calls" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={22} name="Calls" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Monthly Inquiries + Pie Charts Row */}
            <div className="rpt-row rpt-row-3">
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Monthly Inquiry Trend</h5></div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={monthlyInquiries} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="rc-inq" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 10 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="inquiries" stroke="#ec4899" strokeWidth={2.5} fill="url(#rc-inq)" name="Inquiries" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Inquiry Types</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={inquiryTypePie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                                    {inquiryTypePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [v + '%', '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-exam-legend" style={{ padding: '6px', gap: '4px' }}>
                            {inquiryTypePie.map((item, i) => (
                                <div key={i} className="rpt-exam-legend-item" style={{ fontSize: '11px' }}>
                                    <span className="rpt-pie-dot" style={{ background: item.color, width: '8px', height: '8px' }}></span>
                                    <span>{item.name}</span>
                                    <strong>{item.value}%</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Visitor Types</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={visitorTypePie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                                    {visitorTypePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [v + '%', '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-exam-legend" style={{ padding: '6px', gap: '4px' }}>
                            {visitorTypePie.map((item, i) => (
                                <div key={i} className="rpt-exam-legend-item" style={{ fontSize: '11px' }}>
                                    <span className="rpt-pie-dot" style={{ background: item.color, width: '8px', height: '8px' }}></span>
                                    <span>{item.name}</span>
                                    <strong>{item.value}%</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Visitor Log */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">Today's Visitor Log</h5>
                    <div className="rpt-table-actions">
                        <button className="rpt-btn-outline">📄 Print</button>
                    </div>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead><tr><th>Visitor</th><th>Purpose</th><th>Time</th><th>Status</th></tr></thead>
                        <tbody>
                            {recentVisitors.map((v, i) => (
                                <tr key={i}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 34, height: 34, borderRadius: '50%', background: v.color + '22', color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>{v.initials}</div>
                                            <strong>{v.name}</strong>
                                        </div>
                                    </td>
                                    <td>{v.purpose}</td>
                                    <td style={{ color: '#8c90a4' }}>{v.time}</td>
                                    <td>
                                        <span className={`rpt-badge ${v.status === 'checked-in' ? 'rpt-badge-green' : v.status === 'checked-out' ? 'rpt-badge-blue' : 'rpt-badge-orange'}`}>
                                            {v.status === 'checked-in' ? '✓ Checked In' : v.status === 'checked-out' ? '↩ Checked Out' : '⌛ Waiting'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Receptionist Dashboard</p></footer>
        </div>
    );
};

export default ReceptionistDashboard;
