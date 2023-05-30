import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import SpotifyWebApi from "spotify-web-api-node";

import NavBar from '../NavBar';
import AlbumSearch from '../AlbumSearch';
import Recommendations from '../Recommendations';

// eslint-disable-next-line
import Player from '../Player';
import WebPlayback from '../WebPlayback';

// eslint-disable-next-line
import useAuth from '../useAuth';


const CLIENT_ID = '91aaec1dc7f74b32a8e53eed4e4a2ef2'
const CLIENT_SECRET = 'bd9b0232092444519eb474381e5968bc'

// eslint-disable-next-line
const spotifyApi = new SpotifyWebApi({
    clientId: "91aaec1dc7f74b32a8e53eed4e4a2ef2",
});

function Dashboard({ code }) {
    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [albums, setAlbums] = useState([]);
    const [genre, setGenre] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
    const [loading, setLoading] = useState(false);

    const [playingTrack, setPlayingTrack] = useState();

    useEffect(() => {
        // API Access Token
        let authParameters = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, []);

    useEffect(() => {
        // Fetch recommendations when access token is available
        if (accessToken) {
            let searchParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
            };

            console.log('in useEffect', accessToken);

            // eslint-disable-next-line
            fetch('https://api.spotify.com/v1/recommendations?limit=24&market=GB&seed_genres=r-n-b', searchParameters)
                .then(response => response.json())
                .then(data => {
                    setRecommendations(data.tracks.sort((a, b) => b.popularity - a.popularity));
                    setLoading(false);
                });
        }
    }, [accessToken]);

    async function searchBar() {
        setIsSearchButtonClicked(true);

        // GET request using search to get the Artist ID
        let searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        }

        // Chris B: 7bXgB6jMjp9ATFy66eO08Z
        let artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => {
                setLoading(true)
                return response.json()
            })
            .then(data => {
                return data.artists.items[0].id
            })

        // GET request with Artist ID to grab all the albums from that artist
        // eslint-disable-next-line
        let returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=GB&limit=50', searchParameters)
            .then(response => {
                setLoading(true)
                return response.json()
            })
            .then(data => {
                setAlbums(data.items)
                setLoading(false)
            })

        // eslint-disable-next-line
        let findGenre = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => {
                setLoading(true)
                return response.json()
            })
            .then(data => {
                setGenre(data.artists.items[0].genres)
                setLoading(false)
            })
    }

    function formatApiDate(dateString) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    }

    function handleGenreSelection(selectedGenre) {
        const genreRecommendationsUrl = `https://api.spotify.com/v1/recommendations?limit=24&market=GB&seed_genres=${selectedGenre}&min_popularity=50`;

        fetch(genreRecommendationsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        })
            .then(response => response.json())
            .then(data => {
                setRecommendations(data.tracks.sort((a, b) => b.popularity - a.popularity));
                setLoading(false);
            });
    }

    return (
        <div className='App'>
            <NavBar onSearch={searchBar} onInputChange={setSearchInput} onGenreSelection={handleGenreSelection} />

            <Container style={{ transform: "translateY(10vh)" }}>

                {loading && <div className="alert alert-info" role="alert">
                    Loading...
                </div>}

                <div>
                    {/* <Player accessToken={accessToken} trackUri={playingTrack?.uri} /> */}

                    <WebPlayback accessToken={accessToken} />

                </div>

                {isSearchButtonClicked
                    ?
                    (
                        <AlbumSearch albums={albums} genre={genre} formatApiDate={formatApiDate} />
                    )
                    :
                    (
                        <Recommendations recommendations={recommendations} formatApiDate={formatApiDate} />
                    )
                }

            </Container>
        </div>
    );
}

export default Dashboard;
