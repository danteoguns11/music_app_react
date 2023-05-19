import { Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'

export function NavBar() {
    return (
        <>
            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
            <Navbar bg="dark" variant="dark">
                <img src={logo} alt="Music App Logo" className="logo" style={{ width: "3%" }} />
                <Navbar.Brand href="/">Music App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Top 4</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
        </>
    );
}
