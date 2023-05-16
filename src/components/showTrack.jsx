import React, { useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Heart, HeartFill } from 'react-bootstrap-icons';

import tracks from '../data.json'

export function ShowTrack({ tracks }) {
    const { trackId } = useParams();
    const selectedTrack = tracks && tracks.find((track) => track.id === parseInt(trackId));

    const navigate = useNavigate();
    const [liked, setLiked] = useState(selectedTrack.liked);

    const backBtn = () => {
        navigate('/');
    };

    const isLiked = () => {
        setLiked(!liked);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={8}>
                    <Card className='h-100 shadow-sm bg-white rounded'>
                        <Card.Img variant='top' src={selectedTrack.image} />
                        <Card.Body className='d-flex flex-column'>
                            <div className='d-flex mb-2 justify-content-between'>

                                <Card.Title>{selectedTrack.track || "No Track Found"}</Card.Title>
                                {liked ? (
                                    <HeartFill className="heart-icon" color="red" onClick={isLiked} />
                                ) : (
                                    <Heart className="heart-icon" onClick={isLiked} />
                                )}
                            </div>
                            <Card.Text>Artist: {selectedTrack.artist || "No Artist Found"}</Card.Text>
                            <Card.Text>Featuring: {selectedTrack.featuring || "No Featuring Artist"}</Card.Text>
                            <Card.Text>Genre: {selectedTrack.type || "No Genre Found"}</Card.Text>
                            <Card.Text>Description: {selectedTrack.info || "No Info Found"}</Card.Text>
                            <Link to={`/`}>
                                <Button
                                    id='backBtn'
                                    className='mt-auto font-weight-bold'
                                    variant='success'
                                    onClick={backBtn}
                                >
                                    Back
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
