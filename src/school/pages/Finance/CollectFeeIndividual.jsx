import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    IconArrowLeft, IconCreditCard, IconCash, IconBuildingBank,
    IconCheck, IconUser, IconSchool, IconCalendar, IconChartPie,
    IconCurrencyRupee, IconPercentage, IconCalendarStats, IconWallet,
    IconBriefcase, IconAlertCircle, IconBus, IconBook, IconFlask,
    IconHome, IconActivity, IconListCheck, IconReceipt,
    IconChevronRight, IconTag, IconHistory, IconEye,
    IconArrowBackUp, IconX, IconPrinter, IconSearch, IconFilter
} from '@tabler/icons-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './CollectFeeIndividual.css';

/* ─── Fee meta maps ─────────────────────────────────────── */
const FEE_ICONS = {
    'Admission Fee': <IconReceipt size={18} />,
    'Tuition Fee': <IconBook size={18} />,
    'Transport Fee': <IconBus size={18} />,
    'Hostel Fee': <IconHome size={18} />,
    'Examination Fee': <IconListCheck size={18} />,
    'Lab Fee': <IconFlask size={18} />,
    'Activity Fee': <IconActivity size={18} />,
    'Library Fee': <IconBook size={18} />,
};

const FEE_COLORS = {
    'Admission Fee': { bg: '#eff2ff', color: '#3d5ee1', border: '#c7d0fa' },
    'Tuition Fee': { bg: '#fff9ec', color: '#d97706', border: '#fde68a' },
    'Transport Fee': { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    'Hostel Fee': { bg: '#fdf4ff', color: '#9333ea', border: '#e9d5ff' },
    'Examination Fee': { bg: '#fff1f2', color: '#e11d48', border: '#fecdd3' },
    'Lab Fee': { bg: '#f0fdfa', color: '#0d9488', border: '#99f6e4' },
    'Activity Fee': { bg: '#fff7ed', color: '#ea580c', border: '#fed7aa' },
    'Library Fee': { bg: '#f0f9ff', color: '#0284c7', border: '#bae6fd' },
};

const METHOD_ICONS = { Cash: <IconCash size={14} />, Bank: <IconBuildingBank size={14} />, Card: <IconCreditCard size={14} /> };

/* ─── Mock payment history ──────────────────────────────── */
const INITIAL_HISTORY = [
    { id: 'RCP-001', date: '2026-02-01', feeType: 'Tuition Fee', amount: 8000, method: 'Cash', ref: 'CASH-001', status: 'Collected', collector: 'Mrs. Sharma', note: 'Feb installment' },
    { id: 'RCP-002', date: '2026-02-03', feeType: 'Transport Fee', amount: 3200, method: 'Bank', ref: 'TXN-4839221', status: 'Collected', collector: 'Mrs. Sharma', note: 'HDFC transfer' },
    { id: 'RCP-003', date: '2026-01-05', feeType: 'Tuition Fee', amount: 8000, method: 'Cash', ref: 'CASH-002', status: 'Collected', collector: 'Mr. Reddy', note: 'Jan installment' },
    { id: 'RCP-004', date: '2026-01-06', feeType: 'Transport Fee', amount: 3200, method: 'Bank', ref: 'TXN-3271882', status: 'Collected', collector: 'Mr. Reddy', note: 'GPay transfer' },
    { id: 'RCP-005', date: '2025-12-02', feeType: 'Admission Fee', amount: 5000, method: 'Card', ref: 'CRD-9920001', status: 'Collected', collector: 'Mrs. Sharma', note: 'Admission payment' },
    { id: 'RCP-006', date: '2025-12-10', feeType: 'Lab Fee', amount: 800, method: 'Cash', ref: 'CASH-003', status: 'Collected', collector: 'Mr. Reddy', note: 'Annual lab fee' },
    { id: 'RCP-007', date: '2025-11-15', feeType: 'Library Fee', amount: 500, method: 'Cash', ref: 'CASH-004', status: 'Reverted', collector: 'Mrs. Sharma', note: 'Duplicate entry – reverted' },
    { id: 'RCP-008', date: '2025-11-18', feeType: 'Library Fee', amount: 500, method: 'Cash', ref: 'CASH-005', status: 'Collected', collector: 'Mrs. Sharma', note: 'Re-entry after revert' },
    { id: 'RCP-009', date: '2025-12-20', feeType: 'Activity Fee', amount: 300, method: 'Bank', ref: 'TXN-1190021', status: 'Collected', collector: 'Mr. Reddy', note: 'Partial activity fee' },
];

/* ─── Component ─────────────────────────────────────────── */
const CollectFeeIndividual = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();

    const student = {
        id: studentId || 'STU-2023-002',
        name: 'Priya Patel',
        class: '9-B',
        rollNo: '15',
        admissionNo: 'ADM/2023/128',
        fatherName: 'Rajesh Patel',
        image: 'https://i.pravatar.cc/150?u=2',
        academicYear: '2025-2026',
        fees: [
            { type: 'Admission Fee', category: 'One-Time', amount: 5000, paid: 5000, due: 0, status: 'Paid' },
            { type: 'Tuition Fee', category: 'Monthly', amount: 24000, paid: 16000, due: 8000, status: 'Partial' },
            { type: 'Transport Fee', category: 'Monthly', amount: 9600, paid: 6400, due: 3200, status: 'Partial' },
            { type: 'Examination Fee', category: 'Term-wise', amount: 1500, paid: 0, due: 1500, status: 'Pending' },
            { type: 'Lab Fee', category: 'Annual', amount: 800, paid: 800, due: 0, status: 'Paid' },
            { type: 'Activity Fee', category: 'Annual', amount: 600, paid: 300, due: 300, status: 'Partial' },
            { type: 'Library Fee', category: 'Annual', amount: 500, paid: 500, due: 0, status: 'Paid' },
        ],
    };

    const totalFee = student.fees.reduce((s, f) => s + f.amount, 0);
    const totalPaid = student.fees.reduce((s, f) => s + f.paid, 0);
    const totalDue = student.fees.reduce((s, f) => s + f.due, 0);
    const dueFees = student.fees.filter(f => f.due > 0);

    /* form state */
    const [paymentAmounts, setPaymentAmounts] = useState({});
    const [discountAmounts, setDiscountAmounts] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [collectionDate, setCollectionDate] = useState(new Date().toISOString().split('T')[0]);
    const [bankDetails, setBankDetails] = useState({ bankName: '', transactionId: '' });
    const [paySuccess, setPaySuccess] = useState(false);

    /* history state */
    const [history, setHistory] = useState(INITIAL_HISTORY);
    const [historySearch, setHistorySearch] = useState('');
    const [historyFilter, setHistoryFilter] = useState('All'); // All | Collected | Reverted
    const [detailsRow, setDetailsRow] = useState(null);  // row for details modal
    const [revertConfirm, setRevertConfirm] = useState(null);  // row for revert confirm
    const [generatedReceipt, setGeneratedReceipt] = useState(null);

    const chartData = [
        { name: 'Collected', value: totalPaid, color: '#28c76f' },
        { name: 'Due', value: totalDue, color: '#ea5455' },
    ].filter(d => d.value > 0);

    const handleAmountChange = (type, value) => {
        setPaymentAmounts(prev => ({ ...prev, [type]: value }));
    };

    const handleDiscountChange = (type, value) => {
        setDiscountAmounts(prev => ({ ...prev, [type]: value }));
    };

    const handlePayment = () => {
        const collectedTypes = Object.entries(paymentAmounts).filter(([type, amt]) => Number(amt) > 0 || Number(discountAmounts[type]) > 0);
        if (collectedTypes.length === 0) { alert('Enter amount or discount for at least one fee type'); return; }

        if (paymentMethod === 'Bank' && (!bankDetails.bankName || !bankDetails.transactionId)) {
            alert('Bank details are required'); return;
        }

        const totalAmountCollected = collectedTypes.reduce((sum, [type, amt]) => sum + Number(amt), 0);
        const totalDiscountApplied = collectedTypes.reduce((sum, [type, _]) => sum + Number(discountAmounts[type] || 0), 0);
        const netAmount = totalAmountCollected;

        const newEntry = {
            id: `RCP-${String(history.length + 1).padStart(3, '0')}`,
            date: collectionDate,
            feeType: collectedTypes.map(c => c[0]).join(', '),
            amount: netAmount,
            method: paymentMethod,
            ref: paymentMethod === 'Bank' ? bankDetails.transactionId : `${paymentMethod.toUpperCase()}-${Date.now().toString().slice(-6)}`,
            status: 'Collected',
            collector: 'Current User',
            note: totalDiscountApplied > 0 ? `Discount applied: ₹${totalDiscountApplied}` : '',
            details: collectedTypes.map(([type, amount]) => ({ type, amount: Number(amount), discount: Number(discountAmounts[type] || 0) })),
            concession: totalDiscountApplied,
            subTotal: totalAmountCollected + totalDiscountApplied
        };
        setHistory(prev => [newEntry, ...prev]);
        setGeneratedReceipt(newEntry);
        setPaySuccess(true);
        setPaymentAmounts({});
        setDiscountAmounts({});
        setTimeout(() => setPaySuccess(false), 3500);
    };

    const handleRevert = (row) => {
        setHistory(prev => prev.map(r => r.id === row.id ? { ...r, status: 'Reverted' } : r));
        setRevertConfirm(null);
    };

    /* filtered history */
    const filteredHistory = history.filter(r => {
        const matchSearch = historySearch === '' ||
            r.feeType.toLowerCase().includes(historySearch.toLowerCase()) ||
            r.ref.toLowerCase().includes(historySearch.toLowerCase()) ||
            r.id.toLowerCase().includes(historySearch.toLowerCase());
        const matchFilter = historyFilter === 'All' || r.status === historyFilter;
        return matchSearch && matchFilter;
    });

    const historyTotal = filteredHistory
        .filter(r => r.status === 'Collected')
        .reduce((s, r) => s + r.amount, 0);

    /* date formatter */
    const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const getStatusBadge = (status) => ({
        'Paid': 'badge-paid',
        'Partial': 'badge-partial',
        'Pending': 'badge-pending',
    }[status] || 'badge-na');

    /* ── Render ── */
    return (
        <div className="cfi-page">

            {/* ── HEADER ─────────────────────────────────────── */}
            <div className="cfi-top-header">
                <div className="cfi-header-left">
                    <button className="cfi-back-btn" onClick={() => navigate(-1)}>
                        <IconArrowLeft size={15} /> Back
                    </button>
                    <div>
                        <h1 className="cfi-page-title">Collect Fee</h1>
                        <p className="cfi-breadcrumb">
                            Finance <IconChevronRight size={11} /> Collect Fee <IconChevronRight size={11} /> <span>By Student</span>
                        </p>
                    </div>
                </div>
                <div className="cfi-student-chip">
                    <img src={student.image} alt="" />
                    <div>
                        <div className="chip-name">{student.name}</div>
                        <div className="chip-id">{student.admissionNo}</div>
                    </div>
                </div>
            </div>

            {/* ── SUCCESS TOAST ───────────────────────────────── */}
            {paySuccess && (
                <div className="cfi-toast">
                    <IconCheck size={17} /> Payment of ₹{generatedReceipt ? generatedReceipt.amount.toLocaleString() : 0} collected successfully!
                </div>
            )}

            {/* ══════════ BODY GRID ═════════════════════════════ */}
            <div className="cfi-body-grid">

                {/* ── LEFT COLUMN ─────────────────────────────── */}
                <div className="cfi-left">

                    {/* Student Card */}
                    <div className="cfi-card student-info-card">
                        <div className="stu-avatar-wrap">
                            <img src={student.image} alt="" className="stu-avatar" />
                            <div className="stu-status-dot" />
                        </div>
                        <h2 className="stu-name">{student.name}</h2>
                        <div className="stu-badges">
                            <span className="stu-badge blue">{student.id}</span>
                            <span className="stu-badge gray">Class {student.class}</span>
                            <span className="stu-badge green">Roll #{student.rollNo}</span>
                        </div>
                        <div className="stu-meta-grid">
                            <div className="stu-meta-item"><IconUser size={12} /> {student.fatherName}</div>
                            <div className="stu-meta-item"><IconSchool size={12} /> {student.admissionNo}</div>
                            <div className="stu-meta-item"><IconCalendar size={12} /> {student.academicYear}</div>
                        </div>
                    </div>

                    {/* Fee Summary */}
                    <div className="cfi-card">
                        <div className="cfi-card-head">
                            <IconCurrencyRupee size={17} /> <h3>Fee Summary</h3>
                        </div>
                        <div className="summary-stat-row">
                            <div className="sum-stat total">
                                <div className="sum-stat-icon"><IconCurrencyRupee size={16} /></div>
                                <div className="sum-stat-text">
                                    <span className="sum-stat-label">Total Assigned</span>
                                    <span className="sum-stat-value">₹{totalFee.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="sum-stat collected">
                                <div className="sum-stat-icon"><IconCheck size={16} /></div>
                                <div className="sum-stat-text">
                                    <span className="sum-stat-label">Collected</span>
                                    <span className="sum-stat-value">₹{totalPaid.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="sum-stat due">
                                <div className="sum-stat-icon"><IconAlertCircle size={16} /></div>
                                <div className="sum-stat-text">
                                    <span className="sum-stat-label">Total Due</span>
                                    <span className="sum-stat-value">₹{totalDue.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="fee-progress-wrap">
                            <div className="fee-progress-label">
                                <span>Collection Progress</span>
                                <span className="fee-progress-pct">
                                    {totalFee ? Math.round((totalPaid / totalFee) * 100) : 0}%
                                </span>
                            </div>
                            <div className="fee-progress-bar">
                                <div className="fee-progress-fill"
                                    style={{ width: `${totalFee ? (totalPaid / totalFee) * 100 : 0}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="cfi-card">
                        <div className="cfi-card-head">
                            <IconChartPie size={17} /> <h3>Distribution</h3>
                        </div>
                        <ResponsiveContainer width="100%" height={190}>
                            <PieChart>
                                <Pie data={chartData} innerRadius={52} outerRadius={72} paddingAngle={4} dataKey="value">
                                    {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={v => `₹${v.toLocaleString()}`}
                                    contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,.1)', fontSize: 12 }} />
                                <Legend verticalAlign="bottom" height={30} iconType="circle" iconSize={9} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ────────────────────────────── */}
                <div className="cfi-right">

                    {/* ══ COLLECT PAYMENT FORM (NEW DESIGN) ═══════════════════ */}
                    <div className="cfi-card payment-form-card">
                        <div className="cfi-card-head due-head">
                            <div className="due-head-title">
                                <IconWallet size={17} style={{ color: '#3d5ee1' }} />
                                <h3>Collect Payment</h3>
                            </div>
                            {totalDue > 0 && (
                                <div className="total-due-pill">
                                    Total Due: <strong>₹{totalDue.toLocaleString()}</strong>
                                </div>
                            )}
                        </div>

                        <div className="multi-pay-form">
                            {dueFees.length === 0 ? (
                                <div className="no-due-banner">
                                    <IconCheck size={38} style={{ color: '#28c76f', marginBottom: 8 }} />
                                    <p>All fees cleared — no dues pending!</p>
                                </div>
                            ) : (
                                <div className="multi-fee-list">
                                    {dueFees.map(fee => {
                                        const typedAmt = Number(paymentAmounts[fee.type] || 0);
                                        const typedDisc = Number(discountAmounts[fee.type] || 0);
                                        return (
                                            <div key={fee.type} className="multi-fee-row new-multi-fee-row">
                                                <div className="multi-fee-label-box" style={{ flex: '1.2' }}>
                                                    <div className="fee-type-text">{fee.type}</div>
                                                    <div className="fee-due-text">Due: ₹{fee.due.toLocaleString()}</div>
                                                </div>
                                                <div className="multi-fee-input-box discount-input-box">
                                                    <div className="input-prefix">
                                                        <span>₹</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            placeholder="Discount Amount"
                                                            value={discountAmounts[fee.type] || ''}
                                                            onChange={e => handleDiscountChange(fee.type, e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="multi-fee-input-box amount-input-box">
                                                    <div className="input-prefix">
                                                        <span>₹</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            placeholder="Amount"
                                                            value={paymentAmounts[fee.type] || ''}
                                                            onChange={e => handleAmountChange(fee.type, e.target.value)}
                                                        />
                                                    </div>
                                                    <button
                                                        className="fill-full-btn"
                                                        onClick={() => {
                                                            const currentDisc = Number(discountAmounts[fee.type] || 0);
                                                            handleAmountChange(fee.type, Math.max(0, fee.due - currentDisc));
                                                        }}
                                                    >
                                                        Full
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Overall Totals Preview */}
                                    <div className="payment-totals-preview" style={{ marginTop: '1.25rem', borderTop: '1.5px dashed #e2e8f0', paddingTop: '1.25rem', display: 'flex', gap: '1.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <div className="pt-item" style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Total Discount</span>
                                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#9333ea' }}>₹{dueFees.reduce((sum, f) => sum + Number(discountAmounts[f.type] || 0), 0).toLocaleString()}</div>
                                        </div>
                                        <div className="pt-item" style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '1.5rem', textAlign: 'right' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Total Paid</span>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>₹{dueFees.reduce((sum, f) => sum + Number(paymentAmounts[f.type] || 0), 0).toLocaleString()}</div>
                                        </div>
                                        <div className="pt-item" style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '1.5rem', textAlign: 'right' }}>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Remaining Due</span>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ea5455' }}>
                                                ₹{dueFees.reduce((sum, f) => sum + Math.max(0, f.due - Number(paymentAmounts[f.type] || 0) - Number(discountAmounts[f.type] || 0)), 0).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Method */}
                            <div className="pay-form-group" style={{ marginTop: '1.5rem' }}>
                                <label><IconCalendar size={13} /> Collection Date</label>
                                <input type="date" value={collectionDate}
                                    onChange={e => setCollectionDate(e.target.value)} />
                            </div>

                            <div className="pay-form-group" style={{ marginTop: '1rem' }}>
                                <label>Payment Method</label>
                                <div className="method-grid">
                                    {['Cash', 'Bank', 'Card'].map(m => (
                                        <button key={m}
                                            className={`method-btn ${paymentMethod === m ? 'active' : ''}`}
                                            onClick={() => setPaymentMethod(m)}>
                                            {m === 'Cash' && <IconCash size={19} />}
                                            {m === 'Bank' && <IconBuildingBank size={19} />}
                                            {m === 'Card' && <IconCreditCard size={19} />}
                                            <span>{m === 'Bank' ? 'Bank / UPI' : m}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {paymentMethod === 'Bank' && (
                                <div className="bank-details-box" style={{ marginTop: '1rem' }}>
                                    <div className="pay-form-grid">
                                        <div className="pay-form-group">
                                            <label>Bank / Platform <span className="req">*</span></label>
                                            <input type="text" placeholder="e.g. SBI, HDFC, GPay"
                                                value={bankDetails.bankName}
                                                onChange={e => setBankDetails({ ...bankDetails, bankName: e.target.value })} />
                                        </div>
                                        <div className="pay-form-group">
                                            <label>Transaction / Ref No <span className="req">*</span></label>
                                            <input type="text" placeholder="Enter reference number"
                                                value={bankDetails.transactionId}
                                                onChange={e => setBankDetails({ ...bankDetails, transactionId: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {dueFees.length > 0 && (
                                <button className="btn-collect-now" onClick={handlePayment} style={{ marginTop: '1.5rem' }}>
                                    <IconCreditCard size={18} />
                                    Collect Payment Now
                                </button>
                            )}
                        </div>
                    </div>
                    {/* END right column */}
                </div>
            </div>
            {/* END cfi-body-grid */}

            {/* ══ PAYMENT HISTORY — FULL WIDTH ══════════════════ */}
            <div className="cfi-card history-card">
                <div className="cfi-card-head history-head">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <IconHistory size={17} /> <h3>Payment History</h3>
                        <span className="history-count-badge">{filteredHistory.length}</span>
                    </div>
                    <div className="history-head-right">
                        <span className="history-total-tag">
                            Collected: <strong>₹{historyTotal.toLocaleString()}</strong>
                        </span>
                        <button className="history-print-btn" title="Print History">
                            <IconPrinter size={15} />
                        </button>
                    </div>
                </div>

                {/* History Toolbar */}
                <div className="history-toolbar">
                    <div className="history-search-wrap">
                        <IconSearch size={14} />
                        <input
                            className="history-search"
                            placeholder="Search receipt, fee type..."
                            value={historySearch}
                            onChange={e => setHistorySearch(e.target.value)} />
                    </div>
                    <div className="history-filter-tabs">
                        {['All', 'Collected', 'Reverted'].map(f => (
                            <button key={f}
                                className={`hf-tab ${historyFilter === f ? 'active' : ''}`}
                                onClick={() => setHistoryFilter(f)}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="history-table-wrap">
                    {filteredHistory.length === 0 ? (
                        <div className="history-empty">
                            <IconHistory size={32} style={{ color: '#cbd5e1', marginBottom: 8 }} />
                            <p>No payment records found</p>
                        </div>
                    ) : (
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Receipt</th>
                                    <th>Date</th>
                                    <th>Fee Type</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Reference</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.map((row) => {
                                    const st = FEE_COLORS[row.feeType] || { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' };
                                    const ic = FEE_ICONS[row.feeType] || <IconTag size={14} />;
                                    const isReverted = row.status === 'Reverted';
                                    return (
                                        <tr key={row.id} className={isReverted ? 'row-reverted' : ''}>
                                            <td>
                                                <span className="receipt-id">{row.id}</span>
                                            </td>
                                            <td>
                                                <span className="hist-date">{fmtDate(row.date)}</span>
                                            </td>
                                            <td>
                                                <div className="hist-fee-type">
                                                    <span className="hist-fee-icon"
                                                        style={{ background: st.bg, color: st.color }}>
                                                        {ic}
                                                    </span>
                                                    <span className="hist-fee-label">{row.feeType}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`hist-amount ${isReverted ? 'amount-reverted' : ''}`}>
                                                    ₹{row.amount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="hist-method">
                                                    {METHOD_ICONS[row.method] || null}
                                                    <span>{row.method}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="hist-ref">{row.ref}</span>
                                            </td>
                                            <td>
                                                <span className={`status-chip ${isReverted ? 'chip-reverted' : 'chip-collected'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="hist-actions">
                                                    <button className="hact-btn details"
                                                        title="View Details"
                                                        onClick={() => setDetailsRow(row)}>
                                                        <IconEye size={14} /> Details
                                                    </button>
                                                    {!isReverted && (
                                                        <button className="hact-btn revert"
                                                            title="Revert Payment"
                                                            onClick={() => setRevertConfirm(row)}>
                                                            <IconArrowBackUp size={14} /> Revert
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {/* END history-card — full width */}

            {/* ══ DETAILS / RECEIPT MODAL ══════════════════════════════════ */}
            {(detailsRow || generatedReceipt) && (() => {
                const rowData = detailsRow || generatedReceipt;
                const isGenerated = !!generatedReceipt;

                return (
                    <div className="modal-overlay receipt-modal-overlay" onClick={() => { setDetailsRow(null); setGeneratedReceipt(null); }}>
                        <div className="modal-box receipt-modal-box" onClick={e => e.stopPropagation()}>
                            <div className="receipt-header">
                                <h2>Payment Receipt</h2>
                                <div className="receipt-school-name">Mindwhile School ERP</div>
                                <button className="receipt-close" onClick={() => { setDetailsRow(null); setGeneratedReceipt(null); }}>
                                    <IconX size={18} />
                                </button>
                            </div>

                            <div className="receipt-body">
                                <div className="receipt-top-info">
                                    <div>
                                        Receipt No: <strong>{rowData.id}</strong><br />
                                        Date: <strong>{fmtDate(rowData.date)}</strong>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        Student: <strong>{student.name}</strong><br />
                                        Admission: <strong>{student.admissionNo}</strong>
                                    </div>
                                </div>

                                <table className="receipt-table">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th style={{ textAlign: 'right' }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowData.details ? (
                                            rowData.details.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{item.type}</td>
                                                    <td className="amount-col">₹{item.amount.toLocaleString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td>{rowData.feeType}</td>
                                                <td className="amount-col">₹{rowData.amount.toLocaleString()}</td>
                                            </tr>
                                        )}
                                        {rowData.concession > 0 && (
                                            <tr>
                                                <td>Concession Applied</td>
                                                <td className="amount-col" style={{ color: '#ea5455' }}>- ₹{rowData.concession.toLocaleString()}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <div className="receipt-total-row">
                                    <span>Total Paid</span>
                                    <span>₹{rowData.amount.toLocaleString()}</span>
                                </div>

                                <div className="receipt-top-info" style={{ marginBottom: 0 }}>
                                    <div>
                                        Payment Mode: <strong>{rowData.method}</strong><br />
                                        Reference: <strong>{rowData.ref}</strong>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        Collected By: <strong>{rowData.collector}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="receipt-footer">
                                <button className="btn-print-receipt">
                                    <IconPrinter size={18} /> Print Official Receipt
                                </button>
                                <button className="btn-download-receipt">
                                    Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* ══ REVERT CONFIRM MODAL ═══════════════════════════ */}
            {revertConfirm && (
                <div className="modal-overlay" onClick={() => setRevertConfirm(null)}>
                    <div className="modal-box modal-box--sm" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-title">
                                <IconArrowBackUp size={20} style={{ color: '#ea5455' }} />
                                <div>
                                    <h3>Revert Payment</h3>
                                    <span>{revertConfirm.id}</span>
                                </div>
                            </div>
                            <button className="modal-close" onClick={() => setRevertConfirm(null)}>
                                <IconX size={18} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="revert-warning">
                                <IconAlertCircle size={22} style={{ color: '#ea5455', flexShrink: 0 }} />
                                <p>
                                    You are about to revert the payment of <strong>₹{revertConfirm.amount.toLocaleString()}</strong> for{' '}
                                    <strong>{revertConfirm.feeType}</strong> collected on <strong>{fmtDate(revertConfirm.date)}</strong>.
                                    This action will mark the receipt as <strong>Reverted</strong>.
                                </p>
                            </div>
                            <div className="modal-detail-grid" style={{ marginTop: 16 }}>
                                <div className="modal-detail-item">
                                    <span className="md-label">Receipt ID</span>
                                    <span className="md-value">{revertConfirm.id}</span>
                                </div>
                                <div className="modal-detail-item">
                                    <span className="md-label">Reference</span>
                                    <span className="md-value">{revertConfirm.ref}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn outline" onClick={() => setRevertConfirm(null)}>Cancel</button>
                            <button className="modal-btn danger" onClick={() => handleRevert(revertConfirm)}>
                                <IconArrowBackUp size={15} /> Confirm Revert
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectFeeIndividual;
