import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const mockApiResponse = [
    {
      id: 1,
      title: 'Card 1',
      text: 'Description for Card 1',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-01',
    },
    {
      id: 2,
      title: 'Card 2',
      text: 'Description for Card 2',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-02',
    },
    {
      id: 3,
      title: 'Card 3',
      text: 'Description for Card 3',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-03',
    },
    {
      id: 4,
      title: 'Card 4',
      text: 'Description for Card 4',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-04',
    },
    {
      id: 5,
      title: 'Card 5',
      text: 'Description for Card 5',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-05',
    },
    {
      id: 6,
      title: 'Card 6',
      text: 'Description for Card 6',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-06',
    },
    {
      id: 7,
      title: 'Card 7',
      text: 'Description for Card 7',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-07',
    },
    {
      id: 8,
      title: 'Card 8',
      text: 'Description for Card 8',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-08',
    },
    {
      id: 9,
      title: 'Card 9',
      text: 'Description for Card 9',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-09',
    },
    {
      id: 10,
      title: 'Card 10',
      text: 'Description for Card 10',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-10',
    },
    {
      id: 11,
      title: 'Card 11',
      text: 'Description for Card 11',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-11',
    },
    {
      id: 12,
      title: 'Card 12',
      text: 'Description for Card 12',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-12',
    },
    {
      id: 13,
      title: 'Card 13',
      text: 'Description for Card 13',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-13',
    },
    {
      id: 14,
      title: 'Card 14',
      text: 'Description for Card 14',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-14',
    },
    {
      id: 15,
      title: 'Card 15',
      text: 'Description for Card 15',
      image: 'https://i.imgur.com/eoMMulu.png',
      date: '2024-03-15',
    },
  ];
  
  
  // useEffect(() => {
  //   fetchDataFromDatabase();
  // }, []);

  // const fetchDataFromDatabase = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/cards');
  //     const data = await response.json();
  //     console.log('Data:', data); // Verifica los datos en la consola
  //     setCards(Array.isArray(data) ? data : []); // Asegurarse de que data sea un array antes de establecer el estado
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
    <>
    <Header />
    <Container className=' border  border-3 border-info w-100 h-100'>
            <Row className="d-flex justify-content-center">
<Col xs={9}>
<Row className="d-flex  justify-content-center align-items-stretch py-4">
        {mockApiResponse.slice(0, 6).map((card, index) => (
          <Col key={index} xs={12} md={6} lg={4}  className='my-1 d-flex justify-content-center align-items-center'>
                  <Card className="full-card border-0 rounded-3 px-4 pt-3 pb-1">
              <img variant="top" className='card-image' src={card.image} />
              <h3>{card.title}</h3>
                <p>{card.text}</p>
            
                <p className=" bg-info">{card.date}</p>
              
            </Card>
          </Col>
        ))}
      </Row>
      </Col></Row>
    </Container>
        <Footer />

      </> 
  );
}

export default App;
