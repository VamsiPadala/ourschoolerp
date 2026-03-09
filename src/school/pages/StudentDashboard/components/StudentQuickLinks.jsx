import React, { useState } from 'react';
import { IconCash, IconClipboardCheck, IconCalendar, IconUserCheck } from '@tabler/icons-react';

const LINKS = [
    { title: 'Pay Fees', icon: IconCash, color: '#3D5EE1', bg: '#eef2ff', href: '/school/fees' },
    { title: 'Exam Result', icon: IconClipboardCheck, color: '#10b981', bg: '#d1fae5', href: '/school/exam-result' },
    { title: 'Calendar', icon: IconCalendar, color: '#f59e0b', bg: '#fef3c7', href: '/school/calendar' },
    { title: 'Attendance', icon: IconUserCheck, color: '#ef4444', bg: '#fee2e2', href: '/school/attendance' },
];

const StudentQuickLinks = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {LINKS.map((link, i) => (
            <a key={i} href={link.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '20px 12px', background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', textDecoration: 'none', transition: 'transform 0.15s, box-shadow 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: link.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <link.icon size={24} color={link.color} />
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#1e1b4b', textAlign: 'center' }}>{link.title}</span>
            </a>
        ))}
    </div>
);

export default StudentQuickLinks;
