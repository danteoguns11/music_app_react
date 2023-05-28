import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <main>
            <Container className="text-center mt-5">
                <h1>Welcome to My Website</h1>
                <p>Explore and enjoy our amazing features!</p>
                <Button as={Link} to="/login" variant="primary">Login</Button>
            </Container>
        </main>
    );
};

export default HomePage;
