import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import './Styles/App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Import data from DB
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  // Fetch data from DB
  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch('http://localhost:5000/cards');
      const data = await response.json();
      console.log('Data:', data); 
      setCards(Array.isArray(data) ? data : []); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const fechacorta = (dateString) => {
    const date = new Date(dateString); 
    const options = { year: 'numeric', month: 'short', day: 'numeric' }; 
    return date.toLocaleDateString('es-ES', options); 
  };
  
  const hora = (dateString) => {
    const date = new Date(dateString); 
    const options = { hour: 'numeric', minute: 'numeric' }; 
    return date.toLocaleTimeString('es-ES', options); 
  };

  return (
    <>
      <Header />
      <Container className='border border-3 border-info w-100 h-100'>
        <Row className="d-flex justify-content-center">
          <Col xs={9}>
            <Row className="d-flex justify-content-center align-items-stretch py-4">
              <Col xs={12} className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Buscar por título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              {cards
                .filter((card) => card.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((card, index) => (
                  <Col key={index} xs={12} md={6} lg={4} className='my-1 d-flex justify-content-center align-items-center'>
                    <Card className="full-card border-0 rounded-3 px-4 pt-3 pb-1">
                      <img variant="top" className='card-image' src={card.image} />
                      <h3>{card.title}</h3>
                      <p>{card.text}</p>
                      <div className="d-flex justify-content-between">
                        <p className="card-date">{fechacorta(card.date)}</p>
                      </div>
                      <div className="d-flex justify-content-end">
                        <p className="card-time">{hora(card.date)}</p>
                      </div>
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

export default App;
