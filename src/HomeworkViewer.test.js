import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeworkViewer from './HomeworkViewer';
import { useParams, useNavigate } from 'react-router-dom';

// Mock the react-router hooks
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: jest.fn(),
    useNavigate: jest.fn()
}));

describe('HomeworkViewer', () => {
  beforeEach(() => {
    // Setup mock values for each test
    useParams.mockReturnValue({ id: 'math-1' });
    useNavigate.mockReturnValue(jest.fn()); // mock navigate function
  });

  test('renders without crashing', () => {
    render(
      <Router>
        <HomeworkViewer />
      </Router>
    );
    expect(screen.getByText(/upload/i)).toBeInTheDocument();
  });

  test('handles file upload', () => {
    render(
      <Router>
        <HomeworkViewer />
      </Router>
    );
    const fileInput = screen.getByLabelText(/file upload/i);
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.getByText(/file uploaded: hello.png/i)).toBeInTheDocument();
  });

  test('submit button functionality', () => {
    render(
      <Router>
        <HomeworkViewer />
      </Router>
    );
    const submitButton = screen.getByText(/submit homework/i);
    fireEvent.click(submitButton);
    expect(screen.getByText(/please upload a file before submitting!/i)).toBeInTheDocument();
  });

  test('logout functionality', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <Router>
        <HomeworkViewer />
      </Router>
    );
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
