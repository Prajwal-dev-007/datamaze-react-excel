/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Create.css';


export default function Create() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate for navigation

    const createAccount = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError('Error creating account');
            });
    };

    const loginAccount = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                setError(null);
                navigate('/data-table'); // Navigate to DataTable on successful login
            })
            .catch((err) => {
                console.error(err);
                setError('Incorrect email or password');
            });
    };

    return (
        <div className='container'>
            <form className='formname'>
                <h1>Welcome!</h1>
                
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>} 
                <button type="submit" onClick={createAccount} className='btnname'>Create Account</button>
               <button type="submit" onClick={loginAccount} className='btnname'>LogIn</button>
            </form>
        </div>
    );
}
    */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './Create.css';

export default function Create() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');  // For showing success message
    const navigate = useNavigate(); // useNavigate for navigation

    // Account creation handler
    const createAccount = (e) => {
        e.preventDefault();
        setError(null);  // Clear error state before processing
        setMessage('');  // Clear any previous success message
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log("Account created successfully: ", userCredentials);
                setError(null);  // Clear any previous error
                setMessage('Account created successfully!');  // Show success message
            })
            .catch((err) => {
                console.error("Error creating account: ", err);
                const errorMsg = err.message || 'Error creating account';  // Detailed error
                setError(errorMsg);
                setMessage('');  // Clear success message
            });
    };

    // Login handler
    const loginAccount = (e) => {
        e.preventDefault();
        setError(null);  // Clear error state before processing
        setMessage('');  // Clear success message

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log("Logged in successfully: ", userCredentials);
                setError(null);  // Clear any previous error
                setMessage('Logged in successfully!');  // Show success message
                navigate('/data-table');  // Navigate to DataTable page
            })
            .catch((err) => {
                console.error("Error logging in: ", err);
                const errorMsg = err.message || 'Incorrect email or password';  // Detailed error
                setError(errorMsg);
                setMessage('');  // Clear success message
            });
    };

    return (
        <div className='container'>
            <form className='formname'>
                <h1>Welcome!</h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                {/* Display any error messages */}
                {error && <p style={{ color: 'red' }}>{error}</p>} 

                {/* Display success message */}
                {message && <p style={{ color: 'green' }}>{message}</p>}

                <button type="submit" onClick={createAccount} className='btnname'>
                    Create Account
                </button>

                <button type="submit" onClick={loginAccount} className='btnname'>
                    LogIn
                </button>
            </form>
        </div>
    );
}
