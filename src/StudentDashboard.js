import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudentDashboard.module.css'; // Ensure this path is correct

function StudentDashboard() {
    const navigate = useNavigate();

    const navigateToHomeworkList = () => {
        navigate('/assignment-list');
    };

    const navigateToGrades = () => {
        navigate('/grades');
    };

    const navigateToLogout = () => {
        localStorage.removeItem('user'); // Clear user authentication details
        navigate('/'); // Navigate back to the login page
    };

    // This function will be used for the "Submit Assignments" button
    const navigateToSubmitAssignments = () => {
        navigate('/homework-list'); // Assuming this is where students go to submit assignments
    };

    return (
        <div className={styles.dashboard}>
            <h1>Student Dashboard</h1>
            <div className={styles.links}>
                <button onClick={navigateToHomeworkList} className={styles.linkButton}>
                    View Assignments
                </button>
                <button onClick={navigateToSubmitAssignments} className={styles.linkButton}>
                    Submit Assignments
                </button>
                <button onClick={navigateToGrades} className={styles.linkButton}>
                    View Grades
                </button>
            </div>
            <button onClick={navigateToLogout} className={styles.logoutButton}>
                Logout
            </button>
        </div>
    );
}

export default StudentDashboard;
