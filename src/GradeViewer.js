import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link for navigation
import styles from './GradeViewer.module.css'; // Confirm the path is correct

// Helper functions
export const randomGrade = () => {
  const grades = ['A', 'B', 'C', 'D'];
  return grades[Math.floor(Math.random() * grades.length)];
};

const getCommentForGrade = (grade) => {
  switch (grade) {
    case 'A':
      return 'Excellent work!';
    case 'B':
      return 'Good, but check your calculations.';
    case 'C':
      return 'Adequate, but needs improvement.';
    case 'D':
      return 'Insufficient, please revisit the material.';
    default:
      return 'No comment available.';
  }
};

function GradeViewer() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [selectedAssignment, setSelectedAssignment] = useState('');

  const subjects = ['Math', 'Science', 'History', 'English', 'Geography'];
  const grades = subjects.reduce((acc, subject) => ({
    ...acc,
    [subject]: Array.from({ length: 10 }, (_, i) => ({
      id: `${subject} Assignment ${i + 1}`,
      grade: randomGrade(),
    }))
  }), {});

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedAssignment('');
  };

  const handleAssignmentChange = (event) => {
    setSelectedAssignment(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const selectedSubjectData = grades[selectedSubject];
  const selectedAssignmentDetails = selectedSubjectData.find(assignment => assignment.id === selectedAssignment);

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <Link to="/assignment-list" className={styles.navLink}>View Assignments</Link>
        <Link to="/homework-list" className={styles.navLink}>Submit Assignments</Link>
      </nav>
      <h1 className={styles.title}>Grade Details</h1>
      <div className={styles.selectContainer}>
        <label className={styles.label}>
          Select Subject:
          <select className={styles.select} value={selectedSubject} onChange={handleSubjectChange}>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Select Assignment:
          <select className={styles.select} value={selectedAssignment} onChange={handleAssignmentChange}>
            <option value="">--Select an Assignment--</option>
            {selectedSubjectData.map((assignment) => (
              <option key={assignment.id} value={assignment.id}>{assignment.id}</option>
            ))}
          </select>
        </label>
      </div>
      {selectedAssignmentDetails && (
        <div className={styles.gradeDetails}>
          <h2>{selectedAssignmentDetails.id}</h2>
          <p className={styles.grade}>Grade: {selectedAssignmentDetails.grade}</p>
          <p className={styles.comment}>Comment: {getCommentForGrade(selectedAssignmentDetails.grade)}</p>
        </div>
      )}
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}

export default GradeViewer;
