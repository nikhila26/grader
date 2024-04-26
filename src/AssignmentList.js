import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AssignmentList.module.css'; // Ensure this path is correct and the CSS file exists

const AssignmentList = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate(); // Hook for navigation to enable redirection after logout

  const subjectsAssignments = {
    Math: Array.from({ length: 10 }, (_, i) => ({
      id: `Math Assignment ${i + 1}`,
      questions: [
        `What is the value of 2^(3+${i})?`,
        `Solve for x in the equation x/2 = ${i}.`,
        `What is the area of a circle with radius ${i + 1}?`
      ]
    })),
    Science: Array.from({ length: 10 }, (_, i) => ({
      id: `Science Assignment ${i + 1}`,
      questions: [
        `Describe the process of cellular respiration.`,
        `What is Newton's ${i + 1}st law of motion?`,
        `Explain the significance of Mendel's experiments.`
      ]
    })),
    History: Array.from({ length: 10 }, (_, i) => ({
      id: `History Assignment ${i + 1}`,
      questions: [
        `Outline the causes of the French Revolution.`,
        `Discuss the impact of the industrial revolution.`,
        `Explain the main factors leading to World War ${i % 2 === 0 ? 'I' : 'II'}.`
      ]
    })),
    English: Array.from({ length: 10 }, (_, i) => ({
      id: `English Assignment ${i + 1}`,
      questions: [
        `Analyze the use of symbolism in 'To Kill a Mockingbird'.`,
        `Discuss the theme of power in 'Macbeth'.`,
        `Compare the use of narrative voice in any two Victorian novels.`
      ]
    })),
    Geography: Array.from({ length: 10 }, (_, i) => ({
      id: `Geography Assignment ${i + 1}`,
      questions: [
        `Describe the rock cycle.`,
        `Explain the causes and effects of climate change.`,
        `What are the main features of a river's course?`
      ]
    })),
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.topNav}>
        <Link to="/homework-list" className={styles.navLink}>Submit Assignments</Link>
        <Link to="/grades" className={styles.navLink}>View Grades</Link>
      </nav>
      <h1>Assignments and Questions</h1>
      <div className={styles.subjectsContainer}>
        {Object.keys(subjectsAssignments).map((subject) => (
          <button
            key={subject}
            className={styles.subjectButton}
            onClick={() => handleSubjectClick(subject)}
          >
            {subject}
          </button>
        ))}
      </div>
      {selectedSubject && (
        <div className={styles.subjectAssignments}>
          <h2 className={styles.subjectTitle}>{selectedSubject}</h2>
          {subjectsAssignments[selectedSubject].map((assignment) => (
            <div key={assignment.id} className={styles.assignment}>
              <h3 className={styles.assignmentTitle}>{assignment.id}</h3>
              <ol className={styles.questionList}>
                {assignment.questions.map((question, index) => (
                  <li key={index} className={styles.question}>{question}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentList;
