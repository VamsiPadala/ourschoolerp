import React from 'react';
import { IconBook, IconStar, IconBook2, IconSearch, IconPrinter, IconDownload, IconMessageCircle } from '@tabler/icons-react';

const POPULAR = [
    { title: 'Introduction to Physics', author: 'H.C. Verma', issued: 42, rating: 4.8, cover: '#3D5EE1' },
    { title: 'Advanced Mathematics', author: 'R.D. Sharma', issued: 38, rating: 4.7, cover: '#10b981' },
    { title: 'English Literature', author: 'Wren & Martin', issued: 35, rating: 4.5, cover: '#f59e0b' },
    { title: 'World History', author: 'Arjun Dev', issued: 29, rating: 4.4, cover: '#ec4899' },
    { title: 'Chemistry Fundamentals', author: 'NCERT', issued: 26, rating: 4.3, cover: '#8b5cf6' },
];

const ACTIONS = [
    { label: 'Issue Book', icon: IconBook2, color: '#3D5EE1', bg: '#eef2ff' },
    { label: 'Search', icon: IconSearch, color: '#10b981', bg: '#d1fae5' },
    { label: 'Find Book', icon: IconSearch, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Print List', icon: IconPrinter, color: '#ef4444', bg: '#fee2e2' },
    { label: 'Download', icon: IconDownload, color: '#8b5cf6', bg: '#ede9fe' },
    { label: 'Notify Due', icon: IconMessageCircle, color: '#ec4899', bg: '#fce7f3' },
];

const LibrarianQuickPanel = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Quick Actions */}
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: 800, fontSize: 15, color: '#1e1b4b' }}>Quick Actions</span>
            </div>
            <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {ACTIONS.map((a, i) => (
                    <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, border: `1px solid ${a.color}20`, background: a.bg, cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <a.icon size={15} color="white" />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', textAlign: 'left', lineHeight: 1.2 }}>{a.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Popular Books */}
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconBook size={16} color="#3D5EE1" />
                <span style={{ fontWeight: 800, fontSize: 15, color: '#1e1b4b' }}>Most Popular Books</span>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {POPULAR.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* Book spine */}
                        <div style={{ width: 28, height: 38, borderRadius: 4, background: b.cover, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 800, color: 'white' }}>
                            {i + 1}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 12, color: '#1f2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                            <div style={{ fontSize: 10, color: '#9ca3af' }}>{b.author}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#f59e0b', fontWeight: 700 }}>
                                <IconStar size={9} />{b.rating}
                            </div>
                            <div style={{ fontSize: 9, color: '#9ca3af' }}>{b.issued} issued</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default LibrarianQuickPanel;
