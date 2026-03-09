import React, { useState, useRef, useEffect } from 'react';
import { IconChevronDown, IconUser } from '@tabler/icons-react';

const STUDENTS = [
    { id: 1, name: 'Thomas Bown', class: 'Class V-B', roll: 'A001' },
    { id: 2, name: 'Sara Bown', class: 'Class III-A', roll: 'A002' },
];

const ParentWelcomeBanner = ({ selectedStudent, onSelectStudent, authUser }) => {
    const [open, setOpen] = useState(false);
    const dropRef = useRef(null);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        // No overflow:hidden here so dropdown isn't clipped
        <div style={{ position: 'relative', borderRadius: 16, background: 'linear-gradient(120deg, #3D5EE1 0%, #6C49EF 100%)', padding: '28px 32px', marginBottom: 24, boxShadow: '0 8px 32px rgba(61,94,225,0.25)' }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: -30, right: 160, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -40, right: 60, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
            {/* Preskool illustration */}
            <img src="https://preskool.dreamstechnologies.com/html/template/assets/img/bg/bg-01.png" alt="" aria-hidden
                style={{ position: 'absolute', right: 0, top: 0, height: '100%', objectFit: 'contain', objectPosition: 'right', pointerEvents: 'none', borderRadius: '0 16px 16px 0' }}
                onError={e => e.target.style.display = 'none'} />

            {/* Content row */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                {/* Left: Greeting */}
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: '0 0 4px' }}>
                        {greeting}, {authUser?.name || 'Parent'}!
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: 0 }}>
                        Track your child's academic progress and activities.
                    </p>
                </div>

                {/* Right: Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 20 }}>
                    {/* Student Selector */}
                    <div ref={dropRef} style={{ position: 'relative' }}>
                        <button
                            onClick={() => setOpen(o => !o)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', backdropFilter: 'blur(8px)' }}
                        >
                            <IconUser size={16} />
                            {selectedStudent.name}
                            <IconChevronDown size={15} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
                        </button>

                        {/* Dropdown — rendered above the banner via absolute + high z-index */}
                        {open && (
                            <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 12px 40px rgba(0,0,0,0.18)', minWidth: 220, zIndex: 9999, overflow: 'hidden' }}>
                                {STUDENTS.map(s => (
                                    <div key={s.id}
                                        onClick={() => { onSelectStudent(s); setOpen(false); }}
                                        style={{ padding: '12px 16px', cursor: 'pointer', background: selectedStudent.id === s.id ? '#f0f4ff' : 'white', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}
                                        onMouseEnter={e => { if (selectedStudent.id !== s.id) e.currentTarget.style.background = '#f8fafc'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = selectedStudent.id === s.id ? '#f0f4ff' : 'white'; }}
                                    >
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#3D5EE1,#6C49EF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
                                            {s.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e1b4b' }}>{s.name}</div>
                                            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{s.class} · Roll #{s.roll}</div>
                                        </div>
                                        {selectedStudent.id === s.id && (
                                            <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#3D5EE1' }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                        Apply Leave
                    </button>
                    <button style={{ padding: '10px 20px', borderRadius: 10, background: 'white', border: 'none', color: '#3D5EE1', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}>
                        Raise a Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ParentWelcomeBanner;
