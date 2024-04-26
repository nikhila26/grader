import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeworkList from './HomeworkList';
import { BrowserRouter } from 'react-router-dom';

// Mock the useEffect hook to prevent actual data fetching
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('HomeworkList Component', () => {
  test('renders homework list with mocked data', () => {
    // Mock data for subjects and assignments
    const subjects = {
      'Math': Array.from({ length: 2 }, (_, i) => ({ id: `math-${i+1}`, title: `Math Homework ${i+1}` })),
      'Science': Array.from({ length: 2 }, (_, i) => ({ id: `science-${i+1}`, title: `Science Homework ${i+1}` })),
    };
    // Mock the useEffect hook to return the mocked data
    React.useEffect.mockImplementationOnce(f => f());

    render(<HomeworkList />, { wrapper: BrowserRouter });

    // Check if homework list title is rendered
    expect(screen.getByText('Homework List')).toBeInTheDocument();

    // Check if each subject section is rendered
    Object.entries(subjects).forEach(([subject, assignments]) => {
      expect(screen.getByText(subject)).toBeInTheDocument();

      // Check if each assignment link is rendered
      assignments.forEach(hw => {
        expect(screen.getByText(hw.title)).toBeInTheDocument();
      });
    });
  });
});
