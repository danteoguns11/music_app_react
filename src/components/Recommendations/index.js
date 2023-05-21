import React from 'react';
import { Container, Row, Card, Badge } from 'react-bootstrap';

function Recommendations({ recommendations, formatApiDate }) {
    return (
        <>
            <Container>
                <h2 className='mb-4 font-weight-bold'>Random Recommendations</h2>
            </Container>
            <Row className='row row-cols-4'>
                {recommendations.map((recommendation, i) => {
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
