/*
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

                    <div className="button-container">
                        <button
                            onClick={handleSubmit}
                            disabled={!Object.values(selectedValues).some(value => value !== null)}
                        >
                            OK
                        </button>
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




/*
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

    // State to store the CV count by each Remarks type
    const [remarksCounts, setRemarksCounts] = useState(null);

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
        fetch(`http://localhost:8000/get-unique-contacts-count/?${queryString}`)
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.error('Error fetching unique contact count:', result.error);
                } else {
                    // Set the counts for each unique "Remarks" type
                    setRemarksCounts(result.remarks_counts);
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

                  
                    <div className="button-container">
                        <button
                            onClick={handleSubmit}
                            disabled={!Object.values(selectedValues).some(value => value !== null)}
                        >
                            OK
                        </button>
                    </div>

                    
                 
                    {remarksCounts !== null && (
                        <div className = 'cv'>
                            {Object.entries(remarksCounts).map(([remark, count]) => (
                                <div key={remark}>
                                    <strong>{remark}:</strong> {count}
                                </div>
                            ))}
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
    
    // State to store the CV count by each Remarks type
    const [remarksCounts, setRemarksCounts] = useState(null);

    // State to control hiding non-highlighted values
    const [hideNonHighlighted, setHideNonHighlighted] = useState(false);

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
        setHideNonHighlighted(true); // Hide non-highlighted values after clicking OK

        // Construct query string for API call
        const queryString = Object.entries(selectedValues)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        // Fetch unique contacts count based on selected values
        fetch(`http://localhost:8000/get-unique-contacts-count/?${queryString}`)
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.error('Error fetching unique contact count:', result.error);
                } else {
                    // Set the counts for each unique "Remarks" type
                    setRemarksCounts(result.remarks_counts);
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
                                    // Conditionally render only highlighted values if hideNonHighlighted is true
                                    (!hideNonHighlighted || isHighlighted(key, value)) && (
                                        <div
                                            key={idx}
                                            className={`value-box ${isHighlighted(key, value) ? 'highlight' : ''}`}
                                            onClick={() => handleSelection(key, value)}
                                        >
                                            {value}
                                        </div>
                                    )
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
                    {remarksCounts !== null && (
                        <div className="cv">
                            {Object.entries(remarksCounts).map(([remark, count]) => (
                                <div key={remark}>
                                    <strong>{remark}:</strong> {count}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
