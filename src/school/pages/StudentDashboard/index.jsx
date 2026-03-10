import React, { useState } from 'react';

import {
    IconChartBar, IconUserCheck, IconCalendarEvent, IconCertificate,
    IconActivity, IconReportAnalytics, IconPrinter,
    IconTrendingUp, IconAward, IconMoodSmile,
    IconAlertCircle, IconCheck, IconUsers
} from '@tabler/icons-react';
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, RadarChart,
    PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import './StudentAnalyticsDash.css';

// ── Static Data ───────────────────────────────────────────────────────────
const STUDENT_STATIC = {
    name: 'Aaliyah Sharma',
    class: '10-A',
    rollNo: '1001',
    admissionNo: 'PRE2209',
    fatherName: 'Rajesh Sharma',
    dob: '12 Jun 2010',
    phone: '+91 98765 43210',
};

const PerformanceTrend = [
    { month: 'Jan', score: 78, classAvg: 70 },
    { month: 'Feb', score: 82, classAvg: 72 },
    { month: 'Mar', score: 85, classAvg: 75 },
    { month: 'Apr', score: 80, classAvg: 74 },
    { month: 'May', score: 92, classAvg: 76 },
    { month: 'Jun', score: 88, classAvg: 75 },
];

const ComparisonData = {
    'Overall': [
        { subject: 'Math', me: 95, topper: 98 },
        { subject: 'Science', me: 88, topper: 94 },
        { subject: 'English', me: 92, topper: 96 },
        { subject: 'Physics', me: 90, topper: 97 },
    ],
    'Exam-1': [
        { subject: 'Math', me: 85, topper: 92 },
        { subject: 'Science', me: 82, topper: 88 },
        { subject: 'English', me: 88, topper: 94 },
        { subject: 'Physics', me: 85, topper: 90 },
    ],
    'Exam-2': [
        { subject: 'Math', me: 92, topper: 96 },
        { subject: 'Science', me: 90, topper: 95 },
        { subject: 'English', me: 94, topper: 98 },
        { subject: 'Physics', me: 94, topper: 97 },
    ],
    'Final Exam': [
        { subject: 'Math', me: 98, topper: 100 },
        { subject: 'Science', me: 94, topper: 98 },
        { subject: 'English', me: 96, topper: 99 },
        { subject: 'Physics', me: 97, topper: 100 },
    ]
};

const ExamSubjectData = {
    'Overall': [
        { subject: 'Math', value: 95, fullMark: 100 },
        { subject: 'Science', value: 88, fullMark: 100 },
        { subject: 'English', value: 92, fullMark: 100 },
        { subject: 'History', value: 80, fullMark: 100 },
        { subject: 'Geography', value: 85, fullMark: 100 },
        { subject: 'Physics', value: 90, fullMark: 100 },
    ],
    'Exam-1': [
        { subject: 'Math', value: 85, fullMark: 100 },
        { subject: 'Science', value: 82, fullMark: 100 },
        { subject: 'English', value: 88, fullMark: 100 },
        { subject: 'History', value: 75, fullMark: 100 },
        { subject: 'Geography', value: 80, fullMark: 100 },
        { subject: 'Physics', value: 85, fullMark: 100 },
    ],
    'Exam-2': [
        { subject: 'Math', value: 92, fullMark: 100 },
        { subject: 'Science', value: 90, fullMark: 100 },
        { subject: 'English', value: 94, fullMark: 100 },
        { subject: 'History', value: 85, fullMark: 100 },
        { subject: 'Geography', value: 88, fullMark: 100 },
        { subject: 'Physics', value: 94, fullMark: 100 },
    ],
    'Final Exam': [
        { subject: 'Math', value: 98, fullMark: 100 },
        { subject: 'Science', value: 94, fullMark: 100 },
        { subject: 'English', value: 96, fullMark: 100 },
        { subject: 'History', value: 88, fullMark: 100 },
        { subject: 'Geography', value: 92, fullMark: 100 },
        { subject: 'Physics', value: 97, fullMark: 100 },
    ]
};

const AttendanceData = [
    { name: 'Present', value: 92, color: '#10b981' },
    { name: 'Absent', value: 5, color: '#ff4d4f' },
    { name: 'Late', value: 3, color: '#ff9f43' },
];

