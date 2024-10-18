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
    const [message, setMessage] = useState(''); // State to store success or error messages
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate for navigation

    const createAccount = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                setError(null);
                setMessage('Account created successfully!'); // Display success message
            })
            .catch((err) => {
                console.error(err);
                setError('Error creating account: ' + err.message); // Display detailed error message
                setMessage(''); // Clear any previous success message
            });
    };

    const loginAccount = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                setError(null);
                setMessage('Logged in successfully!'); // Display success message
                navigate('/data-table'); // Navigate to DataTable on successful login
            })
            .catch((err) => {
                console.error(err);
                setError('Incorrect email or password: ' + err.message); // Display detailed error message
                setMessage(''); // Clear any previous success message
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
                {message && <p style={{ color: 'green' }}>{message}</p>} {/* Success message */}

                <button type="submit" onClick={createAccount} className='btnname'>Create Account</button>
                <button type="submit" onClick={loginAccount} className='btnname'>Log In</button>
            </form>
        </div>
    );
}
