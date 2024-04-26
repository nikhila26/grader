import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomeworkList.module.css'; // Ensure the CSS path is correct

function HomeworkList() {
  const [subjects, setSubjects] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Simulate fetching this data from a server
    setSubjects({
      'Math': Array.from({ length: 10 }, (_, i) => ({ id: `math-${i+1}`, title: `Math Homework ${i+1}` })),
      'Science': Array.from({ length: 10 }, (_, i) => ({ id: `science-${i+1}`, title: `Science Homework ${i+1}` })),
      'History': Array.from({ length: 10 }, (_, i) => ({ id: `history-${i+1}`, title: `History Homework ${i+1}` })),
      'English': Array.from({ length: 10 }, (_, i) => ({ id: `english-${i+1}`, title: `English Homework ${i+1}` })),
      'Geography': Array.from({ length: 10 }, (_, i) => ({ id: `geography-${i+1}`, title: `Geography Homework ${i+1}` })),
    });
  }, []);

  // Function to handle logout action
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove the user session from local storage
    navigate('/login'); // Redirect the user to the login page
  };

  return (
    <div className={styles.homeworkListContainer}>
      <nav className={styles.navBar}>
        <Link to="/assignment-list" className={styles.navLink}>View Assignments</Link>
        <Link to="/grades" className={styles.navLink}>View Grades</Link>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </nav>
      <h1 className={styles.homeworkListTitle}>Homework List</h1>
      {Object.entries(subjects).map(([subject, assignments]) => (
        <div key={subject} className={styles.subjectSection}>
          <h2 className={styles.subjectTitle}>{subject}</h2>
          <ul className={styles.assignmentList}>
            {assignments.map(hw => (
              <li key={hw.id} className={styles.assignmentItem}>
                <Link to={`/view-homework/${hw.id}`} className={styles.assignmentLink}>{hw.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default HomeworkList;
