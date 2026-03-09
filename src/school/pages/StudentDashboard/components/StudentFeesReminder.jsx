import React from 'react';
import { IconCurrencyDollar, IconBus, IconBook, IconFileText, IconAlertCircle, IconBuildingBank } from '@tabler/icons-react';

const FEES = [
    { label: 'Transport Fees', amount: '$2,500', due: '25 May 2024', icon: IconBus, color: '#3D5EE1', bg: '#eef2ff', overdue: false },
    { label: 'Book Fees', amount: '$2,500', due: '25 May 2024', icon: IconBook, color: '#10b981', bg: '#d1fae5', overdue: false },
    { label: 'Exam Fees', amount: '$2,500', due: '25 May 2024', icon: IconFileText, color: '#f59e0b', bg: '#fef3c7', overdue: false },
    { label: 'Mess Fees Due', amount: '$2,500 + $150', due: '27 May 2024', icon: IconAlertCircle, color: '#ef4444', bg: '#fee2e2', overdue: true },
    { label: 'Hostel', amount: '$2,500', due: '25 May 2024', icon: IconBuildingBank, color: '#8b5cf6', bg: '#ede9fe', overdue: false },
];

const StudentFeesReminder = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconCurrencyDollar size={18} color="#ef4444" />
                </div>
                <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Fees Reminder</h5>
            </div>
            <a href="#" style={{ fontSize: 12, color: '#3D5EE1', fontWeight: 600, textDecoration: 'none' }}>View All</a>
        </div>
        <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FEES.map((fee, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: fee.bg, border: fee.overdue ? `2px solid ${fee.color}` : `1px solid ${fee.color}22` }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: fee.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <fee.icon size={18} color="white" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: '#1e1b4b' }}>{fee.label}</div>
                        <div style={{ fontWeight: 800, fontSize: 15, color: fee.color }}>{fee.amount}</div>
                        <div style={{ fontSize: 10, color: fee.overdue ? fee.color : '#9ca3af', fontWeight: fee.overdue ? 700 : 400 }}>
                            {fee.overdue ? '⚠ OVERDUE' : `Last date: ${fee.due}`}
                        </div>
                    </div>
                    {fee.overdue && (
                        <button style={{ padding: '6px 14px', borderRadius: 8, background: fee.color, border: 'none', color: 'white', fontWeight: 700, fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>Pay Now</button>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default StudentFeesReminder;
