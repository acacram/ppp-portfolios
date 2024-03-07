import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

import '../Styles/create.css';

function UserDashboard() {
    const [cards, setCards] = useState([]);

    // Import data from DB
    useEffect(() => {
        fetchDataFromDatabase();
    }, []);

    // Fetch data from DB
    const fetchDataFromDatabase = async () => {
        try {
            const response = await fetch('http://localhost:5000/cards/getItem/{_id}');
            const data = await response.json();
            console.log('Data:', data); // Verifica los datos en la consola
            setCards(Array.isArray(data) ? data : []); // Asegurarse de que data sea un array antes de establecer el estado
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
        <Header />
            {/* Añade el contenedor principal que rodea a todo el contenido de la app */}
            <Container className=' border  border-3 border-info w-100 h-100'>
                {/* Añade el contenido principal en la app */}
                {/* Dentro del contenedor principal, añade una fila que ocupa toda la ancha del contenedor */}
                <Row className="d-flex justify-content-center">
                    <Col xs={9}>
                        {/* Crea una fila que se ajusta al ancho de la pantalla y que contiene columnas de tamaño variable */}
                        <Row className="d-flex  justify-content-center align-items-stretch py-4">
                            {/* Recorre el arreglo con los datos y muestra una columna por cada dato */}
                            {cards.map((card, index) => (
                                <Col key={index} xs={12} md={6} lg={4} className='my-1 d-flex justify-content-center align-items-center'>
                                    <Card className="full-card border-0 rounded-3 px-4 pt-3 pb-1">
                                        <img variant="top" className='card-image' src={card.image} />
                                        <h3>{card.title}</h3>
                                        <p>{card.text}</p>

                                        <p className=" bg-info">{card.date}</p>

                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default UserDashboard;
