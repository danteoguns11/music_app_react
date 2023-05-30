import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Homepage from './components/Homepage'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register';

const code = new URLSearchParams(window.location.search).get("code")

function App() {
    return (
        <>
            <div id="App">
                <Routes>
                    <Route path="/" element={<Homepage />} />

                    <Route path="/dashboard" element={<Dashboard code={code} />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                </Routes>
            </div>
        </>
    );
}

export default App
