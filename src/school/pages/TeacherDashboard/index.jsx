import React from 'react';
import { IconPlus, IconLayoutDashboard } from '@tabler/icons-react';

import TeacherWelcomeBanner from './components/TeacherWelcomeBanner';
import TeacherProfileCard from './components/TeacherProfileCard';
import TeacherAttendance from './components/TeacherAttendance';
import TeacherSchedules from './components/TeacherSchedules';
import TeacherEvents from './components/TeacherEvents';
import LessonPlans from './components/LessonPlans';
import BestPerformers from './components/BestPerformers';
import StudentProgress from './components/StudentProgress';
import StudentMarksTable from './components/StudentMarksTable';

const TeacherDashboard = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#F7F7FA', fontFamily: "'Poppins', sans-serif" }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 48px' }}>

                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
                    <IconLayoutDashboard size={16} color="#3D5EE1" />
                    <a href="/school/dashboard" style={{ color: '#3D5EE1', textDecoration: 'none', fontWeight: 600 }}>Dashboard</a>
                    <span>/</span>
                    <span style={{ color: '#374151', fontWeight: 600 }}>Teacher Dashboard</span>
                </div>

                {/* Row 1: Welcome Banner */}
                <div style={{ marginBottom: 24 }}>
                    <TeacherWelcomeBanner />
                </div>

                {/* Row 2: Main (3 cols) + Sidebar (1 col) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, marginBottom: 24 }}>

                    {/* Main column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                        {/* Profile Card + Syllabus Progress (already inside ProfileCard stats) */}
                        <TeacherProfileCard />

                        {/* Attendance + Best Performers */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <TeacherAttendance />
                            <BestPerformers />
                        </div>

                        {/* Student Progress */}
                        <StudentProgress />
                    </div>

                    {/* Sidebar */}
                    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
                        <TeacherSchedules />
                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 20 }}>
                            <TeacherEvents />
                        </div>
                    </div>
                </div>

                {/* Row 3: Lesson Plans */}
                <div style={{ marginBottom: 24 }}>
                    <LessonPlans />
                </div>

                {/* Row 4: Student Marks */}
                <div>
                    <StudentMarksTable />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
