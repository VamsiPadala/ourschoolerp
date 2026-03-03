import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import '../Reports/Reports.css';

// ── Dummy Data ──────────────────────────────────────────────────────────────
const kpiData = [
    { label: 'Total Hostels', value: '4', change: '+1', up: true, color: '#3d5ee1', bg: '#eef1fd', icon: '🏨' },
    { label: 'Total Rooms', value: '128', change: '+12', up: true, color: '#28c76f', bg: '#e8faf1', icon: '🚪' },
    { label: 'Occupied Rooms', value: '112', change: '+8', up: true, color: '#ff9f43', bg: '#fff5e6', icon: '🛏️' },
    { label: 'Available Rooms', value: '16', change: '-4', up: false, color: '#7367f0', bg: '#efedfd', icon: '✅' },
    { label: 'Total Students', value: '420', change: '+22', up: true, color: '#00cfe8', bg: '#e0f9fc', icon: '👨‍🎓' },
    { label: 'Monthly Revenue', value: '₹6,30,000', change: '+8.5%', up: true, color: '#28c76f', bg: '#e8faf1', icon: '💰' },
    { label: 'Pending Dues', value: '₹42,000', change: '-5.2%', up: false, color: '#ea5455', bg: '#fce8e8', icon: '⚠️' },
    { label: 'Service Alerts', value: '3', change: '-2', up: true, color: '#6c757d', bg: '#f0f0f0', icon: '🔧' },
];

const occupancyTrend = [
    { month: 'Apr', occupied: 90, available: 38 }, { month: 'May', occupied: 95, available: 33 },
    { month: 'Jun', occupied: 100, available: 28 }, { month: 'Jul', occupied: 105, available: 23 },
    { month: 'Aug', occupied: 108, available: 20 }, { month: 'Sep', occupied: 110, available: 18 },
    { month: 'Oct', occupied: 112, available: 16 }, { month: 'Nov', occupied: 109, available: 19 },
    { month: 'Dec', occupied: 107, available: 21 }, { month: 'Jan', occupied: 110, available: 18 },
    { month: 'Feb', occupied: 111, available: 17 }, { month: 'Mar', occupied: 112, available: 16 },
];

const roomTypePie = [
    { name: 'Single Sharing', value: 40, color: '#3d5ee1' },
    { name: 'Double Sharing', value: 50, color: '#28c76f' },
    { name: 'Triple Sharing', value: 30, color: '#ff9f43' },
    { name: 'Four Sharing', value: 8, color: '#7367f0' },
];

const genderPie = [
    { name: 'Boys Hostel', value: 240, color: '#3d5ee1' },
    { name: 'Girls Hostel', value: 180, color: '#ff6b9d' },
];

const hostelRevenue = [
    { month: 'Apr', revenue: 520000 }, { month: 'May', revenue: 545000 },
    { month: 'Jun', revenue: 510000 }, { month: 'Jul', revenue: 580000 },
    { month: 'Aug', revenue: 600000 }, { month: 'Sep', revenue: 590000 },
    { month: 'Oct', revenue: 620000 }, { month: 'Nov', revenue: 605000 },
    { month: 'Dec', revenue: 570000 }, { month: 'Jan', revenue: 615000 },
    { month: 'Feb', revenue: 625000 }, { month: 'Mar', revenue: 630000 },
];

const hostelWiseOccupancy = [
    { name: 'Hostel A', capacity: 40, occupied: 38 },
    { name: 'Hostel B', capacity: 35, occupied: 30 },
    { name: 'Hostel C', capacity: 30, occupied: 28 },
    { name: 'Hostel D', capacity: 23, occupied: 16 },
];

