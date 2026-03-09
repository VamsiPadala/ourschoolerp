import React, { useState } from 'react';
import { IconCircleCheck, IconLoader, IconCircle } from '@tabler/icons-react';

const TODOS = [
    { task: 'Send Reminder to Students', time: '01:00 PM', status: 'Completed' },
    { task: 'Create Routine to new staff', time: '04:50 PM', status: 'Inprogress' },
    { task: 'Extra Class Info to Students', time: '04:55 PM', status: 'YetToStart' },
    { task: 'Fees for Upcoming Academics', time: '04:55 PM', status: 'YetToStart' },
    { task: 'English - Essay on Visit', time: '05:55 PM', status: 'YetToStart' },
];

const STATUS_CONFIG = {
    Completed: { label: 'Completed', color: '#10b981', bg: '#d1fae5', icon: IconCircleCheck },
    Inprogress: { label: 'Inprogress', color: '#f59e0b', bg: '#fef3c7', icon: IconLoader },
    YetToStart: { label: 'Yet to Start', color: '#6b7280', bg: '#f3f4f6', icon: IconCircle },
};

const StudentTodo = () => {
    const [filter, setFilter] = useState('Today');
    return (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h5 style={{ fontWeight: 800, fontSize: 16, color: '#1e1b4b', margin: 0 }}>Todo</h5>
                <div style={{ display: 'flex', gap: 4 }}>
                    {['Today', 'This Month', 'This Year'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            style={{ padding: '5px 10px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 600, background: filter === f ? '#3D5EE1' : '#f3f4f6', color: filter === f ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TODOS.map((todo, i) => {
                    const cfg = STATUS_CONFIG[todo.status];
                    return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 12, background: '#f8fafc', border: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}>
                            <cfg.icon size={18} color={cfg.color} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: 13, color: '#1f2937', textDecoration: todo.status === 'Completed' ? 'line-through' : 'none' }}>{todo.task}</div>
                                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{todo.time}</div>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: cfg.bg, color: cfg.color, flexShrink: 0, whiteSpace: 'nowrap' }}>{cfg.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentTodo;
