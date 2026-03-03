import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Bell, Pencil, Clock, ChevronLeft, ChevronRight, Calendar, Edit, Share2, Medal, AlertCircle, Hospital, FileWarning } from 'lucide-react';
import '../Reports/Reports.css';

// ─── Data (same fields as before, just presented better) ─────────────────────
const teacherPhoto = 'https://preskool.dreamstechnologies.com/html/template/assets/img/teachers/teacher-05.jpg';

const todaysClasses = [
    { time: '09:00 - 09:45', class: 'Class V, B', subject: 'Physics', color: '#3d5ee1', bg: '#eef1fd' },
    { time: '09:00 - 09:45', class: 'Class IV, C', subject: 'Physics', color: '#ea5455', bg: '#fce8e8' },
    { time: '11:30 - 12:15', class: 'Class V, B', subject: 'Physics', color: '#7367f0', bg: '#efedfd' },
    { time: '01:30 - 02:15', class: 'Class V, B', subject: 'Physics', color: '#00cfe8', bg: '#e0f9fc' },
];

const attendanceStats = { present: 25, absent: 2, halfday: 0, late: 1 };
const weekDaysAttendance = [
    { day: 'Mon', value: 85, status: 'present' }, { day: 'Tue', value: 70, status: 'present' },
    { day: 'Wed', value: 90, status: 'present' }, { day: 'Thu', value: 60, status: 'present' },
    { day: 'Fri', value: 45, status: 'absent' }, { day: 'Sat', value: 30, status: 'default' },
];

