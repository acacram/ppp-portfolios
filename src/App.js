import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch('http://localhost:5000/cards');
      const data = await response.json();
      console.log('Data:', data); // Verifica los datos en la consola
      setCards(Array.isArray(data) ? data : []); // Asegurarse de que data sea un array antes de establecer el estado
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app-container">
      <Header className="header" />
      <Row>
        {cards.slice(0, 6).map((card, index) => (
          <Col key={index} md={4}>
            <Card>
              <Card.Img variant="top" src={card.image} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{card.date}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer className="footer" />
    </div>
  );
}

export default App;
