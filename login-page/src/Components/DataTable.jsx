
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DataTable.css';


function DataTable() {
    const [clientName, setClientName] = useState('');
    const [remarks, setRemarks] = useState('');
    const [skill, setSkill] = useState(''); // State for skill filtering
    const [data, setData] = useState([]);
    const [allRemarks, setAllRemarks] = useState([]);
    const [allSkills, setAllSkills] = useState([]); // State for storing all skills
    const [error, setError] = useState(null);
    const [totalCVs, setTotalCVs] = useState(0); // State for storing total CV count
    const [showTable, setShowTable] = useState(false);
    const [showFullTable, setShowFullTable] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch distinct 'Remarks' values for the dropdown
        fetch('http://localhost:8000/get-remarks/')
            .then(response => response.json())
            .then(data => setAllRemarks(data))
            .catch(error => console.error('Error fetching remarks:', error));

        fetch('http://localhost:8000/get-skill/')
            .then(response => response.json())
            .then(data => setAllSkills(data)) // Store all skills
            .catch(error => console.error('Error fetching skills:', error));

        // Fetch the total number of CVs (unique contacts)
        fetch('http://localhost:8000/get-total-cv-count/')
            .then(response => response.json())
            .then(data => setTotalCVs(data.total_cvs))
            .catch(error => console.error('Error fetching total CV count:', error));
    }, []);

const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare query parameters based on clientName, remarks, and skill
    const queryParams = new URLSearchParams();
    
    if (clientName) {
        queryParams.append('client', clientName);
    }
    if (remarks) {
        queryParams.append('remarks', remarks);
    }
    if (skill) {
        queryParams.append('skill', skill);
    }

    // Make a fetch request with the prepared query params
    fetch(`http://localhost:8000/get-filtered-data/?${queryParams.toString()}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                setError(data.message);
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
            // Navigate to the SearchResults page and pass the data
            navigate('/search-results', { state: { data } });
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
                navigate('/full-table');
            })
            .catch(error => {
                setError('Error fetching full table data');
                console.error('Error fetching full table data:', error);
            });
    };

    return (
        <div className='divname'> 
              
            <p id='id'>Total CVs Uploaded: {totalCVs}</p> 

            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="clientName">Client Name:</label>
                <input
                    type="text"
                    id="remarks"
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

                  {/* Skill Filter */}
                  <label htmlFor="skill">Skill:</label>
                <select
                    id="remarks"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                >
                    <option value="">All Skills</option>
                    {allSkills.map(sk => (
                        <option key={sk} value={sk}>{sk}</option>
                    ))}
                </select>

                <button type="submit" className='button1'>Search</button>
            </form>
            
            {error && <p style={{ color: 'red' }} id='error1'>{error}</p>}

           
            <button onClick={handleViewTable} className='button2'>View Table</button>

            
            <button onClick={handleViewFullTable} className='button3'>View Full Table</button>

            
            {showTable && data.length > 0 && (
                <table id='table'>
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
                            <tr key={item.id || item.contact}>
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


