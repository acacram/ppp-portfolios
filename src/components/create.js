import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../Styles/create.css';

const Create = () => {
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate(); 

 

    // Formulario para crear portfolio
    return (
        <><Header /><Container className="containerCreate mt-5 bg-info">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h3 className="text-center">Crear</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form >
                                <Form.Group>
                                    <Form.Label>Título:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>
                            
                                <Form.Group>
                                    <Form.Label>Imagen:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        value={image}

                                        onChange={(e) => setImage(e.target.value)} />

                                </Form.Group>
                                
                                <Button type="submit" variant="success" block>Crear</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container></>
    );
};

export default Create;
