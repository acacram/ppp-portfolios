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
        <header className="bg-dark sticky-top d-flex justify-content-center w-100">
            <Navbar variant="dark"  id="basic-nav">
                <Link to="/">
                    <Image src="img/logo.png" />
                </Link>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Submenu" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Option 1</NavDropdown.Item>
                            <NavDropdown.Item href="#">Option 2</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button variant="primary" onClick={handleLogin}>Login</Button>
                    <Form inline className="navbar-nav ">
                        <FormControl type="search" placeholder="Search" className="" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header;
