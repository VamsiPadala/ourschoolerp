import React, { useState } from 'react';
import { ScheduleContext } from './ScheduleContextDefinition';

export { ScheduleContext };

export const ScheduleProvider = ({ children }) => {
    const [schedules, setSchedules] = useState([
        { id: 1, exam: 'FA-1', class: '10th class', section: 'A', subject: 'Mathematics', date: '2025-06-08', timeFrom: '09:00', timeTo: '12:00', roomNo: '101' },
        { id: 2, exam: 'FA-1', class: '10th class', section: 'A', subject: 'Science', date: '2025-06-09', timeFrom: '09:00', timeTo: '12:00', roomNo: '102' },
        { id: 3, exam: 'SA-1', class: '9th class', section: 'B', subject: 'English', date: '2025-06-15', timeFrom: '10:00', timeTo: '01:00', roomNo: '203' },
        { id: 4, exam: 'FA-2', class: '1st class', section: 'C', subject: 'English', date: '2025-07-10', timeFrom: '08:00', timeTo: '11:00', roomNo: '403' },
        { id: 5, exam: 'SA-2', class: '2nd class', section: 'A', subject: 'Hindi', date: '2025-08-12', timeFrom: '09:00', timeTo: '12:00', roomNo: '205' },
        { id: 6, exam: 'FA-1', class: '3rd class', section: 'B', subject: 'Science', date: '2025-09-21', timeFrom: '10:00', timeTo: '01:00', roomNo: '106' },
    ]);

    // Schedule templates (exam + subject rows, without class/section)
    const [scheduleTemplates, setScheduleTemplates] = useState([]);

    // Assignment mappings: { id, scheduleId, class_id, section_id }
    const [assignments, setAssignments] = useState([]);

    const addSchedule = (newSchedule) => {
        setSchedules(prev => [...prev, newSchedule]);
    };

    const updateSchedule = (id, updatedSchedule) => {
        setSchedules(prev => prev.map(item => item.id === id ? updatedSchedule : item));
    };

    const deleteSchedule = (id) => {
        setSchedules(prev => prev.filter(item => item.id !== id));
    };

    const addScheduleTemplate = (template) => {
        const newTemplate = { ...template, id: Date.now() };
        setScheduleTemplates(prev => [...prev, newTemplate]);
        return newTemplate.id;
    };

    const addAssignment = (assignment) => {
        // Prevent duplicate entries
        setAssignments(prev => {
            const exists = prev.some(
                a => a.scheduleId === assignment.scheduleId &&
                    a.class_id === assignment.class_id &&
                    a.section_id === assignment.section_id
            );
            if (exists) return prev;
            return [...prev, { ...assignment, id: Date.now() + Math.random() }];
        });
    };

    return (
        <ScheduleContext.Provider value={{
            schedules,
            addSchedule,
            updateSchedule,
            deleteSchedule,
            scheduleTemplates,
            addScheduleTemplate,
            assignments,
            addAssignment
        }}>
            {children}
        </ScheduleContext.Provider>
    );
};
