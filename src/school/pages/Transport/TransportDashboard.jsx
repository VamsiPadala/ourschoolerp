import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import '../Dashboard/Dashboard.css';
import '../Dashboard/RolesDashboard.css';

// ── Data ─────────────────────────────────────────────────────────────
const kpiCards = [
    { label: 'Total Vehicles', value: '12', sub: '10 Active Today', icon: '🚌', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Total Routes', value: '8', sub: 'All Operational', icon: '🗺️', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Students Using', value: '420', sub: 'Transport Users', icon: '👨‍🎓', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'On Time Today', value: '92%', sub: 'Arrival Rate', icon: '⏱️', color: '#7367f0', bg: '#efedfd' },
    { label: 'Fuel Cost', value: '₹42,000', sub: 'This Month', icon: '⛽', color: '#00cfe8', bg: '#e0f9fc' },
    { label: 'Maintenance', value: '2', sub: 'Vehicles in Service', icon: '🔧', color: '#ea5455', bg: '#fce8e8' },
];

const monthlyFuel = [
    { month: 'Oct', cost: 38000 },
    { month: 'Nov', cost: 41000 },
    { month: 'Dec', cost: 35000 },
    { month: 'Jan', cost: 44000 },
    { month: 'Feb', cost: 42000 },
];

const routeData = [
    { route: 'R-1 North', students: 65, km: 18 },
    { route: 'R-2 South', students: 58, km: 15 },
    { route: 'R-3 East', students: 72, km: 22 },
    { route: 'R-4 West', students: 50, km: 14 },
    { route: 'R-5 Central', students: 80, km: 10 },
];

const vehicleTypes = [
    { name: 'AC Bus', value: 4, color: '#3d5ee1' },
    { name: 'Non-AC Bus', value: 6, color: '#28c76f' },
    { name: 'Mini Van', value: 2, color: '#ff9f43' },
];

const vehicles = [
    { id: 'TN-01-AB-1234', type: 'AC Bus', driver: 'Rajan Kumar', route: 'R-3 East', students: 72, status: 'On Route' },
    { id: 'TN-01-CD-5678', type: 'Non-AC Bus', driver: 'Suresh Pillai', route: 'R-1 North', students: 65, status: 'On Route' },
    { id: 'TN-01-EF-9012', type: 'Non-AC Bus', driver: 'Muthu Raj', route: 'R-5 Central', students: 80, status: 'Arrived' },
    { id: 'TN-01-GH-3456', type: 'Mini Van', driver: 'Kiran Dev', route: 'R-2 South', students: 24, status: 'Maintenance' },
    { id: 'TN-01-IJ-7890', type: 'AC Bus', driver: 'Arjun Nair', route: 'R-4 West', students: 50, status: 'Arrived' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
                <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0' }}>
                        {p.name}: <strong>{typeof p.value === 'number' && p.value > 1000 ? `₹${p.value.toLocaleString()}` : p.value}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const TransportDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="dashboard-page">
            <div className="page-header">
                <div className="page-title">
                    <h4>Transport Dashboard</h4>
                    <nav className="breadcrumb"><span>Dashboard</span> / <span className="current">Transport Dashboard</span></nav>
                </div>
                <div className="page-header-actions">
                    <button className="btn btn-outline" onClick={() => navigate('/school/transport/vehicles')}>🚌 Manage Vehicles</button>
                    <button className="btn btn-primary" onClick={() => navigate('/school/transport/routes')}>🗺️ Manage Routes</button>
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

            {/* Row: Route students + Fleet types + Fuel costs */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 2fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header"><h5>Route-wise Student Count</h5></div>
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={routeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="route" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="students" name="Students" fill="#3d5ee1" radius={[6, 6, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header"><h5>Fleet Breakdown</h5></div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={vehicleTypes} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                                    {vehicleTypes.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [`${v} vehicles`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        {vehicleTypes.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, width: '100%' }}>
                                <span className="rdb-dot" style={{ background: item.color }} />
                                <span style={{ flex: 1, fontSize: 13 }}>{item.name}</span>
                                <strong>{item.value}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header"><h5>Monthly Fuel Cost (₹)</h5></div>
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={monthlyFuel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gFuel" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00cfe8" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#00cfe8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="cost" name="Fuel Cost" stroke="#00cfe8" fill="url(#gFuel)" strokeWidth={2.5} dot={{ r: 4, fill: '#00cfe8' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Vehicle Status Table */}
            <div className="dashboard-card dashboard-row">
                <div className="card-header">
                    <h5>Vehicle Status – Today</h5>
                    <a href="#" className="view-all" onClick={() => navigate('/school/transport/vehicles')}>Manage →</a>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="rdb-table">
                        <thead>
                            <tr>
                                <th>Vehicle No</th>
                                <th>Type</th>
                                <th>Driver</th>
                                <th>Route</th>
                                <th>Students</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((v, i) => (
                                <tr key={i}>
                                    <td><strong style={{ color: '#3d5ee1' }}>{v.id}</strong></td>
                                    <td>{v.type}</td>
                                    <td>{v.driver}</td>
                                    <td><span className="rdb-badge badge-blue">{v.route}</span></td>
                                    <td>{v.students}</td>
                                    <td>
                                        <span className={`rdb-badge ${v.status === 'On Route' ? 'badge-orange' : v.status === 'Arrived' ? 'badge-green' : 'badge-red'}`}>
                                            {v.status === 'On Route' ? '🟡 ' : v.status === 'Arrived' ? '🟢 ' : '🔴 '}{v.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="dashboard-footer"><p>Copyright © 2024 MindWhile. All rights reserved.</p></footer>
        </div>
    );
};

export default TransportDashboard;
