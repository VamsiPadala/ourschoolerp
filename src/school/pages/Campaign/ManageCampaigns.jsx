import React, { useState } from 'react';
import {
    IconMapPin, IconUsers, IconCalendarEvent, IconClock,
    IconClipboardList, IconTarget, IconUserCheck, IconFilter
} from '@tabler/icons-react';
import '../Dashboard/Dashboard.css';
import '../Dashboard/RolesDashboard.css';

const MOCK_FACULTY = [
    { id: 1, name: 'Mr. Ramesh Kumar' },
    { id: 2, name: 'Ms. Priya Singh' },
    { id: 3, name: 'Mr. Arun Nair' }
];

const MOCK_CAMPAIGNS = [
    {
        id: 1,
        title: 'Summer Outreach 2026',
        village: 'Rampur Village',
        location: 'Community Hall',
        facultyId: 1,
        facultyName: 'Mr. Ramesh Kumar',
        date: '2026-03-12',
        time: '10:00 AM - 02:00 PM',
        batch: 'Morning Shift',
        leadsCollected: 24,
        status: 'Active'
    },
    {
        id: 2,
        title: 'Scholarship Drive',
        village: 'Sitapur',
        location: 'Main Square',
        facultyId: 2,
        facultyName: 'Ms. Priya Singh',
        date: '2026-03-15',
        time: '03:00 PM - 06:00 PM',
        batch: 'Evening Shift',
        leadsCollected: 15,
        status: 'Upcoming'
    }
];

const MOCK_LEADS = [
    { id: 101, campaignId: 1, studentName: 'Rahul Verma', parents: 'Sunil Verma', phone: '9876543210', class: '6th', interested: true },
    { id: 102, campaignId: 1, studentName: 'Sneha Patel', parents: 'Amit Patel', phone: '7896541230', class: '9th', interested: false },
    { id: 103, campaignId: 2, studentName: 'Vikas Singh', parents: 'Anil Singh', phone: '9988776655', class: '11th', interested: true },
];

