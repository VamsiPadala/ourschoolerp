import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../pages/Reports/Reports.css';

const kpiData = [
    { label: 'Total Branches', value: '3', change: '0', up: true, color: '#3d5ee1', bg: '#eef1fd', icon: '🏢' },
    { label: 'Total Students (All)', value: '3,280', change: '+4.1%', up: true, color: '#28c76f', bg: '#e8faf1', icon: '👨‍🎓' },
    { label: 'Total Staff (All)', value: '230', change: '+2', up: true, color: '#ff9f43', bg: '#fff5e6', icon: '👩‍🏫' },
    { label: 'School Rank (State)', value: '#4', change: '+2', up: true, color: '#7367f0', bg: '#efedfd', icon: '🏆' },
    { label: 'Annual Revenue', value: '₹52,40,000', change: '+14.5%', up: true, color: '#00cfe8', bg: '#e0f9fc', icon: '💰' },
    { label: 'Avg. Pass Rate', value: '87.3%', change: '+3.2%', up: true, color: '#28c76f', bg: '#e8faf1', icon: '📊' },
    { label: 'Avg. Attendance', value: '94.2%', change: '+1.1%', up: true, color: '#ff6b6b', bg: '#fff0f0', icon: '✅' },
    { label: 'Pending Dues', value: '₹3,84,500', change: '-8.5%', up: false, color: '#ea5455', bg: '#fce8e8', icon: '⚠️' },
];

const branchComparison = [
    { name: 'North Branch', students: 1250, staff: 85, revenue: 18.2 },
    { name: 'South Branch', students: 980, staff: 70, revenue: 14.5 },
    { name: 'East Branch', students: 1050, staff: 75, revenue: 15.8 },
];

const overallPerformance = [
    { month: 'Apr', score: 84 }, { month: 'May', score: 86 }, { month: 'Jun', score: 82 },
    { month: 'Jul', score: 88 }, { month: 'Aug', score: 90 }, { month: 'Sep', score: 87 },
    { month: 'Oct', score: 92 }, { month: 'Nov', score: 89 }, { month: 'Dec', score: 85 },
    { month: 'Jan', score: 93 }, { month: 'Feb', score: 91 }, { month: 'Mar', score: 95 },
];

const incomeExpensePie = [
    { name: 'Income', value: 52400000, color: '#28c76f' },
    { name: 'Expense', value: 18200000, color: '#ea5455' },
];

const studentDemographics = [
    { name: 'Primary (I-V)', value: 1350, color: '#3d5ee1' },
    { name: 'Middle (VI-VIII)', value: 1100, color: '#28c76f' },
    { name: 'High (IX-X)', value: 580, color: '#ff9f43' },
    { name: 'Senior (XI-XII)', value: 250, color: '#7367f0' },
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

const PrincipalDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Year');

    return (
        <div className="rpt-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Principal Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Principal — School Leadership</span>
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
                            <span className={`rpt-kpi-change ${kpi.up ? 'up' : 'down'}`}>{kpi.up ? '▲' : '▼'} {kpi.change}<span className="rpt-kpi-vs"> vs last year</span></span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Overall Performance Trend */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Overall School Performance Index</h5>
                    <select className="rpt-select"><option>2024-25</option><option>2023-24</option></select>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={overallPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="pr-perf" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7367f0" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#7367f0" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} domain={[70, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="score" stroke="#7367f0" strokeWidth={3} fill="url(#pr-perf)" name="Score %" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Branch Comparison */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Branch-wise Comparison (Students vs Staff)</h5>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={branchComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
                            <Bar dataKey="students" fill="#3d5ee1" radius={[4, 4, 0, 0]} barSize={30} name="Students" />
                            <Bar dataKey="staff" fill="#ff9f43" radius={[4, 4, 0, 0]} barSize={30} name="Staff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Charts Row */}
            <div className="rpt-row rpt-row-2">
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Income vs Expense (Annual)</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={190}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={incomeExpensePie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                                    {incomeExpensePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-pie-legend">
                            {incomeExpensePie.map((item, i) => (
                                <div key={i} className="rpt-pie-legend-item">
                                    <span className="rpt-pie-dot" style={{ background: item.color }}></span>
                                    <span>{item.name}</span>
                                    <strong>₹{(item.value / 100000).toFixed(1)}L</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Student Demographics by Level</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={190}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={studentDemographics} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                                    {studentDemographics.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [v + ' students', '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-pie-legend">
                            {studentDemographics.map((item, i) => (
                                <div key={i} className="rpt-pie-legend-item">
                                    <span className="rpt-pie-dot" style={{ background: item.color }}></span>
                                    <span>{item.name}</span>
                                    <strong>{item.value}</strong>
                                    <span className="rpt-pie-pct">({Math.round(item.value / 3280 * 100)}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Principal Dashboard</p></footer>
        </div>
    );
};

export default PrincipalDashboard;
