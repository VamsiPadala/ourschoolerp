import React from 'react';
import { IconFileInvoice, IconDownload, IconPrinter, IconReportMoney, IconUserPlus, IconSend } from '@tabler/icons-react';

const ACTIONS = [
    { label: 'Generate Invoice', icon: IconFileInvoice, color: '#3D5EE1', bg: '#eef2ff' },
    { label: 'Download Report', icon: IconDownload, color: '#10b981', bg: '#d1fae5' },
    { label: 'Print Statement', icon: IconPrinter, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Fee Reminders', icon: IconSend, color: '#ef4444', bg: '#fee2e2' },
    { label: 'Salary Payouts', icon: IconReportMoney, color: '#8b5cf6', bg: '#ede9fe' },
    { label: 'Add Student', icon: IconUserPlus, color: '#ec4899', bg: '#fce7f3' },
];

const FEE_COLLECTION = [
    { label: 'Collected', value: '$98,400', pct: 79, color: '#3D5EE1' },
    { label: 'Pending', value: '$18,200', pct: 15, color: '#f59e0b' },
    { label: 'Waived', value: '$7,400', pct: 6, color: '#10b981' },
];

const AccountantQuickPanel = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Quick Actions */}
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 800, fontSize: 15, color: '#1e1b4b' }}>Quick Actions</span>
            </div>
            <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {ACTIONS.map((a, i) => (
                    <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, border: `1px solid ${a.color}20`, background: a.bg, cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <a.icon size={15} color="white" />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', textAlign: 'left', lineHeight: 1.2 }}>{a.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Fee Collection Summary */}
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 800, fontSize: 15, color: '#1e1b4b' }}>Fee Collection Summary</span>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>March 2026 · Total: $1,24,000</div>
            </div>
            <div style={{ padding: '16px 18px' }}>
                {/* Stacked bar */}
                <div style={{ display: 'flex', height: 18, borderRadius: 99, overflow: 'hidden', marginBottom: 14, gap: 2 }}>
                    {FEE_COLLECTION.map((fc, i) => (
                        <div key={i} style={{ width: `${fc.pct}%`, background: fc.color, transition: 'width 0.6s ease' }} />
                    ))}
                </div>
                {FEE_COLLECTION.map((fc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: fc.color }} />
                            <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>{fc.label}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: 800, color: fc.color }}>{fc.value}</span>
                            <span style={{ fontSize: 10, color: '#9ca3af' }}>{fc.pct}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default AccountantQuickPanel;
