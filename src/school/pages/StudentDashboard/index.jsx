import React from 'react';
import { IconLayoutDashboard } from '@tabler/icons-react';

import StudentProfileCard from './components/StudentProfileCard';
import StudentAttendance from './components/StudentAttendance';
import StudentQuickLinks from './components/StudentQuickLinks';
import StudentSchedules from './components/StudentSchedules';
import StudentPerformance from './components/StudentPerformance';
import StudentHomework from './components/StudentHomework';
import ClassFaculties from './components/ClassFaculties';
import LeaveStatus from './components/LeaveStatus';
import StudentExamResult from './components/StudentExamResult';
import StudentFeesReminder from './components/StudentFeesReminder';
import StudentNoticeBoard from './components/StudentNoticeBoard';
import StudentSyllabus from './components/StudentSyllabus';
import StudentTodo from './components/StudentTodo';

const StudentDashboard = () => (
    <div style={{ minHeight: '100vh', background: '#F7F7FA', fontFamily: "'Poppins', sans-serif" }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 48px' }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, color: '#6b7280' }}>
                <IconLayoutDashboard size={15} color="#3D5EE1" />
                <a href="/school/dashboard" style={{ color: '#3D5EE1', textDecoration: 'none', fontWeight: 600 }}>Dashboard</a>
                <span>/</span>
                <span style={{ color: '#374151', fontWeight: 600 }}>Student Dashboard</span>
            </div>

            {/* ROW 1: Profile card (left) + Attendance (right) */}
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, marginBottom: 20 }}>
                <StudentProfileCard />
                <StudentAttendance />
            </div>

            {/* ROW 2: Quick links (4 cards) */}
            <div style={{ marginBottom: 20 }}>
                <StudentQuickLinks />
            </div>

            {/* ROW 3: Schedules (left) + Performance (right) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <StudentSchedules />
                <StudentPerformance />
            </div>

            {/* ROW 4: Homework (full width) */}
            <div style={{ marginBottom: 20 }}>
                <StudentHomework />
            </div>

            {/* ROW 5: Class Faculties (full width) */}
            <div style={{ marginBottom: 20 }}>
                <ClassFaculties />
            </div>

            {/* ROW 6: Leave Status + Exam Result */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                <LeaveStatus />
                <StudentExamResult />
            </div>

            {/* ROW 7: Fees Reminder + Notice Board + Syllabus + Todo */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 20 }}>
                <StudentFeesReminder />
                <StudentNoticeBoard />
                <StudentSyllabus />
                <StudentTodo />
            </div>

        </div>
    </div>
);

export default StudentDashboard;
