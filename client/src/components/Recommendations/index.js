import React from 'react';
import { Container, Row, Card, Badge } from 'react-bootstrap';

function Recommendations({ recommendations, formatApiDate }) {
    const checkDuplicateAlbum = (albumName, index) => {
        return recommendations.findIndex((recommendation, i) => i !== index && recommendation.name === albumName) !== -1;
    };

    return (
        <>
            <Container id='cant-decide'>
                <h2 className='mb-4 font-weight-bold'>Recommended Albums</h2>
                <p>Can't decide what to listen to and want some recommended albums? Click on the Swing to choose a random genre</p>
            </Container>
            <Row className='row row-cols-4'>
                {recommendations.map((recommendation, i) => {
                    const albumName = recommendation.album.name;
                    const isDuplicate = checkDuplicateAlbum(albumName, i);

                    if (isDuplicate && i !== recommendations.findIndex((item) => item.album.name === albumName)) {
                        return null;
                    }
                    return (
                        <Card key={i} className='mx-auto mb-4'>
                            <Card.Title className='artist-name'>{recommendation.album.artists[0].name} </Card.Title>
                            <Card.Img src={recommendation.album.images[0].url} />
                            <Card.Body>
                                <Card.Title>
                                    <Badge bg="secondary" className='gold-badge'>#{recommendation.popularity}</Badge>
                                    {recommendation.album.name}
                                </Card.Title>
                                <Card.Text>Release Date: {formatApiDate(recommendation.album.release_date)}</Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </>
    );
}

export default Recommendations;
