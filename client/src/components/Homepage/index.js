import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DarkMode from '../DarkMode';
import SpotifyButton from '../SpotifyButton';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (storedUserLoggedIn === '1') setIsLoggedIn(true);
    }, []);

    const loginHandler = () => {
        sessionStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <main>

            <div style={{ transform: 'translate(0vh, 15vh)' }}>
                <DarkMode />
            </div>

            {!isLoggedIn ?
                <SpotifyButton onLogin={loginHandler} />
                :
                <Button as={Link} to="/dashboard" variant="light" style={{ transform: 'translate(0vh, 70vh)' }}>Enter &rarr;</Button>
            }        </main>
    );
};

export default HomePage;
