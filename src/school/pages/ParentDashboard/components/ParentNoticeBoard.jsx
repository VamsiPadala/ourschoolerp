import React from 'react';
import { IconBell, IconArrowRight } from '@tabler/icons-react';

const NOTICES = [
    { title: 'New Syllabus Instructions', date: '11 Mar 2024', color: '#3D5EE1' },
    { title: 'World Environment Day Program!', date: '21 Apr 2024', color: '#10b981' },
    { title: 'Exam Preparation Notification!', date: '13 Mar 2024', color: '#f59e0b' },
    { title: 'Online Classes Preparation', date: '24 May 2024', color: '#8b5cf6' },
    { title: 'Exam Time Table Release', date: '24 May 2024', color: '#ec4899' },
    { title: 'English Exam Preparation', date: '23 Mar 2024', color: '#ef4444' },
];

const ParentNoticeBoard = () => (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconBell size={18} color="#6b7280" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#1e1b4b' }}>Notice Board</span>
            </div>
            <a href="#" style={{ fontSize: 12, color: '#3D5EE1', fontWeight: 600, textDecoration: 'none' }}>View All</a>
        </div>
        <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {NOTICES.map((n, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, background: '#f8fafc', borderLeft: `4px solid ${n.color}`, cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: '#1f2937' }}>{n.title}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Added on: {n.date}</div>
                    </div>
                    <IconArrowRight size={14} color="#9ca3af" />
                </div>
            ))}
        </div>
    </div>
);

export default ParentNoticeBoard;
