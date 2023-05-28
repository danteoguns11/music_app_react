import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
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
            const response = await fetch("https://soundsafari-api.onrender.com/users/register", options);
            const data = await response.json();

            if (response.status === 201) {
                navigate('/login'); // Navigate to the login page after successful registration
            } else {
                // Handle registration error
                alert(data.error);
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container no-scroll">
            <div className="row">
                <div className="col-md-5 mx-auto d-flex justify-content-center vh-100 align-items-center">
                    <div className="card card-body" id="register-card">
                        <div className="register-top">
                            <img src={logo} alt="logo" width="100px" />
                            <h2 className='log-register'>Register</h2>
                        </div>
                        <Form onSubmit={handleRegister}>
                            <Form.Group controlId="username" className="form-group usern">
                                {/* <Form.Label>Username:</Form.Label> */}
                                <Form.Control
                                    type="text"
                                    value={username}
                                    placeholder='Username'
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{
                                        textAlign: 'center'
                                    }}
                                    required
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="form-group pass">
                                {/* <Form.Label>Password:</Form.Label> */}
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        textAlign: 'center'
                                    }}
                                    required
                                />
                            </Form.Group>

                            <div className="pt-2 d-grid gap-2 col-12 mx-auto">
                                <Button className='login-btn' variant="primary" type="submit">
                                    Register
                                </Button>
                            </div>
                        </Form>

                        <p className="small-xl pt-3 text-center">
                            <span className="switch-link">Already registered? </span>
                            <Link to="/login"
                                className="switch-link">Log in here</Link>
                        </p>

                        <Button as={Link} to="/dashboard" className='home-btn' variant="light">&larr; Home</Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
