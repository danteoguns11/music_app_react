import React, { useState, useRef } from 'react';
import { Navbar, SplitButton, Dropdown, InputGroup, FormControl, Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import shuffle from '../../assets/shuffle.png';

const NavBar = ({ onSearch, onInputChange, onGenreSelection }) => {
    const [selectedGenre, setSelectedGenre] = useState('');
    const isRandomGenreDisabled = !selectedGenre;
    const splitButtonRef = useRef(null);

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

    return (
        <>
            <Navbar bg="dark" variant="dark" className="nav-bar">
                <img src={logo} alt="Music App Logo" className="logo" style={{ width: '4%' }} />
                <Navbar.Brand onClick={refreshBtn}>SoundSafari</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <InputGroup className="mx-8 form-width" size="lg">
                        <FormControl
                            placeholder="Search For Artist"
                            type="search"
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    onSearch();
                                }
                            }}
                            onChange={handleInputChange}
                            required
                        />
                        <Button onClick={onSearch}>Search</Button>
                    </InputGroup>

                    <SplitButton
                        variant="success"
                        className="capitalise"
                        title={
                            selectedGenre ? (
                                <>
                                    <span className="capitalise">{selectedGenre}</span>
                                </>
                            ) : (
                                <>
                                    <p className="swing" onClick={handleOriginalStateClick}>
                                        Swing
                                    </p>
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
                                        <span>
                                            <img src={shuffle} alt="shuffle recommendations" className="shuffle-icon" style={{ width: '17%' }} />
                                        </span>
                                        <span className="swing">Randomise</span>
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
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default NavBar;
