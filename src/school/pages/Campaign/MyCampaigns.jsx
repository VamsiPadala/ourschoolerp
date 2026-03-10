import React, { useState } from 'react';
import {
    IconMapPin, IconCalendarEvent, IconClock, IconUserPlus,
    IconChecks, IconHistory, IconId
} from '@tabler/icons-react';
import '../Dashboard/Dashboard.css';
import '../Dashboard/RolesDashboard.css';

const MY_MOCK_CAMPAIGNS = [
    {
        id: 1,
        title: 'Summer Outreach 2026',
        village: 'Rampur Village',
        location: 'Community Hall',
        date: '2026-03-12',
        time: '10:00 AM - 02:00 PM',
        batch: 'Morning Shift'
    },
    {
        id: 2,
        title: 'Admission Drive Phase 2',
        village: 'Chandipur Area',
        location: 'Local Panchayat',
        date: '2026-03-18',
        time: '02:00 PM - 05:00 PM',
        batch: 'Afternoon Shift'
    }
];

const MyCampaigns = () => {
    const [leads, setLeads] = useState([
        { id: 101, campaignId: 1, studentName: 'Rahul Verma', parents: 'Sunil Verma', phone: '9876543210', class: '6th', remarks: 'Very interested, will visit school tomorrow.' },
        { id: 102, campaignId: 1, studentName: 'Sneha Patel', parents: 'Amit Patel', phone: '7896541230', class: '9th', remarks: 'Needs information about hostel fee.' }
    ]);
    
    const [newLead, setNewLead] = useState({
        campaignId: '',
        studentName: '',
        parents: '',
        phone: '',
        class: '',
        remarks: ''
    });

    const handleAddLead = (e) => {
        e.preventDefault();
        const lead = {
            id: Date.now(),
            ...newLead
        };
        setLeads([...leads, lead]);
        setNewLead({ campaignId: '', studentName: '', parents: '', phone: '', class: '', remarks: '' });
        alert("Lead Added Successfully!");
    };

    return (
        <div className="dashboard-page" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>
            <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4 style={{ margin: 0, fontSize: '24px', color: '#1e293b' }}>🎒 My Campaigns (Staff View)</h4>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>View your assigned locations and collect prospective student information.</p>
                </div>
            </div>

            {/* My Assignments List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                {MY_MOCK_CAMPAIGNS.map((c, i) => (
                    <div key={i} className="dashboard-card" style={{ padding: '24px', borderLeft: i % 2 === 0 ? '4px solid #3d5ee1' : '4px solid #28c76f' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h5 style={{ margin: '0 0 4px', fontSize: '18px', color: '#1e293b' }}>{c.title}</h5>
                                <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#64748b', fontWeight: 'bold' }}>📍 {c.village} ({c.location})</p>
                            </div>
                            <span style={{ background: '#e8faf1', color: '#28c76f', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Active Allocation</span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '20px', marginTop: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                            <div>
                                <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Date & Shift</span>
                                <div style={{ fontSize: '13px', color: '#475569', fontWeight: '600', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <IconCalendarEvent size={16} color="#3d5ee1" /> {c.date} • {c.batch}
                                </div>
                            </div>
                            <div>
                                <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' }}>Timings</span>
                                <div style={{ fontSize: '13px', color: '#475569', fontWeight: '600', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <IconClock size={16} color="#ff9f43" /> {c.time}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                
                {/* Add Lead Form */}
                <div className="dashboard-card" style={{ padding: '24px' }}>
                    <h5 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                        <IconUserPlus size={20} color="#3d5ee1" /> Collect Lead Information
                    </h5>
                    <form onSubmit={handleAddLead}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Select Campaign Assignment</label>
                            <select required value={newLead.campaignId} onChange={e => setNewLead({...newLead, campaignId: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
                                <option value="" disabled>Select Assignment</option>
                                {MY_MOCK_CAMPAIGNS.map(c => <option key={c.id} value={c.id}>{c.village} - {c.date}</option>)}
                            </select>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Student Name</label>
                            <input type="text" required value={newLead.studentName} onChange={e => setNewLead({...newLead, studentName: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="Prospective student name" />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Target Class / Grade</label>
                            <input type="text" required value={newLead.class} onChange={e => setNewLead({...newLead, class: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="e.g. 6th Grade, 9th Class" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Parents/Guardian</label>
                                <input type="text" required value={newLead.parents} onChange={e => setNewLead({...newLead, parents: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="Parent name" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Phone Number</label>
                                <input type="tel" required value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="Mobile number" />
                            </div>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Remarks / Notes</label>
                            <textarea rows="3" required value={newLead.remarks} onChange={e => setNewLead({...newLead, remarks: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'none' }} placeholder="Any important information or observations..." />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '12px', background: '#3d5ee1', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 10px rgba(61, 94, 225, 0.3)' }}>
                            Save Lead Info
                        </button>
                    </form>
                </div>

                {/* Collected Leads List */}
                <div className="dashboard-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h5 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                            <IconChecks size={20} color="#28c76f" /> Leads Collected Today ({leads.length})
                        </h5>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                                    <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Student Details</th>
                                    <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Contact Info</th>
                                    <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Campaign Area</th>
                                    <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((l, idx) => {
                                    const camp = MY_MOCK_CAMPAIGNS.find(c => c.id == l.campaignId);
                                    return (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px' }}>
                                                <strong style={{ display: 'block', color: '#1e293b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}><IconId size={16} color="#3d5ee1"/> {l.studentName}</strong>
                                                <span style={{ background: '#eef1fd', color: '#3d5ee1', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', marginTop: '4px', display: 'inline-block' }}>Class {l.class}</span>
                                            </td>
                                            <td style={{ padding: '16px', color: '#475569', fontSize: '13px' }}>
                                                👨‍👩‍👦 {l.parents}<br/>
                                                📞 {l.phone}
                                            </td>
                                            <td style={{ padding: '16px', color: '#64748b', fontSize: '13px' }}>
                                                {camp?.village || 'Unknown'} <br/>
                                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{camp?.date}</span>
                                            </td>
                                            <td style={{ padding: '16px', color: '#64748b', fontSize: '12px', maxWidth: '200px' }}>
                                                {l.remarks}
                                            </td>
                                        </tr>
                                    )
                                })}
                                {leads.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>You haven't added any leads yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyCampaigns;