const classFaculties = [
    { name: 'Mr. Ramesh Kumar', subject: 'Mathematics', role: 'Class Teacher', experience: '12 yrs', avatar: 'RK', color: '#3d5ee1', bg: '#eef1fd', rating: 4.8 },
    { name: 'Ms. Priya Singh', subject: 'Physics', role: 'Subject Teacher', experience: '8 yrs', avatar: 'PS', color: '#10b981', bg: '#ecfdf5', rating: 4.6 },
    { name: 'Mr. Arun Nair', subject: 'Chemistry', role: 'Subject Teacher', experience: '10 yrs', avatar: 'AN', color: '#7367f0', bg: '#efedfd', rating: 4.7 },
    { name: 'Ms. Deepa Patel', subject: 'English', role: 'Subject Teacher', experience: '6 yrs', avatar: 'DP', color: '#ff9f43', bg: '#fff5e6', rating: 4.5 },
    { name: 'Mr. Suresh Raj', subject: 'History', role: 'Subject Teacher', experience: '15 yrs', avatar: 'SR', color: '#ea5455', bg: '#fce8e8', rating: 4.9 },
    { name: 'Ms. Anita Verma', subject: 'Geography', role: 'Subject Teacher', experience: '9 yrs', avatar: 'AV', color: '#00cfe8', bg: '#e0f9fc', rating: 4.4 },
];

const feeDetails = [
    { type: 'Tuition Fee', amount: 8000, dueDate: '10 Mar 2025', status: 'paid', paid: 8000 },
    { type: 'Transport Fee', amount: 3200, dueDate: '10 Mar 2025', status: 'paid', paid: 3200 },
    { type: 'Library Fee', amount: 1500, dueDate: '10 Apr 2025', status: 'pending', paid: 0 },
    { type: 'Sports Fee', amount: 2000, dueDate: '10 Apr 2025', status: 'partial', paid: 1000 },
    { type: 'Exam Fee', amount: 1200, dueDate: '15 Apr 2025', status: 'pending', paid: 0 },
];

const feeChartData = [
    { name: 'Paid', value: 11200, color: '#10b981' },
    { name: 'Pending', value: 4700, color: '#ff4d4f' },
];

