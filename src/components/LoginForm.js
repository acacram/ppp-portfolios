import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log('Login successful');
                // Redirige al usuario a www.google.es
                window.location.href = 'http://localhost:3001/';
            } else {
                console.error('Login failed');
                // Muestra un mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Muestra un mensaje de error al usuario
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h3 className="text-center">Login</h3>
                        </Card.Header>
                        <Card.Body>
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
                                <Button type="submit" variant="success" block>Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
