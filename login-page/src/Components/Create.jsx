import React, { useState } from 'react';
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
    
   /*
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firestore imports
import './Create.css';

const db = getFirestore(); // Initialize Firestore

export default function Create() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // State to store admin status
    const navigate = useNavigate(); // useNavigate for navigation

    // Function to check if the logged-in user is an admin
    const checkIfAdmin = async (uid) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists() && userDoc.data().isAdmin) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
                setError('You are not allowed to create accounts.');
            }
        } catch (error) {
            console.error('Error fetching user document:', error);
            setError('Error checking admin status.');
        }
    };

    // Admin account creation
    const createAccount = (e) => {
        e.preventDefault();
        if (isAdmin) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    console.log('Account created:', userCredentials);
                    setError(null);
                })
                .catch((err) => {
                    console.error(err);
                    setError('Error creating account');
                });
        } else {
            setError('You are not allowed to create accounts.');
        }
    };

    // Login function
    const loginAccount = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredentials);
            setError(null);

            // Check if the logged-in user is an admin
            await checkIfAdmin(userCredentials.user.uid);

            navigate('/data-table'); // Navigate on successful login
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/invalid-email') {
                setError('Invalid email format.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password.');
            } else if (err.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else {
                setError('Login failed. Please try again.');
            }
        }
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