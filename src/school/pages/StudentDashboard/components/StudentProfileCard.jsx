import React from 'react';
import { IconEdit, IconBook, IconFlask, IconAtom } from '@tabler/icons-react';

const COLORS = { English: '#3D5EE1', Chemistry: '#f59e0b', Physics: '#10b981' };

const StudentProfileCard = () => {
    const todaysClasses = [
        { subject: 'English', icon: IconBook, color: COLORS.English },
        { subject: 'Chemistry', icon: IconFlask, color: COLORS.Chemistry },
        { subject: 'Physics', icon: IconAtom, color: COLORS.Physics },
    ];

    return (
        <div style={{ background: 'linear-gradient(135deg,#3D5EE1 0%,#6C49EF 100%)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(61,94,225,0.25)' }}>
            {/* Header */}
            <div style={{ padding: '20px 20px 16px', position: 'relative' }}>
                {/* Decorative circle */}
                <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 72, height: 72, borderRadius: 14, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.4)', flexShrink: 0 }}>
                        <img src="https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg"
                            alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={e => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=Angelo+Riana&size=72&background=ffffff&color=3D5EE1'; }} />
                    </div>
                    <div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.15)', padding: '2px 10px', borderRadius: 20, letterSpacing: '0.05em' }}>#ST1234546</span>
                        <h3 style={{ color: 'white', fontWeight: 800, fontSize: 18, margin: '4px 0 6px' }}>Angelo Riana</h3>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Class: III, C</span>
                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Roll No: 36545</span>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '14px 0' }} />

                {/* Exam status + edit button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>1st Quarterly</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, background: '#10b981', color: 'white', padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', display: 'inline-block' }} />Pass
                        </span>
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                        <IconEdit size={13} /> Edit Profile
                    </button>
                </div>
            </div>

            {/* Today's Class */}
            <div style={{ background: 'white', borderRadius: '0 0 16px 16px', padding: '16px 20px' }}>
                <h5 style={{ fontWeight: 800, fontSize: 14, color: '#1e1b4b', marginBottom: 14 }}>Today's Class</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {todaysClasses.map((cls, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: `${cls.color}12`, border: `1px solid ${cls.color}30` }}>
                            <div style={{ width: 36, height: 36, borderRadius: 9, background: cls.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <cls.icon size={18} color="white" />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: 14, color: '#1e1b4b' }}>{cls.subject}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentProfileCard;
