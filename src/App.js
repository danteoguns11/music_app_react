import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Homepage from './components/Homepage'
import AlbumSearch from './components/AlbumSearch';
import Recommendations from './components/Recommendations';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />}>
                    <Route path="/album-search" element={<AlbumSearch />} />
                </Route>
            </Routes>
        </>
    );
}

export default App
