/*import React, { useState, useEffect } from 'react';

function DataTable() {
    const [clientName, setClientName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [data, setData] = useState([]);
    const [allRemarks, setAllRemarks] = useState([]);
    const [error, setError] = useState(null);
    const [totalCVs, setTotalCVs] = useState(0); // State for storing total CV count
    const [showTable, setShowTable] = useState(false);
    const [showFullTable, setShowFullTable] = useState(false);

    useEffect(() => {
        // Fetch distinct 'Remarks' values for the dropdown
        fetch('http://localhost:8000/get-remarks/')
            .then(response => response.json())
            .then(data => setAllRemarks(data))
            .catch(error => console.error('Error fetching remarks:', error));

        // Fetch the total number of CVs (unique contacts)
        fetch('http://localhost:8000/get-total-cv-count/')
            .then(response => response.json())
            .then(data => setTotalCVs(data.total_cvs))
            .catch(error => console.error('Error fetching total CV count:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/get-data-by-client/?client=${clientName}&remarks=${remarks}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setData([]);
                } else {
                    setError(null);
                    setData(data);
                    setShowTable(true);
                    setShowFullTable(false);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleViewTable = () => {
        fetch('http://localhost:8000/get-all-data/')
            .then(response => response.json())
            .then(data => {
                setError(null);
                setData(data);
                setShowTable(true);
                setShowFullTable(false);
            })
            .catch(error => {
                setError('Error fetching all data');
                console.error('Error fetching all data:', error);
            });
    };

    const handleViewFullTable = () => {
        fetch('http://localhost:8000/get-full-data/')
            .then(response => response.json())
            .then(data => {
                setError(null);
                setData(data);
                setShowTable(false);
                setShowFullTable(true);
            })
            .catch(error => {
                setError('Error fetching full table data');
                console.error('Error fetching full table data:', error);
            });
    };

    return (
        <div>
            <h1>Search Data by Client</h1>
            <p>Total CVs Uploaded: {totalCVs}</p> 

            <form onSubmit={handleSubmit}>
                <label htmlFor="clientName">Client Name:</label>
                <input
                    type="text"
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />

                <label htmlFor="remarks">Remarks:</label>
                <select
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                >
                    <option value="">All Remarks</option>
                    {allRemarks.map(rem => (
                        <option key={rem} value={rem}>{rem}</option>
                    ))}
                </select>

                <button type="submit">Search</button>
            </form>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

           }
            <button onClick={handleViewTable}>View Table</button>

            <button onClick={handleViewFullTable}>View Full Table</button>

            
            {showTable && data.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>source</th>
                            <th>client</th>
                            <th>SPOC</th>
                            <th>skill</th>
                            <th>name</th>
                            <th>contact</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.source}</td>
                                <td>{item.client}</td>
                                <td>{item.SPOC}</td>
                                <td>{item.skill}</td>
                                <td>{item.name}</td>
                                <td>{item.contact}</td>
                                <td>{item.Remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showFullTable && data.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map(key => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                {Object.values(item).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DataTable;
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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwtYfxZ1GVX0BfxnwQ_KjX_yRxf1WYQ3Y",
  authDomain: "excel-firebase-react.firebaseapp.com",
  projectId: "excel-firebase-react",
  storageBucket: "excel-firebase-react.appspot.com",
  messagingSenderId: "53417301610",
  appId: "1:53417301610:web:4c39eba237aa44316c9c13",
  measurementId: "G-GEX56CXTKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app); 