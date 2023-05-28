import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <main style={{ transform: 'translate(0vh, 70vh)' }}>
            <Button as={Link} to="/dashboard" variant="light">Enter</Button>
        </main>
    );
};

export default HomePage;
