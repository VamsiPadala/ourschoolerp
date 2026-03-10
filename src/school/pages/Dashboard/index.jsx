import React from 'react';
import StatCard, { statsData } from './components/StatCard';
import WelcomeBanner from './components/WelcomeBanner';
import ScheduleCalendar from './components/ScheduleCalendar';
import AttendanceChart from './components/AttendanceChart';
import BestPerformer from './components/BestPerformer';
import StarStudents from './components/StarStudents';
import FeesCollectionChart from './components/FeesCollectionChart';
import PerformanceChart from './components/PerformanceChart';
import FinanceCards from './components/FinanceCards';
import NoticeBoard from './components/NoticeBoard';
import FeeStats from './components/FeeStats';
import TopSubjects from './components/TopSubjects';
import StudentActivity from './components/StudentActivity';
import TodoList from './components/TodoList';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Admin Dashboard</h4>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span className="current">Admin Dashboard</span>
                    </nav>
                </div>

            </div>

            {/* Row 1: Welcome Banner */}
            <div className="dashboard-row">
                <WelcomeBanner />
            </div>

            {/* Row 2: Stat Cards */}
            <div className="dashboard-row stats-row">
                {statsData.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Row 3: Attendance – all three pie charts full-width */}
            <div className="dashboard-row">
                <AttendanceChart />
            </div>

            {/* Row 4: Fees Collection | Performance | Top Subjects */}
            <div className="dashboard-row pie-row-three">
                <div className="dash-cell"><FeesCollectionChart /></div>
                <div className="dash-cell"><PerformanceChart /></div>
                <div className="dash-cell"><TopSubjects /></div>
            </div>

            {/* Row 5: Finance | Notice Board | Fee Stats */}
            <div className="dashboard-row pie-row-three">
                <div className="dash-cell"><FinanceCards /></div>
                <div className="dash-cell"><NoticeBoard /></div>
                <div className="dash-cell"><FeeStats /></div>
            </div>

            {/* Row 6: Best Performer | Star Student | Student Activity | Todo */}
            <div className="dashboard-row bottom-row">
                <div className="dash-cell"><BestPerformer /></div>
                <div className="dash-cell"><StarStudents /></div>
                <div className="dash-cell"><StudentActivity /></div>
                <div className="dash-cell"><TodoList /></div>
            </div>

            {/* Row 7: Schedule Calendar – full width at the bottom */}
            <div className="dashboard-row">
                <ScheduleCalendar />
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>Copyright © 2024 MindWhile. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
