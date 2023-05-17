import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import { ViewTracks } from './ViewTracks'
import tracks from '../data.json' //https://www.billboard.com/lists/2022-best-hip-hop-songs/


export function Homepage() {
    return (
        <Container>
            <Row className='justify-content-center'>
                {tracks.map((track) => (
                    <Col xs={6} className='mb-5' key={track.id}>
                        <ViewTracks key={track.id} track={track} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Homepage
