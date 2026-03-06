import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconReceipt, IconCash, IconCreditCard, IconChartPie, IconWallet, IconHistory } from '@tabler/icons-react';
import './StudentTransactionHistory.css';

const StudentTransactionHistory = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();

    // Mock data for the specific student based on ID
    const student = {
        id: studentId || 'STU-2023-001',
        name: 'Rahul Sharma',
        class: '10-A',
        section: 'A',
        roll: '15',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        totalAssigned: 45000,
        totalPaid: 35000,
        totalBalance: 10000
    };

    const transactions = [
        { id: 'RCP-2026-001', date: '01 Feb 2026', type: 'Tuition Fee (Q1)', amount: 15000, method: 'Bank Transfer', ref: 'TXN-9823412', status: 'Success' },
        { id: 'RCP-2026-002', date: '15 Mar 2026', type: 'Transport Fee + Exam Fee', amount: 8000, method: 'Cash', ref: '-', status: 'Success' },
        { id: 'RCP-2026-003', date: '10 Apr 2026', type: 'Tuition Fee (Q2)', amount: 12000, method: 'UPI', ref: 'UPI-12345678', status: 'Success' },
    ];

    return (
        <div className="th-page">
            <header className="th-header">
                <div className="th-title-area">
                    <h1>Transaction History</h1>
                    <div className="th-breadcrumb">
                        Dashboard / Finance / <span>Student Transactions</span>
                    </div>
                </div>
                <button
                    className="btn-premium btn-premium-outline"
                    onClick={() => navigate(-1)}
                    style={{ background: 'white', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, color: '#475569' }}
                >
                    <IconArrowLeft size={18} /> Back to List
                </button>
            </header>

            <div className="th-student-card">
                <img src={student.image} alt={student.name} className="th-student-avatar" />
                <div className="th-student-info">
                    <h2>{student.name}</h2>
                    <div className="th-student-meta">
                        <div className="th-meta-item">
                            <span style={{ color: '#94a3b8' }}>ID:</span> <strong>{student.id}</strong>
                        </div>
                        <div className="th-meta-item">
                            <span style={{ color: '#94a3b8' }}>Class:</span> <strong>{student.class}</strong>
                        </div>
                        <div className="th-meta-item">
                            <span style={{ color: '#94a3b8' }}>Roll:</span> <strong>{student.roll}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="th-stats-row">
                <div className="th-stat-box">
                    <span className="th-stat-label">Total Assigned</span>
                    <span className="th-stat-value">₹{student.totalAssigned.toLocaleString()}</span>
                    <div className="th-stat-icon" style={{ background: '#eff2ff', color: '#3d5ee1' }}>
                        <IconChartPie size={32} />
                    </div>
                </div>
                <div className="th-stat-box">
                    <span className="th-stat-label">Total Paid</span>
                    <span className="th-stat-value" style={{ color: '#28c76f' }}>₹{student.totalPaid.toLocaleString()}</span>
                    <div className="th-stat-icon" style={{ background: '#ebfaf2', color: '#28c76f' }}>
                        <IconWallet size={32} />
                    </div>
                </div>
                <div className="th-stat-box">
                    <span className="th-stat-label">Total Balance</span>
                    <span className="th-stat-value" style={{ color: '#ea5455' }}>₹{student.totalBalance.toLocaleString()}</span>
                    <div className="th-stat-icon" style={{ background: '#fef2f2', color: '#ea5455' }}>
                        <IconCash size={32} />
                    </div>
                </div>
            </div>

            <div className="th-table-card">
                <div className="th-table-header">
                    <IconHistory size={22} color="#3d5ee1" /> Payment Records
                </div>
                <table className="th-table">
                    <thead>
                        <tr>
                            <th>Receipt No.</th>
                            <th>Date</th>
                            <th>Fee Type</th>
                            <th>Payment Mode</th>
                            <th>Reference</th>
                            <th style={{ textAlign: 'right' }}>Amount Paid</th>
                            <th style={{ textAlign: 'center' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(txn => (
                            <tr key={txn.id}>
                                <td><strong style={{ color: '#3d5ee1' }}>{txn.id}</strong></td>
                                <td style={{ fontWeight: 600 }}>{txn.date}</td>
                                <td>{txn.type}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                        {txn.method === 'Cash' ? <IconCash size={16} color="#64748b" /> : <IconCreditCard size={16} color="#64748b" />}
                                        {txn.method}
                                    </div>
                                </td>
                                <td style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.85rem' }}>{txn.ref}</td>
                                <td style={{ textAlign: 'right', fontWeight: 800, color: '#1e293b' }}>₹{txn.amount.toLocaleString()}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <span className="th-badge th-badge-success">{txn.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default StudentTransactionHistory;
