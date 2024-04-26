import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './HomeworkViewer.module.css'; // Make sure the path is correct

function HomeworkViewer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [homework, setHomework] = useState(null);
    const [file, setFile] = useState(null);
    const [gradeInfo, setGradeInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetching homework details based on the assignment id
        const generateAssignments = (subject, total) => {
            let assignments = {};
            for (let i = 1; i <= total; i++) {
                assignments[`${subject}-${i}`] = {
                    title: `${subject.charAt(0).toUpperCase() + subject.slice(1)} Homework ${i}`,
                    description: `Complete the set tasks for ${subject} number ${i}.`
                };
            }
            return assignments;
        };

        const subjects = ['math', 'science', 'history', 'english', 'geography'];
        let allAssignments = {};
        subjects.forEach(subject => {
            Object.assign(allAssignments, generateAssignments(subject, 10));
        });

        if (allAssignments[id]) {
            setHomework(allAssignments[id]);
        }
    }, [id]);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
        setGradeInfo(null);
        setShowModal(false);
    };

    const submitHomework = () => {
        if (!file) {
            setShowModal(true);
            setGradeInfo("Please upload a file before submitting!");
            return;
        }
        const grades = ['A', 'B', 'C', 'D'];
        const assignmentNumber = parseInt(id.split('-')[1], 10);
        const gradeIndex = assignmentNumber % grades.length;
        const grade = grades[gradeIndex];
        const comments = {
            'A': 'Excellent work!',
            'B': 'Good, but check your calculations.',
            'C': 'Adequate, but needs improvement.',
            'D': 'Insufficient, please revisit the material.'
        };
        setGradeInfo(`Grade: ${grade}, Comment: ${comments[grade]}`);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            <h1 className={styles.title}>{homework?.title}</h1>
            <p>{homework?.description}</p>
            <label htmlFor="file-upload" className={styles.fileLabel}>File Upload</label>
            <input id="file-upload" type="file" onChange={handleFileUpload} className={styles.input} />
            {file && <p className={styles.fileDetails}>File uploaded: {file.name}</p>}
            <button onClick={submitHomework} className={styles.submitButton}>Submit Homework</button>
            {showModal && (
                <div className={styles.gradingSection}>
                    <p>{gradeInfo}</p>
                    <button onClick={closeModal} className={styles.button}>Close</button>
                </div>
            )}
        </div>
    );
}

export default HomeworkViewer;
