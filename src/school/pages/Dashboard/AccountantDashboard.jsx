import React, { useState } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';
import './RolesDashboard.css';

// ── Data ─────────────────────────────────────────────────────────────
const kpiCards = [
    { label: 'Total Income', value: '₹5.41L', sub: 'This Year', icon: '📈', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Total Expense', value: '₹1.38L', sub: 'This Year', icon: '📉', color: '#ea5455', bg: '#fce8e8' },
    { label: 'Fee Collected', value: '₹4.82L', sub: 'This Month', icon: '💰', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Fee Pending', value: '₹86,300', sub: 'Outstanding', icon: '⚠️', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Transactions', value: '1,482', sub: 'Processed', icon: '🔄', color: '#00cfe8', bg: '#e0f9fc' },
];

const incomeVsExpense = [
    { month: 'Apr', income: 410000, expense: 95000 },
    { month: 'May', income: 420000, expense: 102000 },
    { month: 'Jun', income: 395000, expense: 110000 },
    { month: 'Jul', income: 450000, expense: 98000 },
    { month: 'Aug', income: 480000, expense: 115000 },
    { month: 'Sep', income: 430000, expense: 108000 },
    { month: 'Oct', income: 510000, expense: 130000 },
    { month: 'Nov', income: 400000, expense: 120000 },
    { month: 'Dec', income: 375000, expense: 140000 },
    { month: 'Jan', income: 470000, expense: 112000 },
    { month: 'Feb', income: 505000, expense: 123450 },
];

const feeByClass = [
    { class: 'I-III', collected: 155000, due: 28000 },
    { class: 'IV-VI', collected: 182000, due: 22000 },
    { class: 'VII-IX', collected: 210000, due: 18000 },
    { class: 'X', collected: 145000, due: 12000 },
    { class: 'XI-XII', collected: 110000, due: 6300 },
];

const expenseBreakdown = [
    { name: 'Salaries', value: 68000, color: '#3d5ee1' },
    { name: 'Utilities', value: 18000, color: '#ff9f43' },
    { name: 'Maintenance', value: 12000, color: '#28c76f' },
    { name: 'Supplies', value: 8000, color: '#00cfe8' },
    { name: 'Other', value: 17450, color: '#7367f0' },
];

const recentTransactions = [
    { ref: 'TXN-2025-001', student: 'Arjun Sharma', type: 'Fee – Tuition', amount: 8000, method: 'Cash', status: 'Collected' },
    { ref: 'TXN-2025-002', student: 'Priya Nair', type: 'Fee – Transport', amount: 3200, method: 'Bank', status: 'Collected' },
    { ref: 'TXN-2025-003', student: 'Karan Singh', type: 'Fee – Hostel', amount: 12000, method: 'UPI', status: 'Collected' },
    { ref: 'TXN-2025-004', student: 'Meena Pillai', type: 'Fee – Tuition', amount: 8000, method: 'Cash', status: 'Pending' },
    { ref: 'TXN-2025-005', student: 'Rohit Verma', type: 'Fee – Library', amount: 1500, method: 'Online', status: 'Collected' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
                <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0' }}>
                        {p.name}: <strong>₹{p.value.toLocaleString()}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const AccountantDashboard = () => {
    const [period, setPeriod] = useState('11M');

    return (
        <div className="dashboard-page">
            {/* Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Accountant Dashboard</h4>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span className="current">Accountant Dashboard</span>
                    </nav>
                </div>
                <div className="page-header-actions">
                    <div className="period-toggle">
                        {['3M', '6M', '11M'].map(p => (
                            <button key={p} className={`period-btn ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
                        ))}
                    </div>
                    <button className="btn btn-primary">📊 Generate Report</button>
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

            {/* Row: Income vs Expense + Expense Breakdown */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header">
                        <h5>Income vs Expense (Monthly)</h5>
                        <div className="rdb-legend-row">
                            <span className="rdb-dot" style={{ background: '#28c76f' }} />Income
                            <span className="rdb-dot" style={{ background: '#ea5455' }} />Expense
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={incomeVsExpense} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="income" name="Income" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={16} />
                                <Bar dataKey="expense" name="Expense" fill="#ea5455" radius={[4, 4, 0, 0]} barSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header"><h5>Expense Breakdown</h5></div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 0 }}>
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie isAnimationActive={false} data={expenseBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                                    {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        {expenseBreakdown.map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, width: '100%' }}>
                                <span className="rdb-dot" style={{ background: item.color }} />
                                <span style={{ flex: 1, fontSize: 13 }}>{item.name}</span>
                                <strong style={{ fontSize: 13 }}>₹{item.value.toLocaleString()}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row: Class-wise Fee + Recent Transactions */}
            <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                <div className="dashboard-card">
                    <div className="card-header"><h5>Class-wise Fee Status</h5></div>
                    <div className="card-body" style={{ paddingTop: 8 }}>
                        {feeByClass.map((c, i) => {
                            const pct = Math.round(c.collected / (c.collected + c.due) * 100);
                            return (
                                <div key={i} className="rdb-fee-row">
                                    <div className="rdb-fee-meta">
                                        <span className="rdb-fee-class">{c.class}</span>
                                        <span className="rdb-fee-pct" style={{ color: pct >= 85 ? '#28c76f' : '#ff9f43' }}>{pct}%</span>
                                    </div>
                                    <div className="rdb-fee-bar-bg">
                                        <div className="rdb-fee-bar-fill" style={{ width: `${pct}%`, background: pct >= 85 ? '#28c76f' : '#ff9f43' }} />
                                    </div>
                                    <div className="rdb-fee-nums">
                                        <span style={{ color: '#28c76f', fontSize: 12 }}>₹{(c.collected / 1000).toFixed(0)}k</span>
                                        <span style={{ color: '#ea5455', fontSize: 12 }}>₹{(c.due / 1000).toFixed(0)}k due</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h5>Recent Transactions</h5>
                        <a href="#" className="view-all">View All →</a>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="rdb-table">
                            <thead>
                                <tr>
                                    <th>Ref No</th>
                                    <th>Student</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((t, i) => (
                                    <tr key={i}>
                                        <td><span className="rdb-badge badge-blue" style={{ fontSize: 10 }}>{t.ref}</span></td>
                                        <td><strong>{t.student}</strong></td>
                                        <td style={{ fontSize: 12 }}>{t.type}</td>
                                        <td><strong>₹{t.amount.toLocaleString()}</strong></td>
                                        <td style={{ fontSize: 12 }}>{t.method}</td>
                                        <td>
                                            <span className={`rdb-badge ${t.status === 'Collected' ? 'badge-green' : 'badge-orange'}`}>{t.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <footer className="dashboard-footer">
                <p>Copyright © 2024 MindWhile. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AccountantDashboard;
