import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Account created successfully!');
            navigate('/data-table'); // Navigate after account creation
        } catch (err) {
            console.error(err);
            setError('Error creating account');
        }
    };

    return (
        <div className='container'>
            <form className='formname' onSubmit={handleCreateAccount}>
                <h1>Create New Account</h1>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className='btnname'>Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccount;
