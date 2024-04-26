import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Importing the CSS module

function Login() {
    const [user, setUser] = useState(''); // To store the username input
    const [password, setPassword] = useState(''); // To store the password input
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [error, setError] = useState(''); // State to manage error messages
    const navigate = useNavigate(); // Hook to navigate to different routes

    // Predefined user credentials
    const validUsers = {
        'student1': 'password1',
        'student2': 'password2',
        'student3': 'password3',
        'student4': 'password4',
        'student5': 'password5',
        'student6': 'password6',
        'student7': 'password7',
        'student8': 'password8',
        'student9': 'password9',
        'student10': 'password10'
    };

    const handleLogin = () => {
        // Validate if both username and password fields are not empty
        if (!user || !password) {
            setError('Please enter both username and password.');
            return; // Stop the function if validation fails
        }

        // Check user credentials against predefined list
        if (validUsers[user] && validUsers[user] === password) {
            console.log('Logging in with', user, password);
            localStorage.setItem('user', user); // Simulate a successful login and save user to local storage
            navigate('/dashboard'); // Navigate to StudentDashboard on successful login
        } else {
            setError('Invalid username or password.'); // Set error message if credentials are incorrect
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the password visibility
    };

    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>Username:</label>
                <input
                    type="text"
                    id="username"
                    className={styles.input}
                    value={user}
                    onChange={e => setUser(e.target.value)}
                    placeholder="Enter username"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={styles.input}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.toggleButton}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? '🙈' : '👁️'}
                </button>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button onClick={handleLogin} className={styles.loginButton}>Login</button>
            <div className={styles.forgotPassword}>
                <button
                    type="button"
                    onClick={() => alert('Redirect to forgot password page')}
                    className={styles.forgotLink}
                >
                    Forgot Password?
                </button>
            </div>
        </div>
    );
}

export default Login;
