import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import ExportToolbar from './ExportToolbar';
import './Reports.css';

// --- Dummy Data ---
const examTypes = ['Unit Test', 'Slip Test', 'Quarterly', 'Half Yearly', 'Annual'];
const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer', 'Art'];
const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const sections = ['A', 'B', 'C'];

const summaryStats = [
    { label: 'Total Students', value: '1,248', icon: '👨‍🎓', color: '#3d5ee1', bg: '#eef1fd' },
    { label: 'Appeared', value: '1,192', icon: '📝', color: '#7367f0', bg: '#efedfd' },
    { label: 'Passed Students', value: '1,085', icon: '✅', color: '#28c76f', bg: '#e8faf1' },
    { label: 'Failed Students', value: '107', icon: '❌', color: '#ea5455', bg: '#fce8e8' },
    { label: 'Class Average %', value: '78.5%', icon: '📊', color: '#ff9f43', bg: '#fff5e6' },
    { label: 'Highest Marks', value: '98/100', icon: '🏆', color: '#00cfe8', bg: '#e0f9fc' },
    { label: 'Lowest Marks', value: '12/100', icon: '⚠️', color: '#ff6b6b', bg: '#fff0f0' },
];

const passFailData = [
    { name: 'Pass', value: 1085, color: '#28c76f' },
    { name: 'Fail', value: 107, color: '#ea5455' },
];

const marksDistribution = [
    { range: '0-34', count: 107 },
    { range: '35-50', count: 156 },
    { range: '51-70', count: 342 },
    { range: '71-85', count: 412 },
    { range: '86-100', count: 231 },
];

const classComparison = [
    { class: 'I', avg: 82, pass: 95, fail: 5 },
    { class: 'II', avg: 78, pass: 92, fail: 8 },
    { class: 'III', avg: 85, pass: 97, fail: 3 },
    { class: 'IV', avg: 75, pass: 88, fail: 12 },
    { class: 'V', avg: 80, pass: 91, fail: 9 },
    { class: 'VI', avg: 72, pass: 85, fail: 15 },
];

const subjectPerformance = [
    { subject: 'Maths', avg: 75, highest: 100, lowest: 15, passRate: 88 },
    { subject: 'Science', avg: 82, highest: 98, lowest: 22, passRate: 92 },
    { subject: 'English', avg: 88, highest: 96, lowest: 45, passRate: 98 },
    { subject: 'Social', avg: 70, highest: 95, lowest: 10, passRate: 82 },
    { subject: 'Computer', avg: 92, highest: 100, lowest: 60, passRate: 100 },
];

const studentTrend = [
    { exam: 'Unit Test', score: 65 },
    { exam: 'Slip Test', score: 72 },
    { exam: 'Quarterly', score: 68 },
    { exam: 'Half Yearly', score: 85 },
    { exam: 'Annual', score: 92 },
];

const topperList = [
    { rank: 1, name: 'Ananya Sharma', total: 588, max: 600, pct: 98 },
    { rank: 2, name: 'Rahul Bose', total: 576, max: 600, pct: 96 },
    { rank: 3, name: 'Priya Verma', total: 572, max: 600, pct: 95.3 },
    { rank: 4, name: 'Arjun Singh', total: 565, max: 600, pct: 94.2 },
    { rank: 5, name: 'Sara Khan', total: 560, max: 600, pct: 93.3 },
];

const failList = [
    { name: 'Karan Mehta', subject: 'Mathematics', marks: 22, max: 100 },
    { name: 'Sonia Das', subject: 'Social Studies', marks: 18, max: 100 },
    { name: 'Rohan Iyer', subject: 'Science', marks: 31, max: 100 },
    { name: 'Nisha Gupta', subject: 'Mathematics', marks: 28, max: 100 },
];

const multiExamData = [
    { subject: 'Maths', UT: 70, Q: 75, HY: 82, A: 88 },
    { subject: 'Science', UT: 65, Q: 80, HY: 78, A: 85 },
    { subject: 'English', UT: 85, Q: 82, HY: 90, A: 92 },
    { subject: 'Social', UT: 60, Q: 70, HY: 75, A: 80 },
];

