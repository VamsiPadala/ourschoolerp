import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ExportToolbar from './ExportToolbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './Reports.css';

const STU_COLUMNS = ['#', 'Adm No', 'Name', 'Class', 'Section', 'DOB', 'Gender', 'Category', 'Mobile', 'Status'];
const STU_KEYS = ['sno', 'admNo', 'name', 'class', 'section', 'dob', 'gender', 'category', 'mobile', 'status'];

/* ─── Dummy student data ─────────────────────────────────────── */
const generateStudents = (count = 40) => {
    const names = ['Aarav Sharma', 'Priya Patel', 'Rohit Kumar', 'Sneha Reddy', 'Karan Mehta',
        'Divya Singh', 'Arjun Nair', 'Pooja Iyer', 'Raj Verma', 'Ananya Das',
        'Vikram Joshi', 'Meera Pillai', 'Saurabh Gupta', 'Nisha Rao', 'Arun Bose'];
    const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const sections = ['A', 'B', 'C'];
    return Array.from({ length: count }, (_, i) => ({
        sno: i + 1,
        admNo: `2024/${String(1001 + i).padStart(4, '0')}`,
        name: names[i % names.length],
        class: classes[i % classes.length],
        section: sections[i % sections.length],
        dob: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/${2010 + (i % 8)}`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        category: ['General', 'OBC', 'SC', 'ST'][i % 4],
        mobile: `+91 ${9000000000 + i}`,
        status: i % 7 === 0 ? 'Inactive' : 'Active',
    }));
};

const students = generateStudents(40);

const StudentReport = () => {
    const [filterClass, setFilterClass] = useState('');
    const [filterSection, setFilterSection] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 10;

    const filtered = students.filter(s =>
        (!filterClass || s.class === filterClass) &&
        (!filterSection || s.section === filterSection) &&
        (!filterGender || s.gender === filterGender) &&
        (!searchText || s.name.toLowerCase().includes(searchText.toLowerCase()) || s.admNo.includes(searchText))
    );

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((page - 1) * perPage, page * perPage);

    /* ── Chart Totals ── */
    const genderData = [
        { name: 'Male', value: filtered.filter(s => s.gender === 'Male').length, color: '#3d5ee1' },
        { name: 'Female', value: filtered.filter(s => s.gender === 'Female').length, color: '#ff78b1' }
    ];

    const categoryData = ['General', 'OBC', 'SC', 'ST'].map((cat, i) => ({
        name: cat,
        value: filtered.filter(s => s.category === cat).length,
        color: ['#3d5ee1', '#28c76f', '#ff9f43', '#ea5455'][i]
    }));

    const classCounts = useMemo(() => {
        const counts = {};
        filtered.forEach(s => { counts[s.class] = (counts[s.class] || 0) + 1; });
        return Object.keys(counts).sort((a, b) => {
            const order = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
            return order.indexOf(a) - order.indexOf(b);
        }).map(k => ({ class: k, count: counts[k] }));
    }, [filtered]);

    return (
        <div className="rpt-report-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">👨‍🎓 Student Report</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link> /&nbsp;
                        <Link to="/school/reports">Reports &amp; Analytics</Link> /&nbsp;
                        <span className="rpt-breadcrumb-current">Student Report</span>
                    </nav>
                </div>
            </div>

            {/* Student Analytics Row */}
            <div className="rpt-row rpt-row-3" style={{ marginBottom: '20px' }}>
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Gender Distribution</h5></div>
                    <div className="rpt-chart-body rpt-chart-center">
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie data={genderData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
                                    {genderData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Category-wise Summary</h5></div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={categoryData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                <Tooltip />
                                <Bar dataKey="value" name="Students" radius={[0, 4, 4, 0]}>
                                    {categoryData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="rpt-card">
                    <div className="rpt-card-header"><h5 className="rpt-card-title">Students by Class</h5></div>
                    <div className="rpt-chart-body">
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={classCounts}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="class" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#7367f0" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="rpt-filter-card">
                <h6 className="rpt-filter-title">🔍 Select Criteria</h6>
                <div className="rpt-filter-grid">
                    <div className="rpt-filter-group">
                        <label>Class</label>
                        <select value={filterClass} onChange={e => { setFilterClass(e.target.value); setPage(1); }}>
                            <option value="">All Classes</option>
                            {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'].map(c =>
                                <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Section</label>
                        <select value={filterSection} onChange={e => { setFilterSection(e.target.value); setPage(1); }}>
                            <option value="">All Sections</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Gender</label>
                        <select value={filterGender} onChange={e => { setFilterGender(e.target.value); setPage(1); }}>
                            <option value="">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Search</label>
                        <input placeholder="Name / Adm No" value={searchText} onChange={e => { setSearchText(e.target.value); setPage(1); }} />
                    </div>
                    <div className="rpt-filter-group">
                        <label>&nbsp;</label>
                        <button className="rpt-search-btn" onClick={() => setPage(1)}>🔍 Search</button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">Student Report ({filtered.length} records)</h5>
                    <ExportToolbar columns={STU_COLUMNS} rows={filtered} rowKeys={STU_KEYS} title="Student-Report" />
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Adm No</th>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Category</th>
                                <th>Mobile</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map(s => (
                                <tr key={s.sno}>
                                    <td>{s.sno}</td>
                                    <td><strong>{s.admNo}</strong></td>
                                    <td>{s.name}</td>
                                    <td>{s.class}</td>
                                    <td>{s.section}</td>
                                    <td>{s.dob}</td>
                                    <td>{s.gender}</td>
                                    <td>{s.category}</td>
                                    <td>{s.mobile}</td>
                                    <td>
                                        <span className={`rpt-badge ${s.status === 'Active' ? 'rpt-badge-green' : 'rpt-badge-red'}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {paged.length === 0 && (
                                <tr><td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: '#aaa' }}>No records found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="rpt-table-footer">
                    <span>Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
                    <div className="rpt-pagination">
                        <button className="rpt-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).filter(n => Math.abs(n - page) <= 2).map(n => (
                            <button key={n} className={`rpt-page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                        ))}
                        <button className="rpt-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentReport;
