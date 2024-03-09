import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import "./Styles/App.css";

/**
 * Main component representing the entire application.
 * @function App
 * @returns {JSX.Element} - React component
 */
function App() {
  /**
   * State to hold the array of cards.
   * @type {[Object[], Function]}
   */
  const [cards, setCards] = useState([]);

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

  /**
   * State to hold example cards fetched from "data.json".
   * @type {[Promise, Function]}
   */
  const [exampleCards] = useState([
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.error(error)),
  ]);

  /**
   * State to hold the search title for filtering cards.
   * @type {[string, Function]}
   */
  const [searchTitle, setSearchTitle] = useState("");

  /**
   * State to hold filtered items based on the search title.
   * @type {[Object[], Function]}
   */
  const [filteredItems, setFilteredItems] = useState([]);

  /**
   * State to hold the current page number.
   * @type {[number, Function]}
   */
  const [paginaActual, setPaginaActual] = useState(1);

  /**
   * Number of elements to display per page.
   * @type {number}
   */
  const elementosPorPagina = 9;

  /**
   * Total number of pages based on filtered items.
   * @type {number}
   */
  const totalPaginas = Math.ceil(filteredItems.length / elementosPorPagina);


    // useEffect(() => {
  //   // setCards();
  //   // const generadorCards = generateCardsData(100);
  //   setFilteredItems(cards);
  // }, []);

  /**
   * Function to handle changes in the search title.
   * @function handleSearchChange
   */
  const handleSearchChange = () => {
    const currentPage = paginaActual; // Store the current page
    const lowercasedValue = searchTitle.toLowerCase();
    const filtered = cards.filter((item) =>
      item.title.toLowerCase().includes(lowercasedValue)
    );

    setFilteredItems(filtered);

    if (searchTitle === "") {
      setPaginaActual(currentPage);
      return;
    } else setPaginaActual(1);
  };

  useEffect(() => {
    handleSearchChange();
  }, [searchTitle]);

  /**
   * Function to retrieve elements for the current page.
   * @function obtenerElementosPagina
   * @returns {Object[]} - Array of elements for the current page
   */
  const obtenerElementosPagina = () => {
    const startIndex = (paginaActual - 1) * elementosPorPagina;
    const endIndex = startIndex + elementosPorPagina;
    return filteredItems.slice(startIndex, endIndex);
  };

  /**
   * State to indicate if data is currently being loaded.
   * @type {[boolean, Function]}
   */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Function to fetch data from the server.
     * @async
     * @function fetchData
     */
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/cards");

        if (!response.ok) {
          throw new Error(
            `Error: ${response.status} - ${response.statusText}`
          );
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

  /**
   * Function to format the published date for a card.
   * @function formatPublishedDate
   * @param {string} dateString - Date string to be formatted
   * @returns {string} - Formatted date string
   */
  function formatPublishedDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Publicado hoy";
    } else if (diffDays === 1) {
      return "Publicado hace 1 día";
    } else {
      return `Publicado hace ${diffDays} días`;
    }
  }

  /**
   * Main render of the App component.
   */
  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Header setSearchTitle={setSearchTitle} />
          <Container className="w-100 h-100 no-select">
            <Row className="d-flex justify-content-center">
              <Col xs={9}>
                <Row className="d-flex justify-content-center align-items-stretch py-4">
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
                        <p className="border-2 border border-black p-2 rounded-4">
                          {formatPublishedDate(card.date)}
                        </p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Row className="d-flex justify-content-around align-items-center w-auto my-3">
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
              </Col>
              <Col
                xs={6}
                className="w-auto h-auto rounded"
                style={{ backgroundColor: "#d3cee1" }}
              >
                <h4 className="text-environment-color mt-1 text-black">
                  {paginaActual} / {totalPaginas}
                </h4>
              </Col>
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