const serviceAlerts = [
    { hostel: 'Hostel A', room: 'Room 12', issue: 'AC Not Working', severity: 'high', time: '2 hours ago' },
    { hostel: 'Hostel B', room: 'Room 7', issue: 'Leaking Tap', severity: 'medium', time: '5 hours ago' },
    { hostel: 'Hostel C', room: 'Room 24', issue: 'Bulb Replacement Needed', severity: 'low', time: '1 day ago' },
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

const HostelDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Year');

    return (
        <div className="rpt-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Hostel Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Hostel Management</span>
                    </nav>
                </div>
                <div className="rpt-header-actions">
                    {['This Week', 'This Month', 'This Year'].map(p => (
                        <button key={p} className={`rpt-period-btn ${activePeriod === p ? 'active' : ''}`} onClick={() => setActivePeriod(p)}>{p}</button>
                    ))}
                    <button className="rpt-export-btn"><span>⬇️</span> Export</button>
                </div>
            </div>

            <div className="rpt-kpi-grid">
                {kpiData.map((kpi, i) => (
                    <div key={i} className="rpt-kpi-card">
                        <div className="rpt-kpi-icon" style={{ background: kpi.bg, color: kpi.color }}><span>{kpi.icon}</span></div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label">{kpi.label}</p>
                            <h3 className="rpt-kpi-value">{kpi.value}</h3>
                            <span className={`rpt-kpi-change ${kpi.up ? 'up' : 'down'}`}>{kpi.up ? '▲' : '▼'} {kpi.change}<span className="rpt-kpi-vs"> vs last month</span></span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Occupancy Trend */}
            <div className="rpt-row rpt-row-2">
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Room Occupancy Trend</h5>
                        <select className="rpt-select"><option>2024-25</option><option>2023-24</option></select>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={occupancyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="ht-occ" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="occupied" stroke="#3d5ee1" strokeWidth={2.5} fill="url(#ht-occ)" name="Occupied" />
                                <Area type="monotone" dataKey="available" stroke="#28c76f" strokeWidth={2} fill="none" name="Available" strokeDasharray="4 4" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Monthly Revenue</h5>
                        <select className="rpt-select"><option>2024-25</option><option>2023-24</option></select>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={hostelRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="ht-rev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#28c76f" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#28c76f" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="revenue" stroke="#28c76f" strokeWidth={2.5} fill="url(#ht-rev)" name="Revenue (₹)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Pie charts row */}
            <div className="rpt-row rpt-row-3">
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Room Type Distribution</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={roomTypePie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                                    {roomTypePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [v + ' rooms', '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-exam-legend" style={{ padding: '6px', gap: '4px' }}>
                            {roomTypePie.map((item, i) => (
                                <div key={i} className="rpt-exam-legend-item" style={{ fontSize: '11px' }}>
                                    <span className="rpt-pie-dot" style={{ background: item.color, width: '8px', height: '8px' }}></span>
                                    <span>{item.name}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Boys vs Girls Hostels</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={genderPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Hostel-wise Occupancy</h5></div>
                    <div className="rpt-chart-body">
                        <div className="rpt-subject-table">
                            {hostelWiseOccupancy.map((h, i) => (
                                <div key={i} className="rpt-subject-row" style={{ gridTemplateColumns: '80px 1fr 70px' }}>
                                    <span style={{ fontWeight: 600, fontSize: 13 }}>{h.name}</span>
                                    <div className="rpt-bar-wrap">
                                        <div className="rpt-bar-fill" style={{ width: `${Math.round(h.occupied / h.capacity * 100)}%`, background: h.occupied / h.capacity > 0.9 ? '#ea5455' : '#3d5ee1' }}></div>
                                    </div>
                                    <span className="rpt-score">{h.occupied}/{h.capacity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Alerts Table */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">Active Service Alerts</h5>
                    <div className="rpt-table-actions">
                        <Link to="/school/hostel/allocation" className="rpt-btn-outline">Manage Allocation →</Link>
                    </div>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead><tr><th>Hostel</th><th>Room</th><th>Issue</th><th>Reported</th><th>Severity</th></tr></thead>
                        <tbody>
                            {serviceAlerts.map((a, i) => (
                                <tr key={i}>
                                    <td><strong>{a.hostel}</strong></td>
                                    <td>{a.room}</td>
                                    <td>{a.issue}</td>
                                    <td style={{ color: '#8c90a4' }}>{a.time}</td>
                                    <td>
                                        <span className={`rpt-badge ${a.severity === 'high' ? 'rpt-badge-red' : a.severity === 'medium' ? 'rpt-badge-orange' : 'rpt-badge-blue'}`}>
                                            {a.severity.charAt(0).toUpperCase() + a.severity.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Hostel Dashboard</p></footer>
        </div>
    );
};

export default HostelDashboard;
