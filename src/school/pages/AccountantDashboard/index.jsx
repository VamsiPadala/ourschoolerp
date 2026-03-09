import React from 'react';
import { IconLayoutDashboard, IconCalendar, IconUser } from '@tabler/icons-react';

import AccountantStatCards from './components/AccountantStatCards';
import AccountantRevenueChart from './components/AccountantRevenueChart';
import AccountantTransactions from './components/AccountantTransactions';
import AccountantPendingFees from './components/AccountantPendingFees';
import AccountantExpenseBreakdown from './components/AccountantExpenseBreakdown';
import AccountantQuickPanel from './components/AccountantQuickPanel';

const now = new Date();
const hour = now.getHours();
const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const AccountantDashboard = () => {
    let authUser = null;
    try { const { useAuth } = require('src/context/AuthContext'); authUser = useAuth()?.user; } catch { }

    return (
        <div style={{ minHeight: '100vh', background: '#F7F7FA', fontFamily: "'Poppins', sans-serif" }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 48px' }}>

                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
                    <IconLayoutDashboard size={15} color="#3D5EE1" />
                    <a href="/school/dashboard" style={{ color: '#3D5EE1', textDecoration: 'none', fontWeight: 600 }}>Dashboard</a>
                    <span>/</span>
                    <span style={{ color: '#374151', fontWeight: 600 }}>Accountant Dashboard</span>
                </div>

                {/* Welcome Banner */}
                <div style={{ position: 'relative', borderRadius: 16, background: 'linear-gradient(120deg,#1e1b4b 0%,#3D5EE1 60%,#6C49EF 100%)', padding: '28px 32px', marginBottom: 24, boxShadow: '0 8px 32px rgba(61,94,225,0.28)', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -40, right: 200, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: -50, right: 80, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
                    <img src="https://preskool.dreamstechnologies.com/html/template/assets/img/bg/bg-01.png" alt="" aria-hidden
                        style={{ position: 'absolute', right: 0, top: 0, height: '100%', objectFit: 'contain', objectPosition: 'right', pointerEvents: 'none', opacity: 0.5 }}
                        onError={e => e.target.style.display = 'none'} />
                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                        <div>
                            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: '0 0 4px' }}>
                                {greeting}, {authUser?.name || 'Accountant'}! 👋
                            </h1>
                            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: 0 }}>Here's your financial overview for today</p>
                        </div>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                                <IconCalendar size={15} /> {dateStr}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontSize: 13, fontWeight: 600 }}>
                                <IconUser size={15} /> Finance Department
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROW 1: 4 KPI stat cards */}
                <AccountantStatCards />

                {/* ROW 2: Revenue chart + Quick Panel */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
                    <AccountantRevenueChart />
                    <AccountantQuickPanel />
                </div>

                {/* ROW 3: Recent Transactions */}
                <div style={{ marginBottom: 20 }}>
                    <AccountantTransactions />
                </div>

                {/* ROW 4: Pending Fees + Budget Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20 }}>
                    <AccountantPendingFees />
                    <AccountantExpenseBreakdown />
                </div>

            </div>
        </div>
    );
};

export default AccountantDashboard;
