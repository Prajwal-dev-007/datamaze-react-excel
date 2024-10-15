/*import React, { useEffect, useState } from 'react';
import './FullTable.css'; // Create this CSS file if needed

export default function Upload() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch full table data
        fetch('http://localhost:8000/get-full-data/')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(error => {
                setError('Error fetching full table data');
                console.error('Error fetching full table data:', error);
            });
    }, []);

    return (
        <div className='fulltable-container'>
            <button onClick={handleUpdate} className='button1'>Update</button>
            <h1>Full Table Data</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {data.length > 0 ? (
                <table className='fulltable'>
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
            ) : (
                <p>Loding....</p>
            )}
        </div>
    );
}

*/

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './FullTable.css'; // Create this CSS file if needed

export default function Upload() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Use navigate to switch between pages

    useEffect(() => {
        // Fetch full table data
        fetch('http://localhost:8000/get-full-data/')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(error => {
                setError('Error fetching full table data');
                console.error('Error fetching full table data:', error);
            });
    }, []);

    const handleInsertNavigate = () => {
        // Navigate to the insert page
        navigate('/insert'); // Assuming the insert page is at /insert
    };

    return (
        <div className='fulltable-container'>
            <button onClick={handleInsertNavigate} className='button1'>Insert</button>
            <h1>Full Table Data</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {data.length > 0 ? (
                <>
                    <table className='fulltable'>
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
                                        <td key={index}>{value || 'N/A'}</td> // Show N/A if value is null
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}





