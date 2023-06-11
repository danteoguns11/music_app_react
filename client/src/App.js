import React from 'react';
// eslint-disable-next-line
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Homepage from './components/Homepage'
import Dashboard from './components/Dashboard'
// import AlbumSearch from './components/AlbumSearch';
// import Recommendations from './components/Recommendations';
import Login from './components/Login'
import Register from './components/Register';

function App() {
    // eslint-disable-next-line
    const isAuthenticated = localStorage.getItem('token');

    return (
        <>

            <Routes>
                <Route path="/" element={<Homepage />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* <Route path="/" element={<Homepage />}>
                    <Route path="/album-search" element={<AlbumSearch />} />
                </Route> */}
            </Routes>
        </>
    );
}

export default App
