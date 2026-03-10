import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import './RolesDashboard.css';

const kpiCards = [
    { label: 'Total Books', value: '8,950', sub: '7 Categories', icon: '📚', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Books Issued', value: '342', sub: 'Currently Out', icon: '📤', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Books Returned', value: '128', sub: 'This Month', icon: '📥', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Overdue Books', value: '37', sub: 'Action Needed', icon: '⚠️', color: '#ea5455', bg: '#fce8e8' },
    { label: 'Members', value: '1,248', sub: 'Active Members', icon: '👥', color: '#7367f0', bg: '#efedfd' },
    { label: 'Fine Collected', value: '₹3,840', sub: 'This Month', icon: '💰', color: '#00cfe8', bg: '#e0f9fc' },
];

const bookInventory = [
    { name: 'Textbooks', value: 4500, color: '#3d5ee1' },
    { name: 'Reference', value: 1200, color: '#28c76f' },
    { name: 'Fiction', value: 850, color: '#ff9f43' },
    { name: 'Journals', value: 300, color: '#00cfe8' },
    { name: 'Stationery', value: 2100, color: '#ea5455' },
];

const monthlyIssued = [
    { month: 'Oct', issued: 280, returned: 260 },
    { month: 'Nov', issued: 310, returned: 295 },
    { month: 'Dec', issued: 240, returned: 230 },
    { month: 'Jan', issued: 320, returned: 305 },
    { month: 'Feb', issued: 342, returned: 128 },
];

const topBooks = [
    { title: 'NCERT Mathematics X', category: 'Textbook', issued: 48, available: 12 },
    { title: 'Wings of Fire', category: 'Biography', issued: 35, available: 5 },
    { title: 'Harry Potter Series', category: 'Fiction', issued: 30, available: 8 },
    { title: 'NCERT Science IX', category: 'Textbook', issued: 28, available: 15 },
];

const overdueStudents = [
    { name: 'Rohan Gupta', book: 'Wings of Fire', daysOver: 12 },
    { name: 'Priya Sharma', book: 'NCERT Math X', daysOver: 10 },
    { name: 'Arun Kumar', book: 'Physics Ref', daysOver: 7 },
    { name: 'Meena Pillai', book: 'Oxford Grammar', daysOver: 4 },
];

const LibraryDashboard = () => (
    <div className="dashboard-page">
        <div className="page-header">
            <div className="page-title">
                <h4>Library Dashboard</h4>
                <nav className="breadcrumb"><span>Dashboard</span> / <span className="current">Library Dashboard</span></nav>
            </div>
            <div className="page-header-actions">
                <button className="btn btn-outline">📋 Issue Book</button>
                <button className="btn btn-primary">+ Add Book</button>
            </div>
        </div>

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

        <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
            <div className="dashboard-card">
                <div className="card-header">
                    <h5>Monthly Books Issued vs Returned</h5>
                    <div className="rdb-legend-row">
                        <span className="rdb-dot" style={{ background: '#3d5ee1' }} />Issued
                        <span className="rdb-dot" style={{ background: '#28c76f' }} />Returned
                    </div>
                </div>
                <div className="card-body" style={{ paddingTop: 0 }}>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={monthlyIssued} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 12 }} />
                            <Tooltip formatter={(v, n) => [`${v} books`, n]} />
                            <Bar dataKey="issued" name="Issued" fill="#3d5ee1" radius={[4, 4, 0, 0]} barSize={24} />
                            <Bar dataKey="returned" name="Returned" fill="#28c76f" radius={[4, 4, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="card-header"><h5>Inventory by Category</h5></div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 0 }}>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie isAnimationActive={false} data={bookInventory} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                                {bookInventory.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Tooltip formatter={(v) => [`${v} books`, '']} />
                        </PieChart>
                    </ResponsiveContainer>
                    {bookInventory.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, width: '100%' }}>
                            <span className="rdb-dot" style={{ background: item.color }} />
                            <span style={{ flex: 1, fontSize: 13 }}>{item.name}</span>
                            <strong style={{ fontSize: 13 }}>{item.value.toLocaleString()}</strong>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="dashboard-row" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
            <div className="dashboard-card">
                <div className="card-header">
                    <h5>Most Issued Books</h5>
                    <a href="#" className="view-all">View All →</a>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="rdb-table">
                        <thead><tr><th>#</th><th>Title</th><th>Category</th><th>Issued</th><th>Available</th></tr></thead>
                        <tbody>
                            {topBooks.map((b, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 700 }}>{i + 1}</td>
                                    <td><strong>{b.title}</strong></td>
                                    <td><span className="rdb-badge badge-blue">{b.category}</span></td>
                                    <td>{b.issued}</td>
                                    <td><span className={`rdb-badge ${b.available > 10 ? 'badge-green' : b.available > 5 ? 'badge-orange' : 'badge-red'}`}>{b.available}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="card-header">
                    <h5>Overdue Books</h5>
                    <span className="rdb-badge badge-red">{overdueStudents.length} Overdue</span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="rdb-table">
                        <thead><tr><th>Student</th><th>Book</th><th>Days Late</th></tr></thead>
                        <tbody>
                            {overdueStudents.map((o, i) => (
                                <tr key={i}>
                                    <td><strong>{o.name}</strong></td>
                                    <td style={{ fontSize: 12 }}>{o.book}</td>
                                    <td><span className="rdb-badge badge-red">+{o.daysOver}d</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-body" style={{ paddingTop: 14 }}>
                    <div className="rdb-book-stats">
                        {[
                            { icon: '📚', label: 'Total', value: '8,950', color: '#3d5ee1' },
                            { icon: '📤', label: 'Issued', value: '342', color: '#ff9f43' },
                            { icon: '📥', label: 'Available', value: '8,608', color: '#28c76f' },
                            { icon: '⚠️', label: 'Overdue', value: '37', color: '#ea5455' },
                        ].map((s, i) => (
                            <div key={i} className="rdb-book-stat">
                                <span className="rdb-book-stat-icon">{s.icon}</span>
                                <span className="rdb-book-stat-value" style={{ color: s.color }}>{s.value}</span>
                                <span className="rdb-book-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <footer className="dashboard-footer"><p>Copyright © 2024 MindWhile. All rights reserved.</p></footer>
    </div>
);

export default LibraryDashboard;