const ManageCampaigns = () => {
    const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
    const [selectedFaculty, setSelectedFaculty] = useState('All');
    
    const [newCampaign, setNewCampaign] = useState({
        title: '',
        village: '',
        location: '',
        facultyId: '',
        date: '',
        time: '',
        batch: ''
    });

    const handleCreateCampaign = (e) => {
        e.preventDefault();
        const faculty = MOCK_FACULTY.find(f => f.id == newCampaign.facultyId);
        const campaign = {
            id: Date.now(),
            ...newCampaign,
            facultyName: faculty ? faculty.name : 'Unknown',
            leadsCollected: 0,
            status: 'Upcoming'
        };
        setCampaigns([...campaigns, campaign]);
        setNewCampaign({ title: '', village: '', location: '', facultyId: '', date: '', time: '', batch: '' });
        alert("Campaign Allocated Successfully!");
    };

    const filteredCampaigns = selectedFaculty === 'All' 
        ? campaigns 
        : campaigns.filter(c => c.facultyId == selectedFaculty);

    return (
        <div className="dashboard-page" style={{ padding: '24px', background: '#f8fafc', minHeight: '100vh' }}>
            <div className="page-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4 style={{ margin: 0, fontSize: '24px', color: '#1e293b' }}>📢 Campaign Management (Admin)</h4>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Assign staff to locations and track collected prospective student data.</p>
                </div>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
                <div className="dashboard-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '15px', borderRadius: '12px', background: '#eef1fd', color: '#3d5ee1' }}><IconTarget size={28} /></div>
                    <div>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: 'bold' }}>TOTAL CAMPAIGNS</p>
                        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '24px' }}>{campaigns.length}</h3>
                    </div>
                </div>
                <div className="dashboard-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '15px', borderRadius: '12px', background: '#e8faf1', color: '#28c76f' }}><IconMapPin size={28} /></div>
                    <div>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: 'bold' }}>VILLAGES COVERED</p>
                        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '24px' }}>{new Set(campaigns.map(c => c.village)).size}</h3>
                    </div>
                </div>
                <div className="dashboard-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '15px', borderRadius: '12px', background: '#fff5e6', color: '#ff9f43' }}><IconUsers size={28} /></div>
                    <div>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: 'bold' }}>ACTIVE STAFF</p>
                        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '24px' }}>{new Set(campaigns.map(c => c.facultyId)).size}</h3>
                    </div>
                </div>
                <div className="dashboard-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '15px', borderRadius: '12px', background: '#efedfd', color: '#7367f0' }}><IconClipboardList size={28} /></div>
                    <div>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: 'bold' }}>LEADS GENERATED</p>
                        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '24px' }}>
                            {campaigns.reduce((sum, c) => sum + c.leadsCollected, 0)}
                        </h3>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
                {/* Create Allocation Form */}
                <div className="dashboard-card" style={{ padding: '24px' }}>
                    <h5 style={{ marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                        <IconMapPin size={20} color="#3d5ee1" /> Assign New Location
                    </h5>
                    <form onSubmit={handleCreateCampaign}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Campaign Title</label>
                            <input type="text" required value={newCampaign.title} onChange={e => setNewCampaign({...newCampaign, title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="e.g. Summer Outreach" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Village name / Area</label>
                                <input type="text" required value={newCampaign.village} onChange={e => setNewCampaign({...newCampaign, village: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="Village name" />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Location Details</label>
                                <input type="text" required value={newCampaign.location} onChange={e => setNewCampaign({...newCampaign, location: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="e.g. Gram Panchayat" />
                            </div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Assign To Staff / Faculty</label>
                            <select required value={newCampaign.facultyId} onChange={e => setNewCampaign({...newCampaign, facultyId: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
                                <option value="" disabled>Select Staff</option>
                                {MOCK_FACULTY.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Date</label>
                                <input type="date" required value={newCampaign.date} onChange={e => setNewCampaign({...newCampaign, date: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Batch / Shift</label>
                                <select required value={newCampaign.batch} onChange={e => setNewCampaign({...newCampaign, batch: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>
                                    <option value="" disabled>Select Shift</option>
                                    <option value="Morning Shift">Morning Shift</option>
                                    <option value="Afternoon Shift">Afternoon Shift</option>
                                    <option value="Evening Shift">Evening Shift</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>Time Scale</label>
                            <input type="text" required value={newCampaign.time} onChange={e => setNewCampaign({...newCampaign, time: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} placeholder="e.g. 10:00 AM - 02:00 PM" />
                        </div>
                        <button type="submit" style={{ width: '100%', padding: '12px', background: '#3d5ee1', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 10px rgba(61, 94, 225, 0.3)' }}>
                            Confirm Allocation
                        </button>
                    </form>
                </div>

                {/* List and Lead viewer */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="dashboard-card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h5 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                                <IconClipboardList size={20} color="#28c76f" /> Assigned Campaigns & Targets
                            </h5>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <IconFilter size={16} color="#64748b" />
                                <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}>
                                    <option value="All">All Staff Members</option>
                                    {MOCK_FACULTY.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Campaign Details</th>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Staff Assigned</th>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Schedule</th>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Leads Collected</th>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCampaigns.map((c, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px' }}>
                                                <strong style={{ display: 'block', color: '#1e293b', fontSize: '14px' }}>{c.title}</strong>
                                                <span style={{ color: '#64748b', fontSize: '12px' }}>📍 {c.village} ({c.location})</span>
                                            </td>
                                            <td style={{ padding: '16px', color: '#475569', fontSize: '14px', fontWeight: '600' }}>
                                                🧑‍🏫 {c.facultyName}
                                            </td>
                                            <td style={{ padding: '16px', color: '#64748b', fontSize: '13px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}><IconCalendarEvent size={14}/> {c.date}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><IconClock size={14}/> {c.time}</div>
                                                <div style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>{c.batch}</div>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{ background: '#e8faf1', color: '#28c76f', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>{c.leadsCollected} Leads</span>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{ fontSize: '12px', fontWeight: '700', color: c.status === 'Active' ? '#3d5ee1' : '#ff9f43' }}>
                                                    {c.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCampaigns.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No campaigns assigned to this staff.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="dashboard-card" style={{ padding: '24px' }}>
                        <h5 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                            <IconUserCheck size={20} color="#ff9f43" /> Lead Data Overview
                        </h5>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Prospective Student</th>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Parents</th>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Contact</th>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Target Class</th>
                                        <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>Campaign Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_LEADS.filter(l => selectedFaculty === 'All' || campaigns.find(c => c.id === l.campaignId)?.facultyId == selectedFaculty).map((l, idx) => {
                                        const camp = campaigns.find(c => c.id === l.campaignId);
                                        return (
                                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '16px', color: '#1e293b', fontWeight: '600', fontSize: '14px' }}>{l.studentName}</td>
                                                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{l.parents}</td>
                                                <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>📞 {l.phone}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <span style={{ background: '#eef1fd', color: '#3d5ee1', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>Class {l.class}</span>
                                                </td>
                                                <td style={{ padding: '16px', fontSize: '12px', color: '#64748b' }}>
                                                    {camp?.village} <br/> (By {camp?.facultyName})
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManageCampaigns;
