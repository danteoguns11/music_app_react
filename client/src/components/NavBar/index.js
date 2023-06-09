import React, { useState, useRef } from 'react';
import { Navbar, SplitButton, Dropdown, InputGroup, FormControl, FloatingLabel, Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import shuffle from '../../assets/shuffle.png';
import DarkMode from '../DarkMode';

const NavBar = ({ onSearch, onInputChange, onGenreSelection }) => {
    const [selectedGenre, setSelectedGenre] = useState('');
    const isRandomGenreDisabled = !selectedGenre;
    const splitButtonRef = useRef(null);
    const navigate = useNavigate();

    const authenticated = localStorage.getItem("authenticated")


    const genreOptions = [
        'r-n-b',
        'hip-hop',
        'soul',
        'rock',
        'pop',
        'gospel',
        'jazz',
        'reggae',
        'reggaeton',
        'country',
        'dance',
        'classical',
        'blues',
        'k-pop',
    ];

    const moodOptions = [
        'summer',
        'chill',
        'work-out',
        'sleep',
        'study',
        'rainy-day'
    ];

    const refreshBtn = () => {
        window.location.reload(false);
    };

    // eslint-disable-next-line
    function handleSearch(e) {
        e.preventDefault();
        onSearch();
    }

    function handleInputChange(e) {
        onInputChange(e.target.value);
    }

    function handleGenreSelection(genre) {
        setSelectedGenre(genre);
        onGenreSelection(genre);
    }

    function handleRandomGenre() {
        const randomGenre = genreOptions[Math.floor(Math.random() * genreOptions.length)];
        setSelectedGenre(randomGenre);
        onGenreSelection(randomGenre);
    }

    // eslint-disable-next-line
    function handleSplitButtonClick() {
        splitButtonRef.current.click();
    }

    function handleOriginalStateClick() {
        if (!selectedGenre) {
            handleRandomGenre();
        }
    }

    const renderRandomiseTooltip = () => {
        if (isRandomGenreDisabled) {
            return <Tooltip id="randomise-tooltip">Select a genre to enable randomisation</Tooltip>;
        } else {
            return <Tooltip id="randomise-tooltip">Click to randomise the current genre</Tooltip>;
        }
    };

    const handleLogin = () => {
        if (authenticated) {
            localStorage.removeItem('authenticated');
            navigate('/dashboard');
        } else {
            navigate('/login')
        }
    }

    const handleLogo = () => {
        navigate('/');
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" className="nav-bar" fixed="top">
                <img src={logo} alt="Music App Logo" className="logo" style={{ width: '4%' }} onClick={handleLogo} />
                <Navbar.Brand onClick={refreshBtn}>SoundSafari</Navbar.Brand>

                {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

                <Button as={Link} to='/login' className='gradient-btn' variant="primary" type="button" onClick={handleLogin}>
                    {!authenticated && <span>Login</span>}
                    {authenticated && <span>Logout</span>}
                </Button>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <InputGroup className="mx-8 form-width" size="lg">
                        <FloatingLabel controlId="search-input" label="Swing Through The Music Jungle | Search For An Artist">
                            <FormControl
                                placeholder="Swing Through The Music Jungle | Search For An Artist"
                                type="search"
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        onSearch();
                                    }
                                }}
                                onChange={handleInputChange}
                                style={{
                                    textAlign: 'center'
                                }}
                                required
                                autoFocus
                            />
                        </FloatingLabel>
                        <Button variant="outline-warning" onClick={onSearch}>Search</Button>
                    </InputGroup>

                    <SplitButton
                        variant="warning"
                        className="capitalise"
                        title={
                            selectedGenre ? (
                                <>
                                    <span className="capitalise">{selectedGenre}</span>
                                </>
                            ) : (
                                <>
                                    <span className="swing" onClick={handleOriginalStateClick}>
                                        Swing
                                    </span>
                                    <img src={shuffle} alt="shuffle recommendations" className="shuffle-icon" style={{ width: '25%' }} />
                                </>
                            )
                        }
                        onSelect={handleGenreSelection}
                        ref={splitButtonRef}
                    >
                        <OverlayTrigger
                            placement="left"
                            overlay={renderRandomiseTooltip()}
                        >
                            <span>
                                <Dropdown.Item eventKey={selectedGenre} onSelect={handleRandomGenre} disabled={isRandomGenreDisabled}>
                                    <>
                                        <span className="swing">Randomise</span>
                                        <span>
                                            <img src={shuffle} alt="shuffle recommendations" className="shuffle-icon" style={{ width: '17%' }} />
                                        </span>
                                    </>
                                </Dropdown.Item>
                            </span>
                        </OverlayTrigger>
                        <Dropdown.Divider />
                        {genreOptions.map((genre) => (
                            <Container className="genre-container" key={genre}>
                                <Dropdown.Item key={genre} eventKey={genre}>
                                    {genre}
                                </Dropdown.Item>
                            </Container>
                        ))}

                        <Dropdown.Divider />
                        <Dropdown.Item disabled>
                            MOODS
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        {moodOptions.map((genre) => (
                            <Container className="genre-container" key={genre}>
                                <Dropdown.Item key={genre} eventKey={genre}>
                                    {genre}
                                </Dropdown.Item>
                            </Container>
                        ))}
                    </SplitButton>

                    <DarkMode />

                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default NavBar;
