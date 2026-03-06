import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Calendar, Clock, Filter, FileText } from 'lucide-react';
import ExportToolbar from './ExportToolbar';
import './Reports.css';

const ExamScheduleReport = () => {
    const [selectedExam, setSelectedExam] = useState('Annual Examination 2024');

    const scheduleData = [
        { id: 1, date: '2026-03-01', day: 'Monday', subject: 'Mathematics', time: '09:00 AM - 12:00 PM', room: 'Hall A', session: 'Morning' },
        { id: 2, date: '2026-03-03', day: 'Wednesday', subject: 'Science', time: '09:00 AM - 12:00 PM', room: 'Hall B', session: 'Morning' },
        { id: 3, date: '2026-03-05', day: 'Friday', subject: 'English', time: '01:00 PM - 04:00 PM', room: 'Room 102', session: 'Afternoon' },
        { id: 4, date: '2026-03-08', day: 'Monday', subject: 'Social Studies', time: '09:00 AM - 12:00 PM', room: 'Hall A', session: 'Morning' },
        { id: 5, date: '2026-03-10', day: 'Wednesday', subject: 'Hindi', time: '01:00 PM - 04:00 PM', room: 'Room 105', session: 'Afternoon' },
        { id: 6, date: '2026-03-12', day: 'Friday', subject: 'Computer Science', time: '09:00 AM - 12:00 PM', room: 'Lab 1', session: 'Morning' },
    ];

    const sessionData = [
        { name: 'Morning', value: 4, color: '#3d5ee1' },
        { name: 'Afternoon', value: 2, color: '#ff9f43' }
    ];

    const subjectExamCounts = [
        { subject: 'Math', exams: 12 },
        { subject: 'Science', exams: 10 },
        { subject: 'English', exams: 15 },
        { subject: 'Hindi', exams: 8 },
        { subject: 'Computer', exams: 14 }
    ];

    return (
        <div className="rpt-report-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">📝 Exam Schedule Report</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link> /&nbsp;
                        <Link to="/school/reports">Reports</Link> /&nbsp;
                        <span className="rpt-breadcrumb-current">Exam Schedule</span>
                    </nav>
                </div>
                <div className="rpt-header-actions">
                    <button className="rpt-export-btn">⬇️ Download Timetable</button>
                </div>
            </div>

            {/* Graphs Box */}
            <div className="rpt-row rpt-row-2" style={{ marginBottom: '20px' }}>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Session Distribution</h5>
                    </div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie data={sessionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                                    {sessionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Exams per Subject (Overall)</h5>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={subjectExamCounts}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="exams" fill="#7367f0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="rpt-filter-card">
                <div className="rpt-filter-grid" style={{ gridTemplateColumns: '1.5fr 1fr 1fr auto' }}>
                    <div className="rpt-filter-group">
                        <label>Exam Type</label>
                        <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)}>
                            <option>Annual Examination 2024</option>
                            <option>Half Yearly 2023</option>
                            <option>Quarterly 2023</option>
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Class</label>
                        <select>
                            <option>All Classes</option>
                            <option>Class X</option>
                            <option>Class IX</option>
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Section</label>
                        <select>
                            <option>All Sections</option>
                            <option>A</option>
                            <option>B</option>
                        </select>
                    </div>
                    <div className="rpt-filter-group" style={{ alignSelf: 'flex-end' }}>
                        <button className="rpt-search-btn">🔍 Filter Schedule</button>
                    </div>
                </div>
            </div>

            {/* Timetable Table */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">{selectedExam} - Timetable</h5>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead>
                            <tr>
                                <th>Date & Day</th>
                                <th>Subject</th>
                                <th>Time Slot</th>
                                <th>Session</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleData.map(row => (
                                <tr key={row.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={14} style={{ color: '#3d5ee1' }} />
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{row.date}</div>
                                                <div style={{ fontSize: '11px', color: '#999' }}>{row.day}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><strong>{row.subject}</strong></td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Clock size={14} style={{ color: '#6e6b7b' }} />
                                            {row.time}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`rpt-badge ${row.session === 'Morning' ? 'rpt-badge-blue' : 'rpt-badge-orange'}`}>
                                            {row.session}
                                        </span>
                                    </td>
                                    <td>{row.room}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExamScheduleReport;
