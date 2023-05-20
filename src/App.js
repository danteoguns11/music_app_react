import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, ListGroup, Accordion } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

const CLIENT_ID = '879b5f48f7a245dea88f82a12a28e328'
const CLIENT_SECRET = '5d35364f85234b09a9bda371b0f95bc2'

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [genre, setGenre] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  useEffect(() => {
    //API Access Token
    let authParameters = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  useEffect(() => {
    // Fetch recommendations when access token is available
    if (accessToken) {
      let searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
      }

      fetch('https://api.spotify.com/v1/recommendations' + '?limit=12&market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=rap&seed_tracks=0c6xIDDpzE81m2q797ordA', searchParameters)
        .then(response => response.json())
        .then(data => {
          setRecommendations(data.tracks)
          console.log('console recommendations', data)
        });
    }
  }, [accessToken]);

  async function search() {
    console.log('Searching For', searchInput) // Chris Brown
    setIsSearchButtonClicked(true);

    // GET request using search to get the Artist ID
    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
    }

    let artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id })

    // eslint-disable-next-line
    let findGenre = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { setGenre(data.artists.items[0].genres) })

    // GET request with Artist ID grab all the albums from that artist
    // eslint-disable-next-line
    let returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbums(data.items)
      })
  }

  function formatApiDate(dateString) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className='App'>
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl
            placeholder='Search For Artist'
            type='input'
            onKeyUp={event => {
              if (event.key === 'Enter') {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>

      {isSearchButtonClicked ? (
        <Container className='album-search'>
          <h1 className='mb-4 font-weight-bold'>Album Search</h1>
          <Row className='mx-2 row row-cols-4'>
            {albums.map((album, i) => {
              return (
                <Card key={i}>
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title className='gold'>{album.artists[0].name} </Card.Title>
                    <Card.Title>{album.name} </Card.Title>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Genres</Accordion.Header>
                        <Accordion.Body>
                          <ListGroup as="ol" numbered>
                            {genre.map((genres, genreIndex) =>
                              <ListGroup.Item key={genreIndex} as="li">{genres}</ListGroup.Item>
                            )}
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Tracks No.</Accordion.Header>
                        <Accordion.Body>
                          {album.total_tracks}
                        </Accordion.Body>
                      </Accordion.Item>

                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Release Date:</Accordion.Header>
                        <Accordion.Body>
                          {formatApiDate(album.release_date)}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              )
            })}
          </Row>
        </Container>
      ) : (
        <Container className='recommendations'>
          <Container>
            <h2 className='mb-4 font-weight-bold'>Random Recommendations</h2>
          </Container>
          <Row className='mx-2 row row-cols-4'>
            {recommendations.map((recommendation, i) => {
              return (
                <Card key={i}>
                  <Card.Title className='gold'>{recommendation.album.artists[0].name} </Card.Title>
                  <Card.Img src={recommendation.album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{recommendation.album.name} </Card.Title>
                    <Card.Text>Popularity#: {recommendation.popularity} </Card.Text>
                    <Card.Text>Release Date: {formatApiDate(recommendation.album.release_date)} </Card.Text>
                  </Card.Body>
                </Card>
              )
            })}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;
