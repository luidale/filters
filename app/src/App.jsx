import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilterList from './FilterList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<FilterList/>}/>
            </Routes>
        </Router>
    )
}

export default App;