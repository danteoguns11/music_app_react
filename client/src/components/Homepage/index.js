import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DarkMode from '../DarkMode';

const HomePage = () => {

    return (
        <main>

            <div style={{ transform: 'translate(0vh, 15vh)' }}>
                <DarkMode />
            </div>

            <Button as={Link} to="/dashboard" variant="light" style={{ transform: 'translate(0vh, 70vh)' }}>Enter &rarr;</Button>
        </main>
    );
};

export default HomePage;
