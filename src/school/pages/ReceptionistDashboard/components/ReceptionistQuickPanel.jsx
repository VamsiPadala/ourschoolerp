import React from 'react';
import { IconUserPlus, IconPhone, IconCalendarPlus, IconClipboardList, IconPrinter, IconMail, IconBell, IconMessageCircle } from '@tabler/icons-react';

const ACTIONS = [
    { label: 'Register Visitor', icon: IconUserPlus, color: '#3D5EE1', bg: '#eef2ff' },
    { label: 'Log Call', icon: IconPhone, color: '#10b981', bg: '#d1fae5' },
    { label: 'New Appointment', icon: IconCalendarPlus, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Issue Pass', icon: IconClipboardList, color: '#ef4444', bg: '#fee2e2' },
    { label: 'Print Notice', icon: IconPrinter, color: '#8b5cf6', bg: '#ede9fe' },
    { label: 'Send Notice', icon: IconMail, color: '#ec4899', bg: '#fce7f3' },
];

const ANNOUNCEMENTS = [
    { msg: 'Annual Day celebration on 15th March 2026', time: '2h ago', color: '#3D5EE1' },
    { msg: 'Teachers Training Workshop — attendance mandatory', time: '4h ago', color: '#f59e0b' },
    { msg: 'Fee collection deadline extended to 12th March', time: '6h ago', color: '#ef4444' },
    { msg: 'Library books return before exam week begins', time: '1d ago', color: '#10b981' },
];

const ReceptionistQuickPanel = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Quick Actions */}
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 800, fontSize: 15, color: '#1e1b4b' }}>Quick Actions</span>
            </div>
            <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {ACTIONS.map((a, i) => (
                    <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, border: `1px solid ${a.color}20`, background: a.bg, cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <a.icon size={15} color="white" />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', textAlign: 'left', lineHeight: 1.2 }}>{a.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Announcements */}
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconBell size={16} color="#6b7280" />
                <span style={{ fontWeight: 800, fontSize: 15, color: '#1e1b4b' }}>Announcements</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ANNOUNCEMENTS.map((a, i) => (
                    <div key={i} style={{ padding: '10px 13px', borderRadius: 10, background: '#f8fafc', borderLeft: `4px solid ${a.color}` }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', lineHeight: 1.4 }}>{a.msg}</div>
                        <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 3 }}>{a.time}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ReceptionistQuickPanel;
