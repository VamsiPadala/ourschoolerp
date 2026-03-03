import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../pages/Reports/Reports.css';

const kpiData = [
    { label: 'Total Revenue (Annual)', value: '₹52,40,000', change: '+14.5%', up: true, color: '#28c76f', bg: '#e8faf1', icon: '💰' },
    { label: 'Total Expenses', value: '₹18,20,000', change: '-4.2%', up: false, color: '#ea5455', bg: '#fce8e8', icon: '📉' },
    { label: 'Net Profit', value: '₹34,20,000', change: '+22.1%', up: true, color: '#3d5ee1', bg: '#eef1fd', icon: '📈' },
    { label: 'Pending Dues', value: '₹3,84,500', change: '-8.5%', up: false, color: '#ff9f43', bg: '#fff5e6', icon: '⚠️' },
    { label: 'Fee Collected Today', value: '₹34,200', change: '+18%', up: true, color: '#00cfe8', bg: '#e0f9fc', icon: '💳' },
    { label: 'Monthly Payroll', value: '₹8,45,000', change: '+1.2%', up: false, color: '#7367f0', bg: '#efedfd', icon: '👔' },
    { label: 'Pending Invoices', value: '11', change: '-3', up: true, color: '#ff6b6b', bg: '#fff0f0', icon: '🧾' },
    { label: 'Income Heads', value: '8', change: '0', up: true, color: '#6c757d', bg: '#f0f0f0', icon: '📋' },
];

const incomeExpenseData = [
    { month: 'Apr', income: 410000, expense: 95000 }, { month: 'May', income: 420000, expense: 102000 },
    { month: 'Jun', income: 395000, expense: 110000 }, { month: 'Jul', income: 450000, expense: 98000 },
    { month: 'Aug', income: 480000, expense: 115000 }, { month: 'Sep', income: 430000, expense: 108000 },
    { month: 'Oct', income: 510000, expense: 130000 }, { month: 'Nov', income: 400000, expense: 120000 },
    { month: 'Dec', income: 375000, expense: 140000 }, { month: 'Jan', income: 470000, expense: 112000 },
    { month: 'Feb', income: 505000, expense: 123450 }, { month: 'Mar', income: 530000, expense: 128000 },
];

const feeCollectionMonthly = [
    { month: 'Apr', collected: 320000, due: 80000 }, { month: 'May', collected: 350000, due: 70000 },
    { month: 'Jun', collected: 300000, due: 95000 }, { month: 'Jul', collected: 420000, due: 60000 },
    { month: 'Aug', collected: 460000, due: 50000 }, { month: 'Sep', collected: 390000, due: 85000 },
];

const expenseBreakdown = [
    { name: 'Payroll', value: 845000, color: '#3d5ee1' },
    { name: 'Maintenance', value: 240000, color: '#ff9f43' },
    { name: 'Utilities', value: 185000, color: '#28c76f' },
    { name: 'Supplies', value: 230000, color: '#00cfe8' },
    { name: 'Others', value: 320000, color: '#ea5455' },
];

const incomeExpensePie = [
    { name: 'Income', value: 5240000, color: '#28c76f' },
    { name: 'Expense', value: 1820000, color: '#ea5455' },
];

const recentTransactions = [
    { name: 'Tuition Fee - Class X', amount: '+₹12,000', type: 'credit', time: '10:42 AM', student: 'Riya Sharma' },
    { name: 'Electricity Bill', amount: '-₹8,500', type: 'debit', time: '09:15 AM', student: 'Admin' },
    { name: 'Lab Fee - Class XI', amount: '+₹4,500', type: 'credit', time: 'Yesterday', student: 'Arjun Mehta' },
    { name: 'Staff Payroll', amount: '-₹84,500', type: 'debit', time: 'Yesterday', student: 'Admin' },
    { name: 'Annual Fee - Class VII', amount: '+₹18,000', type: 'credit', time: '2 days ago', student: 'Priya Nair' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rpt-tooltip">
                <p className="rpt-tooltip-label">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0', fontSize: 13 }}>
                        {p.name}: <strong>₹{p.value.toLocaleString()}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const AccountantDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Year');

    return (
        <div className="rpt-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Accountant Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Finance Management</span>
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

            {/* Income vs Expense Area Chart */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Yearly Income vs Expense</h5>
                    <select className="rpt-select"><option>2024-25</option><option>2023-24</option></select>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={incomeExpenseData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="ac-inc" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#28c76f" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#28c76f" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="ac-exp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ea5455" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#ea5455" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="income" stroke="#28c76f" strokeWidth={2.5} fill="url(#ac-inc)" name="Income" />
                            <Area type="monotone" dataKey="expense" stroke="#ea5455" strokeWidth={2.5} fill="url(#ac-exp)" name="Expense" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Row: Fee Bar Chart + Expense Pie + IE Pie */}
            <div className="rpt-row rpt-row-3">
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Monthly Fee Collection</h5></div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={feeCollectionMonthly} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
                                <Bar dataKey="collected" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={14} name="Collected" />
                                <Bar dataKey="due" fill="#ea5455" radius={[4, 4, 0, 0]} barSize={14} name="Pending" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Expense Breakdown</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={expenseBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                    {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-exam-legend" style={{ padding: '6px', gap: '4px' }}>
                            {expenseBreakdown.map((item, i) => (
                                <div key={i} className="rpt-exam-legend-item" style={{ fontSize: '11px' }}>
                                    <span className="rpt-pie-dot" style={{ background: item.color, width: '8px', height: '8px' }}></span>
                                    <span>{item.name}</span>
                                    <strong>₹{(item.value / 1000).toFixed(0)}K</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Income vs Expense</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={incomeExpensePie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                                    {incomeExpensePie.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-pie-legend" style={{ gap: '6px 12px' }}>
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
            </div>

            {/* Recent Transactions Table */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">Recent Transactions</h5>
                    <div className="rpt-table-actions">
                        <button className="rpt-btn-outline">📄 PDF</button>
                        <button className="rpt-btn-outline">📊 Excel</button>
                        <Link to="/school/finance/all-transactions" className="rpt-btn-outline">View All →</Link>
                    </div>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead><tr><th>Description</th><th>Person</th><th>Amount</th><th>Time</th><th>Type</th></tr></thead>
                        <tbody>
                            {recentTransactions.map((t, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{t.name}</td>
                                    <td>{t.student}</td>
                                    <td><strong style={{ color: t.type === 'credit' ? '#28c76f' : '#ea5455' }}>{t.amount}</strong></td>
                                    <td style={{ color: '#8c90a4' }}>{t.time}</td>
                                    <td><span className={`rpt-badge ${t.type === 'credit' ? 'rpt-badge-green' : 'rpt-badge-red'}`}>{t.type === 'credit' ? 'Credit' : 'Debit'}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Accountant Dashboard</p></footer>
        </div>
    );
};

export default AccountantDashboard;
