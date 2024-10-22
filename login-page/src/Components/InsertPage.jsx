import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './InsertPage.css'; // Create CSS for this page if needed

export default function InsertPage() {
    const [newRow, setNewRow] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e, key) => {
        setNewRow({
            ...newRow,
            [key]: e.target.value || 'N/A' // Automatically replace null with 'N/A'
        });
    };

    const handleAddRow = () => {
        // Ensure no fields are missing, set N/A for empty fields
        const filledRow = Object.keys(newRow).reduce((acc, key) => {
            acc[key] = newRow[key] || 'N/A'; // Fill empty fields with 'N/A'
            return acc;
        }, {});

        // Send data to backend for persistence
        fetch('https://datamaze-excel.onrender.com/add-row/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filledRow) // Sending the new row data as JSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add row');
                }
                return response.json();
            })
            .then(data => {
                setSuccess('Row added successfully!');
                setError(null);
                console.log('Row successfully added to the backend:', data);
            })
            .catch(error => {
                setError('Error saving new row to the backend');
                setSuccess(null);
                console.error('Error saving new row to the backend:', error);
            });
    };

    const handleBack = () => {
        navigate('/full-table'); // Navigate back to the table page
    };

    return (
        <div className='insert-container'>
            <h1 id='h1'>Insert New Data</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {/* Input fields for new row */}
            <div className="form-container">
                <label>Source:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'source')}
                    placeholder="Enter value"
                />
                <label>Date:</label>
                <input
                    type="date"
                    onChange={(e) => handleInputChange(e, 'date')}
                    placeholder="Enter value"
                />
                 <label>client:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'client')}
                    placeholder="Enter value"
                />
                 <label>SPOC:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'SPOC')}
                    placeholder="Enter value "
                />
                 <label>Skill:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'skill')}
                    placeholder="Enter value"
                />
                 <label>Job Code:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'jobcode')}
                    placeholder="Enter value"
                />
                 <label>Candidate Name:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'Candidatecode')}
                    placeholder="Enter value"
                />
                 <label>Name:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'name')}
                    placeholder="Enter value"
                />
                 <label>Contact:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'contact')}
                    placeholder="Enter value"
                />
                 <label>Email:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'email')}
                    placeholder="Enter value"
                />
                 <label>Location:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'Location')}
                    placeholder="Enter value"
                />
                 <label>TEX:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'TEX')}
                    placeholder="Enter value"
                />
                 <label>REX:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'REX')}
                    placeholder="Enter value"
                />
                 <label>Employer:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'Employer')}
                    placeholder="Enter value"
                />
                 <label>PCTC:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'PCTC')}
                    placeholder="Enter value"
                />
                 <label>ECTC:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'ECTC')}
                    placeholder="Enter value"
                />
                 <label>Notice:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'Notice')}
                    placeholder="Enter value"
                />
                 <label>Interview Date:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'IntvDate')}
                    placeholder="Enter value"
                />
                 <label>Interview Time:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'IntvTime')}
                    placeholder="Enter value"
                />
                 <label>Interview Mode:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'IntvMode')}
                    placeholder="Enter value"
                />
                 <label>Remarks:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'Remarks')}
                    placeholder="Enter value"
                />
                   <label>Confirmerd/projection:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'Confirmerdprojection')}
                    placeholder="Enter value"
                />
                   <label>DOJ:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'Doj')}
                    placeholder="Enter value"
                />
                   <label>Offered CTC:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'OfferedCTC')}
                    placeholder="Enter value"
                />
                   <label>Variable CTC:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'VariableCTC')}
                    placeholder="Enter value"
                />
                   <label>Billing Percentage:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'BillingPercentage')}
                    placeholder="Enter value"
                />
                   <label>Billing Value:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'BillingValue')}
                    placeholder="Enter value"
                />
                   <label>Gross Profit:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'GrossProfit')}
                    placeholder="Enter value"
                />
                   <label>Net Profit:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'NetProfit')}
                    placeholder="Enter value"
                />
                   <label>Recruter percentage:</label>
                <input
                    type="text"
                    onChange={(e) => handleInputChange(e, 'RecruterPercentage')}
                    placeholder="Enter value"
                />
                {/* Add more input fields as needed for each column */}
            </div>

            <button onClick={handleAddRow} className='button4'>Update</button>
            <button onClick={handleBack} className='button5'>Back to Table</button>
        </div>
    );
}


