import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

import "../Styles/create.css";

const UserDashboard = () => {
  const [cards, setCards] = useState([]);

  // Import data from DB
  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/cards/getItem/" + localStorage.getItem("token")
        );
        const data = await response.json();
        console.log("Data:", data.items); // Verifica los datos en la consola
        const items = data.items;
        setCards(Array.isArray(items) ? items : []); // Asegurarse de que data sea un array antes de establecer el estado
        setFilteredItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromDatabase();
  }, []);

  // Fetch data from DB

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

  return (
    <>
      <Header setSearchTitle={setSearchTitle} />
      {/* Añade el contenedor principal que rodea a todo el contenido de la app */}
      <Container className=" w-100 h-100 no-select">
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
  );
};

export default UserDashboard;
