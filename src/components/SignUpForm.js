import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            // Display an error message to the user
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/auth/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, fullName, password, role: 'user' }), // Include the default role here
            });
    
            if (response.ok) {
                console.log('SignUp successful');
                // Optionally, you may want to redirect the user to the login page
            } else {
                console.error('SignUp failed');
                // Display an error message to the user
            }
        } catch (error) {
            console.error('Error during SignUp:', error);
            // Display an error message to the user
        }
    };    

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h3 className="text-center">Registration</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSignUp}>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Full Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" variant="success" block>Sign Up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
