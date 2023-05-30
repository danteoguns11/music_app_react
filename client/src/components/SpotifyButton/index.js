import React from 'react'
import { Button } from 'react-bootstrap';


const SpotifyButton = (onLogin) => {
    const AUTH_URL =
        "https://accounts.spotify.com/authorize?client_id=91aaec1dc7f74b32a8e53eed4e4a2ef2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

    return (
        <>
            <div>
                <Button
                    variant='light'
                    style={{ transform: 'translate(0vh, 70vh)' }}
                    href={AUTH_URL}
                    onClick={() => onLogin.onLogin()}
                >Login with Spotify</Button>
            </div>
        </>
    );
}

export default SpotifyButton
