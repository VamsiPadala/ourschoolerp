import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../pages/Reports/Reports.css';

const kpiData = [
    { label: 'Student Attendance', value: '95.4%', change: '+1.8%', up: true, color: '#28c76f', bg: '#e8faf1', icon: '✅' },
    { label: 'Staff Attendance', value: '97.6%', change: '+0.4%', up: true, color: '#3d5ee1', bg: '#eef1fd', icon: '👩‍🏫' },
    { label: 'Active Classes', value: '42', change: '0', up: true, color: '#ff9f43', bg: '#fff5e6', icon: '🏫' },
    { label: 'Upcoming Events', value: '3', change: '+1', up: true, color: '#7367f0', bg: '#efedfd', icon: '📅' },
    { label: 'Avg Score (Exam)', value: '76.2%', change: '+2.3%', up: true, color: '#00cfe8', bg: '#e0f9fc', icon: '📊' },
    { label: 'Homework Pending', value: '18', change: '-5', up: true, color: '#ea5455', bg: '#fce8e8', icon: '📚' },
    { label: 'Complaints', value: '2', change: '-3', up: true, color: '#ff6b6b', bg: '#fff0f0', icon: '🚨' },
    { label: 'Pass Rate (Exams)', value: '88%', change: '+3%', up: true, color: '#6c757d', bg: '#f0f0f0', icon: '🏆' },
];

const weeklyAttendance = [
    { name: 'Mon', students: 1180, staff: 82 }, { name: 'Tue', students: 1205, staff: 85 },
    { name: 'Wed', students: 1120, staff: 80 }, { name: 'Thu', students: 1190, staff: 84 },
    { name: 'Fri', students: 1150, staff: 79 }, { name: 'Sat', students: 1080, staff: 70 },
];

const gradeDistribution = [
    { name: 'A+ (90-100)', value: 220, color: '#28c76f' },
    { name: 'A (80-89)', value: 340, color: '#3d5ee1' },
    { name: 'B (70-79)', value: 280, color: '#ff9f43' },
    { name: 'C (60-69)', value: 180, color: '#00cfe8' },
    { name: 'D (50-59)', value: 130, color: '#7367f0' },
    { name: 'F (<50)', value: 98, color: '#ea5455' },
];

const subjectPassRates = [
    { subject: 'Maths', pass: 78 }, { subject: 'Science', pass: 82 },
    { subject: 'English', pass: 91 }, { subject: 'Social', pass: 85 },
    { subject: 'Computer', pass: 95 }, { subject: 'Hindi', pass: 88 },
];

const genderPie = [
    { name: 'Male', value: 672, color: '#3d5ee1' },
    { name: 'Female', value: 578, color: '#ff6b9d' },
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

const BranchPrincipalDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Week');

    return (
        <div className="rpt-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Branch Principal Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Branch Principal (Read-Only)</span>
                    </nav>
                </div>
                <div className="rpt-header-actions">
                    {['This Week', 'This Month', 'This Year'].map(p => (
                        <button key={p} className={`rpt-period-btn ${activePeriod === p ? 'active' : ''}`} onClick={() => setActivePeriod(p)}>{p}</button>
                    ))}
                </div>
            </div>

            <div className="rpt-kpi-grid">
                {kpiData.map((kpi, i) => (
                    <div key={i} className="rpt-kpi-card">
                        <div className="rpt-kpi-icon" style={{ background: kpi.bg, color: kpi.color }}><span>{kpi.icon}</span></div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label">{kpi.label}</p>
                            <h3 className="rpt-kpi-value">{kpi.value}</h3>
                            <span className={`rpt-kpi-change ${kpi.up ? 'up' : 'down'}`}>{kpi.up ? '▲' : '▼'} {kpi.change}<span className="rpt-kpi-vs"> vs last week</span></span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Weekly Attendance Chart */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Weekly Attendance (Students vs Staff)</h5>
                    <div className="rpt-legend-row" style={{ marginTop: 0 }}>
                        <div className="rpt-lgnd"><span style={{ background: '#3d5ee1' }}></span> Students</div>
                        <div className="rpt-lgnd"><span style={{ background: '#ff9f43' }}></span> Staff</div>
                    </div>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={weeklyAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
                            <Bar dataKey="students" fill="#3d5ee1" radius={[4, 4, 0, 0]} barSize={22} name="Students" />
                            <Bar dataKey="staff" fill="#ff9f43" radius={[4, 4, 0, 0]} barSize={22} name="Staff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row: Grade Distribution + Gender + Subject Pass Rates */}
            <div className="rpt-row rpt-row-3">
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Grade Distribution</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={gradeDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                    {gradeDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v, n) => [v + ' students', n]} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-exam-legend" style={{ padding: '8px', gap: '4px 8px' }}>
                            {gradeDistribution.map((item, i) => (
                                <div key={i} className="rpt-exam-legend-item" style={{ fontSize: '11px' }}>
                                    <span className="rpt-pie-dot" style={{ background: item.color, width: '8px', height: '8px' }}></span>
                                    <span>{item.name.split(' ')[0]}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Student Gender Ratio</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={genderPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
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
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Subject Pass Rates</h5></div>
                    <div className="rpt-chart-body">
                        <div className="rpt-subject-table">
                            {subjectPassRates.map((s, i) => (
                                <div key={i} className="rpt-subject-row" style={{ gridTemplateColumns: '100px 1fr 60px' }}>
                                    <span style={{ fontWeight: 600, fontSize: 13 }}>{s.subject}</span>
                                    <div className="rpt-bar-wrap">
                                        <div className="rpt-bar-fill" style={{ width: `${s.pass}%`, background: s.pass >= 90 ? '#28c76f' : s.pass >= 80 ? '#3d5ee1' : '#ff9f43' }}></div>
                                    </div>
                                    <span className="rpt-score">{s.pass}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Branch Principal Dashboard (Read-Only)</p></footer>
        </div>
    );
};

export default BranchPrincipalDashboard;
