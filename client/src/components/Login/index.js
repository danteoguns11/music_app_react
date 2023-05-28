import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        };

        try {
            const response = await fetch("https://soundsafari-api.onrender.com/users/login", options);
            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('authenticated', data.authenticated);
                navigate('/dashboard'); // Navigate to the homepage after successful login
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container no-scroll">
            <Button as={Link} to="/dashboard" variant="light" style={{ transform: 'translate(0vh, 25vh)' }}>Back</Button>
            <div className="row">
                <div className="col-md-5 mx-auto d-flex justify-content-center vh-100 align-items-center">
                    <div className="card card-body" id="login-card">
                        <div className="login-top">
                            <img src={logo} alt="logo" width="100px" />
                            <h2>Login</h2>
                        </div>
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="username" className="form-group required">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="form-group required">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <div className="pt-2 d-grid gap-2 col-12 mx-auto">
                                <Button variant="primary" type="submit">
                                    Log in
                                </Button>
                            </div>
                        </Form>

                        <p className="small-xl pt-3 text-center">
                            <span className="text-muted">No account?</span>
                            <Link to="/register">Sign up here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
