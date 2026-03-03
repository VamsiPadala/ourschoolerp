import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../Reports/Reports.css';

// ── Dummy Data ──────────────────────────────────────────────────────────────
const kpiData = [
    { label: 'Total Books', value: '8,450', change: '+120', up: true, color: '#3d5ee1', bg: '#eef1fd', icon: '📚' },
    { label: 'Books Issued', value: '342', change: '+18', up: true, color: '#28c76f', bg: '#e8faf1', icon: '📖' },
    { label: 'Books Available', value: '8,108', change: '-18', up: false, color: '#ff9f43', bg: '#fff5e6', icon: '✅' },
    { label: 'Overdue Books', value: '27', change: '+4', up: false, color: '#ea5455', bg: '#fce8e8', icon: '⏰' },
    { label: 'Total Members', value: '1,180', change: '+35', up: true, color: '#7367f0', bg: '#efedfd', icon: '👤' },
    { label: 'Active Members', value: '342', change: '+18', up: true, color: '#00cfe8', bg: '#e0f9fc', icon: '🔖' },
    { label: 'Fine Collected', value: '₹2,400', change: '+800', up: true, color: '#ff6b6b', bg: '#fff0f0', icon: '💳' },
    { label: 'Book Categories', value: '12', change: '+2', up: true, color: '#6c757d', bg: '#f0f0f0', icon: '🏷️' },
];

const monthlyIssuanceData = [
    { month: 'Apr', issued: 280, returned: 265 }, { month: 'May', issued: 310, returned: 295 },
    { month: 'Jun', issued: 260, returned: 255 }, { month: 'Jul', issued: 320, returned: 310 },
    { month: 'Aug', issued: 350, returned: 335 }, { month: 'Sep', issued: 330, returned: 315 },
    { month: 'Oct', issued: 360, returned: 345 }, { month: 'Nov', issued: 300, returned: 285 },
    { month: 'Dec', issued: 270, returned: 260 }, { month: 'Jan', issued: 340, returned: 326 },
    { month: 'Feb', issued: 342, returned: 315 }, { month: 'Mar', issued: 375, returned: 348 },
];

const categoryPie = [
    { name: 'Textbooks', value: 4500, color: '#3d5ee1' },
    { name: 'Reference', value: 1200, color: '#28c76f' },
    { name: 'Fiction', value: 850, color: '#ff9f43' },
    { name: 'Non-Fiction', value: 600, color: '#7367f0' },
    { name: 'Journals', value: 300, color: '#00cfe8' },
    { name: 'Stationery', value: 1000, color: '#ea5455' },
];

const memberTypePie = [
    { name: 'Students', value: 980, color: '#3d5ee1' },
    { name: 'Teachers', value: 85, color: '#28c76f' },
    { name: 'Staff', value: 115, color: '#ff9f43' },
];

const overdueBooks = [
    { student: 'Amit Sharma', bookTitle: 'Fundamentals of Physics', dueDate: '2025-02-01', days: 30, class: 'XI-A' },
    { student: 'Priya Nair', bookTitle: 'Advanced Mathematics', dueDate: '2025-02-10', days: 21, class: 'XII-B' },
    { student: 'Arjun Mehta', bookTitle: 'English Literature', dueDate: '2025-02-15', days: 16, class: 'X-A' },
    { student: 'Sneha Reddy', bookTitle: 'Biology Textbook', dueDate: '2025-02-20', days: 11, class: 'XI-C' },
    { student: 'Rohan Singh', bookTitle: 'Computer Science', dueDate: '2025-02-25', days: 6, class: 'XII-A' },
];

const topBooksData = [
    { title: 'Physics Part I', borrows: 48 },
    { title: 'Mathematics XI', borrows: 45 },
    { title: 'Harry Potter', borrows: 42 },
    { title: 'Biology XII', borrows: 38 },
    { title: 'English Grammar', borrows: 35 },
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

const LibraryDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Year');

    return (
        <div className="rpt-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Library Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Library Management</span>
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

            {/* Monthly Issuance Chart */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Monthly Book Issuance vs Returns</h5>
                    <div className="rpt-legend-row" style={{ marginTop: 0 }}>
                        <div className="rpt-lgnd"><span style={{ background: '#3d5ee1' }}></span> Issued</div>
                        <div className="rpt-lgnd"><span style={{ background: '#28c76f' }}></span> Returned</div>
                    </div>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={monthlyIssuanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
                            <Bar dataKey="issued" fill="#3d5ee1" radius={[4, 4, 0, 0]} barSize={22} name="Issued" />
                            <Bar dataKey="returned" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={22} name="Returned" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie & Top Books Row */}
            <div className="rpt-row rpt-row-3">
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Books by Category</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={categoryPie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                    {categoryPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v, n) => [v + ' books', n]} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-exam-legend" style={{ padding: '4px', gap: '3px 6px' }}>
                            {categoryPie.map((item, i) => (
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
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Member Types</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={160}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={memberTypePie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
                                    {memberTypePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [v + ' members', '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-pie-legend">
                            {memberTypePie.map((item, i) => (
                                <div key={i} className="rpt-pie-legend-item">
                                    <span className="rpt-pie-dot" style={{ background: item.color }}></span>
                                    <span>{item.name}</span>
                                    <strong>{item.value}</strong>
                                    <span className="rpt-pie-pct">({Math.round(item.value / 1180 * 100)}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Top Borrowed Books</h5></div>
                    <div className="rpt-chart-body">
                        <div className="rpt-subject-table">
                            {topBooksData.map((b, i) => (
                                <div key={i} className="rpt-subject-row" style={{ gridTemplateColumns: '1fr 60px 45px' }}>
                                    <span style={{ fontWeight: 600, fontSize: 12 }}>{b.title}</span>
                                    <div className="rpt-bar-wrap">
                                        <div className="rpt-bar-fill" style={{ width: `${Math.round(b.borrows / 48 * 100)}%`, background: '#3d5ee1' }}></div>
                                    </div>
                                    <span className="rpt-score" style={{ fontSize: 14 }}>{b.borrows}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overdue Books Table */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">⚠️ Overdue Books — Action Required</h5>
                    <div className="rpt-table-actions">
                        <Link to="/school/library/issue-return" className="rpt-btn-outline">Manage Returns →</Link>
                    </div>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead><tr><th>Student</th><th>Class</th><th>Book Title</th><th>Due Date</th><th>Days Overdue</th></tr></thead>
                        <tbody>
                            {overdueBooks.map((b, i) => (
                                <tr key={i}>
                                    <td><strong>{b.student}</strong></td>
                                    <td>{b.class}</td>
                                    <td>{b.bookTitle}</td>
                                    <td style={{ color: '#8c90a4' }}>{b.dueDate}</td>
                                    <td>
                                        <span className={`rpt-badge ${b.days > 20 ? 'rpt-badge-red' : b.days > 10 ? 'rpt-badge-orange' : 'rpt-badge-blue'}`}>
                                            {b.days} days
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Library Dashboard</p></footer>
        </div>
    );
};

export default LibraryDashboard;