const gradeDistribution = [
    { name: 'A+', value: 120, color: '#7367f0' },
    { name: 'A', value: 340, color: '#3d5ee1' },
    { name: 'B', value: 412, color: '#28c76f' },
    { name: 'C', value: 256, color: '#ff9f43' },
    { name: 'D', value: 156, color: '#00cfe8' },
    { name: 'E/F', value: 107, color: '#ea5455' },
];

const genderPerformance = [
    { subject: 'Maths', boys: 72, girls: 78 },
    { subject: 'Science', boys: 80, girls: 84 },
    { subject: 'English', boys: 85, girls: 91 },
    { subject: 'Social', boys: 68, girls: 72 },
    { subject: 'Computer', boys: 90, girls: 94 },
];

const historicalPerformance = [
    { year: '2020-21', avg: 72, pass: 88 },
    { year: '2021-22', avg: 75, pass: 90 },
    { year: '2022-23', avg: 74, pass: 92 },
    { year: '2023-24', avg: 78, pass: 95 },
    { year: '2024-25', avg: 82, pass: 97 },
];

const teacherPerformance = [
    { name: 'Mrs. Sharma', avg: 88, passRate: 98, subject: 'Mathematics' },
    { name: 'Mr. Gupta', avg: 82, passRate: 95, subject: 'Science' },
    { name: 'Ms. Reddy', avg: 91, passRate: 100, subject: 'English' },
    { name: 'Mr. Singh', avg: 75, passRate: 88, subject: 'Social Studies' },
    { name: 'Mrs. Joshi', avg: 85, passRate: 92, subject: 'Computer' },
];

