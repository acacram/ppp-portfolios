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
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";

/**
 * Componente funcional que representa el encabezado de la aplicación.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.setSearchTitle - Función para establecer el título de búsqueda.
 * @example
 * // Ejemplo de uso:
 * import Header from './Header';
 * const App = () => {
 *   const setSearchTitle = (title) => {
 *     // Lógica para establecer el título de búsqueda
 *   };
 *   return (
 *     <div>
 *       {/* Otras partes de la aplicación *\/}
 *       <Header setSearchTitle={setSearchTitle} />
 *     </div>
 *   );
 * }
 */
const Header = ({ setSearchTitle }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /**
   * Maneja el cierre de sesión del usuario.
   * @function
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");

    Toastify({
      text: "Se ha cerrado la sesión correctamente",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      className: "info",
      position: "center",
      gravity: "top",
      top: "120px",
      offset: {
        x: 0,
        y: 45,
      },
      duration: 2000,
    }).showToast();
  };

  return (
    <Navbar className="no-select" bg="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <Image src="resources/logo.png" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
        <Navbar.Collapse id="navbarScroll" className="">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", color: "white" }}
            navbarScroll
          >
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
              </>
            )}
            {token && (
              <Button
                variant="danger"
                className="mx-2"
                onClick={handleLogout}
                block
              >
                Log Out
              </Button>
            )}{" "}
          </Nav>
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
