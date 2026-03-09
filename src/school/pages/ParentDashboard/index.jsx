import React, { useState } from 'react';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { useAuth } from 'src/context/AuthContext';

import ParentWelcomeBanner from './components/ParentWelcomeBanner';
import ParentLeaveBalance from './components/ParentLeaveBalance';
import ParentWeeklyAttendance from './components/ParentWeeklyAttendance';
import ParentEventsList from './components/ParentEventsList';
import ParentLeaveStatus from './components/ParentLeaveStatus';
import ParentHomeworks from './components/ParentHomeworks';
import ParentNoticeBoard from './components/ParentNoticeBoard';
import ParentFeesReminder from './components/ParentFeesReminder';
import ParentExamResults from './components/ParentExamResults';

const STUDENTS = [
    { id: 1, name: 'Thomas Bown', class: 'Class V-B', roll: 'A001' },
    { id: 2, name: 'Sara Bown', class: 'Class III-A', roll: 'A002' },
];

const ParentDashboard = () => {
    let authUser = null;
    try { const { user } = useAuth(); authUser = user; } catch { }

    const [selectedStudent, setSelectedStudent] = useState(STUDENTS[0]);

    return (
        <div style={{ minHeight: '100vh', background: '#F7F7FA', fontFamily: "'Poppins', sans-serif" }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 48px' }}>

                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
                    <IconLayoutDashboard size={15} color="#3D5EE1" />
                    <a href="/school/dashboard" style={{ color: '#3D5EE1', textDecoration: 'none', fontWeight: 600 }}>Dashboard</a>
                    <span>/</span>
                    <span style={{ color: '#374151', fontWeight: 600 }}>Parent Dashboard</span>
                </div>

                {/* Welcome Banner — student selector lives here */}
                <ParentWelcomeBanner
                    selectedStudent={selectedStudent}
                    onSelectStudent={setSelectedStudent}
                    authUser={authUser}
                />

                {/* Main 3-column grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 280px', gap: 20 }}>

                    {/* ── LEFT sidebar ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <ParentLeaveBalance />
                        <ParentWeeklyAttendance />
                        <ParentEventsList />
                    </div>

                    {/* ── CENTRE column ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <ParentLeaveStatus />
                        <ParentHomeworks />
                    </div>

                    {/* ── RIGHT sidebar ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <ParentFeesReminder />
                        <ParentNoticeBoard />
                    </div>
                </div>

                {/* ── Exam Results — full-width bottom row ── */}
                <div style={{ marginTop: 20 }}>
                    <ParentExamResults fullWidth />
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
