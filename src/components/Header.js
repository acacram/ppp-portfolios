// Navbar.js
import React from 'react';
import { Navbar, Nav, Image, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useHistory } from 'react-router-dom';

const Header = () => {

    const history = useHistory();
    const handleLogin = () => {
        history.push('/login');
    };

    return (
        <header className="bg-dark">
            <Navbar variant="dark" expand="lg" id="basic-nav">
                <Image src="img/logo.png" />
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <NavDropdown title="Submenu" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Option 1</NavDropdown.Item>
                            <NavDropdown.Item href="#">Option 2</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button variant="primary" onClick={handleLogin}>Login</Button>
                    <Form inline className="navbar-nav ms-auto">
                        <FormControl type="search" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header;
