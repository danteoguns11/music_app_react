import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { NavBar } from './components/NavBar'
import { Homepage } from './components/Homepage'
import { ShowTrack } from './components/ShowTrack'
import tracks from './data.json'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Homepage />} />
          <Route path="/details/:trackId" element={<ShowTrack tracks={tracks} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
