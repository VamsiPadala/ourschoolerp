import React from 'react';
import { IconCurrencyDollar, IconBus, IconUsers, IconBook, IconBolt, IconTool } from '@tabler/icons-react';

const CATEGORIES = [
    { label: 'Fee Collection', amount: 98400, total: 124000, icon: IconCurrencyDollar, color: '#3D5EE1', bg: '#eef2ff' },
    { label: 'Staff Salaries', amount: 22400, total: 28000, icon: IconUsers, color: '#ef4444', bg: '#fee2e2' },
    { label: 'Transport', amount: 6800, total: 9000, icon: IconBus, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Library & Books', amount: 3200, total: 5000, icon: IconBook, color: '#10b981', bg: '#d1fae5' },
    { label: 'Utilities', amount: 4100, total: 6000, icon: IconBolt, color: '#8b5cf6', bg: '#ede9fe' },
    { label: 'Maintenance', amount: 2220, total: 4000, icon: IconTool, color: '#ec4899', bg: '#fce7f3' },
];

const AccountantExpenseBreakdown = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconCurrencyDollar size={18} color="#ef4444" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Budget Overview</span>
        </div>
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CATEGORIES.map((cat, i) => {
                const pct = Math.round((cat.amount / cat.total) * 100);
                return (
                    <div key={i}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 9, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <cat.icon size={15} color={cat.color} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <span style={{ fontWeight: 600, fontSize: 13, color: '#374151' }}>{cat.label}</span>
                                    <span style={{ fontSize: 12, color: '#6b7280' }}>${cat.amount.toLocaleString()} <span style={{ color: '#9ca3af' }}>/ ${cat.total.toLocaleString()}</span></span>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: 7, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: cat.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
                        </div>
                        <div style={{ textAlign: 'right', fontSize: 10, color: pct > 85 ? '#ef4444' : '#9ca3af', fontWeight: 600, marginTop: 3 }}>{pct}% used</div>
                    </div>
                );
            })}
        </div>
    </div>
);

export default AccountantExpenseBreakdown;