const bestPerformers = [
    { name: 'Class IV, C', percentage: 80, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
    { name: 'Class III, B', percentage: 54, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg' },
    { name: 'Class V, A', percentage: 76, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg' },
];

const studentProgress = [
    { name: 'Susan Boswell', class: 'III, B', percentage: 98, medal: 'gold', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
    { name: 'Richard Mayes', class: 'V, A', percentage: 98, medal: 'silver', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg' },
    { name: 'Veronica Randle', class: 'V, B', percentage: 78, medal: null, avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg' },
];

const lessonPlans = [
    { class: 'Class V, B', title: 'Introduction Note to Physics on Tech', progress: 80, color: '#28c76f', bg: '#e8faf1' },
    { class: 'Class V, A', title: 'Biometric & their Working Functionality', progress: 80, color: '#ff9f43', bg: '#fff5e6' },
    { class: 'Class IV, C', title: 'Analyze and interpret literary texts skills', progress: 80, color: '#00cfe8', bg: '#e0f9fc' },
    { class: 'Class V, A', title: 'Enhance vocabulary and grammar skills', progress: 30, color: '#ea5455', bg: '#fce8e8' },
];

const studentMarks = [
    { id: '35013', name: 'Janet', class: 'III', section: 'A', marks: '89%', cgpa: '4.2', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-01.jpg' },
    { id: '35013', name: 'Joann', class: 'IV', section: 'B', marks: '88%', cgpa: '3.2', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-02.jpg' },
    { id: '35011', name: 'Kathleen', class: 'II', section: 'A', marks: '69%', cgpa: '4.5', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-03.jpg' },
    { id: '35010', name: 'Gifford', class: 'I', section: 'B', marks: '21%', cgpa: '4.5', status: 'Pass', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-04.jpg' },
    { id: '35009', name: 'Lisa', class: 'II', section: 'B', marks: '31%', cgpa: '3.9', status: 'Fail', avatar: 'https://preskool.dreamstechnologies.com/html/template/assets/img/students/student-05.jpg' },
];

const leaveStatuses = [
    { type: 'Emergency Leave', date: '15 Jun 2024', status: 'Pending', icon: '🚨', statusClass: 'rpt-badge-blue' },
    { type: 'Medical Leave', date: '15 Jun 2024', status: 'Approved', icon: '🏥', statusClass: 'rpt-badge-green' },
    { type: 'Medical Leave', date: '16 Jun 2024', status: 'Declined', icon: '🏥', statusClass: 'rpt-badge-red' },
    { type: 'Not Well', date: '16 Jun 2024', status: 'Approved', icon: '😷', statusClass: 'rpt-badge-green' },
];

const syllabusCompleted = 95;
const syllabusCircumference = 2 * Math.PI * 40;
const syllabusOffset = syllabusCircumference - (syllabusCompleted / 100) * syllabusCircumference;

// ─── Mini Calendar ──────────────────────────────────────────────────────────
const MiniCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1));
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const getDays = (date) => {
        const year = date.getFullYear(), month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevLastDay = new Date(year, month, 0).getDate();
        const days = [];
        for (let i = firstDay - 1; i >= 0; i--) days.push({ day: prevLastDay - i, cur: false });
        for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, cur: true, isToday: i === 1 });
        const rem = 42 - days.length;
        for (let i = 1; i <= rem; i++) days.push({ day: i, cur: false });
        return days;
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ border: 'none', background: '#f1f3f9', borderRadius: 8, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={14} color="#6e6b7b" />
                </button>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#333448' }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ border: 'none', background: '#f1f3f9', borderRadius: 8, width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} color="#6e6b7b" />
                </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', textAlign: 'center', background: '#f8fafc', borderRadius: 10, overflow: 'hidden', border: '1px solid #eef0f4' }}>
                {weekDays.map(d => <div key={d} style={{ padding: '8px 0', fontSize: 11, fontWeight: 700, color: '#8c90a4' }}>{d}</div>)}
                {getDays(currentMonth).map((d, i) => (
                    <div key={i} style={{ padding: '7px 0', fontSize: 12, color: !d.cur ? '#d1d5db' : '#333448', borderTop: '1px solid #eef0f4', cursor: 'pointer' }}>
                        {d.isToday
                            ? <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%', background: '#3d5ee1', color: '#fff', fontWeight: 700 }}>{d.day}</span>
                            : d.day}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Component ──────────────────────────────────────────────────────────────
const TeacherDashboard = () => {
    const [activePeriod, setActivePeriod] = useState('This Week');

    return (
        <div className="rpt-page">
            {/* ── Page Header ───────────────────────────────────────── */}
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Teacher Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Home</Link>
                        <span> / </span>
                        <span className="rpt-breadcrumb-current">Teacher Dashboard</span>
                    </nav>
                </div>
                <div className="rpt-header-actions">
                    {['This Week', 'This Month', 'This Year'].map(p => (
                        <button key={p} className={`rpt-period-btn ${activePeriod === p ? 'active' : ''}`} onClick={() => setActivePeriod(p)}>{p}</button>
                    ))}
                </div>
            </div>

            {/* ── Welcome Banner ────────────────────────────────────── */}
            <div style={{ background: 'linear-gradient(135deg, #3d5ee1 0%, #7367f0 100%)', borderRadius: 16, padding: '28px 32px', position: 'relative', overflow: 'hidden', minHeight: 120 }}>
                <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                    <img src="https://preskool.dreamstechnologies.com/html/template/assets/img/bg/bg-01.png" alt="" style={{ height: '100%', objectFit: 'contain', objectPosition: 'right', opacity: 0.3 }} />
                </div>
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '60%' }}>
                    <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.5px' }}>Good Morning, Ms. Teena! 👋</h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, margin: '0 0 12px' }}>Have a great day at work. Here's your daily overview.</p>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                        <Bell size={16} />
                        <strong style={{ color: '#fff' }}>Notice:</strong> Staff meeting at 9 AM today — Don't miss it!
                    </p>
                </div>
            </div>

            {/* ── Profile + Syllabus + Quick KPIs ─────────────────── */}
            <div className="rpt-row rpt-row-2">
                {/* Teacher Profile Card */}
                <div className="rpt-card" style={{ background: '#1E293B', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', width: 200, height: 200, background: 'rgba(99,102,241,0.1)', borderRadius: '50%', top: -60, right: '10%' }} />
                    <div style={{ position: 'absolute', width: 120, height: 120, background: 'rgba(99,102,241,0.08)', borderRadius: '50%', top: 30, right: '40%' }} />
                    <div style={{ padding: '24px', position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <span style={{ position: 'absolute', top: -10, left: -10, zIndex: 20, background: '#8B5CF6', color: '#fff', padding: '3px 9px', fontSize: 11, fontWeight: 700, borderRadius: 5 }}>#T594651</span>
                                <div style={{ width: 90, height: 90, borderRadius: 12, border: '3px solid rgba(255,255,255,0.3)', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
                                    <img src={teacherPhoto} alt="Teacher" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Henriques Morgan</h3>
                                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: '0 0 12px' }}>Classes: I-A, V-B &nbsp;•&nbsp; <span style={{ color: '#F59E0B', fontWeight: 600 }}>Physics</span></p>
                                <button style={{ background: '#3d5ee1', color: '#fff', border: 'none', borderRadius: 9, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Pencil size={13} /> Edit Profile
                                </button>
                            </div>
                        </div>
                        {/* Quick stats row inside card */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
                            {[
                                { label: 'Present', value: attendanceStats.present, color: '#28c76f' },
                                { label: 'Absent', value: attendanceStats.absent, color: '#ea5455' },
                                { label: 'Halfday', value: attendanceStats.halfday, color: '#ff9f43' },
                                { label: 'Late', value: attendanceStats.late, color: '#00cfe8' },
                            ].map((s, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</p>
                                    <h4 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Syllabus Progress */}
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Syllabus Progress</h5>
                        <span className="rpt-badge rpt-badge-green">Physics</span>
                    </div>
                    <div className="rpt-chart-body" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                        <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f2f7" strokeWidth="10" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#28c76f" strokeWidth="10" strokeLinecap="round"
                                    strokeDasharray={syllabusCircumference} strokeDashoffset={syllabusOffset} />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: 22, fontWeight: 800, color: '#333448' }}>{syllabusCompleted}%</span>
                            </div>
                        </div>
                        <div>
                            <p style={{ margin: '0 0 16px', fontSize: 14, color: '#8c90a4' }}>Total Syllabus Coverage</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[{ label: 'Completed', pct: syllabusCompleted, color: '#28c76f' }, { label: 'Pending', pct: 100 - syllabusCompleted, color: '#ea5455' }].map((s, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }}></span>
                                        <span style={{ fontSize: 13, color: '#6e6b7b', fontWeight: 600 }}>{s.label}</span>
                                        <strong style={{ marginLeft: 'auto', color: '#333448' }}>{s.pct}%</strong>
                                    </div>
                                ))}
                            </div>
                            <div className="rpt-bar-wrap" style={{ marginTop: 16 }}>
                                <div className="rpt-bar-fill" style={{ width: `${syllabusCompleted}%`, background: 'linear-gradient(90deg, #28c76f, #3d5ee1)' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Today's Classes ───────────────────────────────────── */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Today's Classes</h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button style={{ border: '1px solid #eef0f4', background: '#fff', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={16} color="#6e6b7b" /></button>
                        <span style={{ fontSize: 13, color: '#8c90a4', fontWeight: 600 }}>16 May 2024</span>
                        <button style={{ border: '1px solid #eef0f4', background: '#fff', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={16} color="#6e6b7b" /></button>
                    </div>
                </div>
                <div className="rpt-chart-body">
                    <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4 }}>
                        {todaysClasses.map((cls, i) => (
                            <div key={i} style={{ minWidth: 160, borderRadius: 14, overflow: 'hidden', border: '1px solid #eef0f4', flexShrink: 0, transition: 'all 0.3s', cursor: 'pointer' }}>
                                <div style={{ background: cls.color, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Clock size={13} color="#fff" />
                                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{cls.time}</span>
                                </div>
                                <div style={{ padding: '14px', background: cls.bg, textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: cls.color }}>{cls.class}</p>
                                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#8c90a4' }}>{cls.subject}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Attendance + Best Performers ─────────────────────── */}
            <div className="rpt-row rpt-row-2">
                {/* Attendance */}
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">My Attendance</h5>
                        <span style={{ fontSize: 12, color: '#8c90a4', fontWeight: 600 }}>14 May – 21 May 2024</span>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={120}>
                            <BarChart data={weekDaysAttendance} margin={{ top: 5, right: 5, left: -35, bottom: 0 }}>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6e6b7b', fontSize: 11 }} dy={8} />
                                <Tooltip formatter={(v) => [v + '%', 'Score']} cursor={{ fill: '#f8f9fa' }} />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
                                    {weekDaysAttendance.map((d, i) => (
                                        <Cell key={i} fill={d.status === 'absent' ? '#ea5455' : d.status === 'default' ? '#e5e7eb' : '#3d5ee1'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p style={{ margin: '10px 0 14px', fontSize: 12, color: '#8c90a4' }}>Total working days: <strong style={{ color: '#333448' }}>28 Days</strong></p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                            {[
                                { label: 'Present', value: attendanceStats.present, bg: '#e8faf1', color: '#28c76f' },
                                { label: 'Absent', value: attendanceStats.absent, bg: '#fce8e8', color: '#ea5455' },
                                { label: 'Halfday', value: attendanceStats.halfday, bg: '#fff5e6', color: '#ff9f43' },
                                { label: 'Late', value: attendanceStats.late, bg: '#e0f9fc', color: '#00cfe8' },
                            ].map((s, i) => (
                                <div key={i} style={{ background: s.bg, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                                    <p style={{ margin: 0, fontSize: 11, color: s.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</p>
                                    <h4 style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Best Performers */}
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Best Performers</h5>
                        <a href="#" className="rpt-view-all">View All →</a>
                    </div>
                    <div className="rpt-chart-body">
                        <div className="rpt-subject-table">
                            {bestPerformers.map((p, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < bestPerformers.length - 1 ? '1px solid #f0f2f7' : 'none' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '2px solid #eef0f4', flexShrink: 0 }}>
                                        <img src={p.avatar} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = 'https://via.placeholder.com/44'} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                            <span style={{ fontWeight: 700, fontSize: 14, color: '#333448' }}>{p.name}</span>
                                            <strong style={{ color: '#3d5ee1', fontSize: 14 }}>{p.percentage}%</strong>
                                        </div>
                                        <div className="rpt-bar-wrap">
                                            <div className="rpt-bar-fill" style={{ width: `${p.percentage}%`, background: p.percentage >= 75 ? '#28c76f' : '#ff9f43' }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Student Progress ──────────────────────────────────── */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Student Progress — Top Students</h5>
                    <a href="#" style={{ fontSize: 13, color: '#8c90a4', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Calendar size={15} /> This Month
                    </a>
                </div>
                <div className="rpt-chart-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                        {studentProgress.map((s, i) => {
                            const medalColors = { gold: '#F59E0B', silver: '#9CA3AF', bronze: '#CD7F32' };
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 14, border: '1px solid #eef0f4', background: '#fafbfc', transition: 'all 0.3s' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', border: '2px solid #eef0f4', flexShrink: 0 }}>
                                            <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = 'https://via.placeholder.com/48'} />
                                        </div>
                                        <div>
                                            <h6 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#333448' }}>{s.name}</h6>
                                            <p style={{ margin: 0, fontSize: 12, color: '#8c90a4' }}>Class {s.class}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {s.medal && <Medal size={20} style={{ color: medalColors[s.medal] || '#CD7F32' }} />}
                                        <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, background: s.percentage >= 90 ? '#e8faf1' : '#e0f9fc', color: s.percentage >= 90 ? '#28c76f' : '#00cfe8' }}>{s.percentage}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Lesson Plans ─────────────────────────────────────── */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Syllabus / Lesson Plans</h5>
                    <a href="#" className="rpt-view-all">View All →</a>
                </div>
                <div className="rpt-chart-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                        {lessonPlans.map((lesson, i) => (
                            <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #eef0f4' }}>
                                <div style={{ height: 4, background: lesson.color }} />
                                <div style={{ padding: '18px' }}>
                                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: lesson.bg, color: lesson.color, marginBottom: 10 }}>{lesson.class}</span>
                                    <h5 style={{ fontSize: 13, fontWeight: 700, color: '#333448', marginBottom: 14, minHeight: 40, lineHeight: 1.4 }}>{lesson.title}</h5>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, color: '#8c90a4' }}>Progress</span>
                                        <strong style={{ fontSize: 13, color: lesson.color }}>{lesson.progress}%</strong>
                                    </div>
                                    <div className="rpt-bar-wrap">
                                        <div className="rpt-bar-fill" style={{ width: `${lesson.progress}%`, background: lesson.color }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTop: '1px solid #f0f2f7' }}>
                                        <a href="#" style={{ fontSize: 12, color: '#8c90a4', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}><Edit size={12} /> Reschedule</a>
                                        <a href="#" style={{ fontSize: 12, color: '#3d5ee1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}><Share2 size={12} /> Share</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Student Marks Table + Leave Status ───────────────── */}
            <div className="rpt-row" style={{ gridTemplateColumns: '2fr 1fr' }}>
                {/* Student Marks Table */}
                <div className="rpt-table-card">
                    <div className="rpt-table-header">
                        <h5 className="rpt-table-title">Student Marks</h5>
                        <div className="rpt-table-actions">
                            <select className="rpt-select" style={{ fontSize: 12, padding: '6px 12px' }}><option>All Classes</option><option>Class I</option><option>Class II</option></select>
                            <select className="rpt-select" style={{ fontSize: 12, padding: '6px 12px' }}><option>All Sections</option><option>Section A</option><option>Section B</option></select>
                        </div>
                    </div>
                    <div className="rpt-table-wrap">
                        <table className="rpt-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Marks %</th>
                                    <th>CGPA</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentMarks.map((s, i) => (
                                    <tr key={i}>
                                        <td style={{ color: '#8c90a4' }}>{s.id}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid #eef0f4', flexShrink: 0 }}>
                                                    <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src = 'https://via.placeholder.com/36'} />
                                                </div>
                                                <strong>{s.name}</strong>
                                            </div>
                                        </td>
                                        <td>{s.class}</td>
                                        <td>{s.section}</td>
                                        <td><strong>{s.marks}</strong></td>
                                        <td>{s.cgpa}</td>
                                        <td>
                                            <span className={`rpt-badge ${s.status === 'Pass' ? 'rpt-badge-green' : 'rpt-badge-red'}`}>{s.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Leave Status */}
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Leave Status</h5>
                        <a href="#" style={{ fontSize: 12, color: '#8c90a4', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={13} /> This Month</a>
                    </div>
                    <div className="rpt-chart-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {leaveStatuses.map((l, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 12, background: '#fafbfc', border: '1px solid #eef0f4' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: '#f0f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{l.icon}</div>
                                    <div>
                                        <h6 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#333448' }}>{l.type}</h6>
                                        <p style={{ margin: 0, fontSize: 11, color: '#8c90a4' }}>{l.date}</p>
                                    </div>
                                </div>
                                <span className={`rpt-badge ${l.statusClass}`}>{l.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Calendar / Schedules ─────────────────────────────── */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Schedules & Calendar</h5>
                    <button className="rpt-export-btn" style={{ fontSize: 12, padding: '6px 14px' }}>+ Add Event</button>
                </div>
                <div className="rpt-chart-body" style={{ maxWidth: 420 }}>
                    <MiniCalendar />
                </div>
            </div>

            <footer className="rpt-footer"><p>© 2025 MindWhile School ERP — Teacher Dashboard</p></footer>
        </div>
    );
};

export default TeacherDashboard;
