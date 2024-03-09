import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../Styles/App.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

/**
 * Componente funcional que representa el formulario de inicio de sesión.
 *
 * @component
 * @example
 * // Ejemplo de uso:
 * import LoginForm from './LoginForm';
 * const App = () => {
 *   return (
 *     <div>
 *       {/* Otras partes de la aplicación *\/}
 *       <LoginForm />
 *     </div>
 *   );
 * }
 */
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Si hay un token en el almacenamiento local, redirige al usuario a la página de inicio
      navigate("/");
    }
  }, [navigate]);

  /**
   * Maneja el evento de inicio de sesión del usuario.
   * @function
   * @param {Object} e - El evento de formulario.
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); //token
        navigate("/"); // Redirige al usuario a la página de inicio

        Toastify({
          text: "Inicio de sesión exitoso",
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
      } else {
        // Manejo de errores
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header>
                <h3 className="text-center">Login</h3>
              </Card.Header>
              <Card.Body>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <Form onSubmit={handleLogin}>
                  <Form.Group>
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    className="mt-3"
                    type="submit"
                    variant="success"
                    block
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;
