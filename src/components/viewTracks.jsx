import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, HeartFill } from 'react-bootstrap-icons';

export function ViewTracks({ track }) {

    const navigate = useNavigate();
    const [liked, setLiked] = useState(track.liked);

    const selectTrack = () => {
        navigate(`/details/${track.id}`);
    };

    const isLiked = () => {
        setLiked(!liked);
    };

    return (
        <Card className='h-100 shadow-sm bg-white rounded'>
            <Card.Img variant='top' src={track.image} />
            <Card.Body className='d-flex flex-column'>
                <div className='d-flex mb-2 justify-content-between'>
                    <Card.Title>{track.track || "No Track Found"}</Card.Title>
                    {liked ? (
                        <HeartFill className="heart-icon" color="red" onClick={isLiked} />
                    ) : (
                        <Heart className="heart-icon" onClick={isLiked} />
                    )}
                </div>
                <Card.Text>Artist: {track.artist || "No Artist Found"}</Card.Text>
                <Card.Text>Featuring: {track.featuring || "No Featuring Artist"}</Card.Text>
                <Card.Text>Genre: {track.type || "No Genre Found"}</Card.Text>
                <Link to={`/details/${track.id}`}>
                    <Button
                        className='mt-auto font-weight-bold btn-right'
                        variant='success'
                        onClick={selectTrack}
                    >
                        Find Out More
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    )
}
