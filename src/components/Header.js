import React from "react";
import {
    Container,
    Navbar,
    Nav,
    Image,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/header.css";
const notify = () => toast("Has presionado el botón");

const Header = ({ setSearchTitle }) => {
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <Navbar className="no-select" bg="dark" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/">
                        <Image src="img/logo.png" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
                <Navbar.Collapse id="navbarScroll" className="">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px", color: "white" }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} className="text-white fw-bold" to="/">
                            Home
                        </Nav.Link>
                        <NavDropdown
                            title={"Submenu"}
                            className="fw-bold "
                            id="nav-dropdown"
                        >
                            <NavDropdown.Item href="#">Option 1</NavDropdown.Item>
                            <NavDropdown.Item href="#">Option 2</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {token ? (
                            <>
                                <Button
                                    className="ml-auto mx-2"
                                    variant="secondary"
                                    as={Link}
                                    to="/create"
                                >
                                    Crear
                                </Button>
                                <Button
                                    variant="info"
                                    className="mx-2"
                                    as={Link}
                                    to="/userDashboard"
                                    block
                                >
                                    Perfil
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="primary"
                                    className="mx-2"
                                    as={Link}
                                    to="/login"
                                    block
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="success"
                                    className="mx-2"
                                    as={Link}
                                    to="/signUp"
                                    block
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    variant="warning"
                                    className="mx-2"
                                    as={Link}
                                    to=""
                                    block
                                    onClick={notify}
                                >
                                    React-Toastify
                                </Button>{" "}
                                <ToastContainer className="mt-5" />
                            </>
                        )}
                        {token && 

<Button
variant="danger"
className="mx-2"
onClick={handleLogout}
block
>
logOut</Button>    }                </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className=""
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
