import React, { useState } from 'react';
import { IconAlertTriangle, IconClock, IconPhone } from '@tabler/icons-react';

const OVERDUE = [
    { name: 'Angelo Riana', class: 'III-C', book: 'Introduction to Physics', issued: '12 Feb 2026', due: '26 Feb 2026', days: 9, fine: '$4.50', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
    { name: 'Thomas Bown', class: 'V-B', book: 'Advanced Mathematics Vol II', issued: '15 Feb 2026', due: '28 Feb 2026', days: 7, fine: '$3.50', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg' },
    { name: 'Lisa Thompson', class: 'II-A', book: 'English Literature: Classics', issued: '18 Feb 2026', due: '03 Mar 2026', days: 4, fine: '$2.00', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg' },
    { name: 'Gifford Harris', class: 'I-B', book: 'World History & Geography', issued: '20 Feb 2026', due: '05 Mar 2026', days: 2, fine: '$1.00', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-04.jpg' },
    { name: 'Priya Nair', class: 'IV-A', book: 'Chemistry Fundamentals', issued: '22 Feb 2026', due: '07 Mar 2026', days: 0, fine: '$0.00', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-05.jpg' },
];

const LibrarianOverdueBooks = () => {
    const [filter, setFilter] = useState('All');
    const list = filter === 'All' ? OVERDUE : OVERDUE.filter(o => (filter === 'Critical' ? o.days >= 7 : o.days < 7));

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconAlertTriangle size={18} color="#ef4444" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Overdue Books</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    {['All', 'Critical', 'Recent'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: filter === f ? '#ef4444' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {list.map((o, i) => {
                    const color = o.days >= 7 ? '#ef4444' : o.days >= 3 ? '#f59e0b' : '#10b981';
                    const bg = o.days >= 7 ? '#fee2e2' : o.days >= 3 ? '#fef3c7' : '#d1fae5';
                    return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: bg, border: `1px solid ${color}25` }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                                <img src={o.avatar} alt={o.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(o.name)}&size=38&background=3D5EE1&color=fff`; }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: 13, color: '#1f2937' }}>{o.name} <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 400 }}>· {o.class}</span></div>
                                <div style={{ fontSize: 11, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>📚 {o.book}</div>
                                <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}><IconClock size={10} /> Due: {o.due}</div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontWeight: 800, fontSize: 13, color }}>+{o.days}d</div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444' }}>{o.fine}</div>
                                <button style={{ marginTop: 4, width: 26, height: 26, borderRadius: 7, background: 'white', border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <IconPhone size={12} color={color} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LibrarianOverdueBooks;