// ── Main Component ─────────────────────────────────────────────────────────
const StudentDashboard = () => {
    const [examFilter, setExamFilter] = useState('Overall');
    const [activeTab, setActiveTab] = useState('academics');

    const currentComparison = ComparisonData[examFilter];
    const currentSubjectData = ExamSubjectData[examFilter];

    const kpis = [
        { label: 'OVERALL GRADE', value: examFilter === 'Final Exam' ? 'A++' : 'A+', sub: 'Top 5%', icon: IconTrendingUp, color: '#3d5ee1', bg: '#eef1fd' },
        { label: 'ATTENDANCE', value: '92%', sub: 'Healthy', icon: IconUserCheck, color: '#10b981', bg: '#ecfdf5' },
        { label: 'CLASS RANK', value: '#04', sub: 'In Class 10-A', icon: IconAward, color: '#ff9f43', bg: '#fff5e6' },
        { label: 'CREDITS', value: '1,240', sub: '+120 this month', icon: IconActivity, color: '#7367f0', bg: '#efedfd' },
    ];

    const totalFee = feeDetails.reduce((s, f) => s + f.amount, 0);
    const totalPaid = feeDetails.reduce((s, f) => s + f.paid, 0);
    const totalDue = totalFee - totalPaid;

    return (
        <div className="sad-page">
            <div className="sad-container">

                {/* ── Header ── */}
                <div className="sad-header">
                    <div>
                        <h4 className="sad-title">📊 Student Reports & Analytics</h4>
                        <nav className="sad-breadcrumb">
                            <span>Dashboard</span> / <span className="current">Student Reports & Analytics</span>
                        </nav>
                    </div>
                    <div className="sad-header-actions">
                        <button className="sad-print-btn" onClick={() => window.print()}>
                            <IconPrinter size={16} /> Print Report
                        </button>
                    </div>
                </div>

                {/* ── Student Info Bar ── */}
                <div className="sad-student-bar">
                    <div className="sad-student-left">
                        <div className="sad-avatar">A</div>
                        <div>
                            <h5 className="sad-student-name">{STUDENT_STATIC.name}</h5>
                            <p className="sad-student-meta">
                                Class {STUDENT_STATIC.class} &nbsp;•&nbsp; Roll No: {STUDENT_STATIC.rollNo} &nbsp;•&nbsp; Adm: {STUDENT_STATIC.admissionNo}
                            </p>
                            <p className="sad-student-meta">DOB: {STUDENT_STATIC.dob} &nbsp;•&nbsp; {STUDENT_STATIC.phone}</p>
                        </div>
                    </div>
                    <div className="sad-student-right">
                        <span className="sad-pill scholar">🏆 SCHOLAR BADGE</span>
                        <span className="sad-pill science">🔬 SCIENCE CLUB</span>
                        <span className="sad-pill active">✅ ACTIVE</span>
                    </div>
                </div>

                {/* ── KPI Stats ── */}
                <div className="sad-kpi-grid">
                    {kpis.map((k, i) => (
                        <div key={i} className="sad-kpi-card" style={{ borderTop: `3px solid ${k.color}` }}>
                            <div className="sad-kpi-info">
                                <span className="sad-kpi-label">{k.label}</span>
                                <h3 className="sad-kpi-value" style={{ color: k.color }}>{k.value}</h3>
                                <span className="sad-kpi-sub">{k.sub}</span>
                            </div>
                            <div className="sad-kpi-icon" style={{ background: k.bg, color: k.color }}>
                                <k.icon size={26} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Tabs ── */}
                <div className="sad-tabs-bar">
                    {[
                        { id: 'academics', label: '📚 Academics' },
                        { id: 'attendance', label: '✅ Attendance' },
                        { id: 'faculties', label: '👩‍🏫 Class Faculties' },
                        { id: 'fees', label: '💰 Fee Details' },
                        { id: 'behaviour', label: '⭐ Behaviour' },
                    ].map(t => (
                        <button
                            key={t.id}
                            className={`sad-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(t.id)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ── ACADEMICS TAB ── */}
                {activeTab === 'academics' && (
                    <div>
                        {/* Exam Filter */}
                        <div className="sad-filter-bar">
                            <label className="sad-filter-label">📋 Report View:</label>
                            <select className="sad-filter-select" value={examFilter} onChange={e => setExamFilter(e.target.value)}>
                                <option value="Overall">Overall Performance</option>
                                <option value="Exam-1">Unit Test / Exam-1</option>
                                <option value="Exam-2">Mid-Term / Exam-2</option>
                                <option value="Final Exam">Final Examination</option>
                            </select>
                            <span className="sad-filter-info">Showing <strong>{examFilter}</strong> report</span>
                        </div>

                        <div className="sad-charts-grid">
                            {/* Performance Trend */}
                            <div className="sad-chart-card large">
                                <div className="sad-ch-header">
                                    <h6><IconReportAnalytics size={18} /> Academic Performance Trend</h6>
                                    <div className="sad-legend-row">
                                        <span className="sad-dot blue" /> My Score
                                        <span className="sad-dot gray" /> Class Avg
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={280}>
                                    <AreaChart data={PerformanceTrend}>
                                        <defs>
                                            <linearGradient id="gradScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9b9b9b', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9b9b9b', fontSize: 12 }} domain={[60, 100]} />
                                        <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                                        <Area type="monotone" dataKey="score" stroke="#3d5ee1" strokeWidth={3} fillOpacity={1} fill="url(#gradScore)" name="My Score" />
                                        <Area type="monotone" dataKey="classAvg" stroke="#b0b7c3" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Class Average" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Comparison with Topper */}
                            <div className="sad-chart-card">
                                <div className="sad-ch-header">
                                    <h6><IconChartBar size={18} /> Vs Class Topper</h6>
                                    <span className="sad-badge-sm">{examFilter}</span>
                                </div>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={currentComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                                        <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6e6b7b' }} />
                                        <YAxis hide domain={[0, 110]} />
                                        <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                                        <Bar dataKey="me" fill="#3d5ee1" radius={[4, 4, 0, 0]} name="My Score" barSize={14} />
                                        <Bar dataKey="topper" fill="#10b981" radius={[4, 4, 0, 0]} name="Topper" barSize={14} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Radar */}
                            <div className="sad-chart-card">
                                <div className="sad-ch-header">
                                    <h6><IconChartBar size={18} /> Subject-wise Strength</h6>
                                </div>
                                <ResponsiveContainer width="100%" height={280}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={currentSubjectData}>
                                        <PolarGrid stroke="#f0f2f5" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6e6b7b', fontWeight: 600 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} axisLine={false} tick={false} />
                                        <Radar name="Performance" dataKey="value" stroke="#7367f0" fill="#7367f0" fillOpacity={0.2} strokeWidth={2} />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Achievements */}
                            <div className="sad-chart-card">
                                <div className="sad-ch-header">
                                    <h6><IconCertificate size={18} /> Achievements</h6>
                                </div>
                                <div className="sad-ach-list">
                                    {[
                                        { title: '1st Place – Robotics Competition', date: '12 Feb 2025 • Tech-Fest 2025', icon: '🏆', color: '#ff9f43', bg: '#fff5e6' },
                                        { title: 'Perfect Attendance Award', date: 'Jan 2025 • Monthly Recognition', icon: '🌟', color: '#10b981', bg: '#ecfdf5' },
                                        { title: 'Best Science Project', date: 'Dec 2024 • Annual Exhibition', icon: '🔬', color: '#7367f0', bg: '#efedfd' },
                                    ].map((a, i) => (
                                        <div key={i} className="sad-ach-item">
                                            <div className="sad-ach-icon" style={{ background: a.bg, color: a.color }}>{a.icon}</div>
                                            <div>
                                                <p className="sad-ach-title">{a.title}</p>
                                                <p className="sad-ach-date">{a.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Detail Table */}
                        <div className="sad-table-card">
                            <div className="sad-table-head">
                                <h6>📋 Detailed Test Breakdown ({examFilter})</h6>
                                <button className="sad-export-btn">⬇ Download CSV</button>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="sad-table">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Test / Exam</th>
                                            <th>Obtained</th>
                                            <th>Percentage</th>
                                            <th>Grade</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentSubjectData.map((s, i) => (
                                            <tr key={i}>
                                                <td><strong>{s.subject}</strong></td>
                                                <td style={{ color: '#64748b', fontSize: 13 }}>{examFilter === 'Overall' ? 'Mid Term' : `${examFilter}`}</td>
                                                <td>{s.value} / 100</td>
                                                <td>
                                                    <div className="sad-prog-cell">
                                                        <span>{s.value}%</span>
                                                        <div className="sad-mini-bar">
                                                            <div className="fill" style={{ width: `${s.value}%`, background: s.value >= 90 ? '#10b981' : s.value >= 75 ? '#3d5ee1' : '#ff9f43' }} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><strong style={{ color: s.value >= 90 ? '#3d5ee1' : '#ff9f43' }}>{s.value >= 90 ? 'A+' : s.value >= 80 ? 'A' : 'B'}</strong></td>
                                                <td><span className="sad-pass-badge">Pass</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── ATTENDANCE TAB ── */}
                {activeTab === 'attendance' && (
                    <div className="sad-attend-grid">
                        <div className="sad-chart-card">
                            <div className="sad-ch-header">
                                <h6><IconUserCheck size={18} /> Attendance Breakdown</h6>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ResponsiveContainer width="100%" height={260}>
                                    <PieChart>
                                        <Pie data={AttendanceData} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={4} dataKey="value">
                                            {AttendanceData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip formatter={v => [`${v}%`, '']} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="sad-pie-legend">
                                    {AttendanceData.map((d, i) => (
                                        <div key={i} className="sad-leg-item">
                                            <span className="dot" style={{ background: d.color }} />
                                            <span>{d.name}</span>
                                            <strong>{d.value}%</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="sad-chart-card large">
                            <div className="sad-ch-header">
                                <h6><IconCalendarEvent size={18} /> Monthly Attendance Overview</h6>
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={[
                                    { month: 'Jan', present: 22, absent: 2 },
                                    { month: 'Feb', present: 18, absent: 1 },
                                    { month: 'Mar', present: 24, absent: 0 },
                                    { month: 'Apr', present: 20, absent: 3 },
                                    { month: 'May', present: 21, absent: 2 },
                                    { month: 'Jun', present: 19, absent: 1 },
                                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f5" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6e6b7b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6e6b7b' }} />
                                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                                    <Bar dataKey="present" name="Present" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Bar dataKey="absent" name="Absent" fill="#ff4d4f" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Permissions */}
                        <div className="sad-chart-card" style={{ gridColumn: 'span 3' }}>
                            <div className="sad-ch-header">
                                <h6><IconCalendarEvent size={18} /> Permissions & Out-pass Tracking</h6>
                            </div>
                            <div className="sad-perm-grid">
                                {[
                                    { period: 'This Week', count: 2, limit: 3, color: '#3d5ee1' },
                                    { period: 'This Month', count: 6, limit: 12, color: '#7367f0' },
                                    { period: 'This Year', count: 42, limit: 100, color: '#ff9f43' },
                                ].map((p, i) => (
                                    <div key={i} className="sad-perm-box">
                                        <span className="sad-perm-label" style={{ color: p.color }}>{p.period}</span>
                                        <div className="sad-perm-val">
                                            <h4 style={{ color: '#1e293b' }}>{p.count}</h4>
                                            <span>/ {p.limit} limit</span>
                                        </div>
                                        <div className="sad-perm-bar">
                                            <div style={{ width: `${(p.count / p.limit) * 100}%`, background: p.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── CLASS FACULTIES TAB ── */}
                {activeTab === 'faculties' && (
                    <div>
                        <div className="sad-fac-banner">
                            <div className="sad-fac-banner-info">
                                <IconUsers size={24} />
                                <div>
                                    <h5>Class 10-A Faculty Team</h5>
                                    <p>Meet your dedicated subject teachers for this academic year</p>
                                </div>
                            </div>
                            <div className="sad-fac-banner-stats">
                                <div className="sad-fac-stat"><span>6</span><label>Teachers</label></div>
                                <div className="sad-fac-stat"><span>6</span><label>Subjects</label></div>
                                <div className="sad-fac-stat"><span>4.6★</span><label>Avg Rating</label></div>
                            </div>
                        </div>

                        <div className="sad-fac-grid">
                            {classFaculties.map((f, i) => (
                                <div key={i} className="sad-fac-card">
                                    <div className="sad-fac-top">
                                        <div className="sad-fac-avatar" style={{ background: f.bg, color: f.color }}>
                                            {f.avatar}
                                        </div>
                                        <div className="sad-fac-badge" style={{ background: f.bg, color: f.color }}>
                                            {f.role}
                                        </div>
                                    </div>
                                    <h6 className="sad-fac-name">{f.name}</h6>
                                    <p className="sad-fac-subject" style={{ color: f.color }}>📚 {f.subject}</p>
                                    <div className="sad-fac-meta">
                                        <span>🎓 {f.experience}</span>
                                        <span>⭐ {f.rating}</span>
                                    </div>
                                    <div className="sad-fac-footer" style={{ borderTop: `2px solid ${f.bg}` }}>
                                        <button className="sad-fac-msg-btn" style={{ color: f.color, borderColor: f.bg, background: f.bg }}>
                                            💬 Message
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── FEE DETAILS TAB ── */}
                {activeTab === 'fees' && (
                    <div>
                        {/* Fee KPIs */}
                        <div className="sad-fee-kpi-row">
                            <div className="sad-fee-kpi" style={{ background: 'linear-gradient(135deg, #3d5ee1, #5a7dff)', color: '#fff' }}>
                                <div className="sad-fee-kpi-info">
                                    <span>Total Fee</span>
                                    <h3>₹{totalFee.toLocaleString()}</h3>
                                    <p>Annual Academic Year</p>
                                </div>
                                <div className="sad-fee-kpi-icon">💰</div>
                            </div>
                            <div className="sad-fee-kpi" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', color: '#fff' }}>
                                <div className="sad-fee-kpi-info">
                                    <span>Paid Amount</span>
                                    <h3>₹{totalPaid.toLocaleString()}</h3>
                                    <p>{Math.round(totalPaid / totalFee * 100)}% cleared</p>
                                </div>
                                <div className="sad-fee-kpi-icon">✅</div>
                            </div>
                            <div className="sad-fee-kpi" style={{ background: 'linear-gradient(135deg, #ff4d4f, #ff7875)', color: '#fff' }}>
                                <div className="sad-fee-kpi-info">
                                    <span>Due Amount</span>
                                    <h3>₹{totalDue.toLocaleString()}</h3>
                                    <p>Pending payment</p>
                                </div>
                                <div className="sad-fee-kpi-icon">⚠️</div>
                            </div>
                            <div className="sad-chart-card" style={{ padding: 20 }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>Fee Collection</p>
                                <ResponsiveContainer width="100%" height={120}>
                                    <PieChart>
                                        <Pie data={feeChartData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value">
                                            {feeChartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip formatter={v => [`₹${v.toLocaleString()}`, '']} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="sad-pie-legend" style={{ marginTop: 6 }}>
                                    {feeChartData.map((d, i) => (
                                        <div key={i} className="sad-leg-item" style={{ fontSize: 11 }}>
                                            <span className="dot" style={{ background: d.color }} />
                                            <span>{d.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Fee Table */}
                        <div className="sad-table-card">
                            <div className="sad-table-head">
                                <h6>💳 Fee Breakdown & Payment Status</h6>
                                <button className="sad-export-btn">⬇ Download Receipt</button>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="sad-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Fee Type</th>
                                            <th>Total Amount</th>
                                            <th>Paid</th>
                                            <th>Balance</th>
                                            <th>Due Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feeDetails.map((f, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td><strong>{f.type}</strong></td>
                                                <td>₹{f.amount.toLocaleString()}</td>
                                                <td style={{ color: '#10b981', fontWeight: 700 }}>₹{f.paid.toLocaleString()}</td>
                                                <td style={{ color: '#ff4d4f', fontWeight: 700 }}>₹{(f.amount - f.paid).toLocaleString()}</td>
                                                <td style={{ color: '#64748b', fontSize: 13 }}>{f.dueDate}</td>
                                                <td>
                                                    <span className={`sad-fee-status ${f.status}`}>
                                                        {f.status === 'paid' ? '✅ Paid' : f.status === 'pending' ? '⚠️ Pending' : '🔄 Partial'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Progress bar */}
                            <div className="sad-fee-progress-wrap">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Payment Progress</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>{Math.round(totalPaid / totalFee * 100)}%</span>
                                </div>
                                <div className="sad-fee-progress-bar">
                                    <div style={{ width: `${Math.round(totalPaid / totalFee * 100)}%`, background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── BEHAVIOUR TAB ── */}
                {activeTab === 'behaviour' && (
                    <div className="sad-charts-grid">
                        {/* Behavioural KPIs */}
                        <div className="sad-chart-card large">
                            <div className="sad-ch-header">
                                <h6><IconActivity size={18} /> Behavioural Analytics</h6>
                            </div>
                            <div className="sad-beh-kpis">
                                {[
                                    { label: 'Discipline', val: 95, color: '#3d5ee1' },
                                    { label: 'Participation', val: 85, color: '#10b981' },
                                    { label: 'Punctuality', val: 90, color: '#ff9f43' },
                                    { label: 'Teamwork', val: 88, color: '#7367f0' },
                                ].map((b, i) => (
                                    <div key={i} className="sad-beh-kpi">
                                        <div className="sad-beh-label">
                                            <span>{b.label}</span>
                                            <span style={{ color: b.color, fontWeight: 700 }}>{b.val}%</span>
                                        </div>
                                        <div className="sad-beh-bar">
                                            <div style={{ width: `${b.val}%`, background: b.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="sad-remarks">
                                <div className="sad-remark">
                                    <IconMoodSmile size={20} color="#10b981" />
                                    <div>
                                        <p>"Very proactive in team activities and shows great discipline."</p>
                                        <span>— Mr. Ramesh Kumar (Class Teacher)</span>
                                    </div>
                                </div>
                                <div className="sad-remark">
                                    <IconMoodSmile size={20} color="#3d5ee1" />
                                    <div>
                                        <p>"Excellent academic attitude and consistently submits assignments on time."</p>
                                        <span>— Ms. Priya Singh (Physics)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Complaint Log */}
                        <div className="sad-chart-card">
                            <div className="sad-ch-header">
                                <h6><IconAlertCircle size={18} /> Disciplinary Log</h6>
                            </div>
                            <div className="sad-complaint-list">
                                {[
                                    { date: '22 Feb 2025', category: 'Discipline', reason: 'Uniform violation and late arrival.', decision: 'Verbal warning; parent notified.', status: 'Resolved', priority: 'low' },
                                    { date: '10 Jan 2025', category: 'Academic', reason: 'Incomplete assignments for 3 consecutive days.', decision: 'Remedial classes assigned.', status: 'Closed', priority: 'medium' },
                                ].map((c, i) => (
                                    <div key={i} className={`sad-complaint-item ${c.priority}`}>
                                        <div className="sad-ci-top">
                                            <div>
                                                <span className="sad-ci-date">{c.date}</span>
                                                <span className="sad-ci-tag">{c.category}</span>
                                            </div>
                                            <span className={`sad-ci-status ${c.status.toLowerCase()}`}>{c.status}</span>
                                        </div>
                                        <p className="sad-ci-reason"><strong>Reason:</strong> {c.reason}</p>
                                        <p className="sad-ci-decision"><IconCheck size={14} /> <strong>Decision:</strong> {c.decision}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <footer className="sad-footer">
                    <p>Copyright © 2025 MindWhile. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default StudentDashboard;
