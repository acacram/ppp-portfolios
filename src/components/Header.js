import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Navbar, Nav, Image, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <header className="bg-dark">
            <Navbar variant="dark" expand="lg" id="basic-nav">
                <Link to="/">
                    <Image src="img/logo.png" />
                </Link>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
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
