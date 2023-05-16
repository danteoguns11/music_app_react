import React, { useState } from 'react';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import { Header } from './components/Header'
import { ViewTracks } from './components/viewTracks'
import { ShowTrack } from './components/showTrack'
import tracks from './data.json' //https://www.billboard.com/lists/2022-best-hip-hop-songs/

function App() {
  return (
    <Router>
      <>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:trackId" element={<ShowTrack tracks={tracks} />} />
          </Routes>
        </Container>
      </>
    </Router>
  );
}

function HomePage() {
  return (
    <Row>
      {tracks.map((track) => (
        <Col xs={6} className='mb-5' key={track.id}>
          <ViewTracks key={track.id} track={track} />
        </Col>
      ))}
    </Row>
  );
}

export default App
