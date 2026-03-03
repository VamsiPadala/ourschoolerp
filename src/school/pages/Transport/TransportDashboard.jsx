import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../Reports/Reports.css';

// ── Dummy Data ──────────────────────────────────────────────────────────────
const kpiData = [
    { label: 'Total Vehicles', value: '18', change: '+2', up: true, color: '#3d5ee1', bg: '#eef1fd', icon: '🚌' },
    { label: 'Active Routes', value: '12', change: '+1', up: true, color: '#28c76f', bg: '#e8faf1', icon: '🗺️' },
    { label: 'Students Transported', value: '640', change: '+30', up: true, color: '#ff9f43', bg: '#fff5e6', icon: '👨‍🎓' },
    { label: 'Drivers', value: '18', change: '0', up: true, color: '#7367f0', bg: '#efedfd', icon: '🚗' },
    { label: 'On-Time Rate', value: '94.2%', change: '+1.5%', up: true, color: '#00cfe8', bg: '#e0f9fc', icon: '⏱️' },
    { label: 'Monthly Revenue', value: '₹3,20,000', change: '+5.8%', up: true, color: '#28c76f', bg: '#e8faf1', icon: '💰' },
    { label: 'Active Alerts', value: '2', change: '-3', up: true, color: '#ea5455', bg: '#fce8e8', icon: '⚠️' },
    { label: 'Fuel Cost (Month)', value: '₹85,000', change: '+3.2%', up: false, color: '#6c757d', bg: '#f0f0f0', icon: '⛽' },
];

const monthlyRouteData = [
    { month: 'Apr', trips: 340, onTime: 318 }, { month: 'May', trips: 360, onTime: 342 },
    { month: 'Jun', trips: 325, onTime: 305 }, { month: 'Jul', trips: 380, onTime: 360 },
    { month: 'Aug', trips: 400, onTime: 382 }, { month: 'Sep', trips: 375, onTime: 355 },
    { month: 'Oct', trips: 420, onTime: 400 }, { month: 'Nov', trips: 390, onTime: 368 },
    { month: 'Dec', trips: 350, onTime: 330 }, { month: 'Jan', trips: 410, onTime: 390 },
    { month: 'Feb', trips: 415, onTime: 392 }, { month: 'Mar', trips: 430, onTime: 405 },
];

const vehicleTypePie = [
    { name: 'Large Bus (50+)', value: 8, color: '#3d5ee1' },
    { name: 'Mini Bus (30-50)', value: 6, color: '#28c76f' },
    { name: 'Van (10-30)', value: 4, color: '#ff9f43' },
];

const routeStudentsPie = [
    { name: 'Route A (North)', value: 140, color: '#3d5ee1' },
    { name: 'Route B (South)', value: 120, color: '#28c76f' },
    { name: 'Route C (East)', value: 180, color: '#ff9f43' },
    { name: 'Route D (West)', value: 110, color: '#7367f0' },
    { name: 'Route E (CBD)', value: 90, color: '#00cfe8' },
];

const fuelData = [
    { month: 'Apr', cost: 72000 }, { month: 'May', cost: 75000 }, { month: 'Jun', cost: 68000 },
    { month: 'Jul', cost: 80000 }, { month: 'Aug', cost: 83000 }, { month: 'Sep', cost: 78000 },
    { month: 'Oct', cost: 88000 }, { month: 'Nov', cost: 82000 }, { month: 'Dec', cost: 76000 },
    { month: 'Jan', cost: 84000 }, { month: 'Feb', cost: 85000 }, { month: 'Mar', cost: 89000 },
];

