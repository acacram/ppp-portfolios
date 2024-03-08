import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import "./Styles/App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [exampleCards] = useState([
    {
      title: "Card Title 1",
      text: "This is the text for card 1. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-01",
    },
    {
      title: "Card Title 2",
      text: "This is the text for card 2. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-02",
    },
    {
      title: "Card Title 3",
      text: "This is the text for card 3. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-03",
    },
    {
      title: "Card Title 4",
      text: "This is the text for card 4. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-04",
    },
    {
      title: "Card Title 5",
      text: "This is the text for card 5. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-05",
    },
    {
      title: "Card Title 6",
      text: "This is the text for card 6. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-06",
    },
    {
      title: "Card Title 7",
      text: "This is the text for card 7. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-07",
    },
    {
      title: "Card Title 8",
      text: "This is the text for card 8. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-08",
    },
    {
      title: "Card Title 9",
      text: "This is the text for card 9. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-09",
    },
    {
      title: "Card Title 10",
      text: "This is the text for card 10. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-10",
    },
    {
      title: "Card Title 11",
      text: "This is the text for card 11. It's just an example to illustrate how you might describe the card.",
      image:
        "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg",
      date: "2024-03-11",
    },
  ]);
  // function generateCardsData(numberOfCards) {
  //   const baseUrl =
  //     "https://img.freepik.com/fotos-premium/gatitos-kawaii-peluche-esponjosos-hermosa-imagen-arte-generado-ai_843679-5987.jpg";
  //   const startDate = new Date("2024-03-01");
  //   const cardsData = [];

  //   for (let i = 1; i <= numberOfCards; i++) {
  //     const date = new Date(startDate);
  //     date.setDate(startDate.getDate() + i - 1);

  //     const dateString = date.toISOString().split("T")[0]; // Formato YYYY-MM-DD

  //     cardsData.push({
  //       title: `Card Title ${i}`,
  //       text: `This is the text for card ${i}. It's just an example to illustrate how you might describe the card.`,
  //       image: baseUrl,
  //       date: dateString,
  //     });
  //   }

  //   return cardsData;
  // }

  const [searchTitle, setSearchTitle] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 9;
  const totalPaginas = Math.ceil(filteredItems.length / elementosPorPagina);
  // useEffect(() => {
  //   // setCards();
  //   // const generadorCards = generateCardsData(100);
  //   setFilteredItems(cards);
  // }, []);
  const handleSearchChange = () => {
    // setSearchTitle(value);
    const currentPage = paginaActual; // Store the current page
    // Update to use filteredData instead of data.tours
    const lowercasedValue = searchTitle.toLowerCase();
    const filtered = cards.filter((item) =>
      item.title.toLowerCase().includes(lowercasedValue)
    );

    // Set the filtered data in the state
    setFilteredItems(filtered);

    if (searchTitle === "") {
      // If search term is empty, keep the current page
      setPaginaActual(currentPage);
      return;
    }

    // Reset to the first page when there is a search term
    else setPaginaActual(1);
  };
  useEffect(() => {
    // setCards();
    handleSearchChange();
  }, [searchTitle]);

  const obtenerElementosPagina = () => {
    const startIndex = (paginaActual - 1) * elementosPorPagina;
    const endIndex = startIndex + elementosPorPagina;
    return filteredItems.slice(startIndex, endIndex);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/cards ");

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setCards(Array.isArray(data) ? data : []);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCards(exampleCards);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch data from DB

  return (
    <>
      {loading ? (
        // Muestra un indicador de carga o un mensaje mientras los datos se cargan
        <p>Cargando...</p>
      ) : (
        <>
          <Header setSearchTitle={setSearchTitle} />
          {/* Añade el contenedor principal que rodea a todo el contenido de la app */}
          <Container className="w-100 h-100 no-select">
            {/* Añade el contenido principal en la app */}
            {/* Dentro del contenedor principal, añade una fila que ocupa toda la ancha del contenedor */}
            <Row className="d-flex justify-content-center">
              <Col xs={9}>
                {/* Crea una fila que se ajusta al ancho de la pantalla y que contiene columnas de tamaño variable */}
                <Row className="d-flex  justify-content-center align-items-stretch py-4">
                  {/* Recorre el arreglo con los datos y muestra una columna por cada dato */}
                  {obtenerElementosPagina().map((card, index) => (
                    <Col
                      key={index}
                      xs={12}
                      md={6}
                      lg={4}
                      className="my-1 d-flex justify-content-center align-items-center"
                    >
                      <Card className="full-card border-0 rounded-3 px-4 pt-3 pb-1">
                        <img
                          variant="top"
                          className="card-image rounded-3"
                          src={card.image}
                        />
                        <h3 className="mt-2 overflow-ellipsis">{card.title}</h3>
                        <p className="card-text text-center">{card.text}</p>
                        <p className=" border-2 border border-black p-2 rounded-4">
                          {new Date(card.date).toISOString().split("T")[0]}
                        </p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Row className="d-flex justify-content-around align-items-center w-auto my-3">
              {/* y */}
              <Col
                xs={3}
                className="w-auto h-auto d-flex py-3 px-3 rounded-5"
                style={{ backgroundColor: "#d3cee1" }}
                onClick={() => {
                  if (paginaActual > 1) {
                    setPaginaActual((prev) => prev - 1);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225z"
                  />
                </svg>
              </Col>{" "}
              <Col
                xs={6}
                className="w-auto h-auto rounded"
                style={{ backgroundColor: "#d3cee1" }}
              >
                <h4 className="text-environment-color mt-1 text-black">
                  {" "}
                  {paginaActual} / {totalPaginas}
                </h4>
              </Col>{" "}
              <Col
                xs={3}
                className="w-auto h-auto d-flex py-3 px-3 rounded-5"
                style={{ backgroundColor: "#d3cee1" }}
                onClick={() => {
                  if (paginaActual < totalPaginas) {
                    setPaginaActual((prev) => prev + 1);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"
                  />
                </svg>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
