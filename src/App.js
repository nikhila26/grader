// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import StudentDashboard from './StudentDashboard';
import AssignmentList from './AssignmentList';
import HomeworkList from './HomeworkList';
import HomeworkViewer from './HomeworkViewer';
import GradeViewer from './GradeViewer';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/assignment-list" element={<AssignmentList />} />
          <Route path="/homework-list" element={<HomeworkList />} />
          <Route path="/view-homework/:id" element={<HomeworkViewer />} />
          <Route path="/grades" element={<GradeViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
