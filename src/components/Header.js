import React from 'react';
import { Navbar, Nav, Image, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const notify = () => toast("Has presionado el botón");
const Header = () => {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        // Limpiar la sesión del usuario (eliminar el token del localStorage)
        localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio
        window.location.href = '/';
    };

    return (
        <header className="bg-dark sticky-top d-flex justify-content-center w-100">
            <Navbar variant="dark" id="basic-nav">
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
                    {token ? (
                        <>
                            <Button className="ml-auto" variant="secondary" as={Link} to="/create">Crear</Button>
                            <Button variant="info" as={Link} to="/userDashboard" block>Perfil</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="primary" as={Link} to="/login" block>Login</Button>
                            <Button variant="success" as={Link} to="/signUp" block>Sign Up</Button>
                            <Button variant="warning" as={Link} to="" block onClick={notify}>React-Toastify</Button>
                            <ToastContainer />
                        </>
                    )}
                    <Form inline className="navbar-nav">
                        <FormControl type="search" placeholder="Search" className="" />
                        <Button className="ms-4" variant="outline-success">Buscar</Button>
                        {token ? (
                            <Button variant="danger" onClick={handleLogout} block>Logout</Button>
                        ) : (
                            <>
                                {/* Puedes agregar más elementos aquí si es necesario */}
                            </>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}


export default Header;
