import React from 'react';
import { Navbar, InputGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const NavBar = ({ onSearch, onInputChange }) => {

    const recommendBtn = () => {
        window.location.reload(false);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <img src={logo} alt="Music App Logo" className="logo" style={{ width: "4%" }} />
                <Navbar.Brand as={Link} to="/">SoundSafari</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Button
                        className='mx-2'
                        variant='success'
                        onClick={recommendBtn}
                    >
                        Recommendations
                    </Button>

                    <InputGroup className='mx-3' size='lg'>
                        <FormControl
                            placeholder='Search For Artist'
                            type='input'
                            onKeyUp={event => {
                                if (event.key === 'Enter') {
                                    onSearch();
                                }
                            }}
                            onChange={event => {
                                onInputChange(event.target.value)
                            }}
                        />

                        <Button onClick={onSearch}>
                            Search
                        </Button>
                    </InputGroup>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar
