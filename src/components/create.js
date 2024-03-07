import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../Styles/create.css';

const Create = () => {
    // Formulario para crear portfolio
    return (
        <><Header /><Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={8}>
                    <Card className='cardCreate'>
                        <Card.Header>
                            <h3 className="text-center">Crear</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form >
                                <Form.Group>
                                    <Form.Label>Título:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder='Enter your title'
                                    // value={Title}
                                    // onChange={(e) => handleChangeCardTitle(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Texto:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder='Enter your text'
                                    // value={Text}
                                    // onChange={(e) => handleChangeCardText(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Imagen:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your image"
                                    // value={Img}
                                    // onChange={(e) => handleChangeCardImg(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Label>Visibilidad:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your image"
                                // value={Visible}
                                // onChange={(e) => handleChangeCardVisible(e.target.value)}
                                />
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
