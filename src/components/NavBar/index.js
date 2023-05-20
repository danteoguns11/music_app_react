import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

function NavBar() {
    return (
        <>
            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
            <Navbar bg="dark" variant="dark">
                <img src={logo} alt="Music App Logo" className="logo" style={{ width: "4%" }} />
                <Navbar.Brand as={Link} to="/">SoundSafari</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Recommendations</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
        </>
    );
}

export default NavBar
