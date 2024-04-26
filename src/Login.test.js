import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom'; // Needed for useNavigate

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useNavigate: () => jest.fn() // Mock implementation of useNavigate
}));

describe('Login Component', () => {
    test('renders username and password input', () => {
        render(<Login />, { wrapper: BrowserRouter });
        expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    });

    test('validates input fields are not empty', () => {
        render(<Login />, { wrapper: BrowserRouter });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(screen.getByText(/please enter both username and password./i)).toBeInTheDocument();
    });

    test('allows user to enter username and password', () => {
        render(<Login />, { wrapper: BrowserRouter });
        const usernameInput = screen.getByLabelText(/username:/i);
        const passwordInput = screen.getByLabelText(/password:/i);
        fireEvent.change(usernameInput, { target: { value: 'student1' } });
        fireEvent.change(passwordInput, { target: { value: 'password1' } });
        expect(usernameInput.value).toBe('student1');
        expect(passwordInput.value).toBe('password1');
    });

    test('handles valid login', () => {
        render(<Login />, { wrapper: BrowserRouter });
        const usernameInput = screen.getByLabelText(/username:/i);
        const passwordInput = screen.getByLabelText(/password:/i);
        fireEvent.change(usernameInput, { target: { value: 'student1' } });
        fireEvent.change(passwordInput, { target: { value: 'password1' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        // You might want to check console.log output or navigation actions
        // This part is application specific and depends on your implementation
    });

    test('toggle password visibility', () => {
        render(<Login />, { wrapper: BrowserRouter });
        const toggleButton = screen.getByLabelText(/Show password/i); // Updated selector
        fireEvent.click(toggleButton); // Toggle visibility to show password
        const passwordInput = screen.getByLabelText(/password:/i);
        expect(passwordInput.type).toBe('text'); // The input type should change to text
        fireEvent.click(toggleButton); // Toggle visibility to hide password
        expect(passwordInput.type).toBe('password'); // The input type should revert to password
    });
    
});
