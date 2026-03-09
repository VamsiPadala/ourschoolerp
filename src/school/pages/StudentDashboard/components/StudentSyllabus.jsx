import React, { useState } from 'react';
import { IconBook, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const SYLLABUS = [
    { subject: 'Maths', chapters: 12, done: 8, color: '#3D5EE1', items: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry'] },
    { subject: 'Physics', chapters: 10, done: 6, color: '#10b981', items: ['Motion', 'Optics', 'Electricity', 'Magnetism', 'Thermodynamics'] },
    { subject: 'Chemistry', chapters: 11, done: 7, color: '#f59e0b', items: ['Organic', 'Inorganic', 'Physical', 'Elements', 'Reactions'] },
    { subject: 'Botany', chapters: 8, done: 4, color: '#ec4899', items: ['Photosynthesis', 'Cell Biology', 'Plants', 'Genetics'] },
    { subject: 'English', chapters: 9, done: 9, color: '#8b5cf6', items: ['Grammar', 'Literature', 'Writing', 'Vocabulary', 'Poetry'] },
    { subject: 'Spanish', chapters: 7, done: 3, color: '#ef4444', items: ['Basics', 'Verbs', 'Sentences', 'Conversations'] },
    { subject: 'Japanese', chapters: 6, done: 2, color: '#06b6d4', items: ['Hiragana', 'Katakana', 'Kanji Basics', 'Phrases'] },
];

const StudentSyllabus = () => {
    const [expanded, setExpanded] = useState(null);

    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconBook size={18} color="#3D5EE1" />
                </div>
                <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Syllabus</h5>
            </div>
            <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {SYLLABUS.map((s, i) => {
                    const pct = Math.round((s.done / s.chapters) * 100);
                    const isOpen = expanded === i;
                    return (
                        <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #f1f5f9' }}>
                            <div onClick={() => setExpanded(isOpen ? null : i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', cursor: 'pointer', background: isOpen ? `${s.color}08` : 'white', transition: 'background 0.15s' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                                <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: '#1f2937' }}>{s.subject}</span>
                                <div style={{ flex: 2, height: 5, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${pct}%`, background: s.color, borderRadius: 99 }} />
                                </div>
                                <span style={{ fontSize: 11, color: '#6b7280', width: 32, textAlign: 'right' }}>{pct}%</span>
                                {isOpen ? <IconChevronUp size={14} color="#9ca3af" /> : <IconChevronDown size={14} color="#9ca3af" />}
                            </div>
                            {isOpen && (
                                <div style={{ padding: '8px 14px 12px', background: `${s.color}06`, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {s.items.map((item, j) => (
                                        <span key={j} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'white', border: `1px solid ${s.color}30`, color: s.color, fontWeight: 600 }}>{item}</span>
                                    ))}
                                    <span style={{ fontSize: 11, color: '#9ca3af', width: '100%', marginTop: 4 }}>{s.done}/{s.chapters} chapters completed</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentSyllabus;
