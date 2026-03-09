import React, { useState } from 'react';
import { IconBookUpload, IconBookDownload, IconUser, IconCalendar } from '@tabler/icons-react';

const TRANSACTIONS = [
    { type: 'Issue', name: 'Angelo Riana', class: 'III-C', book: 'Physics Vol I', date: '07 Mar 2026', dueDate: '21 Mar 2026', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
    { type: 'Return', name: 'Thomas Bown', class: 'V-B', book: 'Advanced Maths', date: '07 Mar 2026', dueDate: null, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg' },
    { type: 'Issue', name: 'Janet Parker', class: 'IV-A', book: 'English Literature', date: '07 Mar 2026', dueDate: '21 Mar 2026', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg' },
    { type: 'Return', name: 'Gifford Harris', class: 'I-B', book: 'World History', date: '06 Mar 2026', dueDate: null, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-04.jpg' },
    { type: 'Issue', name: 'Lisa Thompson', class: 'II-A', book: 'Chemistry Basics', date: '06 Mar 2026', dueDate: '20 Mar 2026', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-05.jpg' },
    { type: 'Issue', name: 'Riana Mathews', class: 'V-C', book: 'Biology Fundamentals', date: '06 Mar 2026', dueDate: '20 Mar 2026', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
];

const LibrarianTransactions = () => {
    const [filter, setFilter] = useState('All');
    const list = filter === 'All' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === filter);

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconBookUpload size={18} color="#3D5EE1" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b' }}>Book Transactions</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    {['All', 'Issue', 'Return'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{ padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, background: filter === f ? '#3D5EE1' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', padding: '8px 20px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                {['Student', 'Book', 'Date', 'Type'].map((h, i) => (
                    <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: i > 1 ? 'center' : 'left' }}>{h}</div>
                ))}
            </div>
            {list.map((t, i) => {
                const isIssue = t.type === 'Issue';
                return (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', alignItems: 'center', padding: '11px 20px', borderBottom: i < list.length - 1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fafbff'} onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                                <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&size=30&background=3D5EE1&color=fff`; }} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 12, color: '#1f2937' }}>{t.name}</div>
                                <div style={{ fontSize: 10, color: '#9ca3af' }}>{t.class}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: 12, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>📚 {t.book}</div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}><IconCalendar size={10} />{t.date}</div>
                            {t.dueDate && <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 1 }}>Due: {t.dueDate}</div>}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: isIssue ? '#eef2ff' : '#d1fae5', color: isIssue ? '#3D5EE1' : '#065f46' }}>
                                {isIssue ? <IconBookUpload size={10} /> : <IconBookDownload size={10} />}{t.type}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LibrarianTransactions;
