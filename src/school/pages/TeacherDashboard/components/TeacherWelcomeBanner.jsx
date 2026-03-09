import React from 'react';
import { IconBell } from '@tabler/icons-react';
import { useAuth } from 'src/context/AuthContext';

const TeacherWelcomeBanner = () => {
    let user = null;
    try {
        ({ user } = useAuth());
    } catch { }

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    const name = user?.name || 'Ms. Teena';

    return (
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, background: 'linear-gradient(120deg, #3D5EE1 0%, #6C49EF 100%)', padding: '28px 32px', minHeight: 130, boxShadow: '0 8px 32px rgba(61,94,225,0.25)' }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: -40, right: 200, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -50, right: 80, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

            {/* Preskool illustration */}
            <img
                src="https://preskool.dreamstechnologies.com/html/template/assets/img/bg/bg-01.png"
                alt=""
                aria-hidden="true"
                style={{ position: 'absolute', right: 0, top: 0, height: '100%', objectFit: 'contain', objectPosition: 'right', pointerEvents: 'none' }}
                onError={e => e.target.style.display = 'none'}
            />

            {/* Text */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 580 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: 'white', margin: '0 0 5px' }}>{greeting}, {name}!</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '0 0 18px' }}>Have a great day at work 🌟</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.15)', padding: '9px 18px', borderRadius: 40, border: '1px solid rgba(255,255,255,0.2)' }}>
                    <IconBell size={15} color="white" style={{ flexShrink: 0 }} />
                    <span style={{ color: 'white', fontSize: 13 }}>
                        <strong>Notice:</strong> There is a staff meeting at 9AM today. Don't forget to attend!
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TeacherWelcomeBanner;
