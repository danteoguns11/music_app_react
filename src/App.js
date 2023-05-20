// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'

const CLIENT_ID = '879b5f48f7a245dea88f82a12a28e328'
const CLIENT_SECRET = '5d35364f85234b09a9bda371b0f95bc2'

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [genre, setGenre] = useState([]);


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

  // Search
  async function search() {
    console.log('Searching For', searchInput) // Chris Brown

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

    let artistGenre = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { setGenre(data.artists.items[0].genres?.[0]) })

    console.log('console genre', genre)

    // GET request with Artist ID grab all the albums from that artist
    let returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbums(data.items)
      })

    // Display those albums to the user
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
      <Container>
        <Row className='mx-2 row row-cols-4'>
          {albums.map((album, i) => {
            return (
              <Card key={i}>
                <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title className='gold'>{album.artists[0].name} </Card.Title>
                  <Card.Title>{album.name} </Card.Title>
                  <Card.Text>Genre: {genre} </Card.Text>
                  <Card.Text>Amount of Tracks: {album.total_tracks} </Card.Text>
                  <Card.Text>Release Date: {album.release_date} </Card.Text>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
