import React from 'react';
import { Container, Row, Card, ListGroup, Accordion } from 'react-bootstrap';

function AlbumSearch({ albums, genre, formatApiDate }) {
    const checkDuplicateAlbum = (albumName, index) => {
        return albums.findIndex((album, i) => i !== index && album.name === albumName) !== -1;
    };

    return (
        <Container className="album-search">
            <h3 className='mb-4 font-weight-bold'>Album Search</h3>
            <Row className="row row-cols-4">
                {albums.map((album, i) => {
                    const albumName = album.name;
                    const isDuplicate = checkDuplicateAlbum(albumName, i);

                    if (isDuplicate && i !== albums.findIndex((item) => item.name === albumName)) {
                        return null;
                    }

                    return (
                        <Card key={i} className="mx-auto mb-4">
                            <Card.Img src={album.images[0].url} />
                            <Card.Body>
                                <Card.Title className='artist-name'>{album.artists[0].name} </Card.Title>
                                <Card.Title>{albumName} </Card.Title>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Genres</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup as="ol" numbered>
                                                {genre.map((genres, genreIndex) => (
                                                    <ListGroup.Item key={genreIndex} as="li">
                                                        {genres}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Tracks No.</Accordion.Header>
                                        <Accordion.Body>{album.total_tracks}</Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Release Date:</Accordion.Header>
                                        <Accordion.Body>{formatApiDate(album.release_date)}</Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </Container>
    );
}

export default AlbumSearch;
