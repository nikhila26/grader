import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssignmentList from './AssignmentList';

// Mock the CSS module
jest.mock('./AssignmentList.module.css', () => ({
  container: 'container',
  subjectsContainer: 'subjectsContainer',
  subjectButton: 'subjectButton',
  subjectAssignments: 'subjectAssignments',
  subjectTitle: 'subjectTitle',
  assignment: 'assignment',
  assignmentTitle: 'assignmentTitle',
  questionList: 'questionList',
  question: 'question',
}));

describe('AssignmentList Component', () => {
  test('renders assignment list correctly', () => {
    render(<AssignmentList />);
    // Check if the heading is rendered
    expect(screen.getByText('Assignments and Questions')).toBeInTheDocument();

    // Check if subject buttons are rendered
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Geography')).toBeInTheDocument();
  });

  test('displays assignments when subject button is clicked', () => {
    render(<AssignmentList />);

    // Click on the Math subject button
    fireEvent.click(screen.getByText('Math'));

    // Check if the subject title and assignments are displayed
    expect(screen.getByText('Math', { selector: 'h2' })).toBeInTheDocument();
    expect(screen.getByText('Math Assignment 1')).toBeInTheDocument();
    expect(screen.getByText('What is the value of 2^(3+1)?')).toBeInTheDocument();
    expect(screen.getByText('Solve for x in the equation x/2 = 1.')).toBeInTheDocument();
    expect(screen.getByText('What is the area of a circle with radius 2?')).toBeInTheDocument();
  });
});
