import React from 'react';
import { IconLayoutDashboard, IconCalendar, IconUser } from '@tabler/icons-react';

import ReceptionistStatCards from './components/ReceptionistStatCards';
import ReceptionistVisitorLog from './components/ReceptionistVisitorLog';
import ReceptionistAppointments from './components/ReceptionistAppointments';
import ReceptionistQuickPanel from './components/ReceptionistQuickPanel';

const now = new Date();
const hour = now.getHours();
const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const ReceptionistDashboard = () => (
    <div style={{ minHeight: '100vh', background: '#F7F7FA', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 48px' }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
                <IconLayoutDashboard size={15} color="#10b981" />
                <a href="/school/dashboard" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 600 }}>Dashboard</a>
                <span>/</span>
                <span style={{ color: '#374151', fontWeight: 600 }}>Receptionist Dashboard</span>
            </div>

            {/* Welcome Banner — green gradient */}
            <div style={{ position: 'relative', borderRadius: 16, background: 'linear-gradient(120deg,#064e3b 0%,#059669 55%,#10b981 100%)', padding: '28px 32px', marginBottom: 24, boxShadow: '0 8px 32px rgba(16,185,129,0.28)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -40, right: 220, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -60, right: 60, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
                <img src="https://preskool.dreamstechnologies.com/html/template/assets/img/bg/bg-01.png" alt="" aria-hidden
                    style={{ position: 'absolute', right: 0, top: 0, height: '100%', objectFit: 'contain', objectPosition: 'right', pointerEvents: 'none', opacity: 0.5 }}
                    onError={e => e.target.style.display = 'none'} />
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: '0 0 4px' }}>{greeting}, Receptionist! 👋</h1>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>Managing visitors and appointments — here's your daily overview</p>
                    </div>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>
                            <IconCalendar size={15} /> {dateStr}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: 13, fontWeight: 600 }}>
                            <IconUser size={15} /> Front Desk
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 1: KPI Cards */}
            <ReceptionistStatCards />

            {/* ROW 2: Visitor Log (2/3) + Quick Panel (1/3) */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
                <ReceptionistVisitorLog />
                <ReceptionistQuickPanel />
            </div>

            {/* ROW 3: Appointments (full width) */}
            <ReceptionistAppointments />

        </div>
    </div>
);

export default ReceptionistDashboard;
