import React from 'react';
import { IconArrowUpRight, IconArrowDownRight, IconReceipt } from '@tabler/icons-react';

const TRANSACTIONS = [
    { id: 'TXN-001', name: 'Thomas Bown', type: 'Fee Payment', date: '06 Mar 2026', amount: '+$1,200', mode: 'Online', status: 'Success', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg', dir: 'in' },
    { id: 'TXN-002', name: 'Angelo Riana', type: 'Fee Payment', date: '06 Mar 2026', amount: '+$950', mode: 'Cash', status: 'Success', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg', dir: 'in' },
    { id: 'TXN-003', name: 'Salary Payout', type: 'Staff Salary', date: '05 Mar 2026', amount: '-$5,400', mode: 'Bank', status: 'Success', avatar: null, dir: 'out' },
    { id: 'TXN-004', name: 'Lisa Thompson', type: 'Fee Payment', date: '05 Mar 2026', amount: '+$800', mode: 'Online', status: 'Pending', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-05.jpg', dir: 'in' },
    { id: 'TXN-005', name: 'Lab Supplies', type: 'Expense', date: '04 Mar 2026', amount: '-$430', mode: 'Card', status: 'Success', avatar: null, dir: 'out' },
    { id: 'TXN-006', name: 'Janet Parker', type: 'Fee Payment', date: '04 Mar 2026', amount: '+$1,100', mode: 'Online', status: 'Failed', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg', dir: 'in' },
    { id: 'TXN-007', name: 'Electricity', type: 'Utility Expense', date: '03 Mar 2026', amount: '-$320', mode: 'Bank', status: 'Success', avatar: null, dir: 'out' },
];

const STATUS = { Success: ['#d1fae5', '#065f46'], Pending: ['#fef3c7', '#92400e'], Failed: ['#fee2e2', '#b91c1c'] };

const AccountantTransactions = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconReceipt size={18} color="#3D5EE1" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Recent Transactions</span>
            </div>
            <a href="#" style={{ fontSize: 12, fontWeight: 600, color: '#3D5EE1', textDecoration: 'none' }}>View All</a>
        </div>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1fr', padding: '8px 20px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
            {['Name / ID', 'Date', 'Mode', 'Amount', 'Status'].map((h, i) => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: i > 1 ? 'center' : 'left' }}>{h}</div>
            ))}
        </div>
        {TRANSACTIONS.map((t, i) => {
            const [sbg, sc] = STATUS[t.status];
            return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1fr', alignItems: 'center', padding: '12px 20px', borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                    {/* Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {t.avatar
                            ? <div style={{ width: 32, height: 32, borderRadius: 9, overflow: 'hidden', flexShrink: 0 }}><img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&size=32&background=3D5EE1&color=fff`; }} /></div>
                            : <div style={{ width: 32, height: 32, borderRadius: 9, background: t.dir === 'out' ? '#fee2e2' : '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{t.dir === 'out' ? <IconArrowDownRight size={16} color="#ef4444" /> : <IconArrowUpRight size={16} color="#10b981" />}</div>
                        }
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#1f2937' }}>{t.name}</div>
                            <div style={{ fontSize: 10, color: '#9ca3af' }}>{t.type} · {t.id}</div>
                        </div>
                    </div>
                    {/* Date */}
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{t.date}</div>
                    {/* Mode */}
                    <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: '#6b7280' }}>{t.mode}</div>
                    {/* Amount */}
                    <div style={{ textAlign: 'center', fontWeight: 800, fontSize: 14, color: t.dir === 'in' ? '#10b981' : '#ef4444' }}>{t.amount}</div>
                    {/* Status */}
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: sbg, color: sc }}>{t.status}</span>
                    </div>
                </div>
            );
        })}
    </div>
);

export default AccountantTransactions;
