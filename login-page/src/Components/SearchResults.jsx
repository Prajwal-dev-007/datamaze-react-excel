/*
import React, { useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

export default function SearchResults() {
    const location = useLocation();
    const { data } = location.state;

    // State to keep track of selected values for immediate highlighting
    const [selectedValues, setSelectedValues] = useState({
        source: null,
        client: null,
        SPOC: null,
        skill: null,
        Remarks: null,
    });

    // State to track rows to be highlighted after clicking "OK"
    const [highlightedRows, setHighlightedRows] = useState([]);

    // State to store the CV count
    const [cvCount, setCvCount] = useState(null);

    // Function to get unique values from each column
    const getUniqueValues = (columnKey) => {
        const uniqueValues = [...new Set(data.map(item => item[columnKey]))];
        return uniqueValues;
    };

    // Handle selection/deselection in each column
    const handleSelection = (columnKey, value) => {
        setSelectedValues((prevSelectedValues) => {
            const newSelectedValue = prevSelectedValues[columnKey] === value ? null : value;
            return {
                ...prevSelectedValues,
                [columnKey]: newSelectedValue,
            };
        });
    };

    const handleSubmit = () => {
        const isAnyValueSelected = Object.values(selectedValues).some(value => value !== null);
        if (!isAnyValueSelected) {
            alert('Please select at least one value to shortlist CVs.');
            return;
        }

        const matchedRows = data.filter((row) =>
            Object.entries(selectedValues).every(([key, selectedValue]) =>
                selectedValue === null || row[key] === selectedValue
            )
        );

        setHighlightedRows(matchedRows);

        // Fetch unique contacts count based on selected values
        const queryString = Object.entries(selectedValues)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        fetch(`http://localhost:8000/get-unique-contacts-count/?${queryString}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error fetching unique contact count:', data.error);
                } else {
                    // Update the state with the CV count instead of showing an alert
                    setCvCount(data.unique_contacts_count);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const isHighlighted = (columnKey, value) => {
        if (selectedValues[columnKey] === value) {
            return true;
        }
        return highlightedRows.some(row => row[columnKey] === value);
    };

    return (
        <div className="results-container">
            {data.length > 0 && (
                <div className="scrolling-container">
                    <div className="box1">
                        <h3>Source</h3>
                        <div className="value-container">
                            {getUniqueValues('source').map((value, index) => (
                                <div
                                    key={index}
                                    className={`value-box ${isHighlighted('source', value) ? 'highlight' : ''}`}
                                    onClick={() => handleSelection('source', value)}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="box2">
                        <h3>Client</h3>
                        <div className="value-container">
                            {getUniqueValues('client').map((value, index) => (
                                <div
                                    key={index}
                                    className={`value-box ${isHighlighted('client', value) ? 'highlight' : ''}`}
                                    onClick={() => handleSelection('client', value)}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="box3">
                        <h3>SPOC</h3>
                        <div className="value-container">
                            {getUniqueValues('SPOC').map((value, index) => (
                                <div
                                    key={index}
                                    className={`value-box ${isHighlighted('SPOC', value) ? 'highlight' : ''}`}
                                    onClick={() => handleSelection('SPOC', value)}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="box4">
                        <h3>Skill</h3>
                        <div className="value-container">
                            {getUniqueValues('skill').map((value, index) => (
                                <div
                                    key={index}
                                    className={`value-box ${isHighlighted('skill', value) ? 'highlight' : ''}`}
                                    onClick={() => handleSelection('skill', value)}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="box5">
                        <h3>Remarks</h3>
                        <div className="value-container">
                            {getUniqueValues('Remarks').map((value, index) => (
                                <div
                                    key={index}
                                    className={`value-box ${isHighlighted('Remarks', value) ? 'highlight' : ''}`}
                                    onClick={() => handleSelection('Remarks', value)}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="button-container">
                        <button onClick={handleSubmit}>OK</button>
                    </div>

                   
                    <h3 className='cv'>Total CV's Count:</h3>
                    {cvCount !== null && (
                        <div className="cv-count">
                            <h3>{cvCount}</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
*/
import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

export default function SearchResults() {
    const location = useLocation();
    const { data } = location.state;

    // State to keep track of selected values
    const [selectedValues, setSelectedValues] = useState({
        source: null,
        client: null,
        SPOC: null,
        skill: null,
        Remarks: null,
    });

    // State to track rows to be highlighted after clicking "OK"
    const [highlightedRows, setHighlightedRows] = useState([]);

    // State to store the CV count
    const [cvCount, setCvCount] = useState(null);

    // Memoize unique values to prevent recalculating them on every render
    const uniqueValues = useMemo(() => {
        return {
            source: [...new Set(data.map(item => item.source))],
            client: [...new Set(data.map(item => item.client))],
            SPOC: [...new Set(data.map(item => item.SPOC))],
            skill: [...new Set(data.map(item => item.skill))],
            Remarks: [...new Set(data.map(item => item.Remarks))],
        };
    }, [data]);

    // Handle selection/deselection in each column
    const handleSelection = (columnKey, value) => {
        setSelectedValues(prevSelectedValues => ({
            ...prevSelectedValues,
            [columnKey]: prevSelectedValues[columnKey] === value ? null : value
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        const isAnyValueSelected = Object.values(selectedValues).some(value => value !== null);
        if (!isAnyValueSelected) {
            alert('Please select at least one value to shortlist CVs.');
            return;
        }

        const matchedRows = data.filter(row =>
            Object.entries(selectedValues).every(([key, selectedValue]) =>
                selectedValue === null || row[key] === selectedValue
            )
        );

        setHighlightedRows(matchedRows);

        // Construct query string for API call
        const queryString = Object.entries(selectedValues)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        // Fetch unique contacts count based on selected values
        fetch(`https://datamaze-excel.onrender.com/get-unique-contacts-count/?${queryString}`)
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.error('Error fetching unique contact count:', result.error);
                } else {
                    setCvCount(result.unique_contacts_count);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Determine if a value should be highlighted
    const isHighlighted = (columnKey, value) => {
        return selectedValues[columnKey] === value || highlightedRows.some(row => row[columnKey] === value);
    };

    return (
        <div className="results-container">
            {data.length > 0 && (
                <div className="scrolling-container">
                    {/* Columns */}
                    {Object.keys(uniqueValues).map((key, index) => (
                        <div key={index} className={`box${index + 1}`}>
                            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                            <div className="value-container">
                                {uniqueValues[key].map((value, idx) => (
                                    <div
                                        key={idx}
                                        className={`value-box ${isHighlighted(key, value) ? 'highlight' : ''}`}
                                        onClick={() => handleSelection(key, value)}
                                    >
                                        {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Action Button */}
                    <div className="button-container">
                        <button
                            onClick={handleSubmit}
                            disabled={!Object.values(selectedValues).some(value => value !== null)}
                        >
                            OK
                        </button>
                    </div>

                    {/* CV Count Display */}
                    <h3 className='cv'>Total CV's Count:</h3>
                    {cvCount !== null && (
                        <div className="cv-count">
                            <h3>{cvCount}</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
