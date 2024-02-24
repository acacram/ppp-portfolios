    import React from 'react';
    import { Card, Row, Col } from 'react-bootstrap';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import Header from './components/Header';
    import Footer from './components/Footer';
    import './App.css';
    import json from './data.json';
    function App() {
      const cardsPerRow = 3; // Number of cards per row
      const maxRows = 2; // Maximum number of rows
      const maxCards = cardsPerRow * maxRows; // Maximum number of cards
    
      return (
        <div className="app-container">
          <Header className="header" />
          <Row>
            {json.slice(0, maxCards).map((jsonItem, index) => (
              <Col key={index} md={4}> {/* Set md={4} for 3 columns on medium screens */}
                <Card>
                  <Card.Img variant="top" src={jsonItem.image} />
                  <Card.Body>
                    <Card.Title>{jsonItem.title}</Card.Title>
                    <Card.Text>{jsonItem.text}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">{jsonItem.footer}</small>
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