import React from 'react';
import { Navbar, InputGroup, FormControl, Button } from 'react-bootstrap'
import logo from '../../assets/logo.png'

const NavBar = ({ onSearch, onInputChange }) => {

    const refreshBtn = () => {
        window.location.reload(false);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <img src={logo} alt="Music App Logo" className="logo" style={{ width: "4%" }} />
                <Navbar.Brand onClick={refreshBtn}>SoundSafari</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Button
                        className='mx-2'
                        variant='success'
                        onClick={refreshBtn}
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
                            required
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
