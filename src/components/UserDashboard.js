import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenSquare,
  faTrash,
  faLock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../Styles/user.css";

/**
 * Componente principal para el panel de usuario.
 * @component
 * @return {JSX.Element} El componente principal del panel de usuario.
 */
const UserDashboard = () => {
  /**
   * Estado para almacenar las cartas.
   * @type {Array}
   */
  const [cards, setCards] = useState([]);
  
  /**
   * Estado para almacenar el título de búsqueda.
   * @type {string}
   */
  const [searchTitle, setSearchTitle] = useState("");

  /**
   * Maneja la eliminación de una carta.
   * @async
   * @function
   * @param {string} _id - ID de la carta a eliminar.
   * @returns {Promise<void>} Promesa que se resuelve después de procesar la eliminación.
   */
  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta carta?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/cards/deleteItem/${_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Carta eliminada con éxito");
      } else {
        alert("Ocurrió un error al intentar eliminar la carta");
      }
    } catch (error) {
      console.error("Error al eliminar la carta:", error);
      alert("Error al eliminar la carta");
    }
  };

  /**
   * Obtiene datos de la base de datos al montar el componente.
   * @effect
   */
  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/cards/getItem/" + localStorage.getItem("token")
        );
        const data = await response.json();
        console.log("Data:", data.items);
        const items = data.items;
        setCards(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromDatabase();
  }, []);

  /**
   * Formatea la fecha de publicación de una carta.
   * @function
   * @param {string} dateString - Cadena de fecha a formatear.
   * @returns {string} - Cadena de fecha formateada.
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

  return (
    <>
      <Header setSearchTitle={setSearchTitle} />
      <Container className="w-100 h-100 no-select">
        <Container fluid className="bg-info text-primary p-4">
          <Row className="d-flex justify-content-center align-items-stretch py-4">
            {/* Columna para notas públicas */}
            <Col className="bg-secondary" xs={12} lg={6}>
              <h3 className="titulonota">
                Notas Públicas{" "}
                <FontAwesomeIcon
                  icon={faEye}
                  className="edit-icon me-2"
                  size="1x"
                />
              </h3>
              <Row xs={3} className="g-4">
                {cards.map(
                  (card, index) =>
                    card.visible === true && (
                      <Col
                        key={index}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Card
                          className="full-card border-0 rounded-3 px-3 py-2"
                          style={{ width: "100px" }}
                        >
                          <img
                            className="card-image rounded-3"
                            src={card.image}
                            alt=""
                          />
                          <h6 className="mt-2 overflow-ellipsis">
                            {card.title}
                          </h6>
                          <p className="card-text text-center">{card.text}</p>
                          <p className=" border-2 border border-black p-1 rounded-4">
                            {formatPublishedDate(card.date)}
                          </p>
                          <div className="d-flex justify-content-between mt-2">
                            <Link to="/edit">
                              <FontAwesomeIcon
                                icon={faPenSquare}
                                className="edit-icon me-1"
                                size="1x"
                              />
                            </Link>
                            {cards.length > 0 && (
                              <div key={cards[0]._id}>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="trash-icon"
                                  size="1x"
                                  onClick={() => handleDelete(cards[0]._id)}
                                  style={{ cursor: "pointer", color: "red" }}
                                />
                              </div>
                            )}
                          </div>
                        </Card>
                      </Col>
                    )
                )}
              </Row>
            </Col>
            {/* Columna para notas privadas */}
            <Col className="bg-dark" xs={12} lg={6}>
              <h3 className="titulonota">
                Notas Privadas{" "}
                <FontAwesomeIcon
                  icon={faLock}
                  className="edit-icon me-2"
                  size="1x"
                />
              </h3>
              <Row xs={3} className="g-4">
                {cards.map(
                  (card, index) =>
                    card.visible === false && (
                      <Col
                        key={index}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Card
                          className="full-card border-0 rounded-3 px-3 py-2"
                          style={{ width: "100px" }}
                        >
                          <img
                            className="card-image rounded-3"
                            src={card.image}
                            alt=""
                          />
                          <h6 className="mt-2 overflow-ellipsis">
                            {card.title}
                          </h6>
                          <p className="card-text text-center">{card.text}</p>
                          <p className=" border-2 border border-black p-1 rounded-4">
                            {new Date(card.date).toISOString().split("T")[0]}
                          </p>
                          <div className="d-flex justify-content-between mt-2">
                            <Link to="/edit">
                              <FontAwesomeIcon
                                icon={faPenSquare}
                                className="edit-icon me-1"
                                size="1x"
                              />
                            </Link>
                            {cards.length > 0 && (
                              <div key={cards[0]._id}>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="trash-icon"
                                  size="1x"
                                  onClick={() => handleDelete(cards[0]._id)}
                                  style={{ cursor: "pointer", color: "red" }}
                                />
                              </div>
                            )}
                          </div>
                        </Card>
                      </Col>
                    )
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default UserDashboard;