const liveRoutes = [
    { route: 'Route A', vehicle: 'KA-01-AB-1234', driver: 'Ramesh Kumar', students: 42, status: 'on-time', eta: '08:25 AM' },
    { route: 'Route B', vehicle: 'KA-02-CD-5678', driver: 'Suresh Babu', students: 38, status: 'delayed', eta: '08:55 AM' },
    { route: 'Route C', vehicle: 'KA-03-EF-9012', driver: 'Mahesh Reddy', students: 45, status: 'on-time', eta: '08:15 AM' },
    { route: 'Route D', vehicle: 'KA-04-GH-3456', driver: 'Dinesh Singh', students: 35, status: 'on-time', eta: '08:30 AM' },
    { route: 'Route E', vehicle: 'KA-05-IJ-7890', driver: 'Pradeep Nair', students: 28, status: 'completed', eta: 'Done' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rpt-tooltip">
                <p className="rpt-tooltip-label">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0', fontSize: 13 }}>
                        {p.name}: <strong>{typeof p.value === 'number' && p.value > 10000 ? `₹${p.value.toLocaleString()}` : p.value}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const TransportDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Year');

    return (
        <div className="rpt-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Transport Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Transport Management</span>
                    </nav>
                </div>
                <div className="rpt-header-actions">
                    {['Today', 'This Month', 'This Year'].map(p => (
                        <button key={p} className={`rpt-period-btn ${activePeriod === p ? 'active' : ''}`} onClick={() => setActivePeriod(p)}>{p}</button>
                    ))}
                    <button className="rpt-export-btn"><span>📍</span> Live Track</button>
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

            {/* Trips: Total vs On-Time */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Monthly Trips: Total vs On-Time</h5>
                    <div className="rpt-legend-row" style={{ marginTop: 0 }}>
                        <div className="rpt-lgnd"><span style={{ background: '#3d5ee1' }}></span> Total Trips</div>
                        <div className="rpt-lgnd"><span style={{ background: '#28c76f' }}></span> On-Time</div>
                    </div>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={monthlyRouteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
                            <Bar dataKey="trips" fill="#3d5ee1" radius={[4, 4, 0, 0]} barSize={22} name="Total Trips" />
                            <Bar dataKey="onTime" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={22} name="On-Time" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Charts Row */}
            <div className="rpt-row rpt-row-3">
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Vehicle Type Distribution</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={vehicleTypePie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3} stroke="none">
                                    {vehicleTypePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [v + ' vehicles', '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-pie-legend">
                            {vehicleTypePie.map((item, i) => (
                                <div key={i} className="rpt-pie-legend-item">
                                    <span className="rpt-pie-dot" style={{ background: item.color }}></span>
                                    <span style={{ fontSize: '12px' }}>{item.name}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Students per Route</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={routeStudentsPie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                    {routeStudentsPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [v + ' students', '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-exam-legend" style={{ padding: '4px', gap: '3px 6px' }}>
                            {routeStudentsPie.map((item, i) => (
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
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Monthly Fuel Costs</h5></div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={fuelData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="tr-fuel" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ea5455" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#ea5455" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 10 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="cost" stroke="#ea5455" strokeWidth={2.5} fill="url(#tr-fuel)" name="Fuel Cost (₹)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Live Route Status Table */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">Live Route Status</h5>
                    <div className="rpt-table-actions">
                        <Link to="/school/transport/tracking" className="rpt-btn-outline">🗺️ Live Map →</Link>
                    </div>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead><tr><th>Route</th><th>Vehicle No.</th><th>Driver</th><th>Students</th><th>ETA</th><th>Status</th></tr></thead>
                        <tbody>
                            {liveRoutes.map((r, i) => (
                                <tr key={i}>
                                    <td><strong>{r.route}</strong></td>
                                    <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{r.vehicle}</td>
                                    <td>{r.driver}</td>
                                    <td>{r.students}</td>
                                    <td style={{ color: '#8c90a4' }}>{r.eta}</td>
                                    <td>
                                        <span className={`rpt-badge ${r.status === 'on-time' ? 'rpt-badge-green' : r.status === 'delayed' ? 'rpt-badge-red' : 'rpt-badge-blue'}`}>
                                            {r.status === 'on-time' ? '✓ On-Time' : r.status === 'delayed' ? '⚠ Delayed' : '✓ Done'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Transport Dashboard</p></footer>
        </div>
    );
};

export default TransportDashboard;
