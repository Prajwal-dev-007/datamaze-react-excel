import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Create from './Components/Create';
import DataTable from './Components/DataTable';
import Upload from './Components/Upload';
import InsertPage from './Components/InsertPage';

import SearchResults from './Components/SearchResults';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Create />} />
                <Route path="/search-results" element={<SearchResults />} />
                
                <Route path="/data-table" element={<DataTable />} />
                <Route path="/full-table" element={<Upload/>} />
                <Route path="/insert" element={<InsertPage />} />
            </Routes>
        </Router>
    );
}