const ExaminationReport = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialTab = queryParams.get('tab') || 'summary';

    const [selectedYear, setSelectedYear] = useState('2024-25');
    const [selectedClass, setSelectedClass] = useState('All');
    const [selectedSection, setSelectedSection] = useState('All');
    const [selectedExam, setSelectedExam] = useState('Annual');
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        const tab = new URLSearchParams(location.search).get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [location.search]);

    const renderSummary = () => (
        <div className="exam-rpt-content">
            <div className="rpt-row rpt-row-2">
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Marks Distribution</h5>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={marksDistribution}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="range" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3d5ee1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Pass vs Fail Ratio</h5>
                    </div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={passFailData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {passFailData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="rpt-pie-legend">
                            {passFailData.map((item, i) => (
                                <div key={i} className="rpt-pie-legend-item">
                                    <span className="rpt-pie-dot" style={{ background: item.color }}></span>
                                    <span>{item.name}: <strong>{item.value}</strong></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="rpt-card" style={{ marginTop: '20px' }}>
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Class-wise Performance Average</h5>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={classComparison}>
                            <defs>
                                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="class" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="avg" stroke="#3d5ee1" fillOpacity={1} fill="url(#colorAvg)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rpt-row rpt-row-2" style={{ marginTop: '20px' }}>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Grade Distribution</h5>
                    </div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={gradeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {gradeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Gender-wise Performance Analysis</h5>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={genderPerformance}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="boys" fill="#3d5ee1" name="Boys Avg" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="girls" fill="#7367f0" name="Girls Avg" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderExamWise = () => {
        const examRows = [
            { name: 'Aarav Sharma', exam: selectedExam, marks: 85, max: 100, pct: 85, result: 'Pass' },
            { name: 'Priya Patel', exam: selectedExam, marks: 42, max: 50, pct: 84, result: 'Pass' },
            { name: 'Rohit Kumar', exam: selectedExam, marks: 15, max: 50, pct: 30, result: 'Fail' },
            { name: 'Sneha Reddy', exam: selectedExam, marks: 95, max: 100, pct: 95, result: 'Pass' },
            { name: 'Karan Mehta', exam: selectedExam, marks: 22, max: 100, pct: 22, result: 'Fail' },
        ];
        const examCols = ['Name', 'Exam', 'Marks', 'Max Marks', 'Percentage', 'Result'];
        const examKeys = ['name', 'exam', 'marks', 'max', 'pct', 'result'];

        return (
            <div className="exam-rpt-content">
                <div className="rpt-table-card">
                    <div className="rpt-table-header">
                        <h5 className="rpt-table-title">{selectedExam} Results - Class {selectedClass}</h5>
                        <ExportToolbar title="Exam-Report" columns={examCols} rows={examRows} rowKeys={examKeys} />
                    </div>
                    <div className="rpt-table-wrap">
                        <table className="rpt-table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Exam</th>
                                    <th>Marks</th>
                                    <th>Max Marks</th>
                                    <th>Percentage</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {examRows.map((row, i) => (
                                    <tr key={i}>
                                        <td><strong>{row.name}</strong></td>
                                        <td>{row.exam}</td>
                                        <td>{row.marks}</td>
                                        <td>{row.max}</td>
                                        <td>{row.pct}%</td>
                                        <td>
                                            <span className={`rpt-badge ${row.result === 'Pass' ? 'rpt-badge-green' : 'rpt-badge-red'}`}>
                                                {row.result}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rpt-row rpt-row-2" style={{ marginTop: '20px' }}>
                    <div className="rpt-card">
                        <div className="rpt-card-header">
                            <h5 className="rpt-card-title">Marks Distribution (Current Selection)</h5>
                        </div>
                        <div className="rpt-chart-body">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={marksDistribution}>
                                    <XAxis dataKey="range" hide />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#7367f0" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="rpt-card">
                        <div className="rpt-card-header">
                            <h5 className="rpt-card-title">Exam Average Trend (Mock)</h5>
                        </div>
                        <div className="rpt-chart-body">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={studentTrend}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="exam" axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="score" stroke="#28c76f" strokeWidth={3} dot={{ r: 6, fill: '#28c76f' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="rpt-card">
                        <div className="rpt-card-header">
                            <h5 className="rpt-card-title">Overall Pass/Fail Ratio</h5>
                        </div>
                        <div className="rpt-chart-body rpt-chart-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={passFailData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                                        {passFailData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderClassWise = () => (
        <div className="exam-rpt-content">
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">Class-wise Performance Comparison</h5>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead>
                            <tr>
                                <th>Class</th>
                                <th>Total Students</th>
                                <th>Pass</th>
                                <th>Fail</th>
                                <th>Average %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classComparison.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>Class {row.class}</strong></td>
                                    <td>120</td>
                                    <td>{row.pass}</td>
                                    <td>{row.fail}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="rpt-bar-wrap" style={{ flex: 1, margin: 0 }}>
                                                <div className="rpt-bar-fill" style={{ width: `${row.avg}%`, background: '#3d5ee1' }}></div>
                                            </div>
                                            <span>{row.avg}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rpt-card" style={{ marginTop: '20px' }}>
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Class-wise Analysis (Pass vs Fail)</h5>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={classComparison}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="class" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pass" fill="#28c76f" name="Passed" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="fail" fill="#ea5455" name="Failed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    const renderSubjectWise = () => (
        <div className="exam-rpt-content">
            <div className="rpt-row rpt-row-2">
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Subject Average Comparison</h5>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={250}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectPerformance}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <Tooltip />
                                <Radar name="Avg %" dataKey="avg" stroke="#3d5ee1" fill="#3d5ee1" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Subject Pass Percentage</h5>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart layout="vertical" data={subjectPerformance}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="passRate" fill="#28c76f" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="rpt-table-card" style={{ marginTop: '20px' }}>
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">Subject Analysis Details</h5>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Average Marks</th>
                                <th>Highest</th>
                                <th>Lowest</th>
                                <th>Pass %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjectPerformance.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.subject}</strong></td>
                                    <td>{row.avg}</td>
                                    <td><span style={{ color: '#28c76f', fontWeight: 'bold' }}>{row.highest}</span></td>
                                    <td><span style={{ color: '#ea5455', fontWeight: 'bold' }}>{row.lowest}</span></td>
                                    <td>
                                        <span className={`rpt-badge ${row.passRate > 90 ? 'rpt-badge-green' : row.passRate > 70 ? 'rpt-badge-blue' : 'rpt-badge-orange'}`}>
                                            {row.passRate}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderStudentProgress = () => (
        <div className="exam-rpt-content">
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Individual Student Progress Trend (Annual View)</h5>
                    <div className="rpt-header-actions">
                        <input className="rpt-select" placeholder="Search Student..." style={{ width: '200px' }} />
                    </div>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={studentTrend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="exam" axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line name="Performance %" type="monotone" dataKey="score" stroke="#7367f0" strokeWidth={4} dot={{ r: 8, fill: '#7367f0' }} activeDot={{ r: 10 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rpt-row rpt-row-2" style={{ marginTop: '20px' }}>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Subject-wise Performance for Selection</h5>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={[
                                { subject: 'Maths', score: 85 },
                                { subject: 'Science', score: 78 },
                                { subject: 'English', score: 92 },
                                { subject: 'Social', score: 70 },
                                { subject: 'Computer', score: 95 }
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="score" fill="#7367f0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Performance Percentile Rank</h5>
                    </div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={[
                                    { name: 'Your Score', value: 85, color: '#28c76f' },
                                    { name: 'Gap to Top', value: 15, color: '#f0f2f7' }
                                ]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                                    <Cell fill="#28c76f" />
                                    <Cell fill="#f0f2f7" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <h3 style={{ margin: 0 }}>85th</h3>
                            <p style={{ color: '#999', fontSize: '12px' }}>Percentile among peers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderToppers = () => (
        <div className="exam-rpt-content">
            <div className="rpt-row rpt-row-2">
                <div className="rpt-table-card">
                    <div className="rpt-table-header">
                        <h5 className="rpt-table-title">🏆 Topper List</h5>
                    </div>
                    <div className="rpt-table-wrap">
                        <table className="rpt-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Student</th>
                                    <th>Total Marks</th>
                                    <th>Pct %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topperList.map((row, i) => (
                                    <tr key={i}>
                                        <td><strong>#{row.rank}</strong></td>
                                        <td>{row.name}</td>
                                        <td>{row.total} / {row.max}</td>
                                        <td><span className="rpt-badge rpt-badge-green">{row.pct}%</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="rpt-table-card">
                    <div className="rpt-table-header">
                        <h5 className="rpt-table-title">🔻 Needs Support (Fail Students)</h5>
                    </div>
                    <div className="rpt-table-wrap">
                        <table className="rpt-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Subject</th>
                                    <th>Marks</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {failList.map((row, i) => (
                                    <tr key={i}>
                                        <td><strong>{row.name}</strong></td>
                                        <td>{row.subject}</td>
                                        <td>{row.marks} / {row.max}</td>
                                        <td><span className="rpt-badge rpt-badge-red">Fail</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="rpt-row rpt-row-2" style={{ marginTop: '20px' }}>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Top 5 Performers (Marks)</h5>
                    </div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={topperList} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#f0f0f0" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
                                <Tooltip />
                                <Bar dataKey="total" fill="#3d5ee1" radius={[0, 4, 4, 0]} label={{ position: 'right' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Pass vs Fail Distribution</h5>
                    </div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={passFailData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {passFailData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMultiExam = () => (
        <div className="exam-rpt-content">
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Multi-Exam Subject Comparison Trend</h5>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={multiExamData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="UT" name="Unit Test" stroke="#3d5ee1" strokeWidth={2} />
                            <Line type="monotone" dataKey="Q" name="Quarterly" stroke="#28c76f" strokeWidth={2} />
                            <Line type="monotone" dataKey="HY" name="Half Yearly" stroke="#ff9f43" strokeWidth={2} />
                            <Line type="monotone" dataKey="A" name="Annual" stroke="#ea5455" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rpt-card" style={{ marginTop: '20px' }}>
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Overall Performance Average by Exam Type</h5>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                            { name: 'Unit Test', avg: 72 },
                            { name: 'Quarterly', avg: 78 },
                            { name: 'Half Yearly', avg: 75 },
                            { name: 'Annual', avg: 82 }
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="avg" radius={[4, 4, 0, 0]}>
                                <Cell fill="#3d5ee1" />
                                <Cell fill="#28c76f" />
                                <Cell fill="#ff9f43" />
                                <Cell fill="#ea5455" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    const renderTeacherAnalytics = () => (
        <div className="exam-rpt-content">
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Teacher Performance (Avg Score %)</h5>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={teacherPerformance} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="#f0f0f0" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
                            <Tooltip />
                            <Bar dataKey="avg" fill="#3d5ee1" radius={[0, 4, 4, 0]} label={{ position: 'right', formatter: (v) => `${v}%` }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rpt-card" style={{ marginTop: '20px' }}>
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Subject-wise Pass Rates by Teacher</h5>
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead>
                            <tr>
                                <th>Teacher Name</th>
                                <th>Subject</th>
                                <th>Avg Marks</th>
                                <th>Pass Rate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherPerformance.map((t, i) => (
                                <tr key={i}>
                                    <td><strong>{t.name}</strong></td>
                                    <td>{t.subject}</td>
                                    <td>{t.avg}%</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className="rpt-bar-wrap" style={{ width: '60px' }}>
                                                <div className="rpt-bar-fill" style={{ width: `${t.passRate}%`, background: '#28c76f' }} />
                                            </div>
                                            <span>{t.passRate}%</span>
                                        </div>
                                    </td>
                                    <td><button className="rpt-btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>View Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderSchoolOverview = () => (
        <div className="exam-rpt-content">
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Year-over-Year Performance Trend</h5>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={historicalPerformance}>
                            <defs>
                                <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7367f0" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#7367f0" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="avg" stroke="#7367f0" fillOpacity={1} fill="url(#colorTrend)" name="School Avg %" />
                            <Area type="monotone" dataKey="pass" stroke="#28c76f" fill="none" name="Pass Rate %" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rpt-row rpt-row-2" style={{ marginTop: '20px' }}>
                <div className="rpt-card">
                    <div className="rpt-card-header">
                        <h5 className="rpt-card-title">Exam Type Popularity</h5>
                    </div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={[
                                    { name: 'Regular Exams', value: 65, color: '#3d5ee1' },
                                    { name: 'Quizzes', value: 15, color: '#28c76f' },
                                    { name: 'Comp. Tests', value: 20, color: '#ff9f43' }
                                ]} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                                    {[
                                        { name: 'Regular Exams', value: 65, color: '#3d5ee1' },
                                        { name: 'Quizzes', value: 15, color: '#28c76f' },
                                        { name: 'Comp. Tests', value: 20, color: '#ff9f43' }
                                    ].map((entry, index) => (
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
                        <h5 className="rpt-card-title">Growth Analytics</h5>
                    </div>
                    <div className="rpt-chart-body" style={{ padding: '20px' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span style={{ fontSize: '13px', color: '#6e6b7b' }}>Enrollment Growth</span>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#28c76f' }}>+12%</span>
                            </div>
                            <div className="rpt-bar-wrap"><div className="rpt-bar-fill" style={{ width: '85%', background: '#28c76f' }} /></div>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span style={{ fontSize: '13px', color: '#6e6b7b' }}>Academic Progress</span>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#3d5ee1' }}>+8%</span>
                            </div>
                            <div className="rpt-bar-wrap"><div className="rpt-bar-fill" style={{ width: '70%', background: '#3d5ee1' }} /></div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <span style={{ fontSize: '13px', color: '#6e6b7b' }}>Faculty Efficiency</span>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ff9f43' }}>+5%</span>
                            </div>
                            <div className="rpt-bar-wrap"><div className="rpt-bar-fill" style={{ width: '60%', background: '#ff9f43' }} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="rpt-report-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Examination Dashboard</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link> /&nbsp;
                        <Link to="/school/reports">Reports &amp; Analytics</Link> /&nbsp;
                        <span className="rpt-breadcrumb-current">Examination Dashboard</span>
                    </nav>
                </div>
                <div className="rpt-header-actions">
                    <button className="rpt-export-btn">⬇️ Export Report</button>
                </div>
            </div>

            {/* Main Navigation Tabs */}
            <div className="rpt-filter-card" style={{ padding: '15px 20px' }}>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {[
                        { id: 'summary', label: '📊 Dashboard Summary', desc: 'Overall Stats' },
                        { id: 'examwise', label: '📄 Exam Wise Report', desc: 'Detailed Performance' },
                        { id: 'classwise', label: '🏫 Class Comparison', desc: 'Benchmarking' },
                        { id: 'subjectwise', label: '🧪 Subject Analysis', desc: 'Difficulty Index' },
                        { id: 'progress', label: '📈 Student Progress', desc: 'Tracking Trends' },
                        { id: 'toppers', label: '🏆 Toppers & Fails', desc: 'Support & Rewards' },
                        { id: 'multi', label: '🔄 Multi Exam Comp', desc: 'Cross Analysis' },
                        { id: 'teacher', label: '👩‍🏫 Teacher Analytics', desc: 'Faculty Performance' },
                        { id: 'school', label: '🏢 School Overview', desc: 'High-level Trends' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '10px 18px',
                                border: activeTab === tab.id ? 'none' : '1px solid #eef0f4',
                                background: activeTab === tab.id ? '#3d5ee1' : '#fff',
                                color: activeTab === tab.id ? '#fff' : '#6e6b7b',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                transition: '0.2s',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(61, 94, 225, 0.2)' : 'none',
                                fontWeight: activeTab === tab.id ? '700' : '600',
                                fontSize: '13.5px'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Global Filters */}
            <div className="rpt-filter-card">
                <div className="rpt-filter-grid">
                    <div className="rpt-filter-group">
                        <label>Academic Year</label>
                        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                            <option>2024-25</option>
                            <option>2023-24</option>
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Class</label>
                        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                            <option>All</option>
                            {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Section</label>
                        <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
                            <option>All</option>
                            {sections.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Exam Type</label>
                        <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)}>
                            {examTypes.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Subject</label>
                        <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
                            <option>All</option>
                            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Marks Range</label>
                        <select>
                            <option>All</option>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="rpt-kpi-grid">
                {summaryStats.map((kpi, i) => (
                    <div key={i} className="rpt-kpi-card" style={{ padding: '15px' }}>
                        <div className="rpt-kpi-icon" style={{ background: kpi.bg, color: kpi.color, width: '40px', height: '40px', fontSize: '18px' }}>
                            <span>{kpi.icon}</span>
                        </div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label" style={{ fontSize: '11px', marginBottom: '2px' }}>{kpi.label}</p>
                            <h3 className="rpt-kpi-value" style={{ fontSize: '1.1rem' }}>{kpi.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div style={{ width: '100%' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'summary' && renderSummary()}
                        {activeTab === 'examwise' && renderExamWise()}
                        {activeTab === 'classwise' && renderClassWise()}
                        {activeTab === 'subjectwise' && renderSubjectWise()}
                        {activeTab === 'progress' && renderStudentProgress()}
                        {activeTab === 'toppers' && renderToppers()}
                        {activeTab === 'multi' && renderMultiExam()}
                        {activeTab === 'teacher' && renderTeacherAnalytics()}
                        {activeTab === 'school' && renderSchoolOverview()}
                        {/* Default fallback */}
                        {!['summary', 'examwise', 'classwise', 'subjectwise', 'progress', 'toppers', 'multi', 'teacher', 'school'].includes(activeTab) && renderSummary()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <footer className="rpt-footer">
                <p>© 2025 MindWhile School ERP • Examination Management System</p>
            </footer>
        </div>
    );
};

export default ExaminationReport;
